import { 
    useRef, 
    Fragment, 
    useState,
    useEffect, 
    useContext, 
} from 'react';

import { Row, Col, UncontrolledTooltip }     from 'reactstrap';
import { ShepherdTour, ShepherdTourContext } from 'react-shepherd';

//Css
import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//Icon
import { HelpCircle }                        from 'react-feather';

//Views
import UserActivity                          from './UserActivity';

//Helper
import Helper                                from '../../../helpers';

const backBtnClass  = 'btn btn-sm btn-outline-primary', nextBtnClass = 'btn btn-sm btn-primary btn-next'
let instance        = null;


const stepsIndex = [
    {
        id          : 'activity-table',
        title       : 'Tabel Aktivitas Pengguna',
        text        : 'Tampilan tabel aktivitas pengguna',
        attachTo    : { element: '#activity-table', on: 'top' },
        cancelIcon  : {
            enabled : true
        },
        buttons: [
            {
                action  : () => instance.cancel(),
                classes : backBtnClass,
                text    : 'Skip'
            },
            {
                text    : 'Next',
                classes : nextBtnClass,
                action  : () => instance.next()
            }
        ]
    },
    {
        id          : 'filter-data',
        title       : 'Filter Data Aktivitas Pengguna',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan filter data aktifitas pengguna',
        attachTo    : { element: '#filter-data', on: 'right' },
        cancelIcon  : {
            enabled : true
        },
        buttons: [
            {
                text    : 'Skip',
                classes : backBtnClass,
                action  : () => instance.cancel()
            },
            {
                text    : 'Back',
                classes : backBtnClass,
                action  : () => instance.back()
            },
            {
                text    : 'Next',
                classes : nextBtnClass,
                action  : () => instance.next()
            }
        ]
    },
    {
        id          : 'search-data',
        title       : 'Pencarian Data Aktivitas Pengguna',
        text        : 'Masukkan data yang ingin dicari, kemudian tekan tombol enter pada keyboard',
        attachTo    : { element: '#search-data', on: 'right' },
        cancelIcon  : {
            enabled : true
        },
        buttons: [
            {
                text    : 'Back',
                classes : backBtnClass,
                action  : () => instance.back()
            },
            {
                text    : 'Finish',
                classes : nextBtnClass,
                action  : () => instance.cancel()
            }
        ]
    }
];

const stepsFilter = [
    {
        id          : 'filter-data',
        title       : 'Filter Data Aktivitas Pengguna',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan filter data aktifitas pengguna',
        attachTo    : { element: '#filter-data', on: 'right' },
        cancelIcon  : {
            enabled : true
        },
        buttons: [
            {
                text    : 'Cancel',
                classes : backBtnClass,
                action  : () => instance.cancel()
            },
            {
                text    : 'Finish',
                classes : nextBtnClass,
                action  : () => instance.cancel()
            }
        ]
    }
];

const stepsSearch = [
    {
        id          : 'search-data',
        title       : 'Pencarian Data Aktivitas Pengguna',
        text        : 'Masukkan data yang ingin dicari, kemudian tekan tombol enter pada keyboard',
        attachTo    : { element: '#search-data', on: 'right' },
        cancelIcon  : {
            enabled : true
        },
        buttons: [
            {
                text    : 'Cancel',
                classes : backBtnClass,
                action  : () => instance.cancel()
            },
            {
                text    : 'Finish',
                classes : nextBtnClass,
                action  : () => instance.cancel()
            }
        ]
    }
];


const StartTour = ({ showAction }) => {
    const {useQuery} = Helper;

    let query        = useQuery();
    let buttonRef    = useRef(null);

    const tour       = useContext(ShepherdTourContext);
    instance         = tour;

    useEffect(() => {
        setTimeout(() => {
            if (query.get('mode') === 'tour' && query.get('action') === showAction) {
                if(buttonRef.current != null){
                    buttonRef.current.click();
                }
            }
        }, 1000);
    }, [showAction]);

    return (
        <Fragment>
            <div style={{ cursor: 'pointer' }}>
                <p 
                    id      = 'positionRight' 
                    ref     = {buttonRef}
                    style   = {{ zIndex: '3' }}
                    onClick = {tour.start}
                >
                    {
                        query.get('mode') === 'tour' ?
                            <div style={{ border: '1px solid red', borderRadius: '8px', padding: '6px', color: 'red' }}>
                                <HelpCircle/> MODE TOUR
                            </div>
                        :
                            <HelpCircle/>
                    }
                </p>
            </div>
            <UncontrolledTooltip 
                target      = 'positionRight'
                placement   = 'right' 
            >
                Silahkan klik untuk melihat cara penggunaan menu aktivitas pengguna
            </UncontrolledTooltip>
        </Fragment>
    );
};

const TourComponent = () => {
    //State
    const [showAction, setShowAction] = useState(null);

    return (
        <Fragment>
            <Row>
                <Col 
                    md = '12' 
                    sm = '12'
                    className = "d-flex justify-content-end"
                >
                    <ShepherdTour
                        steps={
                            showAction === 'filter' ?
                                stepsFilter 
                            :
                                showAction === 'search' ?
                                    stepsSearch
                                :
                                    stepsIndex
                        }
                    >
                        <StartTour showAction={showAction}/>
                    </ShepherdTour>
                </Col>
                <Col 
                    md = '12' 
                    sm = '12'
                >
                    <UserActivity setShowAction={setShowAction}/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourComponent;