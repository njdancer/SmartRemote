#ifndef ACService_h
#define ACService_h

#include <ESPAsyncWebServer.h>
#include "JsonService.h"


#define AC_SERVICE_FILE_PATH "/config/acSettings.json"
#define AC_SERVICE_ENDPOINT "/api/ac"

class ACService : public JsonService {

public:

  ACService(AsyncWebServer* server);

private:

  void populateJsonObject(JsonObject& root) override;
  void storeJsonObject(JsonObject& root) override;

  void applyServiceDefaults() override;

  bool _power;

};

#endif // ACService_h
