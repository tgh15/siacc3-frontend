import { Fragment, useContext } from "react"
import { Archive, EyeOff, MoreVertical, Search, UserX, X } from "react-feather"
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Badge, CardText, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, InputGroupText, UncontrolledDropdown } from "reactstrap"

// ** Custom Components
import Avatar from '@components/avatar'
import { useState } from "react"
import { ChatContext } from "../../context/ChatContext"
import ItemRoom from "./ItemRoom"

const ArchiveMessage = props => {
    // props
    const { handleUserSidebarLeft, userProfile, handleUserSidebarRight } = props

    //  context
    const { roomArchive, setRoomSelected, roomSelected } = useContext(ChatContext)


    const [filteredRoom, setFilteredChat] = useState([])
    const [query, setQuery] = useState('')

    // ** Handles Filter
    const handleFilter = e => {
        setQuery(e.target.value)
        const searchFilterFunction = roomArchive => roomArchive.name.toLowerCase().includes(e.target.value.toLowerCase())
        const filteredRoomArr = roomArchive.filter(searchFilterFunction)
        setFilteredChat([...filteredRoomArr])
    }

    return (
        <Fragment>
            <header className="p-1">
                <div className='close-icon' onClick={handleUserSidebarLeft}>
                    <X size={14} />
                </div>
                <div>
                    <h4>Arsip Pesan </h4>
                </div>

            </header>
            <div className="sidebar-content">
                <div className='chat-fixed-search '>
                    <div className='d-flex align-items-center w-100'>
                        <div className='sidebar-profile-toggle' >
                            <Avatar
                                className='avatar-border'
                                img={userProfile.photo}
                                status="online"
                                imgHeight='42'
                                imgWidth='42'
                            />
                        </div>
                        <InputGroup className='input-group-merge ml-1 w-100'>
                            <InputGroupAddon addonType='prepend'>
                                <InputGroupText className='round'>
                                    <Search className='text-muted' size={14} />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                value={query}
                                className='round'
                                placeholder='Cari Percakapan'
                                onChange={handleFilter}
                            />
                        </InputGroup>
                    </div>
                </div>

                <PerfectScrollbar className='chat-user-list-wrapper list-group' options={{ wheelPropagation: false }}>
                    <ul className='chat-users-list chat-list media-list mt-1'>
                        <ItemRoom
                            room={roomArchive}
                            type="archive"
                            query={query}
                            roomSelected={roomSelected}
                            filteredRoom={filteredRoom}
                            handleUserSidebarRight={handleUserSidebarRight} />
                    </ul>
                </PerfectScrollbar>
            </div>
        </Fragment>
    )
}

export default ArchiveMessage