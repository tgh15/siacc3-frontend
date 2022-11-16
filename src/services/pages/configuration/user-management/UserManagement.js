import { responseURL }            from "../../../index";
import { Delete, Get, Post, Put } from "../../../core/request";


//Get
const getAuthGroupList      = () => Get(`${responseURL.authPrefix}/groups?show_all=true`);
const getUserManagement     = (page, params) => Get(`${responseURL.employeePrefix}/employee?page=${page}`, params);

//Post
const getFilter             = (data, page) => Post(`${responseURL.employeePrefix}/employee/filter?page=${page}`, data);
const uploadPhoto           = (data) => Post(`${responseURL.employeePrefix}/employee/upload-photo`, data);
const updatePhoto           = (data) => Post(`${responseURL.employeePrefix}/employee/update-photo`, data);
const createUserManagement  = (data) => Post(`${responseURL.employeePrefix}/employee/create`, data);

//Put
const updateUserManagement  = (data) => Put(`${responseURL.employeePrefix}/employee/update`, data);

//Delete
const deleteUserManagement  = (data) => Delete(`${responseURL.employeePrefix}/employee/delete`, data);


const userManagementAPI = {
    getFilter,
    uploadPhoto,
    updatePhoto,
    getAuthGroupList,
    getUserManagement,
    updateUserManagement,
    createUserManagement,
    deleteUserManagement,
}

export default userManagementAPI;