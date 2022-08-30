import Skeleton from "react-loading-skeleton"
import { Col, Row } from "reactstrap"


const LoadingTopUser = () => {
    return (
        <Row className="mt-1">
            <Col md="4">
                <Skeleton style={{ height: "388px" }} />
            </Col>
            <Col md="4">
                <Skeleton style={{ height: "388px" }} />
            </Col>
            <Col md="4">
                <Skeleton style={{ height: "388px" }} />
            </Col>
        </Row>
    )
}

export default LoadingTopUser