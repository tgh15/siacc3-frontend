
import { Get, Post, Delete, Put } from "../../core/request";


export const chatURL = {
    chatPrefix           : "communication",

    chatRoom             : "room",
    chatRead             : "read",
    chatUnread           : "un-read",
    chatUser             : "user",
    chatAdmin            : "admin",
    chatMessage          : "messages",
    chatArchive          : "archive",
    chatBroadcast        : "broadcast",
    chatAttachment       : "attachment",

    user                 : "users",
    byUUID               : "by-uuid",
};

//GET
const getBroadcast = () => Get(`${chatURL.chatPrefix}/${chatURL.chatRoom}/${chatURL.chatBroadcast}`);
const getBroadcastMessage = (roomId) => roomId == undefined ? Get(`${chatURL.chatPrefix}/${chatURL.chatMessage}`) : Get(`${chatURL.chatPrefix}/${chatURL.chatMessage}/${roomId}`);

//POST
const readBroadcast = (data) => Post(`${chatURL.chatPrefix}/${chatURL.chatRoom}/${chatURL.chatRead}`, data);

const broadcastAPI = {
    getBroadcast,
    getBroadcastMessage,

    readBroadcast,
};

export default broadcastAPI;