import { Card, CardBody, Row } from "reactstrap";


const CustomTableBody = (props) => {

    const {
        outline,
        keyBody
    } = props

    const color = (outline) ? "secondary" : ""
    return (
        <Card 
            key         = {keyBody} 
            color       = {color} 
            outline
            className   = "mb-1 border" 
        >
            <CardBody>
                <Row>
                    {props.children}
                </Row>
            </CardBody>
        </Card>
    );
};

export default CustomTableBody;