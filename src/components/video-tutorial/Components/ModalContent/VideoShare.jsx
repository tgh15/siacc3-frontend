import React from "react";
import Modal from "../Modal/Modal";
import IconPesan from "../../assets/icon-pesan.png";
import IconWA from "../../assets/icon-wa.png";

const VideoShare = (props) => {
  const copyText = () => {
    var copyText = document.getElementById("text-copy");
    copyText.select();
  };
  return (
    <Modal ref={props.modalRef} modal_md>
      <p className="[color:#6E7191] tw-text-center tw-text-base tw-font-semibold">
        Bagikan Video
      </p>
      {/* <form action=""> */}
      <div className="tw-mt-16 tw-px-2">
        <div className="[margin-bottom:10px] tw-border [border-color:#D9DBE9] tw-rounded-lg tw-px-5 tw-py-2">
          <button className="tw-flex">
            <img src={IconPesan} alt="" className="tw-w-6" />

            <p className="[color:#6E7191] tw-pl-4 [font-size:10px] tw-font-medium tw-self-center">
              Bagikan Via Pesan SIACC
            </p>
          </button>
        </div>
        <div className="[margin-bottom:10px] tw-border [border-color:#D9DBE9] tw-rounded-lg tw-px-5 tw-py-2">
          <button className="tw-flex">
            <img src={IconWA} alt="" className="tw-w-6" />
            <p className="[color:#6E7191] tw-pl-4 [font-size:10px] tw-font-medium tw-self-center">
              Bagikan Via Whatsapp
            </p>
          </button>
        </div>
        <div className="[margin-bottom:10px] tw-border [border-color:#D9DBE9] tw-rounded-lg tw-py-2 tw-px-3 tw-flex">
          <input
            className="[color:#6E7191] [font-size:10px] tw-w-full tw-font-medium tw-self-center tw-outline-none"
            id="text-copy"
            value="https://siaccinfo.id/video/agen/193709r23rh"
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
          className="btn-y tw-mx-auto tw-flex tw-mt-16 tw-mb-9"
          onClick={() => props.modalRef.current.closeModal()}
        >
          Selesai
        </button>
      </div>
    </Modal>
  );
};

export default VideoShare;