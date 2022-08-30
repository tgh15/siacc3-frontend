import { 
    useRef,
    useState,
    Fragment,
    useEffect,
    useContext, 
} from 'react';

import { Row, Col, UncontrolledTooltip }        from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }    from 'react-shepherd';

//Css
import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//Icon
import { HelpCircle }                           from 'react-feather';

//Views
import Automatitation                           from './Automation';

//Helper
import Helper                                   from '../../../helpers';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;


const stepsIndex = [
    {
        id          : 'automation-table',
        title       : 'Tabel Automation',
        text        : 'Tampilan tabel automation',
        attachTo    : { element: '#automation-table', on: 'bottom' },
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
        id          : 'search-data',
        title       : 'Pencarian Data Automation',
        text        : 'Masukkan data yang ingin dicari, kemudian tekan tombol enter pada keyboard',
        attachTo    : { element: '#search-data', on: 'bottom' },
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
        id          : 'add-data',
        title       : 'Tambah Data Automation',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan tambah data automation',
        attachTo    : { element: '#add-data', on: 'right' },
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
        id          : 'automation-detail',
        title       : 'Detail Data Automation',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan detail data automation',
        attachTo    : { element: '#automation-detail', on: 'left' },
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
        id          : 'automation-update',
        title       : 'Ubah Data Automation',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan ubah data automation',
        attachTo    : { element: '#automation-update', on: 'left' },
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
        id          : 'automation-delete',
        title       : 'Hapus Data Automation',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan hapus data automation',
        attachTo    : { element: '#automation-delete', on: 'left' },
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

const stepsIndexSearch = [
    {
        id          : 'search-data',
        title       : 'Pencarian Data Automation',
        text        : 'Masukkan data yang ingin dicari, kemudian tekan tombol enter pada keyboard',
        attachTo    : { element: '#search-data', on: 'bottom' },
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

const stepsIndexCreate = [
    {
        id          : 'add-data',
        title       : 'Tambah Data Automation',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan tambah data automation',
        attachTo    : { element: '#add-data', on: 'right' },
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

const stepsIndexDetail = [
    {
        id          : 'automation-detail',
        title       : 'Detail Data Automation',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan detail data automation',
        attachTo    : { element: '#automation-detail', on: 'left' },
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

const stepsIndexUpdate = [
    {
        id          : 'automation-update',
        title       : 'Ubah Data Automation',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan ubah data automation',
        attachTo    : { element: '#automation-update', on: 'left' },
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

const stepsIndexDelete = [
    {
        id          : 'automation-delete',
        title       : 'Hapus Data Automation',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan hapus data automation',
        attachTo    : { element: '#automation-delete', on: 'left' },
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
                    style   = {{ zIndex: '3', position: 'absolute' }}
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
                <span>Silahkan klik untuk melihat cara penggunaan menu automation</span>
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
                >
                    <ShepherdTour steps={
                        showAction === 'search' ?
                            stepsIndexSearch
                        :
                            showAction === 'create' ?
                                stepsIndexCreate
                            :
                                showAction === 'detail' ?
                                    stepsIndexDetail
                                :
                                    showAction === 'update' ?
                                        stepsIndexUpdate
                                    :
                                        showAction === 'delete' ?
                                            stepsIndexDelete
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
                    <Automatitation setShowAction={setShowAction}/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourComponent;