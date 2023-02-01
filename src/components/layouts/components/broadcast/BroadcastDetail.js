import { useContext, useEffect, useState }    from "react"
import { Radio }                    from "react-feather"
import { 
    Media,
    Button,
    ModalFooter
}                                   from "reactstrap"
import Avatar                       from "../../../widgets/avatar"
import Helper                       from "../../../../helpers"
import Skeleton                     from "react-loading-skeleton"
import broadcastAPI                 from "../../../../services/pages/broadcast"
import { ModalBase }                from "../../../widgets/modals-base"
import { BroadcastContext }         from "../../../../context/BroadcastContext"
import CarouselAttachment           from "../../../widgets/card-carousel"
import CardVideo from "../../../widgets/card-video"
import CardAudio from "../../../widgets/card-audio"
import CardFile from "../../../widgets/card-file/CardFile"

const BroadcastDetail = props => {

    const {
        show,
        setShow,
    } = props

    const { broadcastSelected }     = useContext(BroadcastContext)

    const [messages, setMessages]   = useState(null);

    const { dateIndo }              = Helper

    const getBroadcastDetail = () => {
        broadcastAPI.getBroadcastMessage(broadcastSelected.id).then(
            res => {
                if(!res.is_error){
                    if(res.data != null){
                        if("messages" in res.data){
                            setMessages(res.data.messages);
                        }else{
                            setMessages([]);
                        }
                    }else{
                        setMessages([]);
                    }
                }else{
                    setMessages([]);
                }
            },
            err => {

            }
        )
    };

    const processAttachment = (data, type) => {
        let attachment_ = [];

        if (data != null && data.length > 0) {
            data.map((data) => (
                data.type === type && attachment_.push(data)
            ))
        }

        return attachment_;
    };

    useEffect(() => {
        console.log(broadcastSelected)
        if(broadcastSelected != null){
            getBroadcastDetail();
        }
    }, [show]);

    return (
        <>
            <ModalBase 
                show    = {show} 
                title   = "Detail Pesan Siaran"
                setShow = {(par) => setShow(par)} 
                style   = {{zIndex: 500}}
            >
                {
                    broadcastSelected != null && 
                    (
                        <>
                            <Media 
                                style       = {{ borderRadius:"5px" }}
                                className   = "d-flex border-primary p-1" 
                            >
                                <Media left>
                                    <Avatar 
                                        icon    = {<Radio size={14} />} 
                                        color   = 'primary' 
                                    />
                                </Media>
                                <Media 
                                    body 
                                    className   = "ml-1"
                                >
                                    {broadcastSelected.name}<br />
                                    {dateIndo(broadcastSelected.time)}
                                </Media>
                            </Media>
                            {
                                messages != null ?
                                    messages.length > 0 ?
                                        messages.map((data) => (
                                            <>
                                                <p className="mt-3">
                                                    {data.content}
                                                </p>
                                                
                                                {/* image */}
                                                {
                                                    data.attachment != null && data.attachment.length > 0 ?
                                                        <CarouselAttachment
                                                            images = {processAttachment(data.attachment, "Image").map((data) => ({attachment : data.content, Name : data.name}))}
                                                        /> 
                                                    : 
                                                        null
                                                }

                                                {/* video */}
                                                {
                                                    data.attachment != null && data.attachment.length > 0 ?
                                                        <CardVideo
                                                            item = {processAttachment(data.attachment, "Video").map((data) => ({attachment : data.content, Name : data.name}))}
                                                        />
                                                    : 
                                                        null
                                                }

                                                {/* audio */}
                                                {
                                                    data.attachment != null && data.attachment.length > 0 ?
                                                        <CardAudio
                                                            item = {processAttachment(data.attachment, "Audio").map((data) => ({attachment : data.content, Name : data.name}))}
                                                        />
                                                    : null
                                                }
                                                {/* document */}
                                                {
                                                    data.attachment != null && data.attachment.length > 0 ?
                                                        <CardFile
                                                            item = {processAttachment(data.attachment, "Document").map((data) => ({attachment : data.content, Name : data.name}))}
                                                        />
                                                    : null
                                                }

                                            </>
                                        ))
                                    :
                                        null
                                :
                                    <Skeleton height={20} count={1}/>
                            }
                        </>
                    )
                }

                <ModalFooter className="d-flex justify-content-end px-0">
                    <Button 
                        color   = "primary" 
                        onClick = {() => {setShow(false)}}
                    >
                        OK
                    </Button>
                </ModalFooter>
            </ModalBase>
        </>
    )
}

export default BroadcastDetail