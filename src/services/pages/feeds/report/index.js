import { feedsURL }               from "..";
import { Delete, Get, Post }      from "../../../core/request";

//GET
const getReport         = () => Get(`${feedsURL.feedsPrefix}/${feedsURL.feedsReport}/${feedsURL.all}`);
const getReportCategory = () => Get(`${feedsURL.feedsPrefix}/${feedsURL.feedsReport}/${feedsURL.feedsCategory}/${feedsURL.all}`);

//POST
const createReport      = (data) => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsReport}/${feedsURL.create}`, data);
const detailReport      = (data) => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsReport}/${feedsURL.detail}`, data);     


//Delete
const deleteReport      = (id) => Delete(`${feedsURL.feedsPrefix}/${feedsURL.feedsReport}/${feedsURL.delete}/${id}`);


export const feedsReportAPI = {
    // GET
    getReport,
    getReportCategory,

    // POST
    createReport,
    detailReport,

    //Delete
    deleteReport
};