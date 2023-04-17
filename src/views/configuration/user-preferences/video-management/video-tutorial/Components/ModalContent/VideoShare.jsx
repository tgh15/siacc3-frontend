import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import IconPesan from "../../assets/icon-pesan.png";
import IconWA from "../../assets/icon-wa.png";
import IconForward from "../../assets/Forward.png";
import { VideoTutorialContext } from "../../../../../../../context/VideoTutorialContext";

const VideoShare = (props) => {
  const { userRole, host } = useContext(VideoTutorialContext);
  const [role, setRole] = useState("");
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    setRole(props.roles[0]);
  }, []);

  const copyText = () => {
    var copyText = document.getElementById("text-copy");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  };
  return (
    <Modal ref={props.modalRef} modal_md>
      <div className="[color:#6E7191] tw-text-center tw-text-base tw-font-semibold">
        Bagikan Video
      </div>
      {/* <form action=""> */}
      <div className="tw-mt-16 tw-px-2">
        <div className="[margin-bottom:10px] tw-border [border-color:#D9DBE9] tw-rounded-lg tw-px-5 tw-py-2">
          <button className="tw-flex">
            <img src={IconPesan} alt="" className="tw-w-6" />

            <div className="[color:#6E7191] tw-pl-4 [font-size:10px] tw-font-medium tw-self-center">
              Bagikan Via Pesan SIACC
            </div>
          </button>
        </div>
        <div className="[margin-bottom:10px] tw-border [border-color:#D9DBE9] tw-rounded-lg tw-px-5 tw-py-2">
          <button className="tw-flex">
            <img src={IconWA} alt="" className="tw-w-6" />
            <div className="[color:#6E7191] tw-pl-4 [font-size:10px] tw-font-medium tw-self-center">
              Bagikan Via Whatsapp
            </div>
          </button>
        </div>
        {(userRole.includes("Admin Pusat") ||
          userRole.includes("Verifikator Pusat")) && (
          <div className="[margin-bottom:10px] tw-border [border-color:#D9DBE9] tw-rounded-lg tw-px-5 tw-py-2 tw-relative">
            <div
              className="tw-flex tw-w-full"
              onClick={() => setDropdown((value) => (value = !value))}
            >
              <div className="[color:#6E7191] [font-size:10px] tw-font-medium tw-self-center tw-w-full">
                {role}
              </div>
              <img src={IconForward} alt="" className="tw-w-6" />
            </div>
            <div
              className={`${
                !dropdown && "tw-hidden"
              } tw-absolute tw-max-h-64 tw-overflow-y-scroll tw-top-10 tw-left-0 tw-right-0 tw-bg-gray-200 tw-rounded-lg tw-shadow-md tw-z-10`}
            >
              {props.roles.map((role, index) => (
                <div
                  className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-2 tw-flex tw-justify-between"
                  key={index}
                  onClick={() => {
                    setRole(role);
                    setDropdown((value) => (value = !value));
                  }}
                >
                  <span>{role}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="[margin-bottom:10px] tw-border [border-color:#D9DBE9] tw-rounded-lg tw-py-2 tw-px-3 tw-flex">
          <input
            className="[color:#6E7191] [font-size:10px] tw-w-full tw-font-medium tw-self-center tw-outline-none"
            id="text-copy"
            value={`${window.location.protocol}//${host}/video/${role}/${props.video_id}`}
          ></input>
          <button
            onClick={copyText}
            className="tw-border [border-color:#44624D] [color:#44624D] tw-rounded-lg tw-ml-auto tw-py-1 tw-px-3 tw-font-medium [font-size:10px]"
          >
            Salin
          </button>
        </div>
        <div className="tw-flex tw-mt-5">
          <input type="checkbox" name="" id="mulaidari" className="tw-w-5" />
          <label
            htmlFor="mulaidari"
            className="[color:#6E7191] tw-ml-2 tw-mr-5 [font-size:10px]"
          >
            Mulai dari
          </label>
        </div>
        <button
          className="btn-y tw-mx-auto tw-mt-16 tw-mb-9"
          style={{ margin: "10px auto" }}
          onClick={() => props.modalRef.current.closeModal()}
        >
          Selesai
        </button>
      </div>
    </Modal>
  );
};

export default VideoShare;
