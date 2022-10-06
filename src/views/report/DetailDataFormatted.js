import { Fragment} from "react"
import { Card, CardBody, CardText, Col,  Row } from "reactstrap"
import Helper from "../../helpers"
import DoughnutChart from "./doughnut-chart"

const DetailDataFormatted = (props) => {

    const {
        detailReport,
        selectedReport,
        selectForwardChat,
        isDetailResultsVisible,
        setIsDetailResultsVisible,
    }                                        = props;
    
    return (
        <Fragment>
            <div>
                
                <Card className="bg-header" bodyStyle={{ padding: '0px' }}>
                    <CardBody>
                        <Row>
                            <Col md={2} sm={32}>
                                No.
                            </Col>
                            <Col md={7} sm={32}>
                                Satuan Kerja
                            </Col>
                            <Col md={3} sm={32}>
                                Jumlah
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                {
                    detailReport != null && detailReport.result.map((data,index) => (
                        <Card className="bg-header" bodyStyle={{ padding: '0px' }}>
                            <CardBody>
                                <Row>
                                    <Col md={2} sm={32}>
                                        {index+1}
                                    </Col>
                                    <Col md={7} sm={32}>
                                        {data.work_unit}
                                    </Col>
                                    <Col md={3} sm={32}>
                                        {data.jumlah}
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    ))
                }
            </div>
        </Fragment>
    )
}

export default DetailDataFormatted