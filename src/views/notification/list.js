// ** React Imports
import { Fragment, useState, forwardRef, useRef } from 'react'

import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'
import { Media } from "reactstrap"
import Avatar from '../../components/widgets/avatar'
import Helper from '../../helpers'

import {
  Card,

} from 'reactstrap'

import './index.scss'
import classNames from 'classnames'
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { BroadcastContext } from '../../context/BroadcastContext'
import { NotificationContext } from '../../context/NotificationContext'
import { useHistory } from 'react-router-dom'

const List = props => {

  const { datas } = props

  const history = useHistory()

  const { notificationUnread, notifications,handleReadNotification } = useContext(NotificationContext)
  const { broadcast, setModalDetailBroadcast, setBroadcastSelected } = useContext(BroadcastContext)
  const { room,setRoomSelected,setChatPopup,getMessages} = useContext(ChatContext)

  const { fallbackImage_, dateIndo } = Helper

  // const tesRef = useRef(null)

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
      history.push(`/beranda/${notification.content}`);
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

  return (
    <Fragment>

      {datas && datas.map((list) => (
        <Card key={list.id}  className={classNames('notification-list', {
          unread: list.is_read === false
        })} onClick={() => {handleClickNotification(list.notification)}}>
          <div className='media-list' style={{ borderRadius: '10px', cursor: 'pointer' }} >
            <Media className="py-1">
              <Media left href="#">
                <Avatar onError={fallbackImage_} img={list.notification && list.notification.icon} />
              </Media>
              <Media body>
                <h4 style={{ marginBottom: 0, fontWeight: 'bolder' }}>{list.notification && list.notification.title}</h4>
                <p className='my-1 text-secondary'>
                  {
                    list.notification && list.notification.kind == "new_message" ?
                      'mengirimi pesan baru '
                      :
                      null
                  }
                  {list.notification && list.notification.body.length > 100 ? list.notification && list.notification.body.substr(0, 100) + "..." : list.notification && list.notification.body}</p>
              </Media>
              <Media right>
                <small>{dateIndo(list.created_at)}</small>
              </Media>
            </Media>
          </div>
        </Card>
      ))}
    </Fragment>
  )
}

export default List
