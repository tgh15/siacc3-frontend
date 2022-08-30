import { Fragment, useEffect, useState, useMemo }            from "react"
import { 
        Col, 
        Nav, 
        Row, 
        Card,
        Input,
        Label,
        Button, 
        TabPane, 
        NavItem, 
        NavLink, 
        CardBody,
        CardText,
        CardTitle,
        TabContent,
        InputGroup,
        Pagination,
        DropdownMenu,
        DropdownItem,
        PaginationItem,
        PaginationLink,
        DropdownToggle,
        InputGroupText,
        UncontrolledDropdown,
    }                                               from "reactstrap"
import { 
        Eye ,
        Search, 
        Sliders, 
        Download, 
    }                                               from "react-feather"
import { useParams, useHistory, useLocation }       from "react-router-dom";
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

import Circle                                       from "../../assets/icons/200.svg";
import Helper                                       from "../../helpers";
import Avatar                                       from "../../components/widgets/avatar";
import { ModalBase }                                from "../../components/widgets/modals-base";
import CustomToast                                  from "../../components/widgets/custom-toast";
import SearchCrawling                               from "../../components/widgets/crawling-components/SearchCrawling";
import CrawlingCreate                               from "../../components/widgets/crawling-components/CrawlingCreate";
import CrawlingSave                                 from "../../components/widgets/crawling-components/CrawlingSave";

import logoLight                                    from "../../assets/images/logo/logo_light.png";


function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

