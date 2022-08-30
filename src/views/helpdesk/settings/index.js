import React, { 
    Fragment, 
    useState, 
    useEffect 
}  from 'react';

import { Col }              from 'reactstrap';
import Skeleton             from 'react-loading-skeleton';

//Icon
import { Edit2, Trash2 }    from 'react-feather';

//Components
import ModalForm            from './modalForm';
import FormDelete           from '../../../components/widgets/form-delete/FormDelete';
import CustomTable          from '../../../components/widgets/custom-table';
import indexHeader          from './indexHeader';
import CustomToast          from '../../../components/widgets/custom-toast';
import { ModalBase }        from '../../../components/widgets/modals-base';
import CustomTableBody      from '../../../components/widgets/custom-table/CustomTableBody';
import CustomTableBodyEmpty from '../../../components/widgets/custom-table/CustomTableBodyEmpty';

//API
import { SettingsAPI }      from '../../../services/pages/helpdesk/settings';


const SettingHelpdesk = () => {
    //State
    const [loading, setLoading]               = useState(false);
    const [dataForm, setDataForm]             = useState(null);
    const [modalForm, setModalForm]           = useState(false);
    const [selectedId, setSelectedId]         = useState(null);
    const [allCategory, setAllCategory]       = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    useEffect(() => {
        getCategoryHelpdesk();
    }, []);
    
    //Get
    const getCategoryHelpdesk = () => {
        SettingsAPI.getAllCategory().then(
            res => {
                if (res.status === 200 && res.data != null) {
                    setAllCategory(res.data);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //Delete
    const onDelete = () => {
        setLoading(true);

        SettingsAPI.deleteCategory(selectedId).then(
            res => {
                if (res.status === 200) {
                    setLoading(false);
                    setAllCategory(false);
                    setShowDeleteForm(false);

                    //Success Message
                    CustomToast("success", "Data Berhasil di hapus");

                    //Refresh page
                    getCategoryHelpdesk();
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    return (
        <Fragment>
            {/* Detete */}
            <FormDelete
                show        = {showDeleteForm}
                title       = "Hapus Pengaturan Kategori"
                setShow     = {(par) => setShowDeleteForm(par)}
                loading     = {loading} 
                onDelete    = {onDelete}
                description = "data Kategori Halpdesk"
            />

            {/* Create and Update */}
            <ModalBase
                show    = {modalForm}
                size    = "sm"
                title   = {`${(dataForm) ? "Ubah" : "Tambah"} Kategori Helpdesk`}
                setShow = {(par) => { setModalForm(par) }}
            >
                <ModalForm
                    data                = {dataForm}
                    onCancel            = {() => setModalForm(false)}
                    setListData         = {(data) => setAllCategory(data)}
                    setModalForm        = {(par) => setModalForm(par)} 
                    getCategoryHelpdesk = {getCategoryHelpdesk}
                />
            </ModalBase>

            {/* Index */}
            <CustomTable
                header      = {indexHeader}
                onClickForm = {() => { setDataForm(null); setModalForm(!modalForm)}}

                //Role
                roleAdd     = {true}
            >
                {
                    allCategory && allCategory.map((data, index) => (
                        <CustomTableBody>
                            <Col md="1">
                                {index+1}
                            </Col>
                            <Col md="9">
                                {data.name}
                            </Col>
                            <Col md="2">
                                <Edit2 
                                    size      ={ 20} 
                                    onClick   = {() => { setDataForm(data); setModalForm(!modalForm) }} 
                                    className = "mr-1 cursor-pointer"
                                />
                                <Trash2 
                                    size      = {20} 
                                    onClick   = {() => { setShowDeleteForm(true); setSelectedId(data.id) }}
                                    className = "mr-1 cursor-pointer"
                                />
                            </Col>
                        </CustomTableBody>
                    ))
                }
                {
                    !allCategory && allCategory !== null &&
                    <Skeleton 
                        count   = {3} 
                        style   = {{ marginBottom: "10px" }}
                        height  = {60} 
                    />
                }
                {
                    allCategory && allCategory.length === 0 &&
                    <CustomTableBodyEmpty/>
                }
            </CustomTable>
        </Fragment>
    );
};

export default SettingHelpdesk;