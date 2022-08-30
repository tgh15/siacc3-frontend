import { Fragment, useContext }                 from 'react';
import { Row, Col, UncontrolledTooltip }        from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }    from 'react-shepherd';

import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//Icon
import { HelpCircle }                           from 'react-feather';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;

const steps = [
    {
        id          : 'date-filter',
        title       : 'Tanggal',
        text        : 'Klik dan pilih tanggal',
        attachTo    : { element: '#date-filter', on: 'bottom' },
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
        id          : 'apply-draft',
        title       : 'Tampikan Draft',
        text        : 'Klik untuk menampilkan data sesuai dengan tanggal yang telah dipilih',
        attachTo    : { element: '#apply-draft', on: 'left' },
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
            <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'end',  margin: '10px 10px 20px 0px' }}>
                <p 
                    id      = 'positionLeft' 
                    style   = {{ zIndex: '3', position: 'absolute' }}
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

const TourFilterDraft = (props) => {
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
            </Row>
        </Fragment>
    );
};

export default TourFilterDraft;