import React, { 
    Fragment, 
    useState,
    useEffect 
} from 'react';
import { 
    Col, 
    Card, 
    Button, 
    CardBody,
    CardHeader
} from 'reactstrap';

import Select                           from 'react-select';
import { Link }                         from 'react-router-dom';
import Skeleton                         from 'react-loading-skeleton';
import { selectThemeColors }            from '@utils';

//Icon
import { Edit2, Eye, Plus, Trash2 }     from 'react-feather';

//Components
import FormDelete                       from '../../../components/widgets/form-delete/FormDelete';
import CustomTable                      from '../../../components/widgets/custom-table';
import CustomToast                      from '../../../components/widgets/custom-toast';
import index_header                     from './index_header';
import CustomTableBody                  from '../../../components/widgets/custom-table/CustomTableBody';
import CustomTableBodyEmpty             from '../../../components/widgets/custom-table/CustomTableBodyEmpty';

//URl API
import { SettingsAPI }                  from '../../../services/pages/helpdesk/settings';
import { InstructionAPI }               from '../../../services/pages/helpdesk/instruction';


const ConfigurationInstructions = () => {
    //State
    const [loading, setLoading]                 = useState(false);
    const [guideAll, setGuideAll]               = useState(false);
    const [selectedId, setSelectedId]           = useState(null);
    const [filterData, setFilterData]           = useState(null);
    const [allCategory, setAllCategory]         = useState(false);
    const [showDeleteForm, setShowDeleteForm]   = useState(false);

    useEffect(() => {
        getAllCategory();
        getGuideHelpdesk();
    }, []);

    //Get all
    const getGuideHelpdesk = () => {
        InstructionAPI.getGuideAll().then(
            res => {
                if (res.status === 200 && res.data != null ) {
                    setGuideAll(res.data);
                    setFilterData(res.data);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //Get all category
    const getAllCategory = () => {
        SettingsAPI.getAllCategory().then(
            res => {
                if (res.status === 200 && res.data != null) {
                    let newData = [];

                    res.data.map((data) => (
                        newData.push({
                            value : data.id,
                            label : data.name
                        })
                    ));

                    setAllCategory(newData);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    const filterCategory = (id) => {
        const selected = id;
        
        let newFilter = filterData.filter((data) => (
            data.guide_category_id == selected
        ));
        
        setGuideAll(newFilter);
    }

    //Delete
    const onDelete = () => {
        setLoading(true);

        InstructionAPI.deleteGuide(selectedId).then(
            res => {
                if (res.status === 200) {
                    setLoading(false);
                    setGuideAll(false);
                    setShowDeleteForm(false);

                    //Success Message
                    CustomToast("success", "Data Berhasil di hapus");

                    //Refresh page
                    getGuideHelpdesk();
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    return (
        <Fragment>
            <FormDelete
                show        = {showDeleteForm}
                title       = "Hapus Petunjuk Kategori"
                setShow     = {(par) => setShowDeleteForm(par)}
                loading     = {loading} 
                onDelete    = {onDelete}
                description = "data Petunjuk Halpdesk"
            />

            <div className="d-flex justify-content-between mb-2">
                <a href="/helpdesk/create-instruction">
                    <Button 
                        size    = "sm"
                        color   = "primary" 
                    >
                        <Plus size={20}/> Buat Postingan Baru
                    </Button>
                </a>
                <a 
                    href        = "/helpdesk/help-page" 
                    className   = "font-weight-bolder text-dark"
                >
                    Lihat dalam halaman petunjuk penggunaan
                </a>
            </div>

            <Card className="m-0">
                <CardHeader className="d-flex justify-content-end">
                    <div style={{ width: '20%' }}>
                        <Select
                            theme           = {selectThemeColors}
                            onChange        = {(e) => { e ? filterCategory(e.value) : getGuideHelpdesk()}}
                            options         = {allCategory}
                            className       = 'react-select'
                            isClearable
                            placeholder     = "Pilih Kategori"
                            classNamePrefix = 'select'
                        />
                    </div>
                </CardHeader>
                <CardBody>
                    <CustomTable
                        header = {index_header}
                    >
                        {
                            guideAll && guideAll.map((data, index) => (                            
                                <CustomTableBody>
                                    <Col md="1">
                                        {index+1}
                                    </Col>
                                    <Col md="9">
                                        {data.title}
                                    </Col>
                                    <Col md="2">
                                        <Link to={`/helpdesk/update-instruction/${data.id}`}>
                                            <Edit2 
                                                size        = {20} 
                                                className   = "ml-1 cursor-pointer text-secondary"
                                            />
                                        </Link>
                                        <Link to={`/helpdesk/help-page/${data.id}`}>
                                            <Eye 
                                                size        = {20} 
                                                className   = "ml-1 cursor-pointer text-secondary"
                                            />
                                        </Link>
                                        <Trash2 
                                            size        = {20} 
                                            onClick     = {() => { 
                                                            setShowDeleteForm(true); 
                                                            setSelectedId(data.id) 
                                                        }}
                                            className   = "ml-1 cursor-pointer"
                                        />
                                    </Col>
                                </CustomTableBody>
                            ))
                        }
                        {
                            !guideAll && guideAll !== null &&
                            <Skeleton
                                count   = {3} 
                                style   = {{ marginBottom: "10px" }}
                                height  = {60}
                            />
                        }
                        {
                            guideAll && guideAll.length === 0 &&
                            <div style={{ border: '1px solid #efefef', borderRadius:'7px' }}>
                                <div className='mt-2'>
                                    <CustomTableBodyEmpty/>
                                </div>
                            </div>
                        }
                    </CustomTable>
                </CardBody>
            </Card>
        </Fragment>
    );
};

export default ConfigurationInstructions;