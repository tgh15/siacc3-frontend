
import {
    Plus,
    Trash, 
    Users,
    LogOut,
    Settings,
    AlertCircle, 
    ChevronDown,
    ChevronRight,
}                               from 'react-feather'

import {
    Col,
    Row,
    Button,
    Collapse
}                               from 'reactstrap'

import Avatar                   from '../../../components/widgets/avatar';
import ChildChannel             from './childChannel';

//utils
import Helper                   from '../../../helpers';
import SelectMultipleUser       from '../../../components/widgets/select-multiple-user';
import { useEffect, useState }             from 'react';
import CommunicationPTT         from '../../../services/pages/chat/PushToTalk';
import CustomToast              from '../../../components/widgets/custom-toast';


const PTTSidebar = (props) => {

    const {
        server,
        selected,
        pttActive,
        getServer,
        isCollapse,
        setSelected,
        setPttActive,
        setIsCollapse,
        activeChannel,
        createVisible,
        setActiveChannel,
        setPttActiveContent,
        setCreateRoomVisible,
        setCreateChannelVisible,
        setSelectedChannelID,
        setIsConfirmPasswordVisible,
        handleSelfJoinChannel
    }                                                   = props;

    const [isAddUserVisible, setIsAddUserVisible]       = useState(false);

    const handleAddUser = (member) => {

        const formData = {
            member_id : member
        }

        CommunicationPTT.addMemberToRoom(selected.id, formData).then(
            res => {
                if(res.status === 200){
                    CustomToast('success', 'Member berhasil ditambahkan.');
                    setIsAddUserVisible(false);

                    getServer(selected.id);
                }
            },
            err => {
                console.log(err);
            }
        )
    }

    const handleOutMember = () => {
        const formData = {
            member_id : [localStorage.getItem('uuid')]
        }

        CommunicationPTT.outMemberFromRoom(selected.id, formData).then(
            res => {
                if(res.status === 200){
                    CustomToast('success', 'Berhasil keluar dari server.');

                    getServer();
                    setSelected(null);
                }
            },
            err => {
                console.log(err);
            }
        )
    }

    const handleDeleteGroup = () => {
        CommunicationPTT.deleteServer(selected.id).then(
            res => {
                if(res.status === 200){
                    CustomToast('success', 'Berhasil hapus server.');

                    getServer();
                    setSelected(null);
                }
            },
            err => {
                console.log(err);
            }
        )
    };

    return (
        <>
            <div>
                {/* handle add user to server */}
                <SelectMultipleUser
                    show        = {isAddUserVisible}
                    title       = "Buat Group"
                    setShow     = {(par) => setIsAddUserVisible(par)}
                    onSelect    = {(par) => { handleAddUser(par)}}
                    titleButton = "Selesai"
                />

                <div className='pt-1 pb-1 px-2 d-flex justify-content-between'>
                    <h5 className='font-weight-bolder'>
                        Push To Talk
                    </h5>
                    <div className='d-flex cursor-pointer'>
                        {
                            (localStorage.getItem('role') === 'Verifikator Pusat' || localStorage.getItem('role') === 'Admin') &&
                            <Plus size="20" onClick={() => {setCreateRoomVisible(true)}}/>
                        }
                    </div>
                </div>

                {/* header */}
                <div className='mx-2 py-1 d-flex' style={{overflow: 'auto', width:'17vw', borderBottom: '1px solid #ebe9f1', borderTop: '1px solid #ebe9f1'}}>
                    {
                        server != null ? 
                            server.map((data) => (
                                data.logo == "" ?
                                    <Avatar 
                                        size        = "lg" 
                                        color       = 'light-primary mr-1' 
                                        content     = {data.name} 
                                        onClick     = {() => setSelected(data)}
                                        initials 
                                        className   = "mr-1"
                                    />
                                :
                                    <Avatar 
                                        img         = {data.logo} 
                                        size        = "lg"
                                        onError     = {Helper.fallbackImage_} 
                                        onClick     = {() => setSelected(data)}
                                        className   = "mr-1"
                                    />
                            ))
                        :
                            <span className='text-center'>Server Tidak Tersedia.</span>
                    }
                </div>

                <>
                    {/* detail active server */}
                    {
                        selected != null ?
                            <div className='mx-2 py-2'>

                                <Row className="d-flex align-items-center">
                                    <Col md={9}>
                                        <h3>
                                            {selected.name}
                                        </h3>
                                    </Col>
                                    <Col md={3} className="text-right">
                                        
                                        {
                                            (localStorage.getItem('role') === 'Verifikator Pusat' || localStorage.getItem('role') === 'Admin') &&
                                            <>
                                                {
                                                    pttActive ? 
                                                        <Settings 
                                                            size    = {20}
                                                            onClick = {() => setPttActive(false)}
                                                        />
                                                    :
                                                        <LogOut
                                                            size    = {20}
                                                            onClick = {() => {setPttActive(true); setPttActiveContent('ptt')}}
                                                        />
                                                }
                                            </>

                                            
                                        }

                                        </Col>
                                </Row>

                                {
                                    pttActive ? 
                                        <>
                                            {
                                                (localStorage.getItem('role') === 'Verifikator Pusat' || localStorage.getItem('role') === 'Admin') &&
                                                <Button 
                                                    block 
                                                    color       = "primary"
                                                    className   = "mt-1" 
                                                    onClick     = {() => setIsAddUserVisible(true)}
                                                >
                                                    Tambahkan Anggota
                                                </Button> 
                                            }

                                            <div className='mt-2 d-flex justify-content-between'>
                                                <span onClick={() => setIsCollapse(!isCollapse)} className='cursor-pointer'>
                                                    {
                                                        selected.channels != null ?
                                                            !isCollapse ?
                                                                <ChevronRight className='mr-1'/>
                                                            :
                                                                <ChevronDown className='mr-1'/>
                                                        :
                                                            null
                                                    }
                                                    Channel
                                                </span>
                                                {
                                                    (selected != null && selected.admins_id.filter((data) => data === localStorage.getItem('uuid')).length > 0) &&
                                                    <Plus 
                                                        className='cursor-pointer'
                                                        onClick={() => setCreateChannelVisible(true)}
                                                    /> 
                                                }
                                            </div>
                                            <div style={{overflowY:'auto', overflowX: 'hidden', height: '45vh'}}>
                                                <Collapse 
                                                    isOpen      = {isCollapse}
                                                    className   = "mt-2"
                                                >
                                                    {
                                                        selected != null && selected.channels != null ? 
                                                            selected.channels.map((data) => (
                                                                <ChildChannel 
                                                                    data                        = {data}
                                                                    selected                    = {selected}
                                                                    activeChannel               = {activeChannel}
                                                                    setActiveChannel            = {setActiveChannel}    
                                                                    setSelectedChannelID        = {setSelectedChannelID}
                                                                    setIsConfirmPasswordVisible = {setIsConfirmPasswordVisible}
                                                                    handleSelfJoinChannel       = {handleSelfJoinChannel}
                                                                />
                                                            ))
                                                        :
                                                            null
                                                    }
                                                </Collapse>
                                            </div>

                                        </>
                                    :                    
                                        <div className='chat-user-list-wrapper list-group' style={{marginLeft: '-18px', marginTop: '10px'}}>
                                            <ul className='chat-users-list chat-list media-list'>
                                                <li className='chat' onClick={() => setPttActiveContent('information')}>
                                                    <AlertCircle/>
                                                    <div style={{ margin: '2px 0px 0px 13px' }}>
                                                        Informasi Umum
                                                    </div>
                                                </li>
                                                <li className='chat' onClick={() => setPttActiveContent('member')}>
                                                    <Users/>
                                                    <div style={{ margin: '2px 0px 0px 13px' }}>
                                                        Manajemen Anggota
                                                    </div>
                                                </li>
                                                <li className='chat' onClick={() => handleOutMember()}>
                                                    <LogOut/>
                                                    <div style={{ margin: '2px 0px 0px 13px' }}>
                                                        Keluar Dari Room
                                                    </div>
                                                </li>
                                                <li className='chat' onClick={() => handleDeleteGroup()}>
                                                    <Trash/>
                                                    <div style={{ margin: '2px 0px 0px 13px' }}>
                                                        Hapus Room
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                }
                            </div>
                        :
                            null
                    }
                </>
            </div>
        </>   
    )
}

export default PTTSidebar;