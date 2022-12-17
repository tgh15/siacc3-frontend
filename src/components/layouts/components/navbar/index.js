// ** React Imports
import { Fragment } from 'react'

// ** Dropdowns Imports
import UserDropdown                 from './UserDropdown'
import NavbarSearch                 from './NavbarSearch'
import NotificationDropdown         from './NotificationDropdown';
import BroadcastDropdown            from './BroadcastDropdown';
import MessageDropdown              from './MessageDropdown';
import FaqDropdown                  from './FaqDropdown';
import { Home, Disc, Circle, Menu }               		from 'react-feather';
import { Button, NavItem } 					from 'reactstrap';

// ** Context
import IncomingCall from './IncomingCall';
import { NavLink } from 'react-router-dom';

const ThemeNavbar = ({setMenuVisibility, skin, setSkin,menuCollapsed, setMenuCollapsed}) => {
	
	const Toggler = () => {
		if (!menuCollapsed) {
		  return (
			<Disc
			  size={20}
			  data-tour='toggle-icon'
			  className='text-primary toggle-icon d-block d-xl-none'
			  onClick={() => setMenuCollapsed(true)}
			/>
		  )
		} else {
		  return (
			<Circle
			  size={20}
			  data-tour='toggle-icon'
			  className='text-primary toggle-icon d-block d-xl-none'
			  onClick={() => setMenuCollapsed(false)}
			/>
		  )
		}
	  }

	return (
		<Fragment>
			<div className='bookmark-wrapper d-flex align-items-center'>

				{
					location.pathname == '/profile' ?
						<Button color='flat' onClick={() => window.location.href = '/beranda'}>
							<Home/>
						</Button>
					:
						null
				}

				<Menu className='ficon menu-toggle hidden-xs is-active'onClick={() => setMenuVisibility(true)} />

				{/* <NavbarBookmarks setMenuVisibility={setMenuVisibility} /> */}
				<NavbarSearch 
					setMenuVisibility={setMenuVisibility}
					skin={skin}
					setSkin={setSkin}
					menuCollapsed={menuCollapsed}
					setMenuCollapsed={setMenuCollapsed}
				/>
			</div>
			<ul className='nav navbar-nav align-items-center ml-auto'>
				{
					location.pathname != "/chats" ? 
						<MessageDropdown /> 
					: 
						null
				}
				{
					location.pathname != "/notification" ? 
						<NotificationDropdown /> 
					: 
						null
				}
				<BroadcastDropdown />
				<FaqDropdown/>
				<UserDropdown />
			</ul>

			<IncomingCall />

			

		</Fragment>
	)

}

export default ThemeNavbar
