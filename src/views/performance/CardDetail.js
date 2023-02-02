import { Card, CardBody, Col, Row, Button, Input }  from "reactstrap"
import AvatarPerformance                            from "../../components/widgets/avatar-performance"
import "./Performance.scss"
import { Fragment, useContext, useState }           from "react"
import { ModalBase }                                from "../../components/widgets/modals-base"
import DetailPoint                                  from "./DetailPoint"
import ChartArea                                    from "./ChartArea"
import ImageRounded                                 from "../../components/widgets/image-rounded"
import Helper                                       from "../../helpers"
import { PerformanceContext }                       from "../../context/PerformanceContext"
import DescriptionDetailAgent                       from "./DescriptionDetailAgent"
import DescriptionDetailWorkunit                    from "./DescriptionDetailWorkunit"
import FormDeduction                                from "./FormDeduction"
import avatarImg from '@src/assets/images/portrait/small/150x150.png'


const CardDetails = (props) => {

    const { 
        active, 
        dataDetail,
        dataSelected, 
        setIsAchievementVisible,
        setIsDetailViewerVisible,
        setIsDetailTrophyVisible,
    }                                          = useContext(PerformanceContext)

    const {getRoleByMenuStatus}                = Helper;

    const getImage = () => {
        if (dataSelected.photo) {
            return dataSelected.photo;
        } else if (dataSelected.logo) {
            return dataSelected.logo
        } else {
            return Helper.defaultAvatar(dataSelected.name)
        }
    }

    const [modalLessPoint, setModalLessPoint] = useState(false)
    const [modalHistoryPoint, setModalHistoryPoint] = useState(false)

    return (
        <Fragment>
            {/* modal points deduction */}
            <ModalBase 
                show    = {modalLessPoint} 
                size    = "sm" 
                title   = "Tentukan Nilai Pengurangan" 
                setShow = {(par) => {setModalLessPoint(par)}}
            >
                <FormDeduction setModalLessPoint={(par) => { setModalLessPoint(par) }} />
            </ModalBase>

            <ModalBase 
                show        = {modalHistoryPoint} 
                title       = "Detail Point" 
                size        = "lg"
                center      = {true}
                setShow     = {(par) => {setModalHistoryPoint(par)}} 
                footer      = {
                    <Button.Ripple color="primary" block onClick={() => { setModalHistoryPoint(false) }}>
                        OK
                    </Button.Ripple>
                }>

                <DetailPoint />

            </ModalBase>

            <Card className="card-detail">
                <CardBody className="px-1">
                    <div className="text-center">
                        <h5>Peringkat {Helper.rankingText(active == "agent" ? dataSelected.ranking : typeof dataSelected.ranking === 'string' ? parseInt(dataSelected.ranking.substring(0, 2)) : dataSelected.ranking)}</h5>

                        {
                            active === 'agent' ?
                                <AvatarPerformance 
                                    img         = {getImage()} 
                                    imgWidth    = {80} 
                                    imgHeight   = {80} 
                                    className   = "mt-1" 
                                />
                            :
                                <img src={getImage()} height={80} width={80} className="mt-1" />
                        }

                        <h5 className="mt-1 mb-0">
                            {dataSelected.name}
                        </h5>
                        <p>
                        {dataSelected.workunit_level} {dataSelected.workunit}
                        </p>
                    </div>

                    {
                        active == "agent" ? 
                            <DescriptionDetailAgent /> 
                        : 
                            <DescriptionDetailWorkunit/>
                    }

                    <p className="mt-2">
                        Aktivitas Berita (7 Hari Terakhir)
                    </p>
                    <Row>
                        <ChartArea dataChart={dataSelected.last_activity} height={70} />
                    </Row>
                    <Row>
                        {
                            dataSelected.achievement ? 
                                dataSelected.achievement.map((achievement, index) => (
                                    <Col 
                                        md          = {4} 
                                        onClick     = {() => {(index === 0 && active === 'agent') && setIsAchievementVisible(true)}}
                                        className   = "text-center my-1 cursor-pointer"
                                    >
                                        <ImageRounded src={achievement.badge} width={50} />
                                    </Col>
                                )) 
                            : 
                                <>
                                    <Col 
                                        md          = {4} 
                                        onClick     = {()=>{setIsAchievementVisible(true)}}
                                        className   = "text-center"
                                    >
                                        <img
                                            src     = {avatarImg}
                                            width   = {50}
                                            height  = {50}    
                                            className = "rounded text-center my-1 cursor-pointer"
                                        />
                                    </Col> 
                                    <Col 
                                        md          = {4} 
                                        onClick     = {()=>{setIsDetailViewerVisible(true)}}
                                        className   = "text-center"
                                    >
                                        <img
                                            src     = {avatarImg}
                                            width   = {50}
                                            height  = {50}   
                                            className = "rounded text-center my-1 cursor-pointer"
                                        />
                                    </Col> 
                                    <Col 
                                        md          = {4} 
                                        onClick     = {()=>{setIsDetailTrophyVisible(true)}}
                                        className   = "text-center"
                                    >
                                        <img
                                            src     = {avatarImg}
                                            width   = {50}
                                            height  = {50}   
                                            className = "rounded text-center my-1 cursor-pointer"
                                        />
                                    </Col> 
                                </>
                        }
                    </Row>

                    <Row className="text-center" >
                        <Col
                            onClick     = {() => {active === 'agent' && setIsAchievementVisible(true)}}
                            className   = "cursor-pointer" 
                        >
                            <p className="mb-0">
                                {dataSelected.performance.total_report}
                            </p>
                            <span className="mt-0"> Berita</span>
                        </Col>
                        <Col>
                            <p className="mb-0 ">
                                {dataSelected.performance.total_viewer}
                            </p>
                            <span className="mt-0"> Viewer</span>
                        </Col>
                        <Col>
                            <p className="mb-0 ">
                                {dataSelected.performance.total_trophy}
                            </p>
                            <span className="mt-0"> Trofi</span>
                        </Col>
                    </Row>

                    {
                        dataSelected &&
                        <div className="my-2">
                            {active == "agent" ? null : <a href={`configuration/work-unit-list/${dataSelected.id}?level=${dataSelected.workunit_level_id}`}>Lihat Daftar Berita</a>}
                        </div>
                    }

                    {dataDetail && <Row className="mt-2 d-flex justify-content-around">
                        <Col>
                            {
                                getRoleByMenuStatus('Performance', 'point_reduction') && (localStorage.getItem('role') === 'Admin' || localStorage.getItem('role') === 'Verifikator Pusat') ? 
                                    <Button.Ripple 
                                        id      = {`performance_detail_deduction_button`}
                                        block 
                                        color   = "primary" 
                                        onClick = {() => { setModalLessPoint(true) }} 
                                    >
                                        Kurangi Nilai
                                    </Button.Ripple>
                                :
                                    null
                            }
                        </Col>
                        <Col>
                            {
                                getRoleByMenuStatus('Performance', 'point_history') ?
                                    <Button.Ripple
                                        id      = {`performance_detail_history_button`} 
                                        block 
                                        color   = "primary" 
                                        outline 
                                        onClick = {() => { setModalHistoryPoint(true) }}
                                    >
                                        Riwayat Nilai
                                    </Button.Ripple>
                                :
                                    null
                            }
                        </Col>
                    </Row>
                    }
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default CardDetails