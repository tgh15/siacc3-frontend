// ** React Imports
import { useState, useEffect, useRef, useContext, Fragment } from 'react'


// ** Custom Components
import Avatar from '@components/avatar'


// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { MessageSquare, Menu, MoreVertical, Image, Send, Eye, X, Archive, UserX, File, ChevronDown, CornerUpLeft, Trash2, CornerUpRight, Download, Mic } from 'react-feather'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Label,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Button,
  Media,
} from 'reactstrap'
import { ChatContext } from '../../context/ChatContext'
import Helper from '../../helpers'
import ModalForward from './ModalForward'
import ChatApi from '../../services/pages/chat'
import Viewer from 'react-viewer'
import Item from './item'

import '../../components/scss/base/pages/app-chat.scss'
import '../../components/scss/base/pages/app-chat-list.scss'
import ModalRecord from './ModalRecord'

const ChatLog = props => {
  // ** Props & Store
  const { handleUser, handleUserSidebarRight,userSidebarLeft } = props
  const { roomSelected, messages, chatArea, scrollToBottom, sendMessage, setSelectedMessage, selectedMessage, handleEndChat, handleArchive, handleUnArchive, markAsUnread, markAsRead } = useContext(ChatContext)
  const { fallbackImage_, dateIndo } = Helper
  const [publicReport, setPublicReport] = useState();


  // ** State
  const [msg, setMsg] = useState('')
  const [modalForward, setModalForward] = useState(false)
  const [imageSelected, setImageSelected] = useState(null)
  const [modalRecord, setModalRecord] = useState(false)

  // ** If user chat is not empty scrollToBottom
  useEffect(() => {
    if (messages && messages.length > 0) {
      scrollToBottom()
    }
  }, [messages])


  const selectFile = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      // setPhoto(reader.result)
    }
    reader.readAsDataURL(files[0])

    let data = new FormData();
    data.append("attachment[]", files[0]);

    ChatApi.uploadAttachment({
      dataFile: data,
      onSuccess: (res) => {
        sendMessage("", [res[0].id])
      },
      onFail: (err) => {
        console.log(err)
      }
    })

  }




  // ** Sends New Msg
  const handleSendMsg = e => {
    sendMessage(msg, []);

    e.preventDefault()
    if (msg.length) {
      setMsg('')
    }

  }


  // ** ChatWrapper tag based on chat's length
  const ChatWrapper = messages && messages && Object.keys(messages).length ? PerfectScrollbar : 'div'

  return (
    <Fragment>

      <Viewer
        visible={imageSelected}
        onClose={() => {
          setImageSelected(null)
        }}
        images={[{ src: imageSelected }]}
        container={document.getElementById("container")}
      />

      <ModalForward show={modalForward} setShow={(par) => setModalForward(par)} />

      <ModalRecord show={modalRecord} setShow={(par) => setModalRecord(par)} />

      <div className='chat-app-window'>
        <div className={classnames('start-chat-area', { 'd-none': roomSelected })}>
          <div className='start-chat-icon mb-1'>
            <MessageSquare />
          </div>
          <h4 className='sidebar-toggle start-chat-text' >
            Mulai Percakapan
          </h4>
        </div>

        {roomSelected ? (

          <div className={classnames('active-chat', { 'd-none': roomSelected === null })}>
            <div className='chat-navbar'>
              <header className='chat-header'>
                <div className='d-flex align-items-center'>
                  <div className='sidebar-toggle d-block d-lg-none mr-1'>
                    <Menu size={21} />
                  </div>
                  <Avatar
                    imgHeight='36'
                    imgWidth='36'
                    img={roomSelected && roomSelected.avatar}
                    onError={fallbackImage_}
                    className='avatar-border user-profile-toggle m-0 mr-1'
                  />
                  <h6 className='mb-0'>{roomSelected && roomSelected.name}</h6>
                </div>
                <div className='d-flex align-items-center'>
                  <UncontrolledDropdown>
                    <DropdownToggle className='btn-icon' color='transparent' size='sm'>
                      <MoreVertical size='18' />
                    </DropdownToggle>

                    {userSidebarLeft ?
                      <DropdownMenu right >
                        <DropdownItem style={{ width: "100%" }} onClick={() => { handleUnArchive(roomSelected.id) }}>
                          <X size={18} /> {' '} Batalkan Arsipkan
                        </DropdownItem>
                      </DropdownMenu>
                      :
                      <DropdownMenu right >
                        {roomSelected.type == "group" ?
                          <DropdownItem style={{ width: "100%" }} onClick={handleUserSidebarRight}>
                            <Eye size={18} />{' '} Lihat Detail Group
                          </DropdownItem>
                          : null
                        }
                        <DropdownItem style={{ width: "100%" }} onClick={() => { handleEndChat(roomSelected.id) }}>
                          <X size={18} /> {' '} Akhiri Percakapan
                        </DropdownItem>
                        <DropdownItem style={{ width: "100%" }} onClick={() => { handleArchive(roomSelected.id) }}>
                          <Archive size={18} />{' '} Arsipkan Percakapan
                        </DropdownItem>

                        {roomSelected.un_read_message == 0 ?
                          <DropdownItem style={{ width: "100%" }} onClick={() => markAsUnread(roomSelected.id)}>
                            <UserX size={18} />{' '} Tandai Belum Dibaca
                          </DropdownItem>
                          :
                          <DropdownItem style={{ width: "100%" }} onClick={() => markAsRead(roomSelected.id)}>
                            <Check size={18} />{' '} Tandai Sudah Dibaca
                          </DropdownItem>}
                      </DropdownMenu>
                    }

                  </UncontrolledDropdown>
                </div>
              </header>
            </div>

            <ChatWrapper className='user-chats' ref={chatArea} options={{ wheelPropagation: false }} >
              {messages && messages.length > 0 ? <div className='chats' style={{ maxWidth: "97.5%" }}>
                <Item messages={messages}
                  setImageSelected={(par) => { setImageSelected(par) }}
                  setModalForward={(par) => { setModalForward(par); setSelectedMessage(null) }}
                  modalForward={modalForward}
                />
              </div> : null}

            </ChatWrapper>

            {selectedMessage && !modalForward ? <div className='chat-reply'>

              <span> {selectedMessage && selectedMessage.msg}</span>
              <div>
                <X onClick={() => setSelectedMessage(null)} />
              </div>
            </div> : null}

            <Form className='chat-app-form' onSubmit={e => handleSendMsg(e)}>
              <InputGroup className='input-group-merge mr-1 form-send-message'>
                <Input
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  placeholder='Aa'
                />
                <InputGroupAddon addonType='append'>

                  <InputGroupText>
                    <div>
                      <Button size="sm" type="button" className='button-mic mb-0' >
                        <Mic className='cursor-pointer text-secondary ' size={20}
                          onClick={() => {
                            setModalRecord(true)
                          }} />
                      </Button>
                    </div>

                    <Label className='attachment-icon mb-0 ml-2' for='attach-doc'>
                      <Image className='cursor-pointer text-secondary' size={20} />
                      <input type='file' id='attach-doc' hidden onChange={(e) => selectFile(e)} />
                    </Label>

                    <Label className='attachment-icon mb-0 ml-2' for='attach-doc'>
                      <File className='cursor-pointer text-secondary' size={20} />
                      <input type='file' id='attach-doc' hidden />
                    </Label>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <Button className='send' color='primary' disabled={!msg.length}>
                <Send size={14} className='d-lg-none' />
                <span className='d-none d-lg-block' >Kirim</span>
              </Button>
            </Form>
          </div>
        ) : null}
      </div>
    </Fragment >
  )
}

export default ChatLog
