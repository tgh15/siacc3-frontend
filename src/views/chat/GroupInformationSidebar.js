// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { X, Mail, PhoneCall, Clock, Tag, Star, Image, Trash, Slash, Search, MoreVertical, UserCheck, UserX } from 'react-feather'
import Input from 'reactstrap/lib/Input'
import { DropdownItem, DropdownMenu, DropdownToggle, InputGroup, InputGroupAddon, InputGroupText, UncontrolledDropdown } from 'reactstrap'
import Button from 'reactstrap/lib/Button'
import { Fragment, useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../context/ChatContext'
import Helper from '../../helpers'
import SelectMultipleUser from '../../components/widgets/select-multiple-user'
import ChatApi from '../../services/pages/chat'
import CustomToast from '../../components/widgets/custom-toast'



const GroupInformationSidebar = props => {
  // ** Props
  const { user, handleUserSidebarRight, userSidebarRight } = props
  // context
  const { members, memberAdmins, roomSelected, setMembers, setMemberAdmins } = useContext(ChatContext)

  const [addMember, setAddMember] = useState(false)
  const [query, setQuery] = useState("")
  const [filteredMember, setFilteredMember] = useState([])

  // helper
  const { fallbackImage_ } = Helper



  // func add member
  const AddMember = val => {
    setMembers([])
    setMemberAdmins([])

    let data = {
      id: roomSelected.id,
      member_id: val
    }
    ChatApi.addUserToRoom({
      datas: data,
      onSuccess: (res) => {
        setAddMember(false)
        CustomToast("success", "Berhasil Menambahkan Anggota")
        setMemberAdmins(res.admins)
        setMembers(res.member)
      },
      onFail: (err) => {
        console.log(err)
      }
    })
  }

  const RemoveMemberFromRoom = val => {
    setMembers([])
    setMemberAdmins([])

    let data = {
      id: roomSelected.id,
      member_id: [val]
    }
    ChatApi.removeMemberFromRoom({
      datas: data,
      onSuccess: (res) => {
        setAddMember(false)
        CustomToast("success", "Member Berhasil Dikeluarkan")
        setMemberAdmins(res.admins)
        setMembers(res.member)
      },
      onFail: (err) => {
        console.log(err)
      }
    })
  }

  const ChangeAdmin = (id, type) => {
    setMembers([])
    setMemberAdmins([])

    let admins_id = Array.from(memberAdmins, member => member.uuid)
    if (type == "add") {
      admins_id.push(id)
    }
    // else if(type == "remove"){
    //   admins_id = admins_id.filter(adm => adm != id);
    // }


    let data = {
      id: roomSelected.id,
      admins_id: admins_id
    }


    ChatApi.changeAdmin({
      datas: data,
      onSuccess: (res) => {
        setAddMember(false)
        // CustomToast("success", "Berhasil")
        setMemberAdmins(res.admins)
        setMembers(res.member)
      },
      onFail: (err) => {
        console.log(err)
      }
    })
  }

  const handleFilter = e => {

    setQuery(e.target.value)
    const searchFilterFunction = members => members.name.toLowerCase().includes(e.target.value.toLowerCase())
    const filteredMember = members.filter(searchFilterFunction)
    setFilteredMember([...filteredMember])
  }

  const checkAdmin = uuid => {
    return memberAdmins && memberAdmins.filter(opt => opt.uuid == uuid).length > 0 ? true : false;
  }
  
  // ** Renders user chat
  const renderMember = () => {

    const arrToMap = query.length && filteredMember.length ? filteredMember : members
    return arrToMap.map((member, index) => {
      return (
        <div
          className='d-flex justify-content-between py-1 px-2'
          style={{ width: "100%" }}
        >
          <div className='d-flex'>
            <Avatar
              onError={fallbackImage_}
              img={member.avatar}
              style={{ backgroundColor: "transparent" }}
            />

            <div className='ml-1' style={{ margin: "auto 0px" }}>
              {member.name}<br />
              {checkAdmin(member.uuid) ?
                <span className='text-danger' style={{ fontSize: "0.8rem" }}>Admin</span>
                : null}
            </div>
          </div>
          <div style={{ margin: "auto 0px" }}>
          {checkAdmin(Helper.getUserData().uuid) ?
            <UncontrolledDropdown >
              <DropdownToggle tag='div' className="cursor-pointer" onClick={e => e.preventDefault()}>
                <MoreVertical size={20} />
              </DropdownToggle>
              <DropdownMenu right >

                {!checkAdmin(member.uuid) && checkAdmin(Helper.getUserData().uuid) ?
                  <DropdownItem style={{ width: "100%" }} onClick={() => { ChangeAdmin(member.uuid, "add") }}>
                    <UserCheck size={18} /> {' '} Jadikan Admin
                  </DropdownItem>
                  :
                  null
                }
                <DropdownItem style={{ width: "100%" }} onClick={() => { RemoveMemberFromRoom(member.uuid) }}>
                  <UserX size={18} />{' '} Keluarkan Dari Group
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> : null}

          </div>
        </div>
      )
    })
  }

  return (
    <Fragment>
      {/* modal add member */}
      <SelectMultipleUser
        show={addMember}
        setShow={(par) => { setAddMember(par) }}
        title="Tambah Anggota"
        titleButton="Tambahkan"
        onSelect={(val) => AddMember(val)} />


      {/* group information sidebar */}
      <div className={classnames('user-profile-sidebar', { show: userSidebarRight === true })}>
        <header className="p-1">
          <div className='close-icon' onClick={handleUserSidebarRight}>
            <X size={14} />
          </div>
          <div>
            <h4>Informasi Group </h4>
          </div>

        </header>
        <hr className='m-0 mb-1' />
        <div className='d-flex flex-column'>
          <h6 className='section-label px-1'>{members && members.length} Anggota Group</h6>
          <InputGroup className='input-group-merge px-1'>
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
          <Button color="primary" className="mt-1 mx-1" onClick={() => setAddMember(true)}>
            Tambah Anggota
          </Button>
        </div>

        <div className='chat-user-list-wrapper list-group mt-2' options={{ wheelPropagation: false }}>
          <div className='chat-users-list chat-list media-list' style={{ marginLeft: "0px !important" }}>
            <PerfectScrollbar style={{ maxHeight: "28em", minHeight: "28em" }}>
              {renderMember()}
            </PerfectScrollbar></div>
        </div>

      </div>
    </Fragment>
  )
}

export default GroupInformationSidebar
