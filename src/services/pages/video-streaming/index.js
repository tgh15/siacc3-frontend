import { Get, Post } from "../../core/request";

const VideoStreamingList            = (param) => Get(`communication/rtc/video-stream`, param);

const CreateVideoStreaming          = (data) => Post(`communication/rtc/video-stream`, data);
const CreateCommentVideoStreaming   = (data, param) => Post(`communication/rtc/video-stream`,data,param);

const VideoStreamingAPI = {
    VideoStreamingList,
    CreateVideoStreaming,
    CreateCommentVideoStreaming
};

export default VideoStreamingAPI;
