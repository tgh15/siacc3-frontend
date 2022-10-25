import { Fragment} from "react"
import { Card, CardBody, CardText, Col,  Row } from "reactstrap"
import { date } from "yup"
import Helper from "../../helpers"
import DoughnutChart from "./doughnut-chart"

const DetailDataFormatted = (props) => {

    const {
        detailReport,
    }                                        = props;
    
    return (
        <Fragment>
            <div>
                
                <Card className="bg-header" bodyStyle={{ padding: '0px' }}>
                    <CardBody>
                        <Row>
                            <Col md={2}>
                                No.
                            </Col>
                            {
                                detailReport?.report_type === 'periodically' ? 
                                    <>
                                        <Col md={4}>
                                            Satuan Kerja
                                        </Col>

                                        {
                                            detailReport.contents.map((data) => (
                                                <Col md={2}> 
                                                    {data.report_content.name}
                                                </Col>
                                            ))
                                        }

                                    </>
                                :
                                    <>
                                        <Col md={7}>
                                            Satuan Kerja
                                        </Col>
                                        <Col md={3}>
                                            {
                                                detailReport?.contents[0]?.report_content?.name
                                            }
                                        </Col>
                                    </>

                            }
                        </Row>
                    </CardBody>
                </Card>

                {
                    detailReport != null && detailReport.result.map((data,index) => (
                        <Card className="bg-header" bodyStyle={{ padding: '0px' }}>
                            <CardBody>
                                <Row>
                                    <Col md={2}>
                                        {index+1}
                                    </Col>

                                    {
                                        detailReport?.report_type === 'periodically' ? 
                                            <>
                                                <Col md={4}>
                                                    {data.name}
                                                </Col>
                                                {
                                                    detailReport.contents.map((data_) => (
                                                        
                                                        data_.report_content_id === 11 ?
                                                            <Col md={2}> 
                                                                {data.data[0].result.map((count) => count.publication).reduce((total, num) => total+num)}
                                                            </Col>
                                                        :
                                                            data_.report_content_id === 12 ?
                                                                <Col md={2}> 
                                                                    {data.data[0].result.map((count) => count.archive).reduce((total, num) => total+num)}
                                                                </Col>
                                                            :
                                                                <Col md={2}> 
                                                                    {data.data[0].result.map((count) => count.forward).reduce((total, num) => total+num)}
                                                                </Col>
                                                    ))
                                                }

                                            </>
                                        :
                                            <>
                                                <Col md={7}>
                                                    {data.name}
                                                </Col>
                                                <Col md={3}>
                                                    {
                                                        detailReport.contents.length > 0 &&
                                                            detailReport.contents.filter((data) => data.report_content_id === 11).length > 0 &&
                                                                data.data[0].result.map((count) => count.publication).reduce((total, num) => total+num )
                                                    }

                                                    {
                                                        detailReport.contents.length > 0 &&
                                                            detailReport.contents.filter((data) => data.report_content_id === 12).length > 0 &&
                                                                data.data[0].result.map((count) => count.archive).reduce((total, num) => total+num )
                                                    }

                                                    {
                                                        detailReport.contents.length > 0 &&
                                                            detailReport.contents.filter((data) => data.report_content_id === 13).length > 0 &&
                                                                data.data[0].result.map((count) => count.forward).reduce((total, num) => total+num )
                                                    }
                                                </Col>
                                            </>
                                    }

                                    
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