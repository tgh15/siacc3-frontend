import HelpdeskURL from "..";
import { Delete, Get, Post, Put } from "../../../core/request";


const HelpdeskTicketURL = {
    ticket: "ticket"
}

const getAll = (params) => Get(`${HelpdeskURL.helpdesk}/${HelpdeskTicketURL.ticket}?all&keyword=${params.keyword}&order_by=${params.order_by}&page=${params.page}&is_saved=${params.is_saved}`);
const update = (data) => Put(`${HelpdeskURL.helpdesk}/${HelpdeskTicketURL.ticket}`, data);
const remove = (id) => Delete(`${HelpdeskURL.helpdesk}/${HelpdeskTicketURL.ticket}?id=${id}`);
const getDetail = (id) => Get(`${HelpdeskURL.helpdesk}/${HelpdeskTicketURL.ticket}?id=${id}`);
const createTicket = (data) => Post(`${HelpdeskURL.helpdesk}/${HelpdeskTicketURL.ticket}`, data);
const getByCode = (code, token) => Get(`${HelpdeskURL.helpdesk}/${HelpdeskTicketURL.ticket}?code=${code}&token=${token}`);
const create = (data) => Post(`${HelpdeskURL.helpdesk}/${HelpdeskTicketURL.ticket}`, data);


export const HelpdeskTicketApi = {
    getAll,
    update,
    remove,
    getDetail,
    createTicket,
    create,
    getByCode
};