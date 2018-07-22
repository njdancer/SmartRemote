#include "DeLonghiACService.h"

DeLonghiACService::DeLonghiACService(AsyncWebServer* server, IRDeLonghiAC* deLonghiIR): JsonService(server, AC_SERVICE_ENDPOINT, AC_SERVICE_FILE_PATH), _deLonghiIR(deLonghiIR) {}

void DeLonghiACService::sendIfNeeded() {
  if (_dirty) {
    _deLonghiIR->send();
  }
  _dirty = false;
}

void DeLonghiACService::populateJsonObject(JsonObject& root) {
  root["power"] = _deLonghiIR->getPower();
}

void DeLonghiACService::storeJsonObject(JsonObject& root) {
  _deLonghiIR->setPower(root["power"]);
}

void DeLonghiACService::applyServiceDefaults() {
  _deLonghiIR->setPower(false);
}

void DeLonghiACService::onUpdate() {
  _dirty = true;
}
