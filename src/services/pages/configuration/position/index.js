import { employeeURL }            from "..";
import { Delete, Get, Post, Put } from "../../../core/request";


//Get
const getAllPosition    = (params) => Get(`${employeeURL.employeePrefix}/position`, params);

const getSectorList     = () => Get(`${employeeURL.employeePrefix}/sector/list`);
const getPositionList   = () => Get(`${employeeURL.employeePrefix}/position/list`);
const getWorkunitLevel  = () => Get(`${employeeURL.employeePrefix}/workunit-level`);

//Post
const filterPosition    = (data) => Post(`${employeeURL.employeePrefix}/position/filter`, data);
const createPosition    = (data, params) => Post(`${employeeURL.employeePrefix}/position/create`, data, params);

//Put
const updatePosition    = (data, params) => Put(`${employeeURL.employeePrefix}/position/update`, data, params);

//Delete
const deletePosition    = (data, params) => Delete(`${employeeURL.employeePrefix}/position/delete`, data, params);


const positionAPI = {
    getSectorList,
    getAllPosition, 
    filterPosition,
    createPosition,
    updatePosition,
    getPositionList,
    deletePosition,
    getWorkunitLevel,
}

export default positionAPI;