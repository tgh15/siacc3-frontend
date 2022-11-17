import React, { Fragment, useEffect, useRef, useState } from 'react';
import { 
    Card, 
    Button,
    CardBody, 
    CardText,
    DropdownItem,
    DropdownMenu, 
    DropdownToggle, 
    ButtonDropdown,
    UncontrolledDropdown,
} from 'reactstrap';

//Icon
import { 
    UserX, 
    LogOut, 
    UserCheck, 
    MoreVertical
} from 'react-feather';

//Components
import Avatar                        from '@components/avatar';
import LogoProfile                   from '@src/assets/images/logo/user.png';
import Helper                        from '../../../../helpers';
import CommunicationPTT              from '../../../../services/pages/chat/PushToTalk';
import CustomToast                   from '../../../../components/widgets/custom-toast';

const MemberManagement = (props) => {

    const {
        selected,
        getServer
    }                                     = props;

    const ref                             = useRef();

    //State
    const [member, setMember]             = useState(null);

    const handleAddAdmin = (uuid) => {

        const formData = {
            admins_id : [uuid]
        }

        CommunicationPTT.addAdminToRoom(selected.id, formData).then(
            res => {
                if(res.status === 200){
                    CustomToast('success', 'Admin berhasil ditambahkan.');

                    getServer(selected.id);
                }
            },
            err => {
                console.log(err);
            }
        )
    }

    const handleRemoveAdmin = (uuid) => {
        const formData = {
            admins_id : [uuid]
        }

        CommunicationPTT.removeAdminFromRoom(selected.id, formData).then(
            res => {
                if(res.status === 200){
                    CustomToast('success', 'Admin berhasil dihapus.');

                    getServer(selected.id);
                }
            },
            err => {
                console.log(err);
            }
        )
    }

    const handleRemoveMember = (uuid) => {
        const formData = {
            member_id : [uuid]
        }

        CommunicationPTT.removeMemberFromRoom(selected.id, formData).then(
            res => {
                if(res.status === 200){
                    CustomToast('success', 'Member berhasil dikeluarkan.');

                    getServer(selected.id);
                }
            },
            err => {
                console.log(err);
            }
        )
    }



    useEffect(() => {
        if(selected != null && selected.member.length > 0){

            let member_ = [];

            selected.member.map((data) => (
                selected.admins_id.includes(data.uuid) ?
                    member_.push({
                        ...data,
                        is_admin : true
                    })
                :
                    member_.push({
                        ...data,
                        is_admin : false
                    })
            ))

            setMember(member_);
        }
    }, [selected]);
    
    return (
        <Fragment>
            {
                selected != null && member != null ?
                    member.map((data, index) => (
                        <Card className="mb-1" key={"group_member_"+index+"_"+data.id}>
                            <CardBody style={{ padding: '15px' }}>
                                <ul className='list-unstyled m-0'>
                                    <li className='d-flex justify-content-between align-items-center'>
                                        <Avatar 
                                            img       = {data.avatar} 
                                            imgWidth  = '50'
                                            imgHeight = '50' 
                                            className = 'box-shadow-1'
                                            onError   = {Helper.fallbackImage_}
                                        />
                                        <div 
                                            style     = {{ margin: '4px 0px 0px 20px' }}
                                            className = 'chat-info flex-grow-1' 
                                        >
                                            <h6 className='font-weight-bolder mb-0'>
                                                {data.name}
                                            </h6>
                                            <CardText
                                                style     = {{ fontSize: '12px' }}
                                                className = 'text-muted'
                                            >
                                                {data.origin}
                                            </CardText>
                                        </div>
                                        <div className='d-flex'>
                                            {
                                                data.is_admin &&
                                                <Button outline size="sm">
                                                    Admin
                                                </Button>
                                            }

                                            {
                                                selected.admins_id.includes(Helper.getUserData().uuid) &&
                                                <UncontrolledDropdown ref={ref} className="ml-1">
                                                    <DropdownToggle 
                                                        color     = '' 
                                                        className = 'p-0'
                                                    >
                                                        <MoreVertical size={18}/>
                                                    </DropdownToggle>
                                                    <DropdownMenu className='mr-4'>
                                                        {
                                                            !data.is_admin &&
                                                            <DropdownItem 
                                                                tag     = 'a'
                                                                onClick = {() => handleAddAdmin(data.uuid)}
                                                            >
                                                                <UserCheck 
                                                                    size  = {18}
                                                                    style = {{ marginRight: '9px' }}
                                                                />
                                                                Jadikan Admin
                                                            </DropdownItem>
                                                        }
                                                        {
                                                            data.is_admin && Helper.getUserData().uuid != data.uuid &&
                                                            <DropdownItem  
                                                                tag     = 'a'
                                                                onClick = {() => handleRemoveAdmin(data.uuid)}
                                                            >
                                                                <UserX 
                                                                    size  = {18}
                                                                    style = {{ marginRight: '9px' }}
                                                                />
                                                                Hapus Admin
                                                            </DropdownItem>
                                                        }
                                                        <DropdownItem 
                                                            tag     = 'a'
                                                            onClick = {() => handleRemoveMember(data.uuid)}
                                                        >
                                                            <LogOut 
                                                                size  = {18}
                                                                style = {{ marginRight: '9px' }}
                                                            />
                                                            Keluarkan Dari Room
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            }
                                        </div>
                                    </li>
                                </ul> 
                            </CardBody>
                        </Card>
                    ))
                :
                    null
            }
        </Fragment>
    );
};

export default MemberManagement;