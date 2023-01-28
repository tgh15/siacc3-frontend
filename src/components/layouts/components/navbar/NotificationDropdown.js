// ** React Imports
import { Fragment, useContext } from 'react'

// ** Custom Components
import Avatar from '../../../widgets/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, Maximize } from 'react-feather'
import {
  Badge,
  Media,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

import { Link, useHistory } from 'react-router-dom'
import { NotificationContext } from '../../../../context/NotificationContext'
import Helper from '../../../../helpers'
import { BroadcastContext } from '../../../../context/BroadcastContext'
import { ChatContext } from '../../../../context/ChatContext'


const NotificationDropdown = () => {


  const { notificationUnread, notifications, handleReadNotification } = useContext(NotificationContext)
  const { broadcast, setModalDetailBroadcast, setBroadcastSelected } = useContext(BroadcastContext)
  const { room, setRoomSelected, setChatPopup, getMessages } = useContext(ChatContext)
  const { fallbackImage_, dateIndo } = Helper

  const history = useHistory()

  const onSelectRoom = room => {
    setRoomSelected(room);
    setChatPopup(true);
    getMessages(room.id);
  }

  const handleClickNotification = (notification) => {

    handleReadNotification(notification.id)

    if (notification.kind == "new_message" || notification.kind == "new_group" || notification.kind === "new_personal") {
      onSelectRoom(room.find(data => data.id === notification.content))
    } else if (notification.kind == "new_agent_report" || notification.kind == "agent_report_forward" || notification.kind == "agent_report_publish" || notification.kind == "agent_report_archive" || notification.kind == "new_like" || notification.kind == "new_comment") {
      history.push(`/beranda/detail/${notification.content}`);
    } else if (notification.kind == "automation_report") {
      history.push("/report");
    } else if (notification.kind == "new_broadcast") {
      setBroadcastSelected(broadcast.find(data => data.id === notification.content))
      setModalDetailBroadcast(true)
    } else if (notification.kind == "achievement_new_event") {
      history.push("/event");
    } else if (notification.kind == "achievement_got") {
      history.push("/profile");
    }
  }

  const handleReadAllNotification = () => {
    handleReadNotification(Array.from(notifications, item => item.id))
  }

  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        options   = {{wheelPropagation: false}}
        component = 'li'
        className = 'media-list scrollable-container'
      >
        {notifications && notifications.map((item, index) => {
          return (
            <a key={index} className='d-flex' href='/' onClick={e => { e.preventDefault(); handleClickNotification(item); }}>
              <Media
                className={classnames('d-flex', {
                  'align-items-start': !item.switch,
                  'align-items-center': item.switch
                })}
              >
                <Media left>
                  <Avatar onError={fallbackImage_} img={item.icon}/>
                </Media>

                <Media body>
                  {item.title} <br />
                  <small className='notification-text'>{
                    item.kind == "new_message" ?
                      'mengirimi pesan baru '
                      :
                      null
                  }
                    {item.body.length > 100 ? item.body.substr(0, 100) + "..." : item.body}</small>
                </Media>
                <Media right style={{ fontSize: "9pt" }}>
                  {dateIndo(item.created_at)}
                </Media>
              </Media>
            </a>
          )
        })}
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */



  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item mr-25'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
        <Bell size={21} />
        {notificationUnread > 0 ? <Badge pill color='primary' className='badge-up'>
          {notificationUnread > 10 ? "10+" : notificationUnread}
        </Badge> : null}
      </DropdownToggle>
      <DropdownMenu tag='ul' right className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 mr-auto'>Notifikasi</h4>
            <Link to="/notification">
              <Maximize size={20} className="cursor-pointer text-secondary" />
            </Link>
          </DropdownItem>
        </li>
        {renderNotificationItems()}

        <li className='dropdown-menu-footer'>
          {notificationUnread > 0 ?
            <h6 className='text-center cursor-pointer' onClick={() => { handleReadAllNotification() }}> Tandai Sudah Dibaca </h6>
            :<h6 className='text-center'> Tidak Ada Pemberitahuan </h6> } 
          </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown