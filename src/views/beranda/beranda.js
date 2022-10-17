import React, { 
    useState, 
    Fragment, 
    useEffect, 
    useContext, 
}                                               from 'react';

import InfiniteScroll                           from "react-infinite-scroll-component";

import { Col, Row, Spinner }                    from 'reactstrap';
import { useSelector }                          from 'react-redux';

import { FeedWrapper }                          from './wrapper';


//Components
import CustomToast                              from '../../components/widgets/custom-toast';
import FeedSkeleton                             from '../../components/widgets/feed-skeleton/FeedSkeleton';
import { NewsFeedAddWidget }                    from '../../components/widgets/feeds/news-feed-add-card';
import { BerandaFileProvider }                  from '../../components/utility/context/pages/beranda';
import { FeedCategoriesWidget }                 from '../../components/widgets/feeds/feeds-categories-components';
import { FeedsApprovedNewsCard }                from '../../components/widgets/feeds/feeds-approved-news';
import { FeedsTrendWidget, TrendDefaultData }   from '../../components/widgets/feeds/feeds-trend';
import CustomTableNotAuthorized                 from '../../components/widgets/custom-table/CustomTableNotAuthorized';


//Helper
import Helper                                   from '../../helpers';

//API
import { 
    StoreNews ,
    getAgentReport, 
    filterAgentReport, 
    getApprovedBerandaFeeds, 
    agentReportChangeToArchive, 
}                                               from './beranda_api';

import { processAgentReports }                  from '../../components/widgets/feeds/news-card-widget/NewsConfig';
import { CategoryContext }                      from '../../context/CategoryContext';
import feedsBerandaAgentReport                  from '../../services/pages/feeds/beranda/url';
import moment from 'moment';

