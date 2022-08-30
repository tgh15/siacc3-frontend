import { useState } from "react"
import { Fragment, useContext } from "react"
import { Row, Col, Table, CardBody, Button } from "reactstrap"
import Card from "reactstrap/lib/Card"
import ModalFooter from "reactstrap/lib/ModalFooter"
import ImageRounded from "../../../components/widgets/image-rounded"
import { ModalBase } from "../../../components/widgets/modals-base"
import { UserManagementContext } from "../../../context/UserManagementContext"
import Helper from "../../../helpers"
import RejectDevice from "./RejectDevice"
import ResetDevice from "./ResetDevice"
import "./UserManagement.scss"

const ModalChangeDevice = props => {
    //State
    const {show, setShow, SetModalDeviced }                 = props;
    const [rejectDevice,setRejectDevice]    = useState(false);
    const [confirmReset, setConfirmReset]   = useState(false);

    //Context
    const { dataSelected, deviceSelected }  = useContext(UserManagementContext);

    //Helper
    const { fallbackImage_ }                = Helper;

    return (
        <Fragment>
            {/* reset device modal */}
            <ResetDevice 
                show    = {confirmReset}
                setShow = {(par) => { setConfirmReset(par) }}
                SetModalDeviced = {(par) => {setShow(par)}}
            />

            {/* Reject device modal */}
            <RejectDevice 
                show            = {rejectDevice} 
                setShow         = {(par) => {setRejectDevice(par)}} 
                setChangeDevice = { (par) => {setShow(par)}}
            />

            {/* Modal Change Device */}
            <ModalBase 
                size    = "lg"
                show    = {show} 
                title   = "Permintaan Pergantian Device" 
                setShow = {(par) => setShow(par)} 
            >
                <Row className="p-1">
                    <Col md={7}>
                        <Row className="d-flex">
                            <ImageRounded 
                                src     = {dataSelected.photo != "" ? dataSelected.photo : `https://ui-avatars.com/api/?name=${dataSelected ? dataSelected.name : "UN"}&background=4e73df&color=fff&bold=true`}
                                width   = {100} 
                                height  = {100}
                                onError = {fallbackImage_} 
                            />
                            <Table className="table-detail">
                                <tr>
                                    <td>ID</td>
                                    <td>{dataSelected.identity_id}</td>
                                </tr>
                                <tr>
                                    <td>Nama Lengkap</td>
                                    <td>{dataSelected.name}</td>
                                </tr>
                                <tr>
                                    <td>Jabatan</td>
                                    <td>{dataSelected.position}</td>
                                </tr>
                                <tr>
                                    <td>Satker</td>
                                    <td>{dataSelected.workunit}</td>
                                </tr>
                                <tr>
                                    <td>Struktur/Bidang</td>
                                    <td>{dataSelected.sector}</td>
                                </tr>
                                <tr>
                                    <td>No. KTP</td>
                                    <td>{dataSelected.ktp}</td>
                                </tr>
                                <tr>
                                    <td>No. Telepon</td>
                                    <td>{dataSelected.phone_number}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{dataSelected.email}</td>
                                </tr>
                                <tr>
                                    <td>Alamat</td>
                                    <td>{dataSelected.address}</td>
                                </tr>
                            </Table>
                        </Row>
                    </Col>
                    <Col md={5}>
                        <Card>
                            <CardBody 
                                className   = "text-center" 
                            >
                                <h5> Saat ini terdaftar dengan Device </h5>
                                <p className="mt-5">{deviceSelected.request && deviceSelected.request.device}</p>
                                <p className="mt-1"> Device ID : <span>{deviceSelected.request && deviceSelected.request.mac}</span></p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody className="text-center">
                                <h5>Alasan Perubahan Device</h5>
                                <p className="mt-2">
                                    {deviceSelected.request && deviceSelected.request.reason}
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <ModalFooter className="d-flex justify-content-between px-0">
                    <Button.Ripple 
                        color       = "primary" 
                        onClick     = {() => { setRejectDevice(true)}}
                        className   = "px-5" 
                    >
                        Tolak
                    </Button.Ripple>
                    <Button 
                        color   = 'primary' 
                        outline 
                        onClick = {() => {setConfirmReset(true) }}
                    >
                        Reset Device
                    </Button>
                </ModalFooter>
            </ModalBase>
        </Fragment>
    );
};

export default ModalChangeDevice;