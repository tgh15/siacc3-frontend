import { 
    useRef, 
    Fragment, 
    useState, 
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
import UnitWork                                 from './UnitWork';

//Helper
import Helper                                   from '../../../helpers';

//Services
import selfLearningURL                          from '../../../services/pages/helpdesk/self-learning';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;


const stepsIndex = [
    {
        id          : 'workunit-table',
        title       : 'Tabel Unit Kerja',
        text        : 'Tampilan tabel unit kerja',
        attachTo    : { element: '#workunit-table', on: 'top' },
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
        title       : 'Pencarian Data Unit Kerja',
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
        title       : 'Tambah Data Unit Kerja',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan tambah data unit kerja',
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
        id          : 'update-workunit',
        title       : 'Ubah Data Unit Kerja',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan ubah data unit kerja',
        attachTo    : { element: '#update-workunit', on: 'left' },
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
        id          : 'delete-workunit',
        title       : 'Hapus Data Unit Kerja',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan hapus data unit kerja',
        attachTo    : { element: '#delete-workunit', on: 'left' },
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

const stepsSearch = [
    {
        id          : 'search-data',
        title       : 'Pencarian Data Unit Kerja',
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

const stepsDelete = [
    {
        id          : 'delete-workunit',
        title       : 'Hapus Data Unit Kerja',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan hapus data unit kerja',
        attachTo    : { element: '#delete-workunit', on: 'left' },
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

const stepsCreate = [
    {
        id          : 'add-data',
        title       : 'Tambah Data Unit Kerja',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan tambah data unit kerja',
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

const stepsUpdate = [
    {
        id          : 'update-workunit',
        title       : 'Ubah Data Unit Kerja',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan ubah data unit kerja',
        attachTo    : { element: '#update-workunit', on: 'left' },
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

    useEffect(() => {
        if(query.get("mode") === "tour" && query.get("action") === 'get'){

            const formData = {
                id       : parseInt(query.get("moduleId")),
                is_done  : true,
            }
            selfLearningURL.updateUserModul(formData);
        }
    }, []);

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
                Silahkan klik untuk melihat cara penggunaan menu unit kerja
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
                                stepsSearch 
                            : 
                                showAction === 'delete' ?
                                    stepsDelete
                                :
                                    showAction === 'create' ?
                                        stepsCreate
                                    :
                                        showAction === 'update' ?
                                            stepsUpdate
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
                    <UnitWork setShowAction={setShowAction}/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourComponent;