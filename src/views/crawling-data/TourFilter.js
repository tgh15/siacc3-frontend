import { Fragment, useContext }                 from 'react';
import { Row, Col, UncontrolledTooltip }        from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }    from 'react-shepherd';

import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//Icon
import { HelpCircle }                           from 'react-feather';

//Views
import CrawlingFilter                           from '../../components/widgets/crawling-components/CrawlingFilter';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;

const steps = [
    {
        id          : 'asc',
        title       : 'Terbatu > Terlama',
        text        : 'Klik untuk memilih data terbaru ke terlama',
        attachTo    : { element: '#asc', on: 'bottom' },
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
        id          : 'desc',
        title       : 'Terlama > Terbatu',
        text        : 'Klik untuk memilih data terlama ke terbaru',
        attachTo    : { element: '#desc', on: 'bottom' },
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
        id          : 'start-date',
        title       : 'Tanggal Awal',
        text        : 'Klik dan pilih tanggal awal',
        attachTo    : { element: '#start-date', on: 'top' },
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
        id          : 'end-date',
        title       : 'Tanggal Akhir',
        text        : 'Klik dan pilih tanggal akhir',
        attachTo    : { element: '#end-date', on: 'top' },
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
        id          : 'reset-input',
        title       : 'Reset Data',
        text        : 'Klik untuk batalkan filter data crewling',
        attachTo    : { element: '#reset-input', on: 'top' },
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
        id          : 'search-input',
        title       : 'Cari Data',
        text        : 'Klik untuk melakukan pencarian sesuai data yang diisi',
        attachTo    : { element: '#search-input', on: 'top' },
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
                Silahkan klik untuk melihat cara penggunaan filter data
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
                    md= '12' 
                    sm = '12'
                >
                    <CrawlingFilter/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourFilter;