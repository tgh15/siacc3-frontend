import React, { Fragment, useEffect, useState } from 'react';

import { 
    Col, 
    Row, 
    Card, 
    Modal,
    Button,
    CardBody, 
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';

import Select                                   from 'react-select';
import Skeleton                                 from 'react-loading-skeleton';
import { selectThemeColors }                    from '@utils';

//Image & Icon
import { File }                                 from 'react-feather';
import imagePhone                               from "@src/assets/images/logo/phone.png";
import imageLaptop                              from "@src/assets/images/logo/laptop.png";

//Url Api
import { SecurityVirusAPI }                     from '../../../services/pages/configuration/proteksi';

//Helper
import Helper                                   from '../../../helpers';

//Components
import Avatar                                   from '../../../components/widgets/avatar';
import FormDelete                               from '../../../components/widgets/form-delete/FormDelete';
import CustomTable                              from '../../../components/widgets/custom-table';
import CustomToast                              from '../../../components/widgets/custom-toast';
import index_header                             from './index_header';
import CustomTableBody                          from '../../../components/widgets/custom-table/CustomTableBody';
import CustomTableBodyEmpty                     from '../../../components/widgets/custom-table/CustomTableBodyEmpty';


const Proteksi = (props) => {
    //Props
    const {setShowAction}                     = props;
    
    //State
    const [loading, setLoading]               = useState(false);
    const [allVirus, setAllVirus]             = useState([]);
    const [showForm, setShowForm]             = useState(false);
    const [selectedId, setSelectedId]         = useState(null);
    const [filterData, setFilterData]         = useState(null);
    const [selectedVirus, setSelectedVirus]   = useState(null);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    //Query
    let query                                 = Helper.useQuery();

    // useEffect tour action
    useEffect(() => {
        if (query.get('action') === 'get'){
            setShowAction('get');
        }else if(query.get('action') === 'filter'){
            setShowAction('filter');
        }
    }, [])

    useEffect(() => {
        getAllSicurityVirus();
    }, []);

    //Get data
    const getAllSicurityVirus = () => {
        SecurityVirusAPI.getVirus().then(
            res => {
                if (res.status === 200) {
                    if(res.data != null){
                        setAllVirus([...res.data]);
                        setFilterData([...res.data]);
                    }else{
                        setAllVirus([]);
                        setFilterData([]);
                    }
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //Delete
    const handleDelete = () => {
        setLoading(true);

        SecurityVirusAPI.deleteVirus(selectedId).then(
            res => {
                if (res.status === 200) {
                    setLoading(false);
                    setAllVirus(false); 
                    setShowDeleteForm(false);

                    //Success Message
                    CustomToast("success", "Data Berhasil Dihapus");

                    //Refresh page
                    getAllSicurityVirus();
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //Update
    const handleUpdate = () => {
        setLoading(true);

        SecurityVirusAPI.updateVirus(selectedId, selectedVirus).then(
            res => {
                if (res.status === 200) {
                    setLoading(false);
                    setAllVirus(false); 
                    setShowForm(false);

                    //Success Message
                    CustomToast("success", "Data Berhasil Diubah");

                    //Refresh page
                    getAllSicurityVirus();
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //Condisi image
    const imageCondition = (is_mobile) => {
        return is_mobile ? imagePhone : imageLaptop;
    };

    //Select Aksi
    const typeOptions = [
        { key: "1", value: 1, label: 'Karantina' },
        { key: "2", value: 2, label: 'Hapus File' },
        { key: "3", value: 3, label: 'Izinkan' },
    ];

    //Select filter
    const typeFilter = [
        { key: "1", value: "quarantine", label: 'Karantina' },
        { key: "3", value: "allowed",    label: 'Izinkan' },
    ];

    //Filter
    const filterProteksi = (e) => {
        const selected = e;
        
        let newFilter = filterData.filter((data) => (
            data.virus_action == selected
        ));
        
        setAllVirus(newFilter);
    };

    return (
        <Fragment>
            <FormDelete
                show        = {showDeleteForm}
                title       = "Hapus Virus"
                setShow     = {(par) => setShowDeleteForm(par)}
                loading     = {loading} 
                onDelete    = {handleDelete}
                description = "file virus"
            />

            <h4 style={{ fontWeight: 'bold', marginBottom: '30px' }}>
                Virus dan Malware Proteksi
            </h4>
            <Card>
                <CardBody className="pb-0">
                    <Row>
                        <Col md="9">
                            <h5 style={{ fontWeight: 'bold', marginBottom: '30px' }}>
                                Riwayat
                            </h5>
                        </Col>
                        <Col md="3">
                            <div id="filter-protection">
                                <Select
                                    id              = "filter" 
                                    theme           = {selectThemeColors}
                                    options         = {typeFilter}
                                    onChange        = {(e) => { e ? filterProteksi(e.value) : getAllSicurityVirus()}}
                                    className       = 'react-select'
                                    isClearable
                                    placeholder     = 'Pilih Filter'
                                    classNamePrefix = 'select'
                                />
                            </div>
                        </Col>
                    </Row>
                    <Card>
                        <CardBody 
                            style     = {{ backgroundColor: '#f7f7fc', borderRadius: '7px' }} 
                            className = 'border pt-0 pb-0'
                        >
                            <CustomTable
                                header = {index_header}
                            >
                                {
                                    !Array.isArray(allVirus) ? 
                                        <Skeleton
                                            count  = {3} 
                                            style  = {{ marginBottom: "10px" }} 
                                            height = {60} 
                                        />
                                    :
                                        Array.isArray(allVirus) && allVirus.length > 0 ? 
                                            allVirus.map((data, index) => (
                                                <div id="protection-table">
                                                    <CustomTableBody>
                                                        <Col md="1">
                                                            {index+1}
                                                        </Col>
                                                        <Col md="3">
                                                            <div className='d-flex align-items-center'>
                                                                <Avatar 
                                                                    img       = { data.user.avatar == "" ? `https://ui-avatars.com/api/?name=${data.user ? data.user.name : "UN"}&background=4e73df&color=fff&bold=true` : data.user.avatar } 
                                                                    imgWidth  = '40' 
                                                                    imgHeight = '40'
                                                                    onError   = {Helper.fallbackImage_}
                                                                    className = 'mr-1' 
                                                                />
                                                                <span>{data.user.name}</span>
                                                            </div>
                                                        </Col>
                                                        <Col md="2">
                                                            <div className='d-flex align-items-center'>
                                                                <File size={25}/>
                                                                <span className='ml-1'>{data.name}</span>
                                                            </div>
                                                        </Col>
                                                        <Col md="2">
                                                            <div className='d-flex align-items-center'>
                                                                <img 
                                                                    src   = {imageCondition(data.additional_info.is_mobile)} 
                                                                    alt   = "laptop" 
                                                                    style = {{ width: '45px', marginRight: '5px' }}
                                                                />
                                                                <span>{data.additional_info.ip}</span>
                                                            </div>
                                                        </Col>
                                                        <Col md="2">
                                                            {Helper.dateIndo(data.created_at)}
                                                        </Col>
                                                        <Col md="2">
                                                            <div id="aksi-file">
                                                                <Select
                                                                    id              = "aksi" 
                                                                    theme           = {selectThemeColors}
                                                                    options         = {typeOptions}
                                                                    value           = {{
                                                                        label : data.virus_action,
                                                                        value : (data.value) ? data.value === "1" ? "quarantine" : data.value === "3" : "allowed"
                                                                    }}
                                                                    onChange        = {(e) => { 
                                                                        if (e.key == 1) {
                                                                            setSelectedId(data.id)
                                                                            setSelectedVirus("quarantine")
                                                                            setShowForm(!showForm); 
                                                                        } else if (e.key == 3) {
                                                                            setSelectedId(data.id)
                                                                            setSelectedVirus("allowed")
                                                                            setShowForm(!showForm);
                                                                        } else if (e.key == 2) {
                                                                            setShowDeleteForm(true); 
                                                                            setSelectedId(data.id)
                                                                        }
                                                                    }}
                                                                    className       = 'react-select'
                                                                    classNamePrefix = 'select'
                                                                />
                                                            </div>
                                                        </Col>
                                                    </CustomTableBody>
                                                </div>
                                            ))
                                        :
                                            <CustomTableBodyEmpty/>
                                }
                            </CustomTable>
                        </CardBody>
                    </Card>
                </CardBody>
            </Card>

            <Modal 
                size     = "sm" 
                isOpen   = {showForm} 
                toggle   = {() => setShowForm(!showForm)} 
                centered
            >
                <ModalHeader toggle={() => setShowForm(!showForm)}>
                    {`${selectedVirus === "quarantine" ? "Karantina" : "Izinkan"} File`} 
                </ModalHeader>
                <ModalBody>
                    <h4 className='text-center'>
                        Yakin anda akan {selectedVirus == "quarantine" ? "Karantina" : "Izinkan"} file yang terdeteksi sebagai virus?
                    </h4>
                </ModalBody>
                <ModalFooter className='d-flex justify-content-center'>
                    <Button 
                        color   = 'primary' 
                        outline 
                        onClick = {() => setShowForm(!showForm)}
                    >
                        Batal
                    </Button>
                    <Button 
                        color   = 'primary'
                        onClick = {handleUpdate}
                    >
                        Simpan
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
};

export default Proteksi;