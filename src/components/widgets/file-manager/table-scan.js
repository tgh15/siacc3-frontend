import { useRef } from "react"
import { ZoomIn, AlertCircle } from "react-feather"
import { Card, CardBody, Col, Row, UncontrolledTooltip } from "reactstrap"
import Helper from "../../../helpers"

const TableScan = props => {

    const {
        data,
        getInObject,
        fileIcon
    } = props

    const tooltipRef = useRef(null);

    return (
        <Card className="mb-1">
            <CardBody>
                <Row>
                    <Col md="4">
                        <Row>
                            <Col md={1}>
                            </Col>

                            <Col md={11}>
                                <ZoomIn  />
                                {
                                    getInObject(data, "mime") && getInObject(data, "mime").kind == "Image" ?
                                        <span className="ml-1" onClick={() => { setImageSelected(getInObject(data, "url", "")) }}> {getInObject(data, "name", "")} </span>
                                    : 
                                        <span className="ml-1"> {getInObject(data, "name", "")} </span>
                                }
                                <AlertCircle size={16} ref={tooltipRef} className="text-info cursor-pointer" style={{ marginLeft: "5px", marginTop: "2px" }} />
                                <UncontrolledTooltip placement='top' target={tooltipRef}>
                                    File dalam proses scanning
                                </UncontrolledTooltip>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="5">
                        <Row>
                            <Col md={1}>
                            </Col>
                            <Col md={1}>
                            </Col>
                            <Col md={5}>
                            </Col>
                            <Col md={2}>
                            </Col>
                            <Col md={3}>
                                {data.mime ? Helper.fileSize(data.mime.size) : ""}
                            </Col>
                        </Row>
                    </Col>
                    <Col md="3" className="pr-4">
                        {Helper.dateIndo(data.last_open)}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default TableScan