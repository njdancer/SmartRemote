UPLOAD_PORT = /dev/cu.wchusbserial1410
BOARD = nodemcuv2

ESP_ROOT=esp8266

LIBS = ./lib/IRremoteESP8266/src ./lib/ESPAsyncTCP/src ./lib/ESPAsyncWebServer/src ./esp8266/libraries/
EXCLUDE_DIRS = .//interface .//lib .//esp8266

INTERFACE_DIR=interface

include ./lib/makeEspArduino/makeEspArduino.mk

monitor:
	stty -f "$(UPLOAD_PORT)" $(UPLOAD_SPEED)|cat "$(UPLOAD_PORT)"

analyse:
	stty -f "$(UPLOAD_PORT)" $(UPLOAD_SPEED)|grep -a --line-buffered rawData "$(UPLOAD_PORT)"|tr -u '\n' '\0'|xargs -0 -n1 python lib/IRremoteESP8266/tools/auto_analyse_raw_data.py

$(FS_IMAGE): $(FS_DIR)

$(FS_DIR): $(wildcard $(INTERFACE_DIR)/*)
	echo test
	cd $(INTERFACE_DIR) && npm run build
