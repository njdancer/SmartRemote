#include "AsyncJsonCallbackResponse.h"

AsyncJsonCallbackResponse::AsyncJsonCallbackResponse(AsyncJsonCallback callback, bool isArray) : _callback{callback}, AsyncJsonResponse(isArray) {}

AsyncJsonCallbackResponse::~AsyncJsonCallbackResponse() {
  _callback();
}
