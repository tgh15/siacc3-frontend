import { Card, CardBody, Col, Row } from "reactstrap"
import AvatarPerformance from "../../components/widgets/avatar-performance"
import avatarImg from '@src/assets/images/portrait/small/150x150.png'
import defaultBadge from '@src/assets/images/achievement_icon/badges.png'
import ChartArea from "./ChartArea"
import "./Performance.scss"
import Helper from "../../helpers"
import { useContext, useState } from "react"
import defaultAvatar from "../../components/widgets/default-image/DefaultAvatar"
import { PerformanceContext } from "../../context/PerformanceContext"


const CardTopUser = (props) => {

    const {
        data,
        index,
    } = props

    const { dataSelected, setDataSelected, getAgentDetail, active, getWorkunitDetail } = useContext(PerformanceContext)

    const getImage = () => {
        if (data.photo) {
            return data.photo;
        } else if (data.logo) {
            return data.logo
        } else {
            return Helper.defaultAvatar(data.name)
        }
    }

    const selected = () => {
        if (data == dataSelected) {
            return "selected"
        }
    }

    const onClick = () => {
        setDataSelected(data);
        if (active == "agent") {
            getAgentDetail(data.uuid)
        } else {
            getWorkunitDetail(data.id);
        }

    }

    return (
        <Card onClick={onClick} className={selected()}>
            <CardBody className="text-center cursor-pointer">
                <h5>Peringkat {Helper.rankingText(index+1)}</h5>

                <AvatarPerformance img={getImage()} imgHeight={60} imgWidth={60} className="mt-1" />
                <h5 className="mt-1 mb-0">
                    {data.name}
                </h5>
                <p style={{ fontSize: "11px" }}>
                    {data.workunit}
                </p>
                <p className="mt-1 text-left" style={{ fontSize: "10px" }}>
                    Aktivitas Berita (7 Hari Terakhir)
                </p>
                <Row>
                    <ChartArea dataChart={data.last_activity} height={80} />
                </Row>
                <Row>
                    {data.achievement ? data.achievement.map((achievement, index) => (
                        <Col md={4} key={index}>
                            <img className='img-fluid rounded' src={achievement.badge} alt='latest-photo' />
                        </Col>
                    )) : <div style={{ height:"50px"}}></div> }
                </Row>
                <Row className="text-center">
                    <Col >

                        <small className="mb-0 mt-1">
                            {data.performance.total_report}
                        </small><br />
                        <small className="mt-0"> Berita</small>
                    </Col>
                    <Col>

                        <small className="mb-0 ">
                            {data.performance.total_viewer}
                        </small> <br />
                        <small className="mt-0"> Viewer</small>
                    </Col>
                    <Col>

                        <small className="mb-0 mt-1">
                            {data.performance.total_trophy}
                        </small><br />
                        <small className="mt-0"> Trofi</small>
                    </Col>


                </Row>
            </CardBody>
        </Card>
    )
}

export default CardTopUser