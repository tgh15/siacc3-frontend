import {
    useRef,
    useState, 
    Fragment, 
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

//Helper
import Helper                                from '../../../helpers';

//Components
import WorkUnitList                          from './WorkUnitList';
import { PerformanceProvider }               from '../../../context/PerformanceContext';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;


const stepsIndex = [
    {
        id          : 'workunit-list-table',
        title       : 'Tabel Daftar Satker',
        text        : 'Tampilan tabel daftar satker',
        attachTo    : { element: '#workunit-list-table', on: 'top' },
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
        title       : 'Filter Data',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan filter daftar satker terbaru dan terlama',
        attachTo    : { element: '#filter-data', on: 'bottom' },
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
        id          : 'filter-satker',
        title       : 'Filter Daftar Satker',
        text        : 'Klik salah satu tombol untuk menampilkan data sesuai tombil yang dipilih',
        attachTo    : { element: '#filter-satker', on: 'bottom' },
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
        title       : 'Pencarian Daftar Satker',
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
        id          : 'map-satker',
        title       : 'MAP Daftar Satker',
        text        : 'Tampilan data MAP semua satuan kerja, klik satah satu icon lokasi untuk melihat data detail satuan kerja',
        attachTo    : { element: '#map-satker', on: 'bottom' },
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
        title       : 'Tambah Daftar Satker',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan tambah daftar satker',
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
        id          : 'position-view',
        title       : 'Detail Daftar Satker',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan detail daftar satker',
        attachTo    : { element: '#position-view', on: 'left' },
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
        id          : 'position-update',
        title       : 'Ubah Daftar Satker',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan ubah daftar satker',
        attachTo    : { element: '#position-update', on: 'left' },
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
        id          : 'position-delete',
        title       : 'Hapus Daftar Satker',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan hapus daftar satker',
        attachTo    : { element: '#position-delete', on: 'left' },
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
        title       : 'Filter Daftar Satker',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan filter daftar satker terbaru dan terlama',
        attachTo    : { element: '#filter-data', on: 'bottom' },
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
        title       : 'Pencarian Daftar Satker',
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
        title       : 'Tambah Daftar Satker',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan tambah daftar satker',
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
        id          : 'position-view',
        title       : 'Detail Daftar Satker',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan detail daftar satker',
        attachTo    : { element: '#position-view', on: 'left' },
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
        id          : 'position-update',
        title       : 'Ubah Daftar Satker',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan ubah daftar satker',
        attachTo    : { element: '#position-update', on: 'left' },
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
        id          : 'position-delete',
        title       : 'Hapus Daftar Satker',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan hapus daftar satker',
        attachTo    : { element: '#position-delete', on: 'left' },
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
            <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'end' }}>
                <p 
                    id      = 'positionLeft' 
                    ref     = {buttonRef}
                    style   = {{ zIndex: '3', position: 'absolute', margin: '407px 160px 0 0' }}
                    onClick = {tour.start}
                >
                    {
                        query.get('mode') === 'tour' ?
                            <div style={{ border: '1px solid red', borderRadius: '8px', padding: '6px', color: 'red', marginTop: '-6px' }}>
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
                Silahkan klik untuk melihat cara penggunaan menu daftar satker
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
                                showAction === 'delete' ?
                                    stepsIndexDelete
                                :
                                    showAction === 'create' ?
                                        stepsIndexCreate
                                    :
                                        showAction === 'update' ?
                                            stepsIndexUpdate
                                        :
                                            showAction === 'detail' ?
                                                stepsIndexDetail
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
                    <PerformanceProvider>
                        <WorkUnitList setShowAction={setShowAction}/>
                    </PerformanceProvider>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourComponent;