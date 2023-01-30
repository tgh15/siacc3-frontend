import { useEffect,useState }                   from "react";

import { useParams }                            from "react-router-dom";
import { Col, Row, Spinner }                             from "reactstrap";
import { NewsWidget }                           from "../../components/widgets/feeds/news-card-widget";
import { processAgentReports }                  from "../../components/widgets/feeds/news-card-widget/NewsConfig";

//API
import feedsAgentReportAPI                      from "../../services/pages/feeds/agent-reports"
import { 
        StoreNews,
        getApprovedBerandaFeeds, 
        agentReportChangeToArchive, 
    }                                           from "./beranda_api";

//Helper
import Helper                                   from '../../helpers';

import { 
        FeedsTrendWidget, 
        TrendDefaultData 
    }                                           from '../../components/widgets/feeds/feeds-trend';
import { FeedsApprovedNewsCard }                from "../../components/widgets/feeds/feeds-approved-news";
import CustomToast from "../../components/widgets/custom-toast";
import moment from "moment";
import feedsBerandaAgentReport from "../../services/pages/feeds/beranda/url";
import FeedSkeleton from "../../components/widgets/feed-skeleton/FeedSkeleton";



const BerandaDetail = () => {

    //Params
    let { id }                                      = useParams();

    const [loading, setLoading]                     = useState(false);
    const [approveds,setApproveds]                  = useState(null);
    const [detailNews, setDetailNews]               = useState(null);
    const [loadingApprove,setLoadingApprove]        = useState(false);
    const [trendingReport, setTrendingReport]       = useState(null);
    const [refreshApproved,setRefreshApproved]      = useState(true);

    


    const {getRoleByMenuStatus}         = Helper;

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

    const handleStore = (stored_data, resps) => {
        StoreNews(stored_data, resps);
    };

    //API detail agen report
    const detailAgentReport = () => {
        const formDetail = {
            agent_report_id : parseInt(id)
        };
        
        feedsAgentReportAPI.detailAgentReport(formDetail).then(
            res => {
                if(res.data != null){
                    let dataFeeds = processAgentReports([res.data]);
                    dataFeeds.then(res => {setDetailNews(res)})
                }else{
                    setDetailNews(null);
                    CustomToast('info','Anda tidak memiliki akses berita yang dimaksud.');
                }
                setLoading(false);
            },
            err => {
                if(err.status === 404){
                    CustomToast('info','Data tidak ditemukan');
                }else{
                    error_handler(err, 'detail agent report');
                }
                setLoading(false);
            }
        );
    };

    const getTrendingReport = () => {

        let formData = {
            workunit      : [],
            end_date      : moment().format('YYYY-MM-DD'),
            start_date    : moment().format('YYYY-MM-DD'),
            trending_type : 'national',
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
        detailAgentReport();
        getTrendingReport();

        getApprovedBerandaFeeds().then(result => {
            setApproveds(result);
            setLoadingApprove(false);
            setRefreshApproved(false);
        })
    }, []);

    return (
        <>
            <Row>
                <Col md={9}>
                    {
                        detailNews != null ?
                            <NewsWidget
                                key                     = {`advanced-search-news-${id}`}
                                handleStore             = {(newss,data) => {StoreNews(newss,data)}}

                                detail                  = {true}
                                roleLike                = {true}
                                roleViewer              = {true}   
                                roleDislike             = {true}
                                roleComment             = {true}

                                {...detailNews[0]}
                            />
                        :
                            <div className="text-center">
                                <FeedSkeleton count={1}/>
                            </div>
                    }
                </Col>
                <Col md={3}>
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
            
        </>
    )
}

export default BerandaDetail;