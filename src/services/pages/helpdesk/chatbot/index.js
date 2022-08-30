import HelpdeskURL from "..";
import { Delete, Get, Put } from "../../../core/request";



const HelpdeskChatbotURL = {
    chatbot: "chat-bot",
    list: "list",
    open : "open"
}

const getAll = (params) => Get(`${HelpdeskURL.helpdesk}/${HelpdeskChatbotURL.chatbot}/list?keyword=${params.keyword}&order_by=${params.order_by}&page=${params.page}`);
const update = (data) => Put(`${HelpdeskURL.helpdesk}/${HelpdeskChatbotURL.chatbot}`, data);
const remove = (id) => Delete(`${HelpdeskURL.helpdesk}/${HelpdeskChatbotURL.chatbot}?id=${id}`);
const openFromUser = (token) =>  Get(`${HelpdeskURL.helpdesk}/${HelpdeskChatbotURL.chatbot}/${HelpdeskChatbotURL.open}?token=${token}`)
const open = (id) =>  Get(`${HelpdeskURL.helpdesk}/${HelpdeskChatbotURL.chatbot}?id=${id}`)

export const HelpdeskChatbotApi = {
    getAll,
    update,
    remove,
    openFromUser,
    open
};