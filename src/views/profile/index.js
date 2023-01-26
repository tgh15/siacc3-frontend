import { Fragment, useState, useContext }   from "react";
import { 
    Col, 
    Row, 
    Card,
    Alert,
    Button,
    CardBody,
    CardText,
    Progress,
} from 'reactstrap';

//Image
import CheckboxIcon             from '@src/assets/images/logo/checkbox.svg';
import DefaultAvatar            from '@src/assets/images/logo/user.png';
import Logo                     from '@src/assets/images/logo/logo_light.png';

import CardProfile              from './Profile';
import ChangeBadge              from "./change_badge";
import HistoryPoint             from "./history_point";
import ChangeInformation        from "./change_information";
import { NewsFeedAddWidget }    from '../../components/widgets/feeds/news-feed-add-card';


//Components
import Avatar                   from "../../components/widgets/avatar";
import FeedSkeleton             from "../../components/widgets/feed-skeleton/FeedSkeleton";
import { ModalBase }            from "../../components/widgets/modals-base";
import { NewsWidget }           from "../../components/widgets/feeds/news-card-widget";
import CustomTableBodyEmpty     from "../../components/widgets/custom-table/CustomTableBodyEmpty";
import ModalForm                from "../configuration/user-management/ModalForm";
import { UserManagementContext } from "../../context/UserManagementContext";

import Helper                   from "../../helpers";
import { BerandaFileProvider } from "../../components/utility/context/pages/beranda";

