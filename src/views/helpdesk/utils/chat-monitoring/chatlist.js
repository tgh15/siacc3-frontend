import { Fragment } from "react";
import { Download, File } from "react-feather";
import { useHistory } from "react-router-dom";
import "./index.scss";

const ChatList = props => {

    let history = useHistory()

    const { chat, senderId, setImageSelected } = props

    return (
        <div key={chat.id} className='chat-content'  >

            {/* image */}
            {chat.attachment.length > 0 && chat.attachment[0]?.type == "Image" ?
                <div className='chat-image'>
                    <img src={chat.attachment[0].url} onClick={() => setImageSelected(chat.attachment[0].url)} />
                </div>
                : null}

            {/* image */}
            {chat.attachment.length > 0 && chat.attachment[0]?.type != "Image" && chat.attachment[0].type != "Video" ?
                <div className='chat-file'>
                    <div>
                        <File size={14} /> {chat.attachment[0].name}
                    </div>
                    <div>
                        <a href={chat.attachment[0].url} download>
                            <Download size={18} />
                        </a>

                    </div>
                </div>
                : null}

            {/* video */}
            {chat.attachment.length > 0 && chat.attachment[0].type == "Video" ?
                <div >
                    <video src={chat.attachment[0].url} controls style={{ maxHeight: "20em" }} />
                </div>
                : null}

            <p>{senderId == ""
                ? chat.msg.answer
                : chat.msg.split("\n").map((line, index) => (
                    <>
                        {line}
                        <br />
                    </>
                ))}</p>



            {senderId == "" &&
                chat?.msg?.children?.length > 0 ?
                <Fragment >
                    <div className="chat-children">
                        {senderId == "" && chat.msg.children.map((child, index) => (

                            <Fragment>
                                <hr />
                                <p>{child.question}</p>

                            </Fragment>
                        ))}
                    </div>
                </Fragment>
                : null}

            <span>{chat.time}</span>
        </div>
    )
}

export default ChatList