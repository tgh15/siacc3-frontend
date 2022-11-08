import { 
    useRef, 
    Fragment, 
    useState,
    useEffect,
    useContext, 
}  from 'react';

import { Row, Col, UncontrolledTooltip }        from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }    from 'react-shepherd';

//Css
import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//Icon
import { HelpCircle }                           from 'react-feather';

//Views
import LinkAccount                              from '.';

//Helper
import Helper                                   from '../../../helpers';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;


const stepsIndex = [
    {
        id          : 'linked-table',
        title       : 'Perangakat Tertaut',
        text        : 'Tampilan daftar perangkat yang terhubung',
        attachTo    : { element: '#linked-table', on: 'bottom' },
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
        id          : 'search-table',
        title       : 'Pencarian Perangakat',
        text        : 'Masukkan data yang ingin dicari, kemudian tekan tombol enter pada keyboard',
        attachTo    : { element: '#search-table', on: 'left' },
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
        id          : 'turn-off-device',
        title       : 'Putuskan Perangkat',
        text        : 'Klik tombol ini untuk memutuskan perangkat yang terhubung',
        attachTo    : { element: '#turn-off-device', on: 'left' },
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
        id          : 'history-linked',
        title       : 'History Perangkat Tertaut',
        text        : 'Tampilan daftar riwayat perangkat yang pernah terhubung',
        attachTo    : { element: '#history-linked', on: 'top' },
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
        id          : 'turn-off-history',
        title       : 'Hapus History Perangkat Tertaut',
        text        : 'Klik Checkbox untuk menghapus semua riwayat perangkat yang pernah terhubung',
        attachTo    : { element: '#turn-off-history', on: 'left' },
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
        id          : 'search-table',
        title       : 'Pencarian Perangakat',
        text        : 'Masukkan data yang ingin dicari, kemudian tekan tombol enter pada keyboard',
        attachTo    : { element: '#search-table', on: 'bottom' },
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
        id          : 'turn-off-device',
        title       : 'Putuskan Perangkat',
        text        : 'Klik tombol ini untuk memutuskan perangkat yang terhubung',
        attachTo    : { element: '#turn-off-device', on: 'left' },
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
            <div style={{ cursor: 'pointer', float: 'right' }}>
                <p 
                    id      = 'positionRight' 
                    ref     = {buttonRef}
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
                <span>
                    Silahkan klik untuk melihat cara penggunaan menu tautan akun
                </span>
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
                    <ShepherdTour
                        steps = {
                            showAction === 'search' ? 
                                stepsIndexSearch
                            :
                                showAction === 'delete' ? 
                                    stepsIndexDelete
                                :
                                    stepsIndex
                        }
                        
                        tourOptions = {{ 
                            useModalOverlay: true
                        }}                    
                    >
                        <StartTour showAction={showAction}/>
                    </ShepherdTour>
                </Col>
                <Col 
                    md = '12' 
                    sm = '12'
                >
                    <LinkAccount setShowAction={setShowAction}/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourComponent;