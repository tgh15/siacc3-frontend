import { Fragment, useEffect, useState } from "react";
import { Button, Col, Row }                   from "reactstrap";
import { Eye, Trash2 }                   from "react-feather";
import { useLocation }                   from "react-router-dom";

//API
import DriveApi                          from "../../services/pages/drive";

//Helper
import Helper                            from "../../helpers";

//Component
import Skeleton                          from "react-loading-skeleton";
import TourInput                         from "./InputTour";
import AddReport                         from "./modal/addReport";
import DetailTime                        from "./DetailTime";
import FormDelete                        from "../../components/widgets/form-delete/FormDelete";
import DetailData                        from "./DetailData";
import headerTable                       from "./headerTable";
import CustomTable                       from "../../components/widgets/custom-table";
import { ModalBase }                     from "../../components/widgets/modals-base";
import CustomTableBody                   from "../../components/widgets/custom-table/CustomTableBody";
import DetailDataFormatted               from "./DetailDataFormatted";
import CustomTableBodyEmpty              from "../../components/widgets/custom-table/CustomTableBodyEmpty";
import CustomTableNotAuthorized          from "../../components/widgets/custom-table/CustomTableNotAuthorized";

//Export PDF
import jsPDF                             from 'jspdf';
import 'jspdf-autotable';

import logoLight                         from "../../assets/images/logo/logo_light.png";
import moment                            from "moment";

//Export Excel
import FileSaver                         from "file-saver";
import ExcelJS                          from "exceljs";


// const useQuery = () => {
//     return new URLSearchParams(useLocation().search);
// };


