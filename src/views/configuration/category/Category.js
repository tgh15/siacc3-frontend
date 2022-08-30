import { Fragment, useEffect, useState }        from 'react';
import { Col }                                  from 'reactstrap';
import Skeleton                                 from 'react-loading-skeleton';

//Icon
import { Edit2, Trash2 }                        from 'react-feather';

//Helper
import Helper                                   from '../../../helpers';

//API
import selfLearningURL                          from '../../../services/pages/helpdesk/self-learning';
import { feedsCategoryAPI }                     from '../../../services/pages/feeds/categories';

//Widget
import FormDelete                               from '../../../components/widgets/form-delete/FormDelete';
import headerTable                              from './headerTable';
import CustomTable                              from '../../../components/widgets/custom-table';
import CustomToast                              from '../../../components/widgets/custom-toast';
import TourComponent                            from './TourInput';
import { ModalBase }                            from '../../../components/widgets/modals-base';
import CustomTableBody                          from '../../../components/widgets/custom-table/CustomTableBody';
import CustomTableBodyEmpty                     from '../../../components/widgets/custom-table/CustomTableBodyEmpty';
import CustomTableNotAuthorized                 from '../../../components/widgets/custom-table/CustomTableNotAuthorized';


const UserActivity = (props) => {
    //State
    const [loading, setLoading]                 = useState(false);
    const [dataForm, setDataForm]               = useState(null);
    const [listData, setListData]               = useState(false);
    const [modalForm, setModalForm]             = useState(false);
    const [idSelected, setIdSelected]           = useState(false);
    const [pagination, setPagination]           = useState(false);
    const [showDeleteForm, setShowDeleteForm]   = useState(false);

    //Props
    const {setShowAction}                       = props;

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
        feedsCategoryAPI.getCategory(1, undefined, params).then(
            res => {
                setListData(res.data.category);
                setPagination(res.data.pagination);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )

        if(query.get('action') === 'search' && params.keyword != undefined){
            const formData = {
                id       : parseInt(query.get("moduleId")),
                is_done  : true,
            }
            selfLearningURL.updateUserModul(formData);
        };
    };

    const onDelete = () => {
        setLoading(true);
        
        let params;

        const formData = {
            id : idSelected
        };

        if(query.get("mode") === 'tour'){
            params = {tutorial: true}
        }

        feedsCategoryAPI.deleteCategory(formData, params).then(
            res => {
                setLoading(false);
                setListData(false);
                setShowDeleteForm(!showDeleteForm);
                CustomToast("success", "Data Berhasil di hapus");

                if(query.get("mode") === 'tour'){
                    getData({tutorial:true});
                }else{
                    getData();
                }
            }
        ).catch(
            err => {
                console.log(err);
                CustomToast("danger", err.message);
            }
        )

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
            <FormDelete
                show        = {showDeleteForm}
                title       = "Hapus Kategori"
                setShow     = {(par) => setShowDeleteForm(par)}
                loading     = {loading} 
                onDelete    = {onDelete}
                description = "Kategori"
            />

            <ModalBase
                show    = {modalForm}
                size    = "sm"
                title   = {`${(dataForm) ? "Ubah" : "Tambah"} Kategori`}
                setShow = {(par) => { setModalForm(par) }}
            >
                <TourComponent
                    data            = {dataForm}
                    onCancel        = {() => setModalForm(false)}
                    modalForm       = {modalForm}
                    setListData     = {(data) => setListData(data)}
                    setModalForm    = {(par) => setModalForm(par)} 
                />
            </ModalBase>
            {
                getRoleByMenuStatus('Kategori', 'categories_list') ? 
                    <CustomTable
                        header          = {headerTable}
                        getData         = {(params) => { getData(params) }}
                        onSearch    = {(keyword) => { 
                            setListData(false); 

                            if(query.get("mode") === "tour" && query.get("action") === 'search'){
                                getData({ keyword: keyword, tutorial: true})
                            }else{
                                getData({ keyword: keyword})
                            }
                        }}
                        pagination      = {pagination}
                        onClickForm     = {() => { setDataForm(null); setModalForm(!modalForm) }}
                        placeholder     = "Cari Kategori..." 

                        //Role
                        roleAdd         = {getRoleByMenuStatus('Kategori', 'add')}
                    >
                        <div id="category-table">
                            {
                                listData && listData.map((data, i) => (
                                    <CustomTableBody>
                                        <Col md="1">
                                            {Helper.customTableNumber({ key: i, pagination: pagination })}
                                        </Col>
                                        <Col md="9">
                                            {data.name}
                                        </Col>
                                        <Col 
                                            md        = "2" 
                                            className = "d-flex"
                                        >
                                            {
                                                getRoleByMenuStatus('Kategori', 'edit') ?
                                                    <div id="update-category">
                                                        <Edit2 
                                                            size        = {20} 
                                                            onClick     = {() => { setDataForm(data); setModalForm(!modalForm) }} 
                                                            className   = "mr-1 cursor-pointer" 
                                                        />
                                                    </div>
                                                : null
                                            }
                                            {
                                                getRoleByMenuStatus('Kategori', 'delete') ?
                                                    <div id="delete-category">
                                                        <Trash2 
                                                            size        = {20} 
                                                            onClick     = {() => { setIdSelected(data.id); setShowDeleteForm(true) }} 
                                                            className   = "ml-1 cursor-pointer" 
                                                        />
                                                    </div>
                                                : null
                                            }
                                        </Col>
                                    </CustomTableBody>
                                ))
                            }
                        </div>

                        {!listData && listData !== null && <Skeleton height={60} count={3} style={{ marginBottom: "10px" }} />}
                        {!listData && listData === null && <CustomTableBodyEmpty />}
                    </CustomTable>
                :
                    <CustomTableNotAuthorized/>
            }
        </Fragment>
    );
};

export default UserActivity;