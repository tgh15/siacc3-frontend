import { Get, Post, Delete, Put, PostUpload } from "../../../../core/request";
import * as tus from "tus-js-client";
import Uppy from "@uppy/core"

import XHR from "@uppy/xhr-upload"
import Tus from '@uppy/tus';
/**
 * 
 * Endpoints for video tutorial management using that could be used
 * to create a request to Siacc API Gateway.
 * 
 * @todo:
 * - Add endpoint for upload module using tusd Migrate all request from video-tutorial/Context to this file [done]
 * - Fix tus upload
 *
 * */

// base prefix for video tutorial management services/modules
// const tusPath = "https://tusd.tusdemo.net/files/"
const tusPath = !process.env.NODE_ENV || process.env.NODE_ENV === 'production' ? window._env_.REACT_APP_API_GATEWAY : process.env.REACT_APP_API_GATEWAY
// const tusPath = !process.env.NODE_ENV || process.env.NODE_ENV === 'production' ? window._env_.REACT_APP_API_GATEWAY : process.env.REACT_APP_VT_URL
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
const getVideoDetail = (video_id) => videoGetEndpoint("/view/video-detail/" + video_id)


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
    // return PostUpload(uploadPrefix + "/videos/")
    // const u = new Uppy()
    //     .use(Tus, {
    //         endpoint: `${tusPath}/${uploadPrefix}/videos/`,
    //         retryDelays: [0, 3000, 5000, 10000, 20000],
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem("token"),
    //             "Access-Control-Allow-Origin": ".underdev.team, .siaccinfo.id, localhost:3000, localhost:3001, .mapbox.com, .test-siaccinfo.id, .siaccinfo.my.id, .underdev.team, .arcgis.com",
    //             'Cache-Control': 'no-cache',
    //             'Pragma': 'no-cache',
    //             'Expires': '0',
    //         },
    //     })

    // u.addFile(payload)
    // return u

    return new tus.Upload(payload, {
        endpoint: `${tusPath}/${uploadPrefix}/videos/`,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Access-Control-Allow-Origin": ".underdev.team, .siaccinfo.id, localhost:3000, localhost:3001, .mapbox.com, .test-siaccinfo.id, .siaccinfo.my.id, .underdev.team, .arcgis.com",
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
            'X-Forwarded-Host': "http://192.168.52.90:8080",
            'X-Forwarded-Proto': "http",
        },
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
            filename: payload.name,
            filetype: payload.type
        },
    })
}
const thumbnailUploadEndpoint = (payload) => {
    return new tus.Upload(payload, {
        endpoint: `${tusPath}/${uploadPrefix}/thumbnails/`,
        // uploadUrl: `${tusPath}/${uploadPrefix}/thumbnails/`,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Access-Control-Allow-Origin": ".underdev.team, .siaccinfo.id, localhost:3000, localhost:3001, .mapbox.com, .test-siaccinfo.id, .siaccinfo.my.id, .underdev.team, .arcgis.com",
            "Content-Length": 0,
            "Content-Type": "*/*",
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        },
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
            filename: payload.name,
            filetype: payload.type
        },
    })
}


export const videoTutorAPI = {
    getListVideoViewer,
    getListVideoAdmin,
    getListPlaylist,
    getListCategories,
    getVideoDetail,
    postVideo,
    postVideoSuggestion,
    putVideo,
    putVideoVisibility,
    putCategory,
    deleteVideo,

    videoUploadEndpoint,
    thumbnailUploadEndpoint,
}