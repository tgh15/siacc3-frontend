import { Fragment } from "react"
import { ExternalLink, Eye, Trash2 } from "react-feather";
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledButtonDropdown, UncontrolledDropdown } from "reactstrap"
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import CustomTable from "../../components/widgets/custom-table"
import FormAnalysis from "./FormAnalysis";


const Analysis = () => {
    const headerTable = [
        {
            title: "No",
            size: 1
        },
        {
            title: "Judul Analisis",
            size: 8
        },
        {
            title: "Aksi",
            size: 3
        },
    ];
    return (
        <Fragment>
            <CustomTable form={<FormAnalysis />} header={headerTable} page="1" totalData="50">
                <Card>
                    <CardBody>
                        <Row>
                            <Col md="1">
                                1
                            </Col>
                            <Col md="8">
                                Analisis Asosiasi Berita Politik Dengan Agama
                            </Col>
                            <Col md="3" >

                                <UncontrolledDropdown >
                                    <DropdownToggle tag='a' className="cursor-pointer">
                                        <ExternalLink className="mr-2" />
                                    </DropdownToggle>
                                    <Eye  className="mr-2" size={20} />
                                    <Trash2 size={20} />
                                    <DropdownMenu>
                                        <DropdownItem href='/' tag='a'>
                                            Jadikan Berkas JPG
                                        </DropdownItem>
                                        <DropdownItem href='/' tag='a'>
                                            Jadikan Berkas PNG
                                        </DropdownItem>
                                        <DropdownItem href='/' tag='a'>
                                            Jadikan Berkas PDF
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>




                            </Col>
                        </Row>
                    </CardBody>
                </Card>

            </CustomTable>
        </Fragment>
    )
}

export default Analysis