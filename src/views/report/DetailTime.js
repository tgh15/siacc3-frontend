import { Fragment, useState } from 'react'
import { Eye } from 'react-feather'
import { Button, Col }      from 'reactstrap'
import CustomTable          from '../../components/widgets/custom-table'
import CustomTableBody      from '../../components/widgets/custom-table/CustomTableBody'
import DetailData           from './DetailData'
import { ModalBase }        from "../../components/widgets/modals-base"
import jsPDF                from 'jspdf'
import 'jspdf-autotable'
import dataDetails          from './data-details'

const headerTable = [
    {
        title: "No.",
        size: 1
    },
    {
        title: "Tanggal Laporan",
        size: 8,
        center: true
    },
    {
        title: "Aksi",
        size: 2
    }
]

const DetailTime = (props) => {

    const {
        detailReport,
        setSelectedReport,
        handleDetailResults,

    }                               = props;

    const showDetailResults = (data) => {
        setSelectedReport(data);
        const formData = {
            id : data.id
        };

        handleDetailResults(formData);
    };

    return (
        <Fragment>
            <CustomTable header={headerTable}>
                {
                    detailReport.results != null && detailReport.results.length > 0 &&
                    detailReport.results.map((data,index) => (
                        <CustomTableBody outline={true}>
                            <Col md="1">
                                {index+1}
                            </Col>
                            <Col md="8" className="text-center">
                                {data.title}
                            </Col>
                            <Col md="2">
                                <Eye size={20} className="cursor-pointer" onClick={() => { showDetailResults(data) }} />
                            </Col>
                        </CustomTableBody>
                    ))
                }
            </CustomTable>
        </Fragment>
    )
}
export default DetailTime