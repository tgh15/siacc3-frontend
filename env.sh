#!/bin/bash

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment 
echo "window._env_ = {" >> ./env-config.js

echo "  REACT_APP_API_GATEWAY: \"$REACT_APP_API_GATEWAY\"," >> ./env-config.js
echo "  REACT_APP_SOCKET_URL: \"$REACT_APP_SOCKET_URL\"," >> ./env-config.js
echo "  REACT_APP_ERROR_TRACKING: \"$REACT_APP_ERROR_TRACKING\"," >> ./env-config.js
echo "  REACT_APP_CORS_ORIGIN: \"$REACT_APP_CORS_ORIGIN\"," >> ./env-config.js
echo "  REACT_APP_DIGITAL_IDENTIFICATION: \"$REACT_APP_DIGITAL_IDENTIFICATION\"," >> ./env-config.js
echo "  REACT_APP_MAPBOX_API: \"$REACT_APP_MAPBOX_API\"," >> ./env-config.js
echo "  REACT_APP_MAPBOX_MAP_SKIN: \"$REACT_APP_MAPBOX_MAP_SKIN\"," >> ./env-config.js

echo "}" >> ./env-config.js

cat ./copyright.txt ./index.html > ./temp && mv ./temp ./index.html
