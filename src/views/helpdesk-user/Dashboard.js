import React, { useMemo, Fragment, useState, useEffect } from 'react';
import { Button, Col, Row }                              from 'reactstrap';
import { useHistory, useLocation }                       from 'react-router-dom';

//Css
import './style.scss';
import '@styles/base/pages/page-auth.scss';

//Icon & Image
import Logo                                              from '@src/assets/images/logo/logo_light.png';
import News                                              from '@src/assets/icons/news.svg';
import Likes                                             from '@src/assets/icons/like.svg';
import Chart                                             from '@src/assets/icons/chart.svg';
import Guide                                             from '@src/assets/icons/guide.svg';
import Rating                                            from '@src/assets/icons/ratings.svg';
import Support                                           from '@src/assets/icons/help.svg';
import NewsPost                                          from '@src/assets/icons/post.svg';
import Comments                                          from '@src/assets/icons/comments.svg';
import Complaint                                         from '@src/assets/icons/complaint.svg';

//Components
import ComplaintPoppup                                   from '../helpdesk/complaintpopup';
import { RequestHelpdeskApi }                            from '../../services/pages/helpdesk/request';

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
};


const DashboardHelpdesk = () => {
    //State
    const [showChat, setShowChat] = useState(false);

    let param   = useQuery();
    let history = useHistory();
    let token   = param.get("token");

    const checkCookies = () => {
        if (token) {
            RequestHelpdeskApi.send({
                token: token
            }).then(res => {
                document.cookie = "__app_data_helpdesk=" + token;
                document.cookie = "__app_data_helpdesk_uuid=" + res.data.uuid;
            },
                err => {
                    console.log(err)
                })
        } else {
            // alert("tidak ada")
        }
    };

    useEffect(() => {
        checkCookies();
    }, []);

    return (
        <Fragment>
            {/*  popup chat */}
            <ComplaintPoppup
                show    = {showChat}
                token   = {token}
                setShow = {() => setShowChat(!showChat)}
            />

            <div 
                style     = {{ background: '#00743B' }}
                className = 'auth-wrapper auth-v2' 
            >
                <Row className = 'auth-inner m-0'>
                    <div style = {{ position: 'absolute', background: '#76D3A7', padding: '20px', borderRadius: '0 0 7px 0' }}>
                        <img 
                            src       = {Logo} 
                            alt       = 'Login V2'
                            style     = {{ height: '40px' }}
                            className = 'img-fluid' 
                        />
                    </div>
                    <Col 
                        lg        = '6' 
                        sm        = '12'
                        className = 'd-none d-lg-flex align-items-center p-5' 
                    >
                        <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                            <img 
                                alt       = 'Login V2'
                                src       = {News} 
                                className = 'img-fluid img-news-dashboard-left'
                            />
                            <img 
                                alt       = 'Login V2'
                                src       = {Likes} 
                                className = 'img-fluid img-likes-dashboard-left'
                            />
                            <img 
                                alt       = 'Login V2'
                                src       = {NewsPost} 
                                className = 'img-fluid img-post-dashboard-left'
                            />
                            <img 
                                src       = {Rating} 
                                alt       = 'Login V2'
                                className = 'img-fluid img-rating-dashboard-left'
                            />
                            <img 
                                src       = {Chart} 
                                alt       = 'Login V2'
                                className = 'img-fluid img-chart-dashboard-left'
                            />
                        </div>
                    </Col>
                    <Col 
                        lg        = '6' 
                        sm        = '12'
                        className = 'd-flex align-items-center text-center auth-bg px-2 p-lg-5' 
                    >
                        <Col 
                            sm        = '8' 
                            md        = '6' 
                            lg        = '12'
                            className = 'mx-auto'
                        >
                            <div style={{ color: '#000', padding: '21px' }}>
                                <img
                                    src   = {Support}
                                    style = {{ width: '120px', height: '120px' }}
                                />
                                <p style  = {{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '4px' }}>
                                    BANTUAN
                                </p>
                            </div>
                                
                            <Button
                                color     = ''
                                onClick   = {() => setShowChat(!showChat)}
                                className = "button-bg cursor-pointer"
                            >
                                <img
                                    src       = {Comments}
                                    className = "img-dashboard-right"
                                />
                                <p className='button-text'>OBROLAN</p>
                            </Button>
                            <Button 
                                color     = ''
                                className = "button-bg"
                            >
                                <img
                                    src   = {Guide}
                                    className = "img-dashboard-right"
                                    onClick = {() => { history.push(`/helpdesk/users?active=panduan`) }}
                                />
                                <p className='button-text'>PANDUAN</p>
                            </Button>
                            <Button 
                                color     = ''
                                className = "button-bg cursor-pointer"
                            >
                                <img
                                    src   = {Complaint}
                                    className = "img-dashboard-right"
                                    onClick = {() => { history.push(`/helpdesk/users?active=pengaduan`) }}
                                />
                                <p className='button-text'>PENGADUAN</p>
                            </Button>
                        </Col>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};

export default DashboardHelpdesk;