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
	console.log(props);
	const { datas } = props

	const history = useHistory()

	const { room, setRoomSelected, setChatPopup, getMessages } 			= useContext(ChatContext)
	const { broadcast, setModalDetailBroadcast, setBroadcastSelected } 	= useContext(BroadcastContext)
	const { notificationUnread, notifications, handleReadNotification } = useContext(NotificationContext)

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

	return (
		<Fragment>

			{
				datas && datas.map((list) => (
					<Card 
						key			= {list.id} 
						onClick		= {() => { handleClickNotification(list.notification) }}
						className	= {classNames('notification-list', {unread: list.is_read === false})}
					>
						<div 
							style		= {{ borderRadius: '10px', cursor: 'pointer' }} 
							className	= 'media-list' 
						>
							<Media className="py-1 d-flex align-items-center">
								<Media left href="#">
									<Avatar 
										img			= {list.notification && list.notification.icon}
										imgWidth	= {40}
										imgHeight	= {40}
									/>
								</Media>
								<Media body>
									<h4	
										style		= {{ marginBottom: 0, fontWeight: 'bolder' }}
										className	= { list.is_read === false ? 'text-white' : 'text-dark' }
									>
										{list.notification && list.notification.title}
									</h4>
									<p 
										className	= {`my-1 ${list.is_read === false ? 'text-white' : 'text-dark'}`}
									>
										{
											list.notification && list.notification.kind == "new_message" ?
												'mengirimi pesan baru '
											:
												null
										}
										{
											list.notification && list.notification.body.length > 100 ? 
												list.notification && list.notification.body.substr(0, 100) + "..." 
											: 	
												list.notification && list.notification.body
										}
									</p>
								</Media>
								<Media right>
									<small
										className	= {`${list.is_read === false ? 'text-white' : 'text-dark'}`}
									>
										{dateIndo(list.created_at)}
									</small>
								</Media>
							</Media>
						</div>
					</Card>
				))
			}
		</Fragment>
	)
}

export default List
