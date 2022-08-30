import { XCircle } from "react-feather"
import { Button, Card, CardBody, Col, Media, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap"
import Avatar from "../../../../components/widgets/avatar"
import CustomTableBody from "../../../../components/widgets/custom-table/CustomTableBody"
import Helper from "../../../../helpers"




const ModalLog = ({ show, onClose, data }) => {

    const { fallbackImage_, dateIndo } = Helper

    return (
        <Modal
            isOpen={show}
            toggle={onClose}
            size="lg"
            className="modal-dialog-scrollable"
        >

            <ModalHeader toggle={() => onClose()}>
                Aktivitas Akun
            </ModalHeader>

            <ModalBody>
                <div>
                    <Media>
                        <Media left>
                            <Avatar
                                onError={fallbackImage_}
                                img={data?.user?.photo}
                                className="mr-1"
                            />
                        </Media>
                        <Media>
                            <dl>
                                <dd>{data?.user?.name} - {data?.user?.workunit}</dd>
                            </dl>
                        </Media>
                    </Media>
                </div>

                <Card
                    style={{ backgroundColor: "transparent", boxShadow: "none" }}
                    className="bg-transparant mb-0">
                    <CardBody className="font-weight-bolder">
                        <Row>
                            <Col md={4}>
                                Tanggal
                            </Col>
                            <Col md={4}>
                                Pengguna
                            </Col>
                            <Col md={4}>
                                Aktivitas
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {data.activities != null && data?.activities.map((data, index) => (
                    <CustomTableBody>
                        <Col md={4}>
                            {dateIndo(data.time)}
                        </Col>
                        <Col md={4}>
                            <Media>
                                <Media left href='#'>
                                    <Avatar
                                        onError={fallbackImage_}
                                        img={data.avatar}
                                        imgHeight='40'
                                        imgWidth='40'
                                        status='online'
                                    />
                                </Media>
                                <Media body>
                                    <Media className="mb-0 ml-1">{data.name}</Media>
                                    <h6 className="text-muted ml-1 mt-0">{data.origin} </h6>
                                </Media>
                            </Media>
                        </Col>
                        <Col md={4}>
                            {data.activity}
                        </Col>
                    </CustomTableBody>
                ))}


            </ModalBody>
            <ModalFooter>
                    <Button color="primary" onClick={onClose}>
                        Tutup
                    </Button>
            </ModalFooter>

        </Modal>
    )
}

export default ModalLog