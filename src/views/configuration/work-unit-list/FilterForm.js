import { Fragment, useState }   from "react";
import { 
    Col, 
    Row, 
    Label, 
    Button, 
    FormGroup, 
    ModalFooter, 
} from "reactstrap";


const FilterForm = ({workunitLevelSelected, onFilter}) => {
    //State
    const [order, setOrder] = useState("latest");

    const handleFilter = () => {
       onFilter(order)
    };
    
    return (
        <Fragment>
            <FormGroup>
                <Label>Urutkan</Label>
                <Row id="workunitlist-filter">
                    <Col>
                        {
                            (order === "latest") ?
                                <Button.Ripple
                                    block 
                                    color = "primary"
                                >
                                    Terbaru
                                </Button.Ripple> 
                            : 
                                <Button.Ripple 
                                    block 
                                    color   = "primary" 
                                    outline
                                    onClick = {() => setOrder("latest")}
                                >
                                    Terbaru
                                </Button.Ripple>
                        }
                    </Col>
                    <Col className="mr-1">
                        {
                            (order === "longest") ?
                                <Button.Ripple 
                                    block 
                                    color       = "primary"
                                    className   = "ml-1" 
                                >
                                    Terlama
                                </Button.Ripple>
                            :
                                <Button.Ripple
                                    block 
                                    color       = "primary" 
                                    outline 
                                    onClick     = {() => setOrder("longest")}
                                    className   = "ml-1" 
                                >
                                    Terlama
                                </Button.Ripple>
                        }
                    </Col>
                </Row>
            </FormGroup>
            <ModalFooter className="d-flex justify-content-center">
                <div id="workunitlist-apply">
                    <Button.Ripple 
                        color   = 'primary' 
                        onClick = {handleFilter}
                    >
                        Terapkan
                    </Button.Ripple>
                </div>
            </ModalFooter>
        </Fragment>
    );
};

export default FilterForm;