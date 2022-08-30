// ** React Imports
import { Fragment } from 'react'

// ** Dropdowns Imports
import UserDropdown                 from './UserDropdown'
import NavbarSearch                 from './NavbarSearch'
import NotificationDropdown         from './NotificationDropdown';
import BroadcastDropdown            from './BroadcastDropdown';
import MessageDropdown              from './MessageDropdown';
import FaqDropdown                  from './FaqDropdown';
import { Menu, Home }               from 'react-feather';
import { Button, NavItem, NavLink } from 'reactstrap';
import { useLocation, matchPath }   from 'react-router-dom';
import { ModalBase }                from '../../../widgets/modals-base';

// ** Context
import { ChatContext } 				from '../../../../context/ChatContext';
import IncomingCall from './IncomingCall';

const ThemeNavbar = props => {
	// ** Props
	const { setMenuVisibility } 				= props
	
	return (
		<Fragment>
			<div className='bookmark-wrapper d-flex align-items-center'>
				<ul className='navbar-nav d-xl-none d-flex align-items-center'>
					<NavItem className='mobile-menu mr-auto'>
						<NavLink 
							onClick		= {() => setMenuVisibility(true)}
							className	= 'nav-menu-main menu-toggle hidden-xs is-active' 
						>
							<Menu className='ficon ' />
						</NavLink>
					</NavItem>
				</ul>

				{
					location.pathname == '/profile' ?
						<Button color='flat' onClick={() => window.location.href = '/beranda'}>
							<Home/>
						</Button>
					:
						null
				}

				{/* <NavbarBookmarks setMenuVisibility={setMenuVisibility} /> */}
				<NavbarSearch />
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
