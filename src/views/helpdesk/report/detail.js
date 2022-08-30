import React, { Fragment, useEffect, useState }                  from 'react';
import { Card, CardBody, Col, Row }              from 'reactstrap';
import { useParams }                        from "react-router-dom";
import { jsPDF }                                        from "jspdf";
import 'jspdf-autotable';




//Image
import LogoSiacc                            from '@src/assets/images/logo/logo_light.png';
import imagePhone                           from '@src/assets/images/logo/phone.png';
import imageLaptop                          from '@src/assets/images/logo/laptop.png';
import { ArrowLeftCircle, DownloadCloud, Printer, Upload }   from 'react-feather';

//Components
import CustomTable                          from '../../../components/widgets/custom-table';
import CustomTableBody                      from '../../../components/widgets/custom-table/CustomTableBody';
import detail_header                        from './detail_header';

import { ReportAPI }                        from '../../../services/pages/helpdesk/report';
import CustomToast                          from '../../../components/widgets/custom-toast';
import Helper                               from '../../../helpers';

const DetailReport = () => {

    //Param
    let { id }                                      = useParams();

    const [detail, setDetail]                       = useState(null);
    const [header, setHeader]                       = useState(["No", "No Tiket", "Nama", "Judul Laporan", "Jenis Laporan", "Status Laporan", "Tanggal/Waktu", "Info Perangkat"]);
    const [body, setBody]                           = useState([]);

    const getDetail = () => {

        let _body       = [];
        let _bodyData   = [];
        
        ReportAPI.getDetailReport(id).then(
            res => {
                if (res.status === 200) {
                    if(res.data.tickets != null){
                        res.data.tickets.map((data, index) => (
                            <>
                                {_bodyData = []}
                                {_bodyData.push((index+1).toString())}
                                {_bodyData.push(data.code)}
                                {_bodyData.push(data.user.name)}
                                {_bodyData.push(data.subject)}
                                {_bodyData.push(data.report_kind.name)}
                                {_bodyData.push(data.status === "all" ? "Semua" : data.status === "process" ? "Proses" : "Selesai" )}
                                {_bodyData.push(Helper.dateIndo1(data.created_at))}
                                {_bodyData.push(data.device)}
                                {_body.push(_bodyData)}

                            </>
                        ))
                        setBody(_body)
                    }
                    setDetail(res.data);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    const addWatermark = (doc) => {

        var totalPages = doc.internal.getNumberOfPages();

        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.addImage(LogoSiacc, 'PNG', 245, 190, 35, 10);
        }
        return doc;

    };

    const createPDF = () => {
        let doc = new jsPDF({
            orientation: "landscape",
        });

        doc.text(detail.title, 145, 15, null, null, "center");
        doc.setFontSize(12);
        doc.text('Tanggal: '+Helper.dateIndo1(detail.created_at), 145, 22, null, null, "center");

        doc.autoTable({
            startY          : 30,
            head            : [header],
            body            : [body][0],
            styles          : { cellWidth: 'auto', minCellWidth: 30 },
            columnStyles    : { 0: { cellWidth: 10 } },
            headStyles      : {
                fillColor: [23, 97, 56],
            },
            margin:         { top: 10, bottom: 25 }
        });

        doc = addWatermark(doc);

        doc.save(`${detail.title}.pdf`);

        return doc;
    };

    const printPDF = () => {
        let doc = new jsPDF({
            orientation: "landscape",
        });

        doc.text(detail.title, 145, 15, null, null, "center");
        doc.setFontSize(12);
        doc.text('Tanggal: '+Helper.dateIndo1(detail.created_at), 145, 22, null, null, "center");

        doc.autoTable({
            startY          : 30,
            head            : [header],
            body            : [body][0],
            styles          : { cellWidth: 'auto', minCellWidth: 30 },
            columnStyles    : { 0: { cellWidth: 10 } },
            headStyles      : {
                fillColor: [23, 97, 56],
            },
            margin:         { top: 10, bottom: 25 }
        });

        doc = addWatermark(doc);
        let print = window.open(doc.output('bloburl'), '_blank');
        print.print();
        return doc;
    };

    useEffect(() => {
        getDetail();
    }, []);

    return (
        <Fragment>
            <a href="/helpdesk/report">
                <ArrowLeftCircle size={35}/>
            </a>
            <Card className="m-0 mt-1">
                <CardBody>
                    <div className="d-flex justify-content-between">
                        <img 
                            src   = {LogoSiacc} 
                            style = {{ width: '120px', height: '40px' }}
                        />
                        <h4 style={{ fontWeight: 'bold' }}>
                            {detail != null ? detail.title : null}
                        </h4>
                        <div>
                            {/* <Upload 
                                size        = {20} 
                                className   = "mr-1"
                            /> */}
                            {
                                detail != null ?
                                    <>
                                        <Printer 
                                            size        = {20} 
                                            className   = "mr-1 cursor-pointer"
                                            onClick     = {() => {printPDF()}}
                                        />
                                        <DownloadCloud 
                                            size        = {20}
                                            className   = "mr-1 cursor-pointer"
                                            onClick     = {() => {createPDF()}}
                                        />
                                    </>

                                :
                                    null
                            }
                        </div>
                    </div>
                    <div className="mt-3 mb-1">
                        <Row>
                            <Col md={7}>
                                <Row>
                                    <Col md={2}>
                                        Tanggal
                                    </Col>
                                    <Col md={10}>
                                        : <span className="ml-2">{detail != null ? `${Helper.dateIndo1(detail.from)} - ${Helper.dateIndo1(detail.to)}` : null} </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={5}>
                                <Row>
                                    <Col md={3}>
                                        Jenis Laporan
                                    </Col>
                                    <Col md={9}>
                                        : <span className="ml-2">{detail != null ? detail.report_kind.name  : "-" }</span>
                                    </Col>
                                </Row>
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col md={7}>
                                <Row>
                                    <Col md={2}>
                                        Total
                                    </Col>
                                    <Col md={9}>
                                        : <span className="ml-2">{detail != null && detail.tickets != null ? detail.tickets.length : 0}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={5}>
                                <Row>
                                    <Col md={3}>
                                        Status
                                    </Col>
                                    <Col md={9}>
                                        : <span className="ml-2">{detail != null && detail.tickets != null ? detail.status === "all" ? "Semua" : detail.status === "process" ? "Proses" : "Selesai" : "-" }</span>
                                    </Col>
                                    
                                </Row>
                            </Col>
                        </Row>
                    </div>

                    <Card style={{ border: '1px solid #ecedf4', backgroundColor: '#f7f7fc', margin: '0px' }}>
                        <CardBody>
                            <CustomTable 
                                header = {detail_header}
                            >
                                {
                                    detail != null && detail.tickets != null ? 
                                        detail.tickets.map((data, index) => (
                                            <CustomTableBody key={"helpdesk_report_index"}>
                                                <Col md="1">
                                                    {index+1}
                                                </Col>
                                                <Col md="1">
                                                    {data.code}
                                                </Col>
                                                <Col md="2">
                                                    {data.user.name}
                                                </Col>
                                                <Col md="2">
                                                    {data.subject}
                                                </Col>
                                                <Col md="1">
                                                    {data.report_kind.name}
                                                </Col>
                                                <Col md="1">
                                                    { data.status === "all" ? "Semua" : data.status === "process" ? "Proses" : "Selesai" }
                                                </Col>
                                                <Col md="2">
                                                    { Helper.dateIndo(data.created_at)}
                                                </Col>
                                                <Col md="2">
                                                    {
                                                        data.is_mobile === true ?
                                                            <img 
                                                                src   = {imagePhone} 
                                                                style = {{ width: '60px', height: '50px' }}
                                                            />
                                                        :
                                                            <img 
                                                                src   = {imageLaptop} 
                                                                style = {{ width: '60px', height: '50px' }}
                                                            />

                                                    }
                                                    <p className="m-0">{data.device}</p>
                                                </Col>
                                            </CustomTableBody>
                                        ))
                                    :
                                        null
                                }
                            </CustomTable>
                        </CardBody>
                    </Card>
                </CardBody>
            </Card>
        </Fragment>
    );
};

export default DetailReport;