import { Card, CardBody, Col, Media, Row } from "reactstrap";
import Avatar from "../../components/widgets/avatar";
import Helper from "../../helpers";

const VideoPlayer = () => {
    const { fallbackImage_} = Helper;
    return (
        <>
            <Card>
                <CardBody>
                    <video 
                        // id              = {`ptt_name_${activeChannel.roomName}_id_`+data}
                        height          = {5}
                        autoPlay 
                        controls 
                        className       = 'img-fluid img-video w-100'
                        style           = {{borderRadius: '10px'}}
                        poster          = "https://media.giphy.com/media/PjIKNsWUOhwL6/giphy.gif"
                        // onLoadedData    = {() => {console.log('ready')}}
                    />

                    <Row>
                        <Col md={8}>
                            <div className="mt-1">
                                <Media>
                                    <Media left href='#'>
                                        <Avatar 
                                            img         = {`https://ui-avatars.com/api/?name=UN&background=4e73df&color=fff&bold=true`} 
                                            status      = 'online'
                                            onError     = {fallbackImage_} 
                                            
                                            imgWidth    = '40' 
                                            imgHeight   = '40' 
                                        />
                                    </Media>
                                    <Media body>
                                        <Media className="mb-0 ml-1 text-capitalize">Masrudin</Media>
                                        <h6 className="text-muted ml-1 mt-0">Kejati-Sulsel</h6>
                                    </Media>
                                </Media>
                            </div>
                        </Col>
                        <Col 
                            md={4}
                            className="d-flex align-items=center"
                        >
                            <h5
                                className="mt-2"
                            >
                                1101 Penonton
                            </h5>
                        </Col>
                    </Row>

                </CardBody>
            </Card>
        </>
    )

};

export default VideoPlayer;