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
    
    const [filter, setFilter]                                       = useState(null);
    const [filterKeyword, setFilterKeyword]                         = useState(null);
    const [filterCategory, setFilterCategory]                       = useState(null);
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

    //API agent report by status (all approval news)
    const getAgentReportByStatusAll = (page) => {

        setLoadingAllStatus(true);

        let params = {};

        params.approvement = 'approvement';
        params.new         = true;
        params.sort_by     = 'updated_at';
        params.sort        = 'desc';
        params.page        = page;

        if(filter != null){
            params.sort           = filter.value.order_by === 'latest' ? 'desc' : 'asc';
            params.workunit_id    = filter.value.work_unit_id_list[0];
            params.level          = filter.value.status_publish
        }else{
            params.workunit_id    = 0;
        }

        if(filterCategory != null){
            if(filterCategory.value.id != 'all'){
                params.category_id    = parseInt(filterCategory.value.id)
            }
        }else{
            params.category_id    = 0
        }

        if(filterKeyword != null){
            params.keyword        = filterKeyword.value
        }

        feedsAgentReportAPI.getFeeds(params).then(
            res => {
                if(!res.is_error){
                    if ("result" in res.data && res.data.result != null) {
                        //get array length
                        let arrLength = res.data.result.length;

                        //search half array length value
                        let getDivision = Math.round(arrLength/2);

                        //get first half array
                        setLeftStateAllStatus(res.data.result.splice(0,getDivision));

                        //get last half array
                        setRightStateAllStatus(res.data.result.splice(0,arrLength-getDivision));

                        setCountAllStatus(res.data.pagination.data_total);
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
        )
    };

    //API agent report by type shared (all can be read)
    const getAgentReportByTypeSharedRead = (page) => {

        setLoadingTypeShared(true);

        let params = {};

        params.approvement = 'public';
        params.new         = true;
        params.sort_by     = 'updated_at';
        params.sort        = 'desc';
        params.page        = page;

        if(filter != null){
            params.sort           = filter.value.order_by === 'latest' ? 'desc' : 'asc';
            params.workunit_id    = filter.value.work_unit_id_list[0];
            params.level          = filter.value.status_publish
        }

        if(filterCategory != null){
            if(filterCategory.value.id != 'all'){
                params.category_id    = parseInt(filterCategory.value.id)
            }
        }

        if(filterKeyword != null){
            params.keyword        = filterKeyword.value
        }

        feedsAgentReportAPI.getFeeds(params).then(
            res => {
                if(!res.is_error){
                    setCountTypeShared(res.data.pagination.data_total);
                    setLoadingTypeShared(false);
                    setPaginationTypeShared(res.data.pagination);
    
                    if("result" in res.data && res.data.result != null){
                        processAgentReports(res.data.result).then(
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

        let params = {};

        params.approvement = 'restrict';
        params.new         = true;
        params.sort_by     = 'updated_at';
        params.sort        = 'desc';
        params.page        = page;

        if(filter != null){
            params.sort           = filter.value.order_by === 'latest' ? 'desc' : 'asc';
            params.workunit_id    = filter.value.work_unit_id_list[0];
            params.level          = filter.value.status_publish
        }

        if(filterCategory != null){
            if(filterCategory.value.id != 'all'){
                params.category_id    = parseInt(filterCategory.value.id)
            }
        }

        if(filterKeyword != null){
            params.keyword        = filterKeyword.value
        }

        feedsAgentReportAPI.getFeeds(params).then(
            res => {
                if(!res.is_error){
                    const {data} = res;
                    setCountTypeSharedLimit(res.data.pagination.data_total);
                    setLoadingTypeSharedLimit(false);
                    setPaginationTypeSharedLimit(data.pagination);

                    if("result" in res.data && res.data.result != null){
                        processAgentReports(data.result).then(
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

        let params = {};

        params.approvement = 'leader';
        params.new         = true;
        params.sort_by     = 'updated_at';
        params.sort        = 'desc';
        params.page        = page;

        if(filter != null){
            params.sort           = filter.value.order_by === 'latest' ? 'desc' : 'asc';
            params.workunit_id    = filter.value.work_unit_id_list[0];
            params.level          = filter.value.status_publish
        }

        if(filterCategory != null){
            if(filterCategory.value.id != 'all'){
                params.category_id    = parseInt(filterCategory.value.id)
            }
        }

        if(filterKeyword != null){
            params.keyword        = filterKeyword.value
        }

        feedsAgentReportAPI.getFeeds(params).then(
            res => {
                if(!res.is_error){
                    if ("result" in res.data && res.data.result != null) {
                        //get array length
                        let arrLength = res.data.result.length;
    
                        //search half array length value
                        let getDivision = Math.round(arrLength/2);
    
                        //get first half array
                        setLeftStatePositionShared(res.data.result.splice(0,getDivision));
    
                        //get last half array
                        setRigthStatePositionShared(res.data.result.splice(0,arrLength-getDivision));

                        setCountPositionShared(res.data.pagination.data_total); 
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

        let params = {};

        params.approvement = 'archive';
        params.new         = true;
        params.sort_by     = 'updated_at';
        params.sort        = 'desc';
        params.page        = page;

        if(filter != null){
            params.sort           = filter.value.order_by === 'latest' ? 'desc' : 'asc';
            params.workunit_id    = filter.value.work_unit_id_list[0];
            params.level          = filter.value.status_publish
        }

        if(filterCategory != null){
            if(filterCategory.value.id != 'all'){
                params.category_id    = parseInt(filterCategory.value.id)
            }
        }

        if(filterKeyword != null){
            params.keyword        = filterKeyword.value
        }

        feedsAgentReportAPI.getFeeds(params).then(
            res => {

                if(!res.is_error){
                    if ("result" in res.data && res.data.result != null) {
                        //get array length
                        let arrLength = res.data.result.length;
    
                        //search half array length value
                        let getDivision = Math.round(arrLength/2);
    
                        //get first half array
                        setLeftStateArchive(res.data.result.splice(0,getDivision));
    
                        //get last half array
                        setRightStateArchive(res.data.result.splice(0,arrLength-getDivision));

                        setCountArchive(res.data.pagination.data_total);
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

        getAgentReportByArchive(1);
        getAgentReportByStatusAll(1);
        getAgentReportByTypeSharedRead(1);
        getAgentReportByPositionShared(1);
        getAgentReportByTypeSharedLimit(1);
        
    }, [filter, filterKeyword, filterCategory]);

    return (
        <Fragment>
            <CategoryProvider>

                <PersetujuanBerita
                    //State
                    filterAllState                  = {filterAllState}
                    setFilterAllState               = {setFilterAllState}
                    setFilter                       = {setFilter}
                    setFilterKeyword                = {setFilterKeyword}
                    setFilterCategory               = {setFilterCategory}
                    
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
                    handleRemoveAgentReport         = {handleRemoveAgentReport}

                />
            </CategoryProvider>

        </Fragment>
    );
};

export default ApprovalNewsAPI;