import React, { Fragment } from 'react';
import { Button, Col, FormGroup, Label, Row } from 'reactstrap';


const ModalFilter = () => {
    return (
        <Fragment>
            <FormGroup>
                <Label>Urutan</Label>
                <Row>
                    <Col>
                        <Button.Ripple 
                            block 
                            color = "primary"
                            outline
                        >
                            Terbaru
                        </Button.Ripple>
                    </Col>
                    <Col className="mr-1">
                        <Button.Ripple 
                            block 
                            color       = "primary"
                            outline
                            className   = "ml-1" 
                        >
                            Terlama
                        </Button.Ripple> 
                    </Col>
                </Row>
            </FormGroup>
        </Fragment>
    )
}

export default ModalFilter;