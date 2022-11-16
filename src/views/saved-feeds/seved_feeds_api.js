import React, { Fragment, useState, useEffect } from 'react';

import SavedFeed                                from './SavedFeeds';
import CustomToast                              from '../../components/widgets/custom-toast';
import { processAgentReports }                  from '../../components/widgets/feeds/news-card-widget/NewsConfig';

//API
import { StoreNews }                            from '../beranda/beranda_api';
import feedsAgentReportApprovalAPI              from '../../services/pages/feeds/approval-news/url';


const SevedFeedsAPI = () => {
    //State
    const [leftState, setLeftState]             = useState([]);
    const [rightState, setRightState]           = useState([]);
    const [loadingAllState, setLoadingAllState] = useState(false);

    useEffect(() => {
        getByStored();
    }, []);

    //stored news
    function handleStore(stored_data,resps) {
        StoreNews(stored_data,resps);
    };
    
    const getByStored = () => {
        setLoadingAllState(true);

        const formData = {
            category : 0
        };

        feedsAgentReportApprovalAPI.getAgentByStored(formData).then(
            res => {

                if(!res.is_error){
                    const {data} = res;
    
                    if(data.agent_report === null){
                        setLeftState([]);
                        setRightState([]);
                        setLoadingAllState(false);
                    }else{
                        processAgentReports(data.agent_report).then(
                            res => {
                                //get array length
                                let arrLength = res.length;
    
                                //search hal array length value
                                let getDivision = Math.round(arrLength/2);
                                
                                //get first half array
                                setLeftState(res.splice(0,getDivision));
    
                                //get last half array
                                setRightState(res.splice(0,arrLength-getDivision));
                                
                                //efek loding
                                setLoadingAllState(false);
                            }
                        );
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
            <SavedFeed
                leftState       = {leftState}
                rightState      = {rightState}
                loadingAllState = {loadingAllState}

                //Function
                handleStore     = {handleStore}
            />
        </Fragment>
    );
};

export default SevedFeedsAPI;