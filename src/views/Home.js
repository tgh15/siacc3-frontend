import { useRef } from 'react';
import { Col } from 'reactstrap';
import { ApprovedNewsWidget, FeedsApprovedNewsCard } from '../components/widgets/feeds/feeds-approved-news';
import FileManagerWidget from '../components/widgets/file-manager';
import { LeftSidebarFileManagement } from '../components/widgets/file-manager/left-sidebar';

	const Home = () => {
	let komen = [
		{
		id:1,
		commentatorName:"John Doe",
		times:"Kemarin Pukul 12:00 WIB",
		comments:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		likeCounts:14,
		dislikeCounts:13,
		replies:[
			{
			id:1,
			commentatorName:"John Kay",
			times:"Kemarin Pukul 12:00 WIB",
			comments:"unang bet"

			}
		]
		}
	];
	
	let refs = useRef(null)
	let text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	return (
		<div className="col-12 col-md-12" ref={refs}>
		</div>
	)
	}

	export default Home
