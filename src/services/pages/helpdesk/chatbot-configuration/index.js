import HelpdeskURL from "..";
import { Delete, Get, Post, Put } from "../../../core/request";



const ChatbotCongurationURL = {
    question: "question"
}


const getAll = () => Get(`${HelpdeskURL.helpdesk}/${ChatbotCongurationURL.question}?all`);
const remove = (id) => Delete(`${HelpdeskURL.helpdesk}/${ChatbotCongurationURL.question}?id=${id}`);
const create = (data) => Post(`${HelpdeskURL.helpdesk}/${ChatbotCongurationURL.question}`, data);
const update = (data) => Put(`${HelpdeskURL.helpdesk}/${ChatbotCongurationURL.question}`, data);

export const ChatbotCongurationApi = {
    getAll,
    remove,
    create,
    update
};