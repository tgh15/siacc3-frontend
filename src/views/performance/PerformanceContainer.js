import { Fragment, useContext }     from "react"
import { Card, Col,Row }            from "reactstrap"
import CardBody                     from "reactstrap/lib/CardBody"
import SearchTable                  from "../../components/widgets/custom-table/SearchTable"
import PerformanceApi               from "../../services/pages/performance"
import CardDetails                  from "./CardDetail"
import CardTopUser                  from "./CardTopUser"
import CardUser                     from "./CardUser"
import "./Performance.scss"
import CustomToast                  from '../../components/widgets/custom-toast'
import Skeleton                     from "react-loading-skeleton"
import LoadingTopUser               from "./LoadingTopUser"
import LoadingCardUser              from "./LoadingCardUser"
import PerfectScrollbar             from 'react-perfect-scrollbar'
import CategoryAgent                from "./CategoryAgent"
import CategoryWorkunit             from "./CategoryWorkunit"
import CustomTableBodyEmpty         from "../../components/widgets/custom-table/CustomTableBodyEmpty"
import Select                       from "react-select"
import { selectThemeColors }        from '@utils'
import { PerformanceContext }       from "../../context/PerformanceContext"
import NavbarPerformance            from "./NavbarPerformance"

import Helper                       from "../../helpers"
import CustomTableNotAuthorized     from "../../components/widgets/custom-table/CustomTableNotAuthorized"

const PerformanceContainer = () => {

    const { 
        active,
        listData,
        setListData,
        sectorAgent,
        dataSelected,
        workunitOptions,
        setDataSelected,
        workunitLevel,
        getDataAgent,
        searchTerm,
        getDataWorkunit,
        getAgentDetail,
    } = useContext(PerformanceContext)

    const {getRoleByMenuStatus}  = Helper;

    const getDataAgentByUnitwork = (workunitId) => {
        setListData(false)
        setDataSelected(false)

        PerformanceApi.GetAgentByWorkUnit({
            params : {workunit_id : workunitId},
            onSuccess: (res) => {
                setListData(res.agent_performance)
                setDataSelected(res.agent_performance ? res.agent_performance[0] : null)
            }, onFail: (err) => {
                CustomToast("danger", err.message);
            }
        })
    }

    const onSearch = (value) => {
        searchTerm.current = value
        if(active == "workunit"){
            getDataWorkunit({ workunit_level_id: workunitLevel });
        }else{
            getDataAgent()
        }
    }

    return (
        <Fragment>
            {
                getRoleByMenuStatus('Performance', 'performance_list') ?
                    <Row>
                        <Col md="8" sm="12">
                            <Row>
                                <Col sm={{ size: 5, offset: 7 }}>
                                    <SearchTable placeholder={active === 'agent' ? "Cari Agen" : "Cari Satuan Kerja" } onSearch={(e)=> {onSearch(e)} } />
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
                                <Row className="mt-1 ">
                                    {listData.slice(0, 3).map((data, i) => (
                                        <Col key={i} md="4" className="d-flex justify-content-stretch">
                                            <CardTopUser data={data} index={i}/>
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