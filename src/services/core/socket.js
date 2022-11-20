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
    return `${socketPath}/ws/${roomId}/digital-id`;
};

export const WebsocketURL = {
    chatSocket,
    feedsSocket,
    broadcastSocket,
    digitalIdSocket,
};