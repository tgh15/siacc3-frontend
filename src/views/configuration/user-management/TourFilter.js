import { Fragment, useContext }                 from 'react';
import { Row, Col, UncontrolledTooltip }        from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }    from 'react-shepherd';

import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//icon
import { HelpCircle }                           from 'react-feather';

//Views
import ModalFilter                              from './ModalFilter';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;

const steps = [
    {
        id          : 'user-manajement-order',
        title       : 'Filter berdasarkan urutan',
        text        : 'Klik salah satu tombol Terbaru atau Terlama untuk mengurutkan data berdasarkan tombol yang dipilih',
        attachTo    : { element: '#user-manajement-order', on: 'bottom' },
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
        id          : 'user-manajement-kejati',
        title       : 'Pilih data Kejaksaan Tinggi',
        text        : 'Ketika diklik anda akan di arahkan pada pilihan data kejati',
        attachTo    : { element: '#user-manajement-kejati', on: 'bottom' },
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
        id          : 'user-manajement-kejari',
        title       : 'Pilih data Kejaksaan Negeri',
        text        : 'Ketika diklik anda akan di arahkan pada pilihan data kejari',
        attachTo    : { element: '#user-manajement-kejari', on: 'top' },
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
        id          : 'user-manajement-capjari',
        title       : 'Pilih data Cabang Kejaksaan Negeri',
        text        : 'Ketika diklik anda akan di arahkan pada pilihan data capjari',
        attachTo    : { element: '#user-manajement-capjari', on: 'top' },
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
        id          : 'user-manajement-reset',
        title       : 'Batalkan filter manajeman pengguna',
        text        : 'Klik untuk membatalkan data filter yang telah diisi',
        attachTo    : { element: '#user-manajement-reset', on: 'top' },
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
        id          : 'user-manajement-apply',
        title       : 'Terapkan filter manajeman pengguna',
        text        : 'Klik untuk menerapakan data sesuai field yang telah disi',
        attachTo    : { element: '#user-manajement-apply', on: 'top' },
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
            <div style={{cursor: 'pointer', float: 'right', margin: '0px 20px 30px 0px'}}>
                <p 
                    id      = 'positionLeft' 
                    style   = {{zIndex: '3', position: 'absolute'}}
                    onClick = {tour.start} 
                    outline 
                >
                    <HelpCircle/>
                </p>
            </div>
            <UncontrolledTooltip 
                target      = 'positionLeft'
                placement   = 'left' 
            >
                Silahkan klik untuk melihat cara penggunaan filter
            </UncontrolledTooltip>
        </Fragment>
    );
};

const TourFilter = (props) => {
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
                    <ModalFilter
                        setModalFilter = {props.setModalFilter}
                        onFilter       = {props.onFilter}
                    />
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourFilter;