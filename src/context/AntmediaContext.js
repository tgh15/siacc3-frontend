import { createContext, useEffect, useState } from "react"
import {WebRTCAdaptor} from "@antmedia/webrtc_adaptor";

const AntmediaContext = createContext(null);

const AntmediaProvider = ({children}) =>{
    const [callback,setCallback]                        = useState({obj:null,info:null})
    const [errorCallback,setErrorCallback]              = useState(null)
    const [webRTCAdaptorPeer,setWebRtcAdaptorPeer]      = useState(null)

    let url_antmedia_server, ice_server;
    
    // if(!process.env.NODE_ENV || process.env.NODE_ENV === 'production'){
        // url_antmedia_server = "wss://stream.siaccinfo.id/WebRTCAppEE/websocket"
        ice_server          =  {
            'iceServers': [
                {
                    'urls'          : "turn:103.106.174.84:3478",
                    'username'      : "s144cc202i",
                    'credential'    : "5a1d82cc6821",
                },            
                {
                    'urls'          : "stun:103.106.174.84:3478",
                    'username'      : "s144cc202i",
                    'credential'    : "5a1d82cc6821",
                }
            ]
        }
    // }else{
        url_antmedia_server = "wss://antmedia.underdev.team/WebRTCAppEE/websocket"
    //     ice_server          =  {
    //         'iceServers': [
    //             {
    //                 'urls'          : "stun:158.140.183.123:3478",
    //                 'username'      : "devops",
    //                 'credential'    : "9051puki",
    //             },            
    //             {
    //                 'urls'          : "turn:158.140.183.123:3478",
    //                 'username'      : "devops",
    //                 'credential'    : "9051puki",
    //             }
    //         ]
    //     }
    // }


    const setWebRtc = (kind="peer",localvideoId,remoteVideoId, type) => {
        let adaptor;
        if ( kind == "peer" && type === 'video'){
            console.log('doi disini2')
            adaptor = new WebRTCAdaptor({
                websocket_url           : url_antmedia_server,
                mediaConstraints        : {
                    video : true,
                    audio : true,
                },
                peerconnection_config   : ice_server,
                sdp_constraints         : {
                    OfferToReceiveAudio : true,
                    OfferToReceiveVideo : true,
                },
                localVideoId            : localvideoId,
                remoteVideoId           : remoteVideoId,
                bandwidth               :  "unlimited", 
                callback                : (info, obj) => {
                    setCallback({obj:obj,info:info})
                },
                callbackError           : (error, message) => {
                    setErrorCallback({error:error,message:message})
                }, 
            })
        }
        else{
            console.log('doi disini')
            adaptor = new WebRTCAdaptor({
                websocket_url           : url_antmedia_server,
                mediaConstraints        : {
                    video : false,
                    audio : true,
                },
                peerconnection_config   : ice_server,
                sdp_constraints         : {
                    OfferToReceiveAudio : true,
                    OfferToReceiveVideo : true,
                },
                localVideoId            : localvideoId,
                remoteVideoId           : remoteVideoId,
                bandwidth               :  "unlimited", 
                callback                : (info, obj) => {
                    setCallback({obj:obj,info:info})
                },
                callbackError           : (error, message) => {
                    setErrorCallback({error:error,message:message})
                }, 
            })
        }
        setWebRtcAdaptorPeer(adaptor) 

    }

    useEffect(()=>{
        console.log(callback, 'callback2');

        console.log(errorCallback, 'error callback')
    },[callback])

    return <AntmediaContext.Provider 
            value = {{
                callback,
                setWebRtc,
                errorCallback,
                webRTCAdaptorPeer,
                setWebRtcAdaptorPeer,
            }}
        >
            {children} 
        </AntmediaContext.Provider>
}

export {AntmediaContext,AntmediaProvider}