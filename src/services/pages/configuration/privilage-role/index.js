
import { Delete, Get, Post, Put } from "../../../core/request";
import { authURL } from "../../authentication";



//GET
const get           = (params)  => Get(`${authURL.authPrefix}/${authURL.groups}`, params);
const getTemplate   = ()        => Get(`${authURL.authPrefix}/${authURL.role}/${authURL.template}`);
const post          = (data)    => Post(`${authURL.authPrefix}/${authURL.role}/create`, data);
const update        = (data)    => Put(`${authURL.authPrefix}/${authURL.role}/update`, data);

const deleteGroup   = (id) => Delete(`${authURL.authPrefix}/${authURL.groups}/delete`, { group_id: id });

const PrivilageRoleApi = {
    get,
    getTemplate,
    post,
    update,
    deleteGroup
}

export default PrivilageRoleApi;