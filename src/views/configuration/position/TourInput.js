import { Fragment, useContext, useEffect, useRef } from 'react';
import { Row, Col, UncontrolledTooltip }           from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }       from 'react-shepherd';

//Css
import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//icon
import { HelpCircle }                              from 'react-feather';

//Views
import ModalForm                                   from './ModalForm';

//Helper
import Helper                                      from '../../../helpers';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;


const stepsCreate = [
    {
        id          : 'position-parent',
        title       : 'Input data induk',
        text        : 'Ketika diklik anda akan di arahkan pada pilihan induk satuan kerja',
        attachTo    : { element: '#position-parent', on: 'bottom' },
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
        id          : 'position-type',
        title       : 'Input data tipe jabatan',
        text        : 'Ketika diklik anda akan di arahkan pada pilihan tipe jabatan',
        attachTo    : { element: '#position-type', on: 'bottom' },
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
        id          : 'position-workunit',
        title       : 'Input data satuan kerja',
        text        : 'Ketika diklik anda akan di arahkan pada pilihan satuan kerja',
        attachTo    : { element: '#position-workunit', on: 'top' },
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
        id          : 'position-units',
        title       : 'Input data unit kerja',
        text        : 'Ketika diklik anda akan di arahkan pada pilihan unit kerja',
        attachTo    : { element: '#position-units', on: 'top' },
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
        id          : 'position-name',
        title       : 'Input data nama',
        text        : 'Klik untuk masukkan data nama jabatan',
        attachTo    : { element: '#position-name', on: 'bottom' },
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
        id          : 'position-description',
        title       : 'Input data keterangan',
        text        : 'Klik untuk masukkan data keterangan jabatan',
        attachTo    : { element: '#position-description', on: 'bottom' },
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
        id          : 'position-batal',
        title       : 'Batalkan penginputan jabatan',
        text        : 'Klik untuk membatalkan penginputan data dan form penginputan akan keluar secara otomatis',
        attachTo    : { element: '#position-batal', on: 'top' },
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
        id          : 'position-submit',
        title       : 'Simpan data jabatan',
        text        : 'Klik untuk melakukan penyimpanan data yang telah diinput',
        attachTo    : { element: '#position-submit', on: 'top' },
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
        id          : 'position-parent',
        title       : 'Ubah data induk',
        text        : 'Klik untuk mengubah pilihan induk satuan kerja',
        attachTo    : { element: '#position-parent', on: 'bottom' },
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
        id          : 'position-type',
        title       : 'Ubah data tipe jabatan',
        text        : 'Klik untuk mengubah pilihan tipe jabatan',
        attachTo    : { element: '#position-type', on: 'bottom' },
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
        id          : 'position-workunit',
        title       : 'Ubah data satuan kerja',
        text        : 'Klik untuk mengubah pilihan satuan kerja',
        attachTo    : { element: '#position-workunit', on: 'top' },
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
        id          : 'position-units',
        title       : 'Ubah data unit kerja',
        text        : 'Klik untuk mengubah pilihan unit kerja',
        attachTo    : { element: '#position-units', on: 'top' },
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
        id          : 'position-name',
        title       : 'Ubah data nama',
        text        : 'Klik untuk masukkan data nama jabatan yang mau diubah',
        attachTo    : { element: '#position-name', on: 'bottom' },
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
        id          : 'position-description',
        title       : 'Ubah data keterangan',
        text        : 'Klik untuk masukkan data keterangan jabatan yang mau diubah',
        attachTo    : { element: '#position-description', on: 'bottom' },
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
        id          : 'position-batal',
        title       : 'Batalkan perubahan jabatan',
        text        : 'Klik untuk membatalkan perubahan data dan form penginputan akan keluar secara otomatis',
        attachTo    : { element: '#position-batal', on: 'top' },
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
        id          : 'position-submit',
        title       : 'Simpan data jabatan',
        text        : 'Klik untuk melakukan penyimpanan data yang telah diubah',
        attachTo    : { element: '#position-submit', on: 'top' },
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
                    <ShepherdTour steps={props.data == false ? stepsCreate : stepsUpdate}>
                        <StartTour/>
                    </ShepherdTour>
                </Col>
                <Col 
                    md = '12' 
                    sm = '12'
                >
                    <ModalForm
                        data                 = {props.data}
                        getData              = {props.getData}
                        onCancel             = {props.onCancel}
                        setListData          = {props.setListData}
                        setModalForm         = {props.setModalForm}
                        sectorOptions        = {props.sectorOptions}
                        postionOptions       = {props.postionOptions}
                        workUnitLevelOptions = {props.workUnitLevelOptions}
                    />
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourInput;