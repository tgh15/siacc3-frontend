import React, { useContext, useState } from "react";
import Modal from "../Modal/Modal";
import IconX from "../../assets/icon-x.png";
import IconConfirm from "../../assets/icon-confirm.png";
import IconSuccess from "../../assets/icon-success.png";
import { VideoTutorialContext } from "../../../../context/VideoTutorialContext";

const VideoDelete = (props) => {
  const [content, setContent] = useState("");
  const { deleteVideo } = useContext(VideoTutorialContext);

  const handleCancel = () => {
    setContent("cancel");
    setTimeout(clearState, 3000);
  };
  const handleConfirm = () => {
    deleteVideo(props.data.uuid);
    setContent("confirm");
    setTimeout(clearState, 3000);
  };

  const clearState = () => {
    setContent("");
    props.modalRef.current.closeModal();
  };

  return (
    <Modal ref={props.modalRef} modal_md>
      <div className="isi-popup" style={{ height: "auto" }}>
        {content === "confirm" ? (
          <Confirm />
        ) : content === "cancel" ? (
          <Cancel />
        ) : (
          <div>
            <img src={IconConfirm} alt="" className="icon-popup" />
            <div className="ket-popup tw-my-8 tw-text-center">
              Anda yakin ingin menghapus video ?
            </div>

            <div className="tw-flex tw-gap-8">
              <button className="btn-x-popup" onClick={handleCancel}>
                Tidak
              </button>
              <button className="btn-y-popup" onClick={handleConfirm}>
                Ya
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

const Confirm = () => {
  return (
    <div>
      <img src={IconSuccess} alt="" className="icon-popup" />
      <p className="ket-popup tw-mt-10">Video Berhasil Dihapus !</p>
    </div>
  );
};
const Cancel = () => {
  return (
    <div className="isi-popup" style={{ height: "auto" }}>
      <div>
        <img src={IconX} alt="" className="icon-popup" />
        <p className="ket-popup tw-mt-10">Video Batal Dihapus !</p>
      </div>
    </div>
  );
};

export default VideoDelete;
