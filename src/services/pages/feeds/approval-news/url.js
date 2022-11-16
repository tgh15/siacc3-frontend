import { feedsURL }     from ".";
import { Post }         from "../../../core/request";

const getAgentByStatus          = (data, params) => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsByStatus}`, data, params);
const getAgentByArchive         = (data, page) => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsByArchive}?page=${page}`, data);
const getAgentByTypeShared      = (data, page) => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsByTypeShared}?page=${page}`, data);
const getAgentByPositionShared  = (data, page) => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsByPositionShared}?page=${page}`, data);

//Saved News Feeds
const getAgentByStored          = (data) => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsByStored}`, data);

const feedsAgentReportApprovalAPI = {
    getAgentByStored,
    getAgentByStatus,
    getAgentByArchive,
    getAgentByTypeShared,
    getAgentByPositionShared,
};

export default feedsAgentReportApprovalAPI; 