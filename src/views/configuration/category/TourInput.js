import { Fragment, useContext,  useEffect, useRef } from 'react';
import { Row, Col, UncontrolledTooltip }            from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }        from 'react-shepherd';

//Css
import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//Icon
import { HelpCircle }                               from 'react-feather';

//Views
import ModalForm                                    from './ModalForm';

//Helper
import Helper                                       from '../../../helpers';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;


const stepsCreate = [
    {
        id          : 'input-category',
        title       : 'Input data kategori',
        text        : 'Klik kolom inputan dan masukkan data kategori',
        attachTo    : { element: '#input-category', on: 'bottom' },
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
        id          : 'batal-input',
        title       : 'Batalkan penginputan kategori',
        text        : 'Klik untuk membatalkan penginputan data dan form penginputan akan keluar secara otomatis',
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
        title       : 'Simpan data kategori',
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

const stepsUpdate = [
    {
        id          : 'input-category',
        title       : 'Ubah data kategori',
        text        : 'Klik kolom inputan dan masukkan data kategori',
        attachTo    : { element: '#input-category', on: 'bottom' },
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
        id          : 'batal-input',
        title       : 'Batalkan Perubahan kategori',
        text        : 'Klik untuk membatalkan perubahan data dan form penginputan akan keluar secara otomatis',
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
        title       : 'Simpan data kategori',
        text        : 'Klik untuk melakukan penyimpanan data yang telah diubah',
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
    const {useQuery} = Helper;

    let query        = useQuery();
    let buttonRef    = useRef(null);

    const tour       = useContext(ShepherdTourContext);
    instance         = tour;

    useEffect(() => {
        setTimeout(() => {
            if(query.get('mode') === 'tour'){
                if(buttonRef.current != null){
                    buttonRef.current.click();
                }
            }
        }, 1000);
    },[]);

    return (
        <Fragment>
            <div style={{ cursor: 'pointer', float: 'right', margin: '0px 20px 30px 0px' }}>
                <p 
                    id      = 'positionLeft' 
                    style   = {{ zIndex: '3', position: 'absolute' }}
                    onClick = {tour.start} 
                    ref     = {buttonRef}
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
                        steps       = {
                            props.data == null ? 
                                stepsCreate 
                            : 
                                stepsUpdate
                        }
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
                    <ModalForm
                        data            = {props.data}
                        getData         = {props.getData}
                        onCancel        = {props.onCancel}
                        setListData     = {props.setListData}
                        setModalForm    = {props.setModalForm}
                    />
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourComponent;