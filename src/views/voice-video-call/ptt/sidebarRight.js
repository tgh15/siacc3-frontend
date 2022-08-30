import React, { Fragment }  from 'react';
import { Button, CardText } from 'reactstrap';

import classnames           from 'classnames';
import PerfectScrollbar     from 'react-perfect-scrollbar';

//Imaga and Icon
import LogoProfile          from '@src/assets/images/logo/user.png';
import { X, UserPlus }      from 'react-feather';

//Components
import Avatar               from '@components/avatar';


const SidebarRightGroup = (props) => {
    //Props
    const { 
        userSidebarRight,
        handleUserSidebarRight, 
    } = props;

    return (
        <Fragment>
            <div  className={classnames('user-profile-sidebar border-left', { show: userSidebarRight === true })}>
                <header className='user-profile-header'>
                    <span 
                        onClick   = {handleUserSidebarRight}
                        className = 'close-icon'
                    >
                        <X size={14}/>
                    </span>
                    <h5
                        style     = {{ padding: '1rem 2rem 1.5rem' }}
                        className = 'cursor-pointer font-weight-bolder'
                    >
                        Anggota
                    </h5>
                </header>
                <PerfectScrollbar className='user-profile-sidebar-area'>
                    <h6 className='section-label'>
                        <Button.Ripple
                            color     = 'primary'
                            outline 
                            className = 'btn-icon rounded-circle'
                        >
                            <UserPlus size={18}/>
                        </Button.Ripple>
                        <span className='align-middle ml-1'>Tambahkan Anggota</span>
                    </h6>
                    <div className='personal-info'>
                        <h6 className='section-label mb-1 mt-3'>Online - 1</h6>
                        <ul className='list-unstyled'>
                            <li className='d-flex mb-1'>
                                <Avatar 
                                    img       = {LogoProfile} 
                                    status    = 'online'
                                    imgWidth  = '40'
                                    imgHeight = '40' 
                                    className = 'box-shadow-1 avatar-border'
                                />
                                <div style={{ margin: '5px 0px 0px 10px' }}>
                                    <h6 className='font-weight-bolder mb-0'>
                                        Yosep Yohan
                                    </h6>
                                    <CardText 
                                        style     = {{ fontSize: '12px' }}
                                        className = 'text-muted'
                                    >
                                        Kejati Bali
                                    </CardText>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='personal-info'>
                        <h6 className='section-label mb-1 mt-3'>Offline - 1</h6>
                        <ul className='list-unstyled'>
                            <li className='d-flex mb-1'>
                                <Avatar 
                                    img       = {LogoProfile} 
                                    imgWidth  = '40'
                                    imgHeight = '40' 
                                    className = 'box-shadow-1 avatar-border'
                                />
                                <div style={{ margin: '5px 0px 0px 10px' }}>
                                    <h6 className='font-weight-bolder mb-0'>
                                        Yugi Yono
                                    </h6>
                                    <CardText
                                        style     = {{ fontSize: '12px' }} 
                                        className = 'text-muted'
                                    >
                                        Kejati Makassar
                                    </CardText>
                                </div>
                            </li>
                        </ul>
                    </div>
                </PerfectScrollbar>
            </div>
        </Fragment> 
    );
};

export default SidebarRightGroup;