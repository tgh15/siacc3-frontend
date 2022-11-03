import { Card, CardBody, Col, Row } from "reactstrap";
import VideoPlayer from "./video";

const VideoStreamingDetail = () => {
    return (
        <>
            <Row style={{display:'flex', flex:'1'}}>
                <Col md={8} className="d-flex flex-column">
                    <div className="h-50">

                        <Card>
                            <CardBody>
                                <VideoPlayer/>
                                
                                <hr className="my-1"/>
                                <Row className="mt-2">
                                    <Col md={4} className="text-center">
                                        <h4>Penayangan</h4>
                                        <p>100</p>
                                    </Col>
                                    <Col md={4} className="text-center">
                                        <h4>Puncak Tayang Serentak</h4>
                                        <p>100</p>
                                    </Col>
                                    <Col md={4} className="text-center">
                                        <h4>Total Penonton</h4>
                                        <p>100</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} className="text-center">
                                        <h4>Rasio Chat</h4>
                                        <p>100</p>
                                    </Col>
                                    <Col md={4} className="text-center">
                                        <h4>Rata-Rata Durasi Tonton</h4>
                                        <p>100</p>
                                    </Col>
                                    <Col md={4} className="text-center">
                                        <h4>Durasi Tonton</h4>
                                        <p>100</p>

                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            test
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
};

export default VideoStreamingDetail;