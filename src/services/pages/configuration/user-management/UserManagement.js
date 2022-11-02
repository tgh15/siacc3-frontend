import { employeeURL } from "..";
import { Delete, Get, Post } from "../../../core/request";


//Get
const getUserManagement     = (page, params) => Get(`${employeeURL.employeePrefix}/employee?page=${page}`, params);

//Post
const getFilter             = (data, page) => Post(`${employeeURL.employeePrefix}/employee/filter?page=${page}`, data);

//Delete
const deleteUserManagement  = (data) => Delete(`${employeeURL.employeePrefix}/employee/delete`, data);


const userManagementAPI = {
    getFilter,
    getUserManagement,
    deleteUserManagement
}

export default userManagementAPI;