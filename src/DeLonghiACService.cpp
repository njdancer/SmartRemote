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
  root["mode"] = _deLonghiIR->getMode();
  root["temp"] = _deLonghiIR->getTemp();
}

void DeLonghiACService::storeJsonObject(JsonObject& root) {
  if (root.containsKey("power")) { _deLonghiIR->setPower(root["power"]); }
  if (root.containsKey("mode")) { _deLonghiIR->setMode(root["mode"]); }
  if (root.containsKey("temp")) { _deLonghiIR->setTemp(root["temp"]); }

  _dirty = true;
}

void DeLonghiACService::applyServiceDefaults() {
  _deLonghiIR->setPower(false);
  _deLonghiIR->setMode(0);
  _deLonghiIR->setTemp(24);
}
