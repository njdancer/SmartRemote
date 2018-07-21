#ifndef AsyncJsonWebHandler_h
#define AsyncJsonWebHandler_h

#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>

#define JSON_REQUEST_DEFAULT_MAX_SIZE 1024
#define JSON_REQUEST_MIMETYPE "application/json"

typedef std::function<void(AsyncWebServerRequest *request, JsonVariant &json)> JsonRequestCallback;

class AsyncJsonWebHandler : public AsyncWebHandler {

public:

  AsyncJsonWebHandler(String& url, WebRequestMethodComposite method, JsonRequestCallback onRequest);

  bool canHandle(AsyncWebServerRequest *request) override;

  void handleRequest(AsyncWebServerRequest *request) override;

  void handleBody(AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) override;

private:

  String _url;
  WebRequestMethodComposite _method;
  JsonRequestCallback _onRequest;

};

#endif // AsyncJsonWebHandler_h
