// ** React Imports
import { 
    useState,
    Fragment, 
    useContext, 
}                           from 'react'
// ** Custom Components
import Avatar               from '@components/avatar'

// ** Third Party Components
import { X, Search }        from 'react-feather'
import PerfectScrollbar     from 'react-perfect-scrollbar'
import {
    Modal,
    Input,
    Media,
    ModalBody,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
}                           from 'reactstrap'

import { ChatContext }      from '../../../../context/ChatContext'
import Helper               from '../../../../helpers'

import "./index.scss"


const ChatRoomPopup = () => {

    const { fallbackImage_ } = Helper;

    // ** Props & Custom Hooks
    const { 
        room,
        getMessages,
        setChatPopup,
        chatRoomPopup, 
        setRoomSelected,
        setChatRoomPopup, 
        connectChatSocket,
    }                                   = useContext(ChatContext)
    const [searchTerm, setSearchTerm]   = useState("")

    const handleClick = (item) => {
        setChatPopup(true); 
        getMessages(item.id); 
        setRoomSelected(item); 
        setChatRoomPopup(false);
        connectChatSocket(item.id)
    }

    const renderMessageItems = () => {
        return (
            <PerfectScrollbar
                options     = {{wheelPropagation: false}}
                component   = 'div'
                className   = 'media-list scrollable-container'
            >
                {
                    room != null && room.filter((val) => {
                        if (searchTerm == "") {
                            return val
                        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val
                        }
                    }).map((item, index) => {
                        return (
                            <Fragment>
                                <a 
                                    key         = {index} 
                                    href        = '/' 
                                    onClick     = {(e) => {
                                        e.preventDefault();
                                        handleClick(item);
                                    }}
                                    className   = 'd-flex' 

                                >
                                    <Media
                                        className=" room-items"
                                    >
                                        <Media left>
                                            <Avatar
                                                img     = {item.avatar}
                                                onError = {fallbackImage_} 
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
                                            <small className='notification-text'>
                                                {item.subtitle}
                                            </small>
                                        </Media>
                                    </Media>
                                </a>
                                <hr className='m-0' />
                            </Fragment>
                        )
                    })
                }
            </PerfectScrollbar>
        )
    }

    return (
        <Modal  
            fade                = {false}
            style               = {{ position: "absolute", bottom: "-4%", right:"1%" , width: "300em" }}
            isOpen              = {chatRoomPopup}
            backdrop            = {false}
            className           = 'modal-sm'
            contentClassName    = 'p-0'
        >
            <div className='modal-header'>

                <h4>Komunikasi</h4>
                <div className='modal-actions'>
                    <a 
                        onClick     = {() => { setChatRoomPopup(false); }}
                        className   = 'text-body' 
                    >
                        <X size={14} />
                    </a>
                </div>
            </div>
            <ModalBody 
                style       = {{ minHeight: "300px" }}
                className   = 'flex-grow-1 p-0' 
            >
                <InputGroup className='input-group-merge mb-1 p-1'>
                    <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                            <Search size={14} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                        onChange    = {(e) => { setSearchTerm(e.target.value) }} 
                        placeholder = 'Cari Percakapan' 
                    />
                </InputGroup>
                <hr className='m-0' />
                {renderMessageItems()}
            </ModalBody>
        </Modal>
    )
}

export default ChatRoomPopup
