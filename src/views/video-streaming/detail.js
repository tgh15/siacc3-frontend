import { useState } from "react";
import { File, Image, Mic, Send } from "react-feather";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from "reactstrap";
import Avatar from "../../components/widgets/avatar";
import ChatItem from "./chat-item";
import VideoPlayer from "./video";

const VideoStreamingDetail = () => {

    const [msg, setMsg] = useState(null);


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
                                <VideoPlayer />

                                <hr className="my-1" />
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
                                <Card style={{}}>
                                    <CardBody>
                                        <Row>
                                            <ChatItem/>
                                        </Row>
                                    </CardBody>
                                </Card>
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