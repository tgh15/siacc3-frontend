import { useState, useContext, Fragment }   from "react"
import { Filter, Image,  }                  from "react-feather"
import { Button, Col, Row }                 from "reactstrap"
import SearchTable                          from "../../components/widgets/custom-table/SearchTable"
import { ModalBase }                        from "../../components/widgets/modals-base"
import { PublicReportContext }              from "../../context/PublicReportContext"
import Banner                               from "./Banner"
import CardReportCommunity                  from "./CardReportCommunity"
import FilterReportCommunity                from "./FilterReportCommunity"
import Helper                               from "../../helpers"
import CustomTableNotAuthorized from "../../components/widgets/custom-table/CustomTableNotAuthorized"

const ContainerPublicReport = () => {
    const [modalFilter, setModalFilter] = useState(false)
    const [modalBanner, setModalBanner] = useState(false)
    
    const {getData,setKeyword} = useContext(PublicReportContext)

    const {getRoleByMenuStatus}         = Helper;

    return (
        <Fragment>
        
            {/* modal filter */}
            <ModalBase show={modalFilter}
                title="Filter"
                size="sm"
                setShow={(par) => { setModalFilter(par) }
                }>
                <FilterReportCommunity onClose={(par) => { setModalFilter(par) }
                } />
            </ModalBase >

            {/* modal banner */}
            < ModalBase show={modalBanner}
                title="Daftar Banner"
                size="lg"
                setShow={(par) => { setModalBanner(par) }}>
                <Banner />
            </ModalBase >

            <Row>
                <Col md="1">
                    {
                        getRoleByMenuStatus('Laporan Masyarakat', 'public_report_list') ?
                            <Button.Ripple color="primary" size="sm" onClick={() => { setModalFilter(true) }}>
                                <Filter size={14} />
                            </Button.Ripple>
                        :
                            null
                    }
                </Col>
                <Col md="2" className="offset-md-6" >
                    {
                        getRoleByMenuStatus('Laporan Masyarakat', 'banner') ?
                            <Button.Ripple color="primary" size="sm" onClick={() => { setModalBanner(true) }} outline>
                                <Image size={14} className="" /> Banner
                            </Button.Ripple>
                        :
                            null
                    }
                </Col>
                <Col md="3">
                    {
                        getRoleByMenuStatus('Laporan Masyarakat', 'public_report_list') ?
                            <SearchTable onSearch={(e) => {setKeyword(e); getData();}} />
                        :
                            null
                    }
                </Col>
            </Row>

            {
                getRoleByMenuStatus('Laporan Masyarakat', 'public_report_list') ?
                    <CardReportCommunity />
                :
                    <CustomTableNotAuthorized/>
            }
            
        </Fragment>
    )
}

export default ContainerPublicReport