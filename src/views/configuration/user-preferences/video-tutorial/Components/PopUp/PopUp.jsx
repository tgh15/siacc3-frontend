import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import "./PopUp.css";
import IconClose from '../../assets/icon-close.png'

const PopUp = forwardRef((props, ref) => {
  const [displayModal, setDisplayModal] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
    };
  });

  const open = () => {
    setDisplayModal(true);
  };
  const close = () => {
    setDisplayModal(false);
  };

  if (displayModal) {
    return ReactDOM.createPortal(
      <div className="popup-wrapper">
        <div className="popup-backdrop" />
        <div className="popup-box">
          <button className="popup-close" onClick={close}>
            <img src={IconClose} alt="" className="tw-w-6"/>
          </button>
          {props.children}
        </div>
      </div>,
      document.getElementById("modal-root")
    );
  }
  return null;
});

export default PopUp;
