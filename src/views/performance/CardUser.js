import { Fragment, useContext } from "react"
import { Card, CardBody, Col, Media, Row } from "reactstrap"
import Avatar from "../../components/widgets/avatar"
import ChartArea from "./ChartArea"
import "./Performance.scss"
import Helper from "../../helpers"
import { PerformanceContext } from "../../context/PerformanceContext"

const CardUser = (props) => {

    const {
        data,
        index,
    } = props

    const { 
        active, 
        dataSelected, 
        getAgentDetail, 
        setDataSelected, 
        getWorkunitDetail,
        setIsAchievementVisible,
        setIsDetailViewerVisible,
        setIsDetailTrophyVisible,
    } = useContext(PerformanceContext)


    const selected = () => {
        if (data == dataSelected) {
            return "selected"
        }
    }

    const getImage = () => {
        if (data.photo) {
            return data.photo;
        } else if (data.logo) {
            return data.logo
        } else {
            return Helper.defaultAvatar(data.name)
        }
    }

    const onClick = () => {
        setDataSelected(data)

        if (active == "agent") {
            getAgentDetail(data.uuid);
        } else {
            getWorkunitDetail(data.id);
        }
    }

    return (
        <Fragment>
            {data.name ?
                <Card className={`mb-1 cursor-pointer  ${selected()}`} onClick={onClick}>
                    <CardBody>
                        <Row>
                            <Col md="1" className="d-flex align-items-center">
                                {index + 4}
                            </Col>
                            <Col md="5" className="d-flex align-items-center">
                                <Media>
                                    <Media left href='#'>
                                        <Avatar img={getImage()} imgHeight='40' imgWidth='40' status='online' />
                                    </Media>
                                    <Media body>
                                        <Media className="mb-0 ml-1">{data.name}</Media>
                                        <small className="text-muted ml-1 mt-0">{data.workunit_level} {data.workunit} </small>
                                    </Media>
                                </Media>
                            </Col>

                            <Col md="3" className="d-flex align-items-center">
                                <ChartArea dataChart={data.last_activity} height={90}/>
                            </Col>
                            <Col 
                                md          = "1" 
                                style       = {{ fontSize: "11px" }}
                                onClick     = {() => {setIsAchievementVisible(true)}}
                                className   = "d-flex align-items-center" 
                            >
                                <div className="text-center">
                                    <span style={{ fontWeight: "bold" }}>{data.performance.total_report}</span>
                                    <br />
                                    Berita
                                </div>
                            </Col>
                            <Col 
                                md          = "1" 
                                style       = {{ fontSize: "11px" }}
                                onClick     = {() => {setIsDetailViewerVisible(true)}}
                                className   = "d-flex align-items-center" 
                            >
                                <div className="text-center">
                                    <span style={{ fontWeight: "bold" }}>{data.performance.total_viewer} </span>
                                    <br/>
                                    Viewer
                                </div>
                            </Col>
                            <Col 
                                md          = "1" 
                                style       = {{ fontSize: "11px" }}
                                onClick     = {() => {setIsDetailTrophyVisible(true)}}
                                className   = "d-flex align-items-center" 
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
                : 
                    null
            }
        </Fragment>

    )
}

export default CardUser