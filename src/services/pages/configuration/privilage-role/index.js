import { authURL }                from "../../authentication";
import { responseURL }            from "../../../index";
import { Delete, Get, Post, Put } from "../../../core/request";


//GET
const getGroups     = (params) => Get(`${responseURL.authPrefix}/groups`, params);
const getTemplate   = () => Get(`${responseURL.authPrefix}/role/template`);

//POST
const createGroups  = (data) => Post(`${responseURL.authPrefix}/role/create`, data);

//PUT
const updateGroups  = (data) => Put(`${authURL.authPrefix}/role/update`, data);

//DELETE
const deleteGroup   = (data) => Delete(`${responseURL.authPrefix}/groups/delete`, data);


const PrivilageRoleAPI = {
    getGroups,
    getTemplate,
    deleteGroup,
    createGroups,
    updateGroups,
}

export default PrivilageRoleAPI;