import { Fragment, useEffect, useState } from 'react';
import { Col }                           from 'reactstrap';
import { Edit2, Trash2 }                 from 'react-feather';

import "./PrivilageRole.scss";

//Components
import Skeleton                          from 'react-loading-skeleton';
import CustomTable                       from '../../../components/widgets/custom-table'
import HeaderTable                       from './HeaderTable';
import CustomToast                       from '../../../components/widgets/custom-toast';
import CustomTableBody                   from '../../../components/widgets/custom-table/CustomTableBody';
import CustomTableNotAuthorized          from '../../../components/widgets/custom-table/CustomTableNotAuthorized';

//API
import PrivilageRoleApi                  from '../../../services/pages/configuration/privilage-role';

import Helper                            from '../../../helpers';
import ModalForm                         from './ModalForm';
import FormDelete                        from '../../../components/widgets/form-delete/FormDelete';

const PrivilageRole = () => {
    //Helper
    const { getRoleByMenuStatus }               = Helper;

    //State
    const [loading, setLoading]                 = useState(false);
    const [listData, setListData]               = useState(false);
    const [templates, setTemplates]             = useState([]);
    const [pagination, setPagination]           = useState(null);
    const [dataSelected, setDataSelected]       = useState(null);
    const [showModalForm, setShowModalForm]     = useState(false);
    const [showDeleteForm, setShowDeleteForm]   = useState(false);

    const getData = (params) => {
        PrivilageRoleApi.get(params).then(res => {
            setListData(res.data.result);
            setPagination(res.data.pagination);
        }, err => {
            console.log(err);
        })
    };

    const getTemplate = () => {
        PrivilageRoleApi.getTemplate().then(res => {
            setTemplates(res.data);
        }, err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getData();
        getTemplate();
    }, []);

    const handleDelete = () => {
        setLoading(true);
        PrivilageRoleApi.deleteGroup(dataSelected.id).then(res => {
            setListData(false);
            getData();
            setLoading(false);
            setShowDeleteForm(!showDeleteForm);
            CustomToast("success", "Data Berhasil di hapus");
        }, err => {
            console.log(err);
        });
    }

    return (
        getRoleByMenuStatus('Privilage Role', 'privilege_role_list') ?
            <Fragment>
                {/* modal Form */}
                <FormDelete
                    show        = {showDeleteForm}
                    title       = "Hapus Privilage Role"
                    loading     = {loading}
                    setShow     = {(par) => setShowDeleteForm(par)}
                    onDelete    = {handleDelete}
                    description = {dataSelected?.name}
                />

                {/* modal Form */}
                <ModalForm
                    show            = {showModalForm}
                    data            = {dataSelected}
                    onClose         = {() => setShowModalForm(false)}
                    getData         = {getData} 
                    templates       = {templates}
                    setDataSelected = {setDataSelected}
                />
                <CustomTable
                    header          = {HeaderTable}
                    getData         = {(params) => { getData(params) }}
                    onSearch        = {(keyword) => { setListData(false); getData({ keyword: keyword }) }}
                    onClickForm     = {() => setShowModalForm(true)}
                    pagination      = {pagination}

                    //Role
                    roleAdd={getRoleByMenuStatus('Privilage Role', 'add')}
                >
                    <div id="privilage-table">
                        {
                            listData && listData.map((data, i) => (
                                <CustomTableBody>
                                    <Col md="1">
                                        {i + 1}
                                    </Col>
                                    <Col md="9">
                                        {data.name}
                                    </Col>
                                    <Col
                                        md        = "1" 
                                        className = "d-flex justify-content-between"
                                    >
                                        {
                                            getRoleByMenuStatus('Privilage Role', 'edit') ?
                                                <Edit2
                                                    id        = "privilage-update"
                                                    size      = {20}
                                                    onClick   = {() => { setDataSelected(data); setShowModalForm(true) }}
                                                    className = "cursor-pointer"
                                                />
                                            : null
                                        }
                                        {
                                            getRoleByMenuStatus('Privilage Role', 'delete') ?
                                                <Trash2
                                                    id        = "privilage-delete"
                                                    size      = {20}
                                                    onClick   = {() => { setDataSelected(data); setShowDeleteForm(true) }}
                                                    className = "cursor-pointer"
                                                />
                                            : null
                                        }
                                    </Col>
                                </CustomTableBody>
                            ))
                        }
                    </div>

                    {
                        !listData && 
                        <Skeleton 
                            count  = {3} 
                            style  = {{ marginBottom: "10px" }}
                            height = {60} 
                        />
                    }
                </CustomTable>
            </Fragment>
        : <CustomTableNotAuthorized/>
    );
};

export default PrivilageRole;