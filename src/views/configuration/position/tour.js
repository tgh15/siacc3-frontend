import { Fragment, useContext, useState, useEffect, useRef } from 'react';
import { Row, Col, UncontrolledTooltip }        from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }    from 'react-shepherd';

//Css
import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//Icon
import { HelpCircle }                           from 'react-feather';

//Views
import Position                                 from './Position';

//Helper
import Helper                                   from '../../../helpers';

//Services
import selfLearningURL                          from '../../../services/pages/helpdesk/self-learning';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;


const stepsIndex = [
    {
        id          : 'position-table',
        title       : 'Tabel Jabatan',
        text        : 'Tampilan tabel jabatan',
        attachTo    : { element: '#position-table', on: 'top' },
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
        title       : 'Filter Data Jabatan',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan filter data jabatan',
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
        title       : 'Pencarian Data Jabatan',
        text        : 'Masukkan data yang ingin dicari, kemudian tekan tombol enter pada keyboard',
        attachTo    : { element: '#search-data', on: 'left' },
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
        title       : 'Tambah Data Jabatan',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan tambah data jabatan',
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
        id          : 'update-position',
        title       : 'Ubah Data Jabatan',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan ubah data jabatan',
        attachTo    : { element: '#update-position', on: 'left' },
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
        id          : 'delete-position',
        title       : 'Hapus Data Jabatan',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan hapus data jabatan',
        attachTo    : { element: '#delete-position', on: 'left' },
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

const stepsIndexFilter = [
    {
        id          : 'filter-data',
        title       : 'Filter Data Jabatan',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan filter data jabatan',
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

const stepsIndexSearch = [
    {
        id          : 'search-data',
        title       : 'Pencarian Data Jabatan',
        text        : 'Masukkan data yang ingin dicari, kemudian tekan tombol enter pada keyboard',
        attachTo    : { element: '#search-data', on: 'left' },
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
        title       : 'Tambah Data Jabatan',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan tambah data jabatan',
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

const stepsIndexUpdate = [
    {
        id          : 'update-position',
        title       : 'Ubah Data Jabatan',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan ubah data jabatan',
        attachTo    : { element: '#update-position', on: 'left' },
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
        id          : 'delete-position',
        title       : 'Hapus Data Jabatan',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan hapus data jabatan',
        attachTo    : { element: '#delete-position', on: 'left' },
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
        setTimeout(() => {
            if(query.get("mode") === "tour" && query.get("action") === 'get'){
                const formData = {
                    id       : parseInt(query.get("moduleId")),
                    is_done  : true,
                }
                selfLearningURL.updateUserModul(formData)
            }
        }, 2000);
    }, []);

    return (
        <Fragment>
            <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'end' }}>
                <p 
                    id      = 'positionLeft' 
                    ref     = {buttonRef}
                    style   = {{ zIndex: '3', position: 'absolute', margin: '50px 150px 0 0' }}
                    onClick = {tour.start}
                >
                    {
                        query.get('mode') === 'tour' ?
                            <div style={{ border: '1px solid red', borderRadius: '8px', padding: '6px', color: 'red', marginTop: '-3px' }}>
                                <HelpCircle/> MODE TOUR
                            </div>
                        :
                            <HelpCircle/>
                    }
                </p>
            </div>
            <UncontrolledTooltip 
                target      = 'positionLeft'
                placement   = 'left' 
            >
                Silahkan klik untuk melihat cara penggunaan menu jabatan
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
                            showAction === 'filter' ?
                                stepsIndexFilter
                            :
                                showAction === 'search' ?
                                    stepsIndexSearch
                                :
                                    showAction === 'create' ?
                                        stepsIndexCreate
                                    :
                                        showAction === 'update' ?
                                            stepsIndexUpdate
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
                    <Position setShowAction={setShowAction}/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourComponent;