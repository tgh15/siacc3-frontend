import React, { Fragment, useState, useEffect }     from 'react';
import moment                                       from 'moment';

//Components
import CustomToast                                  from '../../components/widgets/custom-toast';
import EventPerformance                             from './Event';
import { processAgentReports }                      from '../../components/widgets/feeds/news-card-widget/NewsConfig';

//API
import { feedsAchievementAPI }                      from '../../services/pages/feeds/achievement';
import { StoreNews }                                from '../beranda/beranda_api';


const EventAPI = () => {
    //State
    const [isEvent, setEvent]                       = useState([]);
    const [endDate, setEndDate]                     = useState(null);
    const [startDate, setStartDate]                 = useState(null);
    const [roomEvent, setRoomEvent]                 = useState([]);
    const [loadingAllState, setLoadingAllState]     = useState(false);
    const [agentReportLeft, setAgentReportLeft]     = useState([]);
    const [agentReportRight, setAgentReportRight]   = useState([]);

    useEffect(() => {
        getByTypeAPI();
    }, []);

    useEffect(() => {
        if (startDate != null && endDate != null) {
            agentReportFilterAPI();
        }
    }, [startDate, endDate]);

    //Stored News
    function handleStore(stored_data,resps) {
        StoreNews(stored_data,resps);
    };

    //Handle Event
    const handleEvent = (data) => {
        setRoomEvent(data);
        setStartDate(moment(data.start_date).format("YYYY-MM-DD"));
        setEndDate(moment(data.end_date).format("YYYY-MM-DD"));
    };

    //Get egent report by type
    const getByTypeAPI = () => {
        const formData = {
            type       : "ongoing",
            is_event   : true,
            is_filter  : false
        };

        feedsAchievementAPI.getAchievementByType(formData).then(
            res => {
                if (res.status === 200) {
                    if ("achievement" in res.data && res.data.achievement != null) {
                        setEvent([...res.data.achievement]);
                    }else{
                        setEvent([]);
                    }
                }
            },
            err => {
                CustomToast('danger', err.message);
            }
        );
    };

    //Get agent report filter
    const agentReportFilterAPI = () => {
        setLoadingAllState(true);

        const formData = {
            filter_type   : "by_event",
            start_date    : startDate,
            end_date      : endDate
        }

        feedsAchievementAPI.filterAgentReportEvent(formData).then(
            res => {
                const {data} = res;

                if(data.agent_report === null){
                    setAgentReportLeft([]);
                    setAgentReportRight([]);
                    setLoadingAllState(false);
                }else{
                    processAgentReports(data.agent_report).then(
                        res => {
                            //get array length
                            let arrLength = res.length;

                            //search half array length value
                            let getDivision = Math.round(arrLength/2);
                            
                            //get first half array
                            setAgentReportLeft(res.splice(0,getDivision));
                            
                            //get last half array
                            setAgentReportRight(res.splice(0,arrLength-getDivision));

                            //efek loding
                            setLoadingAllState(false);
                        }
                    );
                }
            },
            err => {
                CustomToast('danger', err.message);
            }
        );
    };

    return (
        <Fragment>
            <EventPerformance
                //State
                isEvent             = {isEvent}
                roomEvent           = {roomEvent}
                loadingAllState     = {loadingAllState}
                agentReportLeft     = {agentReportLeft}
                agentReportRight    = {agentReportRight}
                
                //Function
                handleStore             = {handleStore}
                handleEvent             = {handleEvent}
                agentReportFilterAPI    = {agentReportFilterAPI}
            />
        </Fragment>
    );
};

export default EventAPI;