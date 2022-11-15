import React, { Fragment, useEffect, useContext }   from 'react';
import {useState}                                   from "react";

//Css
import './style.scss';
import '../../components/scss/base/pages/app-chat.scss';
import '../../components/scss/base/pages/app-chat-list.scss';

//Component
import { active }           from 'sortablejs';
import SidebarLeft          from './sidebarLeft';
import ContentCall          from './voice/contentCall';
import ContentGroup         from './ptt/contentGroup';

//Context
import { ChatContext }      from '../../context/ChatContext';
import { AntmediaContext }  from '../../context/AntmediaContext';
import CommunicationPTT     from '../../services/pages/chat/PushToTalk';
import { WebsocketURL } from '../../configs/socket';
import { ModalBase } from '../../components/widgets/modals-base';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import CustomToast from '../../components/widgets/custom-toast';

const IndexVoiceVideoCall = () => {

    //Context
    const {
        type,
        setType,
        isCallAnswer,
        privateCallData
    }                                                               = useContext(ChatContext);

    const {
        callback,
        setWebRtc,
        webRTCAdaptorPeer
    }                                                               = useContext(AntmediaContext);

    //State
    const [userCall,setUserCall]                                    = useState("");
    const [activeTab, setActiveTab]                                 = useState('voice');
    const [callerVideo, setCallerVideo]                             = useState(false);
    
    const [server, setServer]                                       = useState(null);
    const [selected, setSelected]                                   = useState(null); //selected ptt server
    const [pttActive, setPttActive]                                 = useState(true); //ptt active page
    const [tokenRoom, setTokenRoom]                                 = useState(null);
    const [PTTWebsocket, setPTTWebSocket]                           = useState(null);
    const [activeChannel, setActiveChannel]                         = useState(null);
    const [pttActiveContent, setPttActiveContent]                   = useState('ptt');

    const [isPTTReady, setIsPTTReady]                               = useState(false);
    const [password, setPassword]                                   = useState(null);
    const [selectedChannelID, setSelectedChannelID]                 = useState(null);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible]   = useState(null);

    const getTokenRoom = () => {
        const formData ={
            roomId      : activeChannel.id,
            expireDate  : 1652304012
        };
        
        CommunicationPTT.getTokenRoom(formData).then(
            res => {
                if(res.status === 200){
                    setTokenRoom(res.data)
                }
            },
            err => {
                console.log(err, 'get token room');
            }
        )
    };

    const getServer = (selectedId) => {
        setSelected(null);
        CommunicationPTT.getServer().then(
            res => {
                if(res.status === 200){
                    setServer(res.data);
                    if(selectedId != undefined){
                        console.log('selected berhasil', selectedId);
                        res.data.map((data) => (
                            data.id == selectedId ? 
                                setSelected(data)
                            :
                                null
                        ))
                    }
                }else{
                    setServer(null);
                }
            },
            err => {
                console.log(err, 'get server err');
            }
        )
    };

    const connectPTTSocket = (id) => {
        const websocket = new WebSocket(WebsocketURL.PTTSocket(id));
        setPTTWebSocket(websocket);
    }

    const startPTT = () => {
        if(activeChannel != null && webRTCAdaptorPeer == null){
            let localvideoId = [], remoteVideoId = [];

            activeChannel.roomStreamList != null &&
                activeChannel.roomStreamList.map((data) => (
                    data === localStorage.getItem('uuid') ? 
                        localvideoId.push(`ptt_name_${activeChannel.roomName}_id_`+data)
                    :
                        remoteVideoId.push(`ptt_name_${activeChannel.roomName}_id_`+data)
                ))

            setWebRtc("room", localvideoId[0], remoteVideoId);
            connectPTTSocket(activeChannel.id);
        }
    }

    const handlePTTActive = () => {
        if(PTTWebsocket != null){
            let val = {
                type : "ptt-talk",
                payload : {
                  uuid : localStorage.getItem('uuid'),
                  id : activeChannel.id,
                  push : true, 
                }
            }

            PTTWebsocket.send(JSON.stringify(val));
        }
    }

    const handlePTTNotActive = () => {
        if(PTTWebsocket != null){
            let val = {
                type : "ptt-talk",
                payload : {
                  uuid : localStorage.getItem('uuid'),
                  id : activeChannel.id,
                  push : false, 
                }
            }

            PTTWebsocket.send(JSON.stringify(val));
        }
    }

    const validateChannelPassword = () => {
        const params = {
            mode    : 'channel',
            action  : 'member-validate-password',
            id      : selectedChannelID,
        }

        const formData = {
            password : password
        }

        CommunicationPTT.ActionChannel(formData, params).then(
            res => {
                if(res.status === 200){
                    handleSelfJoinChannel(selectedChannelID);
                    setIsConfirmPasswordVisible(false);
                }else{
                    CustomToast('danger', 'Kata sandi yang dimasukkan tidak sesuai');
                }
            },
            err => {
                if(err.status === 403){
                    CustomToast('danger', 'Kata sandi yang dimasukkan tidak sesuai');
                }
                console.log(err, 'password confirmation')
            }
        )
    };

    const handleSelfJoinChannel = (id) => {
        const params = {
            mode    : 'channel',
            action  : 'member-join',
            id      : id,
        }

        const formData = {
            
        }

        CommunicationPTT.ActionChannel(formData, params).then(
            res => {
                if(res.status === 200){
                    CustomToast('success', `Berhasil gabung channel ${res.data.roomName}`);
                    getServer(selected.id);
                }
            },
            err => {
                console.log(err, 'handle self join');
            }
        )
    };

    useEffect(() => {
        //for incoming call
        if(isCallAnswer){
            if(privateCallData != null){
                setUserCall(privateCallData.data);
                setType(privateCallData.data.type);
            }
        }
    },[isCallAnswer, type])

    useEffect(() => {
        if(activeTab === 'ptt'){

            //get token room
            if(activeChannel != null && tokenRoom == null){
                getTokenRoom();
            };
        }

    }, [activeChannel, tokenRoom]);

    useEffect(() => {
        if(activeTab === 'ptt' && tokenRoom != null){
            if(callback.info === 'initialized'){
                webRTCAdaptorPeer.joinRoom(activeChannel.roomId, tokenRoom[0].streamId)
            }else if(callback.info === 'joinedTheRoom'){

                activeChannel.roomStreamList.map((data) => (
                    data != localStorage.getItem('uuid') && webRTCAdaptorPeer.play(data)
                ))

                webRTCAdaptorPeer.muteLocalMic();
                webRTCAdaptorPeer.publish(tokenRoom[0].streamId, tokenRoom[0].tokenId)

            }else if(callback.info === 'publish_started'){
                webRTCAdaptorPeer.getRoomInfo(activeChannel.roomId, tokenRoom[0].streamId);
            }
            else if(callback.info === 'roomInformation'){
                // if(callback.obj.streamList.length > 0){
                // }
            }
            else if(callback.info === 'pong'){
                webRTCAdaptorPeer.getRoomInfo(activeChannel.roomId, tokenRoom[0].streamId);
            }
        }
    }, [callback, tokenRoom]);

    useEffect(() => {

        if(PTTWebsocket != null){

            PTTWebsocket.onmessage = (event) => {
                let res = JSON.parse(event.data);
    
                let val     = selected;
                let activeMember = val.member;

                if(res.type === "ptt-talk"){
                    activeMember.map((data) => (
                        res.payload.uuid === data.uuid && res.payload.push === true?
                            data.isTalk = true
                        :
                            data.isTalk = false
                    ))
                    selected.member = activeMember;
                    setSelected(selected)
                }
                
            }
    
        }

    });


    //join room akan trigger callback joinedtheroom, joinedtheroom menampilkan isi room.
    //untuk mendapatkan informasi room yang terupdate, kita pake getRoomInfo.
    //untuk kita yang jadi orang pertama join di room itu, 

    return (
        <Fragment>

            {/* modal password confirmation */}
            <ModalBase
                show    = {isConfirmPasswordVisible}
                title   = "Konfirmasi Kata Sandi"
                center  = {true}
                setShow = {(par) => {setIsConfirmPasswordVisible(par)} }
            >
                <Form>
                    <FormGroup>
                        <Label>
                            Kata Sandi
                        </Label>
                        <Input
                            id         = "channel-confirm-password"
                            placholder = "Masukkan kata sandi"
                            onChange   = {(e) => {setPassword(e.target.value)}}
                        />
                    </FormGroup>
                    <FormGroup 
                        className = "d-flex justify-content-end"
                    >
                        <Button
                            color   = "primary"
                            onClick = {() => {validateChannelPassword()}}
                        >
                            Simpan
                        </Button>
                    </FormGroup>
                </Form>
            </ModalBase>

            <SidebarLeft 
                activeTab                   = {activeTab}
                setUserCall                 = {setUserCall}
                setActiveTab                = {setActiveTab}
                
                //ptt
                server                      = {server}
                selected                    = {selected}
                setServer                   = {setServer}
                pttActive                   = {pttActive}
                startPTT                    = {startPTT}
                getServer                   = {getServer}
                setSelected                 = {setSelected}
                setPttActive                = {setPttActive}
                activeChannel               = {activeChannel}
                pttActiveContent            = {pttActiveContent}
                setActiveChannel            = {setActiveChannel}    
                setPttActiveContent         = {setPttActiveContent}
                setSelectedChannelID        = {setSelectedChannelID}
                setIsConfirmPasswordVisible = {setIsConfirmPasswordVisible}
                handleSelfJoinChannel       = {handleSelfJoinChannel}

            />

            <div className='content-right'>
                <div className='content-wrapper'>
                    <div className='content-body'>
                        {
                            activeTab === "voice" ? 
                                <ContentCall
                                    type                = {type}
                                    setType             = {setType}
                                    userCall            = {userCall}
                                    setUserCall         = {setUserCall}
                                    callerVideo         = {callerVideo}
                                    setCallerVideo      = {setCallerVideo}
                                />
                            :
                                <ContentGroup
                                    selected            = {selected}
                                    startPTT            = {startPTT}
                                    getServer           = {getServer}
                                    pttActive           = {pttActive}
                                    listHidden          = {true}
                                    isPTTReady          = {isPTTReady}
                                    setPttActive        = {setPttActive}
                                    activeChannel       = {activeChannel}
                                    pttActiveContent    = {pttActiveContent}
                                    setActiveChannel    = {setActiveChannel}
                                    setPttActiveContent = {setPttActiveContent}

                                    handlePTTActive     = {handlePTTActive}
                                    handlePTTNotActive  = {handlePTTNotActive}
                                />
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default IndexVoiceVideoCall;