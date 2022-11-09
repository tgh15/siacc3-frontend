import { Fragment, useEffect, useState } from "react";
import { 
    Col, 
    Row, 
    Card, 
    Button, 
    CardText, 
    CardBody, 
    CardHeader, 
}   from "reactstrap";

import Skeleton                          from "react-loading-skeleton";
import { useParams }                     from "react-router-dom";
import { Marker, Popup }                 from "react-map-gl";

//Assets
import imgMarker                         from "../../../assets/images/map_icons/point-map.png";

//Services
import PerformanceApi                    from "../../../services/pages/performance";
import workunitListAPI                   from "../../../services/pages/configuration/unit-work-list/WorkunitList";
import feedsAgentReportAPI               from "../../../services/pages/feeds/agent-reports";

//Components
import CustomToast                       from "../../../components/widgets/custom-toast";
import MapWorkunit                       from "./MapWorkunit";
import ImageRounded                      from "../../../components/widgets/image-rounded";
import { useQuery }                      from "../../../components/utility/hooks/useQuery";
import { NewsWidget }                    from "../../../components/widgets/feeds/news-card-widget";
import CardPerformance                   from "./CardPerformance";
import ModalPerformance                  from "./ModalPerformance";
import CustomTableBodyEmpty              from "../../../components/widgets/custom-table/CustomTableBodyEmpty";
import { processAgentReports }           from "../../../components/widgets/feeds/news-card-widget/NewsConfig";


const CardData = (props) => {
    //Props
    const {className} = props;

    return (
        <Card className="w-100">
            <CardBody className={className}>
                {props.children}
            </CardBody>
        </Card>
    )
};

