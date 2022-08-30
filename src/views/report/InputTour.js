import { Fragment, useContext }                 from 'react';
import { Row, Col, UncontrolledTooltip }        from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }    from 'react-shepherd';

import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//icon
import { HelpCircle }                           from 'react-feather';

//Views
import FormReport                               from './Form';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;

const steps = [
    {
        id          : 'report-title',
        title       : 'Judul Laporan',
        text        : 'Klik dan masukkan judul laporan',
        attachTo    : { element: '#report-title', on: 'bottom' },
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
        id          : 'start-date',
        title       : 'Tanggal Awal',
        text        : 'Klik dan pilih tanggal awal pembuatan laporan',
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
        text        : 'Klik dan pilih tanggal akhir pembuatan laporan',
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
        id          : 'schedule-report',
        title       : 'Jadwalkan Laporan',
        text        : 'Klik tombol switch untuk menginput beberapa data pada laporan',
        attachTo    : { element: '#schedule-report', on: 'top' },
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
        id          : 'contents-report',
        title       : 'Isi Laporan',
        text        : 'Klik untuk memilih isi laporan',
        attachTo    : { element: '#contents-report', on: 'top' },
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
        id          : 'select-category',
        title       : 'Pilih Kategori',
        text        : 'Klik untuk memilih kategori',
        attachTo    : { element: '#select-category', on: 'top' },
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
        id          : 'select-workunit',
        title       : 'Pilih Satuan Kerja',
        text        : 'Klik untuk memilih satuan kerja',
        attachTo    : { element: '#select-workunit', on: 'top' },
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
        id          : 'select-agent',
        title       : 'Pilih Agen',
        text        : 'Klik untuk memilih agen',
        attachTo    : { element: '#select-agent', on: 'top' },
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
        id          : 'list-report',
        title       : 'Daftar Isi Laporan',
        text        : 'Daftar isi laporan sesuai urutan isi laporan yang telah dipilih',
        attachTo    : { element: '#list-report', on: 'top' },
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
        id          : 'batal-input',
        title       : 'Batalkan Penginputan Laporan',
        text        : 'Klik untuk membatalkan pengimputan data',
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
        title       : 'Simpan Data Laporan',
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
                        steps = {steps}
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
                    <FormReport
                        loading         = {props.loading}
                        onCancel        = {props.onCancel}
                        onSubmit        = {props.onSubmit}
                        reportCategory  = {props.reportCategory}
                    />
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourInput;