import { CheckCircle, MoreHorizontal, RefreshCcw, Trash2, ZoomIn } from "react-feather"
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from "reactstrap"
import Helper from "../../../helpers"
import virusIcon from "../../../assets/icons/virus.svg"
import { DropdownFilemanagerTable } from "./DropdownTable"
import { useContext } from "react"
import { FileManagerContext } from "../../../context/FileManagerContext"
import DriveSecurity from "../../../services/pages/drive/security"

const TableVirus = props => {

    const {
        data,
        getInObject
    } = props

    const { menuActive, apiActive, getData, handlerFullScren, fullScreen, setDataSelected, setDataDetail, tags } = useContext(FileManagerContext)

    const deleteVirus = (id) => {
        DriveSecurity.deleteVirus(id)
            .then(res => {
                getData(apiActive)
            }, err => {
                console.log(err)
            })
    }

    const actionVirus = (id, action) => {
        DriveSecurity.updateAction(id, action)
            .then(res => {
                getData(apiActive)
            }, err => {
                console.log(err)
            })
    }

    return (
        <Card className="mb-1">
            <CardBody>
                <Row >
                    <Col md="4">
                        <Row>
                            <Col md={1}>
                                
                            </Col>
                            <Col md={11} className="d-flex">
                                <img src={virusIcon}/>
                                {
                                    getInObject(data, "mime") && getInObject(data, "mime").kind == "Image" ?
                                        <span className="ml-1" onClick={() => { setImageSelected(getInObject(data, "url", "")) }}> {getInObject(data, "name", "")} </span>
                                    : 
                                        <span className="ml-1"> {getInObject(data, "name", "")} </span>
                                }
                            </Col>
                        </Row>
                    </Col>
                    <Col md="5">
                        <Row>
                            <Col md={1}>
                            </Col>
                            <Col md={1}>
                            </Col>
                            <Col md={5}>
                            </Col>
                            <Col md={2}>
                                <UncontrolledDropdown direction='right'>
                                    <DropdownToggle tag='div' color='' >
                                        <MoreHorizontal size={20} className=' cursor-pointer' style={{ marginLeft: "5px" }} />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem tag='a'
                                            onClick={() => {
                                                actionVirus(data.id, "quarantine")
                                            }}>
                                            <RefreshCcw size={14} />&nbsp;Karantina
                                        </DropdownItem>
                                        <DropdownItem tag='a'
                                            onClick={() => {
                                                deleteVirus(data.id)
                                            }}>
                                            <Trash2 size={14} />&nbsp;Hapus File
                                        </DropdownItem>
                                        <DropdownItem tag='a'
                                        onClick={() => {
                                            actionVirus(data.id, "allowed")
                                        }}>
                                            <CheckCircle size={14} />&nbsp;Izinkan
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Col>
                            <Col md={3}>
                                {data.mime ? Helper.fileSize(data.mime.size) : ""}
                            </Col>
                        </Row>
                    </Col>
                    <Col md="3">
                        {Helper.dateIndo(data.last_open)}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default TableVirus