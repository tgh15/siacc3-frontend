import React, { 
    Fragment, 
    useState, 
    useEffect, 
    useContext 
}                                               from 'react';
import PerfectScrollbar                         from 'react-perfect-scrollbar';
import { 
    Card, 
    Media,
    Button,
    CardBody, 
    DropdownItem,
    DropdownMenu, 
    DropdownToggle, 
    ButtonDropdown,
}                                               from 'reactstrap';

import { 
    Trash, 
    ArrowRight, 
    MoreVertical,
    X, 
}                                               from 'react-feather';

import { AntmediaContext }                      from '../../../context/AntmediaContext';

import GeneralInformation                       from './settings/generalInformation';
import MemberManagement                         from './settings/memberManagement';
import { active } from 'sortablejs';
import Helper from '../../../helpers';

const ContentGroup = (props) => {

    //Props
    const {
        selected,
        getServer,
        setPttActive,
        activeChannel,
        pttActiveContent,
        setPttActiveContent
    }                                     = props;

    const {
        webRTCAdaptorPeer
    }                                     = useContext(AntmediaContext);

    const handleLeaveRoom =() => {
        webRTCAdaptorPeer.leaveFromRoom(activeChannel.roomId);
        location.reload();
    }

    //State
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    };
    
    return (
        <Fragment>
            <div className='chat-app-window'>
                <div className='active-chat'>
                    {/* header */}
                    <div className='chat-navbar'>
                        <header className='chat-header'>
                            {
                                activeChannel != null && pttActiveContent == 'ptt' ?
                                    <Fragment>
                                        <div className='d-flex align-items-center'>
                                            <h5 className='font-weight-bolder mb-0'>
                                                {activeChannel.roomName}
                                            </h5>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            
                                            <ButtonDropdown 
                                                isOpen = {dropdownOpen} 
                                                toggle = {toggleDropdown}
                                            >
                                                <DropdownToggle 
                                                    color     = '' 
                                                    className = 'p-0'
                                                >
                                                    <MoreVertical size={20}/>
                                                </DropdownToggle>
                                                <DropdownMenu className='mr-3'>
                                                    <DropdownItem 
                                                        href = '/' 
                                                        tag  = 'a'
                                                    >
                                                        <Trash 
                                                            size  = {20}
                                                            style = {{ marginRight: '9px' }}
                                                        />
                                                        Hapus Channel
                                                    </DropdownItem>
                                                    {
                                                        pttActiveContent == 'ptt' &&
                                                        <DropdownItem 
                                                            onClick     = {() => {handleLeaveRoom()}}
                                                        >
                                                            <X
                                                                size  = {20}
                                                                style = {{ marginRight: '9px' }}
                                                            />
                                                            Tutup Channel
                                                        </DropdownItem>
                                                    }
                                                </DropdownMenu>
                                            </ButtonDropdown>
                                            
                                        </div>

                                    </Fragment>
                                :
                                    null
                            }
                            {
                                pttActiveContent != 'ptt' ?
                                    <Fragment>
                                        <div className='d-flex align-items-center'>
                                            <h5 className='font-weight-bolder mb-0'>
                                                {
                                                    pttActiveContent == "information" ?
                                                        'Informasi Umum'
                                                    :
                                                        'Manajemen Anggota'
                                                }
                                            </h5>
                                        </div>
                                        <div 
                                            onClick     = {() => {setPttActiveContent('ptt'); setPttActive(true)}}
                                            className   = 'd-flex align-items-center cursor-pointer'
                                        >
                                            <X/>
                                        </div>
                                    </Fragment>
                                :
                                    null
                            }
                        </header>
                    </div>
                    
                    <div 
                        style     = {pttActiveContent == 'ptt' || pttActiveContent == 'member' ? { height: '100%' } : {height: '100%', marginTop: '10vh'}}
                        className = {pttActiveContent == 'ptt' ? 'user-chats p-0' : pttActiveContent == 'member' ? 'p-2' : 'd-flex justify-content-center' }
                    >
                        <>
                            {/* video tag */}
                            <div style={{overflow: 'auto', height : '10vh', display: 'none'}}>
                                {
                                    activeChannel != null  && activeChannel.roomStreamList != null ?
                                        activeChannel.roomStreamList.filter((data) => (data != localStorage.getItem('uuid'))).map((data) => (
                                            <audio 
                                                id              = {`ptt_name_${activeChannel.roomName}_id_`+data}
                                                height          = {5}
                                                autoPlay 
                                                controls 
                                                className       = 'img-fluid img-video'
                                                onLoadedData    = {() => {console.log('ready')}}
                                            />
                                        ))
                                    :
                                        null
                                }
                            </div>

                            {
                                pttActiveContent == 'ptt' &&
                                    <div 
                                        style={{ padding: '1.5rem', height: '85%'}}
                                    >
                                        <PerfectScrollbar>
                                            <div style={{ height: '575px' }}>
                                                {
                                                    selected != null && selected.activities != null && selected.activities.length > 0 &&
                                                    selected.activities.map((data) => (
                                                        <Card className='mb-1 p-0'>
                                                            <CardBody style={{ padding: '12px' }}>
                                                                <div className='d-flex justify-content-between flex-wrap'>
                                                                    <Media className='align-items-center'>
                                                                        <ArrowRight style={{ color: '#196339', marginRight: '12px' }}/>
                                                                        <Media body>
                                                                            <h6 style={{ marginBottom: '5px' }}>
                                                                                {data.action}
                                                                            </h6>
                                                                            <span 
                                                                                style     = {{ fontSize: '12px' }}
                                                                                className = 'text-muted' 
                                                                            >
                                                                                {Helper.dateIndo1(data.created_at)}
                                                                            </span>
                                                                        </Media>
                                                                    </Media>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    ))
                                                }
                                            </div>
                                        </PerfectScrollbar>
                                        
                                        {
                                            activeChannel != null && webRTCAdaptorPeer != null ?
                                                <Button
                                                    color = "primary"
                                                    block
                                                    style = {{bottom: '0'}}
                                                    onMouseDown  = {() => {webRTCAdaptorPeer.unmuteLocalMic(); console.log('pencet')}}
                                                    onMouseUp    = {() => {webRTCAdaptorPeer.muteLocalMic(); console.log('baru')}}
                                                >
                                                    Push To Talk
                                                </Button>
                                            : 
                                                null
                                        }
                                        
                                    </div>
                            }

                            {
                                pttActiveContent == 'information' &&
                                    <GeneralInformation 
                                        selected = {selected}
                                        getServer= {getServer}
                                    />
                            }

                            {
                                pttActiveContent == 'member' &&
                                    <MemberManagement 
                                        selected = {selected}
                                        getServer= {getServer}
                                    />
                            }
                        </>

                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ContentGroup;