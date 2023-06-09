import { employeeURL }              from "..";
import { responseURL }              from "../../..";
import { Delete, Get, Post, Put }   from "../../../core/request";


//Get
const getWorkunitList           = (page, search) => 
                                    page == undefined && search == undefined ? 
                                        (Get(`${employeeURL.employeePrefix}/${employeeURL.workunit}`))
                                    : 
                                        page != undefined && search == undefined ?
                                            (Get(`${employeeURL.employeePrefix}/${employeeURL.workunit}?page=${page}`))
                                        :
                                            (Get(`${employeeURL.employeePrefix}/${employeeURL.workunit}?page=${page}&keyword=${search}`));

const getWorkunitLevel          = () => Get(`${employeeURL.employeePrefix}/${employeeURL.workunitLevel}`);
const getAllWorkunitList        = () => Get(`${employeeURL.employeePrefix}/workunit/list`);
const getAgentPerformance       = (page, workunit_id, workunit_level_id) => Get(`${employeeURL.feedsPrefix}/${employeeURL.performance}/${employeeURL.agent}?condition_by=workunit&page=${page}&workunit_id=${workunit_id}&workunit_level_id=${workunit_level_id}`);

//Post
const createWorkunitList        = (data) => Post(`${employeeURL.employeePrefix}/${employeeURL.workunit}/${employeeURL.create}`, data);
const filterWorkunitByLevel     = (page, data) => 
                                page == undefined ?
                                    Post(`${employeeURL.employeePrefix}/${employeeURL.workunit}/${employeeURL.byLevel}`, data)
                                :
                                    Post(`${employeeURL.employeePrefix}/${employeeURL.workunit}/${employeeURL.byLevel}?page=${page}`, data);

const uploadLogo                = (data) => Post(`${responseURL.employeePrefix}/workunit/update-logo`, data);
const filterByOrder             = (page, data) => Post(`${employeeURL.employeePrefix}/${employeeURL.workunit}/${employeeURL.filter}?page=${page}`, data);
const getWorkunitRating         = (page, data) => Post(`${employeeURL.feedsPrefix}/performance/workunit?page=${page}`, data);
const getWorkunitProfile        = (data) => Post(`${responseURL.employeePrefix}/workunit/detail`, data);
const getWorkunitPerformance    = (data) => Post(`${responseURL.feedsPrefix}/performance/workunit/detail`, data);

//Put
const updateWorkunitList        = (data) => Put(`${employeeURL.employeePrefix}/${employeeURL.workunit}/${employeeURL.update}`, data);

//Delete
const deleteWorkunitList        = (data) => Delete(`${employeeURL.employeePrefix}/${employeeURL.workunit}/${employeeURL.delete}`, data);


const workunitListAPI = {
    uploadLogo,
    filterByOrder,
    getWorkunitList,
    getWorkunitLevel,
    getWorkunitRating,
    getAllWorkunitList,
    getWorkunitProfile,
    createWorkunitList,
    updateWorkunitList,
    deleteWorkunitList,
    getAgentPerformance,
    filterWorkunitByLevel,
    getWorkunitPerformance,
};

export default workunitListAPI;