import {
    useRef,
    useState,
    useEffect,
    useContext,
} from "react"

import { Bar } from "react-chartjs-2"
import moment from "moment"
import {
    Monitor,
    Clipboard,
    CheckSquare,
} from "react-feather"

//Component
import {
    Col,
    Row,
    Card,
    Media,
    CardBody,
    CardText,
    CardTitle,
} from "reactstrap"
import Avatar from "../../../components/widgets/avatar"
import PerfectScrollbar from 'react-perfect-scrollbar'

//Utils
import { ThemeColors } from "../../../components/utility/context/ThemeColors";
import CardItem from "../utils/cardItem";
import Helper from "../../../helpers"

//API
import { HelpdeskAPI } from "../../../services/pages/helpdesk/home";
import { HelpdeskTicketApi } from "../../../services/pages/helpdesk/ticket"
import { useHistory } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

// Card Total
const CardTotal = props => {
    const {
        title,
        value,
        valueDescription,
        color,
        icon
    } = props
    return (
        <Card>
            <CardBody>
                <h4 className="mb-1">{title}</h4>

                <Media>
                    <Avatar color={color} icon={icon} className='mr-2' />
                    <Media className='my-auto'>
                        <h2 className='font-weight-bolder mb-0 mr-1'>{value}</h2>
                        <CardText className='font-small-3 mb-0' style={{ marginTop: "5px" }}>{valueDescription}</CardText>
                    </Media>
                </Media>

            </CardBody>
        </Card>
    )
}

// options for chart
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                }
            }]
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }

        }
    }
};

const HelpdeskHome = () => {

    const themeColors = useContext(ThemeColors)

    const [datas, setDatas] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [statisticByStatus, setStatisticByStatus] = useState(null);

    //Bar Chart
    const [labels, setLabels] = useState(null);
    const [bugsKind, setBugsKind] = useState([]);
    const [errorKind, setErrorKind] = useState([]);
    const [otherKind, setOtherKind] = useState([]);

    // react router
    let history = useHistory();

    const params = useRef({
        keyword: "",
        order_by: "desc",
        is_saved: false,
        page : 1
    })

    const getStatisticByStatus = () => {
        HelpdeskAPI.getStatisticByType('status').then(
            res => {
                if (res.status === 200) {
                    setStatisticByStatus(res.data);
                }
            },
            err => {
                console.log(err, 'get statistic by status');
            }
        )
    };

    const getStatisticByKind = () => {
        HelpdeskAPI.getStatisticByType('kind').then(
            res => {
                if (res.status === 200) {

                    let label_ = [];
                    let error_ = [];
                    let bugs_ = [];
                    let other_ = [];

                    res.data.map((data) => {
                        label_.push(moment(data.key, "YYYY-MM-DD").format("dddd"))

                        bugs_.push({ x: moment(data.key, "YYYY-MM-DD").format("dddd"), y: data.value.bugs })
                        error_.push({ x: moment(data.key, "YYYY-MM-DD").format("dddd"), y: data.value.error })
                        other_.push({ x: moment(data.key, "YYYY-MM-DD").format("dddd"), y: data.value.lainnya })

                    })
                    setLabels(label_);
                    setBugsKind(bugs_);
                    setErrorKind(error_);
                    setOtherKind(other_);
                }
            },
            err => {
                console.log(err, 'get statistic by kind');
            }
        )
    }

    const getData = () => {
        setIsLoading(true);
        HelpdeskTicketApi.getAll(params.current).then(res => {
            setIsLoading(false);
            setDatas(res.data.data.filter(data => data.is_saved == false));
        }, err => {
            setIsLoading(false);
            console.log(err);
        });
    }

    // function update data
    const updateData = (data) => {
        setIsLoading(true);
        HelpdeskTicketApi.update(data)
            .then(res => {
                setIsLoading(false);

                getData();

            }, err => {
                setIsLoading(false);
                console.log(err);
            })
    }

    const handleDropdown = (value, data) => {
        let dataForm = {}
        dataForm["id"] = data.id


        switch (value) {
            case "pin":
                dataForm["is_pinned"] = true
                break;
            case "done":
                dataForm["status"] = "done"
                break;
            case "process":
                dataForm["status"] = "process"
                break;
            case "queue":
                dataForm["status"] = "queue"
                break;
            case "save":
                dataForm["is_saved"] = true
                break;
            case "delete":
                return deleteData(data.id);

        }

        updateData(dataForm)


    }

    const data = {
        labels,
        datasets: [
            {
                label: 'Error',
                data: errorKind,
                backgroundColor: themeColors.colors.warning.main,
            },
            {
                label: 'Bugs',
                data: bugsKind,
                backgroundColor: themeColors.colors.info.main,
            },
            {
                label: 'Lainnya',
                data: otherKind,
                backgroundColor: themeColors.colors.secondary.main,
            },
        ],
    };

    useEffect(() => {
        getData();
        getStatisticByKind();
        getStatisticByStatus();
    }, []);

    return (
        <Row>
            <Col md={8}>
                <Row>
                    <Col md={4}>
                        <CardTotal
                            title="Total Pengaduan"
                            value={statisticByStatus != null ? statisticByStatus.total.value : 0}
                            valueDescription="Pengaduan"
                            color="primary"
                            icon={<Clipboard size={24} />} />
                    </Col>
                    <Col md={4}>
                        <CardTotal
                            title="Pengaduan Selesai"
                            value={statisticByStatus != null ? statisticByStatus.done.value : 0}
                            valueDescription="Selesai"
                            color="info"
                            icon={<CheckSquare size={24} />} />
                    </Col>
                    <Col md={4}>
                        <CardTotal
                            title="Pengaduan Terproses"
                            value={statisticByStatus != null ? statisticByStatus.process.value : 0}
                            valueDescription="Proses"
                            color="warning"
                            icon={<Monitor size={24} />}
                        />
                    </Col>
                </Row>

                <h3>Statistik Pengaduan</h3>
                <Card>
                    <CardBody>
                        <Bar options={options} data={data} />
                    </CardBody>
                </Card>
            </Col>
            <Col md={4}>
                <h3 className="mx-1 mt-1"> Pengaduan Terbaru </h3>
                <hr />
                <Card outline style={{ height: "40rem" }} className="p-1">
                    <PerfectScrollbar style={{ maxHeight: "40rem" }}>
                        {!isLoading ?
                            datas != null ?
                                datas.map((data) => (
                                    <CardItem
                                        time={Helper.dateIndo(data.updated_at)}
                                        onClick={() => history.push("inbox?id=" + data.id)}
                                        image={data.user?.photo}
                                        title={`${data.user?.name} -  ${data.user?.position}`}
                                        description={data.last_message}
                                        handlingStatus={data.status}
                                        type={data.report_kind?.name}
                                        onSelect={(value) => { handleDropdown(value, data) }}
                                    />
                                ))
                                :
                                null
                            : <Skeleton
                                count={5}
                                height={150}
                            />
                        }
                    </PerfectScrollbar>
                </Card>
            </Col>
        </Row>
    )
}

export default HelpdeskHome