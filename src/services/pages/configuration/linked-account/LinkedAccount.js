

import { LinkedAccountURL } from ".";
import { Delete, Get } from "../../../core/request"
import { authURL } from "../../authentication"

const get               = (params) => Get(`${authURL.authPrefix}/${LinkedAccountURL.prefix}`,params);

// Delete
const deleteLinked      = (id) => Delete(`${authURL.authPrefix}/${LinkedAccountURL.prefix}?id=${id}`);
const deleteHistory     = (id) => Delete(`${authURL.authPrefix}/${LinkedAccountURL.prefix}/${LinkedAccountURL.history}?id=${id}`);
const deleteAllHistory  = (id) => Delete(`${authURL.authPrefix}/${LinkedAccountURL.prefix}/${LinkedAccountURL.history}?history_ids=${id}`);

const LinkedAccountApi = {
    get,
    deleteLinked,
    deleteHistory,
    deleteAllHistory
}

export default LinkedAccountApi;