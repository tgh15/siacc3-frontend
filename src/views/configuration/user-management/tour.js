import { Fragment, useContext }                 from 'react';
import { Row, Col, UncontrolledTooltip }        from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }    from 'react-shepherd';

//Css
import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//Icon
import { HelpCircle }                           from 'react-feather';

//Views
import UserManagementContainer                  from './index';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;

const steps = [
    {
        id          : 'usermanajement-table',
        title       : 'Tabel Manajemen Pengguna',
        text        : 'Tampilan tabel manajemen pengguna',
        attachTo    : { element: '#usermanajement-table', on: 'top' },
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
        title       : 'Filter Data Manajemen Pengguna',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan filter data manajemen pengguna',
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
        title       : 'Pencarian Data Manajemen Pengguna',
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
        title       : 'Tambah Data Manajemen Pengguna',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan tambah data manajemen pengguna',
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
        id          : 'usermanajement-detail',
        title       : 'Detail Data Manajemen Pengguna',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan detail data manajemen pengguna',
        attachTo    : { element: '#usermanajement-detail', on: 'left' },
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
        id          : 'usermanajement-device',
        title       : 'Device Pengguna',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan device pengguna',
        attachTo    : { element: '#usermanajement-device', on: 'left' },
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
        id          : 'usermanajement-active',
        title       : 'Non Aktifkan Pengguna',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan non-aktifkan pengguna',
        attachTo    : { element: '#usermanajement-active', on: 'left' },
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
        id          : 'usermanajement-non-active',
        title       : 'Aktifkan Pengguna',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan aktifkan pengguna',
        attachTo    : { element: '#usermanajement-non-active', on: 'left' },
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
        id          : 'usermanajement-update',
        title       : 'Ubah Data Manajemen Pengguna',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan ubah data manajemen pengguna',
        attachTo    : { element: '#usermanajement-update', on: 'left' },
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
        id          : 'usermanajement-delete',
        title       : 'Hapus Data Manajemen Pengguna',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan hapus data manajemen pengguna',
        attachTo    : { element: '#usermanajement-delete', on: 'left' },
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

const StartTour = () => {
    const tour  = useContext(ShepherdTourContext);
    instance    = tour;

    return (
        <Fragment>
            <div style={{cursor: 'pointer', float: 'right'}}>
                <p 
                    id      = 'positionRight' 
                    onClick = {tour.start} 
                    outline 
                >
                    <HelpCircle/>
                </p>
            </div>
            <UncontrolledTooltip 
                target      = 'positionRight'
                placement   = 'right' 
            >
                Silahkan klik untuk melihat cara penggunaan menu Manajemen Pengguna
            </UncontrolledTooltip>
        </Fragment>
    );
};

const TourComponent = () => {
    return (
        <Fragment>
            <Row>
                <Col 
                    md = '12' 
                    sm = '12'
                >
                    <ShepherdTour
                        steps       = {steps}
                        tourOptions = {{
                            useModalOverlay: true
                        }}
                    >
                        <StartTour/>
                    </ShepherdTour>
                </Col>
                <Col 
                    md = '12' 
                    sm = '12'
                >
                    <UserManagementContainer/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourComponent;