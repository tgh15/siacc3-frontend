import React, { 
    useRef, 
    useMemo, 
    useState, 
    Fragment, 
    useEffect, 
} from 'react';

import { 
    Col, 
    Row, 
    Card, 
    Form, 
    Input, 
    Label, 
    Button,
    CardBody, 
    InputGroup, 
    InputGroupText, 
    InputGroupAddon, 
} from 'reactstrap';

//Icon and Image
import Ticket from '@src/assets/icons/ticket.svg';
import { 
    Lock, 
    File, 
    Send, 
    Image, 
    Download, 
    ArrowLeftCircle, 
} from 'react-feather';

import ReactDOM                     from 'react-dom';
import { useHistory, useLocation }  from 'react-router-dom';

//Helper
import Helper                       from '../../helpers';


//Css
import './style.scss';
import '@styles/base/pages/app-chat-list.scss';

//URL API
import { HelpdeskTicketApi }        from '../../services/pages/helpdesk/ticket';
import { HelpdeskMessageApi }       from '../../services/pages/helpdesk/message';

//Component
import Avatar                       from '@components/avatar';
import CustomToast                  from '../../components/widgets/custom-toast';
import AutoTextArea                 from '../../components/widgets/autotextarea';

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

const ChatLeft = ({ chat }) => {
    const { fallbackImage_, dateIndo } = Helper

    return (
        <div className="chats">
            <div className="chat-left">
                <div className="chat-avatar">
                    <Avatar
                        img       = {chat.sender.photo}
                        onError   = {fallbackImage_}
                        imgWidth  = '35'
                        imgHeight = '35'
                        className = "box-shadow-1"
                    />
                </div>

                <div className="chat-body">
                    <div className="chat-content">
                        {/* image */}
                        {
                            chat.attachment.length > 0 && chat.attachment[0]?.type == "Image" ?
                                <div className='chat-image'>
                                    <img 
                                        src     = {chat.attachment[0].url} 
                                        onClick = {() => setImageSelected(chat.attachment[0].content)} 
                                    />
                                </div>
                            : null
                        }

                        {/* image */}
                        {
                            chat.attachment.length > 0 && chat.attachment[0]?.type != "Image" && chat.attachment[0].type != "Video" ?
                                <div className='chat-file'>
                                    <div>
                                        <File size={14}/> {chat.attachment[0].name}
                                    </div>
                                    <div>
                                        <a href={chat.attachment[0].url} download>
                                            <Download size={18} />
                                        </a>
                                    </div>
                                </div>
                            : null
                        }

                        {/* video */}
                        {
                            chat.attachment.length > 0 && chat.attachment[0].type == "Video" ?
                                <div>
                                    <video 
                                        src   = {chat.attachment[0].url} 
                                        style = {{ maxHeight: "20em" }}
                                        controls 
                                    />
                                </div>
                            : null
                        }

                        <p>
                            {
                                chat.content_type == "public_report" ?
                                    <div className="chat-public-report">
                                        {content}
                                    </div>
                                : chat.content.split("\n").map((line, index) => (
                                    <>
                                        {line}
                                        <br/>
                                    </>
                                ))
                            }
                        </p>
                        <span>{dateIndo(chat.updated_at)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ChatRight = ({ chat }) => {
    const { fallbackImage_, dateIndo } = Helper;
    return (
        <div className="chats">
            <div className="chat">
                <div className="chat-avatar">
                    <Avatar
                        img       = {chat.sender.photo}
                        onError   = {fallbackImage_}
                        imgWidth  = '35'
                        imgHeight = '35'
                        className = "box-shadow-1"
                    />
                </div>

                <div className="chat-body">
                    <div className="chat-content">
                        {/* image */}
                        {
                            chat.attachment.length > 0 && chat.attachment[0]?.type == "Image" ?
                                <div className='chat-image'>
                                    <img 
                                        src     = {chat.attachment[0].url} 
                                        onClick = {() => setImageSelected(chat.attachment[0].content)}
                                    />
                                </div>
                            : null
                        }

                        {/* image */}
                        {
                            chat.attachment.length > 0 && chat.attachment[0]?.type != "Image" && chat.attachment[0].type != "Video" ?
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
                            : null
                        }

                        {/* video */}
                        {
                            chat.attachment.length > 0 && chat.attachment[0].type == "Video" ?
                                <div>
                                    <video 
                                        src      = {chat.attachment[0].url} 
                                        style    = {{ maxHeight: "20em" }}
                                        controls 
                                    />
                                </div>
                            : null
                        }

                        <p>
                            {
                                chat.content_type == "public_report" ?
                                    <div className="chat-public-report" >
                                        {content}
                                    </div>
                                : chat.content.split("\n").map((line, index) => (
                                    <>
                                        {line}
                                        <br />
                                    </>
                                ))
                            }
                        </p>
                        <span>{dateIndo(chat.updated_at)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TrackComplaint = () => {
    let param                           = useQuery();
    let history                         = useHistory();

    // State
    const [msg, setMsg]                 = useState('');
    const [data, setData]               = useState(null);
    const [messages, setMessages]       = useState([]);
    const [timeRefresh, setTimeRefresh] = useState(10);

    // refs
    let intervalRef                     = useRef()
    const messagesEndRef                = useRef()

    const decreaseTime = () => {
        setTimeRefresh((prev) => {
            if (prev <= 0) {
                clearInterval(intervalRef.current);
                setTimeRefresh(10);
                getData()
            } else {
                return prev - 1
            }
        });
    };

    const scrollToBottom = () => {
        const chatContainer = ReactDOM.findDOMNode(messagesEndRef.current)
        chatContainer.scrollTop = Number.MAX_SAFE_INTEGER
    };

    // Helpers
    const { fallbackImage_, getCookieName } = Helper;

    // function get Data Complaint
    const getData = () => {
        HelpdeskTicketApi.getByCode(param.get("code"), getCookieName("__app_data_helpdesk"))
            .then(res => {
                setData(res.data)
                setMessages(res.data.messages)

                if (res.data.messages[res.data.messages.length - 1]?.sender?.uuid == getCookieName("__app_data_helpdesk_uuid")) {
                    if (timeRefresh <= 0) {
                        setTimeRefresh(10);
                    }

                    intervalRef.current = setInterval(decreaseTime, 1000);
                } else {
                    clearInterval(intervalRef.current);
                    setTimeRefresh(10);
                }

                if (messagesEndRef.current) {
                    setTimeout(scrollToBottom, 500);
                }
            }, err => {
                console.log(err)
            })
    };

    // function send message
    const sendMsg = () => {
        let dataForm = new FormData();
        dataForm.append('content', msg)
        dataForm.append('ticket_id', data.id)
        dataForm.append('sender_id', getCookieName("__app_data_helpdesk_uuid"))

        HelpdeskMessageApi
            .create(dataForm)
            .then(res => {
                setMessages([...messages, res.data])
                setMsg("")
                CustomToast(
                    "success",
                    "Pesan Berhasil Dikirim"
                )
                intervalRef.current = setInterval(decreaseTime, 1000);
                setTimeout(scrollToBottom, 500);
            },
                err => {
                    CustomToast("danger", "Terjadi Kesalahan Saat Mengirim Pesan")
                })
    }

    // function select file
    const selectFile = (e) => {
        let formData = new FormData();
        formData.append("files[]", e.target.files[0]);
        formData.append('ticket_id', data.id)
        formData.append('sender_id', getCookieName("__app_data_helpdesk_uuid"))

        HelpdeskMessageApi
            .create(formData)
            .then(res => {
                setMessages([...messages, res.data])
                setMsg("")
                CustomToast(
                    "success",
                    "Pesan Berhasil Dikirim"
                )
                intervalRef.current = setInterval(decreaseTime, 1000);
                setTimeout(scrollToBottom, 500);
            },
                err => {
                    CustomToast("danger", "Terjadi Kesalahan Saat Mengirim Pesan")
                })
    }

    // use Effect
    useEffect(() => {
        getData();
    }, []);

    return (
        <Fragment>
            {
                data ? <div style={{ padding: '3rem 2rem 0' }}>
                    <Row>
                        <Col md='2' sm='12'></Col>
                        <Col
                            md = '8'
                            sm = '12'
                        >
                            <div className="d-flex mb-2">
                                <ArrowLeftCircle
                                    size      = {35}
                                    onClick   = {() => { history.push("/helpdesk/users?active=pengaduan") }} 
                                    className = "cursor-pointer"
                                />

                                <div style={{ margin: '1px 0px 0px 35px' }}>
                                    <img
                                        src   = {Ticket}
                                        style = {{ width: '32px', height: '32px' }}
                                    />
                                </div>
                                <p style={{ margin: '7px 0px 0px 10px', fontWeight: 'bold', fontSize: '15px' }}>
                                    Lacak Pengaduan
                                </p>
                            </div>

                            <Card>
                                <CardBody>
                                    <Card style={{ border: '1px solid #ecedf4', margin: '0px' }}>
                                        <CardBody className="p-0 m-0">
                                            <div className="d-flex justify-content-between p-2">
                                                <div className="media">
                                                    <div className="media mr-1">
                                                        <div className="chat-avatar">
                                                            <Avatar
                                                                img       = {data.user?.photo}
                                                                onError   = {fallbackImage_}
                                                                imgWidth  = '40'
                                                                imgHeight = '40'
                                                                className = "box-shadow-1 cursor-pointer"
                                                            />
                                                        </div>
                                                        <div className="media-body ml-1">
                                                            <h6 className="mb-0">
                                                                {data.user?.name} - {data.user?.workunit}
                                                            </h6>
                                                            <small className="text-muted">
                                                                (Bertanya) {data.subject}
                                                            </small>
                                                            <p style={{ margin: '20px 0px 0px 0px' }}>
                                                                <img
                                                                    src   = {Ticket}
                                                                    style = {{ width: '25px', height: '25px', marginRight: '10px' }}
                                                                />
                                                                Dalam Antrian
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            <div>
                                                <p className="m-0">No. Tiket {data.code}</p>
                                                <small className="text-muted">Jenis Laporan : {data?.report_kind?.name}</small>
                                                <p style={{ margin: '20px 0px 0px 0px', maxWidth: "400px" }}>
                                                    {data?.device}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="content-wrapper">
                                            <div className="content-body">
                                                <div className="chat-app-window">
                                                    <div className="user-chats height-scroll scroll" ref={messagesEndRef}>
                                                        {/* chat left */}
                                                        {messages && messages.map((item, index) => (
                                                            item.sender.uuid != getCookieName("__app_data_helpdesk_uuid") ?
                                                                <ChatLeft
                                                                    key={index}
                                                                    chat={item}
                                                                />
                                                                :
                                                                <ChatRight
                                                                    key={index}
                                                                    chat={item}
                                                                />
                                                        ))}



                                                    </div>

                                                    {
                                                        messages && messages[messages.length - 1]?.sender?.uuid == getCookieName("__app_data_helpdesk_uuid") ?
                                                            (
                                                                <div className="chat-app-form">
                                                                    <Button
                                                                        style={{ width: '100%' }}
                                                                        outline
                                                                        disabled
                                                                    >
                                                                        <Lock /> &nbsp;

                                                                        Menunggu Antrian
                                                                    </Button>
                                                                </div>
                                                            ) : (
                                                                <div style={{ padding: '15px' }}>
                                                                    <Form onSubmit={(e) => handleSubmit(e)}>
                                                                        <div className='d-flex'>
                                                                            <div style={{ width: "90%" }}>
                                                                                <InputGroup className='input-group-merge mr-1 form-send-message'>
                                                                                    <AutoTextArea
                                                                                        value={msg}
                                                                                        onChange={(e) => {
                                                                                            setMsg(e.target.value)
                                                                                        }}
                                                                                    />
                                                                                    <InputGroupAddon addonType='append'>
                                                                                        <InputGroupText>
                                                                                            <Label className='attachment-icon mb-0' for='attach-doc'>
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
                                                                            </div>
                                                                            <div style={{
                                                                                margin: "auto"
                                                                            }}>
                                                                                <Button
                                                                                    className="ml-1"
                                                                                    color="primary"
                                                                                    onClick={() => {
                                                                                        sendMsg()
                                                                                    }}
                                                                                >
                                                                                    <Send size={14} className='d-lg-none' />
                                                                                    <span className='d-none d-lg-block'  >Kirim</span>
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </Form>
                                                                </div>
                                                            )
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md='2' sm='12'></Col>
                </Row>
            </div> : null}
        </Fragment>
    );
};

export default TrackComplaint;