// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Chat App Component Imports
import Chat from './Chat'
import Sidebar from './SidebarLeft'
import GroupInformationSidebar from './GroupInformationSidebar'

// ** Third Party Components
import classnames from 'classnames'

import '../../components/scss/base/pages/app-chat.scss'
import '../../components/scss/base/pages/app-chat-list.scss'

const AppChat = () => {
  // ** Store Vars

  // ** States
  const [user, setUser] = useState({})
  const [sidebar, setSidebar] = useState(true)
  const [userSidebarRight, setUserSidebarRight] = useState(false)
  const [userSidebarLeft, setUserSidebarLeft] = useState(false)

  // ** Sidebar & overlay toggle functions
  const handleSidebar = () => setSidebar(!sidebar)
  const handleUserSidebarLeft = () => setUserSidebarLeft(!userSidebarLeft)
  const handleUserSidebarRight = () => setUserSidebarRight(!userSidebarRight)
  const handleOverlayClick = () => {
    setSidebar(false)
  }

  // ** Set user function for Right Sidebar
  const handleUser = obj => setUser(obj)

  // ** Get data on Mount


  return (
    <Fragment>
      <Sidebar
        sidebar={sidebar}
        handleSidebar={handleSidebar}
        userSidebarLeft={userSidebarLeft}
        handleUserSidebarLeft={handleUserSidebarLeft}
        handleUserSidebarRight={handleUserSidebarRight}
      />
      <div className='content-right'>
        <div className='content-wrapper'>
          <div className='content-body'>
            <div
              className={classnames({
                show: userSidebarRight === true || sidebar === true || userSidebarLeft === true
              })}
              onClick={handleOverlayClick}
            ></div>
            <Chat
              handleUser={handleUser}
              handleSidebar={handleSidebar}
              userSidebarLeft={userSidebarLeft}
              handleUserSidebarRight={handleUserSidebarRight}
            />
            <GroupInformationSidebar
              user={user}
              userSidebarRight={userSidebarRight}
              handleUserSidebarRight={handleUserSidebarRight}
            />
          </div>
        </div>
      </div> 
    </Fragment>
  )
}

export default AppChat
