import React, { Fragment, useEffect, useContext }   from 'react';
import {useState}                       from "react";

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
import CommunicationPTT from '../../services/pages/chat/PushToTalk';

const IndexVoiceVideoCall = () => {

    //Context
    const {
        type,
        setType,
        isCallAnswer,
        privateCallData
    }                                               = useContext(ChatContext);

    const {
        callback,
        setWebRtc,
        webRTCAdaptorPeer
    }                                               = useContext(AntmediaContext);

    //State
    const [userCall,setUserCall]                    = useState("");
    const [activeTab, setActiveTab]                 = useState('voice');
    const [callerVideo, setCallerVideo]             = useState(false);
    
    const [server, setServer]                       = useState(null);
    const [selected, setSelected]                   = useState(null); //selected ptt server
    const [pttActive, setPttActive]                 = useState(true); //ptt active page
    const [tokenRoom, setTokenRoom]                 = useState(null);
    const [activeChannel, setActiveChannel]         = useState(null);
    const [pttActiveContent, setPttActiveContent]   = useState('ptt');

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
        CommunicationPTT.getServer().then(
            res => {
                if(res.status === 200){
                    setServer(res.data);
                    if(selectedId != undefined){
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

            if(activeChannel != null && webRTCAdaptorPeer == null){
                let localvideoId = [], remoteVideoId = [];
                console.log(activeChannel, 'activeChannel')
                activeChannel.roomStreamList != null &&
                    activeChannel.roomStreamList.map((data) => (
                        data === localStorage.getItem('uuid') ? 
                            localvideoId.push(`ptt_name_${activeChannel.roomName}_id_`+data)
                        :
                            remoteVideoId.push(`ptt_name_${activeChannel.roomName}_id_`+data)
                    ))

                setWebRtc("room", localvideoId[0], remoteVideoId);
            }
        }

    }, [activeChannel, tokenRoom]);

    useEffect(() => {
        if(activeTab === 'ptt' && tokenRoom != null){
            if(callback.info === 'initialized'){

                webRTCAdaptorPeer.joinRoom(activeChannel.roomId, tokenRoom[0].streamId)
            }else if(callback.info === 'joinedTheRoom'){

                activeChannel.roomStreamList.map((data) => (
                    data != localStorage.getItem('uuid')) && webRTCAdaptorPeer.play(data, tokenRoom[1].tokenId)
                )

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


    //join room akan trigger callback joinedtheroom, joinedtheroom menampilkan isi room.
    //untuk mendapatkan informasi room yang terupdate, kita pake getRoomInfo.
    //untuk kita yang jadi orang pertama join di room itu, 

    return (
        <Fragment>
            <SidebarLeft 
                activeTab           = {activeTab}
                setUserCall         = {setUserCall}
                setActiveTab        = {setActiveTab}
                
                //ptt
                server              = {server}
                selected            = {selected}
                setServer           = {setServer}
                pttActive           = {pttActive}
                getServer           = {getServer}
                setSelected         = {setSelected}
                setPttActive        = {setPttActive}
                activeChannel       = {activeChannel}
                pttActiveContent    = {pttActiveContent}
                setActiveChannel    = {setActiveChannel}    
                setPttActiveContent = {setPttActiveContent}
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
                                    getServer           = {getServer}
                                    pttActive           = {pttActive}
                                    listHidden          = {true}
                                    setPttActive        = {setPttActive}
                                    activeChannel       = {activeChannel}
                                    pttActiveContent    = {pttActiveContent}
                                    setActiveChannel    = {setActiveChannel}
                                    setPttActiveContent = {setPttActiveContent}
                                />
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default IndexVoiceVideoCall;