import { Fragment, useContext }                 from 'react';
import { Row, Col, UncontrolledTooltip }        from 'reactstrap';
import { ShepherdTour, ShepherdTourContext }    from 'react-shepherd';

import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

//Icon
import { HelpCircle }                           from 'react-feather';

//Views
import FileManager                              from './FileManager';


const backBtnClass  = 'btn btn-sm btn-outline-primary',
nextBtnClass        = 'btn btn-sm btn-primary btn-next'
let instance        = null;

const steps = [
    {
        id          : 'sidebar-menu',
        title       : 'Sidebar Menu',
        text        : 'Daftar menu file manajemen',
        attachTo    : { element: '#sidebar-menu', on: 'right' },
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
        id          : 'all-files',
        title       : 'Menu Semua File',
        text        : 'Pada menu ini anda bisa melihat semua file',
        attachTo    : { element: '#all-files', on: 'right' },
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
        id          : 'just-seen',
        title       : 'Menu Baru Dilihat',
        text        : 'Pada menu ini anda bisa melihat file yang baru anda lihat',
        attachTo    : { element: '#just-seen', on: 'right' },
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
        id          : 'favorite',
        title       : 'Menu Favorit',
        text        : 'Pada menu ini anda bisa melihat file yang pernah difavoritkan',
        attachTo    : { element: '#favorite', on: 'right' },
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
        id          : 'share',
        title       : 'Menu Bagikan',
        text        : 'Pada menu ini anda bisa membagikan file dan anda bisa melihat file yang di bagikan pada anda',
        attachTo    : { element: '#share', on: 'right' },
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
        id          : 'tag',
        title       : 'Menu Tag',
        text        : '',
        attachTo    : { element: '#tag', on: 'right' },
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
        id          : 'just-deleted',
        title       : 'Baru Saja Dihapus',
        text        : 'Pada menu ini anda bisa file yang baru saja anda hapus',
        attachTo    : { element: '#just-deleted', on: 'right' },
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
        id          : 'capacity',
        title       : 'Kapasitas Penyimpanan',
        text        : 'Tampilan kapasitas penyimpanan dan penyimpanan yang telah dipakai',
        attachTo    : { element: '#capacity', on: 'right' },
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
        title       : 'Tambah Data File Manajemen',
        text        : 'Ketika diklik anda akan di arahkan pada tampilan tambah data file manajemen',
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
        id          : 'full-screen',
        title       : 'Layar Penuh',
        text        : 'Klik untuk menjadikan tampilan layar penuh',
        attachTo    : { element: '#full-screen', on: 'left' },
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
        id          : 'progress',
        title       : 'Progress Files',
        text        : 'Klik untuk melihat progress mengunggah file',
        attachTo    : { element: '#progress', on: 'left' },
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
        id          : 'header-table',
        title       : 'Header Tabel',
        text        : 'Tampilan heder tabel file manajemen',
        attachTo    : { element: '#header-table', on: 'top' },
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
        id          : 'delete-all',
        title       : 'Hapus Semua Data',
        text        : 'Klik untuk menandai semua file dan klik tombol hapus pada bagian sudut kanan',
        attachTo    : { element: '#delete-all', on: 'top' },
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
        id          : 'table-manajemen',
        title       : 'Daftar File',
        text        : 'Tampilan tabel daftar file manajemen',
        attachTo    : { element: '#table-manajemen', on: 'top' },
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
        id          : 'delete-file',
        title       : 'Hapus File',
        text        : 'Klik untuk menandai file yang ingin dihapus dan klik tombol hapus pada bagian sudut kanan',
        attachTo    : { element: '#delete-file', on: 'top' },
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
        id          : 'share-file',
        title       : 'Bagikan File',
        text        : 'Klik untuk membagikan file',
        attachTo    : { element: '#share-file', on: 'top' },
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
        id          : 'aksi-file',
        title       : 'Aksi File',
        text        : 'Klik untuk memilih aksi pada file',
        attachTo    : { element: '#aksi-file', on: 'top' },
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
            <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'end' }}>
                <p 
                    id      = 'positionRight' 
                    style   = {{ zIndex: '3', position: 'absolute', marginTop: '60px' }}
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
                Silahkan klik untuk melihat cara penggunaan menu file manajemen
            </UncontrolledTooltip>
        </Fragment>
    );
};

const TourFileManajemen = () => {
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
                    md = '12' 
                    sm = '12'
                >
                    <FileManager/>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TourFileManajemen;