import { Fragment, useState, useEffect }    from "react";
import { Card, CardBody, Col, Media, Row }  from "reactstrap";

//Css
import "../performance/Performance.scss";

//Helper
import Helper                               from "../../helpers";

//Services
import PerformanceApi                       from "../../services/pages/performance";

//Coponents
import Avatar                               from "../../components/widgets/avatar";
import ChartArea                            from "../performance/ChartArea";


const CardWorkunit = (props) => {
    //Props
    const {
        id,
        type,
        index,
    } = props;

    //State
    const [data, setData]   = useState(null);

    const getWorkunitDetail = (uuid) => {
        let datas = {
            id: uuid
        }

        PerformanceApi.getWorkunitDetail({
            datas: datas,
            onSuccess: (res) => {
                setData(res)
            }, onFail: (err) => {
                console.log(err);
            }
        })
    };

    const getAgentDetail = (uuid) => {
        let datas = {
            uuid: uuid
        }

        PerformanceApi.getAgetDetail({
            datas: datas,
            onSuccess: (res) => {
                setData(res)
            }, onFail: (err) => {
                console.log(err);
            }
        })
    };

    const getImage = () => {
        if (data.photo) {
            return data.photo;
        } else if (data.logo) {
            return data.logo
        } else {
            return Helper.defaultAvatar(data.name)
        }
    };

    useEffect(() => {
        if(type === 'workunit'){
            getWorkunitDetail(id);
        }else{
            getAgentDetail(id);
        }
    }, []);

    return (
        <Fragment>
            {
                data != null && data.name ?
                    <Card className="w-100">
                        <CardBody>
                            <Row>
                                <Col 
                                    md        = "1" 
                                    className = "d-flex align-items-center"
                                >
                                    {index+1}
                                </Col>
                                <Col 
                                    md        = "5" 
                                    className = "d-flex align-items-center"
                                >
                                    <Media>
                                        <Media 
                                            left 
                                            href='#'
                                        >
                                            <Avatar 
                                                img       = {getImage()} 
                                                onError   = {Helper.fallbackImage_} 
                                                status    = 'online'
                                                imgHeight = '40' 
                                                imgWidth  = '40' 
                                            />
                                        </Media>
                                        <Media body>
                                            <Media className="mb-0 ml-1">{data.name}</Media>
                                            <small className="text-muted ml-1 mt-0">{data.workunit}</small>
                                        </Media>
                                    </Media>
                                </Col>

                                <Col 
                                    md        = "3" 
                                    className = "d-flex align-items-center"
                                >
                                    <ChartArea 
                                        height    = {90}
                                        dataChart = {data.last_activity} 
                                    />
                                </Col>
                                <Col 
                                    md        = "1" 
                                    style     = {{ fontSize: "11px" }}
                                    className = "d-flex align-items-center" 
                                >
                                    <div className="text-center">
                                        <span style={{ fontWeight: "bold" }}>{data.performance.total_report}</span>
                                        <br />
                                        Berita
                                    </div>
                                </Col>
                                <Col 
                                    md        = "1" 
                                    style     = {{ fontSize: "11px" }}
                                    className = "d-flex align-items-center" 
                                >
                                    <div className="text-center">
                                        <span style={{ fontWeight: "bold" }}>{data.performance.total_viewer} </span>
                                        <br/>
                                        Viewer
                                    </div>
                                </Col>
                                <Col 
                                    md        = "1" 
                                    style     = {{ fontSize: "11px" }}
                                    className = "d-flex align-items-center" 
                                >
                                    <div className="text-center">
                                        <span style={{ fontWeight: "bold" }}>{data.performance.total_trophy} </span>
                                        <br/>
                                        Trofi
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card> 
                : null
            }
        </Fragment>
    )
};

export default CardWorkunit;