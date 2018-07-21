#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
#include <ESPAsyncWebServer.h>
#include "ACService.h"

// SKETCH BEGIN
AsyncWebServer server(80);

ACService acService(&server);

const char* ssid = "dancer-priv";
const char* password = "maundrell71";
const char * hostName = "remote";

void setup(){
  Serial.begin(115200);
  Serial.setDebugOutput(true);

  WiFi.hostname(hostName);
  WiFi.mode ( WIFI_STA );
  WiFi.begin(ssid, password);
  if (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.printf("STA: Failed!\n");
    WiFi.disconnect(false);
    delay(1000);
    WiFi.begin(ssid, password);
  }

  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  if (MDNS.begin(hostName)) {
    Serial.println("MDNS responder started");
  }

  server.begin();
  acService.begin();
}

void loop(){

}
