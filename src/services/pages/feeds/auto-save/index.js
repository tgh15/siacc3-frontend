import { feedsURL }                           from "..";
import { Get, Post, Delete }                  from "../../../core/request";

//GET
const getAutoSave        = (uuid) => Get(`${feedsURL.feedsPrefix}/${feedsURL.autoSavePrefix}/${feedsURL.get}?uuid=${uuid}`);

//POST
const submitAutoSave     = (data) => Post(`${feedsURL.feedsPrefix}/${feedsURL.autoSavePrefix}/${feedsURL.save}`,data);

//DELETE
const deleteAutoSave     = (uuid) => Delete(`${feedsURL.feedsPrefix}/${feedsURL.autoSavePrefix}/${feedsURL.delete}?uuid=${uuid}`);

const feedsAutoSaveAPI = {
    getAutoSave,

    submitAutoSave,

    deleteAutoSave
};

export default feedsAutoSaveAPI;