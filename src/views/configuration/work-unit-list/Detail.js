import { Fragment, useEffect, useState } from "react"
import { Button, Card, CardFooter, CardHeader, Col, Row } from "reactstrap"
import CardBody from "reactstrap/lib/CardBody"
import ImageRounded from "../../../components/widgets/image-rounded"
import CardText from "reactstrap/lib/CardText"
import CustomToast from "../../../components/widgets/custom-toast"
import WorkUnitListApi from "../../../services/pages/configuration/unit-work-list"
import Skeleton from "react-loading-skeleton"
import MapWorkunit from "./MapWorkunit"
import CustomTableBodyEmpty from "../../../components/widgets/custom-table/CustomTableBodyEmpty"
import { Marker, Popup } from "react-map-gl"
import imgMarker from "../../../assets/images/map_icons/point-map.png"
import PerformanceApi from "../../../services/pages/performance"
import { GetAgentByWorkunit } from "../../../services/pages/performance/GetAgentByWorkunit"
import feedsAgentReportAPI from "../../../services/pages/feeds/agent-reports"
import { processAgentReports } from "../../../components/widgets/feeds/news-card-widget/NewsConfig"
import { NewsWidget } from "../../../components/widgets/feeds/news-card-widget"
import CardPerformance from "./CardPerformance"
import PerfectScrollbar from "react-perfect-scrollbar"
import { useQuery } from "../../../components/utility/hooks/useQuery"
import ImgDataEmpty from "../../../assets/images/pages/emptydata.png"
import { useParams } from "react-router-dom"
import ModalPerformance from "./ModalPerformance"
import CustomTablePaginate from "../../../components/widgets/custom-table/CustomTablePaginate"


const CardData = (props) => {

    const {
        className
    } = props
    return (
        <Card className="w-100">
            <CardBody className={className}>
                {props.children}
            </CardBody>
        </Card>
    )
}

