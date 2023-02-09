import React, { 
    Fragment, 
    useState, 
    useEffect 
}                                                                   from 'react';
import { useSelector }                                              from 'react-redux';

//Widgets
import CustomToast                                                  from '../../components/widgets/custom-toast';

//Views
import PersetujuanBerita                                            from './approval_news';

//API
import { 
    StoreNews,
    agentReportChangeToArchive,
}                                                                   from '../beranda/beranda_api';
import employeeAPI                                                  from '../../services/pages/employee';
import feedsAgentReportAPI                                          from '../../services/pages/feeds/agent-reports';
import { CategoryProvider }                                         from '../../context/CategoryContext';
import feedsAgentReportApprovalAPI                                  from '../../services/pages/feeds/approval-news/url';
import { processAgentReports }                                      from '../../components/widgets/feeds/news-card-widget/NewsConfig';

//Helper
import Helper                                                       from '../../helpers';



const ApprovalNewsAPI = () => {

    //Helper
    const {getUserData}                                             = Helper

    //State
    const selector                                                  = useSelector(state => {return state});
    
    const [filterAllState, setFilterAllState]                       = useState(null);

    //Archive 
    const [countArchive, setCountArchive]                           = useState(0);
    const [loadingArchive, setLoadingArchive]                       = useState(false);
    const [leftStateArchive, setLeftStateArchive]                   = useState([]);
    const [rightStateArchive, setRightStateArchive]                 = useState([]);
    const [paginationArchive, setPaginationArchive]                 = useState(null);

    //Position Shared
    const [countPositionShared, setCountPositionShared]             = useState(0);
    const [loadingPositionShared, setLoadingPositionShared]         = useState(false);
    const [leftStatePositionShared, setLeftStatePositionShared]     = useState([]);
    const [rightStatePositionShared, setRigthStatePositionShared]   = useState([]);
    const [paginationPositionShared, setPaginationPositionShared]   = useState(null);

    //All Status
    const [countAllStatus, setCountAllStatus]                       = useState(0);
    const [loadingAllStatus, setLoadingAllStatus]                   = useState(false);
    const [leftStateAllStatus, setLeftStateAllStatus]               = useState([]);
    const [rightStateAllStatus, setRightStateAllStatus]             = useState([]);
    const [paginationAllStatus, setPaginationAllStatus]             = useState(null);

    //Type Shared (Dapat Dibaca Semua)
    const [countTypeShared, setCountTypeShared]                     = useState(0);
    const [loadingTypeShared, setLoadingTypeShared]                 = useState(false);
    const [leftStateTypeShared, setLeftStateTypeShared]             = useState([]);
    const [rightStateTypeShared, setRightStateTypeShared]           = useState([]);
    const [paginationTypeShared, setPaginationTypeShared]           = useState(null);

    //Type Shared Limit 
    const [countTypeSharedLimit, setCountTypeSharedLimit]           = useState(0);
    const [loadingTypeSharedLimit, setLoadingTypeSharedLimit]       = useState(false);
    const [leftStateTypeSharedLimit, setLeftStateTypeSharedLimit]   = useState([]);
    const [rightStateTypeSharedLimit, setRightStateTypeSharedLimit] = useState([]);
    const [paginationTypeSharedLimit, setPaginationTypeSharedLimit] = useState(false);

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

    //API remove agent report
    const handleRemoveAgentReport = () => {
        if(paginationAllStatus != null){
            getAgentReportByStatusAll(paginationAllStatus.current_page);
        }else{
            getAgentReportByStatusAll(1);
        }
    };

    //API count agent report all kind
    const getAgentReportCount = () => {
        const params = {
            sort        : 'desc',
            sort_by     : 'updated_at',
            new         : true,
            counter     : true,
            approvement : true,
        }

        feedsAgentReportAPI.getFeeds(params)
        .then(
            res => {
                console.log(res)
                if(!res.is_error){
                    setCountArchive(res.data.restricted)
                    setCountAllStatus(res.data.approvement_all)
                    setCountTypeShared(res.data.can_read_all)
                    setCountPositionShared(res.data.send_to_leader)
                    setCountTypeSharedLimit(res.data.sender_can_read)
                }
            },
            err => {
                CustomToast('danger', 'Terjadi Kesalahan.');
            }
        )
    };

    //API agent report by status (all approval news)
    const getAgentReportByStatusAll = (page) => {

        setLoadingAllStatus(true);

        let formData, params = {};

        if(filterAllState === null){
            formData = {
                category : 0
            }
        }else{
            if(filterAllState.type === "filter"){
                formData = {
                    category          : 0,
                    order_by          : filterAllState.value.order_by,
                    status_publish    : filterAllState.value.status_publish,
                    work_unit_id_list : filterAllState.value.work_unit_id_list,
                }
            }else{
                formData = {
                    category : selector.FeedsCategoriesReducer.activeCategories.id == "all" ? 0 : selector.FeedsCategoriesReducer.activeCategories.id
                }
            }
        }

        if(page != undefined){
            params.page = page;
        }

        if(filterAllState != null && filterAllState.type == 'keyword'){
            params.keyword = filterAllState.value;
        }

        feedsAgentReportApprovalAPI.getAgentByStatus(formData, params).then(
            res => {
                if(!res.is_error){
                    if ("agent_report" in res.data && res.data.agent_report != null) {
                        //get array length
                        let arrLength = res.data.agent_report.length;

                        //search half array length value
                        let getDivision = Math.round(arrLength/2);

                        //get first half array
                        setLeftStateAllStatus(res.data.agent_report.splice(0,getDivision));

                        //get last half array
                        setRightStateAllStatus(res.data.agent_report.splice(0,arrLength-getDivision));

                        setLoadingAllStatus(false);
                        setPaginationAllStatus(res.data.pagination);

                    }else{
                        setLoadingAllStatus(false);
                        setLeftStateAllStatus([]);
                        setRightStateAllStatus([]);
                    }
                }else{
                    CustomToast("danger", res.message);
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
                if(!res.is_error){
                    const {data} = res;
    
                    setLoadingTypeShared(false);
                    setPaginationTypeShared(data.pagination);
    
                    if("agent_report" in res.data && res.data.agent_report != null){
                        processAgentReports(data.agent_report).then(
                            res => {
                                //get array length
                                let arrLength = res.length;
        
                                //search half array length value
                                let getDivision = Math.round(arrLength/2);
                                
                                //get first half array
                                setLeftStateTypeShared(res.splice(0,getDivision));
                                
                                //get last half array
                                setRightStateTypeShared(res.splice(0,arrLength-getDivision));
        
                                

                            }
                        );
                    }else{
                        setLeftStateTypeShared([]);
                        setRightStateTypeShared([]);
                        setLoadingTypeShared(false);
                    }
                }else{
                    CustomToast("danger", res.message);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    //API agent report by type shared (news limit)
    const getAgentReportByTypeSharedLimit = (page) => {

        setLoadingTypeSharedLimit(true);

        const formData = {
            category    : 0,
            shared_type : "specific"
        }

        feedsAgentReportApprovalAPI.getAgentByTypeShared(formData, page).then(
            res => {
                if(!res.is_error){
                    const {data} = res;

                    setLoadingTypeSharedLimit(false);
                    setPaginationTypeSharedLimit(data.pagination);

                    if("agent_report" in res.data && res.data.agent_report != null){
                        processAgentReports(data.agent_report).then(
                            res => {
                                //get array length
                                let arrLength = res.length;
    
                                //search half array length value
                                let getDivision = Math.round(arrLength/2);
                                
                                //get first half array
                                setLeftStateTypeSharedLimit(res.splice(0,getDivision));
                                
                                //get last half array
                                setRightStateTypeSharedLimit(res.splice(0,arrLength-getDivision));
                            }
                        );
                    }else{
                        setLeftStateTypeSharedLimit([]);
                        setRightStateTypeSharedLimit([]);
                        setLoadingTypeSharedLimit(false);
                    }
                }else{
                    CustomToast("danger", res.message);
                }
                setLoadingTypeSharedLimit(false);
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    //API agent report by position shared (sent to leader)
    const getAgentReportByPositionShared = (page) => {
        setLoadingPositionShared(true)
        const formData = {
            category    : 0,
            position_id : 0
        };

        feedsAgentReportApprovalAPI.getAgentByPositionShared(formData, page).then(
            res => {
                if(!res.is_error){
                    if ("agent_report" in res.data && res.data.agent_report != null) {
                        //get array length
                        let arrLength = res.data.agent_report.length;
    
                        //search half array length value
                        let getDivision = Math.round(arrLength/2);
    
                        //get first half array
                        setLeftStatePositionShared(res.data.agent_report.splice(0,getDivision));
    
                        //get last half array
                        setRigthStatePositionShared(res.data.agent_report.splice(0,arrLength-getDivision));

                        setLoadingPositionShared(false);
                        setPaginationPositionShared(res.data.pagination)
                    }else{
                        setLoadingPositionShared(false);
                        setLeftStatePositionShared([]);
                        setRigthStatePositionShared([]);
                    }
                }else{
                    CustomToast("danger", res.message);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    //API agent report by archive (only seen by sender)
    const getAgentReportByArchive = (page) => {

        setLoadingArchive(true);

        const formData = {
            category : 0
        };

        feedsAgentReportApprovalAPI.getAgentByArchive(formData, page).then(
            res => {

                if(!res.is_error){
                    if ("agent_report" in res.data && res.data.agent_report != null) {
                        //get array length
                        let arrLength = res.data.agent_report.length;
    
                        //search half array length value
                        let getDivision = Math.round(arrLength/2);
    
                        //get first half array
                        setLeftStateArchive(res.data.agent_report.splice(0,getDivision));
    
                        //get last half array
                        setRightStateArchive(res.data.agent_report.splice(0,arrLength-getDivision));

                        setLoadingArchive(false);
                        setPaginationArchive(res.data.pagination);

                    }else{
                        setLeftStateArchive([]);
                        setRightStateArchive([]);
                    }
                }else{
                    CustomToast("danger", res.message);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };


    useEffect(() => {

        getAgentReportCount(); 

        getAgentReportByArchive(1);
        getAgentReportByStatusAll(1);
        getAgentReportByTypeSharedRead(1);
        getAgentReportByPositionShared(1);
        getAgentReportByTypeSharedLimit(1);
        
    }, [filterAllState]);

    return (
        <Fragment>
            <CategoryProvider>

                <PersetujuanBerita
                    //State
                    filterAllState                  = {filterAllState}
                    setFilterAllState               = {setFilterAllState}
                    
                    //All Status
                    countAllStatus                  = {countAllStatus}      
                    loadingAllStatus                = {loadingAllStatus}
                    leftStateAllStatus              = {leftStateAllStatus}
                    rightStateAllStatus             = {rightStateAllStatus}
                    paginationAllStatus             = {paginationAllStatus}
                    getAgentReportByStatusAll       = {getAgentReportByStatusAll}

                    //Type Shared (Dapat Dibaca Semua)
                    countTypeShared                 = {countTypeShared}
                    loadingTypeShared               = {loadingTypeShared}
                    leftStateTypeShared             = {leftStateTypeShared}
                    rightStateTypeShared            = {rightStateTypeShared}
                    paginationTypeShared            = {paginationTypeShared}
                    getAgentReportByTypeSharedRead  = {getAgentReportByTypeSharedRead}

                    //Type Shared Limit (Pembatasan Berita)
                    countTypeSharedLimit            = {countTypeSharedLimit}
                    loadingTypeSharedLimit          = {loadingTypeSharedLimit}
                    leftStateTypeSharedLimit        = {leftStateTypeSharedLimit}
                    rightStateTypeSharedLimit       = {rightStateTypeSharedLimit}
                    paginationTypeSharedLimit       = {paginationTypeSharedLimit}
                    getAgentReportByTypeSharedLimit = {getAgentReportByTypeSharedLimit}

                    //Acrhive
                    countArchive                    = {countArchive}
                    loadingArchive                  = {loadingArchive}
                    leftStateArchive                = {leftStateArchive}
                    rightStateArchive               = {rightStateArchive}
                    paginationArchive               = {paginationArchive}
                    getAgentReportByArchive         = {getAgentReportByArchive}

                    //Position Shared
                    countPositionShared             = {countPositionShared}
                    loadingPositionShared           = {loadingPositionShared}
                    leftStatePositionShared         = {leftStatePositionShared}
                    rightStatePositionShared        = {rightStatePositionShared}
                    paginationPositionShared        = {paginationPositionShared}
                    getAgentReportByPositionShared  = {getAgentReportByPositionShared}

                    //Function
                    handleStore                     = {handleStore}
                    changeToArchive                 = {changeToArchive}
                    getAgentReportCount             = {getAgentReportCount}
                    handleRemoveAgentReport         = {handleRemoveAgentReport}

                />
            </CategoryProvider>

        </Fragment>
    );
};

export default ApprovalNewsAPI;