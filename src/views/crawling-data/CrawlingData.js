import { Fragment, useEffect, useState }            from "react"
import { useHistory }                               from "react-router-dom"
import { Row, Col, DropdownItem}                    from "reactstrap"
import moment                                       from "moment"

//Export PDF
import jsPDF                                        from 'jspdf';
import 'jspdf-autotable';

//Export Excel
import ReactExport                                  from "react-export-excel";

//Export Word
import { saveAs }                                   from "file-saver";
import { 
        Table,
        Packer, 
        TextRun,
        Document, 
        TableRow,
        Paragraph, 
        WidthType,
        TableCell,
        AlignmentType,
    }                                               from "docx";

import crawlingAPI                                  from "../../services/pages/crawling-data";

import CustomToast                                  from "../../components/widgets/custom-toast";
import CrawlingSave                                 from "../../components/widgets/crawling-components/CrawlingSave";
import SearchCrawling                               from "../../components/widgets/crawling-components/SearchCrawling";
import CrawlingResult                               from "../../components/widgets/crawling-components/CrawlingResult";
import CrawlingCreate                               from "../../components/widgets/crawling-components/CrawlingCreate";

import logoLight                                    from "../../assets/images/logo/logo_light.png";
import CrawlingFilter from "../../components/widgets/crawling-components/CrawlingFilter";

const Crawlingdata = () => {

    let history                                     = useHistory();

    //Export Excel
    const ExcelFile                                 = ReactExport.ExcelFile;
    const ExcelSheet                                = ReactExport.ExcelFile.ExcelSheet;

    const [status, setStatus]                       = useState(1);
    const [result, setResult]                       = useState(null);
    const [loading, setLoading]                     = useState(false);
    const [selectedData, setSelectedData]           = useState(null);
    const [showFilterForm, setShowFilterForm]       = useState(false);
    const [showSubmitForm, setShowSubmitForm]       = useState(false);
    const [showDeleteForm, setShowDeleteForm]       = useState(false);
    const [showResultForm, setShowResultForm]       = useState(false);

    const [body, setBody]                           = useState(null);
    const [header, setHeader]                       = useState(["No.","Judul Crawling", "Kata Yang Dicari", "Jumlah Konten", "Tanggal Pembuatan"]);

    const getResultAll = () => {
        crawlingAPI.getResultAll('crawling').then(
            res => {
                if(res.status === 200){
                    setResult(res.data);
                    setStatus(1)

                    let data_ = [];

                    res.data.map((data,index) => (
                        data_.push([index+1,data.name, data.query.keyword, data.query.size, moment(data.created_at).format('LL')])
                    ))

                    setBody(data_);
                }else{
                    setResult(null);
                }

                setShowFilterForm(false);
            },
            err => {
                console.log('get result all crawling', err);
            }
        )
    }

    const getResultArchive = () => {
        crawlingAPI.getResultArchive('crawling').then(
            res => {
                if(res.status === 200){
                    setResult(res.data);
                    setStatus(2);
                }else{
                    setResult(null);
                }
            },
            err => {
                console.log('get result all crawling', err);
            }
        )
    }

    const deleteResult = (id) => {
        setLoading(true);
        crawlingAPI.deleteResult(id).then(
            res => {
                if(res.status === 200){
                    CustomToast("success", "Crawling Berhasil Dihapus.");
                    // message.success('Hasil pencarian crawling berhasil dihapus.');
                    getResultAll();

                    setLoading(false);
                    setSelectedData(null);
                    setShowDeleteForm(false);
                }else{
                    setLoading(false);
                    setSelectedData(null);
                }
            },
            err => {
                console.log('delete result crawling', err);
            }
        )
    }

    const handleDelete = (data) => {
        setSelectedData(data);
        setShowDeleteForm(true);
    }

    const handleSubmit = (data) => {
        const formData = {
            to          : data.to,    
            form        : data.form,
            size        : parseInt(data.size),
            keyword     : data.keyword,
        };

        crawlingAPI.createQuery(formData).then(
            res => {
                if(res.status === 200){
                    CustomToast('success','Tambah Crawling Data Berhasil');
                    setShowSubmitForm(false);
                    history.push(`/crawling-data/${res.data.id}`);
                }
            },
            err => {
                console.log('create query crawling', err);
            }
        )
    }

    const handleArchive = (id) => {
        const formData = {
            id : id,
            is_archive : true
        }

        crawlingAPI.updateResult(formData).then(
            res => {
                if(res.status === 200){
                    CustomToast('success','Data Crawling Berhasil Diarsipkan.');
                    getResultAll();
                }
            },
            err => {
                console.log('update result crawling', err);
            }
        )
    }

    const handleUnarchive = (id) => {
        const formData = {
            id          : id,
            is_archive  : false
        }

        crawlingAPI.updateResult(formData).then(
            res => {
                if(res.status === 200){
                    CustomToast('success','Arsip Data Crawling Dibatalkan.');
                    getResultArchive();
                }
            },
            err => {
                console.log('update result crawling', err);
            }
        )
    }

    const handleRename = (data) => {
        setSelectedData(data);
        setShowResultForm(true);
    }

    const handleFilter = (data) => {

        let filter_ = '';

        if(data.sort != undefined){
            filter_ += `&sort=${data.sort}`
        }

        if(data.start != undefined){
            filter_ += `&start=${moment(data.start[0]).format('YYYY-MM-DD')}`
        }

        if(data.end != undefined){
            filter_ += `&end=${moment(data.end[0]).format('YYYY-MM-DD')}`
        }

        crawlingAPI.getResultAll('crawling',filter_).then(
            res => {
                if(res.status === 200){
                    setResult(res.data);
                    setStatus(1)

                    let data_ = [];

                    res.data.map((data,index) => (
                        data_.push([index+1,data.name, data.query.keyword, data.query.size, moment(data.created_at).format('LL')])
                    ))

                    setBody(data_);
                }else{
                    setResult(null);
                }
                CustomToast("success", 'Filter data berhasil.');
                setShowFilterForm(false);
            },
            err => {
                console.log('get result all crawling', err);
            }
        )
    };

    const updateResult = (data) => {
        const formData = {
            id      : data.id,
            name    : data.name
        }

        crawlingAPI.updateResult(formData).then(
            res => {
                if(res.status === 200){
                    CustomToast('success','Data Crawling Berhasil Diubah.');
                    getResultAll();

                    setShowResultForm(false);
                }
            },
            err => {
                console.log('update result crawling', err);
            }
        )
    }

    const addWatermark = (doc) => {

        var totalPages = doc.internal.getNumberOfPages();

        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.addImage(logoLight, 'PNG', 245, 190, 35, 10);
        }

        return doc;
    };

    const exportPDF = () => {
        let doc = new jsPDF({
            orientation: "landscape",
        });

        let title   = "Daftar Hasil Crawling";
        
        doc.text(title, 145, 20, null, null, "center");
        doc.setFontSize(12);
        doc.text('Tanggal: '+ moment().format('LL'), 145, 27, null, null, "center");

        doc.autoTable({
            startY          : 35,
            head            : [header],
            body            : body,
            styles          : { cellWidth: 'auto', minCellWidth: 30 },
            columnStyles    : { 0: { cellWidth: 10 } },
            headStyles      : {
                fillColor: [23, 97, 56],
            },
            margin:         { top: 30, bottom: 25 }
        });

        doc = addWatermark(doc);

        window.open(doc.output('bloburl'), '_blank');
        return doc;
    };

    const exportExcel = () => {

        const dataSet = [
            {
                columns : header,
                data    : body
            }
        ];
        
        return (
            <ExcelFile 
                filename = "Export Daftar Crawling"
                element  = {
                    <DropdownItem tag='a'>
                        Jadikan Berkas Excel
                    </DropdownItem>
                }
            >
                <ExcelSheet dataSet={dataSet} name="Data"/>
            </ExcelFile>
        )
    };

    const exportWord = () => {

        let table_ = new Table({
            columnWidths: [5505, 6505],
            rows: [],
        })

        let rows_  = new TableRow({
            children: [],
        })
        table_.root.push(rows_);

        let cells_ = []
        header.map((data) => (
            cells_.push(
                new TableCell({
                    width: {
                        size: 10,
                        type: WidthType.PERCENTAGE,
                    },
                    children: [new Paragraph(data)],
                })
            )
        ))

        cells_.map((data) => (
            rows_.root.push(data)
        ))

        let rows_body = [];
        
        body.map((data2) => (
            rows_body.push(
                new TableRow({
                    children: [
                        new TableCell({
                            width: {
                                size: 10,
                                type: WidthType.PERCENTAGE,
                            },
                            children: [new Paragraph(data2[0].toString())],
                        }),
                        new TableCell({
                            width: {
                                size: 25,
                                type: WidthType.PERCENTAGE,
                            },
                            children: [new Paragraph(data2[1])],
                        }),
                        new TableCell({
                            width: {
                                size: 25,
                                type: WidthType.PERCENTAGE,
                            },
                            children: [new Paragraph(data2[2])],
                        }),
                        new TableCell({
                            width: {
                                size: 20,
                                type: WidthType.PERCENTAGE,
                            },
                            children: [new Paragraph(data2[3].toString())],
                        }),
                        new TableCell({
                            width: {
                                size: 20,
                                type: WidthType.PERCENTAGE,
                            },
                            children: [new Paragraph(data2[4])],
                        }),
                    ],
                })
            )
        ))

        rows_body.map((data) => (
            table_.root.push(data)
        ))

        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "Daftar Hasil Crawling",
                                size: 32,
                            }),
                            
                        ],
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `Tanggal : ${moment().format('LL')} `,
                                size: 28,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [],  // Just newline without text
                    }),
                    table_
                ],
            }],
        });
        
        // Used to export the file into a .docx file
        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, `Daftar Hasil Crawling ${moment().format('LL')}`);
        });
    }

    useEffect(() => {
        getResultAll();

        return(() => {
            setResult(null);
            setLoading(false);
            setSelectedData(null);
            setShowSubmitForm(false);
            setShowDeleteForm(false);
        })
    }, []);

    return (
        <Fragment>

            <CrawlingFilter
                getResultAll        = {getResultAll}
                handleFilter        = {handleFilter}
                showFilterForm      = {showFilterForm}
                setShowFilterForm   = {setShowFilterForm}
            />

            <CrawlingSave
                center              = {true}
                selectedData        = {selectedData}
                createResult        = {updateResult}
                showResultForm      = {showResultForm}
                setShowResultForm   = {setShowResultForm}
            />

            <CrawlingCreate
                handleSubmit_       = {handleSubmit}
                showSubmitForm      = {showSubmitForm}
                setShowSubmitForm   = {setShowSubmitForm}
            />

            <SearchCrawling
                status              = {status}
                exportPDF           = {exportPDF}
                exportWord          = {exportWord}
                exportExcel         = {exportExcel}
                getResultAll        = {getResultAll}
                getResultArchive    = {getResultArchive}
                setShowFilterForm   = {setShowFilterForm}
                setShowSubmitForm   = {setShowSubmitForm}
            />
            
            <Row className=" mt-2 mb-2">
                <Col>
                    {
                        status === 1 ?
                            <h5>List Hasil Crawling</h5>
                        :
                            <h5>List Arsip Data Crawling</h5>
                    }
                </Col>
            </Row>

            <CrawlingResult
                status              = {status}
                result              = {result}
                loading             = {loading}
                deleteResult        = {deleteResult}
                selectedData        = {selectedData}
                handleDelete        = {handleDelete}
                handleRename        = {handleRename}
                handleArchive       = {handleArchive}
                showDeleteForm      = {showDeleteForm}
                handleUnarchive     = {handleUnarchive}
                setShowDeleteForm   = {setShowDeleteForm}
            />
        </Fragment>
    )
}


export default Crawlingdata