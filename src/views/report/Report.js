import { Fragment, useEffect, useState }   from "react";
import { Button, Col }          from "reactstrap";
import { Eye, Trash2 }          from "react-feather";

//Component
import Skeleton                 from "react-loading-skeleton";
import TourInput                from "./InputTour";
import DetailTime               from "./DetailTime";
import headerTable              from "./headerTable";
import CustomTable              from "../../components/widgets/custom-table";
import { ModalBase }            from "../../components/widgets/modals-base"
import CustomTableBody          from "../../components/widgets/custom-table/CustomTableBody";
import CustomTableBodyEmpty     from "../../components/widgets/custom-table/CustomTableBodyEmpty";
import CustomTableNotAuthorized from "../../components/widgets/custom-table/CustomTableNotAuthorized";

//API
import FormDelete               from "../../components/widgets/form-delete/FormDelete";

//Helper
import Helper                   from "../../helpers";
import DetailData               from "./DetailData";

//Export PDF
import jsPDF                    from 'jspdf';
import 'jspdf-autotable';

import logoLight                from "../../assets/images/logo/logo_light.png";

//Export Excel
import ReactExport              from "react-export-excel";
import moment                   from "moment";
import DetailDataFormatted      from "./DetailDataFormatted";
import DriveApi                 from "../../services/pages/drive";

