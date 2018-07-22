#include <ESPAsyncWebServer.h>
#include <AsyncJson.h>

typedef std::function<void()> AsyncJsonCallback;

class AsyncJsonCallbackResponse: public AsyncJsonResponse {

public:

  AsyncJsonCallbackResponse(AsyncJsonCallback callback, bool isArray=false);
  ~AsyncJsonCallbackResponse();

private:

  AsyncJsonCallback _callback;

};
