import { 
    useRef, 
    Fragment, 
    useState, 
    useEffect, 
    useContext 
} from 'react';

import { Row, Col, UncontrolledTooltip }        from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }    from 'react-shepherd';

//Css
import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//Icon
import { HelpCircle }                           from 'react-feather';

//Views
import Proteksi                                 from '.';

//Helper
import Helper                                   from '../../../helpers';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;


const stepsIndex = [
    {
        id          : 'protection-table',
        title       : 'Tabel Virus dan Malware Proteksi',
        text        : 'Tampilan tabel Virus dan Malware Proteksi',
        attachTo    : { element: '#protection-table', on: 'top' },
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
        id          : 'aksi-file',
        title       : 'Aksi File Proteksi',
        text        : 'Klik untuk memilih aksi dari file yang dipilih',
        attachTo    : { element: '#aksi-file', on: 'left' },
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
        id          : 'filter-protection',
        title       : 'Filter Virus dan Malware Proteksi',
        text        : 'Klik untuk memfilter data berdasarkan pilihan data yang dipilih',
        attachTo    : { element: '#filter-protection', on: 'left' },
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
        id          : 'filter-protection',
        title       : 'Filter Virus dan Malware Proteksi',
        text        : 'Klik untuk memfilter data berdasarkan pilihan data yang dipilih',
        attachTo    : { element: '#filter-protection', on: 'left' },
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
                    style   = {{ zIndex: '3', position: 'absolute' }}
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
                Silahkan klik untuk melihat cara penggunaan menu proteksi
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
                    <ShepherdTour steps={showAction === 'get' ? stepsIndex : stepsIndexFilter}>
                        <StartTour showAction={showAction}/>
                    </ShepherdTour>
                </Col>
                <Col 
                    md = '12' 
                    sm = '12'
                >
                    <Proteksi setShowAction={setShowAction}/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourComponent;