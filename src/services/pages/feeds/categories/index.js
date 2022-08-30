import { feedsURL }                                from "..";
import { Get, Post, Delete, Put }                  from "../../../core/request";

//GET
const getCategory        = (page, search, params) => 
                            page == undefined && search == undefined ? 
                                (Get(`${feedsURL.feedsPrefix}/${feedsURL.feedsCategory}`, params))
                            : 
                                page != undefined && search == undefined ?  
                                    (Get(`${feedsURL.feedsPrefix}/${feedsURL.feedsCategory}?page=${page}`, params))
                                :
                                    (Get(`${feedsURL.feedsPrefix}/${feedsURL.feedsCategory}?page=${page}&keyword=${search}`, params));

//POST
const createCategory     = (data, params) => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsCategory}/${feedsURL.create}`,data, params);
const getDetailCategory  = (data) => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsCategory}/${feedsURL.detail}`,data);

//PUT
const updateCategory     = (data, params) => Put(`${feedsURL.feedsPrefix}/${feedsURL.feedsCategory}/${feedsURL.update}`,data, params);

//DELETE
const deleteCategory     = (data, params) => Delete(`${feedsURL.feedsPrefix}/${feedsURL.feedsCategory}/${feedsURL.delete}`,data, params);

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