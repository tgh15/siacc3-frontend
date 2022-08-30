import React, { 
    Fragment, 
    useState, 
    useEffect,
    useContext, 
} from 'react';

//API
import UrlAPI                   from '../../services/pages/profile/urlApi';
import { StoreNews }            from '../beranda/beranda_api';
import agentProfileAPI          from '../../services/pages/profile/url';

//Views
import Profile                  from '.';

//Components
import CustomToast              from '../../components/widgets/custom-toast';
import { processAgentReports }  from '../../components/widgets/feeds/news-card-widget/NewsConfig';
import { UserManagementProvider } from '../../context/UserManagementContext';
import { PerformanceProvider } from '../../context/PerformanceContext';
import { BerandaFileProvider } from '../../components/utility/context/pages/beranda';


const ProfileAPI = () => {
    //State
    const [totalPoint, setTotalPoint]                               = useState([]);
    const [reportAgent, setReportAgent]                             = useState(false);
    const [loadingFeeds, setLoadingFeeds]                           = useState(false);
    const [badgeProfile, setbadgeProfile]                           = useState([]);
    const [historyPoint, setHistoryPoint]                           = useState([]);
    const [selectedBadge, setSelectedBadge]                         = useState([]);
    const [employeeDetail, setEmployeeDetail]                       = useState([]);
    const [badgeProfileKind, setBadgeProfileKind]                   = useState([]);
    const [achievementAgent, setAchievementAgent]                   = useState([]);
    const [changeAchievement, setchangeAchievement]                 = useState([]);
    const [employeeDetailUpdate, setEmployeeDetailUpdate]           = useState([]);
    const [reportAgentPositionShared, setReportAgentPositionShared] = useState(false);

    //State modal
    const [changeInformation, setChangeInformation]                 = useState(false);

    useEffect(() => {
        getAgentProfileBadge();
        getReportAgentProfile();
        achievementBadgeAgent();
        getDetailIdentification();
        getReportAgentsByPosition();
        getHistoryPoint(localStorage.getItem('uuid'));
    }, []);

    //Stored news
    function handleStore(stored_data,resps) {
        StoreNews(stored_data,resps);
    };

    //API get employee biodata header by uuid user (detail identification)
    const getDetailIdentification = () => {
        UrlAPI.get({
            onSuccess: (res) => {
                setEmployeeDetail(res.data);
            },
            onFail: (err) => {
                console.log(err);
            }
        })
    };

    //API get feeds performance agent profile
    const getAgentProfileBadge = () => {
        const formData = {
            uuid : localStorage.getItem("uuid")
        };

        agentProfileAPI.getAgentProfilePerformance(formData).then(
            res => {
                if (res.status === 200) {
                    if (res.data != null) {
                        setbadgeProfile(res.data);
                        setTotalPoint(res.data.performance.points_total);
                    }else{
                        setTotalPoint([]);
                        setbadgeProfile([]);
                    }
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
            uuid        : localStorage.getItem("uuid"), 
            is_event    : is_event
        };

        agentProfileAPI.getAgentByKind(formData).then(
            res => {
                if(res.status === 200){
                    if (res.data != null) {
                        setBadgeProfileKind(res.data);
                    }else{
                        setBadgeProfileKind([]);
                    }
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
            uuid : localStorage.getItem("uuid")
        };

        agentProfileAPI.getAchievementAgent(formData).then(
            res => {
                if (res.status === 200) {
                    if (res.data !== null) {
                        setAchievementAgent(res.data);
                    }else{
                        setAchievementAgent([]);
                    }
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    //API change achievement agent is active
    const changeProfileAchievement = (values) => {
        const formData = [];

        values.map((data) => (
            formData.push({
                id          : data,
                is_active   : true
            })
        ));

        agentProfileAPI.changeAchievementAgent(formData).then(
            res => {
                if (res.status === 200) {
                    if (res.data != null) {
                        CustomToast("success", "Data lencana berhasil diubah");

                        setchangeAchievement(res.data);

                        //Refresh Badge Profile
                        getAgentProfileBadge();
                    }else{
                        setchangeAchievement([]);
                    }
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
            uuid     : localStorage.getItem("uuid"), 
            category : 0
        };

        agentProfileAPI.getByEmployeeAgentReport(formData).then(
            res => {
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
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    //API get agent points (history point)
    const getHistoryPoint = (uuid, startDate, endDate) => {
        const formData = {
            uuid        : uuid,
            start_date  : startDate,
            end_date    : endDate,
        };

        agentProfileAPI.getAgentPoints(formData).then(
            res => {
                if (res.status === 200) {
                    if(res.data != null){
                        const groups = res.data.reduce((groups, data) => {
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
                        setHistoryPoint([...groupArrays]);
                    }else{
                        setHistoryPoint([]);
                    }
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
            uuid : localStorage.getItem("uuid")
        };

        agentProfileAPI.getEmployeeByUuid(formData).then(
            res => {
                if (res.status === 200) {
                    if (res.data != null) {
                        setEmployeeDetailUpdate(res.data);
                        
                        //Modal Visible
                        setChangeInformation(true);
                    }else{
                        setEmployeeDetailUpdate([]);
                    }
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
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    useEffect(() => {
        getDetailEmployee();
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
                            changeProfileAchievement    = {changeProfileAchievement}
                        />
                    </Fragment>
                </BerandaFileProvider>
            </PerformanceProvider>
        </UserManagementProvider>
        
    );
};

export default ProfileAPI;