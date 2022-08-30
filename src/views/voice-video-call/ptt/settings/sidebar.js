import React, { Fragment }  from 'react';

import {
    Row,
    Col
}                           from 'reactstrap';

import { 
    Users, 
    Trash, 
    LogOut, 
    AlertCircle, 
    Settings
} from 'react-feather';


const SidebarLeftSettings = (props) => {

    const {
        data,
        pttActive,
        setPttActive, 
    }                     = props;

    return (
        <Fragment>
            {
                data != null ? 
                    <div className='sidebar-left mt-0'>
                        <div className='sidebar'>
                            <div className='sidebar-content'>
                                <Row className="d-flex align-items-center px-2">
                                    <Col md={9}>
                                        <h3>
                                            {data.name}
                                        </h3>
                                    </Col>
                                    <Col md={3} className="text-right">
                                        <Settings 
                                            size    = {20}
                                            onClick = {() => setPttActive(!pttActive)}
                                        />
                                    </Col>
                                </Row>

                                <div className='chat-user-list-wrapper list-group mt-2'>
                                    <ul className='chat-users-list chat-list media-list'>
                                        <li className='chat'>
                                            <AlertCircle/>
                                            <div style={{ margin: '2px 0px 0px 13px' }}>
                                                Informasi Umum
                                            </div>
                                        </li>
                                        <li className='chat'>
                                            <Users/>
                                            <div style={{ margin: '2px 0px 0px 13px' }}>
                                                Manajemen Anggota
                                            </div>
                                        </li>
                                        <li className='chat'>
                                            <LogOut/>
                                            <div style={{ margin: '2px 0px 0px 13px' }}>
                                                Keluar Dari Room
                                            </div>
                                        </li>
                                        <li className='chat'>
                                            <Trash/>
                                            <div style={{ margin: '2px 0px 0px 13px' }}>
                                                Hapus Room
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                :
                    null
            }
        </Fragment>
    );
};

export default SidebarLeftSettings; 