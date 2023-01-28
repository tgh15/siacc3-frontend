import { useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { ModalBase } from "../../../components/widgets/modals-base";
import PerformanceApi from "../../../services/pages/performance";
import CardPerformance from "./CardPerformance";
import PerfectScrollbar from "react-perfect-scrollbar";
import CustomTablePaginate from "../../../components/widgets/custom-table/CustomTablePaginate";
import { Row } from "reactstrap";

const ModalPerformance = props => {

    const {
        show,
        onClose,
        type,
        workunit_id,
        workunit_level_id
    } = props

    const [datas, setDatas] = useState({
        data: null,
        loading: true,
        pagination: null
    });

    const page = useRef(1);

    const getPerformanceAgent = () => {

        PerformanceApi.agentByWorkunitAndChild({
            workunit_id: parseInt(workunit_id),
            workunit_level_id: parseInt(workunit_level_id),
            page: page.current
        }).then(res => {

            setDatas({
                loading: false,
                data: res.data.agent_performance,
                pagination: res.data.pagination
            })
        }, err => {
            console.log(err)
        })
    }

    const getPerformanceWorkunit = () => {
        PerformanceApi.workunitByParent({
            data: {
                condition_by : "parent",
                workunit_id : parseInt(workunit_id),
                workunit_level_id: parseInt(workunit_level_id)
            },
            page: page.current
        }).then(res => {
            setDatas({
                loading: false,
                data: res.data.workunit_performance,
                pagination: res.data.pagination
            })
        }, err => {
            console.log(err)
        })
    }

    const getData = () => {
        setDatas({
            data: null,
            loading: true,
            pagination: null
        })

        if (type == 'agent') {
            getPerformanceAgent()
        } else {
            getPerformanceWorkunit()
        }
    }

    return (
        <div>
            <ModalBase
                size        = 'lg'
                show        = {show}
                title       = {type == "agent" ? "Daftar Agent dan Peringkat" : "Daftar Kejari & Kejari Serta Peringkat"}
                setShow     = {() => onClose()}
                onOpened    = {() => {getData()}}
            >
                {
                    datas.data != null ?
                        <Row className="d-flex">
                            <CustomTablePaginate
                                offsetSearch    = {9}
                                size            = {3}
                                pagination      = {datas.pagination}
                                onNext          = {() => {
                                    page.current = page.current + 1;
                                    getData()
                                }}
                                onPrev          = {() => {
                                    page.current = page.current - 1;
                                    getData()
                                }}
                            />
                        </Row> 
                    : 
                        null
                }

                {
                    datas.loading ?
                        <Skeleton count={3} style={{ height: "100px" }} /> 
                    :
                        datas.data != null ?
                            <PerfectScrollbar>
                                {
                                    datas.data.map((item, index) => (
                                        <CardPerformance 
                                            data        = {item} 
                                            type        = {type} 
                                            index       = {index} 
                                            pagination  = {datas.pagination} 
                                        />
                                    ))
                                }
                            </PerfectScrollbar>
                        : 
                            null
                }
            </ModalBase>
        </div>
    )
}

export default ModalPerformance;