import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import IconClose from "../../assets/icon-close.png";

const Modal = forwardRef((props, ref) => {
  const [displayModal, setDisplayModal] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      closeModal: () => close(),
    };
  });

  const open = () => {
    setDisplayModal(true);
  };
  const close = () => {
    setDisplayModal(false);
    history.replaceState(null, null, " ");
  };

  if (displayModal) {
    return ReactDOM.createPortal(
      <div className={classes.modal_wrapper}>
        <div className={classes.modal_backdrop} />
        <div
          className={[
            classes.modal_box,
            props.modal_lg && classes.modal_box_lg,
            props.modal_md && classes.modal_box_md,
          ].join(" ")}
        >
          <button className={classes.modal_close} onClick={close}>
            <img src={IconClose} alt="" className="tw-w-6" />
          </button>
          {props.children}
        </div>
      </div>,
      document.getElementById("modal-root")
    );
  }
  return null;
});

export default Modal;
