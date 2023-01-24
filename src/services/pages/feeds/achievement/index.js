import { feedsURL } from "..";
import { Post } from "../../../core/request";


const getAchievementByType      = (data)        => Post(`${feedsURL.feedsPrefix}/${feedsURL.achievementPrefix}/${feedsURL.byType}`, data);
const filterAgentReportEvent    = (data)        => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.filter}`, data);
const getAchievementByWorkunit  = (data,params) => Post(`${feedsURL.feedsPrefix}/${feedsURL.achievementPrefix}/workunit/self`, data, params);

export const feedsAchievementAPI = {
    getAchievementByType,
    filterAgentReportEvent,
    getAchievementByWorkunit
};