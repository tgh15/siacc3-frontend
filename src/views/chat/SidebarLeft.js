// ** React Imports
import { useContext, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'


// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { X, Search, Home, Archive, Edit, MoreVertical, Eye, UserX } from 'react-feather'
import { CardText, InputGroup, InputGroupAddon, Input, InputGroupText, Badge, CustomInput, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, FormGroup } from 'reactstrap'
import { useHistory } from "react-router-dom";
import ArchiveMessage from './ArchiveMessage'
import { ChatContext } from '../../context/ChatContext'
import Helper from '../../helpers'
import ItemRoom from './ItemRoom'
import SelectMultipleUser from '../../components/widgets/select-multiple-user'
import SelectSingleUser from '../../components/widgets/select-single-user'
import CustomToast from '../../components/widgets/custom-toast'



const SidebarLeft = props => {
  // ** Props & Store
  const { sidebar, handleSidebar, userSidebarLeft, handleUserSidebarLeft, handleUserSidebarRight } = props
  const { room, roomSelected, setRoomSelected, chatSocket } = useContext(ChatContext)
  // ** history
  const history = useHistory()

  // ** User Profile
  let userProfile = JSON.parse(localStorage.getItem('userData'))
  // ** State
  const [query, setQuery] = useState('')
  const [filteredRoom, setFilteredChat] = useState([])
  const [modalPersonal, setModalPersonal] = useState(false)
  const [modalGroup, setModalGroup] = useState(false)
  const [groupName, setGroupName] = useState("")
  const { fallbackImage_, getTimeAgo } = Helper;



  const dropdownNewMessage = () => {
    return (
      <UncontrolledDropdown >
        <DropdownToggle tag='div' onClick={e => e.preventDefault()}>
          <Edit size={20} className="cursor-pointer ml-2" />

        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem tag='a' onClick={() => { setModalPersonal(true) }} >
            Komunikasi Pribadi
          </DropdownItem>
          <DropdownItem tag='a' onClick={() => { setModalGroup(true) }}>
            Komunikasi Group
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
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
          member_id: [id, localStorage.getItem('uuid')]
        }
      };
      chatSocket.send(JSON.stringify(val));
      setModalPersonal(false);
    }
  };

  const onSelectGroup = (formValues) => {    
    if (formValues.length <= 1) {
      CustomToast('danger','Jumlah kontak harus lebih dari 1.');
    } else if(groupName == ""){
      CustomToast('danger','Nama Group Tidak Boleh Kosong');
    }else {
      if (chatSocket != null) {

        formValues.push(localStorage.getItem('uuid'));

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

  // ** Handles Filter
  const handleFilter = e => {
    setQuery(e.target.value)
    const searchFilterFunction = room => room.name.toLowerCase().includes(e.target.value.toLowerCase())
    const filteredRoomArr = room.filter(searchFilterFunction)
    setFilteredChat([...filteredRoomArr])
  }

  return (
    <div className='sidebar-left'>
      <div className='sidebar'>
        <div
          className={classnames('chat-profile-sidebar', {
            show: userSidebarLeft
          })}
        >
          {/* archive Message */}
          <ArchiveMessage
            userProfile={userProfile}
            handleUserSidebarLeft={handleUserSidebarLeft}
            handleUserSidebarRight={handleUserSidebarRight} />

          {/* modal select single user */}
          <SelectSingleUser
            show={modalPersonal}
            setShow={(par) => setModalPersonal(par)}
            title="Komunikasi Baru"
            onSelect={(user) => onSelectPersonal(user.uuid)} />

          {/* modal new chat group */}
          <SelectMultipleUser
            show={modalGroup}
            setShow={(par) => setModalGroup(par)}
            title="Buat Group"
            titleButton="Selesai"
            onSelect={(par) => { onSelectGroup(par) }}>

            <FormGroup>
              <Label> Nama Group</Label>
              <Input
                type="text"
                onChange={(e) => setGroupName(e.target.value)}
              />
            </FormGroup>

          </SelectMultipleUser>
        </div>
        <div
          className={classnames('sidebar-content', {
            show: sidebar === true
          })}
        >
          {/* header */}
          <div className='p-1 d-flex justify-content-between'>
            <h4 className='mb-0'>Komunikasi</h4>
            <div className='d-flex'>
              <Home size="20" className='cursor-pointer' onClick={() => { history.push("/beranda") }} />
              <Archive size="20" className='ml-2 cursor-pointer' onClick={handleUserSidebarLeft} />
              {dropdownNewMessage()}
            </div>
          </div>

          {/* user Profile */}
          <div className='chat-fixed-search'>
            <div className='d-flex align-items-center w-100'>
              <div className='sidebar-profile-toggle' >
                <Avatar
                  onError={fallbackImage_}
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
          <PerfectScrollbar className='chat-user-list-wrapper list-group mt-1' options={{ wheelPropagation: false }}>
            <ul className='chat-users-list chat-list media-list'>
              <ItemRoom
                room={room}
                query={query}
                roomSelected={roomSelected}
                filteredRoom={filteredRoom}
                handleUserSidebarRight={handleUserSidebarRight} />
            </ul>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  )
}

export default SidebarLeft
