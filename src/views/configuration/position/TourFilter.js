import { Fragment, useContext, useEffect, useRef } from 'react';
import { Row, Col, UncontrolledTooltip }        from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }    from 'react-shepherd';

//Css
import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//icon
import { HelpCircle }                           from 'react-feather';

//Views
import ModalFilter                              from './ModalFilter';

//Helper
import Helper                                   from '../../../helpers';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;


const stepsFilter = [
    {
        id          : 'position-order',
        title       : 'Filter berdasarkan urutan',
        text        : 'Klik salah satu tombol Terbaru atau Terlama untuk mengurutkan data berdasarkan tombol yang dipilih',
        attachTo    : { element: '#position-order', on: 'bottom' },
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
        id          : 'position-typee',
        title       : 'Input data tipe jabatan',
        text        : 'Ketika diklik anda akan di arahkan pada pilihan tipe jabatan',
        attachTo    : { element: '#position-typee', on: 'bottom' },
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
        id          : 'workunit-position',
        title       : 'Input data satuan kerja',
        text        : 'Ketika diklik anda akan di arahkan pada pilihan satuan kerja',
        attachTo    : { element: '#workunit-position', on: 'top' },
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
        id          : 'units-position',
        title       : 'Input data unit kerja',
        text        : 'Ketika diklik anda akan di arahkan pada pilihan unit kerja',
        attachTo    : { element: '#units-position', on: 'top' },
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
        id          : 'position-reset',
        title       : 'Batalkan penginputan jabatan',
        text        : 'Klik untuk membatalkan data filter yang telah diisi',
        attachTo    : { element: '#position-reset', on: 'top' },
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
        id          : 'position-apply',
        title       : 'Terapkan filter jabatan',
        text        : 'Klik untuk menerapakan data sesuai field yang telah disi',
        attachTo    : { element: '#position-apply', on: 'top' },
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
                        onReset              = {props.onReset}
                        setListData          = {props.setListData}
                        sectorOptions        = {props.sectorOptions}
                        workUnitLevelOptions = {props.workUnitLevelOptions}
                    />
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourFilter;