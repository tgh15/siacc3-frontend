import { feedsURL } from "..";
import { Get, Post } from "../../../core/request";


const getTrophyByType           = (params)      => Get(`${feedsURL.feedsPrefix}/${feedsURL.feedsTrophy}`, params);
const getAchievementByType      = (data)        => Post(`${feedsURL.feedsPrefix}/${feedsURL.achievementPrefix}/${feedsURL.byType}`, data);
const filterAgentReportEvent    = (data)        => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.filter}`, data);
const getAchievementByWorkunit  = (data,params) => Post(`${feedsURL.feedsPrefix}/${feedsURL.achievementPrefix}/workunit/self`, data, params);

export const feedsAchievementAPI = {

    getTrophyByType,

    getAchievementByType,
    filterAgentReportEvent,
    getAchievementByWorkunit
};