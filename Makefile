build:
	docker build -t registry.gitlab.com/rumahlogic/redesign-siacc-ui .

push:
	docker push registry.gitlab.com/rumahlogic/redesign-siacc-ui

local:
    REACT_APP_SOCKET_URL=wss://apis-siacc.rlidev.pro REACT_APP_API_GATEWAY=https://apis-siacc.rlidev.pro npm start