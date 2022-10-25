import { employeeURL }                             from "..";
import { Get, Post, Delete, Put }                  from "../../../core/request";

//GET
const getWorkunit           = (page, search) => 
                                page == undefined && search == undefined ?
                                    Get(`${employeeURL.employeePrefix}/${employeeURL.workunit}`)
                                :
                                    page != undefined && search == undefined ?
                                            Get(`${employeeURL.employeePrefix}/${employeeURL.workunit}?page=${page}`)
                                        :
                                            Get(`${employeeURL.employeePrefix}/${employeeURL.workunit}?page=${page}&keyword=${search}`);

const getWorkunitList       = () => Get(`${employeeURL.employeePrefix}/${employeeURL.workunit}/${employeeURL.list}`);

//POST
const createWorkunit        = (data) => Post(`${employeeURL.employeePrefix}/${employeeURL.workunit}/${employeeURL.create}`, data);
const getWorkunitChild      = (data) => Post(`${employeeURL.employeePrefix}/${employeeURL.workunit}/child-id`, data);
const getWorkunitFilter     = (data, param) => Post(`${employeeURL.employeePrefix}/${employeeURL.workunit}/${employeeURL.filter}`, data, param);
const getWorkunitDetail     = (data) => Post(`${employeeURL.employeePrefix}/${employeeURL.workunit}/${employeeURL.detail}`, data);
const createPhotoWorkunit   = (data) => Post(`${employeeURL.employeePrefix}/${employeeURL.workunit}/${employeeURL.uploadLogo}`, data);
const updatePhotoWorkunit   = (data) => Post(`${employeeURL.employeePrefix}/${employeeURL.workunit}/${employeeURL.updateLogo}`, data);
const getWorkunitLevelList  = (data) => Post(`${employeeURL.employeePrefix}/${employeeURL.workunit}/${employeeURL.list}/${employeeURL.byLevel}`, data)

//PUT
const updateWorkunit        = (data) => Put(`${employeeURL.employeePrefix}/${employeeURL.workunit}/${employeeURL.update}`, data);

//DELETE
const deleteWorkunit        = (data) => Delete(`${employeeURL.employeePrefix}/${employeeURL.workunit}/${employeeURL.delete}`, data);

export const workunitAPI = {
    //GET
    getWorkunit, 
    getWorkunitList,
    
    //POST
    createWorkunit,
    getWorkunitChild,
    getWorkunitDetail, 
    getWorkunitFilter,
    createPhotoWorkunit,
    updatePhotoWorkunit,
    getWorkunitLevelList,

    //PUT
    updateWorkunit, 

    //DELETE
    deleteWorkunit,
};
