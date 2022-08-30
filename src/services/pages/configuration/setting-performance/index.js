import { CreateSettingPerformance } from "./Create"
import { DeleteSettingPerformance } from "./Delete"
import { GetSettingPerformance } from "./Get"
import { StaticBadge } from "./StaticBadge"
import { UpdateSettingPerformance } from "./Update"
import UploadBadge from "./UploadBadge"

import { Delete, Get, Post, Put } from "../../../core/request"

const SettingPerformanceURL = {
    feeds: "feeds",
    config: "config",
    trophy: "trophy",
    create: "create",
    update: "update",
    delete: "delete",
    rating: "ratings",
    uploadIcon: "upload-icon",
    updateIcon: "update-icon"
}

// trophy
const getTrophy = (filter, params) => (filter) ? Get(`${SettingPerformanceURL.feeds}/${SettingPerformanceURL.config}/${SettingPerformanceURL.trophy}?filter=${filter}`)
    : Get(`${SettingPerformanceURL.feeds}/${SettingPerformanceURL.config}/${SettingPerformanceURL.trophy}?page=${params?.page}&keyword=${params.keyword}`);
const createTrophy = data => Post(`${SettingPerformanceURL.feeds}/${SettingPerformanceURL.config}/${SettingPerformanceURL.trophy}/${SettingPerformanceURL.create}`, data);
const updateTrophy = data => Put(`${SettingPerformanceURL.feeds}/${SettingPerformanceURL.config}/${SettingPerformanceURL.trophy}/${SettingPerformanceURL.update}`, data);
const deleteTrophy = data => Delete(`${SettingPerformanceURL.feeds}/${SettingPerformanceURL.config}/${SettingPerformanceURL.trophy}/${SettingPerformanceURL.delete}`, data);
const uploadIcon = data => Post(`${SettingPerformanceURL.feeds}/${SettingPerformanceURL.config}/${SettingPerformanceURL.trophy}/${SettingPerformanceURL.uploadIcon}`, data);
const updateIcon = data => Post(`${SettingPerformanceURL.feeds}/${SettingPerformanceURL.config}/${SettingPerformanceURL.trophy}/${SettingPerformanceURL.updateIcon}`, data);

// rating
const getRating = data => Get(`${SettingPerformanceURL.feeds}/${SettingPerformanceURL.config}/${SettingPerformanceURL.rating}`, data);
const createRating = data => Post(`${SettingPerformanceURL.feeds}/${SettingPerformanceURL.config}/${SettingPerformanceURL.rating}/${SettingPerformanceURL.create}`, data);
const updateRating = data => Put(`${SettingPerformanceURL.feeds}/${SettingPerformanceURL.config}/${SettingPerformanceURL.rating}/${SettingPerformanceURL.update}`, data);
const deleteRating = data => Delete(`${SettingPerformanceURL.feeds}/${SettingPerformanceURL.config}/${SettingPerformanceURL.rating}/${SettingPerformanceURL.delete}`, data);

const SettingPerformanceApi = {
    get: GetSettingPerformance,
    staticBadge: StaticBadge,
    create: CreateSettingPerformance,
    delete: DeleteSettingPerformance,
    uploadBadge: UploadBadge,
    update: UpdateSettingPerformance,

    // trophy
    getTrophy,
    createTrophy,
    updateTrophy,
    uploadIcon,
    updateIcon,
    deleteTrophy,

    // rating
    getRating,
    createRating,
    updateRating,
    deleteRating
}
export default SettingPerformanceApi