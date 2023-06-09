import { Fragment, useEffect, useState } from 'react';
import { Col, Row }                      from 'reactstrap';
import Skeleton                          from 'react-loading-skeleton';

//Icon
import { Edit2, Trash2 }                 from 'react-feather';

//Css
import "./PrivilageRole.scss";

//Helper
import Helper                            from '../../../helpers';

//API
import PrivilageRoleAPI                  from '../../../services/pages/configuration/privilage-role';

//Components
import ModalForm                         from './ModalForm';
import ButtonAdd                         from '../../../components/widgets/custom-table/ButtonAdd';
import FormDelete                        from '../../../components/widgets/form-delete/FormDelete';
import SearchTable                       from '../../../components/widgets/custom-table/SearchTable';
import CustomTable                       from '../../../components/widgets/custom-table'
import HeaderTable                       from './HeaderTable';
import CustomToast                       from '../../../components/widgets/custom-toast';
import CustomTableBody                   from '../../../components/widgets/custom-table/CustomTableBody';
import CustomTableNotAuthorized          from '../../../components/widgets/custom-table/CustomTableNotAuthorized';


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

    useEffect(() => {
        getData();
        getTemplate();
    }, []);

    //Get groups
    const getData = (params) => {
        PrivilageRoleAPI.getGroups(params).then(
            res => {
                if (!res.is_error) {
                    setListData(res.data.result);
                    setPagination(res.data.pagination);
                }else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //Get template
    const getTemplate = () => {
        PrivilageRoleAPI.getTemplate().then(
            res => {
                if (!res.is_error) {
                    setTemplates(res.data);
                }else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //Delete groups
    const handleDelete = () => {
        setLoading(true);

        const formData = {
            group_id : parseInt(dataSelected.id)
        };

        PrivilageRoleAPI.deleteGroup(formData).then(
            res => {
                if (!res.is_error) {
                    getData();
                    setLoading(false);
                    setListData(false);
                    setShowDeleteForm(!showDeleteForm);
                    CustomToast("success", "Data Berhasil di hapus");
                }else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

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

                {/* button add and search */}
                <Row className="mb-1">
                    <Col md="8">
                        <ButtonAdd onClick={() => setShowModalForm(true)}/>
                    </Col>
                    <Col md="4">
                        <SearchTable
                            onSearch = {(keyword) => { 
                                setListData(false);
                                getData({ keyword: keyword });
                            }}
                        />
                    </Col>
                </Row>

                <CustomTable
                    header     = {HeaderTable}
                    getData    = {(params) => { getData(params) }}
                    pagination = {pagination}

                    //Role
                    roleAdd    = {getRoleByMenuStatus('Privilage Role', 'add')}
                >
                    {
                        listData && listData.map((data, i) => (
                            <div 
                                id  = "privilage-table"
                                key = {i}
                            >
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
                                                    onClick   = {() => {
                                                        setDataSelected(data); 
                                                        setShowModalForm(true);
                                                    }}
                                                    className = "cursor-pointer"
                                                />
                                            : null
                                        }
                                        {
                                            getRoleByMenuStatus('Privilage Role', 'delete') ?
                                                <Trash2
                                                    id        = "privilage-delete"
                                                    size      = {20}
                                                    onClick   = {() => { 
                                                        setDataSelected(data);
                                                        setShowDeleteForm(true);
                                                    }}
                                                    className = "cursor-pointer"
                                                />
                                            : null
                                        }
                                    </Col>
                                </CustomTableBody>
                            </div>
                        ))
                    }

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