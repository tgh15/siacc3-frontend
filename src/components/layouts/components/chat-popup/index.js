// ** React Imports
import { 
	useRef, 
	useState,
	useEffect, 
	useContext, 
} 							from 'react'
import ReactDOM 			from 'react-dom';


// ** Custom Components
import Avatar 				from '@components/avatar'

// ** Third Party Components
import {
	X,
	Mic,
	File,
	Image,
} 							from 'react-feather'
import {
	Modal,
	Input,
	Media,
	Label,
	Button,
	ModalBody,
	ModalFooter,
} 							from 'reactstrap'
import Viewer			 	from 'react-viewer'
import classnames 			from 'classnames'
import PerfectScrollbar 	from 'react-perfect-scrollbar'


import Helper 				from '../../../../helpers'
import ChatApi 				from '../../../../services/pages/chat'
import ChatList 			from '../../../../views/chat/ChatList'
import ModalRecord 			from '../../../../views/chat/ModalRecord'
import ModalForward 		from '../../../../views/chat/ModalForward'
import { ChatContext } 		from '../../../../context/ChatContext'

// CSS
import "./index.scss"
import '../../../scss/base/pages/popup-chat.scss'

const ChatPopup = () => {
	// ** Props & Custom Hooks
	const { 
		chatPopup, 
		setChatPopup, 
		roomSelected, 
		messages, 
		selectedMessage, 
		setSelectedMessage, 
		handleRevokeMe, 
		handleRevokeAll, 
		sendMessage 
	} 							= useContext(ChatContext)
	const { 
		dateIndo, 
		getUserData,
		fallbackImage_, 
	} 							= Helper


	const [inputText, setInputText] 		= useState("")
	const [modalRecord, setModalRecord] 	= useState(false)
	const [modalForward, setModalForward] 	= useState(false)
	const [imageSelected, setImageSelected] = useState(null)

	const chatArea 							= useRef()

	// ** User Profile
	let userUuid = getUserData().uuid;

	// ** Toggles Compose POPUP
	const togglePopUp = e => {
		e.preventDefault()
		setChatPopup(!chatPopup)
	}

	const scrollToBottom = () => {
		const chatContainer 	= ReactDOM.findDOMNode(chatArea.current)
		chatContainer.scrollTop = Number.MAX_SAFE_INTEGER
	};

	// ** Formats chat data based on sender
	const formattedChatData = () => {
		let chatLog = []
		if (messages && messages.length > 0) {
			chatLog = messages
		}

		const formattedChatLog = []
		let chatMessageSenderId = chatLog[0] ? chatLog[0].sender.uuid : undefined
		let chatMessageSenderPhoto = chatLog[0] ? chatLog[0].sender.avatar : undefined

		let msgGroup = {
			senderId: chatMessageSenderId,
			senderPhoto: chatMessageSenderPhoto,
			messages: []
		}

		chatLog.forEach((msg, index) => {

			if (chatMessageSenderId === msg.sender.uuid) {
				msgGroup.messages.push({
					id: msg.id,
					name: msg.sender.name,
					parent: msg.parent,
					attachment: msg.attachment,
					content_type: msg.content_type,
					msg: msg.content,
					isRead: msg.is_read.find(opt => opt.uuid == msg.sender.uuid)["status"],
					time: dateIndo(msg.created_at),
				})
			} else {
				chatMessageSenderId = msg.sender.uuid
				chatMessageSenderPhoto = msg.sender.avatar
				formattedChatLog.push(msgGroup)

				msgGroup = {
					senderId: msg.sender.uuid,
					senderPhoto: msg.sender.avatar,
					messages: [
						{
							id: msg.id,
							name: msg.sender.name,
							parent: msg.parent,
							attachment: msg.attachment,
							content_type: msg.content_type,
							msg: msg.content,
							isRead: msg.is_read.find(opt => opt.uuid != msg.sender.uuid)["status"],
							time: dateIndo(msg.created_at),
						}
					]
				}
			}

			if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
		})
		return formattedChatLog
	}

	// ** Renders user chat
	const renderChats = () => {
		return formattedChatData().map((item, index) => {

			return (

				<div
					key			= {index}
					className	= {classnames('chat', {
						'chat-left' : item.senderId != userUuid
					})}
				>

					<div className='chat-avatar'>
						<Avatar
							img			= {item.senderPhoto}
							onError		= {fallbackImage_}
							className	= 'box-shadow-1 cursor-pointer'
						/>
					</div>

					<div className='chat-body'>
						{
							item.messages.map(chat => (
								<ChatList
									item={item}
									chat={chat}
									setImageSelected={setImageSelected}
								/>
							))
						}
					</div>
				</div >
			)
		})
	}

	// ** ChatWrapper tag based on chat's length
	const ChatWrapper = messages && messages && Object.keys(messages).length ? PerfectScrollbar : 'div'

	const selectFile = e => {
		const reader = new FileReader(),

		files = e.target.files

		reader.onload = function () {
			setPhoto(reader.result)
		}
		reader.readAsDataURL(files[0])

		let data = new FormData();
		data.append("attachment[]", files[0]);

		ChatApi.uploadAttachment({
			dataFile: data,
			onSuccess: (res) => {
				sendMessage("", [res[0].id])
			},
			onFail: (err) => {
				console.log(err)
			}
		})
	}

	const onSubmit = (e) => {
		if (e.key === 'Enter') {
			sendMessage(e.target.value, [])
			setInputText("")
		}
	}

	useEffect(() => {
		if (chatArea.current) {
			setTimeout(scrollToBottom(), 500)
		}
	}, [chatArea.current])



	return (
		<div id="chat-popup-modal">
			<Viewer
				images		= {[{ src: imageSelected }]}
				visible		= {imageSelected}
				onClose		= {() => {setImageSelected(null)}}
				container	= {document.getElementById("container")}
				style		= {{zIndex:999}}
			/>

			<ModalForward 
				show		= {modalForward} 
				setShow		= {(par) => setModalForward(par)} 
			/>

			<ModalRecord 
				show		= {modalRecord} 
				setShow		= {(par) => setModalRecord(par)} 
			/>

			<Modal
				fade			 = {false}
				style			 = {{ position: "absolute", bottom: "-4%", right: "1%", width: "300em" }}
				isOpen			 = {chatPopup}
				toggle			 = {() => setChatPopup(!chatPopup)}
				onBlur			 = {() => console.log('keluar', 'check')}
				backdrop		 = {true}
				className		 = 'modal-sm'
				autoFocus		 = {true}
				contentClassName ='p-0'
			>
				<div className='modal-header'>
					<Media>
						<Media left>
							<Avatar 
								img		= {roomSelected && roomSelected.avatar} 
								size	= {"sm"} 
								onError	= {fallbackImage_} 
							/>
						</Media>
						<Media body>
							<Media className="ml-1">
								<h5 className='text-bolder'> 
									{roomSelected && roomSelected.name} 
								</h5>
							</Media>
						</Media>
					</Media>
					<div className='modal-actions'>
						<a 
							href		= '/' 
							onClick		= {togglePopUp}
							className	= 'text-body' 
						>
							<X size={14} />
						</a>
					</div>
				</div>
				<ModalBody 
					style		= {{ height: "300px" }}
					className	= 'flex-grow-1 p-0' 
				>
					<ChatWrapper 
						ref			= {chatArea} 
						options		= {{ wheelPropagation: false }} 
						className	= 'user-chats' 
					>
						{renderChats()}
					</ChatWrapper>

				</ModalBody>
				{
					selectedMessage ? 
						<div className='chat-reply' >
							{selectedMessage.msg}
							<X 
								size	= {20} 
								onClick	= {() => { setSelectedMessage(null) }} 
							/>
						</div> 
					: 
						null
				}
				<ModalFooter className="d-flex justify-content-between px-1">
					<div>
						<Label 
							for			= 'attach-doc'
							className	= 'attachment-icon mb-0' 
						>
							<Image 
								size		= {20} 
								className	= 'cursor-pointer text-secondary' 
							/>
							<input 
								id		 = 'attach-doc' 
								type	 = 'file' 
								hidden 
								onChange = {(e) => selectFile(e)} 
							/>
						</Label>

						<Label 
							for			= 'attach-doc'
							className	= 'attachment-icon mb-0 ml-1' 
						>
							<File 
								size		= {20} 
								className	= 'cursor-pointer text-secondary' 
							/>
							<input 
								id			= 'attach-doc' 
								type		= 'file' 
								hidden 
								onChange	= {(e) => selectFile(e)} 
							/>
						</Label>

						<Button 
							size		= "sm" 
							type		= "button" 
							className	= 'button-mic mb-0'
						>
							<Mic 
								size		= {20}
								onClick		= {() => {setModalRecord(true)}} 
								className	= 'cursor-pointer text-secondary' 
							/>
						</Button>

					</div>
					<div>
						<Input 
							style		= {{ width: "250px" }} 
							value		= {inputText} 
							onChange	= {(e) => { setInputText(e.target.value) }} 
							onKeyDown	= {(e) => onSubmit(e)} 
							placeholder = "Aa" 
						/>
					</div>
				</ModalFooter>
			</Modal>
		</div>
	)
}

export default ChatPopup
