import React, { createContext, useState } from 'react'
import { videoTutorAPI } from '../services/pages/configuration/user-preferences/video-tutorial'
import Swal from 'sweetalert2';

export const VideoTutorialContext = createContext()
const VideoTutorialContextProvider = (props) => {

    // video tutorial states
    const basePath = !process.env.NODE_ENV || process.env.NODE_ENV === 'production' ? window._env_.REACT_APP_API_GATEWAY : process.env.REACT_APP_API_GATEWAY
    const userId = localStorage.getItem("userData.user_uuid")
    const userRole = localStorage.getItem("role")
    const host = window.location.host
    const [listVideoAdmin, setListVideoAdmin] = useState([]);
    const [listVideoViewer, setListVideoViewer] = useState([]);
    const [listCategories, setListCategories] = useState([])
    const [listPlaylist, setListPlayList] = useState([]);
    const [progress, setProgress] = useState(false);
    const [percentage, setPercentage] = useState(0)
    const [modalData, setModalData] = useState({});
    const [pagination, setPagination] = useState({
        current_page: 1,
        total_page: 1,
    });
    const [videoUpdateState, setVideoUpdateState] = useState({
        video: null,
        thumbnail: null,
        judul: "",
        deskripsi: "",
        kategori: "",
        role: [],
        tags: [],
        uploader_id: "",
    });

    const successUpload = () => Swal.fire({
        position: "center",
        icon: "success",
        title: "Video Berhasil Diupdate",
        showConfirmButton: false,
        timer: 1500
    })

    const failUpload = () => Swal.fire({
        position: "center",
        icon: "error",
        title: "Video Gagal Diupdate",
        showConfirmButton: false,
        timer: 1500
    })


    // helpers function to format date to "date/month/year" format
    function formatDate(date) {
        return new Intl
            .DateTimeFormat("id-ID", { day: "2-digit", month: "2-digit", year: "numearic" })
            .format(date)
            .toString()
    }


    function uploadVideo(payload) {
        // video upload
        const video = videoTutorAPI.videoUploadEndpoint(payload)
        // onError triggered when upload failed
        video.options.onError = function (err) {
            console.log("videoUploadEndpointErr", err)
            setProgress(false)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Video Gagal Diunggah",
                showConfirmButton: false,
                timer: 1500
            })
            return
        }

        // onProgress show current progress video of upload
        video.options.onProgress = function (bu, bt) {
            setPercentage(((bu / bt) * 100).toFixed(2))
        }

        return video
    }


    function uploadThumbnail(payload) {
        // thumbnail upload
        const thumbnail = videoTutorAPI.thumbnailUploadEndpoint(payload)

        // onError triggered when upload failed
        thumbnail.options.onError = function (err) {
            console.log("thumbnailUploadEndpointErr", err)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Video Gagal Diunggah",
                showConfirmButton: false,
                timer: 1500
            })
            return
        }

        return thumbnail
    }

    //get video details for video share
    async function getVideoDetail(video_id) {
        try {
            const res = await videoTutorAPI.getVideoDetail(video_id)
            setModalData((value) => (value = res.data.result))
        }
        catch (err) {
            // TODO: handle the error with better implementation
            console.log("getListVideoViewerError", err)
        }
    }


    // getListVideoViewer get list video for viewer based on given role
    async function getListVideoViewer(role) {
        try {
            const res = await videoTutorAPI.getListVideoViewer(role)
            setListVideoViewer((value) => (value = res.data.result))
        }
        catch (err) {
            // TODO: handle the error with better implementation
            console.log("getListVideoViewerError", err)
        }
    }


    // getListVideoAdmin get list video for admin with filters functionality.
    // Each filters would be verified then added to params array to be joined
    async function getListVideoAdmin(filters) {
        try {
            let params = [
                "sort=" + filters.sort,
                "page=" + filters.page
            ];

            // if update_date is assigned then set date params
            if (filters.upload_date[0].startDate !== null && filters.upload_date[0].endDate !== null) {
                const startDate = formatDate(filters.upload_date[0].startDate)
                const endDate = formatDate(filters.upload_date[0].endDate)
                const date = "upload_date=" + startDate + " - " + endDate
                params.push(date)
            }

            // if role is not "Semua Role" then set role params
            if (filters.role !== undefined && !filters.role.includes("Semua Role")) {
                const role = filters.role.map(r => "role=" + r).join("&")
                params.push(role)
            }

            // if kategori is not empty then set category params
            if (filters.kategori !== undefined && filters.kategori.length !== 0) {
                const kategori = "category=" + filters.kategori
                params.push(kategori)
            }

            // if search field is not empty then set search params
            if (filters.search !== undefined && filters.search.length !== 0) {
                const search = "search=" + filters.search
                params.push(search)
            }

            // join all params then create request to backend 
            const res = await videoTutorAPI.getListVideoAdmin("?" + params.join("&"))
            setListVideoAdmin((value) => (value = res.data.result))
        }
        catch (err) {
            // TODO: handle the error with better implementation
            console.log("getListVideoAdminError", err)
        }
    }

    // getListPlaylist get list of playlist that matched given role and category
    async function getListPlaylist(role, category) {
        try {
            const res = await videoTutorAPI.getListPlaylist(role, category)
            console.log(res.data.result)
            setListPlayList((value) => (value = res.data.result))
        }
        catch (err) {
            // TODO: handle the error with better implementation
            console.log("getListPlaylistError", err)
        }
    }


    // getLsitCategories get list categories
    async function getListCategories() {
        try {
            const res = await videoTutorAPI.getListCategories()
            setListCategories((value) => (value = res.data.result))
        }
        catch (err) {
            // TODO: handle the error with better implementation
            console.log("getListCategoriesError", err)
        }
    }


    // modifyCategories used to modify current categories based on given type.
    // When "add" type is defined then it would be add new category to list,
    // when "remove" type is defined then remove selected category from list
    async function modifyCategories(type, category) {
        try {
            if (type.includes("add")) {
                const body = JSON.stringify([...listCategories, category])
                await videoTutorAPI.putCategory(body)
                setListCategories([...listCategories, category])
                return
            }

            if (type.includes("remove")) {
                const filter = listCategories.filter(cat => cat !== category)
                const body = JSON.stringify(filter)
                await videoTutorAPI.putCategory(body)
                setListCategories(filter)
                return
            }
        }
        catch (err) {
            // TODO: handle the error with better implementation
            console.log("modifyCategoriesError", err)
        }
    }


    // postSuggestion add new suggestion to video
    async function postSuggestion(payload) {
        try { await videoTutorAPI.postVideoSuggestion(payload) }
        catch (err) {
            // TODO: handle the error with better implementation
            console.log("postSuggestion", err)
        }
    }


    // postVideo upload new video. It would check each payload first
    // to make sure no field is empty then start the upload of video first,
    // next after video upload is succeed then upload the thumbnail.
    // After all upload file succeed then add the video data to server.
    function postVideo(payload) {

        // check each field value, if one or more field is empty
        // then abort upload and show alert
        // const keys = Object.keys(payload)
        // for (let i = 0; i < keys.length; i++) {
        //     if (payload[keys[i]] === null || payload[keys[i]].length === 0) {
        //         Swal.fire({
        //             position: "center",
        //             icon: "error",
        //             title: "Harap untuk mengisi field " + keys[i],
        //             showConfirmButton: false,
        //             timer: 1500
        //         })
        //         return
        //     }
        // }


        // create video upload
        const video = uploadVideo(payload.video)
        setProgress(true)
        video.start()
        // video.options.onSuccess = function () {

        //     // read url and hash of uploaded file
        //     let vurl = video.url.split("/");
        //     let vhash = vurl[vurl.length - 1];

        //     // add new key video_id that contain
        //     // hashed filename of uplaoded file then remove
        //     // the video from payload
        //     payload.video_id = vhash
        //     delete payload.video;

        //     // create the thumbnail upload
        //     const thumbnail = uploadThumbnail(payload.thumbnail)
        //     thumbnail.options.onSuccess = function () {

        //         // read url and hash of uploaded file
        //         let turl = thumbnail.url.split("/");
        //         let thash = turl[turl.length - 1];

        //         // add new key thumbnail_id that contain
        //         // hashed filename of uplaoded file then remove
        //         // the video from payload
        //         payload.thumbnail_id = thash
        //         delete payload.thumbnail;

        //         videoTutorAPI.postVideo(payload)
        //             .then(function () {
        //                 setProgress(false)
        //                 successUpload()
        //                 return
        //             })
        //             .catch(function (err) {
        //                 console.log("addVideoError", err)
        //                 setProgress(false)
        //                 failUpload()
        //                 return
        //             })
        //     }
        //     thumbnail.start()
        // }
        // setProgress(true)
        // video.start()
    }


    function putVideo(payload) {
        // when both video and thumbnail is defined
        if (payload.video_new !== undefined && payload.thumbnail_new !== undefined) {
            // create video upload
            const video = uploadVideo(payload.video_new)
            video.options.onSuccess = function () {

                // read url and hash of uploaded file
                let vurl = video.url.split("/");
                let vhash = vurl[vurl.length - 1];

                // add new key video_id that contain
                // hashed filename of uplaoded file then remove
                // the video from payload
                payload.video_id = vhash
                delete payload.video;

                // create the thumbnail upload
                const thumbnail = uploadThumbnail(payload.thumbnail_new)
                thumbnail.options.onSuccess = function () {

                    // read url and hash of uploaded file
                    let turl = thumbnail.url.split("/");
                    let thash = turl[turl.length - 1];

                    // add new key thumbnail_id that contain
                    // hashed filename of uplaoded file then remove
                    // the video from payload
                    payload.thumbnail_id = thash
                    delete payload.thumbnail_new;

                    videoTutorAPI.putVideo(payload.uuid, payload)
                        .then(function () {
                            setProgress(false)
                            successUpload()
                            return
                        })
                        .catch(function (err) {
                            console.log("addVideoError", err)
                            setProgress(false)
                            failUpload()
                            return
                        })
                }
                thumbnail.start()
            }
            setProgress(true)
            video.start()
            return
        }

        // only video is defined
        if (payload.video_new !== undefined && payload.thumbnail_new === undefined) {
            // create video upload
            const video = uploadVideo(payload.video_new)
            video.options.onSuccess = function () {

                // read url and hash of uploaded file
                let vurl = video.url.split("/");
                let vhash = vurl[vurl.length - 1];

                // add new key video_id that contain
                // hashed filename of uplaoded file then remove
                // the video from payload
                payload.video_id = vhash
                delete payload.video_new;

                videoTutorAPI.putVideo(payload.uuid, payload)
                    .then(function () {
                        setProgress(false)
                        successUpload()
                        return
                    })
                    .catch(function (err) {
                        console.log("addVideoError", err)
                        setProgress(false)
                        failUpload()
                        return
                    })
            }

            setProgress(true)
            video.start()
            return
        }


        // only thumbnail is defined
        if (payload.thumbnail_new !== undefined && payload.video_new === undefined) {

            // create the thumbnail upload
            const thumbnail = uploadThumbnail(payload.thumbnail_new)
            thumbnail.options.onSuccess = function () {

                // read url and hash of uploaded file
                let turl = thumbnail.url.split("/");
                let thash = turl[turl.length - 1];

                // add new key thumbnail_id that contain
                // hashed filename of uplaoded file then remove
                // the video from payload
                payload.thumbnail_id = thash
                delete payload.thumbnail_new;

                videoTutorAPI.putVideo(payload.uuid, payload)
                    .then(function () {
                        setProgress(false)
                        successUpload()
                        return
                    })
                    .catch(function (err) {
                        console.log("addVideoError", err)
                        setProgress(false)
                        failUpload()
                        return
                    })
            }

            thumbnail.start()
            return
        }


        // no files upload
        if (payload.video_new === undefined && payload.thumbnail_new === undefined) {
            videoTutorAPI.putVideo(payload.uuid, payload)
                .then(function () {
                    setProgress(false)
                    successUpload()
                    return
                })
                .catch(function (err) {
                    console.log("addVideoError", err)
                    setProgress(false)
                    failUpload()
                    return
                })

            return
        }
    }


    // putVideoVisibility update visibility of selected video to it's counterpart
    async function putVideoVisibility(video_id, visibility, user_id) {
        try {
            const body = { visibility: !visibility, user_id: user_id }
            await videoTutorAPI.putVideoVisibility(video_id, body)
            let videos = listVideoAdmin.map(function (video) {
                if (video.uuid === video_id) video.visibility = !video.visibilitya;
                return video;
            })
            setListVideoAdmin((value) => (value = videos));
        }
        catch (err) {
            // TODO: handle the error with better implementation
            console.log("modifyCategoriesError", err)
        }
    }


    // deleteVideo remove current video from interface and system 
    async function deleteVideo(video_id) {
        try {
            await videoTutorAPI.deleteVideo(video_id)
            setListVideoAdmin([
                ...listVideoAdmin.filter((list) => list.uuid !== video_id)
            ])
            return true
        }
        catch (err) {
            // TODO: handle the error with better implementation
            console.log("modifyCategoriesError", err)
        }
    }


    // set of providers that would be used by it children
    const providers = {
        basePath, userId, userRole, host,

        listVideoViewer, getListVideoViewer,
        listVideoAdmin, getListVideoAdmin,
        listCategories, getListCategories, modifyCategories,
        listPlaylist, getListPlaylist, getVideoDetail,

        videoUpdateState, setVideoUpdateState,
        modalData, setModalData,
        pagination, setPagination,

        progress, percentage,

        postVideo, putVideo, putVideoVisibility, deleteVideo,
        postSuggestion,
    }


    return (
        <VideoTutorialContext.Provider value={{ ...providers }}>
            {props.children}
        </VideoTutorialContext.Provider>
    )
}

export default VideoTutorialContextProvider