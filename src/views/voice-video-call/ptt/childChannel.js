
import { useEffect, useState } from 'react';
import {
    Volume2
}                   from 'react-feather';

import {
    Button,
    Col,
    Collapse,
    Row
}                   from 'reactstrap';

import Avatar       from '../../../components/widgets/avatar';

//utils
import Helper       from '../../../helpers';


const ChildChannel = (props) => {

    const {
        data,
        selected,
        setActiveChannel,
        setSelectedChannelID,
        setIsConfirmPasswordVisible,
        handleSelfJoinChannel  
    }                                           = props;

    const [member, setMember]                   = useState(null);
    const [confirmJoined, setConfirmJoined]     = useState(false);
    const [isCollapseChild, setIsCollapseChild] = useState(false);

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
                    if(data.roomStreamList != null && member.filter((data) => data.uuid === localStorage.getItem('uuid')).length > 0){
                        setConfirmJoined(false);
                        setActiveChannel(data);
                        setIsCollapseChild(!isCollapseChild);
                    }else{
                        setConfirmJoined(true);
                        setIsCollapseChild(!isCollapseChild);
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
            </Collapse>
        </div>
    )
};

export default ChildChannel;