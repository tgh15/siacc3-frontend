import { Fragment, useEffect, useState }    from "react";
import { Col }                              from "reactstrap";
import { Edit2, Trash2 }                    from "react-feather";
import Skeleton                             from "react-loading-skeleton";

//Helper
import Helper                               from "../../../helpers";

//Services
import sectorAPI                            from "../../../services/pages/configuration/unit-work";
import selfLearningURL                      from "../../../services/pages/helpdesk/self-learning";

//Components
import TourInput                            from "./TourInput";
import FormDelete                           from "../../../components/widgets/form-delete/FormDelete";
import headerTable                          from "./headerTable";
import CustomToast                          from "../../../components/widgets/custom-toast";
import CustomTable                          from "../../../components/widgets/custom-table";
import { ModalBase }                        from '@src/components/widgets/modals-base';
import CustomTableBody                      from "../../../components/widgets/custom-table/CustomTableBody";
import CustomTableBodyEmpty                 from "../../../components/widgets/custom-table/CustomTableBodyEmpty";
import CustomTableNotAuthorized             from "../../../components/widgets/custom-table/CustomTableNotAuthorized";


const UnitWork = (props) => {
    //Props
    const {setShowAction}                       = props;

    //Helper
    const {getRoleByMenuStatus, useQuery}       = Helper;

    //State
    const [form, setForm]                       = useState(false);
    const [data, setData]                       = useState(false);
    const [loading, setLoading]                 = useState(false);
    const [listData, setListData]               = useState(false);
    const [pagination, setPagination]           = useState(false);
    const [showDeleteForm, setShowDeleteForm]   = useState(false);

    let query = useQuery();

    // useEffect tour action
    useEffect(() => {
        if (query.get('action') === 'get'){
            selfLearningURL.getUserModule(query.get('moduleId')).then(
                res => {
                    if(res.status === 200){
                        if(!res.data.is_done){
                            setShowAction('get');
                        }
                    }
                }
            )
        }else if(query.get('action') === 'search'){
            selfLearningURL.getUserModule(query.get('moduleId')).then(
                res => {
                    if(res.status === 200){
                        if(!res.data.is_done){
                            setShowAction('search');
                        }
                    }
                }
            )
        }else if(query.get('action') === 'delete'){
            selfLearningURL.getUserModule(query.get('moduleId')).then(
                res => {
                    if(res.status === 200){
                        if(!res.data.is_done){
                            setShowAction('delete');
                        }
                    }
                }
            )
        }else if(query.get('action') === 'create'){
            selfLearningURL.getUserModule(query.get('moduleId')).then(
                res => {
                    if(res.status === 200){
                        if(!res.data.is_done){
                            setShowAction('create');
                        }
                    }
                }
            )
        }else if(query.get('action') === 'update'){
            selfLearningURL.getUserModule(query.get('moduleId')).then(
                res => {
                    if(res.status === 200){
                        if(!res.data.is_done){
                            setShowAction('update');
                        }
                    }
                }
            )
        }
    }, []);

    useEffect(() => {
        if(query.get('mode') === 'tour'){
            getData({tutorial: true});
        }else{
            getData();
        }
    }, []);

    //Get workunit
    const getData = (params) => {
        sectorAPI.getAllSector(params).then(
            res => {
                if (!res.is_error) {
                    setListData(res.data.sector);
                    setPagination(res.data.pagination);
                } else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
        
        //tour
        if(query.get('action') === 'search' && params.keyword != undefined){
            const formData = {
                id       : parseInt(query.get("moduleId")),
                is_done  : true,
            }
            selfLearningURL.updateUserModul(formData); 
        }
    };

    //Delete workunit
    const onDelete = () => {
        setLoading(true);

        const formData = {
            id : data.id
        };

        let params;

        if(query.get("mode") === 'tour'){
            params = {tutorial:true}
        }

        sectorAPI.deleteSector(formData, params).then(
            res => {
                if (!res.is_error) {
                    getData();
                    setLoading(false);
                    setListData(false);
                    setShowDeleteForm(!showDeleteForm);
                    CustomToast("success", "Data Berhasil di hapus");
                } else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
        
        //tour
        if(query.get("mode") === "tour" && query.get("action") === 'delete'){
            const formData = {
                id       : parseInt(query.get("moduleId")),
                is_done  : true,
            }
            selfLearningURL.updateUserModul(formData);
        }
    };

    return (
        <Fragment>
            <FormDelete
                show        = {showDeleteForm}
                title       = "Hapus Satuan Kerja"
                setShow     = {(par) => setShowDeleteForm(par)}
                loading     = {loading}
                onDelete    = {onDelete}
                description = {`Unit Kerja ${data.name}`}
            />

            <ModalBase
                show    = {form} 
                title   = {`${!data ? "Tambah" : "Ubah"}  Unit Kerja`} 
                setShow = {(par) => setForm(par)} 
            >
                <TourInput
                    data            = {data}
                    getData         = {getData}
                    onCancel        = {() => { setForm(!form) }} 
                    setListData     = {(params) => { setListData(params) }} 
                    setModalForm    = {(e) => { setForm(e) }} 
                />
            </ModalBase>

            {
                getRoleByMenuStatus('Unit Kerja', 'work_unit_list') ? 
                    <CustomTable
                        header      = {headerTable}
                        getData     = {(params) => { getData(params) }}
                        onSearch    = {(keyword) => { 
                            setListData(false); 
                            if(query.get("mode") === "tour" && query.get("action") === 'search'){
                                getData({keyword: keyword, tutorial: true});
                            }else{
                                getData({keyword: keyword});
                            }
                        }}
                        pagination  = {pagination}
                        placeholder = "Cari Unit Kerja..."
                        onClickForm = {() => { setData(false); setForm(true) }}

                        //role
                        roleAdd     = {getRoleByMenuStatus('Unit Kerja', 'add')}
                    >
                        {listData && listData.map((data, i) => (
                            <div
                                id  = "workunit-table"
                                key = {i}
                            >
                                <CustomTableBody>
                                    <Col md="1">
                                        {Helper.customTableNumber({ key: i, pagination: pagination })}
                                    </Col>
                                    <Col md="2">
                                        {data.name}
                                    </Col>
                                    <Col md="2">
                                        {data.parent ?? "-"}
                                    </Col>
                                    <Col md="5">
                                        {data.description}
                                    </Col>
                                    <Col 
                                        md        = "2" 
                                        className = "d-flex"
                                    >
                                        {
                                            getRoleByMenuStatus('Unit Kerja', 'edit') ?
                                                <div id="update-workunit">
                                                    <Edit2 
                                                        size        = {20} 
                                                        onClick     = {() => { setData(data); setForm(!form) }}
                                                        className   = "mr-1 cursor-pointer"
                                                    />
                                                </div>
                                            : null
                                        }
                                        {
                                            getRoleByMenuStatus('Unit Kerja', 'delete') ? 
                                                <div id="delete-workunit">
                                                    <Trash2 
                                                        size        = {20} 
                                                        className   = "ml-1 cursor-pointer" 
                                                        onClick     = {() => { setData(data); setShowDeleteForm(true) }}
                                                    />
                                                </div>
                                            :  null
                                        }
                                    </Col>
                                </CustomTableBody>
                            </div>
                        ))}

                        {!listData && listData !== null && <Skeleton height={60} count={3} style={{ marginBottom: "10px" }} />}
                        {!listData && listData === null && <CustomTableBodyEmpty />}
                    </CustomTable>
                : <CustomTableNotAuthorized/>
            }
        </Fragment>
    );
};

export default UnitWork;