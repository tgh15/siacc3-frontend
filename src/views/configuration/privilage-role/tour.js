import { Fragment, useContext }                 from 'react';
import { Row, Col, UncontrolledTooltip }        from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }    from 'react-shepherd';

import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//icon
import { HelpCircle }                           from 'react-feather';

//Views
import PrivilageRole                            from './PrivilageRole';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;

const steps = [
    {
        id          : 'privilage-table',
        title       : 'Tabel Privilage Role',
        text        : 'Tampilan tabel privilage role',
        attachTo    : { element: '#privilage-table', on: 'top' },
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
        id          : 'search-data',
        title       : 'Pencarian Data Privilage Role',
        text        : 'Masukkan data yang ingin dicari, kemudian tekan tombol enter pada keyboard',
        attachTo    : { element: '#search-data', on: 'bottom' },
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
        id          : 'add-data',
        title       : 'Tambah Data Privilage Role',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan tambah data privilage role',
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
        id          : 'privilage-update',
        title       : 'Ubah Data Privilage Role',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan ubah data privilage role',
        attachTo    : { element: '#privilage-update', on: 'left' },
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
        id          : 'privilage-delete',
        title       : 'Hapus Data Privilage Role',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan hapus data privilage role',
        attachTo    : { element: '#privilage-delete', on: 'left' },
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
            <div style={{cursor: 'pointer'}}>
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
                Silahkan klik untuk melihat cara penggunaan menu Privilage Role
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
                        steps = {steps}
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
                    <PrivilageRole/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourComponent;