import { Get, Post, Delete }    from "../../core/request";

//GET
const getQueryData     = (params)   => Get(`crawling/query/data`, params);
const getResultAll     = (params) => Get(`crawling/result`,params);
const getResultData    = (params)   => Get(`crawling/result/data`, params);

//POST
const createQuery      = (data) => Post(`crawling/query`, data) ;
const createResult     = (data) => Post(`crawling/result`, data);

//Delete
const deleteResult     = (params) => Delete(`crawling/result`, null , params);

const crawlingAPI = {

    //GET
    getQueryData,
    getResultAll,
    getResultData,

    //POST
    createQuery,
    createResult,

    //DELETE
    deleteResult,
    
};

export default crawlingAPI;