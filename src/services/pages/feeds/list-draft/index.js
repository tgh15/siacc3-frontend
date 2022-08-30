import { feedsURL } from "..";
import { Delete, Get, Post, Put } from "../../../core/request";

//GET
const getDraft     = (id, agent_report_id) => Get(`${feedsURL.feedsPrefix}/${feedsURL.draft}/${feedsURL.get}?id=${id}&agent_report_id=${agent_report_id}`);
const getListDraft = (params) => Get(`${feedsURL.feedsPrefix}/${feedsURL.draft}`, params);

//POST
const createDraft  = (data) => Post(`${feedsURL.feedsPrefix}/${feedsURL.draft}/${feedsURL.create}`,data);

//PUT
const updateDraft  = (data) => Put(`${feedsURL.feedsPrefix}/${feedsURL.draft}/${feedsURL.update}`,data);

//DELETE
const deleteListDraft = (id) => Delete(`${feedsURL.feedsPrefix}/${feedsURL.draft}/${feedsURL.delete}?id=${id}`);


export const feedsDraftAPI = {
    //GET
    getDraft,
    getListDraft,

    //POST
    createDraft,

    //PUT
    updateDraft,

    //DELETE
    deleteListDraft
};