import { useContext, useState } from "react"
import { Card, CardBody, Col, Row } from "reactstrap"
import AvatarPerformance from "../../components/widgets/avatar-performance"
import avatarImg from '@src/assets/images/portrait/small/150x150.png'
import ChartArea from "./ChartArea"
import "./Performance.scss"
import Helper from "../../helpers"
import { PerformanceContext } from "../../context/PerformanceContext"


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
        setIsDetailTrophyVisible,
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
        <Card
            id          = {`top_user_card_${index}`}
            onClick     = {() => onClick()}
            className   = {`${selected()} w-100`} 
        >
            <CardBody className="text-center cursor-pointer">
                <div>
                    <h5>Peringkat {Helper.rankingText(index+1)}</h5>

                    {
                        active == 'agent' ?
                            <AvatarPerformance
                                img         = {getImage()} 
                                imgWidth    = {60} 
                                imgHeight   = {60} 
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

                <Row className="my-1">
                    {
                        data.achievement ? 
                            data.achievement.map((achievement, index) => (
                                <Col 
                                    md      = {4} 
                                    key     = {index}
                                    index   = {`top_user_card_badge_${index}`}
                                    onClick = {() => {
                                        index === 0 ?
                                            setIsAchievementVisible(true)
                                        :
                                            index === 1 ?
                                                setIsDetailViewerVisible(true)
                                            :
                                                setIsDetailTrophyVisible(true)
                                    }}
                                >
                                    <img 
                                        src         = {achievement.badge} 
                                        alt         = 'latest-photo' 
                                        width       = {50}
                                        height      = {50}    
                                        onError     = {Helper.fallbackImage_} 
                                        className   = 'img-fluid my-1' 
                                    />
                                </Col>
                            )) 
                        : 
                            <>
                                <Col 
                                    id      = {`top_user_card_badge_news`}
                                    md      = {4} 
                                    onClick = {()=>{setIsAchievementVisible(true)}}
                                >
                                    <img
                                        src     = {avatarImg}
                                        width   = {50}
                                        height  = {50}    
                                        className = "rounded"
                                    >
                                    </img>
                                </Col> 
                                <Col 
                                    id      = {`top_user_card_badge_viewer`}
                                    md      = {4} 
                                    onClick = {()=>{setIsDetailViewerVisible(true)}}
                                >
                                    <img
                                        src     = {avatarImg}
                                        width   = {50}
                                        height  = {50}   
                                        className = "rounded"
                                    >
                                    </img>
                                </Col> 
                                <Col 
                                    id      = {`top_user_card_badge_trophy`}
                                    md      = {4} 
                                    onClick = {()=>{setIsDetailTrophyVisible(true)}}
                                >
                                    <img
                                        src     = {avatarImg}
                                        width   = {50}
                                        height  = {50}   
                                        className = "rounded"

                                    >
                                    </img>
                                </Col> 
                            </>

                    }
                </Row>
                <Row className="text-center">
                    <Col onClick={() => {setIsAchievementVisible(true)}}>
                        <small className="mb-0 mt-1">
                            {data.performance.total_report}
                        </small><br />
                        <small className="mt-0"> Berita</small>
                    </Col>
                    <Col onClick ={() => {setIsDetailViewerVisible(true)}}>
                        <small className="mb-0 ">
                            {data.performance.total_viewer}
                        </small> <br />
                        <small className="mt-0"> Viewer</small>
                    </Col>
                    <Col onClick ={() => {setIsDetailTrophyVisible(true)}}>
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