import { feedsURL }               from "../../../index";
import { Get, Post, Delete, Put } from "../../../core/request";


//GET
const getCategory        = (page, search, params) => 
                            page == undefined && search == undefined ? 
                                (Get(`${feedsURL.feedsPrefix}/category`, params))
                            : 
                                page != undefined && search == undefined ?  
                                    (Get(`${feedsURL.feedsPrefix}/category?page=${page}`, params))
                                :
                                    (Get(`${feedsURL.feedsPrefix}/category?page=${page}&keyword=${search}`, params));

//POST
const createCategory     = (data, params) => Post(`${feedsURL.feedsPrefix}/category/create`,data, params);
const getDetailCategory  = (data) => Post(`${feedsURL.feedsPrefix}/category/detail`,data);

//PUT
const updateCategory     = (data, params) => Put(`${feedsURL.feedsPrefix}/category/update`,data, params);

//DELETE
const deleteCategory     = (data, params) => Delete(`${feedsURL.feedsPrefix}/category/delete`,data, params);


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