const Profile = (props) => {

    //Context
    const { 
        setListData, 
    }                                                   = useContext(UserManagementContext);

    const {
        fallbackImage_,
        getRoleByMenuStatus
    }                                                   = Helper;


    const [modalForm, setModalForm]                     = useState(false);
    const [showUpdateForm, setShowUpdateForm]           = useState(false);
    const [BadgeAchievement, setBadgeAchievement]       = useState(false);
    const [historyPointVisible, setHistoryPointVisible] = useState(false);
    
    //list badge
    const showBadgeKind = (kind, is_event) => {
        setModalForm(true);
        props.agentProfileByKind(kind, is_event);
    };

    //chang badge
    const showModalAchievement = () => {
        setBadgeAchievement(true);
    };

    //history point
    const showHistoryPoint = () => {
        setHistoryPointVisible(true);
    };

    return (
        <Fragment>
            <Row className="px-5">
                <Col 
                    md        = '3'
                    className = 'mb-md-0'
                >
                    <Card className='mb-4'>
                        <CardBody className={'text-center'}>
                            <a href="/beranda">
                                <img 
                                    src     = {Logo}
                                    alt     = {'Profile Pic'} 
                                    style   = {{width: '40%'}}
                                    onError = {fallbackImage_}
                                    className = "mb-2 mt-1"
                                />
                            </a>
                            
                            <CardText>
                                <div style={{marginBottom: '30px'}}>
                                    <h4 style={{'marginTop':'10px'}}>
                                        {props.employeeDetail.name}
                                    </h4>   
                                    <h6 style={{'marginTop':'10px'}}>
                                        {props.employeeDetail.workunit} - {props.employeeDetail.sector}
                                    </h6> 
                                </div>

                                <Button 
                                    color   = 'primary'
                                    onClick = {() => setShowUpdateForm(true)} 
                                >
                                    Ubah Informasi
                                </Button>  

                                <ModalBase
                                    show            = {showUpdateForm} 
                                    title           = "Filter Data"
                                    size            = "lg"
                                    setShow         = {(par) => { setShowUpdateForm(par)}} 
                                    unmount         = {true}
                                >
                                    <ModalForm
                                        getData         = {() => {props.getDetailIdentification(); props.getDetailEmployee()}}
                                        data            = {props.employeeDetailUpdate}
                                        setListData     = {(params) => setListData(params)}
                                        setModalForm    = {(par) => { setShowUpdateForm(par) }} 
                                    />
                                </ModalBase>

                                {/* identification */}
                                <div style={{marginTop: '32px'}}>
                                    <CardProfile 
                                        employeeDetail = {props.employeeDetail}
                                    />
                                </div>

                                {/* level agent */}
                                <div 
                                    style       = {{marginTop: '30px'}}
                                    className   = "text-left" 
                                >
                                    <h5>Total Progress Saat Ini</h5>
                                    <h5>Level {props.badgeProfile.level}</h5>
                                    <h5>
                                        Tingkat EXP saat ini &nbsp;
                                        {props.badgeProfile.level_current_xp} / {props.badgeProfile.level_next_xp} 
                                    </h5>
                                </div>

                                {/* progress */}
                                <div className="mt-1">
                                    <Progress value={props.badgeProfile.level_progress}/>
                                    <h5 style={{marginTop: '5px'}}>
                                        {props.badgeProfile.level_progress}% Complete
                                    </h5>
                                </div>

                                {/* history point */}
                                <div className="mt-2">
                                    <HistoryPoint
                                        totalPoint              = {props.totalPoint}
                                        historyPoint            = {props.historyPoint}
                                        badgeProfile            = {props.badgeProfile}
                                        historyPointVisible     = {historyPointVisible}
                                        setHistoryPointVisible  = {setHistoryPointVisible}

                                        //function
                                        getHistoryPoint         = {props.getHistoryPoint}
                                        showHistoryPoint        = {showHistoryPoint}
                                    />
                                </div>

                                {/* badge agent */}
                                <div className="mt-2">
                                    <small>*Berdasarkan lencana yang diperoleh</small>
                                    <Row className="mt-2">

                                        {
                                            props.badgeProfile.achievement != null ?
                                            props.badgeProfile.achievement.map((data) => (
                                                <Col 
                                                    md      = '4' 
                                                    sm      = '12'
                                                    onClick = {() => {showBadgeKind(data.kind, data.is_event)}}
                                                >
                                                    <div 
                                                        style       = {{cursor: 'pointer'}}
                                                        className   = "mb-3" 
                                                    >
                                                        <div className="bg-img-badges">
                                                            {
                                                                data.is_active === true ?
                                                                    <Fragment>
                                                                        <img 
                                                                            src         = {data.badge != "" ? data.badge : null}
                                                                            alt         = {'Profile Pic'} 
                                                                            style       = {{width: '65px', height: '65px', borderRadius: '50%'}} 
                                                                            onError     = {fallbackImage_}
                                                                            className   = "img-fluid"
                                                                        />
                                                                        <img
                                                                            src         = {CheckboxIcon}
                                                                            alt         = "CheckboxIcon"
                                                                            style       = {{position: 'absolute', marginTop: '35px', marginLeft: '-20px', width: '15px'}}
                                                                            onError     = {fallbackImage_}
                                                                            className   = "img-fluid"
                                                                        />
                                                                    </Fragment>
                                                                : 
                                                                    <img 
                                                                        src         = {data.badge != "" ? data.badge : null}
                                                                        alt         = {'Profile Pic'} 
                                                                        style       = {{width: '65px', height: '65px', borderRadius: '50%'}} 
                                                                        onError     = {fallbackImage_}
                                                                        className   = "img-fluid"
                                                                    />
                                                            }
                                                        </div>
                                                        <small>
                                                            {data.title}
                                                        </small>
                                                    </div>
                                                </Col>
                                            )) :
                                            <Alert color='primary'>
                                                <div className='alert-body'>
                                                    <span className='font-weight-bold'>
                                                        Lencana yang diperoleh kosong.
                                                    </span>
                                                </div>
                                            </Alert>
                                        }
                                    </Row>
                                </div>

                                <ModalBase
                                    show    = {modalForm}
                                    title   = {props.badgeProfileKind.kind}
                                    setShow = {() => {setModalForm()}}
                                >
                                    <p className="text-center mb-2">
                                        Masih membutuhkan {props.badgeProfileKind.difference} untuk Unlock berikutnya!
                                    </p>
                                    
                                    {/* change badge */}
                                    <div className="d-flex justify-content-center mb-3">
                                        <ChangeBadge
                                            achievement               = {props.badgeProfile.achievement}
                                            selectedBadge             = {props.selectedBadge}
                                            setSelectedBadge          = {props.setSelectedBadge}
                                            achievementAgent          = {props.achievementAgent}
                                            BadgeAchievement          = {BadgeAchievement}
                                            setBadgeAchievement       = {setBadgeAchievement}
                                            showModalAchievement      = {showModalAchievement}
                                            changeProfileAchievement  = {props.changeProfileAchievement}
                                        />
                                    </div>
                                    
                                    {/* list badge kind */}
                                    <Row>
                                        {
                                            props.badgeProfileKind.achievement != null ?
                                            props.badgeProfileKind.achievement.map((data) => (
                                                <Col
                                                    md        = '4' 
                                                    sm        = '12'
                                                    className = "mb-2"
                                                >
                                                    <div className="bg-img-badges">
                                                        {
                                                            data.status === 1 ?
                                                                <Fragment>
                                                                    <img 
                                                                        src         = {data.badge != "" ? data.badge : null}
                                                                        alt         = {'Profile Pic'} 
                                                                        style       = {{borderRadius: '100px', objectFit: 'contain'}} 
                                                                        onError     = {fallbackImage_}
                                                                        className   = "img-fluid"
                                                                    />
                                                                    <img
                                                                        src         = {CheckboxIcon}
                                                                        alt         = "CheckboxIcon"
                                                                        style       = {{position: 'absolute', marginTop: '35px', marginLeft: '-20px', width: '15px'}}
                                                                        onError     = {fallbackImage_}
                                                                        className   = "img-fluid"
                                                                    />
                                                                </Fragment> 
                                                            :
                                                                <img 
                                                                    src         = {data.badge != "" ? data.badge : null}
                                                                    alt         = {'Profile Pic'} 
                                                                    style       = {{borderRadius: '10px', objectFit: 'contain', opacity: '0.4'}} 
                                                                    onError     = {fallbackImage_}
                                                                    className   = "img-fluid"
                                                                />
                                                        }
                                                    </div>
                                                    <small>
                                                        {data.title}
                                                    </small>
                                                </Col>
                                            )) : null
                                        }
                                    </Row>
                                </ModalBase>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col 
                    md = '9' 
                    sm = '12'
                >
                    {/* {
                        localStorage.getItem('role') === 'pimpinan pusat' ? */}
                        {/* <Row>
                            <Col 
                                md = '12' 
                                sm = '12'
                            >
                                {
                                    props.reportAgentPositionShared &&
                                    props.reportAgentPositionShared.map((data) => (
                                        <NewsWidget
                                            id          = {data.id}
                                            data        = {data}
                                            handleStore = {props.handleStore}
                                            {...data}
                                        />
                                    )) 
                                }

                                {
                                    !props.reportAgentPositionShared && 
                                    props.reportAgentPositionShared !== null &&
                                    <FeedSkeleton/>
                                }
                                
                                {
                                    props.reportAgentPositionShared && 
                                    props.reportAgentPositionShared.length === 0 &&
                                    <CustomTableBodyEmpty/>
                                }
                            </Col>
                        </Row> */}
                        {/* : */}
                        <Fragment>
                            {/* write news */}
                            <NewsFeedAddWidget
                                onSave = {() => props.getReportAgentProfile()}
                            />
                            
                            {/* comment news */}
                            <Row>
                                <Col 
                                    md = '12' 
                                    sm = '12'
                                >
                                    {
                                        props.reportAgent &&
                                        props.reportAgent.map((data) => (
                                            <NewsWidget
                                                id              = {data.id}
                                                data            = {data}
                                                handleStore     = {props.handleStore}

                                                roleLike        = {getRoleByMenuStatus('Beranda', 'like')}
                                                roleViewer      = {getRoleByMenuStatus('Beranda', 'viewer')}   
                                                roleDislike     = {getRoleByMenuStatus('Beranda', 'dislike')}
                                                roleComment     = {getRoleByMenuStatus('Beranda', 'comment')}
                                                {...data}
                                            />
                                        )) 
                                    }

                                    {
                                        !props.reportAgent && 
                                        props.reportAgent !== null &&
                                        <FeedSkeleton/>
                                    }
                                    
                                    {
                                        props.reportAgent && 
                                        props.reportAgent.length === 0 &&
                                        <CustomTableBodyEmpty/>
                                    }
                                </Col>
                            </Row>
                        </Fragment>
                    {/* } */}
                </Col>
            </Row>
        </Fragment>
    );
};

export default Profile;