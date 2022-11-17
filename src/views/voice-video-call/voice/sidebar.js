
import {
    Plus,
    Search
}                       from 'react-feather';

import {
    Input,
    CardText,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
}                       from 'reactstrap';

import Avatar           from '../../../components/widgets/avatar';
import PerfectScrollbar from 'react-perfect-scrollbar';

//Image
import LogoProfile      from '@src/assets/images/logo/user.png';

//utils
import Helper           from '../../../helpers';


const VoiceSidebar = (props) => {

    const {
        listCall,
        setDataPrivate,
        setModalVisible,
    }                   = props;

    
    return (
        <>
            <div className='pt-1 px-2 d-flex justify-content-between'>
                <h5 className='font-weight-bolder'>
                    Voice & Video Call
                </h5>
                <div className='d-flex cursor-pointer'>
                    <Plus size="20" onClick={() => {setModalVisible(true)}}/>
                </div>
            </div>
            
            {/* header */}
            <div className='chat-fixed-search'>
                <div className='d-flex align-items-center w-100'>
                    <InputGroup className='input-group-merge w-100'>
                        <InputGroupAddon addonType='prepend'>
                            <InputGroupText className='round'>
                                <Search
                                    size={14}
                                    className='text-muted'
                                />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            className='round'
                            placeholder='Cari Percakapan'
                        />
                    </InputGroup>
                </div>
            </div>

            {/* user chat */}
            <PerfectScrollbar
                options={{ wheelPropagation: false }}
                className='chat-user-list-wrapper list-group'
            >
                <ul className='chat-users-list chat-list media-list'>
                    {
                        listCall.map((data) => (
                            <li className='chat' onClick={()=>setDataPrivate(data)}>
                                <Avatar
                                    img={LogoProfile}
                                    status="online"
                                    imgWidth='42'
                                    imgHeight='42'
                                    className='avatar-border'
                                />
                                <div className='chat-info flex-grow-1'>
                                    <h6 className='font-weight-bolder mb-0'>
                                        {
                                            data.UUIDCaller === Helper.getUserData().uuid ? data.UUIDReceiverDetail.name : data.UUIDCallerDetail.name
                                        }
                                    </h6>
                                    <CardText
                                        style={{ fontSize: '12px' }}
                                        className='text-truncate'
                                    >
                                        {
                                            data.UUIDCaller === Helper.getUserData().uuid ? data.UUIDReceiverDetail.origin : data.UUIDCallerDetail.origin
                                        }                                                          
                                    </CardText>
                                </div>
                                <div className='chat-meta text-nowrap'>
                                    <small className='float-right mb-25 chat-time ml-25'>
                                        {Helper.dateIndo(data.created_at)}
                                    </small>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </PerfectScrollbar>
        </>
    );
}

export default VoiceSidebar;