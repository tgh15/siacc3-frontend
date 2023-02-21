import { 
    useState,
    useEffect, 
    useContext, 
}                                       from "react";
import {
    X,
    File, 
    Check, 
    Trash2, 
    Download, 
    CornerUpLeft, 
    CornerUpRight, 
    MoreVertical, 
}                                       from "react-feather";
import { 
    DropdownItem, 
    DropdownMenu, 
    DropdownToggle, 
    UncontrolledDropdown 
}                                       from "reactstrap";
import { ChatContext }                  from "../../context/ChatContext";
import feedsAgentReportAPI              from "../../services/pages/feeds/agent-reports";
import imgDone                          from '../../assets/icons/done.svg'
import Helper                           from "../../helpers";

const ChatList = props => {

    const { 
        chat, 
        item, 
        modalForward,
        setModalForward, 
        setImageSelected, 
    } = props

    const {
        handleRevokeMe,
        handleRevokeAll, 
        setSelectedMessage, 
    }                               = useContext(ChatContext);
    const [content, setContent]     = useState(null)

    const renderReport = (msg) => {

        feedsAgentReportAPI.detailAgentReport({ agent_report_id: parseInt(msg) })
            .then(res => {
                if(!res.is_error){    
                    setContent(res.data.title)
                }
            }, err => {
                console.log(err)
            })
    }

    // ** User Profile
    let userUuid = Helper.getUserData().uuid;
    useEffect(() => {
        if (chat.content_type == "link") {
            renderReport(chat.content)
        }
    }, [])

    return (
        <div key={chat.id} className='chat-content'  >
            <div className='overlay'>
                <UncontrolledDropdown>
                    <DropdownToggle tag='div'>
                        <MoreVertical />
                    </DropdownToggle>
                    <DropdownMenu right={
                        item.senderId == userUuid ? true : false
                    }>
                        <DropdownItem tag="a" onClick={() => setSelectedMessage(chat)}>
                            <CornerUpLeft size={14} /> Balas Percakapan
                        </DropdownItem>
                        <DropdownItem tag="a" onClick={() => { setSelectedMessage(chat); setModalForward(!modalForward) }}>
                            <CornerUpRight size={14} /> Teruskan Percakapan
                        </DropdownItem>
                        <DropdownItem tag="a" onClick={() => { handleRevokeMe(chat.id); }}>
                            <X size={14} /> Hapus Percakapan untuk saya
                        </DropdownItem>
                        <DropdownItem tag="a" onClick={() => { handleRevokeAll(chat.id); }}>
                            <Trash2 size={14} /> Hapus Percakapan untuk Semua
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>

            {chat.content_type == "link" ?
                <div className='chat-forward'>
                    <CornerUpRight size={12} /> Berita diteruskan :
                </div> : null}
            {chat.content_type == "link" ?
                <div >
                    {renderReport(chat.msg)}
                </div> : null}

            {chat.content_type == "forward" ?
                <div className='chat-forward'>
                    <CornerUpRight size={12} /> Diteruskan
                </div> : null}

            {chat.parent && chat.content_type != "forward" ?
                <div className='chat-replied'>
                    <div>{chat.parent.sender.name}</div>
                    {chat.parent ? chat.parent.content : null}</div> :
                null}

            {/* image */}
            {chat.attachment && chat.attachment[0].type == "Image" ?
                <div className='chat-image'>
                    <img src={chat.attachment[0].content} onClick={() => setImageSelected(chat.attachment[0].content)} />
                </div>
                : null}

            {/* file */}
            {chat.attachment && chat.attachment[0].type != "Image" && chat.attachment[0].type != "Video" && chat.attachment[0].type != "Audio" ?
                <div className='chat-file'>
                    <div>
                        <File size={14} /> {chat.attachment[0].name}
                    </div>
                    <div>
                        <a href={chat.attachment[0].content} download>
                            <Download size={18} />
                        </a>

                    </div>
                </div>
                : null}

            {/* video */}
            {
                chat.attachment && chat.attachment[0].type == "Video" ?
                    <div >
                        <video src={chat.attachment[0].content} controls style={{ maxHeight: "20em" }} />
                    </div>
                : 
                    null
            }
            {/* audio */}
            {
                chat.attachment && chat.attachment[0].type == "Audio" ?
                    <div >
                        <audio src={chat.attachment[0].content} controls style={{width: '20em'}}/>
                    </div>
                : 
                    null
            }

            { item.senderId != userUuid ? <span className="chat-name">{chat.name}</span> : null}
            <p>{chat.content_type == "link" ?
                <div className="chat-public-report" onClick={() => window.location.href = `/beranda/detail/${parseInt(chat.msg)}`}>
                    {content}
                </div>
                : chat.msg}</p>
            <span>{chat.time} { chat.isRead  ? <img src={imgDone} style={{ marginLeft : "10px" ,width : "15px" }} /> : <Check className="ml-1" size={12} /> }</span>
        </div>
    )
}

export default ChatList