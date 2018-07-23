#include <ESPAsyncWebServer.h>
#include <AsyncJson.h>

class AsyncApplicationJsonResponse: public AsyncJsonResponse {

public:

  AsyncApplicationJsonResponse(bool isArray=false);

};