const CrawlingDataDetail = () => {
    let { id }                                      = useParams();
    let param                                       = useQuery();
    let history                                     = useHistory();

    //Export Excel
    const ExcelFile                                 = ReactExport.ExcelFile;
    const ExcelSheet                                = ReactExport.ExcelFile.ExcelSheet;

    const [body, setBody]                           = useState(null);
    const [header, setHeader]                       = useState(["No.","Berita/Konten", "Media", "Link", "Lokasi"]);


    const [data, setData]                           = useState(null);
    const [page, setPage]                           = useState(1);
    const [query, setQuery]                         = useState(null);
    const [media, setMedia]                         = useState(null);
    const [filter, setFilter]                       = useState(null);
    const [detail, setDetail]                       = useState(null);
    const [payload, setPayload]                     = useState(null);
    const [content, setContent]                     = useState(null);
    const [totalPage, setTotalPage]                 = useState(1);
    const [activeTab, setActiveTab]                 = useState('1');
    const [sentiment, setSentiment]                 = useState(null);
    const [filterMedia, setFilterMedia]             = useState(null);
    const [showSubmitForm, setShowSubmitForm]       = useState(false);
    const [showResultForm, setShowResultForm]       = useState(null);
    const [isDetailVisible, setIsDetailVisible]     = useState(false);

    const getQueryData = () => {

        let type = param.get("type");

        if(type == null){
            crawlingAPI.getQueryData(id).then(
                res => {
                    if(res.status === 200){
                        if(res.data.hasPayload === true){
                            setPage(1);
                            setData(res.data);
                            setQuery(res.data.query);
                            setPayload(res.data.Payload);
                        }
                    }else{
                        setContent(null);
                        setSentiment(null);
                    }
                },
                err => {
                    console.log('get query data crawling', err);
                }
            )
        }else{
            crawlingAPI.getResultData(id).then(
                res => {
                    if(res.status === 200){
                        if(res.data.hasPayload === true){
                            setPage(1);
                            setData(res.data);
                            setQuery(res.data.result.query)
                            setPayload(res.data.Payload);
                        }
                    }else{
                        setQuery(null)
                        setPayload(null);
                    }
                },
                err => {
                    console.log('get result all crawling', err);
                }
            )
        }
    }

    const restructured = () => {
        setPage(1);
        if(payload != null){
            let sentiment_ = {};

            //sentiment
            payload.sentiment.list.map((data) => {
                if(data.value === 'negatif'){
                    sentiment_['negatif'] = data.frequency;
                }

                if(data.value === 'positif'){
                    sentiment_['positif'] = data.frequency;
                }

                if(data.value === 'netral'){
                    sentiment_['netral'] = data.frequency;
                }
            })

            setSentiment(sentiment_);

            if(filterMedia === null || filterMedia.length < 1){
                setMedia(payload.media);
            }else{
                let filter_media_;
                filter_media_ = payload.media.list.filter((data) => (
                    data.value.toLowerCase().includes(filterMedia) 
                ))

                setMedia({
                    list : filter_media_,
                    size : filter_media_.length
                });
            }
            
            if(filter === null){   
                setContent(payload.content);
                setTotalPage(Math.ceil(payload.content.size/5));

                let data_ = [];

                payload.content.list.map((data,index) => (
                    data_.push([index+1 ,data.title, data.media, data.url, data.place.toString()])
                ))

                setBody(data_);

            }else{
                let filter_;

                if(filter.type === "media") {
                    filter_ = payload.content.list.filter((data) => (
                        data.media == filter.value
                    ))
                }else{
                    filter_ = payload.content.list.filter((data) => (
                        data.sentiment == filter.value
                    ))
                }

                setContent({
                    list : filter_,
                    size : filter_.length
                });

                setTotalPage(Math.ceil(filter_.length/5));

                let data_ = [];

                filter_.map((data,index) => (
                    data_.push([index+1 ,data.title, data.media, data.url, data.place.toString()])
                ))

                setBody(data_);
            }
        }
    }

    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab)
        }
    }

    const handleDetail = (data) => {
        setDetail(data);
        setIsDetailVisible(true);
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

    const createResult = (name) => {
        const formData = {
            query_id    : "result" in data ? data.result.query.id : data.query.id,
            name        : name.name,
            sentiment   : data.Payload.content.size,
            media       : data.Payload.media.size,
            organization: 0, 
        }

        crawlingAPI.createResult(formData).then(
            res => {
                if(res.status === 200){
                    CustomToast('success','Data crawling berhasil disimpan.');

                    history.push(`/crawling-data`);
                }
            },
            err => {
                console.log('create result crawling', err);
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

        let title = `Hasil Crawling Dengan Keyword : ${query != null ? query.keyword : null}`;
        
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

        let title = `Hasil Crawling Dengan Keyword : ${query != null ? query.keyword : null}`;

        const dataSet = [
            {
                columns : header,
                data    : body
            }
        ];
        
        return (
            <ExcelFile 
                filename = {title}
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

        let title = `Hasil Crawling Dengan Keyword : ${query != null ? query.keyword : null}`;
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
                                size: 30,
                                type: WidthType.PERCENTAGE,
                            },
                            children: [new Paragraph(data2[1])],
                        }),
                        new TableCell({
                            width: {
                                size: 20,
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
                                text: title,
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
        if(payload == null ){
            getQueryData();
        }else{
            restructured();
        }

    },[payload, filter, filterMedia]);

    return (
        <Fragment>

            {/* Detail Modal */}
            <ModalBase
                show            = {isDetailVisible}
                size            = {"lg"}
                title           = {detail != null ? detail.title : null}
                setShow         = {(par) => { setIsDetailVisible(par)}} 
                unmountOnClose  = {true}
            >
                {
                    detail != null ? 
                        <Fragment>
                            <p>{detail.full_article.slice(2).slice(0,-2)}</p>
                            <h5 className="mt-3 mb-2">{detail.media}</h5>
                        </Fragment>
                    :
                        null
                }
                
            </ModalBase>

            {/* Save Modal */}
            <CrawlingSave
                
                center              = {true}
                createResult        = {createResult}
                showResultForm      = {showResultForm}
                setShowResultForm   = {setShowResultForm}
            />

            <CrawlingCreate
                handleSubmit_       = {handleSubmit}
                showSubmitForm      = {showSubmitForm}
                setShowSubmitForm   = {setShowSubmitForm}
            />
                
            <SearchCrawling 
                status              = {3}
                setShowResultForm   = {setShowResultForm}
                setShowSubmitForm   = {setShowSubmitForm}
            />

            <h5 className="mt-2 mb-2">Riwayat Pencarian Data Crawling</h5>

            <Row className="d-flex">
                <Col md={4}>
                    <Card style={{height: '35vh'}}>
                        <CardBody>
                            <CardTitle>
                                <h5>Total Data Ditemukan: {query != null ? query.keyword : null}</h5>
                            </CardTitle>
                            <div 
                                style       = {{backgroundImage : `url(${Circle})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '200px', width: '100%',}}
                                className   = "mb-2 d-flex align-items-center justify-content-center"
                                onClick     = {() => {setFilter(null)}}
                            >
                                <h1 className="text-white">{ content != null ? content.size : 0 }</h1>
                            </div>
                            <CardText className="d-flex justify-content-center"><h4>Konten</h4></CardText>

                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card style={{height: '35vh'}}>
                        <CardBody>
                            <CardTitle className="d-flex justify-content-between">
                                <h5>Sentiment: {query != null ? query.keyword : null}</h5>
                                <h5>Total: { content != null ? content.size : 0 }</h5>
                            </CardTitle>

                            <Row>
                                <Col sm={4}>
                                    <div 
                                        style   = {{backgroundColor: '#FE017F', height: '175px', width: '100%', borderRadius: '10px', opacity: 0.9}}
                                        onClick = {() => {toggle('2'); setFilter({type: 'sentiment', value: 'negatif'})}}
                                    >
                                        <h3 style={{color: 'white', paddingTop: '15px', paddingLeft: '20px'}}>Negatif</h3>
                                        <div style={{textAlign: 'center', paddingTop: '30px'}}>
                                            <h2 style={{color: 'white'}}>{sentiment != null ? sentiment.negatif : 0}</h2>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={4}>
                                    <div 
                                        style   = {{backgroundColor: '#063EF9', height: '175px', width: '100%', borderRadius: '10px'}}
                                        onClick = {() => {toggle('3'); setFilter({type: 'sentiment', value: 'positif'})}}
                                    >
                                        <h3 style={{color: 'white', paddingTop: '15px', paddingLeft: '20px'}}>Positif</h3>
                                        <div style={{textAlign: 'center', paddingTop: '20px'}}>
                                            <h2 style={{color: 'white'}}>{sentiment != null ? sentiment.positif : 0}</h2>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={4}>
                                    <div 
                                        style   = {{backgroundColor: '#00A7E5', height: '175px', width: '100%', borderRadius: '10px'}}
                                        onClick = {() => {toggle('4'); setFilter({type: 'sentiment', value: 'netral'})}}
                                    >
                                        <h3 style={{color: 'white', paddingTop: '15px', paddingLeft: '20px'}}>Netral</h3>
                                        <div style={{textAlign: 'center', paddingTop: '20px'}}>
                                            <h2 style={{color: 'white'}}>{sentiment != null ? sentiment.netral : 0}</h2>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <h4 className="mt-1 text-center" style={{color: '#FE017F'}}>
                                        {sentiment != null ? parseInt((sentiment.negatif / (sentiment.negatif+sentiment.positif+sentiment.netral))*100) : 0} %
                                    </h4>
                                </Col>
                                <Col sm={4}>
                                    <h4 className="mt-1 text-center" style={{color: '#063EF9'}}>
                                        {sentiment != null ? parseInt((sentiment.positif / (sentiment.negatif+sentiment.positif+sentiment.netral))*100) : 0} %
                                    </h4>
                                </Col>
                                <Col sm={4}>
                                    <h4 className="mt-1 text-center" style={{color: '#00A7E5'}}>
                                        {sentiment != null ? parseInt((sentiment.netral / (sentiment.negatif+sentiment.positif+sentiment.netral))*100) : 0} %
                                    </h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}><h4 className="text-center" style={{color: '#FE017F'}}>Negatif</h4></Col>
                                <Col sm={4}><h4 className="text-center" style={{color: '#063EF9'}}>Positif</h4></Col>
                                <Col sm={4}><h4 className="text-center" style={{color: '#00A7E5'}}>Netral</h4></Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card style={{height: '35vh'}}>
                        <CardBody>
                            <CardTitle className="text-center">
                                <h5>Topik Terpopuler</h5>
                            </CardTitle>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md={8}>
                    <Nav className="mb-0" tabs>
                        {
                            filter != null ?
                                <Fragment>
                                {    
                                    filter.type === "sentiment" ?
                                        <Fragment>
                                            <NavItem style={{backgroundColor: '#fff', boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)', borderRadius: '0.428rem 0.428rem 0 0' }}>
                                                <NavLink
                                                    active      = {activeTab === '2' }
                                                    onClick     = {() => {toggle('2'); setFilter({type: 'sentiment', value:"negatif"})}}
                                                >
                                                    Negatif
                                                </NavLink>
                                            </NavItem>
                                            <NavItem style={{backgroundColor: '#fff', boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)', borderRadius: '0.428rem 0.428rem 0 0' }}>
                                                <NavLink
                                                    active      = {activeTab === '3' }
                                                    onClick     = {() => {toggle('3'); setFilter({type: 'sentiment', value:"positif"})}}
                                                >
                                                    Positif
                                                </NavLink>
                                            </NavItem>
                                            <NavItem style={{backgroundColor: '#fff', boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)', borderRadius: '0.428rem 0.428rem 0 0' }}>
                                                <NavLink
                                                    active      = {activeTab === '4' }
                                                    onClick     = {() => {toggle('4'); setFilter({type: 'sentiment', value:"netral"})}}
                                                >
                                                    Netral
                                                </NavLink>
                                            </NavItem>
                                        </Fragment>
                                    :
                                        null
                                }
                                {
                                    filter.type === "media" ? 
                                        <NavItem style={{backgroundColor: '#fff', boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)', borderRadius: '0.428rem 0.428rem 0 0' }}>
                                            <NavLink 
                                                active      = {activeTab === '5' }
                                                onClick     = {() => {toggle('5')}}
                                            >
                                                Media
                                            </NavLink>
                                        </NavItem>
                                    :
                                        null
                                }
                                </Fragment>
                            :
                                <NavItem style={{backgroundColor: '#fff', boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)', borderRadius: '0.428rem 0.428rem 0 0' }}>
                                    <NavLink 
                                        active      = {activeTab === '1' }
                                        onClick     = {() => {toggle('1')}}
                                    >
                                        Konten
                                    </NavLink>
                                </NavItem>
                        }
                        
                    </Nav>
                    <TabContent activeTab={activeTab}>

                        {/* Content Tab */}
                        <TabPane tabId='1'>
                            <Card style={{height: '75vh', borderRadius: '0 0 0.428rem 0.428rem'}}>
                                <CardBody>
                                    <Row>
                                        <Col md={6}>
                                            <h5>Total Pencarian Ditemukan: {content != null ? content.size : 0} Konten </h5>
                                        </Col>
                                        <Col md={6} className="d-flex justify-content-end">
                                            <UncontrolledDropdown className="mr-1">
                                                <DropdownToggle outline color='primary' size="sm">
                                                    <Download size={23}/> 
                                                    <span className="ml-1">Ekspor</span>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    {exportExcel()}
                                                    <DropdownItem tag='a' onClick = {() => exportWord()}>
                                                        Jadikan Berkas Word
                                                    </DropdownItem>
                                                    <DropdownItem tag='a' onClick = {() => exportPDF()}>
                                                        Jadikan Berkas PDF
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            {/* <Button.Ripple className='btn-icon' color='primary'>
                                                <Sliders size={14} />
                                            </Button.Ripple> */}
                                        </Col>
                                    </Row>

                                    <Row className="mt-2 mx-1">
                                        <Col md={1}>No.</Col>
                                        <Col md={3}>Berita/Konten</Col>
                                        <Col md={3}>Media</Col>
                                        <Col md={3}>Link</Col>
                                        <Col md={2}>Lokasi</Col>
                                    </Row>

                                    {
                                        content != null ? 
                                            content.list.map((data, index) => (
                                                (page == 1 ? index < 5 : index+1 > page*5-5 && index < page*5)  ?
                                                    <Row
                                                        style       = {{ backgroundColor: '#F7F7FC', minHeight: '90px', borderRadius: '10px', marginBottom: '10px' }}
                                                        className   = "mt-1 mx-1"
                                                    >
                                                        <Col md={1} className="d-flex align-items-center">
                                                            {index+1}
                                                        </Col>
                                                        <Col md={3} className="d-flex align-items-center">
                                                            <p className="mb-0">
                                                                {data.title.substr(0, data.title.lastIndexOf('', 45))}
                                                                <br/>
                                                                <a className="text-primary" onClick={() => {handleDetail(data)}}>Lihat Detail...</a>
                                                            </p>
                                                        </Col>
                                                        <Col md={3} className="d-flex align-items-center">
                                                            <Avatar img={`https://logo.clearbit.com/${data.media}`} size="sm" className="mr-1" onError={Helper.fallbackImage_}/>
                                                            {data.media}
                                                        </Col>
                                                        <Col md={3} className="d-flex align-items-center text-break">
                                                            <a href={data.url} target="_blank">{data.url.substr(0, data.url.lastIndexOf('', 60))}</a>
                                                        </Col>
                                                        <Col md={2} className="d-flex align-items-center text-break">
                                                            {data.place.toString()}
                                                        </Col>
                                                    </Row>
                                                :
                                                    null
                                            ))
                                        :
                                            null
                                    }

                                    <Row className="mt-1">
                                        <Col md={12}>
                                            {
                                                query != null && content != null && content.list.length > 5 ? 
                                                    <div className="d-flex justify-content-end">
                                                        <Pagination className='d-flex mt-1'>
                                                            {
                                                                page == 1 ? 
                                                                    <PaginationItem
                                                                        disabled    = {true}
                                                                        className   = "prev-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                                :
                                                                    <PaginationItem
                                                                        onClick     = {() => {setPage(page-1)}}
                                                                        disabled    = {false}
                                                                        className   = "prev-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                            }
                                                            <PaginationItem active>
                                                                <PaginationLink>{page}</PaginationLink>
                                                            </PaginationItem>
                                                            <PaginationItem>
                                                                <PaginationLink>/</PaginationLink>
                                                            </PaginationItem>
                                                            <PaginationItem>
                                                                <PaginationLink>{totalPage}</PaginationLink>
                                                            </PaginationItem>
                                                            
                                                            {
                                                                page < totalPage ?  
                                                                    <PaginationItem 
                                                                        onClick     = {() => {setPage(page+1)}}
                                                                        disabled    = {false}
                                                                        className   = "next-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                                :
                                                                    <PaginationItem 
                                                                        disabled    = {true}
                                                                        className   = "next-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                            }
                                                        </Pagination>
                                                    </div>
                                                :
                                                    null
                                            }
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </TabPane>

                        {/* Negatif Tab */}
                        <TabPane tabId='2'>
                            <Card style={{height: '75vh', borderRadius: '0 0 0.428rem 0.428rem'}}>
                                <CardBody>
                                    <Row>
                                        <Col md={6}>
                                            <h5>Total Pencarian Ditemukan: {content != null ? content.size : 0} Konten </h5>
                                        </Col>
                                        <Col md={6} className="d-flex justify-content-end">
                                            <UncontrolledDropdown className="mr-1">
                                                <DropdownToggle outline color='primary' size="sm">
                                                    <Download size={23}/> 
                                                    <span className="ml-1">Ekspor</span>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    {exportExcel()}
                                                    <DropdownItem tag='a' onClick = {() => exportWord()}>
                                                        Jadikan Berkas Word
                                                    </DropdownItem>
                                                    <DropdownItem tag='a' onClick = {() => exportPDF()}>
                                                        Jadikan Berkas PDF
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            {/* <Button.Ripple className='btn-icon' color='primary'>
                                                <Sliders size={14} />
                                            </Button.Ripple> */}
                                        </Col>
                                    </Row>

                                    <Row className="mt-2 mx-1">
                                        <Col md={1}>No.</Col>
                                        <Col md={3}>Berita/Konten</Col>
                                        <Col md={3}>Media</Col>
                                        <Col md={3}>Link</Col>
                                        <Col md={2}>Lokasi</Col>
                                    </Row>

                                    {
                                        content != null ? 
                                            content.list.map((data, index) => (
                                                (page == 1 ? index < 5 : index+1 > page*5-5 && index < page*5)  ?
                                                    <Row
                                                        style       = {{ backgroundColor: '#F7F7FC', minHeight: '90px', borderRadius: '10px', marginBottom: '10px' }}
                                                        className   = "mt-1 mx-1"
                                                    >
                                                        <Col md={1} className="d-flex align-items-center">
                                                            {index+1}
                                                        </Col>
                                                        <Col md={3} className="d-flex align-items-center">
                                                            <p className="mb-0">
                                                                {data.title.substr(0, data.title.lastIndexOf('', 45))}
                                                                <br/>
                                                                <a className="text-primary" onClick={() => {handleDetail(data)}}>Lihat Detail...</a>
                                                            </p>
                                                        </Col>
                                                        <Col md={3} className="d-flex align-items-center">
                                                            <Avatar img={`https://logo.clearbit.com/${data.media}`} size="sm" className="mr-1" onError={Helper.fallbackImage_}/>
                                                            {data.media}
                                                        </Col>
                                                        <Col md={3} className="d-flex align-items-center text-break">
                                                            <a href={data.url} target="_blank">{data.url.substr(0, data.url.lastIndexOf('', 60))}</a>
                                                        </Col>
                                                        <Col md={2} className="d-flex align-items-center text-break">
                                                            {data.place.toString()}
                                                        </Col>
                                                    </Row>
                                                :
                                                    null

                                            ))
                                        :
                                            null
                                    }

                                    <Row className="mt-1">
                                        <Col md={12}>
                                            {
                                                query != null && content != null && content.list.length > 5 ? 
                                                    <div className="d-flex justify-content-end">
                                                        <Pagination className='d-flex mt-1'>
                                                            {
                                                                page == 1 ? 
                                                                    <PaginationItem
                                                                        disabled    = {true}
                                                                        className   = "prev-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                                :
                                                                    <PaginationItem
                                                                        onClick     = {() => {setPage(page-1)}}
                                                                        disabled    = {false}
                                                                        className   = "prev-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                            }
                                                            <PaginationItem active>
                                                                <PaginationLink>{page}</PaginationLink>
                                                            </PaginationItem>
                                                            <PaginationItem>
                                                                <PaginationLink>/</PaginationLink>
                                                            </PaginationItem>
                                                            <PaginationItem>
                                                                <PaginationLink>{totalPage}</PaginationLink>
                                                            </PaginationItem>
                                                            
                                                            {
                                                                page < totalPage ?  
                                                                    <PaginationItem 
                                                                        onClick     = {() => {setPage(page+1)}}
                                                                        disabled    = {false}
                                                                        className   = "next-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                                :
                                                                    <PaginationItem 
                                                                        disabled    = {true}
                                                                        className   = "next-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                            }
                                                        </Pagination>
                                                    </div>
                                                :
                                                    null
                                            }
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </TabPane>

                        {/* Positif Tab */}
                        <TabPane tabId='3'>
                            <Card style={{height: '75vh', borderRadius: '0 0 0.428rem 0.428rem'}}>
                                <CardBody>
                                    <Row>
                                        <Col md={6}>
                                            <h5>Total Pencarian Ditemukan: {content != null ? content.size : 0} Konten </h5>
                                        </Col>
                                        <Col md={6} className="d-flex justify-content-end">
                                            <UncontrolledDropdown className="mr-1">
                                                <DropdownToggle outline color='primary' size="sm">
                                                    <Download size={23}/> 
                                                    <span className="ml-1">Ekspor</span>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    {exportExcel()}
                                                    <DropdownItem tag='a' onClick = {() => exportWord()}>
                                                        Jadikan Berkas Word
                                                    </DropdownItem>
                                                    <DropdownItem tag='a' onClick = {() => exportPDF()}>
                                                        Jadikan Berkas PDF
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            {/* <Button.Ripple className='btn-icon' color='primary'>
                                                <Sliders size={14} />
                                            </Button.Ripple> */}
                                        </Col>
                                    </Row>

                                    <Row className="mt-2 mx-1">
                                        <Col md={1}>No.</Col>
                                        <Col md={3}>Berita/Konten</Col>
                                        <Col md={3}>Media</Col>
                                        <Col md={3}>Link</Col>
                                        <Col md={2}>Lokasi</Col>
                                    </Row>

                                    {
                                        content != null ? 
                                            content.list.map((data, index) => (
                                                (page == 1 ? index < 5 : index+1 > page*5-5 && index < page*5)  ?
                                                    <Row
                                                        style       = {{ backgroundColor: '#F7F7FC', minHeight: '90px', borderRadius: '10px', marginBottom: '10px' }}
                                                        className   = "mt-1 mx-1"
                                                    >
                                                        <Col md={1} className="d-flex align-items-center">
                                                            {index+1}
                                                        </Col>
                                                        <Col md={3} className="d-flex align-items-center">
                                                            <p className="mb-0">
                                                                {data.title.substr(0, data.title.lastIndexOf('', 45))}
                                                                <br/>
                                                                <a className="text-primary" onClick={() => {handleDetail(data)}}>Lihat Detail...</a>
                                                            </p>
                                                        </Col>
                                                        <Col md={3} className="d-flex align-items-center">
                                                            <Avatar img={`https://logo.clearbit.com/${data.media}`} size="sm" className="mr-1" onError={Helper.fallbackImage_}/>
                                                            {data.media}
                                                        </Col>
                                                        <Col md={3} className="d-flex align-items-center text-break">
                                                            <a href={data.url} target="_blank">{data.url.substr(0, data.url.lastIndexOf('', 60))}</a>
                                                        </Col>
                                                        <Col md={2} className="d-flex align-items-center text-break">
                                                            {data.place.toString()}
                                                        </Col>
                                                    </Row>
                                                :
                                                    null

                                            ))
                                        :
                                            null
                                    }

                                    <Row className="mt-1">
                                        <Col md={12}>
                                            {
                                                query != null && content != null && content.list.length > 5 ? 
                                                    <div className="d-flex justify-content-end">
                                                        <Pagination className='d-flex mt-1'>
                                                            {
                                                                page == 1 ? 
                                                                    <PaginationItem
                                                                        disabled    = {true}
                                                                        className   = "prev-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                                :
                                                                    <PaginationItem
                                                                        onClick     = {() => {setPage(page-1)}}
                                                                        disabled    = {false}
                                                                        className   = "prev-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                            }
                                                            <PaginationItem active>
                                                                <PaginationLink>{page}</PaginationLink>
                                                            </PaginationItem>
                                                            <PaginationItem>
                                                                <PaginationLink>/</PaginationLink>
                                                            </PaginationItem>
                                                            <PaginationItem>
                                                                <PaginationLink>{totalPage}</PaginationLink>
                                                            </PaginationItem>
                                                            
                                                            {
                                                                page < totalPage ?  
                                                                    <PaginationItem 
                                                                        onClick     = {() => {setPage(page+1)}}
                                                                        disabled    = {false}
                                                                        className   = "next-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                                :
                                                                    <PaginationItem 
                                                                        disabled    = {true}
                                                                        className   = "next-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                            }
                                                        </Pagination>
                                                    </div>
                                                :
                                                    null
                                            }
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </TabPane>

                        {/* Neutral Tab */}
                        <TabPane tabId='4'>
                            <Card style={{height: '75vh', borderRadius: '0 0 0.428rem 0.428rem'}}>
                                <CardBody>
                                    <Row>
                                        <Col md={6}>
                                            <h5>Total Pencarian Ditemukan: {content != null ? content.size : 0} Konten </h5>
                                        </Col>
                                        <Col md={6} className="d-flex justify-content-end">
                                            <UncontrolledDropdown className="mr-1">
                                                <DropdownToggle outline color='primary' size="sm">
                                                    <Download size={23}/> 
                                                    <span className="ml-1">Ekspor</span>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    {exportExcel()}
                                                    <DropdownItem tag='a' onClick = {() => exportWord()}>
                                                        Jadikan Berkas Word
                                                    </DropdownItem>
                                                    <DropdownItem tag='a' onClick = {() => exportPDF()}>
                                                        Jadikan Berkas PDF
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            {/* <Button.Ripple className='btn-icon' color='primary'>
                                                <Sliders size={14} />
                                            </Button.Ripple> */}
                                        </Col>
                                    </Row>

                                    <Row className="mt-2 mx-1">
                                        <Col md={1}>No.</Col>
                                        <Col md={3}>Berita/Konten</Col>
                                        <Col md={3}>Media</Col>
                                        <Col md={3}>Link</Col>
                                        <Col md={2}>Lokasi</Col>
                                    </Row>

                                    {
                                        content != null ? 
                                            content.list.map((data, index) => (
                                                (page == 1 ? index < 5 : index+1 > page*5-5 && index < page*5)  ?
                                                    <Row
                                                        style       = {{ backgroundColor: '#F7F7FC', minHeight: '90px', borderRadius: '10px', marginBottom: '10px' }}
                                                        className   = "mt-1 mx-1"
                                                    >
                                                        <Col md={1} className="d-flex align-items-center">
                                                            {index+1}
                                                        </Col>
                                                        <Col md={3} className="d-flex align-items-center">
                                                            <p className="mb-0">
                                                                {data.title.substr(0, data.title.lastIndexOf('', 45))}
                                                                <br/>
                                                                <a className="text-primary" onClick={() => {handleDetail(data)}}>Lihat Detail...</a>
                                                            </p>
                                                        </Col>
                                                        <Col md={3} className="d-flex align-items-center">
                                                            <Avatar img={`https://logo.clearbit.com/${data.media}`} size="sm" className="mr-1" onError={Helper.fallbackImage_}/>
                                                            {data.media}
                                                        </Col>
                                                        <Col md={3} className="d-flex align-items-center text-break">
                                                            <a href={data.url} target="_blank">{data.url.substr(0, data.url.lastIndexOf('', 60))}</a>
                                                        </Col>
                                                        <Col md={2} className="d-flex align-items-center text-break">
                                                            {data.place.toString()}
                                                        </Col>
                                                    </Row>
                                                :
                                                    null

                                            ))
                                        :
                                            null
                                    }

                                    <Row className="mt-1">
                                        <Col md={12}>
                                            {
                                                query != null && content != null && content.list.length > 5 ? 
                                                    <div className="d-flex justify-content-end">
                                                        <Pagination className='d-flex mt-1'>
                                                            {
                                                                page == 1 ? 
                                                                    <PaginationItem
                                                                        disabled    = {true}
                                                                        className   = "prev-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                                :
                                                                    <PaginationItem
                                                                        onClick     = {() => {setPage(page-1)}}
                                                                        disabled    = {false}
                                                                        className   = "prev-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                            }
                                                            <PaginationItem active>
                                                                <PaginationLink>{page}</PaginationLink>
                                                            </PaginationItem>
                                                            <PaginationItem>
                                                                <PaginationLink>/</PaginationLink>
                                                            </PaginationItem>
                                                            <PaginationItem>
                                                                <PaginationLink>{totalPage}</PaginationLink>
                                                            </PaginationItem>
                                                            
                                                            {
                                                                page < totalPage ?  
                                                                    <PaginationItem 
                                                                        onClick     = {() => {setPage(page+1)}}
                                                                        disabled    = {false}
                                                                        className   = "next-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                                :
                                                                    <PaginationItem 
                                                                        disabled    = {true}
                                                                        className   = "next-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                            }
                                                        </Pagination>
                                                    </div>
                                                :
                                                    null
                                            }
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </TabPane>

                        {/* Media Tab */}
                        <TabPane tabId='5'>
                            <Card style={{height: '75vh', borderRadius: '0 0 0.428rem 0.428rem'}}>
                                <CardBody>
                                    <Row>
                                        <Col md={6}>
                                            <h5>
                                                Total Pencarian Ditemukan: 
                                                    {filter != null ? <Avatar img={`https://logo.clearbit.com/${filter.value}`} size="sm" className="ml-1 mr-1" onError={Helper.fallbackImage_}/> : 0} {filter != null ? filter.value : null} </h5>
                                        </Col>
                                        <Col md={6} className="d-flex justify-content-end">
                                            <UncontrolledDropdown className="mr-1">
                                                <DropdownToggle outline color='primary' size="sm">
                                                    <Download size={23}/> 
                                                    <span className="ml-1">Ekspor</span>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    {exportExcel()}
                                                    <DropdownItem tag='a' onClick = {() => exportWord()}>
                                                        Jadikan Berkas Word
                                                    </DropdownItem>
                                                    <DropdownItem tag='a' onClick = {() => exportPDF()}>
                                                        Jadikan Berkas PDF
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            {/* <Button.Ripple className='btn-icon' color='primary'>
                                                <Sliders size={14} />
                                            </Button.Ripple> */}
                                        </Col>
                                    </Row>

                                    <Row className="mt-2 mx-1">
                                        <Col md={1}>No.</Col>
                                        <Col md={3}>Berita/Konten</Col>
                                        <Col md={3}>Media</Col>
                                        <Col md={3}>Link</Col>
                                        <Col md={2}>Lokasi</Col>
                                    </Row>

                                    {
                                        content != null ? 
                                            content.list.map((data, index) => (
                                                (page == 1 ? index < 5 : index+1 > page*5-5 && index < page*5)  ?
                                                    <Row
                                                        style       = {{ backgroundColor: '#F7F7FC', minHeight: '90px', borderRadius: '10px', marginBottom: '10px' }}
                                                        className   = "mt-1 mx-1"
                                                    >
                                                        <Col md={1} className="d-flex align-items-center">
                                                            {index+1}
                                                        </Col>
                                                        <Col md={3} className="d-flex align-items-center">
                                                            <p className="mb-0">
                                                                {data.title.substr(0, data.title.lastIndexOf('', 45))}
                                                                <br/>
                                                                <a className="text-primary" onClick={() => {handleDetail(data)}}>Lihat Detail...</a>
                                                            </p>
                                                        </Col>
                                                        <Col md={3} className="d-flex align-items-center">
                                                            <Avatar img={`https://logo.clearbit.com/${data.media}`} size="sm" className="mr-1" onError={Helper.fallbackImage_}/>
                                                            {data.media}
                                                        </Col>
                                                        <Col md={3} className="d-flex align-items-center text-break">
                                                            <a href={data.url} target="_blank">{data.url.substr(0, data.url.lastIndexOf('', 60))}</a>
                                                        </Col>
                                                        <Col md={2} className="d-flex align-items-center text-break">
                                                            {data.place.toString()}
                                                        </Col>
                                                    </Row>
                                                :
                                                    null
                                            ))
                                        :
                                            null
                                    }

                                    <Row className="mt-1">
                                        <Col md={12}>
                                            {
                                                query != null && content != null && content.list.length > 5 ? 
                                                    <div className="d-flex justify-content-end">
                                                        <Pagination className='d-flex mt-1'>
                                                            {
                                                                page == 1 ? 
                                                                    <PaginationItem
                                                                        disabled    = {true}
                                                                        className   = "prev-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                                :
                                                                    <PaginationItem
                                                                        onClick     = {() => {setPage(page-1)}}
                                                                        disabled    = {false}
                                                                        className   = "prev-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                            }
                                                            <PaginationItem active>
                                                                <PaginationLink>{page}</PaginationLink>
                                                            </PaginationItem>
                                                            <PaginationItem>
                                                                <PaginationLink>/</PaginationLink>
                                                            </PaginationItem>
                                                            <PaginationItem>
                                                                <PaginationLink>{totalPage}</PaginationLink>
                                                            </PaginationItem>
                                                            
                                                            {
                                                                page < totalPage ?  
                                                                    <PaginationItem 
                                                                        onClick     = {() => {setPage(page+1)}}
                                                                        disabled    = {false}
                                                                        className   = "next-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                                :
                                                                    <PaginationItem 
                                                                        disabled    = {true}
                                                                        className   = "next-item"
                                                                    >
                                                                        <PaginationLink>
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                            }
                                                        </Pagination>
                                                    </div>
                                                :
                                                    null
                                            }
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </TabPane>

                    </TabContent>
                </Col>
                <Col md={4}>
                    <Card style={{height : '79vh'}}>
                        <CardBody>
                            <Row>
                                <Col md={6} className="d-flex mt-1">
                                    <h5>Media: {media != null ? media.size : 0} Sumber</h5>
                                </Col>
                                <Col md={6} className="pr-2">
                                    <InputGroup className='mb-2'>
                                        <InputGroupText style={{borderRadius: '0.357rem 0 0 0.357rem'}}>
                                            <Search size={14} />
                                        </InputGroupText>
                                        <Input placeholder='search...' onKeyUp={(e)=> setFilterMedia(e.target.value)}/>
                                    </InputGroup>
                                </Col>
                                {/* <Col md={2}>
                                    <Button.Ripple className='btn-icon' color='primary'>
                                        <Sliders size={14} />
                                    </Button.Ripple>
                                </Col> */}
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <div 
                                        style       = {{height:'68vh', width: '100%', overflow:'auto'}}
                                    >
                                        {
                                            media != null ? 
                                                media.list.map((data) => (
                                                    <div 
                                                        style       = {{ backgroundColor: '#F7F7FC', width:'97%', borderRadius: '10px', marginBottom: '10px' }}
                                                    >
                                                        <Row>
                                                            <Col 
                                                                md          = {2}
                                                                className   = "d-flex align-items-center justify-content-center"
                                                            >
                                                                <Avatar img={`https://logo.clearbit.com/${data.value}`} size="sm" onError={Helper.fallbackImage_}/>
                                                            </Col>
                                                            <Col 
                                                                md          = {6} 
                                                                className   = "d-flex align-items-center"
                                                            >
                                                                {data.value}
                                                            </Col>
                                                            <Col 
                                                                md          = {2}
                                                                className   = "d-flex align-items-center"
                                                            >
                                                                {data.frequency}
                                                            </Col>
                                                            <Col 
                                                                md          = {1} 
                                                                className   = "text-center"
                                                            >
                                                                <Button.Ripple
                                                                    color       = 'flat'
                                                                    onClick     = {() => {toggle('5');setFilter({type: 'media', value : data.value})}}
                                                                    className   = 'btn-icon' 
                                                                >
                                                                    <Eye size={18}/>
                                                                </Button.Ripple>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ))
                                            :
                                                null
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </Fragment>
    )
}

export default CrawlingDataDetail