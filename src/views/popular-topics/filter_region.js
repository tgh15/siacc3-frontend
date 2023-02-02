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
                                id          = {`popular_topic_national_button`}
                                color       = "primary"
                                className   = "mr-1"
                            >
                                <Globe size={14}/>&nbsp;
                                Nasional
                            </Button>
                        :
                            <Button 
                                id          = {`popular_topic_national_button_selected`}
                                color       = "primary"
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
                                id      = {`popular_topic_local_button`}
                                color   = "primary"
                            >
                                <MapPin size={14}/>&nbsp;
                                Lokal
                            </Button>
                        :
                            <Button 
                                id      = {`popular_topic_local_button_selected`}
                                color   = "primary"
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
