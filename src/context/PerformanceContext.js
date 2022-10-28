import { createContext, useEffect, useRef, useState } from "react";
import CustomToast from "../components/widgets/custom-toast";
import { workunitAPI } from "../services/pages/configuration/workunit";
import PerformanceApi from "../services/pages/performance";
import SelectOptionsService from "../services/pages/select-options";
import { WorkunitLevelList } from "../services/pages/select-options/Workunit";


const PerformanceContext = createContext(null)

const PerformanceProvider = ({ children }) => {
    // states
    const searchTerm                                              = useRef(null)
    const [page                     , setPage]                    = useState(1)
    const [active                   , setActive]                  = useState('agent')
    const [listData                 , setListData]                = useState(false)
    const [dataDetail               , setDataDetail]              = useState(null)
    const [sectorAgent              , setSectorAgent]             = useState("Nasional")
    const [dataSelected             , setDataSelected]            = useState(false)
    const [workunitList             , setWorkunitList]            = useState(null)
    const [workunitLevel            , setWorkunitLevel]           = useState(0);
    const [historyPoints            , setHistoryPoints]           = useState(null)
    const [workunitLevel1           , setWorkunitLevel1]          = useState(null);
    const [workunitLevel2           , setWorkunitLevel2]          = useState(null);
    const [workunitLevel3           , setWorkunitLevel3]          = useState(null);
    const [workunitLevel4           , setWorkunitLevel4]          = useState(null);
    const [workunitOptions          , setWorkunitOptions]         = useState(null)
    const [workunitOptionsApproval  , setWorkunitOptionsApproval] = useState(null);

    const getWorkunitOptions = () => {

        let data        = [];
        let first       = [{label: 'SEMUA WILAYAH', options: [{label: 'SEMUA WILAYAH', value : 0}]}]
        let level_1     = [];
        let level_2     = [];
        let level_3     = [];
        let level_4     = [];

        workunitAPI.getWorkunitLevelList({workunit_level_id : 1}).then(
            res => {
                if(res.data.length > 0){
                    res.data.map((data) => (
                        level_1.push({
                            label : data.name,
                            value : data.id
                        })
                    )) 
                    setWorkunitLevel1(level_1);
                }
                
                if(localStorage.getItem('role') === 'Verifikator Pusat' || localStorage.getItem('role') === 'Admin'){
                    if(level_1.length > 0){
                        data.push({
                            label : 'Kejaksaan Agung',
                            options : level_1 
                        })
                    }
                }

                workunitAPI.getWorkunitLevelList({workunit_level_id : 2}).then(
                    res => {
                        if(res.data.length > 0){
                            res.data.map((data) => (
                                
                                localStorage.getItem('role') === 'Verifikator Daerah' || localStorage.getItem('role') === 'Admin Daerah' ?
                                    parseInt(localStorage.getItem('workunit_id')) === data.id &&
                                    level_2.push({
                                        label : 'KEJAKSAAN TINGGI ' + data.name,
                                        value : data.id
                                    })
                                :
                                    level_2.push({
                                        label : 'KEJAKSAAN TINGGI ' + data.name,
                                        value : data.id
                                    })   
                            ))
                            setWorkunitLevel2(level_2);
                        }

                        if(level_2.length > 0){
                            data.push({
                                label : 'KEJAKSAAN TINGGI',
                                options : level_2
                            })
                        }

                        workunitAPI.getWorkunitLevelList({workunit_level_id : 3}).then(
                            res => {
                                if(res.data.length > 0){
                                    res.data.map((data) => (

                                        localStorage.getItem('role') === 'Verifikator Daerah' || localStorage.getItem('role') === 'Admin Daerah' ?
                                            parseInt(localStorage.getItem('workunit_id')) === data.parent_id &&
                                            level_3.push({
                                                label : 'KEJAKSAAN NEGERI ' + data.name,
                                                value : data.id
                                            })
                                        :
                                            level_3.push({
                                                label : 'KEJAKSAAN NEGERI ' + data.name,
                                                value : data.id
                                            })   
                                    ))

                                    setWorkunitLevel3(level_3);
                                }

                                if(level_3.length > 0){
                                    data.push({
                                        label : 'KEJAKSAAN NEGERI',
                                        options : level_3
                                    })
                                }

                                workunitAPI.getWorkunitLevelList({workunit_level_id : 4}).then(
                                    res => {
                                        if(res.data.length > 0){
                                            res.data.map((data) => (
                                                level_4.push({
                                                    label : 'CABANG KEJAKSAAN NEGERI ' + data.name,
                                                    value : data.id
                                                })
                                            ))

                                            setWorkunitLevel4(level_4);
                                        }

                                        if(level_4.length > 0){
                                            data.push({
                                                label : 'CABANG KEJAKSAAN NEGERI',
                                                options : level_4
                                            })
                                        }

                                        setWorkunitOptionsApproval(first.concat(data));

                                    },
                                    err => {
                                        console.log(err, 'disini');
                                    }
                                )
                            },
                            err => {
                                console.log(err, 'disini');
                            }
                        )
                    },
                    err => {
                        console.log(err, 'disini');
                    }
                )

            },
            err => {
                console.log(err, 'disini');
            }
        )
        setWorkunitOptions(data);
    }

    // get Data Agent
    const getDataAgent = () => {
        setListData(false)
        setDataSelected(false)
        setSectorAgent("Nasional")

        PerformanceApi.GetAgent({
            keyword: searchTerm.current,
            onSuccess: (res) => {
                setListData(res.data.agent_performance)
                if (res.data.agent_performance.length > 0) {
                    setDataSelected(res.data.agent_performance ? res.data.agent_performance[0] : null)
                    getAgentDetail(res.data.agent_performance ? res.data.agent_performance[0].uuid : null)
                    getAgentPoints(1, res.data.agent_performance[0].uuid)
                }

            }, onFail: (err) => {
                // CustomToast("danger", err.message);
            }
        })
    }

    const getAgentPoints = (page, uuid, start_date, end_date) => {
        setHistoryPoints(null);

        let formData = {
            uuid        : uuid,
        }

        if(start_date != undefined ){
            formData['end_date']    = end_date;
            formData['start_date']  = start_date;
        }

        PerformanceApi.agentPoints({
            page,
            formData,
            onSuccess: (res) => {
                setHistoryPoints(res)
            },
            onFail: (err) => {
                setHistoryPoints(null)
                console.log(err)
            }
        })
    }

    const getWorkunitPoints = (page, id, start_date, end_date) => {
        setHistoryPoints(null);

        let formData = {
            workunit_id: id,
        }

        if(start_date != undefined ){
            formData['end_date']    = end_date;
            formData['start_date']  = start_date;
        }

        PerformanceApi.workunitPoints({
            page,
            formData,
            onSuccess: (res) => {
                setHistoryPoints(res)
            },
            onFail: (err) => {
                setHistoryPoints(null)
            },
        })
    }

    // getDataWorkUnit
    const getDataWorkunit = (params) => {
        setListData(false)
        setDataSelected(false)
        setWorkunitLevel(params.workunit_level_id)
        PerformanceApi.GetWorkunit({
            keyword: searchTerm.current,
            params: params,
            onSuccess: (res) => {
                setListData(res.workunit_performance)
                if (res.workunit_performance) {
                    setDataSelected(res.workunit_performance ? res.workunit_performance[0] : null)
                    getWorkunitDetail(res.workunit_performance[0].id)
                    getWorkunitPoints(page, res.workunit_performance[0].id)
                }

            }, onFail: (err) => {
                CustomToast("danger", err.message);
            }
        })
    }

    const getAgentDetail = (uuid) => {
        setDataDetail(null)
        let datas = {
            uuid: uuid
        }

        PerformanceApi.getAgetDetail({
            datas: datas,
            onSuccess: (res) => {
                setDataDetail(res)
                getAgentPoints(1, uuid)
            }, onFail: (err) => {
                console.log(err);
            }
        })
    }

    const getWorkunitDetail = (uuid) => {
        setDataDetail(null)
        let datas = {
            id: uuid
        }

        PerformanceApi.getWorkunitDetail({
            datas: datas,
            onSuccess: (res) => {
                setDataDetail(res)
                getWorkunitPoints(page,uuid)
            }, onFail: (err) => {
                console.log(err);
            }
        })
    }

    useEffect(() => {
        getWorkunitOptions()
    }, [])

    useEffect(() => {
        getDataAgent()
    }, [])


    return <PerformanceContext.Provider
        value={{
            searchTerm,
            listData,
            setListData,
            page,
            setPage,
            active,
            setActive,
            sectorAgent,
            setSectorAgent,
            dataSelected,
            setDataSelected,
            workunitOptions,
            setWorkunitOptions,
            workunitLevel,
            setWorkunitLevel,
            getDataAgent,
            getDataWorkunit,
            getAgentDetail,
            getAgentPoints,
            dataDetail,
            setDataDetail,
            getWorkunitDetail,
            getWorkunitPoints,
            historyPoints,
            workunitList,

            workunitLevel1,
            workunitLevel2,
            workunitLevel3,
            workunitLevel4,

            workunitOptionsApproval

        }} > {children}</PerformanceContext.Provider>
}

export { PerformanceContext, PerformanceProvider }