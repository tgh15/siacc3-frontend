import { Get, Post, Delete, Put } from "../../../../core/request";


const getListVideoViewer = (role) => Get(`video-tutor/video/list/video-viewer?role=${role}`)

export const videoTutorAPI = {
    getListVideoViewer
}