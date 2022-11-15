import React, {Fragment, useContext, useEffect, useState} from 'react';
import { Get, Post } from "../../services/core/request"

import {
    Nav,
    NavItem,
    TabPane,
    NavLink,
    TabContent,
} from 'reactstrap';



//Component
import CreateRoom           from './ptt/createRoom';
import CreateChannel        from './ptt/createChannel';
import SelectSingleUser     from '../../components/widgets/select-single-user';

//Utils
import CommunicationPTT     from '../../services/pages/chat/PushToTalk';
import VoiceSidebar from './voice/sidebar';
import PTTSidebar from './ptt/sidebar';
import { active } from 'sortablejs';

const SidebarLeft = (props) => {

    const {
        activeTab,
        setUserCall,
        setActiveTab,
        
        //ptt
        server,
        selected,
        startPTT,
        setServer,
        getServer,
        pttActive,
        setSelected,
        setPttActive,
        activeChannel,       
        setActiveChannel,
        setPttActiveContent,
        setSelectedChannelID,
        setIsConfirmPasswordVisible,
        handleSelfJoinChannel
    } = props;
    
    const [listCall, setListCall]                           = useState([]);
    const [isCollapse, setIsCollapse]                       = useState(false);
    const [modalVisible, setModalVisible]                   = useState(false);
    const [createRoomVisible, setCreateRoomVisible]         = useState(false);
    const [createChannelVisible, setCreateChannelVisible]   = useState(false);

    const urls = "communication/rtc/video-call/private/get-call"

    const getData = (urls) => {
        Get(urls)
            .then(data => {
                if (data.data !== null) {
                    setListCall(data.data)
                }
            })
            .catch(err => {
                console.log("==== error ====")
                console.log(err)
            })
    }

    const handleSelectedUser = (uuid) => {

        const formData = {
            UUIDReceiver : uuid
        };

        Post("communication/rtc/video-call/private", formData)
        .then(
            res => {
                if(res.status === 200){
                    getData(urls);
                    setModalVisible(false);
                }
            }
        ).catch(
            err => {
                console.log(err, "handleSelectedUser");
            }
        )
    }

    const setDataPrivate=(data)=>{
        setUserCall(data)
    }

    useEffect(() => {
        getData(urls);
        getServer();
    }, [])

    return (
        <Fragment>

            {/* modal select single user */}
            <SelectSingleUser
                show        = {modalVisible}
                title       = "Tambah Komunikasi"
                setShow     = {(par) => setModalVisible(par)}
                onSelect    = {(user) => handleSelectedUser(user.uuid)} 
            />

            {/* modal create push to talk room */}
            <CreateRoom
                show        = {createRoomVisible}
                setShow     = {(par) => setCreateRoomVisible(par)}
                getServer   = {getServer}
            />

            {/* modal create push to talk channel */}
            <CreateChannel
                show        = {createChannelVisible}
                title       = "Buat Channel"
                setShow     = {(par) => setCreateChannelVisible(par)}
                selected    = {selected}
                getServer   = {getServer}
            />

            <div className='sidebar-left'>
                <div className='sidebar'>
                    <div className='sidebar-content'>
                        <Nav className='pt-2 justify-content-center' tabs>
                            <NavItem>
                                <NavLink
                                    active={activeTab === 'beranda'}
                                    onClick={() => {
                                        window.location.href = '/beranda'
                                    }}
                                >
                                    Beranda
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={activeTab === 'voice'}
                                    onClick={() => {
                                        setActiveTab('voice')
                                    }}
                                >
                                    Voice & Video Call
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={activeTab === 'ptt'}
                                    onClick={() => {
                                        setActiveTab('ptt')
                                    }}
                                >
                                    Push To Talk
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="voice">
                                <VoiceSidebar
                                    listCall        = {listCall}
                                    setDataPrivate  = {setDataPrivate}
                                    setModalVisible = {setModalVisible}
                                />
                            </TabPane>
                            <TabPane tabId="ptt">
                                <PTTSidebar
                                    server                      = {server}
                                    selected                    = {selected}
                                    startPTT                    = {startPTT}
                                    pttActive                   = {pttActive}
                                    getServer                   = {getServer}
                                    isCollapse                  = {isCollapse}
                                    setSelected                 = {setSelected}
                                    setPttActive                = {setPttActive}
                                    setIsCollapse               = {setIsCollapse}
                                    activeChannel               = {activeChannel}
                                    setActiveChannel            = {setActiveChannel}
                                    createRoomVisible           = {createRoomVisible}
                                    setPttActiveContent         = {setPttActiveContent}
                                    setCreateRoomVisible        = {setCreateRoomVisible}
                                    setCreateChannelVisible     = {setCreateChannelVisible}

                                    setSelectedChannelID        = {setSelectedChannelID}
                                    handleSelfJoinChannel       = {handleSelfJoinChannel}
                                    setIsConfirmPasswordVisible = {setIsConfirmPasswordVisible}
                                />                      
                            </TabPane>
                        </TabContent>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SidebarLeft;