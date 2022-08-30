import { Fragment }         from "react";
import { Globe, MapPin }    from "react-feather";
import { Button, Col, Row } from "reactstrap";


const FilterRegion = (props) => {
    return (
        <Fragment>
            <Row>
                <Col 
                    sm          = "12"
                    md          = "12"
                    // className   = "text-center"
                >
                    {
                        props.trendingType === 'national' ?
                            <Button 
                                color       = "primary"
                                // style       = {{width: '125px'}}
                                className   = "mr-1"
                            >
                                <Globe size={14}/>&nbsp;
                                Nasional
                            </Button>
                        :
                            <Button 
                                color       = "primary"
                                // style       = {{width: '125px'}}
                                outline
                                className   = "mr-1"
                                onClick     = {() => props.setTrendingType('national')}
                            >
                                <Globe size={14}/>&nbsp;
                                Nasional
                            </Button>
                    }

                    {
                        props.trendingType === 'local' ?
                            <Button 
                                color   = "primary"
                                // style   = {{width: '125px'}}
                            >
                                <MapPin size={14}/>&nbsp;
                                Lokal
                            </Button>
                        :
                            <Button 
                                color   = "primary"
                                // style   = {{width: '125px'}}
                                outline 
                                onClick = {() => props.setTrendingType('local')} 
                            >
                                <MapPin size={14}/>&nbsp;
                                Lokal
                        </Button>
                    }
                </Col>
            </Row>
        </Fragment>
    );
};

export default FilterRegion;
