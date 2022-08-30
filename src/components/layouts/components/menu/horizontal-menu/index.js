// ** React Imports
import { useState } from 'react'

// ** Horizontal Menu Array
import navigation from '@src/components/navigation/horizontal';
import navigationHelpdesk from '@src/components/navigation/helpdesk';

// ** Horizontal Menu Components
import HorizontalNavMenuItems from './HorizontalNavMenuItems'
import { useLocation } from 'react-router-dom';

const HorizontalMenu = ({ currentActiveItem, routerProps }) => {

  let location = useLocation();
  // ** States
  const [activeItem, setActiveItem] = useState(null)
  const [groupActive, setGroupActive] = useState([])
  const [openDropdown, setOpenDropdown] = useState([])

  // ** On mouse enter push the ID to openDropdown array
  const onMouseEnter = id => {
    const arr = openDropdown
    arr.push(id)
    setOpenDropdown([...arr])
  }

  // ** On mouse leave remove the ID to openDropdown array
  const onMouseLeave = id => {
    const arr = openDropdown
    arr.splice(arr.indexOf(id), 1)
    setOpenDropdown([...arr])
  }

  return (
    <div className='navbar-container main-menu-content'>
      <ul className='nav navbar-nav' id='main-menu-navigation'>
        <HorizontalNavMenuItems
          submenu={false}
          items={location.pathname.includes("helpdesk") ? navigationHelpdesk : navigation}
          activeItem={activeItem}
          groupActive={groupActive}
          routerProps={routerProps}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          openDropdown={openDropdown}
          setActiveItem={setActiveItem}
          setGroupActive={setGroupActive}
          setOpenDropdown={setOpenDropdown}
          currentActiveItem={currentActiveItem}
        />
      </ul>
    </div>
  )
}

export default HorizontalMenu
