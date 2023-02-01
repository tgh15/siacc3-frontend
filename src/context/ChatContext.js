import { createContext, useEffect, useRef, useState } from "react"

import ChatApi                  from "../services/pages/chat"
import ReactDOM                 from 'react-dom'
import { WebsocketURL }         from "../configs/socket"
import { useLocation }          from "react-router-dom"
import Helper                   from "../helpers"

//Widgets
import CustomToast              from "../components/widgets/custom-toast"

const ChatContext               = createContext(null);

const ChatProvider = ({ children }) => {
    //  states
    const [type, setType]                               = useState(null);
    const [room, setRoom]                               = useState([])
    const [members, setMembers]                         = useState([])
    const [messages, setMessages]                       = useState([])
    const [chatPopup, setChatPopup]                     = useState(false)
    const [activeCall, setActiveCall]                   = useState(true)
    const [roomArchive, setRoomArchive]                 = useState([])
    const [incomingCall, setIncomingCall]               = useState(false);
    const [memberAdmins, setMemberAdmins]               = useState([])
    const [roomSelected, setRoomSelected]               = useState(null)
    const [chatRoomPopup, setChatRoomPopup]             = useState(false)
    const [privateCallData,setPrivateCallData]          = useState(null)
    const [selectedMessage, setSelectedMessage]         = useState(null)
    const [totalUnreadMessage, setTotalUnreadMessage]   = useState(0)

    const [isCallAnswer, setIsCallAnswer]               = useState(false);

    //Socket State
    const [chatSocket, setChatSocket]                   = useState(null);

    let location                                        = useLocation();

    const {
        getUserData
    }                                                   = Helper;

    // ** Refs
    const chatArea = useRef(null)

    const connectChatSocket = roomId => {
        const websocket = new WebSocket(WebsocketURL.chatSocket(roomId ? roomId : getUserData().uuid));
        setChatSocket(websocket);
    };

    // ** Get Room 
    const getRoom = () => {
        ChatApi.room({
            onSuccess: (res) => {
                setRoom(res.data)
                if (res.data != null) {
                    let count_ = 0;
                    res.data.map((data) => (
                        data.is_read === false && count_++
                    ))
                    console.log(count_);
                    setTotalUnreadMessage(count_);
                }
            },
            onFail: (err) => {
                console.log(err)
            }
        })
    }

    // ** Get Room Archive
    const getRoomArchive = () => {
        ChatApi.roomArchive({
            onSuccess: (res) => {
                setRoomArchive(res.data)
            },
            onFail: (err) => {
                console.log(err)
            }
        })
    }

    // get Message
    const getMessages = room => {
        ChatApi.messageByRoom({
            room: room,
            onSuccess: (res) => {
                setMessages(res.data.messages)
                setMembers(res.data.member)
                setMemberAdmins(res.data.admins)
            },
            onFail: (err) => {
                console.log(err)
            }
        })
    }

    // ** Scroll to chat bottom
    const scrollToBottom = () => {
        const chatContainer = ReactDOM.findDOMNode(chatArea.current)
        if(chatContainer != null){
            chatContainer.scrollTop = Number.MAX_SAFE_INTEGER
        }
    }

    if (chatSocket != null) {
        chatSocket.onopen = function (e) {
            console.log('connect chat');
        };

        // on message chatsocket
        chatSocket.onmessage = function (event) {
            let res = JSON.parse(event.data);
            if (res.status == 201 || res.status == 200) {
                switch (res.type) {
                    case "communication-room-create":
                        if (res.status == 201) {
                            CustomToast("success", 'Room berhasil dibuat');

                        } else {
                            CustomToast("success", 'Room berhasil diupdate.');
                        }

                        let oldRoom = room;

                        if(Array.isArray(oldRoom) && oldRoom.filter((data) => data.id === res.data.id).length < 1){
                            oldRoom.unshift(res.data);
                            setRoom([...oldRoom]);
                        }

                        setRoomSelected(res.data);
                        getMessages(res.data.id);
                        getRoom();

                        if (location.pathname != "/chats") {
                            setChatPopup(true);
                        }
                        break;

                    case "communication-message-create":
                        if (roomSelected.id === res.data.room_id) {
                            var oldChat = messages ? messages : [];
                            oldChat.push(res.data)
                            setMessages([...oldChat]);
                            getRoom()

                            if (location.pathname != "/chats") {
                                setChatPopup(true);
                            } else {
                                scrollToBottom()
                            }

                        }
                        break;

                    case "communication-message-revoke-for-me":
                        if (res.data.room_id == roomSelected.id) {
                            getMessages(roomSelected.id);
                            scrollToBottom()
                        }
                        break;

                    case "communication-message-revoke-for-all":
                        if (res.data.room_id == roomSelected.id) {
                            getMessages(roomSelected.id);
                            scrollToBottom()
                        }
                        break;

                    case "communication-set-private-call":
                        if(res.data.onCall === true){
                            setActiveCall(true);
                            setPrivateCallData(res);
                        }else{
                            setActiveCall(false);
                            setPrivateCallData(null);
                        }
                        
                        
                        //check is call is incoming or not
                        if((getUserData().uuid != res.data.UUIDCaller) && res.data.onCall === true){
                            setIncomingCall(true);
                        }else{
                            setIncomingCall(false);
                        }
                        break;
                }
            }
        }

        // on close chat socket
        chatSocket.onclose = function (e) {
            console.log('reconnect chat socket');
            setTimeout(() => {
                connectChatSocket();
            }, 1000)
        };

        chatSocket.onerror = function (error) {
            console.log(error);
        };
    }

    const privateCall = (id, onCall, type)=>{
        if (chatSocket != null) {
            let val = {
                    type    : "communication-set-private-call",
                    token   : localStorage.getItem('token'),
                    payload : {
                        id      : id,
                        type    : type,
                        onCall  : onCall
                    }
                }
            chatSocket.send(JSON.stringify(val));
        }

    }

    const sendMessage = (msg, attachment, type) => {
        if (chatSocket != null) {
            let val;

            if (attachment != undefined && attachment.length > 0) {
                if (selectedMessage == null) {
                    val = {
                        type: "communication-message-create",
                        is_secure: true,
                        token: localStorage.getItem('token'),
                        payload: {
                            room_id: roomSelected.id,
                            content_type: "text",
                            content: msg,
                            attachment_id: attachment,
                        }
                    };
                } else {
                    val = {
                        type: "communication-message-create",
                        is_secure: true,
                        token: localStorage.getItem('token'),
                        payload: {
                            room_id: roomSelected.id,
                            content_type: "text",
                            content: msg,
                            attachment_id: attachment,
                            parent_id: selectedMessage.id
                        }
                    };
                }
            } else {

                if (type == "public_report") {
                    val = {
                        type: "communication-message-create",
                        is_secure: true,
                        token: localStorage.getItem('token'),
                        payload: {
                            room_id: roomSelected.id,
                            content_type: "public_report",
                            content: msg,
                        }
                    };

                } else if (type === "draft"){
                    val = {
                        type: "communication-message-create",
                        is_secure: true,
                        token: localStorage.getItem('token'),
                        payload: {
                            room_id: roomSelected.id,
                            content_type: "draft",
                            content: msg,
                        }
                    };
                }else {
                    if (selectedMessage == null) {
                        val = {
                            type: "communication-message-create",
                            is_secure: true,
                            token: localStorage.getItem('token'),
                            payload: {
                                room_id: roomSelected.id,
                                content_type: "text",
                                content: msg,
                            }
                        };
                    } else {
                        val = {
                            type: "communication-message-create",
                            is_secure: true,
                            token: localStorage.getItem('token'),
                            payload: {
                                room_id: roomSelected.id,
                                content_type: "text",
                                content: msg,
                                parent_id: selectedMessage.id
                            }
                        };
                    }
                }
            }

            chatSocket.send(JSON.stringify(val));
            setSelectedMessage(null)
        }
    };

    const handleRevokeMe = (chatId) => {
        if (chatSocket != null) {
            let val = {
                type: "communication-message-revoke-for-me",
                is_secure: true,
                token: localStorage.getItem('token'),
                payload: {
                    id: chatId
                }
            }

            chatSocket.send(JSON.stringify(val));
        }
    };

    const handleRevokeAll = (chatId) => {
        if (chatSocket != null) {
            let val = {
                type: "communication-message-revoke-for-all",
                is_secure: true,
                token: localStorage.getItem('token'),
                payload: {
                    id: chatId
                }
            }

            chatSocket.send(JSON.stringify(val));
        }
    };

    // function end chat
    const handleEndChat = (roomId) => {

        if (chatSocket != null) {
            let val = {
                type: "communication-room-visible",
                is_secure: true,
                token: localStorage.getItem('token'),
                payload: {
                    id: roomId,
                }
            };

            chatSocket.send(JSON.stringify(val));
        }
        setRoomSelected(null)
        getRoom();
    };

    // function Archive Message
    const handleArchive = (roomId) => {

        if (chatSocket != null) {
            let val = {
                type: "communication-room-archive",
                is_secure: true,
                token: localStorage.getItem('token'),
                payload: {
                    id: roomId,
                }
            };
            chatSocket.send(JSON.stringify(val));

            setRoomSelected(null)
            getRoom();
            getRoomArchive();
        }
    };

    // function unArchive Message
    const handleUnArchive = (id) => {
        if (chatSocket != null) {
            let val = {
                type: "communication-room-un-archive",
                is_secure: true,
                token: localStorage.getItem('token'),
                payload: {
                    id: id,
                }
            };

            chatSocket.send(JSON.stringify(val));
            setRoomSelected(null)
            getRoomArchive();
            getRoom();

        }
    };

    // function Mark as read Room
    const markAsRead = (id) => {
        ChatApi.markAsRead({
            roomId: id,
            onSuccess: (res) => {
                getRoom()
            },
            onFail: (err) => {
                console.log(err)
            }
        })
    };

    const markAsUnread = (id) => {
        ChatApi.markAsUnread({
            roomId: id,
            onSuccess: (res) => {
                getRoom()
            },
            onFail: (err) => {
                console.log(err)
            }
        })
    };

    //**  getUser 
    useEffect(() => {
        if (localStorage.getItem("userData")) {
            connectChatSocket()
        }
    }, [])

    //**  getRoom
    useEffect(() => {
        if (localStorage.getItem("userData")) {
            getRoom()
            getRoomArchive()
        }
    }, [])

    return <ChatContext.Provider
        value={{
            room,
            setRoom,

            roomSelected,
            setRoomSelected,

            chatPopup,
            setChatPopup,

            chatRoomPopup,
            setChatRoomPopup,

            chatSocket,
            setChatSocket,

            messages,
            setMessages,

            roomArchive,
            setRoomArchive,

            members,
            setMembers,

            memberAdmins,
            setMemberAdmins,

            chatArea,

            selectedMessage,
            setSelectedMessage,

            totalUnreadMessage,

            markAsRead,
            getMessages,
            sendMessage,
            markAsUnread,
            handleEndChat,
            handleArchive,
            scrollToBottom,
            handleRevokeMe,
            handleUnArchive,
            handleRevokeAll,
            connectChatSocket,

            //voice video call
            privateCall,

            incomingCall,
            setIncomingCall,

            isCallAnswer,
            setIsCallAnswer,

            privateCallData,
            setPrivateCallData,

            activeCall,
            setActiveCall,

            type,
            setType
        }}>{children}</ChatContext.Provider>
}

export { ChatContext, ChatProvider }