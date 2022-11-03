import { Card, CardBody, Col, Media, Row } from "reactstrap";
import Avatar from "../../components/widgets/avatar";
import Helper from "../../helpers";

const VideoPlayer = () => {
    const { fallbackImage_} = Helper;
    return (
        <>
            <div className="text-center mb-2">
                <video 
                    // id              = {`ptt_name_${activeChannel.roomName}_id_`+data}
                    autoPlay 
                    controls 
                    // className       = 'img-fluid img-video'
                    style           = {{borderRadius: '10px'}}
                    poster          = "https://media.giphy.com/media/PjIKNsWUOhwL6/giphy.gif"
                />
            </div>

            <Row className="mb-2">
                <Col md={8}>
                    <div>
                        <Media>
                            <Media left href='#'>
                                <Avatar 
                                    img         = {`https://ui-avatars.com/api/?name=UN&background=4e73df&color=fff&bold=true`} 
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
                    className="d-flex align-items-center justify-content-end"
                >
                    <h5>
                        1101 Penonton
                    </h5>
                </Col>
            </Row>
        </>
    )

};

export default VideoPlayer;