import React, { 
    Fragment, 
    useState, 
    useEffect 
}  from 'react';

import moment                   from 'moment';

//Components
import CustomToast              from '../../components/widgets/custom-toast';
import { processAgentReports }  from '../../components/widgets/feeds/news-card-widget/NewsConfig';

//Views
import PopularTopics            from './popular_topics';

//API
import { StoreNews }            from '../beranda/beranda_api';
import feedsBerandaAgentReport  from '../../services/pages/feeds/beranda/url';


const PopularTopicAPI = () => {
    //State
    const [loading, setLoading]                     = useState(true);
    const [reportAgent, setReportAgent]             = useState([]);
    const [trendingType, setTrendingType]           = useState('national');
    const [trendingFilter, setTrendingFilter]       = useState('daily');
    const [selectedWorkunit, setSelectedWorkunit]   = useState(0);

    useEffect(() => {
        getReportAgentsAPI();
    },[trendingType, trendingFilter, selectedWorkunit]);

    //Stored News
    function handleStore(stored_data,resps) {
        StoreNews(stored_data,resps);
    };

    const getReportAgentsAPI = () => {

        setLoading(true);

        let formData;

        if (trendingType == "national") {
            if (trendingFilter == "daily") {
                formData = {
                    trending_type : trendingType,
                    workunit      : [],
                    start_date    : moment().format('YYYY-MM-DD'),
                    end_date      : moment().format('YYYY-MM-DD'),
                };
            }else if (trendingFilter == "weekly"){
                formData = {
                    trending_type : trendingType,
                    workunit      : [],
                    start_date    : moment().subtract(7,'d').format('YYYY-MM-DD'),
                    end_date      : moment().format('YYYY-MM-DD'),
                };
            }else{
                formData = {
                    trending_type : trendingType,
                    workunit      : [],
                    start_date    : moment().subtract(30,'d').format('YYYY-MM-DD'),
                    end_date      : moment().format('YYYY-MM-DD'),
                };
            }
        }else{
            if (trendingFilter == "daily") {
                formData = {
                    trending_type : trendingType,
                    workunit_id   : localStorage.getItem('role') == 'agen' ? parseInt(localStorage.getItem('workunit_id')) : selectedWorkunit,
                    start_date    : moment().format('YYYY-MM-DD'),
                    end_date      : moment().format('YYYY-MM-DD'),
                };
            }else if (trendingFilter == "weekly"){
                formData = {
                    trending_type : trendingType,
                    workunit_id   : localStorage.getItem('role') == 'agen' ? parseInt(localStorage.getItem('workunit_id')) : selectedWorkunit,
                    start_date    : moment().subtract(7,'d').format('YYYY-MM-DD'),
                    end_date      : moment().format('YYYY-MM-DD'),
                };
            }else{
                formData = {
                    trending_type : trendingType,
                    workunit_id   : localStorage.getItem('role') == 'agen' ? parseInt(localStorage.getItem('workunit_id')) : selectedWorkunit,
                    start_date    : moment().subtract(30,'d').format('YYYY-MM-DD'),
                    end_date      : moment().format('YYYY-MM-DD'),
                };
            }
        };

        feedsBerandaAgentReport.getTrendingByType(formData).then(
            res => {
                if(!res.is_error){
                    const {data} = res;
                    setLoading(false);
    
                    if (data.agent_report === null) {
                        setReportAgent([]);
                    }else{
                        processAgentReports(data.agent_report).then(
                            res => {
                                setReportAgent(res);
                            }
                        )
                    }
                }else{
                    CustomToast('danger', res.message);
                }
                
            },
            err => {
                CustomToast('danger', err.message);
            }
        );
    };

    return (
        <Fragment>
            <PopularTopics
                //state
                loading                 = {loading}
                reportAgent             = {reportAgent}
                trendingType            = {trendingType}
                trendingFilter          = {trendingFilter}
                setTrendingType         = {setTrendingType}
                selectedWorkunit        = {selectedWorkunit}
                setTrendingFilter       = {setTrendingFilter}
                setSelectedWorkunit     = {setSelectedWorkunit}

                //function
                handleStore             = {handleStore}
            />
        </Fragment>
    );
};

export default PopularTopicAPI;