const Report = (props) => {

    const {
        report,
        loading,
        showForm,
        setShowForm,
        detailReport,
        detailResults,
        setIdSelected,
        reportCategory,
        showDeleteForm,
        selectedReport,
        setSelectedReport,
        setShowDeleteForm,
        isDetailReportVisible,
        isDetailResultsVisible,
        setIsDetailReportVisible,
        setIsDetailResultsVisible,

        onDelete,
        onSubmit,
        handleDetail,
        handleDetailResults
    }                                           = props

    //Helper
    const {getRoleByMenuStatus}                 = Helper;

    const [body, setBody]           = useState([]);
    const [header, setHeader]       = useState([]);

    //Export Excel
    const ExcelFile                 = ReactExport.ExcelFile;
    const ExcelSheet                = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn               = ReactExport.ExcelFile.ExcelColumn;

    const monthName = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];

    const getHeader = () => {

        let _header = [];
        let _body   = [];
        let _bodyData = [];

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

                            dataHeader.report_content.id == 1 ?
                                _bodyData.push( data.when_+' '+'bertempat di '+ (data.where != undefined ? data.where.replace(/[.]+$/g,"") : data.where)  +". "+data.who+' '+ (data.what != undefined ? data.what.replace(/[.]+$/g,"") : data.what )+'. '+data.why+'. '+ (data.how != undefined ? data.how.replace(/[.]+$/g,"")+ '.' : data.how))
                            :
                                dataHeader.report_content.id == 2 ?
                                    _bodyData.push(Helper.dateIndo1(data.publication_date.toString()))
                                :
                                    dataHeader.report_content.id == 3 ?
                                        _bodyData.push(data.leader_likes != undefined ? data.leader_likes.toString() : data.leader_likes)
                                    :
                                        dataHeader.report_content.id == 4 ?
                                            _bodyData.push(data.agent_likes != undefined ? data.agent_likes.toString() : data.agent_likes)
                                        :
                                            dataHeader.report_content.id == 5 ?
                                                _bodyData.push(data.leader_comments != undefined ? data.leader_comments.toString() : data.leader_comments)
                                            :
                                                dataHeader.report_content.id == 6 ?
                                                    _bodyData.push(data.agent_comments != undefined ? data.agent_comments.toString() : data.agent_comments)
                                                :
                                                    dataHeader.report_content.id == 7 ?
                                                        _bodyData.push(data.dislikes != undefined ? data.dislikes.toString() : data.dislikes)
                                                    :
                                                        dataHeader.report_content.id == 8 ?
                                                            _bodyData.push(data.viewer_count != undefined ? data.viewer_count.toString() : data.viewer_count)
                                                        :
                                                            dataHeader.report_content.id == 9 ?
                                                                _bodyData.push(data.categories != undefined ? data.categories.toString() : data.categories)
                                                            :
                                                                dataHeader.report_content.id == 10 ?
                                                                    _bodyData.push(data.employee != undefined ? data.employee.toString() : data.employee)
                                                                :
                                                                    dataHeader.report_content.id == 11 ?
                                                                        _bodyData.push(data.workunit != undefined ? data.workunit.toString() : data.workunit)
                                                                    :
                                                                        dataHeader.report_content.id == 12 ?
                                                                            _bodyData.push(data.position != undefined ? data.position.toString() : data.position)
                                                                        :
                                                                            dataHeader.report_content.id == 13 ?
                                                                                _bodyData.push(data.publication_count != undefined ? data.publication_count.toString() : data.publication_count)
                                                                            :
                                                                                dataHeader.report_content.id == 14 ?
                                                                                    _bodyData.push(data.archive_count != undefined ? data.archive_count.toString() : data.archive_count)
                                                                                :
                                                                                    dataHeader.report_content.id == 15 ?
                                                                                        _bodyData.push(data.forward_count != undefined ? data.forward_count.toString() : data.forward_count)
                                                                                    :
                                                                                        dataHeader.report_content.id == 16 ?
                                                                                            _bodyData.push(data.agent_count != undefined ? data.agent_count.toString() : data.agent_count) 
                                                                                        :
                                                                                            dataHeader.report_content.id == 17 ?
                                                                                                _bodyData.push(monthName) 
                                                                                            :
                                                                                                dataHeader.report_content.id == 18 ?
                                                                                                    _bodyData.push(moment().daysInMonth)
                                                                                                :
                                                                                                    dataHeader.report_content.id == 19 ?
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
        
        if(detailResults != null && detailResults.result[0].data.length > 12){
            _header.push('No.', "Satuan Kerja", "Bulan", "Jumlah");
        }else{
            _header.push('No.', "Satuan Kerja", "Tanggal", "Jumlah");
        }

        setHeader([..._header]);

        if(detailResults != null && detailResults.result != null){
            detailResults.result.map((data,index) => (
                <>
                    {_sum      = 0}
                    {_bodyData = []}
                    {_bodyData.push((index+1).toString())}
                    {_bodyData.push(data.work_unit)}

                    {
                        data.data.map((data_) => (
                            <>
                                {_bodyData.push(data_.data != null ? data_.data.length : 0)}
                                {data_.data != null ? _sum += data_.data.length : _sum += 0}
                            </>
                        ))
                    }

                    {_bodyData.push(_sum)}
                    {_body.push(_bodyData)}
                </>
            ))
            setBody([..._body]);
        }
        console.log(_body, 'disini');
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

        if(body[0].length != 15){

            let date_ = [];
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
                body            : [body][0],
                styles          : { cellWidth: 'auto'},
                columnStyles    : { 0: { cellWidth: 10 } },
                headStyles      : {
                    fillColor: [23, 97, 56],
                },
                margin:         { top: 10, bottom: 25 }
            });
        }else{
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
                body            : [body][0],
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
        doc.text('Tanggal: '+Helper.dateIndo1(props.selectedReport.created_at), 145, 22, null, null, "center");
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

        if(detailReport.length > 0){      
            doc.text(`Dari data diatas menunjukan rata-rata perbedaan jumlah berita disetiap satuan kerja adalah ${Math.round(detailResults.conclusion.average_difference.percentage)} %`,15, finalY+20);
            doc.text(`Satuan kerja terbaik dengan jumlah rata-rata adalah ${ detailResults.conclusion.best_work_unit != null ? detailResults.conclusion.best_work_unit.name : ""} `,15, finalY+26);
            doc.text(`Kategori dengan berita terbanyak adalah ${ detailResults.conclusion.most_report_categories != null ? detailResults.conclusion.most_report_categories.name : ""}`, 15, finalY+32);
            doc.text(`Jumlah berita dari tanggal ${detailResults.conclusion.total_report != null ? formatDate(detailResults.conclusion.total_report.from_date) : ""} s/d ${ detailResults.conclusion.total_report != null ? formatDate(detailResults.conclusion.total_report.till_date) : ""} adalah ${detailResults.conclusion.total_report != null ? detailResults.conclusion.total_report.total : "" }`, 15, finalY+38);
        }
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

        if(body[0].length != 15){

            let date_ = [];
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
                body            : [body][0],
                styles          : { cellWidth: 'auto'},
                columnStyles    : { 0: { cellWidth: 10 } },
                headStyles      : {
                    fillColor: [23, 97, 56],
                },
                margin:         { top: 10, bottom: 25 }
            });
        }else{
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
                body            : [body][0],
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
        //get header 
        let dataHeader = [];

        header.map((data) => (
            dataHeader.push({ value: data, widthPx: 60, widthCh: 20})
        ));

        const dataSet = [
            {
                columns : header,
                data    : body
            }
        ];

        return (
            <ExcelFile 
                filename = {props.selectedReport.title}
                element  = {
                    <Button 
                        key     = "submit" 
                        color   = "primary" 

                    >
                        Export Excel
                    </Button>}
            >
                <ExcelSheet dataSet={dataSet} name="Organization"/>
            </ExcelFile>
        )
    };

    useEffect(() => {
        if(detailResults != null && "is_formatted" in detailResults && detailResults.is_formatted === true){
            getHeaderFormatted();
        }else{
            getHeader();        
        }

    }, [detailResults]);

    return (
        getRoleByMenuStatus('Laporan', 'report_list') ?
            <Fragment>
                {/* modal delete */}
                <FormDelete
                    show        = {props.showDeleteForm}
                    title       = "Hapus Laporan"
                    setShow     = {(par) => props.setShowDeleteForm(par)}
                    loading     = {props.loading} 
                    onDelete    = {props.onDelete}
                    description = "Laporan"
                />

                {/* modal form */}
                <ModalBase 
                    size    = "lg" 
                    show    = {props.showForm} 
                    title   = "Tambah Laporan" 
                    setShow = {(par) => { props.setShowForm(par) }}
                >
                    <TourInput
                        loading         = {props.loading}
                        onCancel        = {() => { props.setShowForm(!props.showForm) }}
                        onSubmit        = {props.onSubmit}
                        reportCategory  = {props.reportCategory}
                    />
                </ModalBase>

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
                            <Button.Ripple color="primary" onClick={() => { setDetailData(!detailData) }} outline>
                                Batal
                            </Button.Ripple>,
                            <div>
                                <Button.Ripple color="primary" className="mr-1" onClick={() => {
                                    if(detailResults != null && "is_formatted" in detailResults && detailResults.is_formatted === true){
                                        printFormatPDF()
                                    }else{
                                        printPDF()
                                    }
                                }}>
                                    Print PDF
                                </Button.Ripple>
                                <Button.Ripple color="primary" className="mr-1" onClick={() => {
                                    if(detailResults != null && "is_formatted" in detailResults && detailResults.is_formatted === true){
                                        createFormatPDF();
                                    }else{
                                        createPDF();
                                    }
                                }}>
                                    Export PDF
                                </Button.Ripple>
                                {createExcel()}
                            </div>,
                    ]}
                    setShow     = {(par) => { setIsDetailResultsVisible(par) }}
                    scrollable  = {true}
                >
                    {
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
                    onClickForm = {() => { props.setShowForm(!props.showForm) }} 
                    
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
                                            : "-"
                                        }
                                    </Col>
                                    <Col md="2">
                                        {
                                            data.is_scheduled === true ?
                                                <Button color='danger' size='sm'>
                                                    Terjadwal
                                                </Button>
                                            :
                                            <Button color='primary' size='sm'>
                                                    Selesai
                                                </Button>
                                        }
                                    </Col>
                                    <Col 
                                        md          = "1" 
                                        className   = "d-flex"
                                    >
                                        {
                                            getRoleByMenuStatus('Laporan', 'show') ? 
                                                <div id="detail-report">
                                                    <Eye
                                                        size        = {20} 
                                                        onClick     = {() => { data.results.length > 0 ? hendleDetail(data) : handleDetailResults(data)}}
                                                        className   = "mr-1 cursor-pointer" 
                                                    />
                                                </div>
                                            : null
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

                    {!props.report && props.report != null && <Skeleton height={60} count={3} style={{ marginBottom: "10px" }}/>}
                    {!props.report && props.report === null && <CustomTableBodyEmpty/>}
                </CustomTable>
            </Fragment>
        : <CustomTableNotAuthorized/>
    );
};

export default Report;