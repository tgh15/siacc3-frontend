// ** React Imports
import { Fragment, useContext, useState } from 'react'

// ** Custom Components
import Avatar from '../../../widgets/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { MessageCircle, Edit, Search, Maximize } from 'react-feather'
import {
    Badge,
    Media,
    Input,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
    InputGroupAddon,
    InputGroup,
    InputGroupText,
    Label
} from 'reactstrap'

import { Link, useHistory } from 'react-router-dom'
import { ChatContext } from '../../../../context/ChatContext'
import Helper from '../../../../helpers'
import SelectSingleUser from '../../../widgets/select-single-user'
import SelectMultipleUser from '../../../widgets/select-multiple-user'
import FormGroup from 'reactstrap/lib/FormGroup'
import CustomToast from '../../../widgets/custom-toast'


const MessageDropdown = () => {
    // ** states
    const [modalPersonal, setModalPersonal] = useState(false)
    const [modalGroup, setModalGroup] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [groupName, setGroupName] = useState("")
    const { room, totalUnreadMessage, setChatPopup, setRoomSelected, getMessages, chatSocket, markAsRead } = useContext(ChatContext)
    const { fallbackImage_, getUserData } = Helper
    const history = useHistory()


    const onSelectRoom = room => {
        setRoomSelected(room);
        setChatPopup(true);
        getMessages(room.id);
        markAsRead(room.id);
    }

    const onSelectPersonal = (id) => {
        if (chatSocket != null) {

            let val = {
                type: "communication-room-create",
                is_secure: true,
                token: localStorage.getItem('token'),
                payload: {
                    type: "personal",
                    name: "",
                    member_id: [id, getUserData().uuid]
                }
            };
            chatSocket.send(JSON.stringify(val));
            setModalPersonal(false);

        }
    };

    const onSelectGroup = (formValues) => {
        if (formValues.length <= 1) {
            CustomToast('danger', 'Jumlah kontak harus lebih dari 1.');
        } else if (groupName == "") {
            CustomToast('danger', 'Nama Group Tidak Boleh Kosong');
        } else {
            if (chatSocket != null) {

                formValues.push(getUserData().uuid);

                let val = {
                    type: "communication-room-create",
                    is_secure: true,
                    token: localStorage.getItem('token'),
                    payload: {
                        type: "group",
                        name: groupName,
                        member_id: formValues
                    }
                };
                chatSocket.send(JSON.stringify(val));
                setModalGroup(false)
            }
        }
    };

    // ** Function to render Notifications
    /*eslint-disable */
    const renderMessageItems = () => {
        return (
            <PerfectScrollbar
                component='li'
                className='media-list scrollable-container'
                options={{
                    wheelPropagation: false
                }}
            >
                {room != null && room.filter((val) => {
                    if (searchTerm == "") {
                        return val
                    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                }).map((item, index) => {
                    return (
                        <a key={index} className='d-flex' onClick={() => { onSelectRoom(item); }}>
                            <Media
                                className={classnames('d-flex', {
                                    'align-items-start': !item.switch,
                                    'align-items-center': item.switch
                                })}
                            >
                                <Fragment>
                                    <Media left>
                                        <Avatar onError={fallbackImage_}
                                            img={item.avatar}
                                        />
                                    </Media>
                                    <Media body>
                                        <div className='d-flex justify-content-between'>
                                            <span className='text-secondary text-bolder'>
                                                {item.name}
                                            </span>
                                            <span className='text-muted'>
                                                {Helper.getTimeAgo(item.time)}
                                            </span>
                                        </div>
                                        <small className='notification-text'>
                                            {item.last_message}
                                            {
                                                item.un_read_message > 0 &&
                                                <Badge pill color="primary" className="ml-1">
                                                    {item.un_read_message}
                                                </Badge>
                                            }
                                        </small>
                                    </Media>
                                </Fragment>

                            </Media>
                        </a>
                    )
                })}
            </PerfectScrollbar>
        )
    }

    /*eslint-enable */
    const dropdownNewMessage = () => {
        return (
            <UncontrolledDropdown className='dropdown-notification nav-item'>
                <DropdownToggle tag='div' href='/' onClick={e => e.preventDefault()}>
                    <Edit size={20} className="cursor-pointer text-secondary" />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem href='/' tag='a' onClick={() => { setModalPersonal(true) }}>
                        Komunikasi Pribadi
                    </DropdownItem>
                    <DropdownItem href='/' tag='a' onClick={() => setModalGroup(true)}>
                        Komunikasi Group
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }

    return (
        <Fragment>
            {/* modal select single user */}
            <SelectSingleUser
                show        = {modalPersonal}
                title       = "Komunikasi Baru"
                setShow     = {(par) => setModalPersonal(par)}
                onSelect    = {(user) => onSelectPersonal(user.uuid)} 
            />

            {/* modal new chat group */}
            <SelectMultipleUser
                show        = {modalGroup}
                title       = "Buat Group"
                setShow     = {(par) => setModalGroup(par)}
                onSelect    = {(par) => { onSelectGroup(par) }}
                titleButton = "Selesai"
            >

                <FormGroup>
                    <Label> Nama Group</Label>
                    <Input
                        type="text"
                        onChange={(e) => { setGroupName(e.target.value) }}
                    />
                </FormGroup>

            </SelectMultipleUser>

            <UncontrolledDropdown 
                id          = {'header_message_chat'}
                tag         = 'li' 
                className   = 'dropdown-notification nav-item mr-25'
            >
                <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
                    <MessageCircle size={21} />
                    {
                        totalUnreadMessage > 0 ? 
                            <Badge pill color='primary' className='badge-up'>
                                {totalUnreadMessage}
                            </Badge> 
                        : 
                            null
                    }
                </DropdownToggle>

                <DropdownMenu tag='ul' right className='dropdown-menu-media mt-0'>
                    <li className='dropdown-menu-header'>
                        <DropdownItem className='d-flex' tag='div' header>
                            <h4 className='notification-title mb-0 mr-auto'>Komunikasi</h4>
                            <Link tag="div" to="/chats">
                                <Maximize size={20} className="mr-1 text-secondary" />
                            </Link>

                            {dropdownNewMessage()}

                        </DropdownItem>
                        <InputGroup className='input-group-merge mb-1'>
                            <InputGroupAddon addonType='prepend'>
                                <InputGroupText>
                                    <Search size={14} />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder='Cari Percakapan' onChange={(e) => { setSearchTerm(e.target.value) }} />
                        </InputGroup>
                    </li>
                    {renderMessageItems()}
                    <li className='dropdown-menu-footer'>
                        <h6 className='text-center cursor-pointer' onClick={() => { history.push("/chats") }}> Lihat Semua </h6>
                    </li>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Fragment>
    )
}

export default MessageDropdown