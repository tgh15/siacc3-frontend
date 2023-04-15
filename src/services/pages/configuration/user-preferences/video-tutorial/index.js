import { Get, Post, Delete, Put } from "../../../../core/request";
import * as tus from "tus-js-client";

/**
 * 
 * Endpoints for video tutorial management using that could be used
 * to create a request to Siacc API Gateway.
 * 
 * @todo:
 * - Add endpoint for upload module using tusd
 * - Migrate all request from video-tutorial/Context to this file
 * 
 */


// base prefix for video tutorial management services/modules
const tusPath = !process.env.NODE_ENV || process.env.NODE_ENV === 'production' ? window._env_.REACT_APP_TUS_URL : process.env.REACT_APP_TUS_URL
const videoPrefix = "video-tutor/video"
const uploadPrefix = "video-tutor/upload"

// endpoints for video module
const videoGetEndpoint = (path, params) => Get(videoPrefix + path, params)
const videoPostEndpoint = (path, data) => Post(videoPrefix + path, data)
const videoPutEndpoint = (path, data) => Put(videoPrefix + path, data)
const videoDeleteEndpoint = (path) => Delete(videoPrefix + path)

// GET Endnpoints
const getListVideoViewer = (role) => videoGetEndpoint(`/list/video-viewer?role=${role}`)
const getListVideoAdmin = (params) => videoGetEndpoint("/list/video-admin" + params)
const getListPlaylist = (role, category) => videoGetEndpoint(`/list/playlist?category=${category.replace(/[&]/g, "%26")}&role=${role}`)
const getListCategories = () => videoGetEndpoint("/list/categories")

// POST Endnpoints
const postVideo = (body) => videoPostEndpoint("/add-video", body)
const postVideoSuggestion = (body) => videoPostEndpoint(`/add-suggestion`, body)

// PUT Endnpoints
const putVideo = (video_id, body) => videoPutEndpoint(`/update-video/${video_id}`, body)
const putVideoVisibility = (video_id, body) => videoPutEndpoint(`/update-video/visibility/${video_id}`, body)
const putCategory = (body) => videoPutEndpoint("/update-category", body)

// DELETE Endnpoints
const deleteVideo = (video_id) => videoDeleteEndpoint(`/remove-video/${video_id}`)


// endpoints for upload module
const videoUploadEndpoint = (payload) => {
    return new tus.Upload(payload, {
        endpoint: `${tusPath}/${uploadPrefix}/videos/`,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
            filename: payload.name,
            filetype: payload.type
        },
    })
}
const thumbnailUploadEndpoint = (payload, options) => {
    return new tus.Upload(payload, {
        endpoint: `${tusPath}/${uploadPrefix}/thumbnails/`,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
            filename: payload.name,
            filetype: payload.type
        },
        ...options
    })
}


export const videoTutorAPI = {
    getListVideoViewer,
    getListVideoAdmin,
    getListPlaylist,
    getListCategories,
    postVideo,
    postVideoSuggestion,
    putVideo,
    putVideoVisibility,
    putCategory,
    deleteVideo,

    videoUploadEndpoint,
    thumbnailUploadEndpoint,
}