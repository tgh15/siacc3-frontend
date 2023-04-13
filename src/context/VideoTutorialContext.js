import React, { createContext, useState } from 'react'
import { videoTutorAPI } from '../services/pages/configuration/user-preferences/video-tutorial'
import Swal from 'sweetalert2';

export const VideoTutorialContext = createContext()

const VideoTutorialContextProvider = (props) => {

    // video tutorial states
    const [listVideoAdmin, setListVideoAdmin] = useState([]);
    const [listVideoViewer, setListVideoViewer] = useState([]);
    const [listCategories, setListCategories] = useState([])
    const [listPlaylist, setListPlayList] = useState([]);
    const [progress, setProgress] = useState(false);
    const [videoPercentage, setVideoPercentage] = useState(0)
    const [thumbnailPercentage, setThumbnailPercentage] = useState(0)
    const [percentage, setPercentage] = useState(0)
    // const [modalData, setModalData] = useState({});
    // const [videoUpdateState, setVideoUpdateState] = useState({});
    // const [pagination, setPagination] = useState({
    //     current_page: 1,
    //     total_page: 1,
    // });


    // helpers function to format date to "date/month/year" format
    function formatDate(date) {
        return new Intl
            .DateTimeFormat("id-ID", { day: "2-digit", month: "2-digit", year: "numearic" })
            .format(date)
            .toString()
    }


    // getListVideoViewer get list video for viewer based on given role
    async function getListVideoViewer(role) {
        try {
            const res = await videoTutorAPI.getListVideoViewer(role)
            setListVideoViewer((value) => value = res.data.result)
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
            if (filters.upload_date !== undefined && filters.upload_date.length === 1) {
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
            setListVideoAdmin((value) => value = res.data.result)
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
            setListPlayList((value) => value = res.data.result)
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
            setListCategories((value) => value = res.data.result)
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


    async function postVideo(payload) {
        try {
            // let video_uploaded = false, thumbnail_uploaded = false;

            // video upload
            const video = videoTutorAPI.videoUploadEndpoint(payload.video)

            // onError triggered when upload failed
            video.options.onError = function (err) {
                console.log("videoUploadEndpointErr", err)
            }

            // onProgress show current progress video of upload
            video.options.onProgress = function (bu, bt) {
                setVideoPercentage(((bu / bt) * 100).toFixed(2))
            }

            // onSuccess triggered when upload succeed
            video.options.onSuccess = function () {

                // read url and hash of uploaded file
                let url = video.url.split("/");
                let hash = url[url.length - 1];

                // add new key video_id that contain
                // hashed filename of uplaoded file then remove
                // the video from payload
                payload.video_id = hash
                delete payload.video;
            }


            // thumbnail upload
            const thumbnail = videoTutorAPI.thumbnailUploadEndpoint(payload.thumbnail)

            // onError triggered when upload failed
            thumbnail.options.onError = function (err) {
                console.log("thumbnailUploadEndpointErr", err)
            }

            // onProgress show current progress of thumbnail upload
            thumbnail.options.onProgress = function (bu, bt) {
                setThumbnailPercentage(((bu / bt) * 100).toFixed(2))
            }

            // onSuccess triggered when upload succeed
            thumbnail.options.onSuccess = function () {

                // read url and hash of uploaded file
                let url = thumbnail.url.split("/");
                let hash = url[url.length - 1];

                // add new key video_id that contain
                // hashed filename of uplaoded file then remove
                // the video from payload
                payload.thumbnail_id = hash
                delete payload.thumbnail;
            }

            setProgress(true)
            video.start()
            thumbnail.start()
            setPercentage((videoPercentage + thumbnailPercentage) / 2)
            setProgress(false)


            // post video data to backend after uploading done and succeed
            videoTutorAPI.postVideo(payload)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Video Berhasil Diunggah",
                showConfirmButton: false,
                timer: 1500
            })


        }
        catch (err) {
            // TODO: handle the error with better implementation
            console.log("postVideoError", err)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Video Gagal Diunggah",
                showConfirmButton: false,
                timer: 1500
            })
        }
    }



    // set of providers that would be used by it's children
    const providers = {
        listVideoViewer, getListVideoViewer,
        listVideoAdmin, getListVideoAdmin,
        listCategories, getListCategories, modifyCategories,
        listPlaylist, getListPlaylist,
        postVideo,
    }


    return (
        <VideoTutorialContext.Provider value={{ ...providers }}>
            {props.children}
        </VideoTutorialContext.Provider>
    )
}

export default VideoTutorialContextProvider