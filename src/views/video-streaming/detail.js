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
}                                               from "reactstrap";
import Avatar                                   from "../../components/widgets/avatar";
import ChatItem                                 from "./chat-item";
import { useParams }                            from "react-router-dom";
import VideoStreamingAPI                        from "../../services/pages/video-streaming";
import CustomToast                              from "../../components/widgets/custom-toast";
import Skeleton                                 from "react-loading-skeleton";
import { AntmediaContext }                      from "../../context/AntmediaContext";

const VideoStreamingDetail = () => {

    const [msg, setMsg]                 = useState(null);
    const [detailData, setDetailData]   = useState(null);
    const [played, setPlayer]           = useState(null);

    let {id}                            = useParams();

    const {
        callback,
        setWebRtc,
        webRTCAdaptorPeer
    }                                    = useContext(AntmediaContext);

    const getDetailVideoStream = () => {

        const params = {
            id : id
        }

        VideoStreamingAPI.VideoStreamingList(params).then(
            res => {
                if(res.is_error === false){
                    setDetailData(res.data);

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

    useEffect(() => {
        getDetailVideoStream();

        if(webRTCAdaptorPeer === null){
            setTimeout(() => {
                setWebRtc("peer","localVideotest","remotetest", "video")
            } ,1000);
        }
        else{
            if(webRTCAdaptorPeer !== null &&  callback.info === 'initialized' ){
                setTimeout(() => {
                    webRTCAdaptorPeer.publish(id);
                }, 1000);
            }
        }

    }, [webRTCAdaptorPeer, callback])

    // // useEffect(() => {

    //     if(webRTCAdaptorPeer !== null && callback.info === 'initialized'){
    //         webRTCAdaptorPeer.getStreamInfo(id);
    //         // webRTCAdaptorPeer.publish(id);
    //         // setTimeout(() => {
    //             // webRTCAdaptorPeer.publish(id);
    //         // }, 1000);
    //     }else if(callback.info === 'ice_connection_state_changed'){
    //         // webRTCAdaptorPeer.play(id);
    //         webRTCAdaptorPeer.publish(id);

    //     }

    // // }, [webRTCAdaptorPeer, callback])

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
                                                        {detailData.title.toUpperCase()}
                                                    </h3>
                                                </Col>
                                                <Col 
                                                    md          = {6}
                                                    className   = "d-flex align-items-center justify-content-end"  
                                                >
                                                    <div>
                                                        {
                                                            detailData.broadcast.status === 'published' &&
                                                            <Badge color='danger'>
                                                                Live
                                                            </Badge>
                                                        }
                                                    </div>

                                                </Col>
                                            </Row>

                                            {/* {
                                                detailData.broadcast.status === 'finished' &&
                                                <video 
                                                    src             = {`https://antmedia.underdev.team/WebRTCAppEE/${detailData.vod.filePath}`}
                                                    style           = {{borderRadius: '10px', maxHeight: '60%', width: '100%'}}
                                                    poster          = {`https://antmedia.underdev.team/WebRTCAppEE/previews/${detailData.vod.streamId}_finished.png`}
                                                    controls 
                                                    className       = 'img-fluid img-video'
                                                />
                                            } */}

                                            {
                                                // detailData.broadcast.status === 'created' && 
                                                <video 
                                                    id              = "localVideotest"
                                                    style           = {{borderRadius: '10px', maxHeight: '60%', width: '100%'}}
                                                    autoPlay 
                                                    controls 
                                                    className       = 'img-fluid img-video'
                                                />
                                            }

                                            {
                                                detailData.broadcast.status === 'published' && 
                                                <video 
                                                    id              = "remotetest"
                                                    style           = {{borderRadius: '10px', maxHeight: '60%', width: '100%'}}
                                                    controls 
                                                    className       = 'img-fluid img-video'
                                                />
                                            }
                                        </>
                                }

                                <hr/>
                                <Row className="mt-2">
                                    <Col md={4} className="text-center">
                                        <h3>Penayangan</h3>
                                        <h4>100</h4>
                                    </Col>
                                    <Col md={4} className="text-center">
                                        <h3>Puncak Tayang Serentak</h3>
                                        <h4>100</h4>
                                    </Col>
                                    <Col md={4} className="text-center">
                                        <h3>Total Penonton</h3>
                                        <h4>100</h4>
                                    </Col>
                                </Row>
                                <Row>
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
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
                <Col md={4}>
                    <Card style={{ height: '85vh' }}>
                        <CardHeader>
                            <div className="d-flex align-items-center">
                                <Avatar
                                    img         = {`https://ui-avatars.com/api/?name=UN&background=4e73df&color=fff&bold=true`}
                                    imgWidth    = '40'
                                    imgHeight   = '40'
                                    className   = "mr-1"
                                />
                                <h3 className="mb-0"> Total 30 Penonton</h3>
                            </div>
                        </CardHeader>
                        <CardBody>
                            {/* chat textbox */}
                            <div>
                                <Card className="p-0">
                                    <CardBody className="p-0">
                                        <ChatItem
                                            pinned = {true}
                                        />
                                    </CardBody>
                                </Card>
                            </div>
                            <div style={{height: '52vh', overflow: 'auto', border: '1px solid black', borderRadius: '10px', padding: '5px'}}>
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