const Beranda = (props) => {

    //Context
    const {category: categories}                   = useContext(CategoryContext);

    //State
    const [page,setPage]                           = useState(1);
    const [feed,setFeed]                           = useState(null);
    const [filter,setFilter]                       = useState(false);
    const [trophy, setTrophy]                      = useState(null);
    const [hasNext,setHasNext]                     = useState(false);
    const [loadMore,setLoadMore]                   = useState(false);
    const [approveds,setApproveds]                 = useState(null);
    const [loadingFeeds,setLoadingFeeds]           = useState(false);
    const [filteredState,setFilteredState]         = useState({});
    const [loadDataFeeds,setLoadDataFeeds]         = useState(true);
    const [loadingApprove,setLoadingApprove]       = useState(false);
    const [trendingReport, setTrendingReport]      = useState([]);
    const [refreshApproved,setRefreshApproved]     = useState(true);
    const [trophyPagination, setTrophyPagination]  = useState(null);
    
    const selector                                 = useSelector(state => {return state});

    const {getRoleByMenuStatus}                    = Helper;

    const changeToArchive = (option) =>  {
        const {id} = option;

        agentReportChangeToArchive(id).then(() => {
            setRefreshApproved(true);
            CustomToast("success","Berita berhasil diarsipkan!");
        }).catch((error) => {
            CustomToast("danger","Gagal mengarsipkan berita!");
            console.log(error);
        })
    };

    const filtered = (opt) => {
        setFeed(null);
        setFilter(true);
        setFilteredState(opt);
        setLoadDataFeeds(true);
    };

    const handleStore = (stored_data, resps) => {
        StoreNews(stored_data, resps);
    };

    const getAgentReportData = () => {

        //selected category 
        const catsdata = selector.FeedsCategoriesReducer.activeCategories.id;
        
        setLoadingFeeds(true);

        getAgentReport(page, (catsdata === "all" ? null : catsdata)).then(result => {
            if(result.results != undefined){
                if(loadMore){
                    setLoadMore(false);
                }

                let feed_ = feed == null ? [] : [...feed];
                
                result.results.map((data) => (
                    feed_.push(data)
                ))

                let next = result.response.pagination.has_next;
                setHasNext(next);

                setFeed([...feed_]);
                setLoadingFeeds(false);
            }else{
                setLoadingFeeds(false);
                setFeed([]);
            }
        }).catch((err) => {
            setLoadingFeeds(false);
        })
    }

    const getTrendingReport = () => {

        let formData = {
            trending_type : 'national',
            workunit      : [],
            start_date    : moment().format('YYYY-MM-DD'),
            end_date      : moment().format('YYYY-MM-DD'),
        };

        feedsBerandaAgentReport.getTrendingByType(formData).then(
            res => {
                const {data} = res;

                if (data.agent_report === null) {
                    setTrendingReport([]);
                }else{
                    processAgentReports(data.agent_report).then(
                        res => {
                            setTrendingReport(res);
                        }
                    )
                }
            },
            err => {
                CustomToast('danger', err.message);
            }
        );
    };

    useEffect(() => {
        getAgentReportData();
        getTrendingReport();
    }, []);

    useEffect(() => {
        if(refreshApproved){
            setLoadingApprove(true);

            getApprovedBerandaFeeds().then(result => {
                setApproveds(result);
                setLoadingApprove(false);
                setRefreshApproved(false);
            })
        }
    },[selector, refreshApproved]);

    useEffect(() => {                                                        
        try {
            if(!filter && loadDataFeeds && !loadingFeeds) {
                getAgentReportData();
            }else if(filter && loadDataFeeds && !loadingFeeds) {
                setLoadingFeeds(true);
                setLoadDataFeeds(false);
                filterAgentReport(page,filteredState).then(res => {
                    setLoadingFeeds(false);

                    let feed_ = feed == null ? [] : [...feed];

                    if(res.results != undefined){
                        res.results.map((data) => (
                            feed_.push(data)
                        ))
                    }

                    let next = res.response.pagination.has_next;

                    setHasNext(next);
                    setFeed([...feed_]);

                }).catch(err => {
                    console.log(err, 'err filter beranda')
                    setLoadingFeeds(false);
                    setFeed([]);
                    CustomToast("danger", "Gagal memuat berita");
                })
            }
        }catch(err){
            console.log("err",err);
        }
    },[selector, loadDataFeeds, page, filteredState]);

    return (
        <Fragment>
            <Row>
                <Col
                    lg = "9"
                    md = "12"
                    sm = "12"
                >
                    <InfiniteScroll
                        next        = {() => {setPage(prev => prev+1)}}
                        style       = {{ overflowX: 'hidden' }}
                        loader      = {<h4 className='text-center'>Loading...</h4>}
                        hasMore     = {hasNext}
                        dataLength  = {feed == null ? 0 : feed.length}
                    >
                        <Fragment>
                            <BerandaFileProvider>
                                {
                                    getRoleByMenuStatus('Beranda', 'create_agent_report') ? 
                                        <NewsFeedAddWidget onSave = {() => {setRefreshApproved(true)}}/>
                                    :
                                        null
                                }
                            </BerandaFileProvider>
                            {
                                getRoleByMenuStatus('Beranda', 'agent_report_list') ? 
                                    Array.isArray(categories) && categories.length > 0 ? (
                                        <FeedCategoriesWidget 
                                            onFilter           = {(opt) => {filtered(opt)}}
                                            categories         = {categories}
                                            onChangeCategories = {() => {
                                                setPage(1);
                                                setFeed(null);
                                                setLoadDataFeeds(true);
                                            }}
                                            getAgentReport     = {getAgentReportData}
                                        />
                                    ) : null
                                :
                                    null
                            }
                        </Fragment>

                        {
                            getRoleByMenuStatus('Beranda', 'agent_report_list') ? 

                                !Array.isArray(feed) ? 
                                    (
                                        loadingFeeds ? 
                                        <FeedSkeleton count={2}/> : 
                                        <FeedWrapper
                                            trophy              = {trophy}
                                            feeds               = {feed}
                                            handleStore         = {handleStore}
                                            trophyPagination    = {trophyPagination}
                                            // getAgentReportData  = {getAgentReportData}
                                        />
                                    ) 
                                :
                                    <FeedWrapper 
                                        trophy              = {trophy}
                                        feeds               = {feed}
                                        handleStore         = {handleStore}
                                        trophyPagination    = {trophyPagination}
                                        // getAgentReportData  = {getAgentReportData}
                                    />
                            :
                                <CustomTableNotAuthorized/>
                        }
                    </InfiniteScroll>
                </Col>

                <Col md={3} className="d-block d-sm-none d-md-block">
                    {
                        getRoleByMenuStatus('Beranda', 'trending_list') ? 
                            <FeedsTrendWidget 
                                handleStore    = {handleStore}
                                reportTrending = {trendingReport} 
                                // getAgentReportData  = {getAgentReportData}
                            />
                        :
                            null
                    }

                    {
                        localStorage.getItem('role').toLowerCase() == "verifikator pusat" || localStorage.getItem('role').toLowerCase() == "verifikator daerah" || localStorage.getItem('role') == "admin" ? 
                            getRoleByMenuStatus('Beranda', 'approval_list') ? 
                                <FeedsApprovedNewsCard 
                                    onSubmit            = {() => {
                                        setApproveds(null);
                                        setRefreshApproved(true);
                                    }}
                                    onChangeToArchive   = {changeToArchive} 
                                    {...{news:approveds}}
                                />
                            :
                                null
                        : 
                            null
                    }
                </Col>
            </Row>

            <div 
                style       = {{height:"2em"}} 
                className   = "col-8" 
            >
                {
                    loadMore ?
                        <Col 
                            sm      = {12} 
                            md      = {12} 
                            lg      = {12} 
                            style   = {{paddingTop:"0px"}}
                        >
                            <div 
                                style       = {{alignContent:"center"}}
                                className   = "d-flex justify-content-center" 
                            >
                                <Spinner/>
                            </div>
                        </Col>
                    : 
                        null
                }
            </div>
        </Fragment>
    );
};

export default Beranda;
