import HelpdeskURL from "..";
import { Post } from "../../../core/request";


const RequestHelpdeskURL = {
    request: "request"
}

const send = ({data,token}) => token ? 
                            Post(`${HelpdeskURL.helpdesk}/${RequestHelpdeskURL.request}?token=${token}`,data) 
                            : Post(`${HelpdeskURL.helpdesk}/${RequestHelpdeskURL.request}`,data);

export const RequestHelpdeskApi = {
    send
}