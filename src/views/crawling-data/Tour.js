import { Fragment, useContext }                 from 'react';
import { Row, Col, UncontrolledTooltip }        from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }    from 'react-shepherd';

import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//icon
import { HelpCircle }                           from 'react-feather';

//Views
import Crawlingdata                             from './CrawlingData';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;

const steps = [
    {
        id          : 'list-crawling',
        title       : 'Daftar Crawling',
        text        : 'Daftar crawling data',
        attachTo    : { element: '#list-crawling', on: 'top' },
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
        id          : 'aksi-crawling',
        title       : 'Aksi Crawling',
        text        : 'Klik untuk memilih aksi data',
        attachTo    : { element: '#aksi-crawling', on: 'bottom' },
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
        id          : 'history-crawling',
        title       : 'Detai Riwayat Crawling',
        text        : 'Klik untuk melihat detail riwayat pencarian data crawling',
        attachTo    : { element: '#history-crawling', on: 'top' },
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
        id          : 'ekspor-crawling',
        title       : 'Export Data',
        text        : 'Klik untuk download data dari file Excel, Word dan PDF',
        attachTo    : { element: '#ekspor-crawling', on: 'right' },
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
        id          : 'create-crawling',
        title       : 'Tambah Crawling Baru',
        text        : 'Klik untuk tambah data crawling',
        attachTo    : { element: '#create-crawling', on: 'right' },
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
        id          : 'archive-crawling',
        title       : 'Daftar Arsip Data',
        text        : 'Klik untuk melihat data yang telah diarsipkan',
        attachTo    : { element: '#archive-crawling', on: 'left' },
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
        id          : 'filter-crawling',
        title       : 'Filter Data',
        text        : 'Klik untuk filter data crawling',
        attachTo    : { element: '#filter-crawling', on: 'left' },
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
            <div style={{ cursor: 'pointer', float: 'right' }}>
                <p 
                    id      = 'positionRight' 
                    style   = {{ zIndex: '3', position: 'absolute', margin: '55px 0px 0px -23px' }}
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
                Silahkan klik untuk melihat cara penggunaan menu crawling data
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
                    <Crawlingdata/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourComponent;