import { Fragment, useContext }                 from 'react';
import { Row, Col, UncontrolledTooltip }        from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }    from 'react-shepherd';

import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//icon
import { HelpCircle }                           from 'react-feather';

//Views
import Restrict                                 from './Restrict';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;

const steps = [
    {
        id          : 'restrict-table',
        title       : 'Tabel Restrict-IP',
        text        : 'Tampilan tabel Restrict-IP',
        attachTo    : { element: '#restrict-table', on: 'bottom' },
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
        id          : 'add-data',
        title       : 'Tambah Data Restrict-IP',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan tambah data Restrict-IP',
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
        id          : 'restrict-update',
        title       : 'Ubah Data Restrict-IP',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan ubah data Restrict-IP',
        attachTo    : { element: '#restrict-update', on: 'left' },
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
        id          : 'restrict-delete',
        title       : 'Hapus Data Restrict-IP',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan hapus data Restrict-IP',
        attachTo    : { element: '#restrict-delete', on: 'left' },
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
            <div style={{cursor: 'pointer', float: 'right', marginRight: '25px'}}>
                <p 
                    id      = 'positionRight' 
                    style   = {{zIndex: '3', position: 'absolute'}}
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
                Silahkan klik untuk melihat cara penggunaan menu restrict-ip
            </UncontrolledTooltip>
        </Fragment>
    );
};

const TourComponent = () => {
    return (
        <Fragment>
            <Row>
                <Col md='12' sm='12'>
                <ShepherdTour
                    steps = {steps}
                    tourOptions = {{
                        useModalOverlay: true
                    }}
                >
                    <StartTour/>
                </ShepherdTour>
                </Col>
                <Col md='12' sm='12'>
                    <Restrict/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourComponent;