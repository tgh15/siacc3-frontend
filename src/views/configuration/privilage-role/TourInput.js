import { Fragment, useContext }                 from 'react';
import { Row, Col, UncontrolledTooltip }        from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }    from 'react-shepherd';

import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//Icon
import { HelpCircle }                           from 'react-feather';

//Views


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;

const steps = [
    {
        id          : 'privilege-name',
        title       : 'Nama Privilage',
        text        : 'Klik dan masukkan nama privilage',
        attachTo    : { element: '#privilege-name', on: 'bottom' },
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
        id          : 'privilege-templates',
        title       : 'Template',
        text        : 'Klik untuk memilih data template, maka akan muncul menu atau fitur yang bisa diakses',
        attachTo    : { element: '#privilege-templates', on: 'top' },
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
        id          : 'batal-input',
        title       : 'Batalkan Inputan Privilage',
        text        : 'Klik untuk batalkan penginputan data privilage',
        attachTo    : { element: '#batal-input', on: 'top' },
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
        id          : 'submit-input',
        title       : 'Simpan Data Privilage',
        text        : 'Klik untuk melakukan penyimpanan data yang telah diinput',
        attachTo    : { element: '#submit-input', on: 'top' },
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
                Silahkan klik untuk melihat cara penggunaan proses penginputan data
            </UncontrolledTooltip>
        </Fragment>
    );
};

const TourComponent = (props) => {
    return (
        <Fragment>
            <Row>
                <Col 
                    md = '12' 
                    sm = '12'
                >
                    <ShepherdTour
                        steps = {steps}
                        tourOptions = {{
                            useModalOverlay: true
                        }}
                    >
                        <StartTour/>
                    </ShepherdTour>
                </Col>
                <Col 
                    md= '12' 
                    sm = '12'
                >
                    
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourComponent;