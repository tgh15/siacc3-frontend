import { Fragment, useRef, useState } from "react"
import { X } from "react-feather"
import Viewer from "react-viewer"
import { Button, Input, Modal, ModalBody, ModalFooter, Spinner } from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"

import { HelpdeskChatbotApi } from "../../../services/pages/helpdesk/chatbot"

import ChatActive from "./chat-active"
import ReactDOM from 'react-dom'

const ComplaintPoppup = props => {

    const { show, setShow, token } = props


    const [messages, setMessages] = useState(null)

    const getData = () => {
        HelpdeskChatbotApi.openFromUser(token).then(res => {
            setMessages(res.data)
           
        }, err => {
            console.log(err)
        })
    }


    return (
        <Fragment>

            <Modal
                fade={false}
                className='modal-sm'
                isOpen={show}
                backdrop={false}
                contentClassName='p-0'
                onOpened={() => {
                    getData()
                    
                }}
                style={{ position: "absolute", bottom: "-3%", right: "1%", width: "300em" }}
            >
                <div className='modal-header'>
                    <p>Obrolan</p>
                    <div className='modal-actions'>
                        <a className='text-body' onClick={() => setShow(!show)}>
                            <X size={14} />
                        </a>
                    </div>
                </div>
                <ModalBody className='flex-grow-1 p-0' >

                    {messages ?
                        <ChatActive
                            data={messages}
                        /> :
                        <div className="d-flex justify-content-center" style={{ margin : "40% 0 "}}> <Spinner color="primary" size="lg"/> </div>
                         } 

                </ModalBody>

            </Modal>
        </Fragment>
    )
}

export default ComplaintPoppup