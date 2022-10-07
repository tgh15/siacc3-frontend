import React, { Fragment, useState, useEffect }     from 'react';
import { useSelector }                                 from 'react-redux';

//Widgets
import CustomToast                                  from '../../components/widgets/custom-toast';

//Views
import PersetujuanBerita                            from './approval_news';

//API
import { processAgentReports }                      from '../../components/widgets/feeds/news-card-widget/NewsConfig';
import feedsAgentReportApprovalAPI                  from '../../services/pages/feeds/approval-news/url';
import { agentReportChangeToArchive, StoreNews }    from '../beranda/beranda_api';
import { CategoryProvider }                         from '../../context/CategoryContext';
import employeeAPI                                  from '../../services/pages/employee';


const ApprovalNewsAPI = () => {
    //State
    const selector                                                  = useSelector(state => {return state});
    
    const [workunitFilter, setWorkunitFilter]                       = useState([]);
    
    const [filterAllState, setFilterAllState]                       = useState(null);

    const [archiveLeftState, setArchiveLeftState]                   = useState([]);
    const [archiveRightState, setArchiveRightState]                 = useState([]);
    const [statusAllLeftState, setStatusAllLeftState]               = useState([]);
    const [statusAllRightState, setStatusAllRightState]             = useState([]);
    const [positionSharedLeftState, setPositionSharedLeftState]     = useState([]);
    const [positionSharedRightState, setPositionSharedRightState]   = useState([]);


    //All Status
    const [allStatusPage, setAllStatusPage]                         = useState(1);
    const [allStatusCount, setAllStatusCount]                       = useState(1);
    const [loadingAllState, setLoadingAllState]                     = useState(false);
    const [allStatusPagination, setAllStatusPagination]             = useState(null);

    //Type Shared
    const [loadingTypeShared, setLoadingTypeShared]                 = useState(false);
    const [typeSharedLeftState, setTypeSharedLeftState]             = useState([]);
    const [typeSharedRightState, setTypeSharedRightState]           = useState([]);
    const [typeSharedPagination, setTypeSharedPagination]           = useState(null);

    //Type Shared Limit
    const [loadingTypeSharedLimit, setLoadingTypeShareLimit]        = useState(false);
    const [typeSharedLimitLeftState, setTypeSharedLimitLeftState]   = useState([]);
    const [typeSharedLimitRightState, setTypeSharedLimitRightState] = useState([]);
    const [typeSharedLimitPagination, setTypeSharedLimitPagination] = useState(false);

    //API archive news
    const changeToArchive = (option) => {
        const {id} = option;

        agentReportChangeToArchive(id).then(() => {
            getAgentReportByStatusAll();
            CustomToast("success", "Berita Berhasil diarsipkan");
        }).catch((error) => {
            CustomToast("danger", "Gagal mengarsipkan Berita");
            console.log(error);
        })
    };

    //Stored News
    const handleStore = (stored_data,resps) => {
        StoreNews(stored_data,resps);
    };

    //API agent report by status (all approval news)
    const getAgentReportByStatusAll = (page) => {

        setLoadingAllState(true);

        let formData;

        if(filterAllState === null){
            formData = {
                category : 0
            }
        }else{
            if(filterAllState.type === "filter"){
                formData = {
                    category          : 0,
                    order_by          : filterAllState.value.order_by,
                    status_order      : filterAllState.value.status_order,
                    work_unit_id_list : filterAllState.value.work_unit_id_list,
                }
            }else{
                formData = {
                    category : selector.FeedsCategoriesReducer.activeCategories.id == "all" ? 0 : selector.FeedsCategoriesReducer.activeCategories.id
                }
            }
        }

        feedsAgentReportApprovalAPI.getAgentByStatus(formData, page, filterAllState != null && filterAllState.type == 'keyword' ? filterAllState.value : null).then(
            res => {
                if ("agent_report" in res.data && res.data.agent_report != null) {
                    //get array length
                    let arrLength = res.data.agent_report.length;

                    //search half array length value
                    let getDivision = Math.round(arrLength/2);

                    //get first half array
                    setStatusAllLeftState(res.data.agent_report.splice(0,getDivision));

                    //get last half array
                    setStatusAllRightState(res.data.agent_report.splice(0,arrLength-getDivision));

                    setAllStatusCount(res.data.pagination.data_total);
                    setLoadingAllState(false);
                    setAllStatusPagination(res.data.pagination);

                }else{
                    setLoadingAllState(false);
                    setStatusAllLeftState([]);
                    setStatusAllRightState([]);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    //API agent report by type shared (all can be read)
    const getAgentReportByTypeSharedRead = (page) => {

        setLoadingTypeShared(true);

        const formData = {
            category    : 0,
            shared_type : ""
        };

        feedsAgentReportApprovalAPI.getAgentByTypeShared(formData, page).then(
            res => {
                const {data} = res;

                setTypeSharedPagination(data.pagination);

                if(data.agent_report === null){
                    setTypeSharedLeftState([]);
                    setTypeSharedRightState([]);
                    setLoadingTypeShared(false);
                }else{
                    processAgentReports(data.agent_report).then(
                        res => {
                            //get array length
                            let arrLength = res.length;

                            //search half array length value
                            let getDivision = Math.round(arrLength/2);
                            
                            //get first half array
                            setTypeSharedLeftState(res.splice(0,getDivision));
                            
                            //get last half array
                            setTypeSharedRightState(res.splice(0,arrLength-getDivision));

                            setLoadingTypeShared(false);
                        }
                        );
                    }
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    //API agent report by type shared (news limit)
    const getAgentReportByTypeSharedLimit = (page) => {

        setLoadingTypeShareLimit(true);

        const formData = {
            category    : 0,
            shared_type : "specific"
        }

        feedsAgentReportApprovalAPI.getAgentByTypeShared(formData, page).then(
            res => {
                const {data} = res;
                setTypeSharedLimitPagination(data.pagination);

                if(data.agent_report === null){
                    setTypeSharedLimitLeftState([]);
                    setTypeSharedLimitRightState([]);
                }else{
                    processAgentReports(data.agent_report).then(
                        res => {
                            //get array length
                            let arrLength = res.length;

                            //search half array length value
                            let getDivision = Math.round(arrLength/2);
                            
                            //get first half array
                            setTypeSharedLimitLeftState(res.splice(0,getDivision));
                            
                            //get last half array
                            setTypeSharedLimitRightState(res.splice(0,arrLength-getDivision));
                        }
                    );
                }

                setLoadingTypeShareLimit(false);
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    //API agent report by position shared (sent to leader)
    const getAgentReportByPositionShared = (page) => {
        const formData = {
            category    : 0,
            position_id : 0
        };

        feedsAgentReportApprovalAPI.getAgentByPositionShared(formData, page).then(
            res => {
                if ("agent_report" in res.data && res.data.agent_report != null) {
                    //get array length
                    let arrLength = res.data.agent_report.length;

                    //search half array length value
                    let getDivision = Math.round(arrLength/2);

                    //get first half array
                    setPositionSharedLeftState(res.data.agent_report.splice(0,getDivision));

                    //get last half array
                    setPositionSharedRightState(res.data.agent_report.splice(0,arrLength-getDivision));
                }else{
                    setPositionSharedLeftState([]);
                    setPositionSharedRightState([]);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    //API agent report by archive (only seen by sender)
    const getAgentReportByArchive = (page) => {
        const formData = {
            category : 0
        };

        feedsAgentReportApprovalAPI.getAgentByArchive(formData, page).then(
            res => {
                if ("agent_report" in res.data && res.data.agent_report != null) {
                    //get array length
                    let arrLength = res.data.agent_report.length;

                    //search half array length value
                    let getDivision = Math.round(arrLength/2);

                    //get first half array
                    setArchiveLeftState(res.data.agent_report.splice(0,getDivision));

                    //get last half array
                    setArchiveRightState(res.data.agent_report.splice(0,arrLength-getDivision));
                }else{
                    setArchiveLeftState([]);
                    setArchiveRightState([]);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    //API get workunit child
    const getWorkunitChild = () => {
        const formData = {
            condition_by  : "by_parent_list",
            parent_id     : parseInt(localStorage.getItem('workunit_id'))
        }

        employeeAPI.getChild(formData).then(
            res => {
                if(res.status === 200 && res.data != null && res.data.length > 0){

                    let level_1 = [];
                    let level_2 = [];
                    let level_3 = [];
                    let level_4 = [];
                    let data    = [];

                    res.data.map((data) => {
                        if(data.workunit_level_id === 1){
                            level_1.push({
                                value : data.id,
                                label : data.name
                            });
                        }

                        if(data.workunit_level_id === 2){
                            level_2.push({
                                value : data.id,
                                label : data.name
                            });
                        }

                        if(data.workunit_level_id === 3){
                            level_3.push({
                                value : data.id,
                                label : data.name
                            });
                        }

                        if(data.workunit_level_id === 4){
                            level_4.push({
                                value : data.id,
                                label : data.name
                            });
                        }
                    })
                    
                    if(level_1.length > 0){
                        data.push({
                            label   : 'Kejaksaan Agung',
                            options : level_1 
                        })
                    }

                    if(level_2.length > 0){
                        data.push({
                            label : 'Kejaksaan Tinggi',
                            options : level_2
                        })
                    }

                    if(level_3.length > 0){
                        data.push({
                            label : 'Kejaksaan Negeri',
                            options : level_3
                        })
                    }

                    if(level_4.length > 0){
                        data.push({
                            label : 'Cabang Kejaksaan Negeri',
                            options : level_4
                        })
                    }

                    setWorkunitFilter(data);
                }
            },
            err => {
                console.log(err, 'get workunit child')
            }
        )
    }; 

    const handleRemoveAgentReport = () => {
        if(allStatusPagination != null){
            getAgentReportByStatusAll(allStatusPagination.current_page);
        }else{
            getAgentReportByStatusAll(1);
        }
    };

    useEffect(() => {
        if(filterAllState == null){
            getWorkunitChild();
        }

        getAgentReportByStatusAll();
    }, [filterAllState]);

    return (
        <Fragment>
            <CategoryProvider>

                <PersetujuanBerita
                    //State
                    workunitFilter              = {workunitFilter}

                    //status State
                    filterAllState              = {filterAllState}
                    loadingAllState             = {loadingAllState}
                    setFilterAllState           = {setFilterAllState}
                    statusAllLeftState          = {statusAllLeftState}
                    statusAllRightState         = {statusAllRightState}

                    //All State
                    allStatusPage               = {allStatusPage}
                    allStatusCount              = {allStatusCount}      
                    setAllStatusPage            = {setAllStatusPage}
                    allStatusPagination         = {allStatusPagination}
                    setAllStatusPagination      = {setAllStatusPagination}
                    getAgentReportByStatusAll   = {getAgentReportByStatusAll}

                    //Type Shared
                    loadingTypeShared               = {loadingTypeShared}
                    typeSharedLeftState             = {typeSharedLeftState}
                    typeSharedRightState            = {typeSharedRightState}
                    typeSharedPagination            = {typeSharedPagination}
                    getAgentReportByTypeSharedRead  = {getAgentReportByTypeSharedRead}

                    //Type Shared Limit
                    loadingTypeSharedLimit      = {loadingTypeSharedLimit}
                    typeSharedLimitLeftState    = {typeSharedLimitLeftState}
                    typeSharedLimitRightState   = {typeSharedLimitRightState}
                    typeSharedLimitPagination   = {typeSharedLimitPagination}
                    getAgentReportByTypeSharedLimit = {getAgentReportByTypeSharedLimit}


                    archiveLeftState            = {archiveLeftState}
                    archiveRightState           = {archiveRightState}
                    positionSharedLeftState     = {positionSharedLeftState}
                    positionSharedRightState    = {positionSharedRightState}

                    //Function
                    handleStore                     = {handleStore}
                    changeToArchive                 = {changeToArchive}
                    handleRemoveAgentReport         = {handleRemoveAgentReport}
                    getAgentReportByPositionShared  = {getAgentReportByPositionShared}

                    //getAgentReportByArchive
                    getAgentReportByArchive     = {getAgentReportByArchive}
                />
            </CategoryProvider>

        </Fragment>
    );
};

export default ApprovalNewsAPI;