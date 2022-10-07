import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'



export const ModalBase = ({ children, title, show, setShow, size, center, scrollable, footer, unmount, onclose, onOpened, backdrop }) => {
    let isScroll
    if (scrollable) {
        isScroll = "modal-dialog-scrollable";
    }

    return (
        <Modal
            size            = {(size) ? size : "md"}
            isOpen          = {show}
            toggle          = {() => {setShow(!show)}}
            centered        = {center == undefined ? false : true}
            className       = {(center) ? `modal-dialog-centered ${isScroll}` : `modal-dialog ${isScroll}`}
            unmountOnClose  = {unmount == undefined ? true : unmount}
            onOpened        = {onOpened}
            backdrop        = {backdrop == undefined ? true : backdrop}

        >
            <ModalHeader toggle={typeof onclose == 'function' ? () => {setShow(!show);onclose();} : () => {setShow(!show); } }>
                {title}
            </ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>

            {
                (footer) ? 
                    <ModalFooter className="d-flex justify-content-between">
                        {footer}
                    </ModalFooter>
                : 
                    null
            }
            
        </Modal>
    )
}

