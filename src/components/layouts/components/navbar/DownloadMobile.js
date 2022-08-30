import React, { Fragment }              from 'react';
import { 
    Row,
    Col,
    Card,
    Modal, 
    CardBody,
    ModalBody,
    CardFooter,
}                                       from 'reactstrap';

import { X }                            from 'react-feather'
import LogoSiacc                        from '@src/assets/images/logo/logo_dark.png';

const DownloadMobile = (props) => {
    return (
        <Fragment>
            <Modal
                size    = "lg"
                isOpen  = {props.basicModal} 
                toggle  = {() => props.setBasicModal(!props.basicModal)}
            >
                <div style={{ display: 'flex', justifyContent: 'end', cursor: 'pointer', margin: '15px' }}>
                    <X 
                        size    = {18}
                        style   = {{ color: '#1a623a' }}
                        onClick = {() => props.setBasicModal(!props.basicModal)} 
                    />
                </div>
                
                <ModalBody style={{ textAlign: 'center' }}>
                    <div 
                        style     = {{ letterSpacing: '1px', wordSpacing: '2px' }}
                        className = 'mb-3' 
                    >
                        <h3 style={{ fontWeight: 'bold', marginBottom: '30px' }}>Aplikasi Mobile</h3>
                        <h5>Download dan Install Aplikasi Mobile SIACC</h5>
                    </div>

                    <Row>
                        <Col md="6">
                            <a href={props.downloadData != null ? props.downloadData.url : null}>
                                <Card>
                                    <CardBody 
                                        style     = {{ backgroundColor: '#151329',  borderRadius: '6px 6px 0 0' }}
                                        className = "pb-0"
                                    >
                                        <div className='mt-5'>
                                            <img src={LogoSiacc} style={{ width: '200px' }}/>
                                        </div>
                                        <div style={{ marginTop: '120px', color: '#fff', letterSpacing: '2px', wordSpacing: '2px' }}>
                                            <h3 style={{ fontWeight: 'bold', color: '#fff' }}>
                                                Full Version
                                            </h3>
                                            <h5 style={{ color: '#fff' }}>Minimal Android 7 Version</h5>
                                            <p className='mt-2'>{props.downloadData != null ?props.downloadData.name : null}</p>
                                        </div>
                                    </CardBody>
                                    <CardFooter style={{ padding: '8px', backgroundColor: '#cecfe1' }}>
                                        <h3 style={{ fontWeight: 'bold' }}>Download</h3>
                                    </CardFooter>
                                </Card>
                            </a>
                        </Col>
                        <Col md="6">
                            <a href={props.downloadDataLite != null ? props.downloadDataLite.url : null}>
                                <Card>
                                    <CardBody 
                                        style     = {{ backgroundColor: '#1a623a',  borderRadius: '6px 6px 0 0' }}
                                        className = "pb-0"
                                    >
                                        <div className='mt-5'>
                                            <img src={LogoSiacc} style={{ width: '200px' }}/>
                                        </div>
                                        <div style={{ marginTop: '120px', color: '#fff', letterSpacing: '2px', wordSpacing: '2px' }}>
                                            <h3 style={{ fontWeight: 'bold', color: '#fff' }}>
                                                Lite Version
                                            </h3>
                                            <h5 style={{ color: '#fff' }}>Minimal Android 5 Version</h5>
                                            <p className='mt-2'>{props.downloadDataLite != null ?props.downloadDataLite.name : null}</p>
                                        </div>
                                    </CardBody>
                                    <CardFooter style={{ padding: '8px', backgroundColor: '#cecfe1' }}>
                                        <h3 style={{ fontWeight: 'bold' }}>Download</h3>
                                    </CardFooter>
                                </Card>
                            </a>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>

            {/* <Modal 
                size    = "sm"
                isOpen  = {props.basicModal} 
                toggle  = {() => props.setBasicModal(!props.basicModal)}
            >
                <ModalHeader toggle={() => props.setBasicModal(!props.basicModal)}>
                    Download Aplikasi Mobile
                </ModalHeader>
                
                <ModalBody style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '15px' }}>
                        Silahkan klik tambol dibawah untuk mendownload aplikasi Android.
                    </p>

                    {
                        props.downloadData != null ?
                            <>
                                <p className="mt-1">Versi Full Aplikasi Minimal Versi Android 7</p>
                                <a href={props.downloadData != null ? props.downloadData.url : null} >
                                    <Button>
                                        <Download size={20}/>
                                        <p className="m-0 ml-2 text-dark">
                                        {props.downloadData != null ?props.downloadData.name : null}
                                    </p>
                                    <p className="m-0">
                                        {props.downloadData != null ? (props.downloadData.mime.size) : null}
                                    </p>
                                    <p className="m-0">
                                        {props.downloadData != null ? (props.downloadData.created_at) : null}
                                    </p>
                                    </Button>
                                </a>
                            </>

                        :
                            null
                    }

                    {
                        props.downloadDataLite != null ?
                            <>                            
                                <p className="mt-1">Versi Lite Aplikasi Minimal Versi Android 5</p>
                                <a href={props.downloadDataLite != null ? props.downloadDataLite.url : null} >
                                    <Button>
                                        <Download size={20}/>
                                        <p className="m-0 ml-2 text-dark">
                                        {props.downloadDataLite != null ?props.downloadDataLite.name : null}
                                    </p>
                                    <p className="m-0">
                                        {props.downloadDataLite != null ? (props.downloadDataLite.mime.size) : null}
                                    </p>
                                    <p className="m-0">
                                        {props.downloadDataLite != null ? (props.downloadDataLite.created_at) : null}
                                    </p>
                                    </Button>
                                </a>
                            </>
                        :
                            null
                    }

                </ModalBody>
            </Modal> */}
        </Fragment>
    );
};

export default DownloadMobile;
