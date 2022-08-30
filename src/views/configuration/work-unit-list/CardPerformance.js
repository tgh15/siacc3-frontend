import { Card, CardBody, CardHeader, Col, Row } from "reactstrap"
import Avatar from "../../../components/widgets/avatar"
import Helper from "../../../helpers"
import ChartArea from "../../performance/ChartArea"


const CardPerformance = ({ data, index, type, pagination }) => {
    return (
        <Card className="border-secondary" style={{ marginBottom: "8px" }}>
            <CardHeader className="d-flex justify-content-start p-1">
                <span className="font-weight-bolder">{pagination ? Helper.customTableNumber({ key: index, pagination: pagination }) : index + 1}.</span>
                <Avatar src={type == "agent" ? data.photo : data.logo} onError={Helper.fallbackImage_} className="ml-1" />
                <span className="ml-1 font-weight-bolder"> {data.name} </span>
            </CardHeader>
            <hr className="m-0" />
            <CardBody className="p-1">
                <Row style={{ fontSize: "9pt" }}>
                    <Col md={4}>
                        <ChartArea dataChart={data.last_activity} height={90} />
                    </Col>
                    {type == "agent" ?
                        <>
                            <Col className="d-flex flex-column align-items-center">
                                <span className="font-weight-bolder">{Helper.shortenLargeNumber(data.performance.total_report, data.performance.total_report.length)}</span>
                                <span>Berita</span>
                            </Col>
                            <Col className="d-flex flex-column align-items-center" >
                                <span className="font-weight-bolder" >{Helper.shortenLargeNumber(data.performance.total_viewer, data.performance.total_viewer.length)}</span>
                                <span>Penonton</span>
                            </Col>
                            <Col className="d-flex flex-column align-items-center" >
                                <span className="font-weight-bolder">{Helper.shortenLargeNumber(data.performance.total_basic_rating, data.performance?.total_basic_rating?.length) ?? 0}</span>
                                <span>Rating</span>
                            </Col>
                            <Col className="d-flex flex-column align-items-center" md={3}>
                                <span className="font-weight-bolder">{data.national_ranking}</span>
                                <span>Peringkat Nasional</span>
                            </Col>
                        </> :
                        <>
                            <Col className="d-flex flex-column align-items-center" >
                                <span className="font-weight-bolder">{Helper.shortenLargeNumber(data?.total_agent, data?.total_agent?.length)}</span>
                                <span>Total Pegawai</span>
                            </Col>
                            <Col className="d-flex flex-column align-items-center" md={1}>
                                <span className="font-weight-bolder" >{Helper.shortenLargeNumber(data.performance.total_report, data.performance.total_report.length)}</span>
                                <span>Berita</span>
                            </Col>
                            <Col className="d-flex flex-column align-items-center" md={1}>

                                <span className="font-weight-bolder">{Helper.shortenLargeNumber(data.performance.points_total, data.performance.points_total.length)}</span>
                                <span>Point </span>
                            </Col>
                            <Col className="d-flex flex-column align-items-center" >
                                <span className="font-weight-bolder">{data.ranking}</span>
                                <span>Peringkat Nasional</span>
                            </Col>
                        </>
                    }
                </Row>
            </CardBody>
        </Card>
    )
}

export default CardPerformance