import { useContext, useEffect, useState }      from "react";
import { Send }                                 from "react-feather";
import { 
    Row,
    Col, 
    Card, 
    Form, 
    Input, 
    Badge, 
    Button, 
    CardBody, 
    CardFooter, 
    CardHeader, 
    InputGroup,
    Media,
}                                               from "reactstrap";
import Avatar                                   from "../../components/widgets/avatar";
import ChatItem                                 from "./chat-item";
import { useParams }                            from "react-router-dom";
import VideoStreamingAPI                        from "../../services/pages/video-streaming";
import CustomToast                              from "../../components/widgets/custom-toast";
import Skeleton                                 from "react-loading-skeleton";
import { AntmediaContext }                      from "../../context/AntmediaContext";
import moment, { now } from "moment";
import Helper from "../../helpers";

const VideoStreamingDetail = () => {

    const [msg, setMsg]                         = useState(null);
    const [detailData, setDetailData]           = useState(null);
    const [isPublished, setIsPublished]         = useState(null);
    const [isPublishReady, setIsPublishReady]   = useState(null);

    let {id}                                    = useParams();

    const {
        callback,
        setWebRtc,
        webRTCAdaptorPeer
    }                                           = useContext(AntmediaContext);

    const {
        getDuration,
        fallbackImage_
    }                                           = Helper;

    const getDetailVideoStream = () => {

        const params = {
            id : id
        }

        VideoStreamingAPI.VideoStreamingList(params).then(
            res => {
                if(res.is_error === false){
                    setDetailData(res.data);

                    if(webRTCAdaptorPeer === null && res.data.broadcast.status !== 'finished'){
                        setWebRtc("peer","localVideo","remoteVideo", "video")
                    }

                }else{
                    setDetailData([]);
                }
                
            },
            err => {
                CustomToast('danger', 'Terjadi Kesalahan');
                console.log(err, 'detail video error');
            }
        )
    };

    const handleStartPublish = () => {
        setIsPublished(true);
        if(webRTCAdaptorPeer !== null){
            webRTCAdaptorPeer.publish(id);
        }
    };

    const handleStopPublish = () => {
        if(webRTCAdaptorPeer !== null){
            webRTCAdaptorPeer.stop(id);
            webRTCAdaptorPeer.closePeerConnection(id);
            webRTCAdaptorPeer.closeWebSocket();
        }

        CustomToast('success','Siaran Langsung Berakhir.');
        setTimeout(() => {
            window.location.href = '/video-streaming'
        }, 1000);
    }

    const handleStartPlay = () => {
        setIsPublished(true);
        if(webRTCAdaptorPeer !== null){
            webRTCAdaptorPeer.play(id);
        }
    }

    useEffect(() => {
        getDetailVideoStream();    
    }, [])

    useEffect(() => {
        if(webRTCAdaptorPeer !== null &&  callback.info === 'initialized' ){
            setIsPublishReady(true)
        }
    }, [callback])

    return (
        <>
            <Row>
                <Col
                    md          = {8}
                    className   = "d-flex flex-column"
                >
                    <div>
                        <Card style={{ height: '85vh' }}>
                            <CardBody>
                                {
                                    detailData === null ?
                                        <Skeleton/>
                                    :
                                        <>
                                            <Row className="mb-1">
                                                <Col 
                                                    md          = {6} 
                                                    className   = "d-flex align-items-center justify-content-start"  
                                                >
                                                    <h3
                                                        className   = "d-flex align-items-center justify-content-start card-title mb-0"  
                                                    >
                                                        {detailData?.title?.toUpperCase()}
                                                    </h3>
                                                </Col>
                                                <Col 
                                                    md          = {6}
                                                    className   = "d-flex align-items-center justify-content-end"  
                                                >
                                                    <div>
                                                        {
                                                            (detailData.broadcast.status === 'created' ) &&
                                                            <Badge color='danger'>
                                                                Live
                                                            </Badge>
                                                        }
                                                    </div>

                                                </Col>
                                            </Row>

                                            {
                                                detailData.broadcast.status === 'finished' &&
                                                <video 
                                                    src             = {`https://antmedia.underdev.team/WebRTCAppEE/${detailData.vod.filePath}`}
                                                    style           = {{borderRadius: '10px', maxHeight: '60%', width: '100%'}}
                                                    poster          = {`https://antmedia.underdev.team/WebRTCAppEE/previews/${detailData.vod.streamId}_finished.png`}
                                                    controls 
                                                    className       = 'img-fluid img-video'
                                                />
                                            }

                                            {
                                                (detailData.broadcast.status === 'created') && 
                                                <>
                                                    <video 
                                                        id              = "localVideo"
                                                        style           = {{borderRadius: '10px', maxHeight: '60%', width: '100%'}}
                                                        autoPlay 
                                                        controls 
                                                        className       = 'img-fluid img-video'
                                                    />
                                                </>
                                            }

                                            {
                                                detailData.broadcast.status === 'broadcasting' && 
                                                <video 
                                                    id              = "remoteVideo"
                                                    style           = {{borderRadius: '10px', maxHeight: '60%', width: '100%'}}
                                                    autoPlay
                                                    controls 
                                                    className       = 'img-fluid img-video'
                                                />
                                            }

                                            {
                                                detailData.broadcast.status !== 'finished' &&
                                                <>
                                                    {
                                                        !isPublished ?
                                                            <Button
                                                                size      = "lg"
                                                                color     = "primary"
                                                                onClick   = {() => {detailData.broadcast.status === 'created' ? handleStartPublish() : handleStartPlay()}}
                                                                disabled  = {!isPublishReady}
                                                                className = "w-100"
                                                            >
                                                                Mulai Siaran Langsung
                                                            </Button>
                                                        :
                                                            <Button
                                                                size      = "lg"
                                                                color     = "primary"
                                                                onClick   = {() => handleStopPublish()}
                                                                className = "w-100"
                                                            >
                                                                Akhiri Siaran Langsung
                                                            </Button>
                                                    }
                                                </>

                                            }
                                        </>
                                }
                                <hr/>
                                {
                                    detailData &&
                                    <div>
                                        <Media>
                                            <Media left href='#'>
                                                <Avatar 
                                                    img         = {detailData.owner.avatar}
                                                    onError     = {fallbackImage_} 
                                                    imgWidth    = '40' 
                                                    imgHeight   = '40' 
                                                />
                                            </Media>
                                            <Media body>
                                                <Media className="mb-0 ml-1 text-capitalize">{detailData.owner.name}</Media>
                                                <h6 className="text-muted ml-1 mt-0">{detailData.owner.origin}</h6>
                                            </Media>
                                        </Media>
                                    </div>
                                }
                                <hr/>
                                <Row className="mt-2">
                                    <Col md={6} className="text-center">
                                        <h3>Total Durasi</h3>
                                        <h4> {detailData != null ? getDuration(detailData.created_at, new Date) : 0} Menit</h4>
                                    </Col>
                                    <Col md={6} className="text-center">
                                        <h3>Total Penonton</h3>
                                        <h4>{detailData != null ? detailData.viewer_count : 0}</h4>
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col md={4} className="text-center">
                                        <h3>Rasio Chat</h3>
                                        <h4>100</h4>
                                    </Col>
                                    <Col md={4} className="text-center">
                                        <h3>Rata-Rata Durasi Tonton</h3>
                                        <h4>100</h4>
                                    </Col>
                                    <Col md={4} className="text-center">
                                        <h3>Durasi Tonton</h3>
                                        <h4>100</h4>

                                    </Col>
                                </Row> */}
                            </CardBody>
                        </Card>
                    </div>
                </Col>
                <Col md={4}>
                    <Card style={{ height: '85vh' }}>
                        <CardHeader>
                            <ChatItem
                                pinned = {true}
                            />
                        </CardHeader>
                        <CardBody>
                            <div style={{height: '60vh', overflow: 'auto', borderRadius: '10px'}}>
                                {Array(10).fill(10).map((data) => (
                                    <Card className="p-0 mb-1">
                                        <CardBody className="p-0">
                                            <ChatItem/>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        </CardBody>
                        <CardFooter>
                            <Form className='chat-app-form'>
                                <InputGroup className='mr-1 form-send-message'>
                                    <Input
                                        value       = {msg}
                                        onChange    = {e => setMsg(e.target.value)}
                                        placeholder = 'Aa'
                                    />
                                    <Button 
                                        color       = 'primary'
                                        className   = 'send' 
                                    >
                                        <Send 
                                            size        = {14} 
                                           
                                            className   = 'd-lg-none' 
                                        />
                                        <span className='d-none d-lg-block'>
                                            Kirim
                                        </span>
                                    </Button>
                                </InputGroup>
                            </Form>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>

        </>
    )
};

export default VideoStreamingDetail;