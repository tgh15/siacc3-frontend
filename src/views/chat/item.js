import Avatar           from "../../components/widgets/avatar";
import Helper           from "../../helpers";
import ChatList         from "./ChatList";
import classNames       from "classnames";


const Item = props => {

    const {
        messages,
        modalForward,
        setModalForward,
        setImageSelected,
    }                                       = props;

    const { dateIndo, fallbackImage_ }      = Helper;

    // ** User Profile
    let userUuid = Helper.getUserData().uuid;

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
                    parent: msg.parent,
                    attachment: msg.attachment,
                    content_type: msg.content_type,
                    msg: msg.content,
                    isRead : msg.is_read.find(opt => opt.uuid == msg.sender.uuid)["status"],
                    name : msg.sender.name,
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
                            name : msg.sender.name,
                            id: msg.id,
                            parent: msg.parent,
                            attachment: msg.attachment,
                            content_type: msg.content_type,
                            msg: msg.content,
                            isRead : msg.is_read.find(opt => opt.uuid != msg.sender.uuid)["status"],
                            time: dateIndo(msg.created_at),
                        }
                    ]
                }
            }

            if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
        })
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
                            item={item}
                            chat={chat}
                            setImageSelected={setImageSelected}
                            setModalForward={setModalForward}
                            modalForward={modalForward} 
                        />
                    ))}
                </div>
            </div >
        )
    })
}

export default Item