const Detail = ({ match }) => {
    //Params
    let {id} = useParams();

    //Query
    let query = useQuery();

    //State
    const [data, setData]                               = useState(false);
    const [leftState, setLeftState]                     = useState([]);
    const [rightState, setRightState]                   = useState([]);
    const [dataDetail, setDataDetail]                   = useState(null);
    const [defaultDataMap, setDefaultDataMap]           = useState({});
    const [selectedMarker, setSelectedMarker]           = useState(null);

    const [performanceAgent, setPerformanceAgent]       = useState({
        loading : true,
        data    : []
    });

    const [performanceWorkunit, setPerformanceWorkunit] = useState({
        loading : true,
        data    : []
    });

    const [modalPerformance, setModalPerformance]       = useState({
        show : false,
        type : null
    });

    //Get profile workunit
    const getData = () => {
        const formData = {
            id: parseInt(match.params.id)
        };

        workunitListAPI.getWorkunitProfile(formData).then(
            res => {
                if (!res.is_error) {
                    setData(res.data);
                    setDefaultDataMap({
                        "latitude"  : res.data.latitude,
                        "longitude" : res.data.longitude,
                        "zoom"      : 4
                    });
                }else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //Get performance workunit
    const getWorkunitDetail = () => {
        setDataDetail(null);

        const formData = {
            id: parseInt(match.params.id)
        };

        workunitListAPI.getWorkunitPerformance(formData).then(
            res => {
                if (!res.is_error) {
                    setDataDetail(res.data);
                }else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //Get rating workunit
    const getRatingWorkunit = () => {
        const formData = {
            workunit_id         : parseInt(id),
            condition_by        : "parent",
            workunit_level_id   : parseInt(query.get("level"))
        };

        workunitListAPI.getWorkunitRating(1, formData).then(
            res => {
                if (!res.is_error) {
                    setPerformanceWorkunit({
                        loading : false,
                        data    : res.data.workunit_performance
                    })
                }else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //Get rating agent
    const getPerformanceAgent = () => {
        const formData = {
            workunit_id       : parseInt(id),
            workunit_level_id : parseInt(query.get("level")),
            page              : 1
        };

        PerformanceApi.agentByWorkunitAndChild(formData).then(
            res => {
                if (!res.is_error) {
                    setPerformanceAgent({
                        loading : false,
                        data    : res.data.agent_performance
                    })
                }else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //Get agent report by workunit
    const getAgentReportByWorkunit = () => {
        const formData = {
            workunit_id: parseInt(match.params.id)
        };

        feedsAgentReportAPI.getAgentReportByWorkunit(formData).then(
            res => {
                if (!res.is_error) {
                    if (res.data.agent_report == null) {
                        setLeftState([]);
                        setRightState([]);
                    }else {
                        processAgentReports(res.data.agent_report).then(
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
                }else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    useEffect(() => {
        getData();
        getWorkunitDetail();
        getRatingWorkunit();
        getPerformanceAgent();
        getAgentReportByWorkunit();
    }, []);

    return (
        <Fragment>
            <ModalPerformance
                show                = {modalPerformance.show}
                type                = {modalPerformance.type}
                onClose             = {() => setModalPerformance({ show: false, type: null })}
                workunit_id         = {id}
                workunit_level_id   = {query.get("level")}
            />

            {data && <MapWorkunit>
                <Marker
                    key       = {data.id}
                    latitude  = {data.latitude}
                    longitude = {data.longitude}
                >
                    <button 
                        style   = {{ border: "none", background: "none" }} 
                        onClick = {(e) => { setSelectedMarker(data) }}
                    >
                        <ImageRounded 
                            src   = {imgMarker} 
                            style = {{ width: "20px" }}
                        />
                    </button>
                </Marker>
                {
                    selectedMarker ? (
                        <Popup
                            onClose   = {() => { setSelectedMarker(null) }}
                            latitude  = {selectedMarker.latitude}
                            longitude = {selectedMarker.longitude}
                        >
                            <div className="d-flex flex-column align-items-center py-0">
                                <div>
                                    <ImageRounded 
                                        src   = {selectedMarker.logo} 
                                        width = {40}
                                    />
                                </div>
                                <p 
                                    style     = {{ color: "black", fontSize: "12px" }}
                                    className = "font-weight-bolder mt-1" 
                                >
                                    {selectedMarker.name}
                                </p>
                            </div>
                        </Popup>
                    ) : null
                }
            </MapWorkunit>}

            {!data && <Skeleton style={{ height: "300px" }}/>}

            <Row>
                <Col 
                    md        = "4"
                    className = "d-flex flex-row"
                >
                    <CardData className="d-flex align-items-center flex-column">
                        <div>
                            {
                                data ? <ImageRounded src={data.logo} width={120}/> : 
                                <Skeleton style={{ width: "150px", height: "150px" }}/>
                            }
                        </div>
                        <p className="text-muted mt-1">
                            ID : {data.code ?? <Skeleton style={{ width: "100px" }}/>}
                        </p>
                        <p>{data.name ?? <Skeleton style={{ width: "250px" }}/>}</p>
                        <p className="text-center">
                            {data.address ?? <Skeleton style={{ width: "250px", height: "50px" }}/>}
                        </p>
                        <p className="text-center">
                            {data.email ?? <Skeleton style={{ width: "250px", height: "50px" }}/>}
                        </p>
                        <p>
                            {data.phone_number ?? <Skeleton style={{ width: "150px" }}/>}
                        </p>
                    </CardData>
                </Col>

                <Col 
                    md        = "4" 
                    className = "d-flex flex-row"
                >
                    <CardData>
                        <CardText>Performa Satker</CardText>
                        <Card 
                            color     = "secondary" 
                            outline 
                            className = "mb-1"
                        >
                            <CardBody className="d-flex justify-content-between">
                                <span>
                                    Peringkat Nasional
                                </span>
                                <span>
                                    {dataDetail != null ? dataDetail.ranking : null}
                                </span>
                            </CardBody>
                        </Card>
                        <Card 
                            color     = "secondary" 
                            outline 
                            className = "mb-1"
                        >
                            <CardBody className="d-flex justify-content-between">
                                <span>
                                    Total Poin Kejati
                                </span>
                                <span>
                                    {dataDetail != null ? dataDetail.performance.individual_points_total : null}
                                </span>
                            </CardBody>
                        </Card>
                        <Card 
                            color     = "secondary" 
                            outline 
                            className = "mb-1"
                        >
                            <CardBody className="d-flex justify-content-between">
                                <span>
                                    Total Berita Dipublikasi
                                </span>
                                <span>
                                    {dataDetail != null ? dataDetail.performance.total_report : null}
                                </span>
                            </CardBody>
                        </Card>
                        <Card 
                            color     = "secondary" 
                            outline 
                            className = "mb-1"
                        >
                            <CardBody className="d-flex justify-content-between">
                                <span>
                                    Total Berita Diarsipkan
                                </span>
                                <span>
                                    {dataDetail != null ? dataDetail.performance.total_archive_report : null}
                                </span>
                            </CardBody>
                        </Card>
                        <Card 
                            color     = "secondary" 
                            outline 
                            className = "mb-1"
                        >
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
                
                <Col 
                    md        = "4" 
                    className = "d-flex flex-row"
                >
                    <CardData>
                        <CardText>Performa Agen</CardText>
                        <Card 
                            color     = "secondary" 
                            outline 
                            className = "mb-1"
                        >
                            <CardBody className="d-flex justify-content-between">
                                <span>
                                    Total Personal
                                </span>
                                <span>
                                    {dataDetail != null ? dataDetail.total_agent : null}
                                </span>
                            </CardBody>
                        </Card>
                        <Card 
                            color     = "secondary" 
                            outline 
                            className = "mb-1"
                        >
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
                                    <CardHeader className="font-weight-bolder">
                                        Daftar Kejari & Kejari Serta Peringkat
                                    </CardHeader>
                                    <CardBody>
                                        {performanceWorkunit.data.slice(0, 3).map((item, index) => (
                                            <CardPerformance 
                                                data  = {item} 
                                                type  = "workunit" 
                                                index = {index} 
                                            />
                                        ))}
                                        <div className="d-flex justify-content-end">
                                            <Button 
                                                color     = "flat-primary font-weight-bolder"
                                                onClick   = {() => {
                                                    setModalPerformance({
                                                        show : true,
                                                        type : "workunit"
                                                    })
                                                }}
                                                className = "mt-1" 
                                            >
                                                Lihat Semua
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            :
                                <Card>
                                    <CardHeader className="font-weight-bolder">
                                        Daftar Kejari & Kejari Serta Peringkat
                                    </CardHeader>
                                    <CustomTableBodyEmpty/>
                                </Card>
                        : <Skeleton style={{ height: "350px" }}/>
                    }
                </Col>
                <Col>
                    {
                        !performanceAgent.loading ?
                            performanceAgent.data != null ? 
                                <Card>
                                    <CardHeader className="font-weight-bolder">
                                        Daftar Agent dan Peringkat
                                    </CardHeader>
                                    <CardBody>
                                        {
                                            performanceAgent.data.slice(0, 3).map((item, index) => (
                                                <CardPerformance 
                                                    data  = {item} 
                                                    type  = "agent" 
                                                    index = {index} 
                                                />
                                            ))
                                        }

                                        <div className="d-flex justify-content-end">
                                            <Button
                                                color     = "flat-primary font-weight-bolder"
                                                onClick   = {() => {
                                                    setModalPerformance({
                                                        show : true,
                                                        type : "agent"
                                                    })
                                                }}
                                                className = "mt-1" 
                                            >
                                                Lihat Semua
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            :
                                <Card>
                                    <CardHeader className="font-weight-bolder">
                                        Daftar Agent dan Peringkat
                                    </CardHeader>
                                    <CustomTableBodyEmpty/>
                                </Card>
                        : <Skeleton style={{ height: "350px" }}/>
                    }
                </Col>
            </Row>

            <p className="text-center font-weight-bolder">Berita - Berita Satker</p>
            <Row>
                {
                    leftState.length < 1 &&
                    rightState.length < 1 ?
                        <Col 
                            md = '12' 
                            sm = '12'
                        >
                            <CustomTableBodyEmpty/>
                        </Col>
                    :
                        <Fragment>
                            <Col 
                                md = '6' 
                                sm = '12'
                            >
                                {
                                    leftState &&
                                    leftState.map((data) => (
                                        <NewsWidget
                                            key         = {`detail-workunit-news-${data.id}`}
                                            // handleStore             = {(newss,data) => {handleStore(newss,data)}}

                                            roleLike    = {true}
                                            roleViewer  = {true}
                                            roleDislike = {true}
                                            roleComment = {true}

                                            {...data}
                                        />
                                    ))
                                }
                            </Col>
                            <Col 
                                md = '6' 
                                sm = '12'
                            >
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
};

export default Detail;