import classnames from 'classnames'
import { useContext } from 'react';
import { Archive, Check, Eye, MoreVertical, UserX, X } from 'react-feather';
import { Badge, CardText, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import Avatar from '../../components/widgets/avatar';
import { ChatContext } from '../../context/ChatContext';
import Helper from '../../helpers';

const ItemRoom = props => {

    const { room, query, filteredRoom, handleUserSidebarRight, type } = props
    const { setRoomSelected, getMessages, roomSelected, connectChatSocket, handleEndChat, handleArchive, handleUnArchive, markAsUnread, markAsRead } = useContext(ChatContext)

    const { fallbackImage_, getTimeAgo } = Helper;

    // ** Handles User Chat Click
    const handleRoomClick = room => {
        if (roomSelected && roomSelected.id == room.id) {
            return false
        }
        setRoomSelected(room)
        markAsRead(room.id)
        getMessages(room.id)
        connectChatSocket(room.id)
        
    }

    if (room && room.length) {
        if (query.length && !filteredRoom.length) {
            return (
                <li className='no-results show'>
                    <h6 className='mb-0'>No Chats Found</h6>
                </li>
            )
        } else {
            const arrToMap = query.length && filteredRoom.length ? filteredRoom : room

            return arrToMap.map(item => {
                const time = getTimeAgo(item.time ? item.time : new Date())

                return (
                    <li
                        className={classnames({
                            active: roomSelected && item.id === roomSelected.id
                        })}
                        key={item.id}
                        onClick={() => handleRoomClick(item)}
                    >
                        <Avatar onError={fallbackImage_} img={item.avatar} imgHeight='42' imgWidth='42' />
                        <div className='chat-info flex-grow-1'>
                            <h5 className='mb-0'>{item.name}</h5>
                            <CardText className='text-truncate' style={{ fontSize: "9pt" }}>
                                {item.last_message != "" ? item.last_message : "-"}
                            </CardText>
                        </div>
                        <div className='chat-meta text-nowrap'>
                            <small className='float-right mb-25 chat-time ml-25' style={{ fontSize: "0.7rem" }}>{time}</small>

                            {item.un_read_message > 0 ?
                                <Badge className='float-right' color='danger' pill>
                                    {item.un_read_message}
                                </Badge> : null}
                            {item.un_read_message == 0 && item.is_un_read ?
                                <Badge className='float-right' color='danger' style={{ height:"20px",width:"20px" }} pill>
                                    {' '}
                                </Badge> : null
                            }

                        </div>
                        <UncontrolledDropdown >
                            <DropdownToggle tag='div' onClick={e => e.preventDefault()}>
                                <MoreVertical size={25} className='ml-1' />
                            </DropdownToggle>
                            {type == "archive" ?
                                <DropdownMenu right >
                                    <DropdownItem style={{ width: "100%" }} onClick={() => { handleUnArchive(item.id) }}>
                                        <X size={18} /> {' '} Batalkan Arsipkan
                                    </DropdownItem>
                                </DropdownMenu>

                                :
                                <DropdownMenu right >
                                    {item.type == "group" ?
                                        <DropdownItem style={{ width: "100%" }} onClick={handleUserSidebarRight}>
                                            <Eye size={18} />{' '} Lihat Detail Group
                                        </DropdownItem>
                                        : null
                                    }
                                    <DropdownItem style={{ width: "100%" }} onClick={() => { handleEndChat(item.id) }}>
                                        <X size={18} /> {' '} Akhiri Percakapan
                                    </DropdownItem>
                                    <DropdownItem style={{ width: "100%" }} onClick={() => { handleArchive(item.id) }}>
                                        <Archive size={18} />{' '} Arsipkan Percakapan
                                    </DropdownItem>

                                    {item.un_read_message == 0 ?
                                        <DropdownItem style={{ width: "100%" }} onClick={() => markAsUnread(item.id)}>
                                            <UserX size={18} />{' '} Tandai Belum Dibaca
                                        </DropdownItem>
                                        :
                                        <DropdownItem style={{ width: "100%" }} onClick={() => markAsRead(item.id)}>
                                            <Check size={18} />{' '} Tandai Sudah Dibaca
                                        </DropdownItem>}
                                </DropdownMenu>
                            }
                        </UncontrolledDropdown>


                    </li>
                )
            })
        }
    } else {
        return null
    }
}

export default ItemRoom