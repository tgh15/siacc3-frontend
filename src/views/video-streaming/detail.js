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
    Alert,
}                                               from "reactstrap";
import Avatar                                   from "../../components/widgets/avatar";
import ChatItem                                 from "./chat-item";
import { useParams }                            from "react-router-dom";
import VideoStreamingAPI                        from "../../services/pages/video-streaming";
import CustomToast                              from "../../components/widgets/custom-toast";
import Skeleton                                 from "react-loading-skeleton";
import { AntmediaContext }                      from "../../context/AntmediaContext";
import Helper                                   from "../../helpers";
import CustomTableBodyEmpty                     from "../../components/widgets/custom-table/CustomTableBodyEmpty";
import FormDelete                               from "../../components/widgets/form-delete/FormDelete";

const VideoStreamingDetail = () => {
    
    const [message, setMessage]                     = useState(null);
    const [detailData, setDetailData]               = useState(null);
    const [isPublished, setIsPublished]             = useState(null);
    const [commentData, setCommentData]             = useState(null);
    const [isPublishReady, setIsPublishReady]       = useState(false);
    const [isCommentReady, setIsCommentReady]       = useState(false);
    const [commentDataPinned, setCommentDataPinned] = useState(null);
    const [viewerCount, setViewerCount]             = useState(0);
    const [showDeleteForm, setShowDeleteForm]       = useState(false);
    const [loading, setLoading]                     = useState(false);

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

    const getCommentVideoStream = () => {
        const params = {
            comment     : true,
            stream_id   : id
        }

        VideoStreamingAPI.VideoStreamingList(params).then(
            res => {
                if(res.is_error === false ){
                    if(res.data != null){
                        setCommentData(res.data.reverse());
                        setCommentDataPinned(res.data.filter((data) => (
                            data.is_pinned === true
                        )));

                    }else{
                        setCommentData([]);
                        setCommentDataPinned([]);
                    }
                }
            },
            err => {

            }
        )
    };

    const getDetailVideoStream = () => {

        const params = {
            id : id
        }

        VideoStreamingAPI.VideoStreamingList(params).then(
            res => {
                if(!res.is_error){
                    setDetailData(res.data);
                    if(webRTCAdaptorPeer === null && res.data.broadcast.status !== 'finished'){
                        setTimeout(() => {
                            console.log('open koneksi')
                            setWebRtc("peer","localVideo","remoteVideo", "video")
                            setCommentData([]);
                            getCommentVideoStream();
                        },500)
                    }else if(res.data.broadcast.status === 'finished'){
                        getCommentVideoStream();
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

    const handleSendChat = () => {
        
        const param = {
            comment : true,
            id      : id
        };

        const formData = {
            message : message
        }

        VideoStreamingAPI.CreateCommentVideoStreaming(formData, param).then(
            res => {
                setMessage(null);
                console.log(res, 'send comment video');
            },
            err => {
                console.log(err, 'send comment video');
            }
        )

    }

    useEffect(() => {
        getDetailVideoStream();    
    }, [])

    useEffect(() => {
        if(webRTCAdaptorPeer !== null){
            if(callback.info === 'initialized'){
                setIsPublishReady(true)
            }else if(callback.info === 'data_channel_opened'){
                setIsCommentReady(true);
            }else if(callback.info === 'data_received' ){

                let parse = JSON.parse(callback.obj.data)
                if(parse.type == 'live_viewer'){
                    setViewerCount(parseInt(parse.viewer))
                }else if(parse.type === 'new_comment' || parse.type === 'pin_comment' || parse.type == 'unpin_comment'){
                    getCommentVideoStream();
                }
            }
        }
        if(detailData != null && detailData.broadcast.status === 'broadcasting'){
            if(webRTCAdaptorPeer !== null && callback.info === 'initialized' ){
                handleStartPlay()
            }
        }
    }, [callback])

    return (
        <>
            <FormDelete
                show        = {showDeleteForm}
                title       = "Akhiri Siaran Langsung"
                setShow     = {(par) => setShowDeleteForm(par)}
                loading     = {loading} 
                onDelete    = {handleStopPublish}
                text        = "Yakin Akhiri Siaran Langsung"
            />
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
                                                            (detailData.broadcast.status === 'created' && isPublishReady ) &&
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
                                                (detailData.broadcast.status === 'created') &&
                                                <>
                                                    {
                                                        !isPublished ?
                                                            <Button
                                                                size      = "lg"
                                                                color     = "primary"
                                                                onClick   = {() => {handleStartPublish()}}
                                                                disabled  = {!isPublishReady}
                                                                className = "w-100"
                                                            >
                                                                Mulai Siaran Langsung
                                                            </Button>
                                                        :
                                                            <Button
                                                                size      = "lg"
                                                                color     = "primary"
                                                                onClick   = {() => setShowDeleteForm(true)}
                                                                className = "w-100"
                                                            >
                                                                Akhiri Siaran Langsung
                                                            </Button>
                                                    }
                                                </>

                                            }
                                            {
                                                (detailData.broadcast.status === 'broadcasting' && isPublishReady) &&
                                                <Button
                                                    size      = "lg"
                                                    color     = "primary"
                                                    onClick   = {() => setShowDeleteForm(true)}
                                                    className = "w-100"
                                                >
                                                    Akhiri Siaran Langsung
                                                </Button>

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
                                        <h4> {detailData != null ? getDuration(detailData.created_at, new Date) : 0}</h4>
                                    </Col>
                                    <Col md={6} className="text-center">
                                        <h3>Total Penonton</h3>
                                        <h4>{viewerCount}</h4>
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
                        <CardHeader style={{height: '15vh'}}>
                            <Row className="w-100">
                                <Col md={12}>
                                {
                                    commentDataPinned != null &&
                                    <Alert color="primary" className="mb-0">
                                        <ChatItem
                                            data   = {commentDataPinned[0]}
                                            pinned = {true}
                                        />
                                    </Alert>
                                }
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <div style={{height: '60vh', overflow: 'auto', borderRadius: '10px'}}>
                                {
                                    commentData != null ?
                                        commentData.map((data) => (
                                            <Card className="p-0 mb-1">
                                                <CardBody className="p-0">
                                                    <ChatItem
                                                        data = {data}
                                                    />
                                                </CardBody>
                                            </Card>
                                        ))
                                    :
                                        <CustomTableBodyEmpty/>
                                }
                            </div>
                        </CardBody>
                        <CardFooter>
                            <form onSubmit={e => e.preventDefault()} className='chat-app-form'>
                                <InputGroup className='mr-1 form-send-message'>
                                    <Input
                                        value       = {message}
                                        onChange    = {e => { e.defaultPrevented = true; setMessage(e.target.value)}}
                                        disabled    = {!isCommentReady}
                                        placeholder = 'Aa'
                                    />
                                    <Button 
                                        color       = 'primary'
                                        type        = "reset"
                                        onClick     = {() => {handleSendChat()}}
                                        className   = 'send' 
                                        disabled    = {!isCommentReady}
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
                            </form>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>

        </>
    )
};

export default VideoStreamingDetail;