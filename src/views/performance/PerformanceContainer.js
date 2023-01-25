import { Fragment, useContext, useEffect }  from "react";
import { Card, Col, Row, CardBody, FormGroup, Label }         from "reactstrap";

import Select                               from "react-select";
import Skeleton                             from "react-loading-skeleton";
import { useLocation }                      from "react-router-dom";
import PerfectScrollbar                     from 'react-perfect-scrollbar';
import { selectThemeColors }                from '@utils';

//Css
import "./Performance.scss";

//Helper
import Helper                               from "../../helpers";

//Context
import { PerformanceContext }               from "../../context/PerformanceContext";

//Services
import PerformanceApi                       from "../../services/pages/performance";

//Components
import CardUser                             from "./CardUser";
import SearchTable                          from "../../components/widgets/custom-table/SearchTable";
import CardDetails                          from "./CardDetail";
import CardTopUser                          from "./CardTopUser";
import CustomToast                          from '../../components/widgets/custom-toast';
import CategoryAgent                        from "./CategoryAgent";
import LoadingTopUser                       from "./LoadingTopUser";
import LoadingCardUser                      from "./LoadingCardUser";
import CategoryWorkunit                     from "./CategoryWorkunit";
import NavbarPerformance                    from "./NavbarPerformance";
import CustomTableBodyEmpty                 from "../../components/widgets/custom-table/CustomTableBodyEmpty";
import CustomTableNotAuthorized             from "../../components/widgets/custom-table/CustomTableNotAuthorized";
import AchievementBadge from "./AchivementBadge";
import DetailViewer from "./DetailViewer";
import DetailTrophy from "./DetailTrophy";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};


const PerformanceContainer = () => {

    const { 
        year,
        active,
        setYear,
        listData,
        searchTerm,
        setListData,
        sectorAgent,
        getDataAgent,
        dataSelected,
        workunitLevel,
        workunitOptions,
        setDataSelected,
        getDataWorkunit,
    } = useContext(PerformanceContext)

    const {
        useQuery, 
        getYearsBefore,
        getRoleByMenuStatus, 
    }                                      = Helper;

    let query                              = useQuery();

    const getDataAgentByUnitwork = (workunitId) => {
        setListData(false)
        setDataSelected(false)

        PerformanceApi.GetAgentByWorkUnit({
            params      : {workunit_id : workunitId, period: year},
            onSuccess   : (res) => {
                setListData(res.agent_performance)
                setDataSelected(res.agent_performance ? res.agent_performance[0] : null)
            }, onFail: (err) => {
                CustomToast("danger", err.message);
            }
        })
    }

    useEffect(() => {
        if (query.get("agent")) {
            onSearch(query.get("agent"));
        }
    }, []);

    const onSearch = (value) => {
        searchTerm.current = value
        if(active == "workunit"){
            getDataWorkunit({ workunit_level_id: workunitLevel });
        }else{
            getDataAgent();
        }
    };

    return (
        <Fragment>
            {/* Modal Detail Badge */}
            <AchievementBadge/>

            {/* Modal Detail Viewer */}
            <DetailViewer/>

            {/* Modal Detail Trophy */}
            <DetailTrophy/>

            {
                getRoleByMenuStatus('Performance', 'performance_list') ?
                    <Row>
                        <Col md="8" sm="12">
                            <Row>
                                <Col md={3}>
                                    <FormGroup>
                                        <Select
                                            theme           = {selectThemeColors}
                                            options         = {getYearsBefore(10)}
                                            onChange        = {(e) => setYear(e.value)}
                                            className       = 'react-select'
                                            placeholder     = "Pilih Tahun Performa"
                                            classNamePrefix = 'select'
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={{size: 5, offset: 4}}>
                                    <SearchTable 
                                        value       = {query.get('agen') != undefined ? query.get('agen') : null}
                                        onSearch    = {(e)=> {onSearch(e)} } 
                                        placeholder = {active === 'agent' ? "Cari Agen" : "Cari Satuan Kerja" } 
                                    />
                                </Col>
                            </Row>
                            
                            <NavbarPerformance />
                            
                            <Card className="mb-1 ">
                                <CardBody className="p-1">
                                    {active == "agent" ? <CategoryAgent  /> : <CategoryWorkunit  />}
                                </CardBody>
                            </Card>

                            {
                                sectorAgent == "Lokal" && active == "agent" ? 
                                    <Row className="mb-1">
                                        <Col md={5}>
                                            <Select 
                                                theme={selectThemeColors}
                                                className='react-select'
                                                classNamePrefix='select'
                                                placeholder="Pilih Satker"
                                                options={workunitOptions}
                                                isClearable
                                                onChange={(e) => { 
                                                    if(e != null){
                                                        getDataAgentByUnitwork(e.value) 
                                                    }
                                                    
                                                }}
                                            />
                                        </Col>
                                    </Row> 
                                : 
                                    null
                            }

                            <span> 10 Besar Performa {active == 'agent' ? 'Agen' : 'Satuan Kerja'} Tingkat {sectorAgent}</span>

                            {/* top user */}
                            {listData &&
                                <Row className="mt-1">
                                    {listData.slice(0, 3).map((data, i) => (
                                        <Col key={i} md="4" className="d-flex justify-content-stretch">
                                            <CardTopUser data={data} index={i} />
                                        </Col>
                                    ))}
                                </Row>
                            }
                            
                            {/* skeleton top user */}
                            {!listData && listData != null &&
                                <LoadingTopUser />
                            }
                            {/* card empty topuser */}
                            {!listData && listData == null && <CustomTableBodyEmpty />}


                            <span > Performa {active == 'agent' ? 'Agen' : 'Satuan Kerja'} Lain</span>
                            {listData &&
                                <Row className="pb-3">
                                    <Col>
                                        <PerfectScrollbar style={{ maxHeight: "350px" }}>
                                            {listData.slice(3, 10).map((data, i) => (
                                                <CardUser key={i} data={data} index={i}  />
                                            ))}
                                        </PerfectScrollbar>
                                    </Col>
                                </Row>
                            }

                            {!listData && listData != null &&
                                <LoadingCardUser />
                            }

                            {!listData && listData == null && <CustomTableBodyEmpty />}

                        </Col>
                        <Col md="4" sm="12">
                            {dataSelected && <CardDetails/>}
                            {!dataSelected && dataSelected != null && <Skeleton style={{ height: "660px" }} />}
                            {!dataSelected && dataSelected == null && <CustomTableBodyEmpty />}
                        </Col>
                    </Row>
                :
                    <CustomTableNotAuthorized/>
            }
        </Fragment>
    )
}


export default PerformanceContainer