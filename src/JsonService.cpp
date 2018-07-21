#include "JsonService.h"

JsonService::JsonService(AsyncWebServer* server,
                         String serviceEndpoint,
                         String filePath):
                            _server(server),
                            _serviceEndpoint(serviceEndpoint),
                            _filePath(filePath),
                            _updateHandler((String&)_serviceEndpoint,
                                           (WebRequestMethodComposite)HTTP_PATCH,
                                           (JsonRequestCallback)std::bind(&JsonService::handleUpdateRequest,
                                                                          this,
                                                                          std::placeholders::_1,
                                                                          std::placeholders::_2)) {}

void JsonService::begin() {
  // configure read handler
  _server->on(_serviceEndpoint.c_str(), HTTP_GET, std::bind(&JsonService::handleReadRequest, this, std::placeholders::_1));

  // configure update handler
  _server->addHandler(&_updateHandler);
}

void JsonService::applyServiceDefaults() {}

void JsonService::handleReadRequest(AsyncWebServerRequest *request) {

  AsyncJsonResponse* response = new AsyncJsonResponse();
  populateJsonObject(response->getRoot());
  response->setLength();
  request->send(response);

}

void JsonService::handleUpdateRequest(AsyncWebServerRequest *request, JsonVariant &jsonRoot) {

  if (jsonRoot.is<JsonObject>()){

    JsonObject& rootObject = jsonRoot.as<JsonObject>();
    storeJsonObject(rootObject);
    writeToSPIFFS();

    AsyncJsonResponse * response = new AsyncJsonResponse();
    populateJsonObject(response->getRoot());
    response->setLength();
    request->send(response);

  } else{
    request->send(400);
  }
}

void JsonService::readFromSPIFFS() {
  // Open target file from SPIFFS
  File configFile = SPIFFS.open(_filePath, "r");

  // If target file exists
  if (configFile) {
    // Create a new json object and parse file contents
    DynamicJsonBuffer jsonBuffer;
    JsonObject& root = jsonBuffer.parseObject(configFile);

    // If file was parsed successfully
    if (root.success()) {
      // Store JSON data in service and close file
      storeJsonObject(root);
      configFile.close();
      return;
    }
    configFile.close();
  }

  // Apply defaults if file read unsuccessful
  applyServiceDefaults();
}

bool JsonService::writeToSPIFFS() {
  // Create a new json object and populate it with service data
  DynamicJsonBuffer jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  populateJsonObject(root);

  // Open target file from SPIFFS
  File configFile = SPIFFS.open(_filePath, "w");

  // Failed to open file, return false
  if (!configFile) {
    return false;
  }

  // TODO: Check file size before write

  // Write json to file and close
  root.printTo(configFile);
  configFile.close();

  return true;
}
