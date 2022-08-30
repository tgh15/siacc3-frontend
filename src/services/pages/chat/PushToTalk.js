import CommunicationURL                 from "./url";
import { Delete, Get, Post, Put}                     from "../../core/request";

//GET
const getServer             = () => Get(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}?user`);

//POST
const createRoom            = (data) => Post(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.videoCall}/${CommunicationURL.createRoom}`, data);
const createServer          = (data) => Post(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}`, data);
const getTokenRoom          = (data) => Post(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.videoCall}/${CommunicationURL.getToken}`, data);

//PUT
const updateServer          = (id, data) => Put(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}?id=${id}`, data);
const addAdminToRoom        = (id, data) => Put(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}?id=${id}&admin=add`, data);
const addMemberToRoom       = (id, data) => Put(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}?id=${id}&member=add`, data)
const addChannelToSever     = (id, data) => Put(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}?id=${id}&channel=add`, data);
const outMemberFromRoom     = (id, data) => Put(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}?id=${id}&member=out`, data)
const removeAdminFromRoom   = (id, data) => Put(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}?id=${id}&admin=delete`, data);
const removeMemberFromRoom  = (id, data) => Put(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}?id=${id}&member=delete`, data)

//DELETE
const deleteServer          = (id) => Delete(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}?id=${id}`);


const CommunicationPTT = {
    getServer,
    createRoom,
    createServer,
    getTokenRoom,

    updateServer,
    addAdminToRoom,
    addMemberToRoom,
    addChannelToSever,
    outMemberFromRoom,
    removeAdminFromRoom,
    removeMemberFromRoom,

    deleteServer,
};

export default CommunicationPTT;