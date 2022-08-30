import { Fragment, useEffect, useState }    from "react";
import { Col }                              from "reactstrap";
import Skeleton                             from "react-loading-skeleton";

//Icon
import { Edit2, Trash2 }                    from "react-feather";

//Helper
import Helper                               from "../../../helpers";

//URL API
import PositionApi                          from "../../../services/pages/configuration/position";
import selfLearningURL                      from "../../../services/pages/helpdesk/self-learning";

//Components
import TourInput                            from "./TourInput";
import FormDelete                           from '../../../components/widgets/form-delete/FormDelete';
import TourFilter                           from "./TourFilter";
import headerTable                          from "./headerTable";
import CustomTable                          from "../../../components/widgets/custom-table";
import CustomToast                          from "../../../components/widgets/custom-toast";
import { ModalBase }                        from '../../../components/widgets/modals-base';
import CustomTableBody                      from "../../../components/widgets/custom-table/CustomTableBody";
import CustomTableBodyEmpty                 from "../../../components/widgets/custom-table/CustomTableBodyEmpty";
import CustomTableNotAuthorized             from "../../../components/widgets/custom-table/CustomTableNotAuthorized";


const Position = (props) => {
    //Props
    const {setShowAction}                       = props;

    //State
    const [data,setData]                        = useState(false);
    const [form, setForm]                       = useState(false);
    const [filter, setFilter]                   = useState(false);
    const [loading,setLoading]                  = useState(false);
    const [listData, setListData]               = useState(false);
    const [pagination, setPagination]           = useState(false);
    const [showDeleteForm,setShowDeleteForm]    = useState(false);

    //Helper
    const {getRoleByMenuStatus, useQuery}       = Helper;

    let query                                   = useQuery();

    // useEffect tour action
    useEffect(() => {
        if(query.get('action') === 'get'){
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
        }else if(query.get('action') === 'filter'){
            selfLearningURL.getUserModule(query.get('moduleId')).then(
                res => {
                    if(res.status === 200){
                        if(!res.data.is_done){
                            setShowAction('filter');
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
    
    const getData = (params) => {
        setListData(false);

        PositionApi.get({
            onSuccess: (res) => {
                setListData(res.data.position);
                setPagination(res.data.pagination);
            }, onFail: (err) => {
                CustomToast("danger", err.message);
            }, params
        })

        if(query.get('action') === 'search' && params.keyword != undefined){
            const formData = {
                id       : parseInt(query.get("moduleId")),
                is_done  : true,
            }
            selfLearningURL.updateUserModul(formData)
        };
    };

    const onDelete = () => {
        setLoading(true);

        let params;

        if(query.get("mode") === 'tour'){
            params = {tutorial: true}
        }

        PositionApi.delete({
            id: data.id,

            onSuccess: (res) => {
                setListData(false);
                setLoading(false);
                setShowDeleteForm(!showDeleteForm);
                CustomToast("success","Data Berhasil di hapus");

                if(query.get("mode") === 'tour'){
                    getData({tutorial:true});
                }else{
                    getData();
                }
            },
            onFail: (err) => {
                CustomToast("danger", err.message);
            }, params
        })

        if(query.get("mode") === "tour" && query.get("action") === 'delete'){
            const formData = {
                id       : parseInt(query.get("moduleId")),
                is_done  : true,
            }
            selfLearningURL.updateUserModul(formData)   
        };
    };

    return (
        <Fragment>
            {/* modal Filter */}
            <ModalBase 
                size    = "sm" 
                show    = {filter} 
                title   = "Filter" 
                setShow = {() => { setFilter(!filter) }}
            >
                <TourFilter
                    onReset     = {() => { getData(); setFilter(!filter) }} 
                    setListData = {(par) => {setListData(par)}}
                />
            </ModalBase>

            {/* modal Form */}
            <ModalBase 
                show    = {form} 
                size    = "lg" 
                title   = {`${data ? "Ubah" : "Tambah"} Data Jabatan`} 
                setShow = {() => { setForm(!form) }}
            >
                <TourInput
                    data            = {data} 
                    onCancel        = {() => { setForm(!form) }} 
                    setListData     = {(par) => { setListData(par) }}
                    setModalForm    = { (par) => {setForm(par)}} 
                />
            </ModalBase>

            {/* modal Form */}
            <FormDelete 
                show        = {showDeleteForm} 
                title       = "Hapus Jabatan" 
                loading     = {loading}
                setShow     = {(par) => setShowDeleteForm(par)} 
                onDelete    = {onDelete} 
                description = {`${data.name}` } 
            />

            {/* custom table */}
            {
                getRoleByMenuStatus('Jabatan', 'position_list') ? 
                    <CustomTable
                        header          = {headerTable}
                        getData         = {(params) => { setListData(false); getData(params) }}
                        onSearch        = {(keyword) => { 
                            setListData(false); 
                            
                            if(query.get("mode") === "tour" && query.get("action") === 'search'){
                                getData({ keyword: keyword, tutorial: true})
                            }else{
                                getData({ keyword: keyword})
                            }
                        }}
                        pagination      = {pagination}
                        placeholder     = "Cari Jabatan..."
                        onClickForm     = {() => { setData(false); setForm(!form) }}
                        onClickFilter   = {() => { setFilter(!filter) }}

                        //Role
                        roleAdd         = {getRoleByMenuStatus('Jabatan', 'add')}
                    >
                        {
                            listData && listData.map((data, i) => (
                                <div id="position-table">
                                    <CustomTableBody key={i}>
                                        <Col md="1">
                                            {Helper.customTableNumber({key:i,pagination : pagination})}
                                        </Col>
                                        <Col md="2">
                                            {data.name}
                                        </Col>
                                        <Col md="2">
                                            {data.type_name}
                                        </Col>
                                        <Col md="2">
                                            {data.workunit_level}
                                        </Col>
                                        <Col md="2">
                                            {data.sector}
                                        </Col>
                                        <Col md="2">
                                            {data.description}
                                        </Col>
                                        <Col 
                                            md          = "1" 
                                            className   = "d-flex"
                                        >
                                            {
                                                getRoleByMenuStatus('Jabatan', 'edit') ?
                                                    <div id="update-position">
                                                        <Edit2 
                                                            size        = {20} 
                                                            onClick     = {() => {setData(data); setForm(!form) }}
                                                            className   = "mr-1 cursor-pointer" 
                                                        />
                                                    </div>
                                                : null
                                            }
                                            {
                                                getRoleByMenuStatus('Jabatan', 'delete') ? 
                                                    <div id="delete-position">
                                                        <Trash2 
                                                            size        = {20} 
                                                            onClick     = { () => {setData(data); setShowDeleteForm(!showDeleteForm)} }
                                                            className   = "ml-1 cursor-pointer" 
                                                        />
                                                    </div>
                                                : null
                                            }
                                        </Col>
                                    </CustomTableBody>
                                </div>
                            ))
                        }

                        {!listData && listData != null && <Skeleton height={60} count={3} style={{ marginBottom: "10px" }} />}
                        {!listData && listData === null && <CustomTableBodyEmpty />}
                    </CustomTable>
                : <CustomTableNotAuthorized/>
            }
        </Fragment>
    );
};

export default Position;