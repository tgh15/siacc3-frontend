import React, { 
    Fragment, 
    useEffect, 
    useState 
} from 'react';

import moment                   from 'moment';
import Beranda                  from '../../../../views/beranda/beranda';
import CustomToast              from '../../custom-toast';

//API
import { StoreNews }            from '../../../../views/beranda/beranda_api';
import { processAgentReports }  from '../news-card-widget/NewsConfig';
import feedsBerandaAgentReport  from '../../../../services/pages/feeds/beranda/url';


const FeedsTrendAPI = () => {
    //State
    const [reportTrending, setReportTrending] = useState(false);

    useEffect(() => {
        getReportAgentsTrendingAPI();
    },[]);
    
    //Stored News
    function handleStore(stored_data,resps) {
        StoreNews(stored_data,resps);
    };

    //API report agent trending beranda
    const getReportAgentsTrendingAPI = () => {
        const formData = {
            trending_type : "national",
            workunit      : [],
            start_date    : moment().format('YYYY-MM-DD'),
            end_date      : moment().format('YYYY-MM-DD'),
        };

        feedsBerandaAgentReport.getTrendingByType(formData).then(
            res => {
                const {data} = res;

                if (data.agent_report === null) {
                    setReportTrending([]);
                }else{
                    processAgentReports(data.agent_report).then(
                        res => {
                            setReportTrending(res);
                        }
                    )
                }
            },
            err => {
                CustomToast('danger', err.message);
            }
        );
    };

    return (
        <Fragment>
            <Beranda
                //State
                reportTrending  = {reportTrending}

                //Function
                handleStore     = {handleStore}
            />
        </Fragment>
    )
};

export default FeedsTrendAPI;