const Detail = ({ match }) => {

    let {id} = useParams();

    const [data, setData]                           = useState(false);
    const [leftState, setLeftState]                 = useState([]);
    const [pagination,setPagination]                = useState(null);
    const [dataDetail, setDataDetail]               = useState(null);
    const [rightState, setRightState]               = useState([]);
    const [defaultDataMap, setDefaultDataMap]       = useState({});
    const [selectedMarker, setSelectedMarker]       = useState(null);
    const [performanceAgent, setPerformanceAgent]   = useState({
        loading: true,
        data: []
    });

    const [performanceWorkunit, setPerformanceWorkunit] = useState({
        loading: true,
        data: []
    });

    const [modalPerformance, setModalPerformance] = useState({
        show: false,
        type: null
    });

    let query = useQuery();

    const getData = () => {

        WorkUnitListApi.getById({
            id: match.params.id,
            onSuccess: (res) => {
                setData(res);
                setDefaultDataMap({
                    "latitude": res.latitude,
                    "longitude": res.longitude,
                    "zoom": 4
                });
            }, onFail: (err) => {
                CustomToast("danger", err.message);
            }
        })
    }

    const getPerformanceAgent = () => {
        PerformanceApi.agentByWorkunitAndChild({
            workunit_id: parseInt(id),
            workunit_level_id: parseInt(query.get("level")),
            page: 1
        }).then(res => {
            console.log(res.data)
            setPerformanceAgent({
                loading: false,
                data: res.data.agent_performance
            })
        }, err => {
            console.log(err)
        })
    }

    const getPerformanceWorkunit = () => {
        PerformanceApi.workunitByParent({
            data: {
                workunit_id         : parseInt(id),
                condition_by        : 'parent',
                workunit_level_id   : parseInt(query.get("level"))
            },
            page: 1
        }).then(res => {
            console.log(res.data)
            setPerformanceWorkunit({
                loading: false,
                data: res.data.workunit_performance
            })
        }, err => {
            console.log(err)
        })
    }

    const getWorkunitDetail = () => {
        setDataDetail(null)
        let datas = {
            id: parseInt(match.params.id)
        }

        PerformanceApi.getWorkunitDetail({
            datas: datas,
            onSuccess: (res) => {
                setDataDetail(res)
            }, onFail: (err) => {
                console.log(err);
            }
        })
    }

    const getAgentReportByWorkunit = (page=1) => {

        const formData = {
            page        : page,
            workunit_id : parseInt(match.params.id)
        };

        feedsAgentReportAPI.getAgentReportByWorkunit(formData).then(
            res => {
                if (res.status === 200) {
                    if ("agent_report" in res.data && res.data.agent_report != null) {

                        let dataFeeds = processAgentReports(res.data.agent_report);
                        setPagination(res.data.pagination);

                        dataFeeds.then(
                            res => {
                                let arrLength = res.length;

                                //search half array length value
                                let getDivision = Math.round(arrLength / 2);
                                //get first half array
                                setLeftState([...res.splice(0, getDivision)]);

                                //get last half array
                                setRightState([...res.splice(0, arrLength - getDivision)]);
                            }
                        )
                    }
                }
            },
            err => {
                error_handler(err);
            }
        )
    };

    useEffect(() => {

        getData();
        getWorkunitDetail();
        getPerformanceAgent();
        getPerformanceWorkunit();
        getAgentReportByWorkunit();


    }, [])

    return (
        <Fragment>
            <ModalPerformance
                show                = {modalPerformance.show}
                onClose             = {() => setModalPerformance({ show: false, type: null })}
                type                = {modalPerformance.type}
                workunit_id         = {id}
                workunit_level_id   = {query.get("level")}
            />

            {data && <MapWorkunit >
                <Marker
                    key={data.id}
                    latitude={data.latitude}
                    longitude={data.longitude}
                >
                    <button style={{ border: "none", background: "none" }} onClick={(e) => { setSelectedMarker(data) }}>
                        <ImageRounded src={imgMarker} style={{ width: "20px" }} />
                    </button>
                </Marker>
                {selectedMarker ? (
                    <Popup
                        latitude={selectedMarker.latitude}
                        longitude={selectedMarker.longitude}
                        onClose={() => { setSelectedMarker(null) }}>
                        <div className="d-flex flex-column align-items-center py-0">
                            <div >
                                <ImageRounded src={selectedMarker.logo} width={40} />
                            </div>
                            <p className="font-weight-bolder mt-1" style={{ color: "black", fontSize: "12px" }}>
                                {selectedMarker.name}
                            </p>

                        </div>
                    </Popup>
                ) : null}
            </MapWorkunit>}

            {!data && <Skeleton style={{ height: "300px" }} />}
            <Row>
                <Col md="4" className="d-flex flex-row">
                    <CardData className="d-flex align-items-center flex-column">
                        <div>
                            {data ? <ImageRounded src={data.logo} width={120} /> : <Skeleton style={{ width: "150px", height: "150px" }} />}
                        </div>
                        <p className="text-muted mt-1">
                            ID : {data.code ?? <Skeleton style={{ width: "100px" }} />}
                        </p>
                        <p>{data.name ?? <Skeleton style={{ width: "250px" }} />}</p>
                        <p className="text-center">
                            {data.address ?? <Skeleton style={{ width: "250px", height: "50px" }} />}
                        </p>
                        <p className="text-center">
                            {data.email ?? <Skeleton style={{ width: "250px", height: "50px" }} />}
                        </p>
                        <p>
                            {data.phone_number ?? <Skeleton style={{ width: "150px" }} />}
                        </p>
                    </CardData>
                </Col>

                <Col md="4" className="d-flex flex-row">
                    <CardData>
                        <CardText>Performa Satker</CardText>
                        <Card color="secondary" outline className="mb-1">
                            <CardBody className="d-flex justify-content-between">
                                <span>
                                    Peringkat Nasional
                                </span>
                                <span>
                                    {dataDetail != null ? dataDetail.ranking : null}
                                </span>
                            </CardBody>
                        </Card>

                        <Card color="secondary" outline className="mb-1">
                            <CardBody className="d-flex justify-content-between">
                                <span>
                                    Total Poin Kejati
                                </span>
                                <span>
                                    {dataDetail != null ? dataDetail.performance.individual_points_total : null}
                                </span>
                            </CardBody>
                        </Card>

                        <Card color="secondary" outline className="mb-1">
                            <CardBody className="d-flex justify-content-between">
                                <span>
                                    Total Berita Dipublikasi
                                </span>
                                <span>
                                    {dataDetail != null ? dataDetail.performance.total_report : null}
                                </span>
                            </CardBody>
                        </Card>

                        <Card color="secondary" outline className="mb-1">
                            <CardBody className="d-flex justify-content-between">
                                <span>
                                    Total Berita Diarsipkan
                                </span>
                                <span>
                                    {dataDetail != null ? dataDetail.performance.total_archive_report : null}
                                </span>
                            </CardBody>
                        </Card>

                        <Card color="secondary" outline className="mb-1">
                            <CardBody className="d-flex justify-content-between">
                                <span>
                                   Total Point Kejari & Cabjari
                                </span>
                                <span>
                                    {dataDetail != null ? dataDetail.performance.child_points_total : null}
                                </span>
                            </CardBody>
                        </Card>
                    </CardData>
                </Col>
                
                <Col md="4" className="d-flex flex-row">
                    <CardData>
                        <CardText>Performa Agen</CardText>
                        <Card color="secondary" outline className="mb-1">
                            <CardBody className="d-flex justify-content-between">
                                <span>
                                    Total Personal
                                </span>
                                <span>
                                    {dataDetail != null ? dataDetail.total_agent : null}
                                </span>
                            </CardBody>
                        </Card>
                        <Card color="secondary" outline className="mb-1">
                            <CardBody className="d-flex justify-content-between">
                                <span>
                                    Personel 10 Besar
                                </span>
                                <span>
                                    {dataDetail != null ? dataDetail.top_agent : null}
                                </span>
                            </CardBody>
                        </Card>
                        {/* <Card color="secondary" outline>
                            <CardBody className="d-flex justify-content-between">
                                <span>
                                    Total  Point
                                </span>
                                <span>
                                    {dataDetail != null && "performance" in dataDetail ? dataDetail.performance.points_total : null}
                                </span>
                            </CardBody>
                        </Card> */}
                    </CardData>
                </Col>
            </Row>

            <Row className="mb-1">
                <Col>
                    {
                        !performanceWorkunit.loading ?
                            performanceWorkunit.data != null ? 
                                <Card>
                                    <CardHeader className="font-weight-bolder">Daftar Kejari & Kejari Serta Peringkat</CardHeader>
                                    <CardBody>

                                        {performanceWorkunit.data.slice(0, 3).map((item, index) => (
                                            <CardPerformance data={item} index={index} type="workunit" />
                                        ))}

                                        <div className="d-flex justify-content-end">
                                            <Button className="mt-1" color="flat-primary font-weight-bolder"
                                                onClick={() => {
                                                    setModalPerformance({
                                                        show: true,
                                                        type: "workunit"
                                                    })
                                                }}>
                                                Lihat Semua
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            :
                                <Card>
                                    <CardHeader className="font-weight-bolder">Daftar Kejari & Kejari Serta Peringkat</CardHeader>
                                    <CustomTableBodyEmpty/>
                                </Card>
                        : 
                            <Skeleton style={{ height: "350px" }} />
                    }
                </Col>
                <Col>
                    {
                        !performanceAgent.loading ?
                            performanceAgent.data != null ? <Card>
                                <CardHeader className="font-weight-bolder">Daftar Agent dan Peringkat</CardHeader>
                                <CardBody>

                                    {performanceAgent.data.slice(0, 3).map((item, index) => (
                                        <CardPerformance data={item} index={index} type="agent" />
                                    ))}

                                    <div className="d-flex justify-content-end">
                                        <Button className="mt-1" color="flat-primary font-weight-bolder"
                                            onClick={() => {
                                                setModalPerformance({
                                                    show: true,
                                                    type: "agent"
                                                })
                                            }}>
                                            Lihat Semua
                                        </Button>
                                    </div>
                                </CardBody>

                            </Card>
                                :
                                <Card>
                                    <CardHeader className="font-weight-bolder">Daftar Agent dan Peringkat</CardHeader>
                                    <CustomTableBodyEmpty/>
                                </Card>
                            : <Skeleton style={{ height: "350px" }} />
                    }
                </Col>
            </Row>

            <p className="text-center font-weight-bolder">Berita - Berita Satker</p>
            <Row>
                {
                    leftState.length < 1 && rightState.length < 1 ?
                        <Col md='12' sm='12'>
                            <CustomTableBodyEmpty />
                        </Col>
                    :
                        <Fragment>
                            <Col md={12}>
                                <CustomTablePaginate
                                    getData         = {(params) => { getAgentReportByWorkunit(params.page)}}
                                    pagination      = {pagination} 
                                    offsetSearch    = {10} 
                                />
                            </Col>
                            <Col md='6' sm='12'>
                                {
                                    leftState &&
                                    leftState.map((data) => (
                                        <NewsWidget
                                            key         = {`detail-workunit-news-${data.id}`}
                                            roleLike    = {true}
                                            roleViewer  = {true}
                                            roleDislike = {true}
                                            roleComment = {true}
                                            {...data}
                                        />
                                    ))
                                }
                            </Col>
                            <Col md='6' sm='12'>
                                {
                                    rightState &&
                                    rightState.map((data) => (
                                        <NewsWidget
                                            key         = {`detail-workunit-news-${data.id}`}
                                            roleLike    = {true}
                                            roleViewer  = {true}
                                            roleDislike = {true}
                                            roleComment = {true}
                                            {...data}
                                        />
                                    ))
                                }
                            </Col>
                        </Fragment>
                }
            </Row>
        </Fragment>
    )
}



export default Detail