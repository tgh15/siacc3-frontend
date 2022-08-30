import HelpdeskURL                from "..";
import { Delete, Get, Post, Put } from "../../../core/request";


const getAllCategory = ()     => Get (`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.guide}/${HelpdeskURL.category}?all`);
const createCategory = (data) => Post (`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.guide}/${HelpdeskURL.category}`, data);
const updateCategory = (data) => Put (`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.guide}/${HelpdeskURL.category}`, data);
const deleteCategory = (id)   => Delete (`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.guide}/${HelpdeskURL.category}?id=${id}`);


export const SettingsAPI = {
    getAllCategory,
    createCategory,
    updateCategory,
    deleteCategory
};