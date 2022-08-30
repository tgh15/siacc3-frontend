// ** React Imports
import { Fragment, useContext, useEffect, useRef, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import {
  X,
  Image,
  File,
  Mic
} from 'react-feather'

import {
  Modal,
  ModalBody,
  Input,
  ModalFooter,
  Media,
  Label,
  Button
} from 'reactstrap'

import Helper             from '../../../../helpers'
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ChatContext } from '../../../../context/ChatContext'
import '../../../scss/base/pages/popup-chat.scss'
import Viewer from 'react-viewer'
import ModalForward from '../../../../views/chat/ModalForward'
import ChatApi from '../../../../services/pages/chat'
import ChatList from '../../../../views/chat/ChatList'
import "./index.scss"
import ModalRecord from '../../../../views/chat/ModalRecord'
import ReactDOM from 'react-dom';

const ChatPopup = () => {
  // ** Props & Custom Hooks
  const { chatPopup, setChatPopup, roomSelected, messages, selectedMessage,  setSelectedMessage, handleRevokeMe, handleRevokeAll, sendMessage } = useContext(ChatContext)
  const { fallbackImage_, dateIndo } = Helper
  const [modalForward, setModalForward] = useState(false)
  const [imageSelected, setImageSelected] = useState(null)
  const [inputText, setInputText] = useState("")
  const [modalRecord, setModalRecord] = useState(false)
  const chatArea = useRef()

  // ** User Profile
  let userUuid = localStorage.getItem('uuid')

  // ** Toggles Compose POPUP
  const togglePopUp = e => {
    e.preventDefault()
    setChatPopup(!chatPopup)
  }

  const scrollToBottom = () => {
    const chatContainer = ReactDOM.findDOMNode(chatArea.current)
    chatContainer.scrollTop = Number.MAX_SAFE_INTEGER
  };

  // ** Formats chat data based on sender
  const formattedChatData = () => {
    let chatLog = []
    if (messages && messages.length > 0) {
      chatLog = messages
    }

    const formattedChatLog = []
    let chatMessageSenderId = chatLog[0] ? chatLog[0].sender.uuid : undefined
    let chatMessageSenderPhoto = chatLog[0] ? chatLog[0].sender.avatar : undefined

    let msgGroup = {
      senderId: chatMessageSenderId,
      senderPhoto: chatMessageSenderPhoto,
      messages: []
    }

    chatLog.forEach((msg, index) => {

      if (chatMessageSenderId === msg.sender.uuid) {
        msgGroup.messages.push({
          id: msg.id,
          name: msg.sender.name,
          parent: msg.parent,
          attachment: msg.attachment,
          content_type: msg.content_type,
          msg: msg.content,
          isRead: msg.is_read.find(opt => opt.uuid == msg.sender.uuid)["status"],
          time: dateIndo(msg.created_at),
        })
      } else {
        chatMessageSenderId = msg.sender.uuid
        chatMessageSenderPhoto = msg.sender.avatar
        formattedChatLog.push(msgGroup)

        msgGroup = {
          senderId: msg.sender.uuid,
          senderPhoto: msg.sender.avatar,
          messages: [
            {
              id: msg.id,
              name: msg.sender.name,
              parent: msg.parent,
              attachment: msg.attachment,
              content_type: msg.content_type,
              msg: msg.content,
              isRead: msg.is_read.find(opt => opt.uuid != msg.sender.uuid)["status"],
              time: dateIndo(msg.created_at),
            }
          ]
        }
      }

      if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
    })
    return formattedChatLog
  }

  // ** Renders user chat
  const renderChats = () => {
    return formattedChatData().map((item, index) => {

      return (

        <div
          key={index}
          className={classnames('chat', {
            'chat-left': item.senderId != userUuid
          })}
        >

          <div className='chat-avatar'>
            <Avatar
              onError={fallbackImage_}
              className='box-shadow-1 cursor-pointer'
              img={item.senderPhoto}
            />
          </div>

          <div className='chat-body'>

            {item.messages.map(chat => (
              <ChatList
                item={item}
                chat={chat}
              />

            ))}
          </div>
        </div >
      )
    })
  }

  // ** ChatWrapper tag based on chat's length
  const ChatWrapper = messages && messages && Object.keys(messages).length ? PerfectScrollbar : 'div'

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



  const onSubmit = (e) => {
    if (e.key === 'Enter') {
      sendMessage(e.target.value, [])
      setInputText("")
    }
  }

  useEffect(() => {
    if(chatArea.current){
      setTimeout(scrollToBottom(),500)
    }
  }, [chatArea.current])



  return (
    <div id="chat-popup-modal">
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

      <Modal
        fade              = {false}
        style             = {{ position: "absolute", bottom: "-4%", right: "1%", width: "300em" }}
        isOpen            = {chatPopup}
        toggle            = {() => setChatPopup(!chatPopup)}
        backdrop          = {true}
        className         = 'modal-sm'
        contentClassName  = 'p-0'
        onBlur            = {() => console.log('keluar', 'check')}
        autoFocus         = {true}
      >
        <div className='modal-header'>
          <Media>
            <Media left>
              <Avatar onError={fallbackImage_} img={roomSelected && roomSelected.avatar} size={"sm"} />
            </Media>
            <Media body>
              <Media className="ml-1">
                <h5 className='text-bolder'> {roomSelected && roomSelected.name} </h5>
              </Media>
            </Media>
          </Media>
          <div className='modal-actions'>
            <a href='/' className='text-body' onClick={togglePopUp}>
              <X size={14} />
            </a>
          </div>
        </div>
        <ModalBody className='flex-grow-1 p-0' style={{ height: "300px" }}>
          <ChatWrapper className='user-chats' ref={chatArea} options={{ wheelPropagation: false }} >
            {renderChats()}
          </ChatWrapper>

        </ModalBody>
        {selectedMessage ? <div className='chat-reply' >
          {selectedMessage.msg}
          <X size={20} onClick={() => { setSelectedMessage(null) }} />
        </div> : null}
        <ModalFooter className="d-flex justify-content-between px-1">

          <div>
            <Label className='attachment-icon mb-0' for='attach-doc'>
              <Image className='cursor-pointer text-secondary' size={20} />
              <input type='file' id='attach-doc' hidden onChange={(e) => selectFile(e)} />
            </Label>

            <Label className='attachment-icon mb-0 ml-1' for='attach-doc'>
              <File className='cursor-pointer text-secondary' size={20} />
              <input type='file' id='attach-doc' hidden onChange={(e) => selectFile(e)} />
            </Label>

            <Button size="sm" type="button" className='button-mic mb-0'>
              <Mic className='cursor-pointer text-secondary ' size={20}
                onClick={() => {
                  setModalRecord(true)
                }} />
            </Button>

          </div>
          <div>
            <Input placeholder="Aa" style={{ width: "250px" }} value={inputText} onChange={(e) => { setInputText(e.target.value) }} onKeyDown={(e) => onSubmit(e)} />
          </div>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default ChatPopup
