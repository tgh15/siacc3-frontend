import React, { useContext, useState } from "react";
import { VideoContext } from "../../Context/VideoContext";
import Modal from "../Modal/Modal";

const VideoSuggest = (props) => {
  const [videoSuggestion, setVideoSuggestion] = useState("");
  const { addVideoSuggestion } = useContext(VideoContext);

  return (
    <Modal ref={props.modalRef}>
      <p className="[color:#6E7191] tw-text-center tw-text-base tw-font-semibold">
        Saran
      </p>
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
            <p className="[font-size:10px] tw-font-semibold">{props.judul}</p>
            <p className="[font-size:10px] [color:#4E4B66]">{props.durasi}</p>
          </div>
        </div>
        <p className="tw-font-semibold [font-size:10px] tw-px-3 [padding-bottom:6px]">
          Tulis saran anda mengenai video ini
        </p>
        <textarea
          className="tw-w-full tw-border tw-p-4 [border-color:#D9DBE9] tw-rounded-lg tw-outline-none [font-size:10px]"
          rows={12}
          placeholder="Tulis disini.................."
          value={videoSuggestion}
          onChange={(e) => setVideoSuggestion(e.target.value)}
        ></textarea>
        {/* <Terkirim/> */}
        <button
          className="btn-y tw-mx-auto tw-flex tw-mt-8 tw-mb-3"
          onClick={() =>
            addVideoSuggestion(videoSuggestion, props.uuid, Math.random())
          }
        >
          Kirim
        </button>
      </div>
    </Modal>
  );
};

export default VideoSuggest;
