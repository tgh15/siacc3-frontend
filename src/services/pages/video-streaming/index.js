import { Get } from "../../core/request";

const VideoStreamingList      = (param) => Get(`communication/rtc/video-stream`, param);

const VideoStreamingAPI = {
    VideoStreamingList
};

export default VideoStreamingAPI;
