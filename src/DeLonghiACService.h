#ifndef ACService_h
#define ACService_h

#include <ESPAsyncWebServer.h>
#include <ir_DeLonghi.h>
#include "JsonService.h"


#define AC_SERVICE_FILE_PATH "/config/acSettings.json"
#define AC_SERVICE_ENDPOINT "/api/ac"

class DeLonghiACService : public JsonService {

public:

  DeLonghiACService(AsyncWebServer* server, IRDeLonghiAC* deLonghiIR);

  void sendIfNeeded();

private:

  void populateJsonObject(JsonObject& root) override;
  void storeJsonObject(JsonObject& root) override;

  void applyServiceDefaults() override;

  IRDeLonghiAC* _deLonghiIR;
  bool _dirty = false;

};

#endif // ACService_h
