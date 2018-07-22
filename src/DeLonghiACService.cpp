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
  _deLonghiIR->setPower(root["power"]);
  _deLonghiIR->setMode(root["mode"]);
  _deLonghiIR->setTemp(root["temp"]);
}

void DeLonghiACService::applyServiceDefaults() {
  _deLonghiIR->setPower(false);
  _deLonghiIR->setMode(0);
  _deLonghiIR->setTemp(24);
}

void DeLonghiACService::onUpdate() {
  _dirty = true;
}
