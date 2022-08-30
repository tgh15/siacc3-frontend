import { Get }             from "../../core/request";

const elasticSearchURL = {
    elasticSearchPrefix  : "es",
    
    search               : "search"
};

//GET
const getElasticSearch = (role, wid, pid, query) => Get(`${elasticSearchURL.elasticSearchPrefix}/${elasticSearchURL.search}?role=${role}&wid=${wid}&pid=${pid}&q=${query}`);

const elasticSearchAPI = {
    getElasticSearch
};

export default elasticSearchAPI;