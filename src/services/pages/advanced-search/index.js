import { Get }             from "../../core/request";

const elasticSearchURL = {
    elasticSearchPrefix  : "es",
    
    search               : "search"
};

//GET
const getElasticSearch = (params) => Get(`${elasticSearchURL.elasticSearchPrefix}/${elasticSearchURL.search}`, params);

const elasticSearchAPI = {
    getElasticSearch
};

export default elasticSearchAPI;