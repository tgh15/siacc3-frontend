import React, { Fragment }          from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';

import { Server }                   from 'react-feather';


const ServerMonitor = () => {
    return (
        <Fragment>
            <Row className="text-center">
                <Col
                    md = '3' 
                    sm = '12'
                >
                    <Card>
                        <CardBody>
                            <a 
                                href    = "http://192.168.33.1" 
                                target  = "_blank"
                            >
                                <Server size={85}/>
                            </a>
                            <p className="mt-1">
                                Server 1
                                <p>(siacc-frontend)</p>
                            </p>
                        </CardBody>
                    </Card>
                </Col>
                <Col
                    md = '3' 
                    sm = '12'
                >
                    <Card>
                        <CardBody>
                            <a 
                                href    = "http://192.168.33.2" 
                                target  = "_blank"
                            >
                                <Server size={85}/>
                            </a>
                            <p className="mt-1">
                                Server 2
                                <p>(siacc-backend 1)</p>
                            </p>
                        </CardBody>
                    </Card>
                </Col>
                <Col
                    md = '3' 
                    sm = '12'
                >
                    <Card>
                        <CardBody>
                            <a 
                                href    = "http://192.168.33.3" 
                                target  = "_blank"
                            >
                                <Server size={85}/>
                            </a>
                            <p className="mt-1">
                                Server 3
                                <p>(siacc-backend 2)</p>
                            </p>
                        </CardBody>
                    </Card>
                </Col>
                <Col
                    md = '3' 
                    sm = '12'
                >
                    <Card>
                        <CardBody>
                            <a 
                                href    = "http://192.168.33.4" 
                                target  = "_blank"
                            >
                                <Server size={85}/>
                            </a>
                            <p className="mt-1">
                                Server 4
                                <p>(siacc-backend 3)</p>
                            </p>
                        </CardBody>
                    </Card>
                </Col>
                <Col
                    md = '3' 
                    sm = '12'
                >
                    <Card>
                        <CardBody>
                            <a 
                                href    = "http://192.168.33.5" 
                                target  = "_blank"
                            >
                                <Server size={85}/>
                            </a>
                            <p className="mt-1">
                                Server 5
                                <p>(siacc-backend-storage 1)</p>
                            </p>
                        </CardBody>
                    </Card>
                </Col>
                <Col
                    md = '3' 
                    sm = '12'
                >
                    <Card>
                        <CardBody>
                            <a 
                                href    = "http://192.168.33.6" 
                                target  = "_blank"
                            >
                                <Server size={85}/>
                            </a>
                            <p className="mt-1">
                                Server 6
                                <p>(siacc-backend-storage 2)</p>
                            </p>
                        </CardBody>
                    </Card>
                </Col>
                <Col
                    md = '3' 
                    sm = '12'
                >
                    <Card>
                        <CardBody>
                            <a 
                                href    = "http://192.168.33.7" 
                                target  = "_blank"
                            >
                                <Server size={85}/>
                            </a>
                            <p className="mt-1">
                                Server 7
                                <p>(siacc-backend-storage 3)</p>
                            </p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default ServerMonitor;