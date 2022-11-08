import { Fragment, useContext, useEffect, useRef } from 'react';
import { Row, Col, UncontrolledTooltip }           from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }       from 'react-shepherd';

//Css
import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//Icon
import { HelpCircle }                              from 'react-feather';

//Views
import License                                     from './License';

//Helper
import Helper                                      from '../../../helpers';

//URL API
import selfLearningURL                             from '../../../services/pages/helpdesk/self-learning';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;


const stepsIndex = [
    {
        id          : 'license-title',
        title       : 'Judul License',
        text        : 'Tampilan judul licensi',
        attachTo    : { element: '#license-title', on: 'bottom' },
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
        id          : 'license-table',
        title       : 'Tabel License',
        text        : 'Tampilan tabel license',
        attachTo    : { element: '#license-table', on: 'top' },
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
        id          : 'license-dashboard',
        title       : 'License Dashboard',
        text        : 'Ketika diklik anda akan diarahakan ke website A3',
        attachTo    : { element: '#license-dashboard', on: 'left' },
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
    const {useQuery} = Helper;

    let query        = useQuery();
    let buttonRef    = useRef(null);
    
    const tour  = useContext(ShepherdTourContext);
    instance    = tour;

    useEffect(() => {
        setTimeout(() => {
            if (query.get('mode') === 'tour' && query.get('action') === 'get') {
                selfLearningURL.getUserModule(query.get('moduleId')).then(
                    res => {
                        if(res.status === 200){
                            if(!res.data.is_done){
                                if(buttonRef.current != null){
                                    buttonRef.current.click();
                                }
                            }                                
                        }
                    }
                )
            }
        }, 1000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (query.get('mode') === 'tour' && query.get('action') === 'get') {
                const formData = {
                    id       : parseInt(query.get("moduleId")),
                    is_done  : true,
                }
                selfLearningURL.updateUserModul(formData);
            }
        }, 2000);
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
                Silahkan klik untuk melihat cara penggunaan menu licensi
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
                        steps       = {stepsIndex}
                        tourOptions = {{ useModalOverlay: true }}
                    >
                        <StartTour/>
                    </ShepherdTour>
                </Col>
                <Col 
                    md = '12' 
                    sm = '12'
                >
                    <License/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourComponent;