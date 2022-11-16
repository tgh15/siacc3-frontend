import { employeeURL }              from "../../../index";
import { Delete, Get, Post, Put }   from "../../../core/request";


//Get
const getAllSector = (params) => Get(`${employeeURL.employeePrefix}/sector`, params);

//Post
const createSector = (data, params) => Post(`${employeeURL.employeePrefix}/sector/create`, data, params);

//Put
const updateSector = (data, params) => Put(`${employeeURL.employeePrefix}/sector/update`, data, params);

//Delete
const deleteSector = (data, params) => Delete(`${employeeURL.employeePrefix}/sector/delete`, data, params);


const sectorAPI = {
    getAllSector,
    createSector,
    updateSector,
    deleteSector
}

export default sectorAPI;