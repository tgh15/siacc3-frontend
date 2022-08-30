import { useContext, useEffect }   from "react";

//Component
import { ModalBase }    from "../../../widgets/modals-base";
import Avatar           from '../../../widgets/avatar';
import Helper           from '../../../../helpers';

import {
    Button
}                       from "reactstrap";
import { 
    useHistory,
    useLocation, 
} from 'react-router-dom'

import {
    PhoneCall,
    PhoneMissed
}                       from "react-feather";



//Context
import { ChatContext }      from "../../../../context/ChatContext";
import { AntmediaContext }  from "../../../../context/AntmediaContext";


const IncomingCall = () => {

    const history   = useHistory()
    const location  = useLocation();


    const { 
        privateCall,
        incomingCall, 
        setIsCallAnswer,
        setIncomingCall,
        privateCallData,
    }     									= useContext(ChatContext);

    const {
        setWebRtc,
        webRTCAdaptorPeer
    }                                       = useContext(AntmediaContext)


    return (
        <>
            {/* incoming video or voice call */}
			<ModalBase
				show    = {incomingCall}
				center  = {true}
				setShow = {(par) => setIncomingCall(par)}
				title   = "Panggilan Masuk"
			>
				<div className='text-center p-2'>
					{
						privateCallData != null ? 
							<>
								<h5>
									Panggilan { privateCallData.data.type == "voice" ? "Suara" : "Video" } Masuk Dari 
								</h5>
								<Avatar 
									img			= {privateCallData.data.UUIDCallerDetail.avatar} 
									size		= {"xl"} 
									onError		= {Helper.fallbackImage_} 
									className	= "my-2"
								/>
								<h5>
									<strong>{privateCallData.data.UUIDCallerDetail.name}</strong>
								</h5>

								<div className='d-flex justify-content-center pt-2'>
									<Button 
                                        size        = "lg" 
                                        color       = "primary "
                                        onClick     = {() => {
                                            !location.pathname.includes("voice-video-call") ?
                                                history.push('/voice-video-call')
                                            :
                                                null
                                            
                                            setIsCallAnswer(true);
                                            setIncomingCall(false);

                                        }}
                                        className   = "btn-icon rounded-circle mr-3" 
                                    >
										<PhoneCall size={16}/>
									</Button>
									<Button 
                                        size        = "lg" 
                                        color       = "danger"
                                        onClick     = {() => {
                                            privateCall(privateCallData.data.id, false, privateCallData.data.type);
                                            setIsCallAnswer(false);
                                            setIncomingCall(false);
                                        }}
                                        className   = "btn-icon rounded-circle point-cursor"
                                    >
										<PhoneMissed size={16}/>
									</Button>
								</div>
							</>
						:
							<h5>
								Data Panggilan Tidak Tersedia
							</h5>
					}
				</div>

			</ModalBase>
        </>
    )
};

export default IncomingCall;