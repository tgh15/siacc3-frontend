import { Fragment, useContext, useEffect, useRef }  from 'react';
import { Row, Col, UncontrolledTooltip }            from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }        from 'react-shepherd';

//Css
import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//Icon
import { HelpCircle }                               from 'react-feather';

//Helper
import Helper                                       from '../../../helpers';

//Views
import ModalForm                                    from './ModalForm';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;


const stepsCreate = [
    {
        id          : 'workunit-induk',
        title       : 'Input data induk',
        text        : 'Ketika diklik anda akan di arahkan pada pilihan data induk',
        attachTo    : { element: '#workunit-induk', on: 'bottom' },
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
        id          : 'workunit-assistant',
        title       : 'Input data asisten',
        text        : 'Klik untuk mengaktifkan data sebagai asisten',
        attachTo    : { element: '#workunit-assistant', on: 'bottom' },
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
        id          : 'workunit-order',
        title       : 'Input data urutan',
        text        : 'Klik untuk masukkan data urutan',
        attachTo    : { element: '#workunit-order', on: 'top' },
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
        id          : 'workunit-name',
        title       : 'Input data nama',
        text        : 'Klik untuk masukkan data nama',
        attachTo    : { element: '#workunit-name', on: 'bottom' },
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
        id          : 'workunit-description',
        title       : 'Input data keterangan',
        text        : 'Klik untuk masukkan data keterangan',
        attachTo    : { element: '#workunit-description', on: 'bottom' },
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
        id          : 'workunit-batal',
        title       : 'Batalkan penginputan jabatan',
        text        : 'Klik untuk membatalkan penginputan data dan form penginputan akan keluar secara otomatis',
        attachTo    : { element: '#workunit-batal', on: 'top' },
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
        id          : 'workunit-submit',
        title       : 'Simpan data jabatan',
        text        : 'Klik untuk melakukan penyimpanan data yang telah diinput',
        attachTo    : { element: '#workunit-submit', on: 'top' },
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
        id          : 'workunit-induk',
        title       : 'Ubah data induk',
        text        : 'Klik untuk mengubah data induk dan pilih data sebagai induk',
        attachTo    : { element: '#workunit-induk', on: 'bottom' },
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
        id          : 'workunit-assistant',
        title       : 'Ubah data asisten',
        text        : 'Klik untuk mengubah data asisten',
        attachTo    : { element: '#workunit-assistant', on: 'bottom' },
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
        id          : 'workunit-order',
        title       : 'Ubah data urutan',
        text        : 'Klik untuk mengubah data urutan',
        attachTo    : { element: '#workunit-order', on: 'top' },
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
        id          : 'workunit-name',
        title       : 'Ubah data nama',
        text        : 'Klik untuk mengubah data nama',
        attachTo    : { element: '#workunit-name', on: 'bottom' },
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
        id          : 'workunit-description',
        title       : 'Ubah data keterangan',
        text        : 'Klik untuk mengubah data keterangan',
        attachTo    : { element: '#workunit-description', on: 'bottom' },
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
        id          : 'workunit-batal',
        title       : 'Batalkan perubahan jabatan',
        text        : 'Klik untuk membatalkan perubahan data jabatan yang telah diubah',
        attachTo    : { element: '#workunit-batal', on: 'top' },
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
        id          : 'workunit-submit',
        title       : 'Simpan perubahan data jabatan',
        text        : 'Klik untuk melakukan penyimpanan data yang telah diubah',
        attachTo    : { element: '#workunit-submit', on: 'top' },
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
                Silahkan klik untuk melihat cara penggunaan proses penginputan data
            </UncontrolledTooltip>
        </Fragment>
    );
};

const TourInput = (props) => {
    return (
        <Fragment>
            <Row>
                <Col 
                    md = '12' 
                    sm = '12'
                >
                    <ShepherdTour 
                        steps   = {
                            props.data == false ? 
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
                    md = '12' 
                    sm = '12'
                >
                    <ModalForm
                        data            = {props.data}
                        getData         = {props.getData}
                        setListData     = {props.setListData}
                        setModalForm    = {props.setModalForm}
                    />
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourInput;