import { responseURL }               from "../../../index";
import { Get, Post, Delete, Put } from "../../../core/request";


//GET
const getCategory        = (page, search, params) => 
                            page == undefined && search == undefined ? 
                                (Get(`${responseURL.feedsPrefix}/category`, params))
                            : 
                                page != undefined && search == undefined ?  
                                    (Get(`${responseURL.feedsPrefix}/category?page=${page}`, params))
                                :
                                    (Get(`${responseURL.feedsPrefix}/category?page=${page}&keyword=${search}`, params));

//POST
const createCategory     = (data, params) => Post(`${responseURL.feedsPrefix}/category/create`, data, params);
const getDetailCategory  = (data) => Post(`${responseURL.feedsPrefix}/category/detail`, data);

//PUT
const updateCategory     = (data, params) => Put(`${responseURL.feedsPrefix}/category/update`, data, params);

//DELETE
const deleteCategory     = (data, params) => Delete(`${responseURL.feedsPrefix}/category/delete`, data, params);


export const feedsCategoryAPI = {
    //GET
    getCategory,

    //POST
    createCategory,
    getDetailCategory,

    //PUT
    updateCategory,

    //DELETE
    deleteCategory
};