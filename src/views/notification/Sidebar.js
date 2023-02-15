import { 
	Nav, 
	Card, 
	NavItem, 
	NavLink, 
	CardBody 
} 									from 'reactstrap'
import { useHistory } 				from 'react-router-dom';

import { Home } 					from 'react-feather'
import './index.scss'
const Tabs = ({ activeTab, toggleTab }) => {

	const history = useHistory();

	// top_ranking
	// achievement_new_event
	// new_agent_report
	// agent_report_forward
	// agent_report_archive
	// new_comment
	// draft_warning
	// draft_delete
	// new_rating
	// report_created
	// new_trophy
	// agent_report_publish
	// agent_report_selected
	// automation_run
	// automation_report
	// achievement_got
	// request_reset_device
	// new_message
	// new_broadcast
	// virus_file
	// storage_full
	// mobile_new_apk

	return (
		<Card className='notification-nav'>
			<CardBody>
				<Nav pills vertical>
					<NavItem>
						<NavLink onClick={() => history.push('/beranda')}>
							<Home 
								size		= {18} 
								className	= 'mr-1' 
							/>
							<span className='font-weight-bold'>Beranda</span>
						</NavLink>
						<NavLink
							active	= {activeTab === '1'} 
							onClick	= {() => toggleTab('1')}
						>
							<span className='font-weight-bold'>
								Semua Notifikasi
							</span>
						</NavLink>
						<NavLink
							active	= {activeTab === '2'} 
							onClick	= {() => toggleTab('2')}
						>
							<span className='font-weight-bold'>
								Berita Baru
							</span>
						</NavLink>
					</NavItem>
				</Nav>
			</CardBody>
		</Card>
	)
}

export default Tabs
