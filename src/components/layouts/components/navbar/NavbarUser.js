// ** Dropdowns Imports
import { Fragment } from 'react'

import UserDropdown from './UserDropdown'

// ** Third Party Components
import { Sun, Moon } from 'react-feather';
import NotificationDropdown from './NotificationDropdown';

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <Fragment>
      
      <ul className='nav navbar-nav align-items-center ml-auto'>
        <NotificationDropdown />  
        <UserDropdown />

      </ul>
    </Fragment>
  )
}
export default NavbarUser
