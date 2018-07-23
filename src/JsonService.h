#ifndef JsonService_h
#define JsonService_h

#include <ESPAsyncWebServer.h>
#include <FS.h>
#include <ArduinoJson.h>
#include <AsyncJson.h>
#include "AsyncJsonWebHandler.h"
#include "AsyncApplicationJsonResponse.h"

#define MAX_FILE_SIZE 1024

class JsonService {

public:

  JsonService(AsyncWebServer* server, String serviceEndpoint, String filePath);

  virtual void begin();

private:

  void handleReadRequest(AsyncWebServerRequest *request);
  void handleUpdateRequest(AsyncWebServerRequest *request, JsonVariant &json);

  virtual void populateJsonObject(JsonObject& root) = 0;
  virtual void storeJsonObject(JsonObject& root) = 0;

  virtual void applyServiceDefaults();

  virtual void onUpdate();

  void readFromSPIFFS();
  bool writeToSPIFFS();

  AsyncJsonWebHandler _updateHandler;

  AsyncWebServer* _server;

  String _filePath;
  String _serviceEndpoint;

};

#endif // JsonService_h
