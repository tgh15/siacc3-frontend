import  Skeleton from "react-loading-skeleton"
import { Col, Row } from "reactstrap"


const LoadingCardUser = () => {
    return (
        <Row >
            <Col>
                <Skeleton style={{ height: "80px" }} />
            </Col>
        </Row>
    )
}

export default LoadingCardUser