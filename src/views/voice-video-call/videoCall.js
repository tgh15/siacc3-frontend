import React, {Fragment, useContext}    from 'react';
import {useEffect,useState}             from "react";

import { 
    Col, 
    Row, 
    Card, 
    Button, 
    CardBody,
}                               from 'reactstrap';

//Icon
import { 
    Mic, 
    Phone, 
    Video, 
    MicOff, 
    VideoOff,
}                               from 'react-feather';

import {ChatContext}            from "../../context/ChatContext";
import {AntmediaContext}        from "../../context/AntmediaContext";
import { Post }                 from '../../services/core/request';
import CustomToast              from '../../components/widgets/custom-toast';

const VideoCall = (props) => {

    // this function from callback or response after set webrtc
    // many condition on callback like (joined the room, etc ) you can see on docs or sampe code antmedia
    // you can make conditoin on info param,
    // object usually information media stream id like personal or room info

    const {
        userCall,
        callerVideo,
        setCallerVideo,
    }                                           = props;

    const {
            type,
            setType,
            activeCall,
            privateCall,
            privateCallData,
            setIsCallAnswer,
            setPrivateCallData
        }                                       = useContext(ChatContext);
    const {
            callback,
            setWebRtc,
            webRTCAdaptorPeer,
        }                                       = useContext(AntmediaContext);

    const [isJoin,setJoin]                      = useState(false);
    const [isRtcConnect,setIsRtcConnect]        = useState(false);
    const [isMicActive, setIsMicActive]         = useState(true);
    const [isCameraActive, setIsCameraActive]   = useState(true);
	
	function turnOffLocalCamera(token){
		webRTCAdaptorPeer.turnOffLocalCamera(token);
        setIsCameraActive(false);
        CustomToast("success", 'Kamera dimatikan.');
	}
	
	function turnOnLocalCamera(token){
		webRTCAdaptorPeer.turnOnLocalCamera(token);
        setIsCameraActive(true);
        CustomToast("success", 'Kamera dinyalakan.');
	}
	
	function muteLocalMic(token){
		webRTCAdaptorPeer.muteLocalMic(token);
        setIsMicActive(false);
        CustomToast("success", 'Mic dimatikan.');
	}
	
	function unmuteLocalMic(token){
		webRTCAdaptorPeer.unmuteLocalMic(token);
        setIsMicActive(true);
        CustomToast("success", 'Mic dinyalakan.');
    }

    // this function for set timecall if answer
    // if call again with same id, engine automaticly set endofcall
    const setTimeCall = (id) => {
        Post("communication/rtc/video-call/private/set-time-call", {id:id})
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log("error set time call")
                console.log(err)
            })
    }

    const answer=()=>{
       // for receiver
        if(webRTCAdaptorPeer != null){
            webRTCAdaptorPeer.join(privateCallData.data.token)
            setTimeCall(privateCallData.data.id)
        }
    }

    const join = () => {
        // for caller
        webRTCAdaptorPeer.join(privateCallData.data.token)
    }

	function leave() {
        if (webRTCAdaptorPeer != null){
            
            webRTCAdaptorPeer.leave(privateCallData.data.token);

            privateCall(privateCallData.data.id,false);
            setTimeCall(privateCallData.data.id);
        }

        setType(null);
        setCallerVideo(false);
        setIsCallAnswer(false);
        setPrivateCallData(null);

        location.reload();
	}

    useEffect(() => {
        /*
            for outcoming call
            check type and usercall is null or not
            when type not null send socket with oncall true
        */
        if (webRTCAdaptorPeer != null){
            if(callerVideo && type != null && userCall != null && privateCallData == null){
                privateCall(userCall.id, true, type);
            }
        }
    }, [callerVideo]);

    useEffect(() => {
        /*
            connect adaptor peer when video tag is ready
        */
        if(!callerVideo){
            if(userCall != null && webRTCAdaptorPeer == null ){
                setWebRtc("peer","localVideo","remoteVideoPeer", type)
            }
        }
    }, [userCall]);

    useEffect(()=>{
        /*
            when adaptor peer is ready
            call join method
        */
        
        if(privateCallData != null && webRTCAdaptorPeer != null){
            if(privateCallData.data.UUIDCaller == localStorage.getItem('uuid')){
                setTimeout(() => {
                    join();
                }, 500);
            }else{
                if(callback.info === 'initialized'){
                    answer();
                }
            }
        }

        /*
            executed when oncall false
        */
        if(!activeCall){
            leave();
        }

    },[activeCall, privateCallData, callback])
    

    return (
        <Fragment>
        
            <Card className="mb-0 h-100">
                <div 
                    style     = {{ cursor: 'pointer' }}
                    className = 'show-content' 
                >
                    <CardBody className="h-75">
                        <Row>
                            <Col md="6">
                                {/*local*/}
                                <Card className='box-voice-call'>
                                    <video 
                                        id              = "localVideo"
                                        width           = {100}
                                        height          = {100}
                                        autoPlay 
                                        controls 
                                        className       = 'img-fluid img-video'
                                        onLoadedData    = {() => {setCallerVideo(true);}}
                                    />
                                </Card>
                            </Col>

                            {/*remote*/}
                            <Col md="6">
                                <div className='box-voice-call'>
                                    {
                                        <video 
                                            id          = "remoteVideoPeer" 
                                            controls 
                                            autoPlay 
                                            className   = 'img-fluid img-video'
                                        />
                                    }
                                </div>
                            </Col>
                        </Row>
                        <div className=''>
                            <div className='d-flex justify-content-center align-item-center'>
                                <Button.Ripple 
                                    style     = {{ backgroundColor: '#fcfcfc' }}
                                    outline 
                                    onClick   = {() => {
                                        isCameraActive ? 
                                            turnOffLocalCamera(privateCallData.data.token)
                                        :
                                            turnOnLocalCamera(privateCallData.data.token)
                                    }}
                                    className = 'btn-icon rounded-circle mt-0 mr-1' 
                                >
                                    {
                                        isCameraActive ?
                                            <VideoOff size={16}/>
                                        :
                                            <Video size={16}/>
                                    }
                                </Button.Ripple>
                                <Button.Ripple 
                                    style     = {{ backgroundColor: '#fcfcfc' }}
                                    outline 
                                    className = 'btn-icon rounded-circle mt-0 mr-1' 
                                >
                                    {
                                        isMicActive ? 
                                            <MicOff onClick={()=>muteLocalMic(privateCallData.data.token)}  size={16}/>
                                        :
                                            <Mic onClick={()=>unmuteLocalMic(privateCallData.data.token)} size={16}/>
                                    }
                                </Button.Ripple>
                                <Button.Ripple 
                                    color       = 'danger'
                                    className   = 'btn-icon rounded-circle mt-0 mr-1' 
                                    onClick     = {() => {
                                        leave();
                                    }}
                                >
                                    <Phone 
                                        size    = {16} 
                                        style   = {{ transform: 'rotate(134deg)' }}
                                        
                                    />
                                </Button.Ripple>
                            </div>
                        </div> 
                    </CardBody>
                </div>
            </Card>
        </Fragment>
    );
};

export default VideoCall;
