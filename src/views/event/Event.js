import React, { Fragment, useState }    from 'react';
import { 
    Nav,
    Col, 
    Row, 
    Card, 
    NavLink, 
    CardBody,
}   from 'reactstrap';

//Helper
import Helpers                          from "../../helpers";

//Image
import LogoEvent                        from '@src/assets/images/logo/event.svg';
import LogoSiacc                        from "@src/assets/images/logo/logo_dark.svg";

//Components
import FeedSkeleton                     from '../../components/widgets/feed-skeleton/FeedSkeleton';
import { ModalBase }                    from '../../components/widgets/modals-base';
import { NewsWidget }                   from '../../components/widgets/feeds/news-card-widget';
import ContainerFluid                   from '../../components/widgets/fluid';
import { CustomNavItem }                from '../../components/widgets/file-manager/left-sidebar/CustomNavItem';
import CustomTableBodyEmpty             from '../../components/widgets/custom-table/CustomTableBodyEmpty';
import { BerandaFileProvider }          from '../../components/utility/context/pages/beranda';
import { AddBeritaFormComponent }       from '../../components/widgets/feeds/news-feed-add-card/form_component';


const EventPerformance = (props) => {
    // helper
    const { dateIndo1} = Helpers;

    //State
    const [modalUrl,setModalUrl]            = useState(false);
    const [showmodal,showModaldata]         = useState(false);
    const [modalUnmount, setModalUnmount]   = useState(false);

    const toggle =  {
        urlModal  : () => {setModalUrl(!modalUrl)},
        formModal : () => {showModaldata(!showmodal)}
    };

    const onURLAtModalCommonClicked = () => {toggle.urlModal()};
    const onSave = () => {props.agentReportFilterAPI()}

    return (
        <Fragment>
            <Row>
                <Col
                    md = "3" 
                    sm = "12"
                >
                    <Card style={{ height: '82vh', padding: '25px' }}>
                        <CardBody>
                            <a 
                                href        = "/" 
                                style       = {{ textAlign: 'center' }}
                                className   = "d-flex"
                            >
                                <img 
                                    src     = {LogoSiacc}
                                    alt     = {'siacc'} 
                                    style   = {{ width: '50px', height: '50px' }}
                                />
                                <p 
                                    style       = {{ fontSize: '20px', fontWeight: 'bold', marginTop: '13px' }}
                                    className   = "ml-2" 
                                >
                                    Siacc
                                </p>
                            </a>
                            <p style={{ marginTop: '25px', fontWeight: 'Bold' }}>
                                Daftar Event
                            </p>
                            <Nav pills vertical>
                                <CustomNavItem>
                                    {
                                        props.isEvent &&
                                        props.isEvent.map((data) => (
                                            <NavLink
                                                style       = {{ width: "100%", padding: '0px' }}
                                                onClick     = {() => props.handleEvent(data)}
                                                className   = "d-flex justify-content-start"
                                            >
                                                <p>
                                                    {data.title}
                                                </p>
                                            </NavLink>
                                        ))
                                    }
                                </CustomNavItem>
                            </Nav>
                        </CardBody>
                    </Card>
                </Col>
                <Col
                    md = "9" 
                    sm = "12"
                >
                    <div className="d-flex mb-4">
                        <div style={{ background: '#fff', padding: '10px', textAlign: 'center', borderRadius: '0.428rem', width: '200px', boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)' }}>
                            <img 
                                src     = {props.roomEvent.badge != null ? props.roomEvent.badge : LogoEvent}
                                alt     = {'Event'} 
                                style   = {{ width: '120px', height: '120px', borderRadius: '10px', marginBottom: '10px' }}
                            />
                            <p style={{ color: '#83808f', margin: '0px' }}>
                                {props.roomEvent.note}
                            </p>
                        </div>
                        <div className="ml-2">
                            <p style={{ fontWeight: 'bold' }}>Event</p>
                            <p>{props.roomEvent.note}</p>
                            <p className="m-0">Badge event untuk berita pada priode</p>
                            <p>
                                {
                                    props.roomEvent.start_date && props.roomEvent.end_date ?
                                        <Fragment>
                                            {dateIndo1(props.roomEvent.start_date)} - {dateIndo1(props.roomEvent.end_date)}
                                        </Fragment>
                                    : null
                                }
                            </p>
                            
                            <ModalBase
                                show    = {showmodal} 
                                title   = {"Buat Postingan Berita"}
                                setShow = {toggle.formModal}
                                unmount = {modalUnmount}
                            >
                                <BerandaFileProvider>
                                    <ContainerFluid>
                                        <AddBeritaFormComponent
                                            onUrl           = {() => {onURLAtModalCommonClicked()}}  
                                            onSave          = {() => {onSave()}} 
                                            closeModal      = {toggle.formModal} 
                                            setModalUnmount = {setModalUnmount}
                                        />
                                    </ContainerFluid>
                                </BerandaFileProvider>
                            </ModalBase>

                            <div 
                                style       = {{ cursor: 'pointer' }}
                                onClick     = {() => {showModaldata(true)}}
                                className   = "form-control"
                            >
                                Berpartisipasi dengan tambahkan berita
                            </div>
                        </div>
                    </div>

                    <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Daftar berita agen telah berpartisipasi dalam event
                    </p>

                    <Row>
                        {
                            props.loadingAllState ?
                                <Fragment>
                                    <Col md="6">
                                        <FeedSkeleton count={1}/>
                                    </Col>
                                    <Col md="6">
                                        <FeedSkeleton count={1}/>
                                    </Col>
                                </Fragment>
                            :
                                props.agentReportLeft.length < 1 && 
                                props.agentReportRight.length < 1 ?
                                    <Col md='12' sm='12'>
                                        <CustomTableBodyEmpty/>
                                    </Col>
                                :
                                    <Fragment>
                                        <Col
                                            md = "6" 
                                            sm = "12"
                                        >
                                            {
                                                props.agentReportLeft &&
                                                props.agentReportLeft.map((data) => (
                                                    <NewsWidget
                                                        id              = {data.id}
                                                        data            = {data}
                                                        handleStore     = {props.handleStore}

                                                        //Role
                                                        roleLike        = {true}
                                                        roleDislike     = {true}
                                                        roleComment     = {true}
                                                        roleViewer      = {true}   
                                                        {...data}
                                                    />
                                                ))
                                            }
                                        </Col>
                                        <Col
                                            md = "6" 
                                            sm = "12"
                                        >
                                            {
                                                props.agentReportRight &&
                                                props.agentReportRight.map((data) => (
                                                    <NewsWidget
                                                        id              = {data.id}
                                                        data            = {data}
                                                        handleStore     = {props.handleStore}
                                                        
                                                        //Role
                                                        roleLike        = {true}
                                                        roleDislike     = {true}
                                                        roleComment     = {true}
                                                        roleViewer      = {true}   
                                                        {...data}
                                                    />
                                                ))
                                            }
                                        </Col>
                                    </Fragment>
                        }
                    </Row>
                </Col>
            </Row>
        </Fragment>
    );
};

export default EventPerformance;