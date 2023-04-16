import React, { useContext, useEffect, useRef } from "react";
import { VideoTutorialContext } from "../../../../../../../context/VideoTutorialContext";
import Modal from "../Modal/Modal";
import SearchBar from "../SearchBar/SearchBar";
import VideoDetail from "./VideoDetail";

const role = "Admin Daerah"; // TODO: replace with user's role

const VideoTutorial = (props) => {
  const {
    basePath,
    modalData,
    setModalData,
    listVideoViewer,
    getListVideoViewer,
    listPlaylist,
    getListPlaylist,
    // listVideoAdmin, getListVideoAdmin
  } = useContext(VideoTutorialContext);

  const detailRef = useRef();

  const handleClick = async (kategori) => {
    await getListPlaylist(role, kategori);
    await openModal();
  };

  const openModal = async () => {
    console.log("listPlaylist", listPlaylist[0]);
    await setModalData(listPlaylist[0]);
    await detailRef.current.openModal();
  };

  useEffect(() => {
    getListVideoViewer(role);
    // console.log(listPlaylist[0]);
  }, [listPlaylist]);

  return (
    <Modal ref={props.modalRef} modal_lg>
      <p className="tw-text-center [color:#6E7191] tw-font-semibold">
        Video Tutorial
      </p>
      <div className="tw-flex tw-ml-auto tw-mt-4 tw-mb-11">
        <SearchBar />
      </div>
      <div className="tw-pb-4">
        {listVideoViewer.map((item, index) => {
          return (
            <div
              onClick={() => handleClick(item.kategori)}
              className="tw-border tw-cursor-pointer tw-border-gray-200 tw-rounded-lg tw-flex tw-px-6 tw-py-5 tw-mb-4"
              key={index}
            >
              <img
                src={basePath + item.thumbnail}
                alt=""
                width="246px"
                className="[height:108px] [object-fit:cover] tw-rounded-lg"
              />
              <div className="tw-ml-14">
                <p className="tw-font-semibold tw-text-sm">{item.kategori}</p>
                <div className="tw-flex [color:#4E4B66] [font-size:13px]">
                  <div>
                    <p>Role</p>
                    <p>Jumlah Video</p>
                  </div>
                  <div className="tw-ml-4">
                    <p>
                      :{" "}
                      {item.role.replace(/[{"}]/g, "").replace(/[/{,}]/g, ", ")}
                    </p>
                    <p>: {item.jumlah_video} Video</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <VideoDetail modalRef={detailRef} />
    </Modal>
  );
};

export default VideoTutorial;
