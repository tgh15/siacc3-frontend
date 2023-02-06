// ** React Imports
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { User, Power, Download } from 'react-feather'

// ** Default Avatar Image
import AuthService from '../../../../services/pages/authentication/AuthService'
import CustomToast from '../../../widgets/custom-toast'

import { useHistory } from "react-router-dom";

import DownloadMobile from './DownloadMobile'
import agentProfileAPI from '../../../../services/pages/profile/url'

import Helper from '../../../../helpers'


const UserDropdown = () => {
  const { fallbackImage_ } = Helper

  const [basicModal, setBasicModal]             = useState(false);
  const [downloadData, setDownloadData]         = useState(null);
  const [downloadDataLite, setDownloadDataLite] = useState(null);
  
  let history = useHistory();

  // ** State
  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }

  }, [])

  const handleLogout = () => {
    AuthService.logout({
      token     : localStorage.getItem("token"),
      onSuccess : () => {
        localStorage.clear()
        history.push("/login");
      },
      onFail    : () => {
        localStorage.clear()

        history.push("/login");
      }
    });
  }

  const getData = () => {
    agentProfileAPI.getDownloadData(window.location.protocol+'//'+window.location.hostname+'/mobile/download?type=FULL').then(
        res => {
            if(!res.is_error){
              if(res.status === 200 && res.data != null){
                  setDownloadData(res.data);
                  setBasicModal(true);
              }
            }else{
              CustomToast("danger", res.message)
            }
        },
        err => {
          CustomToast("danger", err.message)
        }
    )

    agentProfileAPI.getDownloadData(window.location.protocol+'//'+window.location.hostname+'/mobile/download?type=LITE').then(
        res => {
            if(!res.is_error){
              if(res.status === 200 && res.data != null){
                  setDownloadDataLite(res.data);
                  setBasicModal(true);
              }
            }else{
              CustomToast("danger", res.message)
            }
        },
        err => {
          CustomToast("danger", err)
        }
    )
};  

  //** Vars
  const userAvatar = (userData && userData.photo) || `https://ui-avatars.com/api/?name=${ userData ? userData["name"] : "UN"}&background=4e73df&color=fff&bold=true`

  return (
    <UncontrolledDropdown 
      id          = {'header_user'}
      tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name font-weight-bold text-capitalize' >{(userData && userData['name']) || ''}</span>
        </div>
        <Avatar img={userAvatar} onError={fallbackImage_} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      
      <DropdownMenu right>
        <DropdownItem 
          id          = {'header_profile'}
          to          = '/profile' 
          tag         = {Link} 
        >
          <User size={14} className='mr-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>

        <DownloadMobile
          basicModal        = {basicModal}
          downloadData      = {downloadData}
          setBasicModal     = {setBasicModal}
          downloadDataLite  = {downloadDataLite}
        />

        <DropdownItem 
          id      = {'header_download_apk'}
          tag     = {Link} 
          onClick = {getData}
        >
          <Download size={14} className='mr-75'/>
          <span className='align-middle'>Download APK</span>
        </DropdownItem>

        <DropdownItem 
          id          = {'header_logout'}
          tag         = {Link} 
          onClick     ={handleLogout} 
        >
          <Power size={14} className='mr-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
