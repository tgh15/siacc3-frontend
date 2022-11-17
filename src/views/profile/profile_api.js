import React, { 
    Fragment, 
    useState, 
    useEffect,
}                                       from 'react';

//API
import UrlAPI                           from '../../services/pages/profile/urlApi';
import { StoreNews }                    from '../beranda/beranda_api';
import agentProfileAPI                  from '../../services/pages/profile/url';

//Views
import Profile                          from '.';

//Components
import CustomToast                      from '../../components/widgets/custom-toast';
import { processAgentReports }          from '../../components/widgets/feeds/news-card-widget/NewsConfig';
import { UserManagementProvider }       from '../../context/UserManagementContext';
import { PerformanceProvider }          from '../../context/PerformanceContext';
import { BerandaFileProvider }          from '../../components/utility/context/pages/beranda';

//Helper
import Helper                           from '../../helpers';


const ProfileAPI = () => {
    //State
    const [totalPoint, setTotalPoint]                               = useState([]);
    const [reportAgent, setReportAgent]                             = useState(false);
    const [loadingFeeds, setLoadingFeeds]                           = useState(false);
    const [badgeProfile, setbadgeProfile]                           = useState([]);
    const [historyPoint, setHistoryPoint]                           = useState(null);
    const [selectedBadge, setSelectedBadge]                         = useState([]);
    const [employeeDetail, setEmployeeDetail]                       = useState([]);
    const [badgeProfileKind, setBadgeProfileKind]                   = useState([]);
    const [achievementAgent, setAchievementAgent]                   = useState([]);
    const [changeAchievement, setchangeAchievement]                 = useState([]);
    const [employeeDetailUpdate, setEmployeeDetailUpdate]           = useState([]);
    const [reportAgentPositionShared, setReportAgentPositionShared] = useState(false);

    //State modal
    const [changeInformation, setChangeInformation]                 = useState(false);

    const {getUserData}                                             = Helper;

    //Stored news
    function handleStore(stored_data,resps) {
        StoreNews(stored_data,resps);
    };

    //API get employee biodata header by uuid user (detail identification)
    const getDetailIdentification = () => {
        UrlAPI.get({
            onSuccess: (res) => {
                if(!res.is_error){
                    setEmployeeDetail(res.data);
                }else{
                    CustomToast('danger', res.message);
                }
            },
            onFail: (err) => {
                CustomToast('danger', err.message);
                console.log(err);
            }
        })
    };

    //API get feeds performance agent profile
    const getAgentProfileBadge = () => {
        const formData = {
            uuid : getUserData().uuid
        };

        agentProfileAPI.getAgentProfilePerformance(formData).then(
            res => {
                if(!res.is_error){
                    if (res.status === 200) {
                        if (res.data != null) {
                            setbadgeProfile(res.data);
                            setTotalPoint(res.data.performance.points_total);
                        }else{
                            setTotalPoint([]);
                            setbadgeProfile([]);
                        }
                    }
                }else{
                    CustomToast('danger', res.message)
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    //API get achievement badge agent by-kind
    const agentProfileByKind = (kind, is_event) => {
        const formData = {
            kind        : kind,
            uuid        : getUserData().uuid, 
            is_event    : is_event
        };

        agentProfileAPI.getAgentByKind(formData).then(
            res => {
                if(!res.is_error){
                    if(res.status === 200){
                        if (res.data != null) {
                            setBadgeProfileKind(res.data);
                        }else{
                            setBadgeProfileKind([]);
                        }
                    }
                }else{
                    CustomToast('danger', res.message);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    //API get achievement agent
    const achievementBadgeAgent = () => {
        const formData = {
            uuid : getUserData().uuid
        };

        agentProfileAPI.getAchievementAgent(formData).then(
            res => {
                if(!res.is_error){
                    if (res.status === 200) {
                        if (res.data !== null) {
                            setAchievementAgent(res.data);
                        }else{
                            setAchievementAgent([]);
                        }
                    }
                }else{
                    CustomToast('danger', res.message);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    //API change achievement agent is active
    const changeProfileAchievement = (values) => {
        console.log(values, 'test');
        const formData = [];

        values.map((data) => (
            formData.push({
                id          : data,
                is_active   : true
            })
        ));

        agentProfileAPI.changeAchievementAgent(formData).then(
            res => {
                if (!res.is_error) {
                    if (res.data != null) {
                        CustomToast("success", "Data lencana berhasil diubah");

                        setchangeAchievement(res.data);

                        //Refresh Badge Profile
                        getAgentProfileBadge();
                    }else{
                        setchangeAchievement([]);
                    }
                }else{
                    CustomToast('danger', res.message);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    //API get agent report by employee
    const getReportAgentProfile = () => {
        setLoadingFeeds(true);

        const formData = {
            uuid     : getUserData().uuid, 
            category : 0
        };

        agentProfileAPI.getByEmployeeAgentReport(formData).then(
            res => {
                if(!res.is_error){
                    const {data} = res;
    
                    if (data.agent_report === null){
                        setReportAgent([]);
                    }else{
                        processAgentReports(data.agent_report).then(
                            res => {
                                setReportAgent(res);
                                setLoadingFeeds(false);
                            }
                        )
                    }
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    //API get agent points (history point)
    const getHistoryPoint = (page, uuid, startDate, endDate) => {
        const formData = {
            uuid        : uuid,
            start_date  : startDate,
            end_date    : endDate,
        };

        const params = {
            is_paginate : true,
            page : page,
        }

        agentProfileAPI.getAgentPoints(formData, params).then(
            res => {
                console.log('res', res)
                if (!res.is_error) {
                    if(res.data != null){
                        const groups = res.data.log_points.reduce((groups, data) => {
                            const date = data.created_at.split('T')[0];
                            if (!groups[date]) {
                                groups[date] = [];
                            }

                            groups[date].push(data);
                            return groups;
                        }, {});
                    
                        const groupArrays = Object.keys(groups).map((date) => {
                            return {
                                date,
                                data: groups[date]
                            };
                        });
                        setHistoryPoint({
                            data : [...groupArrays],
                            pagination : res.data.pagination
                        });
                    }else{
                        setHistoryPoint({
                            data : [],
                            pagination : res.data.pagination
                        });
                    }
                }else{
                    CustomToast('danger', res.message);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    //API get employee by-uuid (edit informasi)
    const getDetailEmployee = () => {
        const formData = {
            uuid : getUserData().uuid
        };

        agentProfileAPI.getEmployeeByUuid(formData).then(
            res => {
                if (!res.is_error) {
                    if (res.data != null) {
                        setEmployeeDetailUpdate(res.data);
                        
                        //Modal Visible
                        setChangeInformation(true);
                    }else{
                        setEmployeeDetailUpdate([]);
                    }
                }else{
                    CustomToast('danger', res.message);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    //get report agent by position
    const getReportAgentsByPosition = () => {
        setLoadingFeeds(true);

        const formData = {
            category    : 0,
            position_id : 0
        }

        agentProfileAPI.getByPositionShared(formData).then(
            res => {
                if(!res.is_error){
                    const {data} = res;
    
                    if (data.agent_report === null){
                        setReportAgentPositionShared([]);
                    }else{
                        processAgentReports(data.agent_report).then(
                            res => {
                                setReportAgentPositionShared(res);
                                setLoadingFeeds(false);
                            }
                        )
                    }
                }else{
                    CustomToast('danger', res.message);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    useEffect(() => {
        getDetailEmployee();
        getAgentProfileBadge();
        getReportAgentProfile();
        achievementBadgeAgent();
        getDetailIdentification();
        getReportAgentsByPosition();
        getHistoryPoint(1, getUserData().uuid);
    }, []);

    return (
        <UserManagementProvider>
            <PerformanceProvider>
                <BerandaFileProvider>
                    <Fragment>
                        <Profile
                            totalPoint                  = {totalPoint}
                            reportAgent                 = {reportAgent}
                            historyPoint                = {historyPoint}
                            loadingFeeds                = {loadingFeeds}
                            badgeProfile                = {badgeProfile}
                            selectedBadge               = {selectedBadge}
                            employeeDetail              = {employeeDetail}
                            setSelectedBadge            = {setSelectedBadge}
                            badgeProfileKind            = {badgeProfileKind}
                            achievementAgent            = {achievementAgent}
                            changeInformation           = {changeInformation}
                            setChangeInformation        = {setChangeInformation}
                            employeeDetailUpdate        = {employeeDetailUpdate}
                            reportAgentPositionShared   = {reportAgentPositionShared}
                            
                            //Function
                            handleStore                 = {handleStore}
                            getHistoryPoint             = {getHistoryPoint}
                            getDetailEmployee           = {getDetailEmployee}
                            agentProfileByKind          = {agentProfileByKind}
                            getReportAgentProfile       = {getReportAgentProfile}
                            getDetailIdentification     = {getDetailIdentification}
                            changeProfileAchievement    = {changeProfileAchievement}
                        />
                    </Fragment>
                </BerandaFileProvider>
            </PerformanceProvider>
        </UserManagementProvider>
        
    );
};

export default ProfileAPI;