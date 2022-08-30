import { feedsURL } from "..";
import { Post } from "../../../core/request";


const getAchievementByType      = (data) => Post(`${feedsURL.feedsPrefix}/${feedsURL.achievementPrefix}/${feedsURL.byType}`, data);
const filterAgentReportEvent    = (data) => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.filter}`, data);


export const feedsAchievementAPI = {
    getAchievementByType,
    filterAgentReportEvent
};