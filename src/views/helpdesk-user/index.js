import React, { 
    useState, 
    Fragment, 
    useEffect, 
} from 'react';

import {
    Nav,
    Row,
    Col,
    Card,
    TabPane,
    NavItem,
    NavLink,
    CardBody,
    TabContent,
} from 'reactstrap';

//Image
import Logo             from '@src/assets/images/logo/logo_light.png';

//Helper
import Helper           from '../../helpers';

//Components
import UserGuide        from './guide/UserGuide';
import IndexComplaint   from './complaint/IndexComplaint';
import ComplaintPoppup  from '../helpdesk/complaintpopup';


const IndexHelpdesk = () => {
    // State
    const [active, setActive]       = useState('2');
    const [showChat, setShowChat]   = useState(false);
    
    // Helper
    let { getCookieName, useQuery } = Helper;
    
    const toggle                    = tab => { setActive(tab) };
    let params                      = useQuery();

    useEffect(() => {
        if (params.get('active') === 'pengguna') {
            setActive('2')
        }else if(params.get('active') === 'pengaduan') {
            setActive('3')
        }
    }, []);

    return (
        <Fragment>
            <div style={{ padding: '3rem 2rem 0' }}>
                <Row>
                    <Col md='2' sm='12'></Col>
                    <Col 
                        md = '8' 
                        sm = '12'
                    >
                        <Row>
                            <Col 
                                md = "3" 
                                sm = "12"
                            >
                                <a href="/helpdesk-users">
                                    <img 
                                        src   = {Logo} 
                                        atl   = "Logo Siacc" 
                                        style = {{ height: '55px', width: '180px' }}
                                    />
                                </a>
                            </Col>
                            <Col 
                                md = "9" 
                                sm = "12"
                            >
                                <Card>
                                    <CardBody style={{ padding: '8px' }}>
                                        <Nav 
                                            fill 
                                            pills 
                                            className="m-0"
                                        >
                                            <NavItem>
                                                <NavLink
                                                    active  = {active === '1'}
                                                    onClick = {() => { setShowChat(true) }}
                                                >
                                                    OBROLAN
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    active  = {active === '2'}
                                                    onClick = {() => { toggle('2') }}
                                                >
                                                    PANDUAN PENGGUNA
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    active  = {active === '3'}
                                                    onClick = {() => { toggle('3') }}
                                                >
                                                    PENGADUAN
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <TabContent 
                            className = 'py-50' 
                            activeTab = {active}
                        >
                            <ComplaintPoppup
                                show    = {showChat}
                                token   = {getCookieName("__app_data_helpdesk")}
                                setShow = {() => setShowChat(!showChat)}
                            />
                            
                            <TabPane tabId='2'>
                                <UserGuide/>
                            </TabPane>
                            <TabPane tabId='3'>
                                <IndexComplaint/>
                            </TabPane>
                        </TabContent>
                    </Col>
                    <Col md='2' sm='12'></Col>
                </Row>
            </div>
        </Fragment>
    );
};

export default IndexHelpdesk