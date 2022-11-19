// ** React Imports
import { Fragment } from 'react'

// ** Dropdowns Imports
import UserDropdown                 from './UserDropdown'
import NavbarSearch                 from './NavbarSearch'
import NotificationDropdown         from './NotificationDropdown';
import BroadcastDropdown            from './BroadcastDropdown';
import MessageDropdown              from './MessageDropdown';
import FaqDropdown                  from './FaqDropdown';
import { Home }               		from 'react-feather';
import { Button } 					from 'reactstrap';

// ** Context
import IncomingCall from './IncomingCall';

const ThemeNavbar = () => {
	
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
