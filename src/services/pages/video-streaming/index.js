import { Get, Post } from "../../core/request";

const VideoStreamingList      = (param) => Get(`communication/rtc/video-stream`, param);

const CreateVideoStreaming    = (data) => Post(`communication/rtc/video-stream`, data);

const VideoStreamingAPI = {
    VideoStreamingList,

    CreateVideoStreaming
};

export default VideoStreamingAPI;
