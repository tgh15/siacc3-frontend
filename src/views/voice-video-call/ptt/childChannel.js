
import { useContext, useEffect, useState } from 'react';
import {
    Plus,
    Volume2
}                   from 'react-feather';

import {
    Button,
    Col,
    Collapse,
    Row
}                   from 'reactstrap';
import { active } from 'sortablejs';

import Avatar       from '../../../components/widgets/avatar';
import CustomToast from '../../../components/widgets/custom-toast';
import { AntmediaContext } from '../../../context/AntmediaContext';

//utils
import Helper       from '../../../helpers';


const ChildChannel = (props) => {

    const {
        childData,
        selected,
        setSelected,
        PTTWebsocket,
        activeChannel,
        setActiveChannel,
        setSelectedChannelID,
        handleSelfJoinChannel,  
        setIsAddUserChannelVisible,
        setIsConfirmPasswordVisible,
    }                                           = props;

    const [member, setMember]                   = useState(null);
    const [confirmJoined, setConfirmJoined]     = useState(false);
    const [isCollapseChild, setIsCollapseChild] = useState(false);

    const {
        webRTCAdaptorPeer,
    }                                           = useContext(AntmediaContext);

    const checkIsChannelPrivate = () => {
            if(childData.is_private === true){
                setSelectedChannelID(childData.id);
                setIsConfirmPasswordVisible(true);
            }else{
                handleSelfJoinChannel(childData.id);
                setIsCollapseChild(!isCollapseChild);
            }
    };
    
    const checkMemberInclude = () => {

        let newMember = [];
        selected.member.map((val) => (
            (childData.roomStreamList != null && childData.roomStreamList.includes(val.uuid)) && newMember.push(val)
        ));

        setMember(newMember);
    };

    useEffect(() => {
        childData != undefined && checkMemberInclude();
    }, [selected]);

    return (
        
        <div className='mb-1' 
            key         ={`channel-${childData.roomName}-${childData.id}`}
        >
            <div 
                onClick     = {() => {
                    if(webRTCAdaptorPeer == null){
                        if(childData.roomStreamList != null && member.filter((data) => data.uuid === localStorage.getItem('uuid')).length > 0){
                            setConfirmJoined(false);
                            setActiveChannel(childData);
                            setIsCollapseChild(!isCollapseChild);
                        }else{
                            setConfirmJoined(true);
                            setIsCollapseChild(!isCollapseChild);
                        }
                    }else{
                        CustomToast('warning', 'Channel Aktif Sedang Berlangsung!');
                    }
                }}
                className   = 'cursor-pointer' 
            >
                <Row>
                    <Col md={1}>
                        <Volume2/>
                    </Col>
                    <Col md={9}>
                        <span className='ml-1'>
                            {childData.roomName}
                        </span>
                    </Col>
                </Row>
            </div>

            <Collapse className="ml-3" isOpen={isCollapseChild}>
                {
                    confirmJoined ? 
                        <div>
                            <span>
                                Anda Belum Bergabung Kedalam Channel
                            </span>
                            <Button
                                size    = "sm"
                                color   = "primary"
                                block
                                outline
                                onClick = {() => checkIsChannelPrivate()}
                            >
                                KETUK UNTUK BERGABUNG
                            </Button>
                        </div>
                    :
                        member != null && member.map((data_, index) => (
                            <div 
                                className   ='mb-1'
                                key         ={`channel-member-${childData.roomName}-${childData.id}`}
                            >
                                {
                                    data_.avatar == "" ?
                                        <Avatar
                                            content     = {data_.name} 
                                            initials 
                                            className   = 'avatar-border'
                                        />
                                    :
                                        <Avatar 
                                            img     = {data_.avatar} 
                                            onError = {Helper.fallbackImage_} 
                                        />
                                }
                                <span className='ml-2'>{data_.name}</span>
                                {
                                    activeChannel != null && "isSpeak" in activeChannel ?
                                        activeChannel.isSpeak[index] === true && <Volume2/>
                                    :
                                        null 
                                }
                            </div>
                        ))
                }
                {
                    (selected != null && selected.admins_id.includes(localStorage.getItem('uuid'))) &&
                    <Button
                        size    = "sm"
                        color   = "primary"
                        block
                        outline
                        className = "mt-1"
                        onClick = {() => setIsAddUserChannelVisible(true)}
                    >
                        TAMBAH ANGGOTA
                    </Button>
                }
            </Collapse>
        </div>
    )
};

export default ChildChannel;