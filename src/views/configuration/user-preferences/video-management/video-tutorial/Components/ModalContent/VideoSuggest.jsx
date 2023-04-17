import React, { useContext, useState } from "react";
import Modal from "../Modal/Modal";
import { VideoTutorialContext } from "../../../../../../../context/VideoTutorialContext";

const VideoSuggest = (props) => {
  const [videoSuggestion, setVideoSuggestion] = useState("");
  const { addVideoSuggestion, userId } = useContext(VideoTutorialContext);

  return (
    <Modal ref={props.modalRef}>
      <div className="[color:#6E7191] tw-text-center tw-text-base tw-font-semibold">
        Saran
      </div>
      <div className="tw-mt-11">
        {/* <ListVideo /> */}
        <div className="tw-border [padding:14px] [border-color:#D9DBE9] tw-rounded-lg tw-flex tw-mb-4">
          <div className="tw-relative">
            <img
              src={props.thumbnail}
              alt="thumbnail"
              className="tw-w-28 tw-h-16 tw-rounded-lg"
            />
          </div>
          <div className="tw-self-center tw-ml-4">
            <div className="[font-size:10px] tw-font-semibold">
              {props.judul}
            </div>
            <div className="[font-size:10px] [color:#4E4B66]">
              {props.durasi}
            </div>
          </div>
        </div>
        <span className="tw-font-semibold [font-size:10px] tw-px-3 [padding-bottom:6px]">
          Tulis saran anda mengenai video ini
        </span>
        <textarea
          className="tw-w-full tw-border tw-p-4 [border-color:#D9DBE9] tw-rounded-lg tw-outline-none [font-size:10px]"
          rows={12}
          placeholder="Tulis disini.................."
          value={videoSuggestion}
          onChange={(e) => setVideoSuggestion(e.target.value)}
        ></textarea>
        {/* <Terkirim/> */}
        <button
          style={{ margin: "20px auto !important" }}
          className="btn-y  tw-flex  "
          onClick={() =>
            addVideoSuggestion(videoSuggestion, props.uuid, userId)
          }
        >
          Kirim
        </button>
      </div>
    </Modal>
  );
};

export default VideoSuggest;
