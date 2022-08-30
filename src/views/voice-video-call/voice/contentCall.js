import React, {
    Fragment, 
    useState,
    useEffect, 
    useContext,
    useRef,
    useCallback,
} from 'react';
import { Card, CardBody, Media }    from 'reactstrap';
import PerfectScrollbar             from 'react-perfect-scrollbar';

//Icon
import { PhoneCall, Video }         from 'react-feather';

//Image
import LogoProfile                  from '@src/assets/images/logo/user.png';
import ImgPhoneCall                 from '@src/assets/icons/phone-call.svg';
import ImgPhoneMissed               from '@src/assets/icons/phone-missed.svg';
import ImgPhoneIncoming             from '@src/assets/icons/phone-incoming.svg';
import ImgPhoneOutgoing             from '@src/assets/icons/phone-outgoing.svg';

//Components
import Avatar                       from '../../../components/widgets/avatar';
import VideoCall                    from '../videoCall';

//COntext
import {ChatContext}                from "../../../context/ChatContext";
import Helper                       from '../../../helpers';
import moment                       from 'moment';
import { AntmediaContext }          from '../../../context/AntmediaContext';

const ContentCall = (props) => {

    //Props
    const {
        type,
        setType,
        userCall, 
        setUserCall,
        callerVideo,
        setCallerVideo
    }                                       = props;

    //Context
    const {
            privateCall,
            isCallAnswer,
            privateCallData
        }                                   = useContext(ChatContext);

    const { setWebRtc, webRTCAdaptorPeer }  = useContext(AntmediaContext);     


    //State
    const [userCallData, setUserCallData]   = useState([]);

    const privateCallRequest = (onCall, type) => {
        privateCall(userCall.id,onCall, type)
    }

    useEffect(()=>{
        /*
            create adaptorpeer
            adaptor crated when usercall is not null
        */
    },[userCall])

    return (
        <Fragment>
            <div className='chat-app-window'>
                <div className='active-chat'>
                    {/* header */}
                    <div className='chat-navbar'>
                        {
                            userCall !== "" ? 
                                <header className='chat-header'>
                                    <div className='d-flex align-items-center'>
                                        <Avatar
                                            img       = {LogoProfile}
                                            status    = 'online'
                                            imgWidth  = '36'
                                            imgHeight = '36'
                                            className = 'avatar-border user-profile-toggle m-0 mr-1'
                                        />
                                        <h6 className='font-weight-bolder mb-0'>
                                            {
                                                userCall.UUIDCaller === localStorage.getItem('uuid') ?  
                                                    userCall.UUIDReceiverDetail.name
                                                :
                                                    userCall.UUIDCallerDetail.name
                                            }
                                        </h6>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <PhoneCall
                                            size      = {20}
                                            onClick   = {()=>{ setType('voice') }}
                                            className = 'cursor-pointer d-sm-block d-none mr-3'
                                        />
                                        <Video
                                            size      = {20} 
                                            onClick   = {()=>{ setType('video') }}
                                            className = 'cursor-pointer d-sm-block d-none mr-2'
                                        />
                                    </div>
                                </header>
                            :
                                null
                        }
                        
                    </div>
                    <div
                        style     = {{ height: type == null ? "0%" : "65%" }}
                        className = 'user-chats p-0' 
                    >
                        <div className="h-100"> 
                            {
                                userCall != "" ?
                                    type != null ?
                                        <VideoCall
                                            type            = {type}
                                            setType         = {setType}
                                            userCall        = {userCall}
                                            callerVideo     = {callerVideo}
                                            setCallerVideo  = {setCallerVideo} 
                                        />
                                    :
                                        null
                                :
                                    null
                            }
                        </div>
                    </div>
                    <div 
                        style     = {{ height: type == null ? "100%" : "35%"  }}
                        className = 'user-chats pt-1' 
                    >
                        <PerfectScrollbar>
                            <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', }}>
                                {
                                    userCall != "" ?
                                        userCall.listCall != null ?
                                            userCall.listCall.map((data) => (
                                                <>
                                                    {
                                                        data.UUIDReceiver != localStorage.getItem('uuid') ?
                                                            <Card className='mb-1 p-0' key={data.id}>
                                                                <CardBody style={{ padding: '12px' }}>
                                                                    <div className='d-flex justify-content-between flex-wrap'>
                                                                        <Media className='align-items-center'>
                                                                            <img 
                                                                                src       = {ImgPhoneOutgoing} 
                                                                                className = 'mr-2'
                                                                            />
                                                                            <Media body>
                                                                                <h6 className='mb-0'>Panggilan Keluar</h6>
                                                                                <span 
                                                                                    style     = {{ fontSize: '12px' }}
                                                                                    className = 'text-muted' 
                                                                                >
                                                                                    {
                                                                                        Helper.dateIndo(data.startCallTime)
                                                                                    }
                                                                                </span>
                                                                            </Media>
                                                                        </Media>
                                                                        <div 
                                                                            style     = {{ fontSize: '12px' }}
                                                                            className = 'd-flex flex-wrap align-items-center cursor-pointer mt-sm-0 mt-50' 
                                                                        >
                                                                            {
                                                                                data.startCallTime != null && data.endCallTime != null ?
                                                                                    Helper.getDurationCall(data.startCallTime, data.endCallTime)
                                                                                :
                                                                                    null
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </CardBody>
                                                            </Card>
                                                        :
                                                            <Card className='mb-1 p-0'>
                                                                <CardBody style={{ padding: '12px' }}>
                                                                    <div className='d-flex justify-content-between flex-wrap'>
                                                                        <Media className='align-items-center'>
                                                                            <img 
                                                                                src       = {ImgPhoneIncoming} 
                                                                                className = 'mr-2'
                                                                            />
                                                                            <Media body>
                                                                                <h6 className='mb-0'>Panggilan Masuk</h6>
                                                                                <span 
                                                                                    style     = {{ fontSize: '12px' }}
                                                                                    className = 'text-muted' 
                                                                                >
                                                                                    {
                                                                                        Helper.dateIndo(data.startCallTime)
                                                                                    }
                                                                                </span>
                                                                            </Media>
                                                                        </Media>
                                                                        <div 
                                                                            style     = {{ fontSize: '12px' }}
                                                                            className = 'd-flex flex-wrap align-items-center cursor-pointer mt-sm-0 mt-50' 
                                                                        >
                                                                            {
                                                                                data.startCallTime != null && data.endCallTime != null ?
                                                                                    Helper.getDurationCall(data.startCallTime, data.endCallTime)
                                                                                :
                                                                                    null
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </CardBody>
                                                            </Card>
                                                    }
                                                </>
                                            ))
                                        :
                                            null
                                    :
                                        null
                                }
                            </div>
                        </PerfectScrollbar>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ContentCall;
