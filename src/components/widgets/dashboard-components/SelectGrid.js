import { Button, Card, Col, FormGroup, Label, Row, CardBody }   from 'reactstrap';


const SelectGrid = ({setGridItem, setIsGridSelected}) => {

    const handleGrid = (num) => {
        setGridItem(num);
        setIsGridSelected(true);
    };

    return(
        <FormGroup>
            <strong>
                Pilih Tampilan / Grid
            </strong>
            <Row>
                <Col sm={6} md={6}>
                    <Label>Penuh / Grid 1</Label>
                    <Button 
                        block
                        color   = "" 
                        onClick = {() => {
                            handleGrid(1)
                        }} 
                    >
                        <div className="d-flex justify-content-between">
                            <div style={{ width : "100%", margin : "0.5em"}}>
                                <Card color="primary">
                                    <CardBody/>
                                </Card>
                            </div>
                        </div>
                    </Button>
                </Col>
                <Col>
                    <Label> Grid 2 </Label>
                    <Button 
                        block
                        color   = "" 
                        onClick = {() => { handleGrid(2) }} 
                        outline 
                    >
                        <div className  = "d-flex justify-content-between">
                            <div style  = {{width:"50%",margin:"0.5em"}}>
                                <Card color = "primary">
                                    <CardBody/>
                                </Card>
                            </div>
                            <div style  = {{width:"50%",margin:"0.5em"}} >
                                <Card color = "primary">
                                    <CardBody/>
                                </Card>
                            </div>
                        </div>  
                    </Button>
                </Col>    
            </Row>
            <Row>
                <Col sm={6} md={6}>
                    <Label> Grid 3</Label>
                    <Button 
                        block
                        color   = "" 
                        outline 
                        onClick = {()=>{handleGrid(3)}} 
                    >
                        <div className  = "d-flex justify-content-between">
                            <div style  = {{width:"33.33333%",margin:"0.2em"}}>
                                <Card color = "primary">
                                    <CardBody/>
                                </Card>
                            </div>
                            <div style  = {{width:"33.33333%",margin:"0.2em"}}>
                                <Card color = "primary">
                                    <CardBody/>
                                </Card>
                            </div>
                            <div style  = {{width:"33.33333%",margin:"0.2em"}} >
                                <Card color = "primary">
                                    <CardBody/>
                                </Card>
                            </div>
                        </div>
                    </Button>
                </Col>
                <Col sm={6} md={6}>
                    <Label> Grid 4</Label>
                    <Button 
                        block
                        color   = "" 
                        onClick = {() => { handleGrid(4) }} 
                        outline 
                    >
                        <div className="d-flex justify-content-between">
                            <div style  = {{ width:"25%", margin:"0.2em" }}>
                                <Card color="primary">
                                    <CardBody/>
                                </Card>
                            </div>
                            <div style  = {{ width:"25%", margin:"0.2em" }}>
                                <Card color="primary">
                                    <CardBody/>
                                </Card>
                            </div>
                            <div style  = {{ width:"25%", margin:"0.2em"}}>
                                <Card color="primary">
                                    <CardBody/>
                                </Card>
                            </div>
                            <div style  = {{ width:"25%", margin:"0.2em"}}>
                                <Card color="primary">
                                    <CardBody/>
                                </Card>
                            </div>
                        </div>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col sm={6} md={6}>
                    <Label> Grid 5</Label>
                    <Button 
                        block
                        color   = "" 
                        onClick = {() => { handleGrid(5) }} 
                        outline 
                    >
                        <div className="d-flex justify-content-between">
                            <div style={{ width:"20%", margin:"0.2em"}}>
                                <Card color="primary">
                                    <CardBody/>
                                </Card>
                            </div>
                            <div style={{ width:"20%", margin:"0.2em"}}>
                                <Card color="primary">
                                    <CardBody/>
                                </Card>
                            </div>
                            <div style={{ width:"20%", margin:"0.2em"}}>
                                <Card color="primary">
                                    <CardBody/>
                                </Card>
                            </div>
                            <div style={{ width:"20%", margin:"0.2em"}}>
                                <Card color="primary">
                                    <CardBody/>
                                </Card>
                            </div>
                            <div style={{ width:"20%", margin:"0.2em"}}>
                                <Card color="primary">
                                    <CardBody/>
                                </Card>
                            </div>
                        </div>
                    </Button>
                </Col>
                <Col sm={6} md={6}>
                    <Label>Grid 6</Label>
                    <Button 
                        block
                        color   = "" 
                        onClick = {()=>{handleGrid(6)}} 
                        outline 
                    >
                        <div className  = "d-flex justify-content-between">
                            <div style  = {{ width:"16.6667%", margin:"0.2em"}}>
                                <Card color="primary">
                                    <CardBody/>
                                </Card>
                            </div>
                            <div style = {{ width:"16.6667%", margin:"0.2em"}}>
                                <Card color="primary">
                                    <CardBody/>
                                </Card>
                            </div>
                            <div style={{ width:"16.6667%", margin:"0.2em"}}>
                                <Card color="primary">
                                    <CardBody/>
                                </Card>
                            </div>
                            <div style={{ width:"16.6667%", margin:"0.2em"}}>
                                <Card color="primary">
                                    <CardBody/>
                                </Card>
                            </div>
                            <div style={{ width:"16.6667%", margin:"0.2em"}}>
                                <Card color="primary">
                                    <CardBody/>
                                </Card>
                            </div>
                            <div style={{ width:"16.6667%", margin:"0.2em"}}>
                                <Card color="primary">
                                    <CardBody/>
                                </Card>
                            </div>
                        </div>
                    </Button>
                </Col>
            </Row>
        </FormGroup>
    )
}

export default SelectGrid;