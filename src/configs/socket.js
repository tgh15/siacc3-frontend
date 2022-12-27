import Helper from "../helpers";

export const socketPath = !process.env.NODE_ENV || process.env.NODE_ENV === 'production' ? window._env_.REACT_APP_SOCKET_URL : process.env.REACT_APP_SOCKET_URL

const feedsSocket = (roomId) => {
    return `${socketPath}/ws/${roomId}/feeds`;
};

const chatSocket  = (roomId) => {
    return `${socketPath}/ws/${roomId}/chat`;
};

const broadcastSocket = (roomId) => {
    return `${socketPath}/ws/${roomId}/broadcast`;
};

const digitalIdSocket = (roomId) => {
    console.log(roomId)
    return `${socketPath}/ws/${roomId}/digital-id`;
};

const LoginQrSocket = (qrToken) => {
    return `${socketPath}/ws/${qrToken}`;
};

const PTTSocket = (id) => {
    return `${socketPath}/ws/${id}/ptt?uuid=${Helper.getUserData().uuid}`;
}

export const WebsocketURL = {
    PTTSocket,
    chatSocket,
    feedsSocket,
    LoginQrSocket,
    broadcastSocket,
    digitalIdSocket,
};