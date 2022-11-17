import classNames from "classnames";
import { useContext, useEffect, useRef, useState } from "react";
import Avatar from "../../../../components/widgets/avatar"
import Helper from "../../../../helpers";
import ChatList from "./chatlist";
import "./index.scss";
import LogoSiacc from '../../../../assets/images/logo/apple-icon-152x152.png'
import { HelpdeskMessageApi } from "../../../../services/pages/helpdesk/message";


const ChatCard = props => {

    const { messages, scrollToBottom, setImageSelected } = props;

    const [dataMessage, setDataMessage] = useState([]);
    const { dateIndo, fallbackImage_ } = Helper;
    const [updateData, setUpdateData] = useState(false);

    const userUuid = Helper.getUserData().uuid;

    useEffect(() => {
        if (!updateData) {
            setDataMessage(messages)
        }

        // setTimeout(() => {
        //     scrollToBottom()
        // }, 500)



    },
        [messages]
    )

    const sendMessage = ({
        sender_id,
        chat_bot_id,
        content_id,
        content
    }) => {
        let data = new FormData();
        data.append("chat_bot_id", chat_bot_id);
        data.append("content", content);
        data.append("sender_id", sender_id)

        let dataPrev = [...dataMessage];

        HelpdeskMessageApi.create(data).then(
            res => {
                setUpdateData(true)
                dataPrev.push(res.data)
                // setDataMessage(dataPrev)

                let data = new FormData();
                data.append("content", content_id)
                data.append("content_type", "question");
                data.append("chat_bot_id", chat_bot_id);

                HelpdeskMessageApi.create(data).then(res => {
                    dataPrev.push(res.data)
                    setDataMessage(dataPrev)
                    scrollToBottom()
                }, err => {
                    console.log(err)
                })
            }, err => {
                console.log(err)
            })
    }
    // ** Formats chat data based on sender
    const formattedChatData = () => {
        let chatLog = []

        if (dataMessage && dataMessage.length > 0) {
            chatLog = dataMessage
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
                    msg: msg.content_value != null ? msg.content_value : msg.content,
                    uuid: userUuid,
                    chat_bot_id: msg.chat_bot_id,
                    time: dateIndo(msg.created_at),
                })
            } else {
                chatMessageSenderId = msg.sender.uuid
                chatMessageSenderPhoto = msg.sender.photo
                formattedChatLog.push(msgGroup)

                msgGroup = {
                    senderName: msg.sender.name,
                    senderId: msg.sender.uuid,
                    senderPhoto: msg.sender.photo,
                    messages: [
                        {
                            uuid: userUuid,
                            id: msg.id,
                            parent: msg.parent,
                            attachment: msg.attachment,
                            content_type: msg.content_type,
                            msg: msg.content_value != null ? msg.content_value : msg.content,
                            time: dateIndo(msg.created_at),
                            chat_bot_id: msg.chat_bot_id,
                        }
                    ]
                }
            }

            if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
        })
        console.log(formattedChatLog)
        return formattedChatLog
    }

    return formattedChatData().map((item, index) => {
        return dataMessage.length > 0 ? (
            <div

                key={index}
                className={classNames('chat', {
                    'chat-left': item.senderId != "" && item.senderId != userUuid,
                })}
            >

                <div className='chat-avatar'>
                    {item.senderId == '' ? <span className="mr-1 fw-bolder"> Sibot SIACC </span> : null}
                    {item.senderId == userUuid ? <span className="mr-1 fw-bolder"> {item.senderName} </span> : null}
                    <Avatar
                        onError={fallbackImage_}
                        className='box-shadow-1 cursor-pointer'
                        img={item.senderId == "" ? LogoSiacc : item.senderPhoto}
                    />

                    {item.senderId != '' && item.senderId != userUuid ? <span className="ml-1"> {item.senderName} </span> : null}
                </div>

                <div className='chat-body'>

                    {item.messages.map((chat) => (
                        <ChatList
                            chat={chat}
                            setImageSelected={setImageSelected}
                            senderId={item.senderId}
                            onSelect={({
                                sender_id,
                                chat_bot_id,
                                content_id,
                                content
                            }) => {
                                sendMessage({ sender_id, chat_bot_id, content_id, content })
                            }}
                        />
                    ))}
                </div>
            </div >
        ) : null
    })
}

export default ChatCard