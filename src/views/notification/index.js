	import { Fragment, useState, useEffect } 	from 'react'
	import { Row, Col, TabContent, TabPane} 	from 'reactstrap'

	import '@styles/react/libs/flatpickr/flatpickr.scss'
	import '@styles/react/pages/page-account-settings.scss'

	import List 							from './list'
	import Sidebar 							from './Sidebar'
	import Spinner 							from 'reactstrap/lib/Spinner'
	import InfiniteScroll 					from 'react-infinite-scroll-component'
	import NotificationApi 					from '../../services/pages/notification/index'

	const AccountSettings = () => {
		const [next, setNext] 				= useState(0);
		const [data, setData] 				= useState([]);
		const [activeTab, setActiveTab] 	= useState('1');
		const [filterData, setFilterData]	= useState(null);
		const [pageCurrent, setPageCurrent] = useState(1);

		const toggleTab = tab => {
			setActiveTab(tab)
		}

		const getNotification = (page) => {
			NotificationApi.getNotification(page).then(
			res => {
				if (data.length > 0) {
					let datas_ = data == null ? [] : [...data];

					res.data.map((data) => (
						datas_.push(data)
					));
					
					setData([...datas_]);
					setFilterData([...datas_]);

					setNext(res.data.is_next);
				} else {
					setData(res.data)
				}
			}, 
			err => {
				console.log(err)
			})
		}

		const getFilterNotification = (filter) => {


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

			let filter_ = [];
			
			if(data.length > 0 ){
				if(filter === 'top_ranking'){
					filter_ = data.filter((data) => (
						data.notification.kind === 'top_ranking'
					))
				}

				if(filter === 'achievement_new_event'){
					filter_ = data.filter((data) => (
						data.notification.kind === 'achievement_new_event'
					))
				}

				if(filter === 'new_agent_report'){
					filter_ = data.filter((data) => (
						data.notification.kind === 'new_agent_report'
					))
				}
			}

		}

		useEffect(() => {
			getNotification(pageCurrent)
		}, [])

		return (
			<Fragment>
			<Row>
				<Col className='mb-2 mb-md-0' md='3'>
					<Sidebar 
						activeTab ={activeTab} 
						toggleTab = {toggleTab} 
					/>
				</Col>
				<Col md='9'>
					<InfiniteScroll
						next        = {() => { getNotification(pageCurrent + 1); setPageCurrent(pageCurrent + 1) }}
						style       = {{ overflowX: 'hidden' }}
						loader      = {next ? <p style={{ textAlign: "center" }}> <Spinner /> </p> : null}
						hasMore     = {next}
						dataLength  = {data.length}
					>
						<TabContent activeTab={activeTab}>
							<TabPane tabId='1'>
								<List datas={filterData} />
							</TabPane>
						</TabContent>
					</InfiniteScroll>
				</Col>
			</Row>
			</Fragment>
		)
	}

	export default AccountSettings
