import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { CornerUpLeft, CornerUpRight, Download, File, MoreVertical, Trash2, X } from "react-feather";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import Avatar from "../../../../components/widgets/avatar"
import Helper from "../../../../helpers";
import ChatList from "./chatlist";
import "./index.scss";


const ChatCard = props => {

    const { messages, setImageSelected } = props;

    const { dateIndo, fallbackImage_ } = Helper;

    const [publicReport, setPublicReport] = useState();

    // ** User Profile
    let userUuid = localStorage.getItem('uuid');
    // ** Formats chat data based on sender
    const formattedChatData = () => {
        let chatLog = []
        if (messages && messages.length > 0) {
            chatLog = messages
        }

        const formattedChatLog = []
        let chatMessageSenderId = chatLog[0] ? chatLog[0].sender.uuid : undefined
        let chatMessageSenderPhoto = chatLog[0] ? chatLog[0].sender.photo : undefined

        let msgGroup = {
            senderId: chatMessageSenderId,
            senderPhoto: chatMessageSenderPhoto,
            messages: []
        }

        chatLog.forEach((msg, index) => {

            if (chatMessageSenderId === msg.sender.uuid) {
                msgGroup.messages.push({
                    id: msg.id,
                    parent: msg.parent,
                    attachment: msg.attachment,
                    content_type: msg.content_type,
                    msg: msg.content,
                    time: dateIndo(msg.created_at),
                })
            } else {
                chatMessageSenderId = msg.sender.uuid
                chatMessageSenderPhoto = msg.sender.photo
                formattedChatLog.push(msgGroup)

                msgGroup = {
                    senderId: msg.sender.uuid,
                    senderPhoto: msg.sender.avatar,
                    messages: [
                        {
                            id: msg.id,
                            parent: msg.parent,
                            attachment: msg.attachment,
                            content_type: msg.content_type,
                            msg: msg.content,
                            time: dateIndo(msg.created_at),
                        }
                    ]
                }
            }

            if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
        })
        // console.log(formattedChatLog)
        return formattedChatLog
    }

    return formattedChatData().map((item, index) => {

        return (
            <div
                key={index}
                className={classNames('chat', {
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
                            chat                = {chat}
                            setImageSelected    = {setImageSelected}
                        />
                    ))}
                </div>
            </div >
        )
    })
}

export default ChatCard