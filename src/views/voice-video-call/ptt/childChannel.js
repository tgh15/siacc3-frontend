
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

import Avatar       from '../../../components/widgets/avatar';
import CustomToast from '../../../components/widgets/custom-toast';
import { AntmediaContext } from '../../../context/AntmediaContext';

//utils
import Helper       from '../../../helpers';


const ChildChannel = (props) => {

    const {
        data,
        selected,
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
            if(data.is_private === true){
                setSelectedChannelID(data.id);
                setIsConfirmPasswordVisible(true);
            }else{
                handleSelfJoinChannel(data.id);
                setIsCollapseChild(!isCollapseChild);
            }
    };
    
    const checkMemberInclude = () => {

        let newMember = [];
        selected.member.map((val) => (
            data.roomStreamList != null &&
            data.roomStreamList.includes(val.uuid) && newMember.push(val)
        ));

        setMember(newMember)
    };

    useEffect(() => {
        data != undefined && checkMemberInclude();
    }, [selected, data]);

    return (
        
        <div className='mb-1'>
            <div 
                onClick     = {() => {
                    if(webRTCAdaptorPeer == null){
                        if(data.roomStreamList != null && member.filter((data) => data.uuid === localStorage.getItem('uuid')).length > 0){
                            setConfirmJoined(false);
                            setActiveChannel(data);
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
                            {data.roomName}
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
                        member != null && member.map((data_) => (
                            <div 
                                className   ='mb-1'
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
                                data_?.isTalk == true ?
                                        <Volume2/>
                                    :
                                        null 
                                }
                            </div>
                        ))
                }
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
            </Collapse>
        </div>
    )
};

export default ChildChannel;