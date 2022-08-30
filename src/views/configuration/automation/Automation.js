import { Fragment, useEffect, useState } from "react";
import { Col }                           from "reactstrap";
import { Edit2, Eye, Trash2 }            from "react-feather";
import Skeleton                          from "react-loading-skeleton";

//Css
import '@styles/react/libs/flatpickr/flatpickr.scss';

//Helper
import Helper                            from "../../../helpers";

//UrlAapi
import AutomationApi                     from "../../../services/pages/configuration/automation";

//Components
import Filter                            from "./Filter";
import EditForm                          from "./EditForm";
import CreateForm                        from "./CreateForm";
import FormDelete                        from "../../../components/widgets/form-delete/FormDelete";
import headerTable                       from "./headerTable";
import CustomTable                       from "../../../components/widgets/custom-table";
import CustomToast                       from "../../../components/widgets/custom-toast";
import CustomTableBody                   from "../../../components/widgets/custom-table/CustomTableBody";
import CustomTableBodyEmpty              from "../../../components/widgets/custom-table/CustomTableBodyEmpty";


const Automatitation = (props) => {
    //Props
    const {setShowAction}                     = props;
    
    //States
    const [thens, setThens]                   = useState([]);
    const [showForm, setShowForm]             = useState(false);
    const [showEdit, setShowEdit]             = useState(false);
    const [dataEdit, setDataEdit]             = useState(false);
    const [listData, setListData]             = useState(false);
    const [operators, setOperators]           = useState([]);
    const [searchTerm, setSearchTerm]         = useState("");
    const [statements, setStatements]         = useState([]);
    const [showFilter, setShowFilter]         = useState(false);
    const [dataFilters, setDataFilters]       = useState([]);
    const [dataSelected, setDataSelected]     = useState(false);
    const [loadingDelete, setLoadingDelete]   = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    //Helper
    const {useQuery}                          = Helper;

    let query                                 = useQuery();

    // useEffect tour action
    useEffect(() => {
        if(query.get('action') === 'get'){
            setShowAction('get');
        }else if(query.get('action') === 'search'){
            setShowAction('search');
        }else if(query.get('action') === 'delete'){
            setShowAction('delete');
        }else if(query.get('action') === 'create'){
            setShowAction('create');
        }else if(query.get('action') === 'update'){
            setShowAction('update');
        }else if(query.get('action') === 'detail'){
            setShowAction('detail');
        }
    }, []);

    // get data automation
    const getData = () => {
        setListData(false);
        AutomationApi.getAll().then(res => {
            setListData(res.data);
        }, err => {
            console.log(err);
        });
    };

    // get data statement
    const getStatement = () => {
        AutomationApi.getStatement().then(res => {
            setStatements(res.data);
        }, err => {
            console.log(err);
        });
    };

    // get data operator
    const getOperator = () => {
        AutomationApi.getOperator().then(res => {
            setOperators(res.data);
        }, err => {
            console.log(err);
        });
    };

    // get data then
    const getThen = () => {
        AutomationApi.getthen().then(res => {
            setThens(res.data);
        }, err => {
            console.log(err);
        });
    };

    // delete data automation
    const onDelete = () => {
        setLoadingDelete(true);
        AutomationApi.remove(dataSelected.model_id).then(res => {
            setLoadingDelete(false);
            setShowDeleteForm(false);
            CustomToast("success", "Data Berhasil dihapus");
            getData();
        }, err => {
            setLoadingDelete(false);
            setShowDeleteForm(false);
            console.log(err);
        })
    };

    {/* get data filter 
       onclick detail button
       params = model_id (int) 
    */}
    const getDataFilter = id => {
        AutomationApi.result({ id: id }).then(res => {
            setDataFilters(res.data.list);
            setShowFilter(!showFilter);
        }, err => {
            console.log(err);
        })
    }

    {/* get data detail 
       onclick detail button
       params = id (int) 
    */}
    const handleEdit = id => {
        // AutomationApi.getDetail({ id: id }).then(res => {
        //     setDataEdit(res.data);
        //     setShowEdit(!showEdit);
        // }, err => {
        //     console.log(err);
        // })
    }

    const defaultValueFormRepeat = data => {
        var form    = [];
        var count   = 0;
        var dataAnd = data.model?.auto_relations_and;
        var dataOr  = data.model?.auto_relations_or;

        for (let i = 1; i < data.model?.auto_relations_and.length; i++) {
            form.push({
                index        : count + 1,
                condition    : "and",
                statement_id : dataAnd[i]?.statement_id,
                operator_id  : dataAnd[i]?.operator_id,
                value        : dataAnd[i]?.value,
                options      : statements.filter(item => item.id == dataAnd[i]?.statement_id)[0]?.values,
            });
            count++;
        }

        for (var i = 0; i < data.model?.auto_relations_or.length; i++) {
            form.push({
                index        : count + 1,
                condition    : "or",
                statement_id : dataOr[i]?.statement_id,
                operator_id  : dataOr[i]?.operator_id,
                value        : dataOr[i]?.value,
                options      : statements.filter(item => item.id == dataOr[i]?.statement_id)[0]?.values,
            });
        }
        setDataEdit(form);
        setShowEdit(true);
    };

    // use Effect
    useEffect(() => {
        getData();
        getThen();
        getStatement();
        getOperator();
    }, []);

    return (
        <Fragment>
            {/* modal Delete */}
            <FormDelete
                show        = {showDeleteForm}
                title       = "Hapus Automation"
                loading     = {loadingDelete}
                setShow     = {(par) => setShowDeleteForm(par)}
                onDelete    = {onDelete}
                description = {dataSelected && dataSelected.model.title}
            />
            {/* modal Form Create  */}
            <CreateForm 
                thens       = {thens}
                onClose     = {() => setShowForm(!showForm)}
                getData     = {getData} 
                showForm    = {showForm}
                statements  = {statements}
                operators   = {operators}
            />

            {/* modal Form Edit  */}
            <EditForm 
                data        = {dataSelected}
                thens       = {thens}
                onClose     = {() => setShowEdit(!showEdit)}
                getData     = {getData}
                unmount     = {true}
                showForm    = {showEdit}
                dataEdit    = {dataEdit}
                operators   = {operators}
                statements  = {statements}
            />

            {/* modal filter */}
            <Filter
                data        = {dataSelected}
                show        = {showFilter}
                onClose     = {() => setShowFilter(!showFilter)}
                dataFilters = {dataFilters}
            />

            <CustomTable
                header      = {headerTable}
                roleAdd     = {true}
                onSearch    = {(params) => { setSearchTerm(params) }}
                onClickForm = {() => { setShowForm(!showForm) }}
            >
                <div id="automation-table">
                    {
                        listData && listData.filter((val) => {
                            if (searchTerm == "") {
                                return val
                            } else if (val.model.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val
                            }
                        }).map((data, i) => (
                            <CustomTableBody key={i}>
                                <Col md="1">
                                    {i + 1}
                                </Col>
                                <Col md="8">
                                    {data.model.title}
                                </Col>
                                <Col 
                                    md        = "3" 
                                    className = "d-flex justify-content-arround"
                                >
                                    {/* button detail */}
                                    <Eye
                                        id        = {`automation-detail`}
                                        size      = {20}
                                        onClick   = {() => { 
                                            setDataSelected(data); 
                                            getDataFilter(data.model_id); 
                                        }}
                                        className = "cursor-pointer"
                                    />

                                    {/* button edit */}
                                    <Edit2
                                        id        = {`automation-update`}
                                        size      = {20}
                                        onClick   = {() => { 
                                            setDataSelected(data); 
                                            defaultValueFormRepeat(data); 
                                        }}
                                        className = "ml-2 cursor-pointer"
                                    />

                                    {/* button delete */}
                                    <Trash2
                                        id        = {`automation-delete`}
                                        size      = {20}
                                        onClick   = {() => { 
                                            setDataSelected(data); 
                                            setShowDeleteForm(true)
                                        }}
                                        className = "ml-2 cursor-pointer"
                                    />
                                </Col>
                            </CustomTableBody>
                        ))
                    }
                </div>

                {!listData && listData !== null && <Skeleton height={60} count={3} style={{ marginBottom: "10px" }} />}
                {!listData && listData === null && <CustomTableBodyEmpty />}
            </CustomTable>
        </Fragment>
    );
};

export default Automatitation;