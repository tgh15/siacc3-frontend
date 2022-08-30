import HelpdeskURL from "..";
import { 
    Get, 
    Put, 
    Post, 
    Delete
} from "../../../core/request";


const getGuideAll          = ()     => Get(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.guide}?all`);
const createGuide          = (data) => Post(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.guide}`, data);
const updateGuide          = (data) => Put(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.guide}`, data);
const deleteGuide          = (id)   => Delete(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.guide}?id=${id}`);
const getDetailGuide       = (id)   => Get(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.guide}?id=${id}`);
const detailUpdateGuide    = (id)   => Get(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.guide}?id=${id}`);


export const InstructionAPI = {
    getGuideAll,
    createGuide,
    updateGuide,
    deleteGuide, 
    getDetailGuide,
    detailUpdateGuide
};