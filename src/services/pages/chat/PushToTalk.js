import CommunicationURL                 from "./url";
import { Delete, Get, Post, Put}                     from "../../core/request";

//GET
const getServer             = () => Get(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}?user`);

//POST
const CreateChannel         = (data,param) => Post(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/server`, data, param);
const createServer          = (data) => Post(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}`, data);
const getTokenRoom          = (data) => Post(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.videoCall}/${CommunicationURL.getToken}`, data);

//PUT
const ActionChannel         = (data,param) => Put(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/server`, data, param);
const updateServer          = (id, data) => Put(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}?id=${id}`, data);
const addAdminToRoom        = (id, data) => Put(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}?id=${id}&admin=add`, data);
const addMemberToRoom       = (id, data) => Put(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}?id=${id}&member=add`, data)
const addChannelToSever     = (data, params) => Put(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}`, data, params);
const outMemberFromRoom     = (id, data) => Put(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}?id=${id}&member=out`, data)
const removeAdminFromRoom   = (id, data) => Put(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}?id=${id}&admin=delete`, data);
const removeMemberFromRoom  = (id, data) => Put(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}?id=${id}&member=delete`, data)

//DELETE
const deleteServer          = (id) => Delete(`${CommunicationURL.communicationPrefix}/${CommunicationURL.rtc}/${CommunicationURL.server}?id=${id}`);


const CommunicationPTT = {
    getServer,
    createServer,
    getTokenRoom,
    CreateChannel,

    updateServer,
    ActionChannel,
    addAdminToRoom,
    addMemberToRoom,
    addChannelToSever,
    outMemberFromRoom,
    removeAdminFromRoom,
    removeMemberFromRoom,

    deleteServer,
};

export default CommunicationPTT;