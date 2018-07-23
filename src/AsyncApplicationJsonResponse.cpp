#include "AsyncApplicationJsonResponse.h"

AsyncApplicationJsonResponse::AsyncApplicationJsonResponse(bool isArray) : AsyncJsonResponse(isArray) {
  _contentType = "application/json";
}
