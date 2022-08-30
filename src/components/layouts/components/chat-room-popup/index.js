// ** React Imports
import { useContext, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
// ** Custom Components
import Avatar from '@components/avatar'
import "./index.scss"
// ** Third Party Components
import { X, Search } from 'react-feather'
import {
    Modal,
    ModalBody,
    Media,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input
} from 'reactstrap'

// ** User Avatars

import { ChatContext } from '../../../../context/ChatContext'
import Helper from '../../../../helpers'
import { Fragment } from 'react'

const ChatRoomPopup = props => {

    const { fallbackImage_ } = Helper;

    // ** Props & Custom Hooks
    const { chatRoomPopup, setChatRoomPopup, room,setChatPopup,getMessages,setRoomSelected } = useContext(ChatContext)
    const [searchTerm, setSearchTerm] = useState("")
    // ** Toggles Compose POPUP

    const renderMessageItems = () => {
        return (
            <PerfectScrollbar
                component='div'
                className='media-list scrollable-container'
                options={{
                    wheelPropagation: false
                }}
            >
                {room != null && room.filter((val) => {
                    if (searchTerm == "") {
                        return val
                    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                }).map((item, index) => {
                    return (
                        <Fragment>
                            <a key={index} className='d-flex' href='/' onClick={(e) => {e.preventDefault();setChatRoomPopup(false);setChatPopup(true); setRoomSelected(item); getMessages(item.id) } }>
                                <Media
                                    className=" room-items"
                                >
                                    <Media left>
                                        <Avatar
                                            onError={fallbackImage_} 
                                            img={item.avatar}
                                        />
                                    </Media>
                                    <Media body>
                                        <div className='d-flex justify-content-between'>
                                            <span className='text-secondary'>
                                                {item.name}
                                            </span>
                                            <span className='text-muted'>
                                                {Helper.getTimeAgo(item.time)}
                                            </span>
                                        </div>
                                        <small className='notification-text'>{item.subtitle}</small>
                                    </Media>
                                </Media>
                            </a>
                            <hr className='m-0' />
                        </Fragment>
                    )
                })}
            </PerfectScrollbar>
        )
    }

    return (
        <Modal  
            fade={false}
            className='modal-sm'
            isOpen={chatRoomPopup}
            backdrop={false}
            contentClassName='p-0'
            style={{ position: "absolute", bottom: "-4%", right:"1%" , width: "300em" }}
        >
            <div className='modal-header'>

                <h4>Komunikasi</h4>
                <div className='modal-actions'>
                    <a className='text-body' onClick={() => { setChatRoomPopup(false); }}>
                        <X size={14} />
                    </a>
                </div>
            </div>
            <ModalBody className='flex-grow-1 p-0' style={{ minHeight: "300px" }}>
                <InputGroup className='input-group-merge mb-1 p-1'>
                    <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                            <Search size={14} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder='Cari Percakapan' onChange={(e) => { setSearchTerm(e.target.value) }} />
                </InputGroup>
                <hr className='m-0' />
                {renderMessageItems()}
            </ModalBody>
        </Modal>
    )
}

export default ChatRoomPopup
