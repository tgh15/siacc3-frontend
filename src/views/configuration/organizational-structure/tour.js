import { Fragment, useContext, useRef, useEffect } from 'react';
import { Row, Col, UncontrolledTooltip }           from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }       from 'react-shepherd';

//Css
import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//Icon
import { HelpCircle }                              from 'react-feather';

//Views
import OrganizationalStructure                     from './OrganizationalStructure';

//Helper
import Helper                                      from '../../../helpers';
import selfLearningURL from '../../../services/pages/helpdesk/self-learning';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;


const steps = [
    {
        id          : 'structure-kejagung',
        title       : 'Kejaksaan Agung',
        text        : 'Tampilan struktur organisasi kejaksaan agung',
        attachTo    : { element: '#structure-kejagung', on: 'top' },
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
        id          : 'structure-kejati',
        title       : 'Kejaksaan Tinggi',
        text        : 'Tampilan struktur organisasi kejaksaan tinggi',
        attachTo    : { element: '#structure-kejati', on: 'top' },
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
        id          : 'structure-kejari',
        title       : 'Kejaksaan Negeri',
        text        : 'Tampilan struktur organisasi kejaksaan negeri',
        attachTo    : { element: '#structure-kejari', on: 'top' },
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
        id          : 'structure-capjari',
        title       : 'Cabang Kejaksaan Negeri',
        text        : 'Tampilan struktur organisasi cabang kejaksaan negeri',
        attachTo    : { element: '#structure-capjari', on: 'top' },
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

    const tour       = useContext(ShepherdTourContext);
    instance         = tour;

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
            <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'end' }}>
                <p 
                    id      = 'positionLeft' 
                    ref     = {buttonRef}
                    style   = {{ zIndex: '3', position: 'absolute', margin: '10px 10px 0 0' }}
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
                target      = 'positionLeft'
                placement   = 'left' 
            >
                Silahkan klik untuk melihat cara penggunaan menu struktur organisasi
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
                        tourOptions = {{ useModalOverlay: true }}
                    >
                        <StartTour/>
                    </ShepherdTour>
                </Col>
                <Col 
                    md = '12' 
                    sm = '12'
                >
                    <OrganizationalStructure/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourComponent;