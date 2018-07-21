#include "ACService.h"

ACService::ACService(AsyncWebServer* server) : JsonService(server, AC_SERVICE_ENDPOINT, AC_SERVICE_FILE_PATH) {
}

void ACService::populateJsonObject(JsonObject& root) {
  root["power"] = _power;
}

void ACService::storeJsonObject(JsonObject& root) {
  _power = root["power"];
}

void ACService::applyServiceDefaults() {
  _power = false;
}
