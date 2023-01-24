import { profileURL }   from ".";
import FetchServices    from "../../core/Axios";
import { GetWithURL }   from "../../core/request";

//Axios
const service = new FetchServices();


const getAgentPoints             = (data, params) => service.post(`${profileURL.feedsPrefix}/${profileURL.agentPointsPrefix}`, data, params);
const getAgentByKind             = (data) => service.post(`${profileURL.feedsPrefix}/${profileURL.achievementPrefix}/${profileURL.achievementAgent}/${profileURL.byKind}`, data);
const getDownloadData            = (url) => GetWithURL(`${url}`);
const getEmployeeByUuid          = (data) => service.post(`${profileURL.employeePrefix}/${profileURL.employee}/${profileURL.byUuid}`, data);
const getByPositionShared        = (data) => service.post(`${profileURL.feedsPrefix}/${profileURL.agentReport}/${profileURL.byPositionShared}`, data);
const getAchievementAgent        = (data) => service.post(`${profileURL.feedsPrefix}/${profileURL.achievementPrefix}/${profileURL.achievementAgent}`, data);
const changeAchievementAgent     = (data) => service.post(`${profileURL.feedsPrefix}/${profileURL.achievementPrefix}/${profileURL.achievementAgent}/${profileURL.isActive}`, data);
const getByEmployeeAgentReport   = (data, params) => service.post(`${profileURL.feedsPrefix}/${profileURL.agentReport}/${profileURL.byEmployee}`, data, params);
const getAgentProfilePerformance = (data) => service.post(`${profileURL.feedsPrefix}/${profileURL.performancePrefix}/${profileURL.achievementAgent}/${profileURL.profile}`, data);


const agentProfileAPI = {
    getAgentPoints,
    getAgentByKind,
    getDownloadData,
    getEmployeeByUuid,
    getByPositionShared,
    getAchievementAgent,
    changeAchievementAgent,
    getByEmployeeAgentReport,
    getAgentProfilePerformance,
};

export default agentProfileAPI;