const Report = (props) => {
    // let query = useQuery();

    // useEffect(() => {
    //     if (query.get("title")) {
    //         onSearch(query.get("title"))
    //     }
    // }, []);

    //Props
    const {
        report,
        detailReport,
        detailResults,
        isAddFormVisible,
        setSelectedReport,
        detailResultLoading,
        setIsAddFormVisible,
        isDetailReportVisible,
        isDetailResultsVisible,
        setIsDetailReportVisible,
        setIsDetailResultsVisible,
        isFormat,
        setIsFormat,
        reportKind,
        setReportKind,
        workunitKind,
        setWorkunitKind,

        handleDetail,
        handleDetailResults
    }                                          = props;

    //Helper
    const {
        numToExcelColumn,
        getRoleByMenuStatus
    }                                          = Helper;

    const [body, setBody]                      = useState([]);
    const [header, setHeader]                  = useState([]);

    const monthName = [
        "Mei",
        "Januari",
        "Maret",
        "April",
        "Juni",
        "Februari",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];

    const getHeader = () => {

        let _body       = [];
        let _header     = [];
        let _bodyData   = [];

        if(detailResults != null && "headers" in detailResults && detailResults.headers.length > 0){
            _header.push('No.');
            detailResults.headers.map((data) => {
                _header.push(data.report_content.name);
            });

            setHeader([..._header]);
        }

        if(detailResults != null && detailResults.agent_reports != null){
            detailResults.agent_reports.map((data, index) => (
                <Fragment>
                
                {_bodyData = []}
                {_bodyData.push((index+1).toString())}

                {
                    detailResults != null && detailResults.headers.length > 0 ?
                        detailResults.headers.map((dataHeader) => (
                            dataHeader.report_content.id === 1 ?
                                _bodyData.push( data.when_+' '+'bertempat di '+ (data.where != undefined ? data.where.replace(/[.]+$/g,"") : data.where)  +". "+data.who+' '+ (data.what != undefined ? data.what.replace(/[.]+$/g,"") : data.what )+'. '+data.why+'. '+ (data.how != undefined ? data.how.replace(/[.]+$/g,"")+ '.' : data.how))
                            :
                                dataHeader.report_content.id === 2 ?
                                    _bodyData.push(Helper.dateIndo1(data.publication_date.toString()))
                                :
                                    dataHeader.report_content.id === 3 ?
                                        _bodyData.push(data.rating != undefined ? data.rating.toString() : data.rating)
                                    :
                                            dataHeader.report_content.id === 4 ?
                                                _bodyData.push(data.leader_comments != undefined ? data.leader_comments.toString() : data.leader_comments)
                                            :
                                                dataHeader.report_content.id === 5 ?
                                                    _bodyData.push(data.agent_comments != undefined ? data.agent_comments.toString() : data.agent_comments)
                                                :
                                                        dataHeader.report_content.id === 6 ?
                                                            _bodyData.push(data.viewers != undefined ? data.viewers.toString() : data.viewers)
                                                        :
                                                            dataHeader.report_content.id === 7 ?
                                                                _bodyData.push(data.categories != undefined ? data.categories.toString() : data.categories)
                                                            :
                                                                dataHeader.report_content.id === 8 ?
                                                                    _bodyData.push(data.employee != undefined ? data.employee.toString() : data.employee)
                                                                :
                                                                    dataHeader.report_content.id === 9 ?
                                                                        _bodyData.push(data.workunit != undefined ? data.workunit.toString() : data.workunit)
                                                                    :
                                                                        dataHeader.report_content.id === 10 ?
                                                                            _bodyData.push(data.position != undefined ? data.position.toString() : data.position)
                                                                        :
                                                                            dataHeader.report_content.id === 11 ?
                                                                                _bodyData.push(data.publication_count != undefined ? data.publication_count.toString() : data.publication_count)
                                                                            :
                                                                                dataHeader.report_content.id === 12 ?
                                                                                    _bodyData.push(data.archive_count != undefined ? data.archive_count.toString() : data.archive_count)
                                                                                :
                                                                                    dataHeader.report_content.id === 13 ?
                                                                                        _bodyData.push(data.forward_count != undefined ? data.forward_count.toString() : data.forward_count)
                                                                                    :
                                                                                        dataHeader.report_content.id === 14 ?
                                                                                            _bodyData.push(data.agent_count != undefined ? data.agent_count.toString() : data.agent_count) 
                                                                                        :
                                                                                            dataHeader.report_content.id === 15 ?
                                                                                                _bodyData.push(monthName) 
                                                                                            :
                                                                                                dataHeader.report_content.id === 16 ?
                                                                                                    _bodyData.push(moment().daysInMonth)
                                                                                                :
                                                                                                    dataHeader.report_content.id === 17 ?
                                                                                                        _bodyData.push(data.publication_count != undefined ? data.publication_count.toString() : data.publication_count)
                                                                                                    :
                                                                                                        null
                        ))
                    :
                        null
                }
                {_body.push(_bodyData)}
                </Fragment>
            ))
            setBody([..._body]);
        }
    }

    const getHeaderFormatted = () => {
        let _sum      = [];
        let _body     = [];
        let _header   = [];
        let _bodyData = [];
        
        if(detailResults != null){
            if(detailResults.report_type === 'yearly'){
                _header.push('No.', "Satuan Kerja", "Bulan", "Jumlah");
            }else if(detailResults.report_type === 'monthly'){
                _header.push('No.', "Satuan Kerja", "Tanggal", "Jumlah");
            }else if(detailResults.report_type === 'quarterly'){

                let triwulan    = [1,2];
                let triwulan_   = [];

                if(triwulan.includes(1)){
                    triwulan_.push("Triwulan I");
                }else if(triwulan.includes(2)){
                    triwulan_.push("Triwulan II");
                }else if(triwulan.includes(3)){
                    triwulan_.push("Triwulan III");
                }else if(triwulan.includes(4)){
                    triwulan_.push("Triwulan IV");
                }

                _header.push('No.', "Satuan Kerja", triwulan_.toString() , "Jumlah");
            }else if (detailResults.report_type === 'periodically'){
                _header.push('No.', "Satuan Kerja", "Data Berita");
            }
        }

        setHeader([..._header]);

        if(detailResults != null && detailResults.result != null){
            detailResults.result.map((data,index) => (
                <>
                    {_sum      = 0}
                    {_bodyData = []}
                    {_bodyData.push((index+1).toString())}
                    {_bodyData.push(data.name)}
                    {
                        data.data != null && data.data.map((data2) => (
                            data2.result.map((data_) => (
                                <>
                                    {
                                        detailResults?.contents.map((data2_) => (
                                            data2_.report_content_id === 11 ?
                                                <>
                                                    {_bodyData.push(data_.publication)}
                                                    {_sum += data_.publication}
                                                </>
                                            :
                                                data2_.report_content_id === 12 ?
                                                    <>
                                                        {_bodyData.push(data_.archive)}
                                                        {_sum += data_.archive}
                                                    </>
                                                :
                                                    <>
                                                        {_bodyData.push(data_.forward)}
                                                        {_sum += data_.forward}
                                                    </>
                                        ))
                                    }
                                </>
                            ))
                        ))
                    }
                    {detailResults?.report_type !== 'periocally' && _bodyData.push(_sum)}
                    {_body.push(_bodyData)}
                </>
            ))
            setBody([..._body]);
        }
    }

    const addWatermark = (doc) => {

        var totalPages = doc.internal.getNumberOfPages();

        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.addImage(logoLight, 'PNG', 245, 190, 35, 10);
        }
        return doc;

    };

    const handleUploadToDrive = (files) => {
        DriveApi.upload({
            dir     : "",
            file   : files,
            onSuccess : (res) => {
                console.log(res, 'success');
            },
            onFail  : (err) => {
                console.log(err, 'error');

            }
        })
    };

    const createPDF = () => {
        let doc = new jsPDF({
            orientation: "landscape",
        });

        doc.text(props.selectedReport.title, 145, 15, null, null, "center");
        doc.setFontSize(12);
        doc.text('Tanggal: '+ Helper.dateIndo1(props.selectedReport.created_at), 145, 22, null, null, "center");

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

        let finalY = doc.lastAutoTable.finalY;
        doc.text('Kesimpulan: ', 15, finalY+12, );
        doc.text(`Dari data diatas menunjukan rata-rata perbedaan jumlah berita disetiap satuan kerja adalah ${Math.round(detailResults.conclusion.average_difference.percentage)} %`,15, finalY+20);
        doc.text(`Satuan kerja terbaik dengan jumlah rata-rata adalah ${ detailResults.conclusion.best_work_unit != null ? detailResults.conclusion.best_work_unit.name : ""} `,15, finalY+26);
        doc.text(`Kategori dengan berita terbanyak adalah ${ detailResults.conclusion.most_report_categories != null ? detailResults.conclusion.most_report_categories.name : ""}`, 15, finalY+32);
        doc.text(`Jumlah berita dari tanggal ${detailResults.conclusion.total_report != null ? Helper.dateIndo1(detailResults.conclusion.total_report.from_date) : ""} s/d ${ detailResults.conclusion.total_report != null ? Helper.dateIndo1(detailResults.conclusion.total_report.till_date) : ""} adalah ${detailResults.conclusion.total_report != null ? detailResults.conclusion.total_report.total : "" }`, 15, finalY+38);

        doc = addWatermark(doc);

        doc.save(`${props.selectedReport.title}.pdf`);

        let resFile = doc.output('blob');
        handleUploadToDrive(new File([resFile], `${props.selectedReport.title}.pdf`));

        return doc;
    };
    const createFormatPDF = () => {
        let doc = new jsPDF({
            orientation: "landscape",
        });

        doc.text(props.selectedReport.title, 145, 15, null, null, "center");
        doc.setFontSize(12);
        doc.text('Tanggal: '+Helper.dateIndo1(props.selectedReport.created_at), 145, 22, null, null, "center");

                if(detailResults?.report_type === 'monthly'){

            let date_       = [];
            let dateLength_ = body[0].length > 0 ? body[0].length - 3 : 0;

            Array.from(Array(dateLength_).keys()).map((data,index) => (
                date_.push({content: index+1, styles: { halign: 'center'}})
            ))


            doc.autoTable({
                startY          : 30,
                head            : [
                    [
                        {content: 'No.', rowSpan: 2, styles: { halign: 'center', valign: 'middle'}},
                        {content: 'Satuan Kerja', rowSpan: 2, styles: { halign: 'center'}},
                        {content: 'Tanggal', colSpan: dateLength_ ,styles: { halign: 'center'}},
                        {content: 'Jumlah', rowSpan:2,styles: { halign: 'center'}},
                    ],
                    date_
                ],
                body            : [body.map((data) => 
                    (
                        data.map((data2, index) => (
                            index > 1 ?
                                {
                                    content : data2,
                                    styles  : {halign: 'center'}
                                }
                            :
                                {
                                    content : data2,
                                    styles  : {halign: 'left'}
                                }
                        ))
                    ))][0],
                margin          : { top: 10, bottom: 25 },
                styles          : { cellWidth: 'auto'},
                headStyles      : {
                    fillColor   : [23, 97, 56],
                },
                columnStyles    : { 0: { cellWidth: 10 } },
            });
        }else if(detailResults?.report_type === 'yearly'){
            doc.autoTable({
                startY          : 30,
                head            : [
                    [
                        {content: 'No.', rowSpan: 2, styles: { halign: 'center', valign: 'middle'}},
                        {content: 'Satuan Kerja', rowSpan: 2, styles: { halign: 'center'}},
                        {content: 'Bulan', colSpan:12,styles: { halign: 'center'}},
                        {content: 'Jumlah', rowSpan:2,styles: { halign: 'center'}},
                    ],
                    [
                        {content: 'Januari', styles: { halign: 'center'}},
                        {content: 'Februari', styles: { halign: 'center'}},
                        {content: 'Maret', styles: { halign: 'center'}},
                        {content: 'April', styles: { halign: 'center'}},
                        {content: 'Mei', styles: { halign: 'center'}},
                        {content: 'Juni', styles: { halign: 'center'}},
                        {content: 'Juli', styles: { halign: 'center'}},
                        {content: 'Agustus', styles: { halign: 'center'}},
                        {content: 'September', styles: { halign: 'center'}},
                        {content: 'Oktober', styles: { halign: 'center'}},
                        {content: 'November', styles: { halign: 'center'}},
                        {content: 'Desember', styles: { halign: 'center'}},
                    ]
                ],
                body            : [body.map((data) => 
                    (
                        data.map((data2, index) => (
                            index > 1 ?
                                {
                                    content : data2,
                                    styles  : {halign: 'center'}
                                }
                            :
                                {
                                    content : data2,
                                    styles  : {halign: 'left'}
                                }
                        ))
                    ))][0],
                styles          : { cellWidth: 'auto'},
                columnStyles    : { 0: { cellWidth: 10 } },
                headStyles      : {
                    fillColor: [23, 97, 56],
                },
                margin:         { top: 10, bottom: 25 }
            });
        }else if(detailResults?.report_type === 'quarterly'){

            let quarter    = detailResults?.quarterly?.map((data) => (data.name));
            let header_     = [
                {content: 'No.', rowSpan: 2, styles: { halign: 'center', valign: 'middle'}},
                {content: 'Satuan Kerja', rowSpan: 2, styles: { halign: 'center'}},
            ];
            let subHeader_  = [];

            if(quarter.includes("Triwulan I")){
                header_.push({content: 'Triwulan I', colSpan:3 ,styles: { halign: 'center'}});
                subHeader_.push(
                    {content: 'Januari', styles: { halign: 'center'}},
                    {content: 'Februari', styles: { halign: 'center'}},
                    {content: 'Maret', styles: { halign: 'center'}},
                )
            }
            if(quarter.includes("Triwulan II")){
                header_.push({content: 'Triwulan II', colSpan:3 ,styles: { halign: 'center'}});
                subHeader_.push(
                    {content: 'April', styles: { halign: 'center'}},
                    {content: 'Mei', styles: { halign: 'center'}},
                    {content: 'Juni', styles: { halign: 'center'}},
                )
            }
            if(quarter.includes("Triwulan III")){
                header_.push({content: 'Triwulan III', colSpan:3 ,styles: { halign: 'center'}});
                subHeader_.push(
                    {content: 'Juli', styles: { halign: 'center'}},
                    {content: 'Agustus', styles: { halign: 'center'}},
                    {content: 'September', styles: { halign: 'center'}},
                )
            }
            if(quarter.includes("Triwulan IV")){
                header_.push({content: 'Triwulan IV', colSpan:3 ,styles: { halign: 'center'}});
                subHeader_.push(
                    {content: 'Oktober', styles: { halign: 'center'}},
                    {content: 'November', styles: { halign: 'center'}},
                    {content: 'Desember', styles: { halign: 'center'}},
                )
            }
            
            doc.autoTable({
                startY          : 30,
                head            : [
                    header_,
                    subHeader_
                ],
                body            : [body.map((data) => 
                    (
                        data.map((data2, index) => (
                            index > 1 ?
                                {
                                    content : data2,
                                    styles  : {halign: 'center'}
                                }
                            :
                                {
                                    content : data2,
                                    styles  : {halign: 'left'}
                                }
                        ))
                    ))
                ][0],
                styles          : { cellWidth: 'auto'},
                columnStyles    : { 0: { cellWidth: 10 } },
                headStyles      : {
                    fillColor: [23, 97, 56],
                },
                margin:         { top: 10, bottom: 25 }
            });
        }else if(detailResults?.report_type === 'periodically'){

            let subHeader_ = [];

            detailResults?.contents?.map((data_) => (
                data_.report_content_id === 11 ?
                    subHeader_.push(
                        {content: 'Jumlah Berita di Publikasi', styles: { halign: 'center'}},
                    )
                :
                    data_.report_content_id === 12 ?
                        subHeader_.push(
                            {content: 'Jumlah Berita di Arsip', styles: { halign: 'center'}},
                        )
                    :
                        subHeader_.push(
                            {content: 'Jumlah Berita ke Pimpinan', styles: { halign: 'center'}},
                        )
            ));

            doc.autoTable({
                startY          : 30,
                head            : [
                    [
                        {content: 'No.', rowSpan : 2, styles: { halign: 'center', valign: 'middle'}},
                        {content: 'Satuan Kerja', rowSpan: 2, styles: { halign: 'center'}},
                        {content: 'Data Berita', colSpan : 3,styles: { halign: 'center'}},
                    ],
                    subHeader_
                ],
                body            : [body.map((data) => 
                    (
                        data.map((data2, index) => (
                            index > 1 ?
                                {
                                    content : data2,
                                    styles  : {halign: 'center'}
                                }
                            :
                                {
                                    content : data2,
                                    styles  : {halign: 'left'}
                                }
                        ))
                    )
                )][0],
                styles          : { cellWidth: 'auto'},
                columnStyles    : { 0: { cellWidth: 10 } },
                headStyles      : {
                    fillColor: [23, 97, 56],
                },
                margin:         { top: 10, bottom: 25 }
            });
        }

        doc = addWatermark(doc);

        doc.save(`${props.selectedReport.title}.pdf`);

        return doc;
    };

    const printPDF = () => {
        let doc = new jsPDF({
            orientation: "landscape",
        });

        doc.text(props.selectedReport.title, 145, 15, null, null, "center");
        doc.setFontSize(12);
        
        doc.text('Tanggal Buat Laporan: '+Helper.dateIndo1(props.selectedReport.created_at), 15, 23, null, null, "left");
        doc.text('Periode Laporan: '+Helper.dateIndo1(props.selectedReport.start), 173, 23, null, null, "left");
        doc.text('-', 243, 23, null, null, "center");
        doc.text(Helper.dateIndo1(props.selectedReport.end), 245, 23, null, null, "left");
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

        let finalY = doc.lastAutoTable.finalY;
        // doc.text('Kesimpulan: ', 15, finalY+12, );

        // if(detailReport.length > 0){      
        //     doc.text(`Dari data diatas menunjukan rata-rata perbedaan jumlah berita disetiap satuan kerja adalah ${Math.round(detailResults.conclusion.average_difference.percentage)} %`,15, finalY+20);
        //     doc.text(`Satuan kerja terbaik dengan jumlah rata-rata adalah ${ detailResults.conclusion.best_work_unit != null ? detailResults.conclusion.best_work_unit.name : ""} `,15, finalY+26);
        //     doc.text(`Kategori dengan berita terbanyak adalah ${ detailResults.conclusion.most_report_categories != null ? detailResults.conclusion.most_report_categories.name : ""}`, 15, finalY+32);
        //     doc.text(`Jumlah berita dari tanggal ${detailResults.conclusion.total_report != null ? formatDate(detailResults.conclusion.total_report.from_date) : ""} s/d ${ detailResults.conclusion.total_report != null ? formatDate(detailResults.conclusion.total_report.till_date) : ""} adalah ${detailResults.conclusion.total_report != null ? detailResults.conclusion.total_report.total : "" }`, 15, finalY+38);
        // }
        doc = addWatermark(doc);
        let print = window.open(doc.output('bloburl'), '_blank');
        print.print();
        return doc;
    };

    const printFormatPDF = () => {
        let doc = new jsPDF({
            orientation: "landscape",
        });

        doc.text(props.selectedReport.title, 145, 15, null, null, "center");
        doc.setFontSize(12);
        doc.text('Tanggal: '+Helper.dateIndo1(props.selectedReport.created_at), 145, 22, null, null, "center");

        if(detailResults?.report_type === 'monthly'){

            let date_       = [];
            let dateLength_ = body[0].length > 0 ? body[0].length - 3 : 0;

            Array.from(Array(dateLength_).keys()).map((data,index) => (
                date_.push({content: index+1, styles: { halign: 'center'}})
            ))

            doc.autoTable({
                startY          : 30,
                head            : [
                    [
                        {content: 'No.', rowSpan: 2, styles: { halign: 'center', valign: 'middle'}},
                        {content: 'Satuan Kerja', rowSpan: 2, styles: { halign: 'center'}},
                        {content: 'Tanggal', colSpan: dateLength_ ,styles: { halign: 'center'}},
                        {content: 'Jumlah', rowSpan:2,styles: { halign: 'center'}},
                    ],
                    date_
                ],
                body            : [body.map((data) => 
                    (
                        data.map((data2, index) => (
                            index > 1 ?
                                {
                                    content : data2,
                                    styles  : {halign: 'center'}
                                }
                            :
                                {
                                    content : data2,
                                    styles  : {halign: 'left'}
                                }
                        ))
                    ))][0],
                margin          : { top: 10, bottom: 25 },
                styles          : { cellWidth: 'auto'},
                headStyles      : {
                    fillColor   : [23, 97, 56],
                },
                columnStyles    : { 0: { cellWidth: 10 } },
            });
        }else if(detailResults?.report_type === 'yearly'){
            doc.autoTable({
                startY          : 30,
                head            : [
                    [
                        {content: 'No.', rowSpan: 2, styles: { halign: 'center', valign: 'middle'}},
                        {content: 'Satuan Kerja', rowSpan: 2, styles: { halign: 'center'}},
                        {content: 'Bulan', colSpan:12,styles: { halign: 'center'}},
                        {content: 'Jumlah', rowSpan:2,styles: { halign: 'center'}},
                    ],
                    [
                        {content: 'Januari', styles: { halign: 'center'}},
                        {content: 'Februari', styles: { halign: 'center'}},
                        {content: 'Maret', styles: { halign: 'center'}},
                        {content: 'April', styles: { halign: 'center'}},
                        {content: 'Mei', styles: { halign: 'center'}},
                        {content: 'Juni', styles: { halign: 'center'}},
                        {content: 'Juli', styles: { halign: 'center'}},
                        {content: 'Agustus', styles: { halign: 'center'}},
                        {content: 'September', styles: { halign: 'center'}},
                        {content: 'Oktober', styles: { halign: 'center'}},
                        {content: 'November', styles: { halign: 'center'}},
                        {content: 'Desember', styles: { halign: 'center'}},
                    ]
                ],
                body            : [body.map((data) => 
                    (
                        data.map((data2, index) => (
                            index > 1 ?
                                {
                                    content : data2,
                                    styles  : {halign: 'center'}
                                }
                            :
                                {
                                    content : data2,
                                    styles  : {halign: 'left'}
                                }
                        ))
                    ))][0],
                styles          : { cellWidth: 'auto'},
                columnStyles    : { 0: { cellWidth: 10 } },
                headStyles      : {
                    fillColor: [23, 97, 56],
                },
                margin:         { top: 10, bottom: 25 }
            });
        }else if(detailResults?.report_type === 'quarterly'){

            let quarter    = detailResults?.quarterly?.map((data) => (data.name));
            let header_     = [
                {content: 'No.', rowSpan: 2, styles: { halign: 'center', valign: 'middle'}},
                {content: 'Satuan Kerja', rowSpan: 2, styles: { halign: 'center'}},
            ];
            let subHeader_  = [];

            if(quarter.includes("Triwulan I")){
                header_.push({content: 'Triwulan I', colSpan:3 ,styles: { halign: 'center'}});
                subHeader_.push(
                    {content: 'Januari', styles: { halign: 'center'}},
                    {content: 'Februari', styles: { halign: 'center'}},
                    {content: 'Maret', styles: { halign: 'center'}},
                )
            }
            if(quarter.includes("Triwulan II")){
                header_.push({content: 'Triwulan II', colSpan:3 ,styles: { halign: 'center'}});
                subHeader_.push(
                    {content: 'April', styles: { halign: 'center'}},
                    {content: 'Mei', styles: { halign: 'center'}},
                    {content: 'Juni', styles: { halign: 'center'}},
                )
            }
            if(quarter.includes("Triwulan III")){
                header_.push({content: 'Triwulan III', colSpan:3 ,styles: { halign: 'center'}});
                subHeader_.push(
                    {content: 'Juli', styles: { halign: 'center'}},
                    {content: 'Agustus', styles: { halign: 'center'}},
                    {content: 'September', styles: { halign: 'center'}},
                )
            }
            if(quarter.includes("Triwulan IV")){
                header_.push({content: 'Triwulan IV', colSpan:3 ,styles: { halign: 'center'}});
                subHeader_.push(
                    {content: 'Oktober', styles: { halign: 'center'}},
                    {content: 'November', styles: { halign: 'center'}},
                    {content: 'Desember', styles: { halign: 'center'}},
                )
            }
            
            doc.autoTable({
                startY          : 30,
                head            : [
                    header_,
                    subHeader_
                ],
                body            : [body.map((data) => 
                    (
                        data.map((data2, index) => (
                            index > 1 ?
                                {
                                    content : data2,
                                    styles  : {halign: 'center'}
                                }
                            :
                                {
                                    content : data2,
                                    styles  : {halign: 'left'}
                                }
                        ))
                    ))
                ][0],
                styles          : { cellWidth: 'auto'},
                columnStyles    : { 0: { cellWidth: 10 } },
                headStyles      : {
                    fillColor: [23, 97, 56],
                },
                margin:         { top: 10, bottom: 25 }
            });
        }else if(detailResults?.report_type === 'periodically'){

            let subHeader_ = [];

            detailResults?.contents?.map((data_) => (
                data_.report_content_id === 11 ?
                    subHeader_.push(
                        {content: 'Jumlah Berita di Publikasi', styles: { halign: 'center'}},
                    )
                :
                    data_.report_content_id === 12 ?
                        subHeader_.push(
                            {content: 'Jumlah Berita di Arsip', styles: { halign: 'center'}},
                        )
                    :
                        subHeader_.push(
                            {content: 'Jumlah Berita ke Pimpinan', styles: { halign: 'center'}},
                        )
            ));

            doc.autoTable({
                startY          : 30,
                head            : [
                    [
                        {content: 'No.', rowSpan : 2, styles: { halign: 'center', valign: 'middle'}},
                        {content: 'Satuan Kerja', rowSpan: 2, styles: { halign: 'center'}},
                        {content: 'Data Berita', colSpan : 3,styles: { halign: 'center'}},
                    ],
                    subHeader_
                ],
                body            : [body.map((data) => 
                    (
                        data.map((data2, index) => (
                            index > 1 ?
                                {
                                    content : data2,
                                    styles  : {halign: 'center'}
                                }
                            :
                                {
                                    content : data2,
                                    styles  : {halign: 'left'}
                                }
                        ))
                    )
                )][0],
                styles          : { cellWidth: 'auto'},
                columnStyles    : { 0: { cellWidth: 10 } },
                headStyles      : {
                    fillColor: [23, 97, 56],
                },
                margin:         { top: 10, bottom: 25 }
            });
        }

        doc = addWatermark(doc);
        let print = window.open(doc.output('bloburl'), '_blank');
        print.print();
        return doc;
    };
    
    const createExcel = () => {

        const workbook  = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Sheet1");

        const header_ = header.map((data) => (
                {header : data, key: data.toLowerCase().split(' ').join('_'), width: data.length+2}
            ))

        worksheet.columns = header_;

        body.map((data) => (
            worksheet.addRow(data)
        ))

        workbook.xlsx
            .writeBuffer()
            .then((buffer) => FileSaver.saveAs(new Blob([buffer]), "data.xlsx"));
    };

    const createFormatExcel = () => {
        const workbook  = new ExcelJS.Workbook({useStyles: true});
        const worksheet = workbook.addWorksheet("Sheet1");

        //change format header
        if(detailResults?.report_type === 'monthly'){

            let dateLength_ = body[0].length > 0 ? body[0].length - 2 : 0; //used for check date length for header
        
            const header = [
                {
                    header  : 'No.', 
                    key     : 'no', 
                    style   : { alignment : { vertical: 'middle', horizontal: 'center' }} 
                },
                {
                    header  : 'Satuan Kerja', 
                    key     : 'satuan_kerja', 
                    width   : 50,
                    style   : { alignment : { vertical: 'middle', horizontal: 'center' }} 

                },
                {
                    header  : 'Tanggal', 
                    key     : 'tanggal',
                    style   : { alignment : { vertical: 'middle', horizontal: 'center' }} 
                },
            ]

            //add header
            worksheet.mergeCells("A1", "A2"); //For Merge No. Header
            worksheet.mergeCells("B1", "B2"); //For Merge No. Satuan Kerja
            worksheet.mergeCells(`C1`, `${numToExcelColumn(dateLength_+1)}1`) //For Merge Tanggal
            worksheet.columns = header;

            //add jumlah header
            const rowHeader = worksheet.getRow(1);
            rowHeader.getCell(dateLength_+2).value = 'Jumlah'
            worksheet.mergeCells(`${numToExcelColumn(dateLength_+2)}1`, `${numToExcelColumn(dateLength_+2)}2`); //For Merge No. Header

            //for add date to header
            const rowHeader2 = worksheet.getRow(2);
            Array.from(Array(dateLength_-1).keys()).map((data,index) => (
                rowHeader2.getCell(index+3).value = index+1
            ))

            body.map((data) => (
                worksheet.addRow(data)
            ))
    
            workbook.xlsx
                .writeBuffer()
                .then((buffer) => FileSaver.saveAs(new Blob([buffer]), "data_formatted.xlsx"));

        }else if(detailResults?.report_type === 'yearly'){
            const header = [
                {
                    header  : 'No.', 
                    key     : 'no', 
                    style   : { alignment : { vertical: 'middle', horizontal: 'center' }} 
                },
                {
                    header  : 'Satuan Kerja', 
                    key     : 'satuan_kerja', 
                    width   : 50,
                    style   : { alignment : { vertical: 'middle', horizontal: 'center' }} 

                },
                {
                    header  : 'Tanggal', 
                    key     : 'tanggal',
                    style   : { alignment : { vertical: 'middle', horizontal: 'center' }} 
                },
            ]

            //add header
            worksheet.mergeCells("A1", "A2"); //For Merge No. Header
            worksheet.mergeCells("B1", "B2"); //For Merge No. Satuan Kerja
            worksheet.mergeCells(`C1`, `${numToExcelColumn(14)}1`) //For Merge Tanggal
            worksheet.columns = header;

            //add jumlah header
            const rowHeader = worksheet.getRow(1);
            rowHeader.getCell(15).value = 'Jumlah'
            worksheet.mergeCells(`${numToExcelColumn(15)}1`, `${numToExcelColumn(15)}2`); //For Merge No. Header

            //for add date to header
            const rowHeader2 = worksheet.getRow(2);
            rowHeader2.getCell(3).value = "Januari";
            rowHeader2.getCell(4).value = "Februari";
            rowHeader2.getCell(5).value = "Maret";
            rowHeader2.getCell(6).value = "April";
            rowHeader2.getCell(7).value = "Mei";
            rowHeader2.getCell(8).value = "Juni";
            rowHeader2.getCell(9).value = "Juli";
            rowHeader2.getCell(10).value = "Agustus";
            rowHeader2.getCell(11).value = "September";
            rowHeader2.getCell(12).value = "Oktober";
            rowHeader2.getCell(13).value = "November";
            rowHeader2.getCell(14).value = "Desember";

            body.map((data) => (
                worksheet.addRow(data)
            ))
    
            workbook.xlsx
                .writeBuffer()
                .then((buffer) => FileSaver.saveAs(new Blob([buffer]), "data_formatted.xlsx"));

        }else if(detailResults?.report_type === 'quarterly'){
            let quarter         = detailResults?.quarterly?.map((data) => (data.name));
            let lastPosition    = 2; // start position for triwulan header

            const header = [
                {
                    header  : 'No.', 
                    key     : 'no', 
                    style   : { alignment : { vertical: 'middle', horizontal: 'center' }} 
                },
                {
                    header  : 'Satuan Kerja', 
                    key     : 'satuan_kerja', 
                    width   : 50,
                    style   : { alignment : { vertical: 'middle', horizontal: 'center' }} 

                },
            ]

            worksheet.mergeCells("A1", "A2"); //For Merge No. Header
            worksheet.mergeCells("B1", "B2"); //For Merge No. Satuan Kerja
            worksheet.columns = header;

            if(quarter.includes("Triwulan I")){
                const rowHeader = worksheet.getRow(1);
                rowHeader.getCell(3).value = 'Triwulan I';
                worksheet.mergeCells(lastPosition == 0 ? `C1` : numToExcelColumn(lastPosition+1), `${numToExcelColumn(lastPosition+3)}1`) //For Merge Tanggal

                const rowHeader2 = worksheet.getRow(2);
                rowHeader2.getCell(lastPosition+1).value = 'Januari';
                rowHeader2.getCell(lastPosition+2).value = 'Februari';
                rowHeader2.getCell(lastPosition+3).value = 'Maret';

                lastPosition+=3

            }

            if(quarter.includes("Triwulan II")){
                const rowHeader = worksheet.getRow(1);
                rowHeader.getCell(lastPosition+1).value = 'Triwulan II';
                worksheet.mergeCells(lastPosition == 0 ? `C1` : numToExcelColumn(lastPosition+1), `${numToExcelColumn(lastPosition+3)}1`) //For Merge Tanggal

                const rowHeader2 = worksheet.getRow(2);
                rowHeader2.getCell(lastPosition+1).value = 'April';
                rowHeader2.getCell(lastPosition+2).value = 'Mei';
                rowHeader2.getCell(lastPosition+3).value = 'Juni';
                lastPosition+=3
            }

            if(quarter.includes("Triwulan III")){
                const rowHeader = worksheet.getRow(1);
                rowHeader.getCell(lastPosition+1).value = 'Triwulan III';
                worksheet.mergeCells(lastPosition == 0 ? `C1` : numToExcelColumn(lastPosition+1), `${numToExcelColumn(lastPosition+3)}1`) //For Merge Tanggal

                const rowHeader2 = worksheet.getRow(2);
                rowHeader2.getCell(lastPosition+1).value = 'Juli';
                rowHeader2.getCell(lastPosition+2).value = 'Agustus';
                rowHeader2.getCell(lastPosition+3).value = 'September';
                lastPosition+=3
            }

            if(quarter.includes("Triwulan IV")){
                const rowHeader = worksheet.getRow(1);
                rowHeader.getCell(lastPosition+1).value = 'Triwulan IV';
                worksheet.mergeCells(lastPosition == 0 ? `C1` : numToExcelColumn(lastPosition+1), `${numToExcelColumn(lastPosition+3)}1`) //For Merge Tanggal
                const rowHeader2 = worksheet.getRow(2);
                rowHeader2.getCell(lastPosition+1).value = 'Oktober';
                rowHeader2.getCell(lastPosition+2).value = 'November';
                rowHeader2.getCell(lastPosition+3).value = 'Desember';
                lastPosition+=3
            }

            //add jumlah header
            const rowHeader = worksheet.getRow(1);
            rowHeader.getCell(lastPosition+1).value = 'Jumlah'
            worksheet.mergeCells(`${numToExcelColumn(lastPosition+1)}1`, `${numToExcelColumn(lastPosition+1)}2`); //For Merge No. Header

            body.map((data) => (
                worksheet.addRow(data)
            ))
    
            workbook.xlsx
                .writeBuffer()
                .then((buffer) => FileSaver.saveAs(new Blob([buffer]), "data_formatted.xlsx"));

        }else{
            const header = [
                {
                    header  : 'No.', 
                    key     : 'no', 
                    style   : { alignment : { vertical: 'middle', horizontal: 'center' }} 
                },
                {
                    header  : 'Satuan Kerja', 
                    key     : 'satuan_kerja', 
                    width   : 50,
                    style   : { alignment : { vertical: 'middle', horizontal: 'center' }} 

                },
                {
                    header  : 'Data Berita', 
                    key     : 'data_berita',
                    style   : { alignment : { vertical: 'middle', horizontal: 'center' }} 
                },
            ]

            let subHeader_ = [];
            detailResults?.contents?.map((data_) => (
                data_.report_content_id === 11 ?
                    subHeader_.push('Jumlah Berita di Publikasi')
                :
                    data_.report_content_id === 12 ?
                        subHeader_.push('Jumlah Berita di Arsip')
                    :
                        subHeader_.push('Jumlah Berita ke Pimpinan')
            ));

            //add header
            worksheet.mergeCells("A1", "A2"); //For Merge No. Header
            worksheet.mergeCells("B1", "B2"); //For Merge No. Satuan Kerja
            worksheet.mergeCells(`C1`, `${numToExcelColumn(subHeader_.length+2)}1`) //For Merge Tanggal
            worksheet.columns = header;

            //add jumlah header
            const rowHeader = worksheet.getRow(1);
            rowHeader.getCell(subHeader_.length+3).value = 'Jumlah'
            worksheet.mergeCells(`${numToExcelColumn(subHeader_.length+3)}1`, `${numToExcelColumn(subHeader_.length+3)}2`); //For Merge No. Header

            //for add date to header
            const rowHeader2 = worksheet.getRow(2);
            subHeader_.map((data,index) => (
                rowHeader2.getCell(index+3).value = data
            ))

            body.map((data) => (
                worksheet.addRow(data)
            ))
    
            workbook.xlsx
                .writeBuffer()
                .then((buffer) => FileSaver.saveAs(new Blob([buffer]), "data_formatted.xlsx"));
        }
    }

    useEffect(() => {
        if(detailResults != null && "is_formatted" in detailResults && detailResults.is_formatted === true){
            getHeaderFormatted();
        }else{
            getHeader();        
        }
        console.log(detailResults)
    }, [detailResults]);

    return (
        getRoleByMenuStatus('Laporan', 'report_list') ?
            <Fragment>

                {/* modal add report */}
                <AddReport
                    onSubmit            = {props.onSubmit}
                    reportCategory      = {props.reportCategory}
                    isAddFormVisible    = {isAddFormVisible}
                    setIsAddFormVisible = {setIsAddFormVisible}
                    isFormat            = {isFormat}
                    setIsFormat         = {setIsFormat}
                    reportKind          = {reportKind}
                    setReportKind       = {setReportKind}
                    workunitKind        = {workunitKind}
                    setWorkunitKind     = {setWorkunitKind}
                />

                {/* modal delete */}
                <FormDelete
                    show        = {props.showDeleteForm}
                    title       = "Hapus Laporan"
                    setShow     = {(par) => props.setShowDeleteForm(par)}
                    loading     = {props.loading} 
                    onDelete    = {props.onDelete}
                    description = "Laporan"
                />

                {/* modal detail report */}
                <ModalBase 
                    size    = "lg" 
                    show    = {isDetailReportVisible} 
                    title   = "Tes Laporan tanpa schedule" 
                    setShow = {(par) => { setIsDetailReportVisible(par) }}
                >
                    <DetailTime
                        detailReport                = {detailReport}
                        setSelectedReport           = {setSelectedReport}
                        handleDetailResults         = {handleDetailResults}
                        isDetailReportVisible       = {isDetailReportVisible}
                        setIsDetailReportVisible    = {setIsDetailReportVisible}
                    />
                </ModalBase>

                {/* modal detail report result */}
                <ModalBase
                    size        = "xl"
                    show        = {isDetailResultsVisible}
                    title       = "Detail Laporan"
                    footer      = {[
                            <Button.Ripple 
                                color   = "primary" 
                                outline
                                onClick = {() => { setIsDetailResultsVisible(!isDetailResultsVisible) }} 
                            >
                                Batal
                            </Button.Ripple>,
                            <div>
                                <Button 
                                    color       = "primary" 
                                    onClick     = {() => {
                                        if(detailResults != null && "is_formatted" in detailResults && detailResults.is_formatted === true){
                                            printFormatPDF()
                                        }else{
                                            printPDF()
                                        }
                                    }}
                                    disabled    = {detailResultLoading}
                                    className   = "mr-1" 
                                >
                                    Print PDF
                                </Button>
                                <Button.Ripple 
                                    color       = "primary" 
                                    onClick     = {() => {
                                        if(detailResults != null && "is_formatted" in detailResults && detailResults.is_formatted === true){
                                            createFormatPDF();
                                        }else{
                                            createPDF();
                                        }
                                    }}
                                    disabled    = {detailResultLoading}
                                    className   = "mr-1" 
                                >
                                    Export PDF
                                </Button.Ripple>
                                <Button.Ripple 
                                    color       = "primary" 
                                    onClick     = {() => {
                                        if(detailResults != null && "is_formatted" in detailResults && detailResults.is_formatted === true){
                                            createFormatExcel();
                                        }else{
                                            createExcel();
                                        }
                                    }}
                                    disabled    = {detailResultLoading}
                                    className   = "mr-1" 

                                >
                                    Export Excel
                                </Button.Ripple>
                            </div>,
                    ]}
                    setShow     = {(par) => { setIsDetailResultsVisible(par) }}
                    scrollable  = {true}
                >
                    {

                        detailResultLoading ?
                            <Row>
                                {
                                    Array(5).fill(0).map((data) => (
                                        <Col md={12}>
                                            <Skeleton height={100}/>
                                        </Col>
                                    ))
                                }
                            </Row>
                        :
                            detailResults != null && "is_formatted" in detailResults && detailResults.is_formatted === true ?
                                <DetailDataFormatted
                                    detailReport                = {props.detailResults}
                                />
                            :
                                <DetailData
                                    onCancel                    = {() => { setIsDetailResultsVisible(!isDetailResultsVisible) }} 
                                    detailReport                = {props.detailResults}
                                    selectedReport              = {props.selectedReport}
                                    selectForwardChat           = {props.selectForwardChat}
                                    isDetailResultsVisible      = {props.isDetailResultsVisible}
                                    setIsDetailResultsVisible   = {props.setIsDetailResultsVisible}
                                />   
                    }
                </ModalBase>

                <CustomTable 
                    page        = "1" 
                    header      = {headerTable} 
                    totalData   = "50"
                    onClickForm = {() => { setIsAddFormVisible(true) }} 

                    //Role
                    roleAdd     = {getRoleByMenuStatus('Laporan', 'add')}
                >
                    <div id="report-table" className="mb-3">
                        {
                            report && report.map((data, number) => (
                                <CustomTableBody>
                                    <Col md="1">
                                        {number + 1}
                                    </Col>
                                    <Col md="5">
                                        {data.title}
                                    </Col>
                                    <Col md="3">
                                        {
                                            "repeat" in data  ?
                                                data.repeat == "single" ?
                                                    "Sekali Buat"
                                                :
                                                data.repeat == "daily" ? 
                                                    "Laporan Harian"
                                                :
                                                data.repeat == "weekly" ?
                                                    "Laporan Mingguan"
                                                :
                                                data.repeat == "monthly" ?
                                                    "Laporan Bulanan"
                                                :
                                                    "Hasil"
                                            : 
                                                "-"
                                        }
                                    </Col>
                                    <Col md="2">
                                        {
                                            data.is_scheduled === true &&
                                            <Button color='danger' size='sm'>
                                                Terjadwal
                                            </Button>
                                        }
                                        {
                                            data.is_formatted == false && data.is_scheduled === false &&
                                            <Button color='primary' size='sm'>
                                                Selesai
                                            </Button>
                                        }
                                        {
                                            data.is_formatted && data.is_scheduled === false && data.result != null &&
                                            <Button color='primary' size='sm'>
                                                Selesai
                                            </Button>
                                        }
                                        {
                                            data.is_formatted && data.is_scheduled === false && data.result == null &&
                                            <Button color='info' size='sm'>
                                                Dalam Proses
                                            </Button>   
                                        }
                                    </Col>
                                    <Col 
                                        md          = "1" 
                                        className   = "d-flex"
                                    >
                                        {
                                            getRoleByMenuStatus('Laporan', 'show') ? 
                                                !(data.is_formatted && data.is_scheduled === false && data.result == null) &&
                                                <div id="detail-report">
                                                    <Eye
                                                        size        = {20} 
                                                        onClick     = {() => { data.results.length > 0 ? handleDetail(data.id) : handleDetailResults(data.id)}}
                                                        className   = "mr-1 cursor-pointer" 
                                                    />
                                                </div>
                                            : 
                                                null
                                        }
                                        {
                                            getRoleByMenuStatus('Laporan', 'delete') ? 
                                                <div id="delete-report">
                                                    <Trash2 
                                                        size        = {20} 
                                                        onClick     = {() => { props.setIdSelected(data.id); props.setShowDeleteForm(true) }} 
                                                        className   = "ml-1 cursor-pointer"
                                                    />
                                                </div>
                                            : null
                                        }
                                    </Col>
                                </CustomTableBody>
                            ))
                        }
                    </div>

                    {props.report == null && <Skeleton height={60} count={3} style={{ marginBottom: "10px" }}/>}
                    {props.report != null && props.report.length === 0 && <CustomTableBodyEmpty/>}
                </CustomTable>

            </Fragment>
        : 
            <CustomTableNotAuthorized/>
    );
};

export default Report;