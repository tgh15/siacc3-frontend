import { crawlingURL }               from '../../index';
import { Get, Post, Delete, Put}     from "../../core/request";


//GET
const getQueryData     = (id)   => Get(`${crawlingURL.crawlingPrefix}/${crawlingURL.query}/${crawlingURL.data}?id=${id}`);
const getResultAll     = (data, param) => param == undefined ? Get(`${crawlingURL.crawlingPrefix}/${crawlingURL.result}?all=${data}`) : Get(`${crawlingURL.crawlingPrefix}/${crawlingURL.result}?all=${data}${param}`) 
const getResultData    = (id)   => Get(`${crawlingURL.crawlingPrefix}/${crawlingURL.result}/${crawlingURL.data}?id=${id}`);
const getResultArchive = (data) => Get(`${crawlingURL.crawlingPrefix}/${crawlingURL.result}?all=${data}&archive`);

//POST
const createQuery      = (data) => Post(`${crawlingURL.crawlingPrefix}/${crawlingURL.query}`, data) ;
const createResult     = (data) => Post(`${crawlingURL.crawlingPrefix}/${crawlingURL.result}`, data);

//PUT
const updateResult     = (data) => Put(`${crawlingURL.crawlingPrefix}/${crawlingURL.result}`, data);

//Delete
const deleteResult     = (id) => Delete(`${crawlingURL.crawlingPrefix}/${crawlingURL.result}?id=${id}`, );

const crawlingAPI = {

    //GET
    getQueryData,
    getResultAll,
    getResultData,
    getResultArchive,

    //POST
    createQuery,
    createResult,

    //PUT
    updateResult,

    //DELETE
    deleteResult,
    
};

export default crawlingAPI;