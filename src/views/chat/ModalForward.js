import { useContext, useState } from "react"
import { Search } from "react-feather"
import { Input, InputGroup, InputGroupAddon, InputGroupText, ListGroup, ListGroupItem, Media } from "reactstrap"
import Avatar from "../../components/widgets/avatar"
import { ModalBase } from "../../components/widgets/modals-base"
import { ChatContext } from "../../context/ChatContext"
import Helper from "../../helpers"
import PerfectScrollbar from 'react-perfect-scrollbar'

const ModalForward = props => {

    const {
        show,
        setShow,
        title,
        size,
        onSelect
    } = props

    const [searchUser, setSearchUser] = useState("")
    const {room,roomSelected,setRoomSelected,getMessages,chatSocket,selectedMessage,setSelectedMessage} = useContext(ChatContext)

    const { fallbackImage_ } = Helper

    const handleForward = (room) => {
        if(chatSocket != null){
            let val = {
                type        : "communication-message-create",
                is_secure   : true,
                token       : localStorage.getItem('token'),
                payload     : {
                    content_type : "forward",
                    id           : selectedMessage.id,
                    room_id      : room.id, 
                }
            }
            chatSocket.send(JSON.stringify(val));
            setShow(false)
            setSelectedMessage(null)
            setRoomSelected(room);
            getMessages(room)
            
        }
    }

    const renderRoom = () => {
        let idRoom = roomSelected ? roomSelected.id : null;
        return (
            <PerfectScrollbar style={{ maxHeight: "300px" }}>
                <ListGroup>
                    {room && room.filter(opt => opt.id != idRoom).filter((val) => {
                        if (searchUser == "") {
                            return val
                        } else if (val.name.toLowerCase().includes(searchUser.toLowerCase())) {
                            return val
                        }
                    }).map((item, index) => {
                        return (
                            
                            <ListGroupItem key={index} className="cursor-pointer" onClick={() => { handleForward(item) }}>
                                <Media>
                                    <Media left href='#'>
                                        <Avatar onError={fallbackImage_} img={item.avatar} imgHeight='40' imgWidth='40' />
                                    </Media>
                                    <Media body>
                                        <Media header className="mb-0 ml-1">{item.name}</Media>
                                    </Media>
                                </Media>

                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </PerfectScrollbar>
        )
    }

    

    return (
        <ModalBase show={show} setShow={() => { setShow(!show) }} title={"Teruskan Ke"} size={size || "sm"}>
            <InputGroup className='input-group-merge mb-1'>
                <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                        <Search size={14} />
                    </InputGroupText>
                </InputGroupAddon>
                <Input placeholder='Cari...' onChange={(e) => { setSearchUser(e.target.value) }} />
            </InputGroup>
            {renderRoom()}
        </ModalBase>
    )
}

export default ModalForward