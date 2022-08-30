import { useRef, Fragment, useEffect, useContext }  from 'react';
import { Row, Col, UncontrolledTooltip }            from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }        from 'react-shepherd';

//Css
import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//Icon
import { HelpCircle }                               from 'react-feather';

//Views
import ModalFilter                                  from './ModalFilter';

//Helper
import Helper                                       from '../../../helpers';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;


const stepsFilter = [
    {
        id          : 'activity-filter',
        title       : 'Filter berdasarkan waktu dan satuan kerja',
        text        : 'Klik kolom pilih filter dan anda akan diarahkan pada pilhan waktu dan satuan kerja kemudian pilih salah satu pilihan tersebut',
        attachTo    : { element: '#activity-filter', on: 'bottom' },
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
        id          : 'activity-reset',
        title       : 'Batalkan filter',
        text        : 'Klik untuk membatalkan data filter yang telah diisi',
        attachTo    : { element: '#activity-reset', on: 'top' },
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
        id          : 'activity-apply',
        title       : 'Terapkan filter',
        text        : 'Klik untuk menerapakan data sesuai field yang telah disi',
        attachTo    : { element: '#activity-apply', on: 'top' },
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
            if (query.get('mode') === 'tour') {
                if(buttonRef.current != null){
                    buttonRef.current.click();
                }
            }
        }, 1000);
    }, []);

    return (
        <Fragment>
            <div style={{ cursor: 'pointer', float: 'right', margin: '0px 20px 30px 0px' }}>
                <p 
                    id      = 'positionLeft' 
                    ref     = {buttonRef}
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

const TourFilter = (props) => {
    return (
        <Fragment>
            <Row>
                <Col 
                    md = '12' 
                    sm = '12'
                >
                    <ShepherdTour steps={stepsFilter}>
                        <StartTour/>
                    </ShepherdTour>
                </Col>
                <Col 
                    md = '12' 
                    sm = '12'
                >
                    <ModalFilter
                        onReset         = {props.onReset}
                        onFilter        = {props.onFilter}
                        setFilter       = {props.setFilter}
                        setPageActive   = {props.setPageActive}
                        setSearchTerm   = {props.setSearchTerm}
                    />
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourFilter;