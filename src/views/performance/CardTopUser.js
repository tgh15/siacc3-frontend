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
import Avatar from "../../components/widgets/avatar"


const CardTopUser = (props) => {

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
    }                                            = useContext(PerformanceContext)

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
        <Card className={selected()}>
            <CardBody className="text-center cursor-pointer">
                <div onClick={onClick} >
                        
                    <h5>Peringkat {Helper.rankingText(index+1)}</h5>

                    {
                        active == 'agent' ?
                            <AvatarPerformance
                                img         = {getImage()} 
                                imgWidth       = {60} 
                                imgHeight      = {60} 
                                className   = "mt-1" 
                            />
                        :
                            <img 
                                src         = {getImage()} 
                                width       = {60} 
                                height      = {60} 
                                className   = "mt-1" 
                            />
                    }


                    <h5 className="mt-1 mb-0">
                        {data.name}
                    </h5>
                    <p style={{ fontSize: "11px" }}>
                        {data.workunit_level} {data.workunit}
                    </p>
                    <p className="mt-1 text-left" style={{ fontSize: "10px" }}>
                        Aktivitas Berita (7 Hari Terakhir)
                    </p>
                    <Row>
                        <ChartArea dataChart={data.last_activity} height={80} />
                    </Row>
                </div>

                <Row>
                    {
                        data.achievement ? 
                            data.achievement.map((achievement, index) => (
                                <Col 
                                    md      = {4} 
                                    key     = {index}
                                    onClick = {() => {
                                        index === 1 ?
                                            setIsAchievementVisible(true)
                                        :
                                            setIsDetailViewerVisible(true)
                                    }}
                                >
                                    <img 
                                        src         = {achievement.oldBadge} 
                                        alt         = 'latest-photo' 
                                        width       = {50}
                                        height      = {50}    
                                        onError     = {Helper.fallbackImage_} 
                                        className   = 'img-fluid my-1' 
                                    />
                                </Col>
                            )) 
                        : 
                            <div style={{ height:"50px"}}></div> 
                    }
                </Row>
                <Row className="text-center">
                    <Col onClick={() => {setIsAchievementVisible(true)}}>
                        <small className="mb-0 mt-1">
                            {data.performance.total_report}
                        </small><br />
                        <small className="mt-0"> Berita</small>
                    </Col>
                    <Col onClick ={() => {setIsDetailViewerVisible(true)
}}>
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