import { useContext, useEffect, useState } from "react";
import { CornerUpLeft, CornerUpRight, Download, File, MoreVertical, Trash2, X } from "react-feather";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import "./index.scss";
import Helper from "../../../../helpers";
import parse from 'html-react-parser';

const ChatList = props => {

    const { chat, setImageSelected } = props

    const [content, setContent] = useState(null)

    const { dateIndo } = Helper
    // ** User Profile
    let userUuid = localStorage.getItem('uuid')

    return (
        <div key={chat.id} className='chat-content'  >

            {chat.parent && chat.content_type != "forward" ?
                <div className='chat-replied'>
                    <div>{chat.parent.sender.name}</div>
                    {chat.parent ? chat.parent.content : null}</div> :
                null}

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


            <p>{chat.content_type == "public_report" ?
                <div className="chat-public-report" onClick={() => alert("tes")}>
                    {content}
                </div>
                : chat.msg.split("\n").map((line, index) => (
                    <>
                        {line}
                        <br />
                    </>
                ))}
            </p>

            <span>{chat.time}</span>
        </div>
    )
}

export default ChatList