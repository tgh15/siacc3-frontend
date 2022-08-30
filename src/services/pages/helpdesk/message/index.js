import HelpdeskURL from "..";
import { Get, Post } from "../../../core/request";



const HelpdeskMessageURL = {
    message: "message"
}


const create = (data) => Post(`${HelpdeskURL.helpdesk}/${HelpdeskMessageURL.message}`, data);

export const HelpdeskMessageApi = {
    create
};