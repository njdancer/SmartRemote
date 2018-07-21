#include "AsyncJsonWebHandler.h"

AsyncJsonWebHandler::AsyncJsonWebHandler(String& url, WebRequestMethodComposite method, JsonRequestCallback onRequest) : _url(url), _method(method), _onRequest(onRequest) {}

bool AsyncJsonWebHandler::canHandle(AsyncWebServerRequest *request) {

  // Escape if method doesn't match
  if(!(_method & request->method()))
    return false;

  // Escape if url doesn't match
  if(_url.length() && (_url != request->url() && !request->url().startsWith(_url+"/")))
    return false;

  // Escape if mimetype doesn't match
  if (!request->contentType().equalsIgnoreCase(JSON_REQUEST_MIMETYPE))
    return false;

  // We can handle this request
  return true;

}

void AsyncJsonWebHandler::handleRequest(AsyncWebServerRequest *request) {

  // we have been handed too much data, return a 413 (payload too large)
  if (request->contentLength() > JSON_REQUEST_DEFAULT_MAX_SIZE) {
    request->send(413);
    return;
  }

  // parse JSON and if possible handle the request
  if (request->_tempObject) {
    DynamicJsonBuffer jsonBuffer;
    JsonVariant json = jsonBuffer.parse((uint8_t *) request->_tempObject);

    if (json.success()) {
      _onRequest(request, json);
    }else{
      request->send(400);
    }

    return;
  }

  // fallthrough, we have a null pointer, return 500.
  // this can be due to running out of memory or never receiving body data.
  request->send(500);

}

void AsyncJsonWebHandler::handleBody(AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {

  if (_onRequest) {

    // don't allocate if data is too large
    if (total > JSON_REQUEST_DEFAULT_MAX_SIZE){
      return;
    }

    // try to allocate memory on first call
    // NB: the memory allocated here is freed by ~AsyncWebServerRequest
    if(index == 0 && !request->_tempObject){
      request->_tempObject = malloc(total);
    }

    // copy the data into the buffer, if we have a buffer!
    if (request->_tempObject) {
        memcpy((uint8_t *) request->_tempObject+index, data, len);
    }

  }

}
