import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Eye } from "react-feather";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import Avatar from "../../components/widgets/avatar";
import CustomTable from "../../components/widgets/custom-table";
import CustomTableBody from "../../components/widgets/custom-table/CustomTableBody";
import CustomTableBodyEmpty from "../../components/widgets/custom-table/CustomTableBodyEmpty";
import { ModalBase } from "../../components/widgets/modals-base";
import 'jspdf-autotable';

import logoLight                                    from "../../assets/images/logo/logo_light.png";
import moment               from "moment";

const DetailAnalysis = (props) => {

    const {
        queryData,
        setDetailFilter,
        isDetailAnalysisVisible, 
        setIsDetailAnalysisVisible,
        setIsDetailNewsAnalysisVisible,
    }                               = props;


    const [type, setType]           = useState(null);
    const [media, setMedia]         = useState(null);
    const [content, setContent]     = useState(null);
    const [sentiment, setSentiment] = useState({positif : 0, negatif : 0, netral : 0});
    const [exportBody, setExportBody] = useState(null);

    const headerTableLocation = [
        {
            title: "No.",
            size: 1
        },
        {
            title: "Media",
            size: 6
        },
        {
            title: "Jumlah Berita",
            size: 3
        },
        {
            title: "Aksi",
            size: 2
        },
    ]

    const headerTableMedia = [
        {
            title: "No.",
            size: 1
        },
        {
            title: "Media",
            size: 4
        },
        {
            title: "Detail",
            size: 2
        },
        {
            title: "Jumlah Berita",
            size: 2
        },
        {
            title: "Negatif",
            size: 1
        },
        {
            title: "Positif",
            size: 1
        },
        {
            title: "Netral",
            size: 1
        },
    ]

    //Chart
    const [pieData, setPieData]     = useState({
        labels: ['Diterima', 'Ditolak'],
        datasets: [
            {
                data: [10, 20],
                backgroundColor: [
                    'rgb(254, 1, 127)',
                    'rgb(65, 186, 255)'
                ]
            }
        ]
    });

    const [barData, setBarData]     = useState({
        labels: [ 'Okt 20', 'Nov 20'],
        datasets: [
            {
                backgroundColor: 'rgb(57, 167, 229)',
                data: [50, 100]
            },
            
        ]
    });

    const options = {
        maintainAspectRatio : false,
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    usePointStyle: true
                }
            },
            tooltip: {
                enabled:true,
            }
        },
        title: {
            display: true,
        },
        layout: {
            padding: {
                left: 10,
                right: 10,
                bottom: 10
            }
        },
        scales: {
            x: {
                display: false,
                
            },
            y: {
                display: false,
            }
        }
        
    };

    const options2 = {
        maintainAspectRatio : false,
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'bottom',
                labels: {
                    usePointStyle: true
                }
            },
            tooltip: {
                enabled:true,
            }
        },
        title: {
            display: true,
        },
        layout: {
            padding: {
                left: 10,
                right: 10,
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                },
                grid: {
                    display: false
                }
            },
            y: {
                display: true,
            }
        }
        
    };

    const getData = () => {

        //set Sentiment
        let negatif= 0, positif= 0, netral= 0;
        let location_label = [], location_value = [];

        queryData.Payload.sentiment.list.map((data) => {
            if(data.value === 'netral'){
                netral = data.frequency;
            }else if(data.value === 'positif'){
                positif = data.frequency;
            }else{
                negatif = data.frequency;
            }
        });

        if("place" in queryData.Payload){

            //set location
            queryData.Payload.place.list.map((data => {
                if(location_label.length < 9){
                    location_label.push(data.value);
                    location_value.push(data.frequency);
                }
            }))
        }

        if(queryData.result.query.by === "location"){
            let data_ = [];

            queryData.Payload.media.list.map((data,index) => (
                data_.push([index+1,data.value,data.frequency])
            ))

            setExportBody(data_);
        }else{
            let data_ = [];

            queryData.Payload.media.list.map((data,index) => (
                data_.push([
                    index+1,
                    data.value,
                    data.frequency,
                    queryData.Payload.content != null ? queryData.Payload.content.list.filter((data2) => data2.media === data.value && data2.sentiment === "negatif").length : 0,
                    queryData.Payload.content != null ? queryData.Payload.content.list.filter((data2) => data2.media === data.value && data2.sentiment === "positif").length : 0,
                    queryData.Payload.content != null ? queryData.Payload.content.list.filter((data2) => data2.media === data.value && data2.sentiment === "netral").length : 0,
                ])
            ))

            setExportBody(data_);
        }

        //set type
        setType(queryData.result.query.by);
        setMedia(queryData.Payload.media.list);
        setContent(queryData.Payload.content);
        setSentiment({positif : positif, negatif : negatif, netral : netral});

        setPieData({
            labels: ['Negatif', 'Positif', 'Netral'],
            datasets: [
                {
                    data: [negatif, positif, netral ],
                    backgroundColor: [
                        'rgb(254, 1, 127)',
                        'rgb(65, 186, 255)',
                        'rgb(35,62,249)',
                    ]
                }
            ]
        });

        setBarData({
            labels: location_label,
            datasets: [
                {
                    backgroundColor: [
                        'rgb(254, 1, 127)',
                        'rgb(65, 186, 255)',
                        'rgb(35,62,249)',
                        'rgb(246,98,99)',
                        'rgb(250,200,0)'
                    ],
                    data: location_value
                },
                
            ]
        });
    };

    const addWatermark = (doc) => {

        var totalPages = doc.internal.getNumberOfPages();

        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.addImage(logoLight, 'PNG', 245, 190, 35, 10);
        }

        return doc;
    };

    const exportData = () => {

        const headerMedia    = ["No.","Media","Jumlah Berita","Negatif","Positif","Netral"];
        const headerLocation = ["No.","Media","Jumlah Berita"];
        
        let doc = new jsPDF({
            orientation: "landscape",
        });

        let title = `Hasil Analisi Dengan Judul : ${queryData != null ? queryData.result.name : null}`;
        
        doc.text(title, 145, 20, null, null, "center");
        doc.setFontSize(12);
        doc.text('Tanggal: '+ moment().format('LL'), 145, 27, null, null, "center");

        doc.autoTable({
            startY          : 35,
            head            : [type != null && type === 'location' ? headerLocation : headerMedia],
            body            : exportBody,
            styles          : { cellWidth: 'auto', minCellWidth: 30 },
            columnStyles    : { 0: { cellWidth: 10 } },
            headStyles      : {
                fillColor: [23, 97, 56],
            },
            margin:         { top: 30, bottom: 25 }
        });

        let finalY = doc.lastAutoTable.finalY;
        doc.text('Kesimpulan: ', 15, finalY+12, );
        doc.text(`Berdasarkan data yang didapat jumlah keselurahan data adalah ${content != null ? content.size : null}`,15, finalY+20);
        doc.text(`Dan data diatas memiliki 3 Sentiment Yaitu : `,15, finalY+26);
        doc.text(`Sentiment Positif Sebanyak ${sentiment.positif}`, 15, finalY+32);
        doc.text(`Sentiment Negatif Sebanyak ${sentiment.negatif} dan`, 15, finalY+38);
        doc.text(`Sentiment Netral  Sebanyak ${sentiment.netral}`, 15, finalY+43);


        doc = addWatermark(doc);

        window.open(doc.output('bloburl'), '_blank');
        return doc;
    };

    useEffect(() => {
        if(queryData != null){
            getData();
        }
    }, [queryData]);

    return (
        <>
            <ModalBase
                size    = "lg"
                show    = {isDetailAnalysisVisible}
                title   = "Detail Analisis"
                footer  = {
                    <Button 
                        color="primary"
                        onClick = {() => {exportData()}}
                    >
                        Export
                    </Button>
                }
                setShow = {(par) => {setIsDetailAnalysisVisible(par)}}
            >
                {
                    type != null &&
                    type === 'location'?
                        <>
                            <CustomTable
                                header = {headerTableLocation}
                            >
                                {
                                    media != null ? 
                                        media.map((data,index) => (
                                            <CustomTableBody>
                                                <Col md={1}> 
                                                    {index+1}
                                                </Col>
                                                <Col md={6}> 
                                                    <Avatar 
                                                        className = "mr-1"
                                                        img = {`https://logo.clearbit.com/${data.value}`}
                                                    />
                                                    {data.value}
                                                </Col>
                                                <Col md={3}> 
                                                    {data.frequency}
                                                </Col>
                                                <Col md={2}> 
                                                    <Eye 
                                                        size        = {20} 
                                                        onClick     = {() => { setDetailFilter(data.value); setIsDetailNewsAnalysisVisible(true)}} 
                                                        className   = "mr-2 cursor-pointer"
                                                    />
                                                </Col>
                                            </CustomTableBody>
                                        ))
                                    :
                                        <CustomTableBodyEmpty/>
                                }
                            </CustomTable>

                            <Row className="mt-2 mb-1">
                                <Col md={12}>
                                    <h4>
                                        Hasil Data :
                                    </h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={5}>
                                    <Card>
                                        <CardBody>
                                            <Pie
                                                data    = {pieData}
                                                options = {options}
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={7}>
                                    <Card>
                                        <CardBody>
                                            <Bar
                                                data    = {barData}
                                                options = {options2}
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Row className="mt-2 mb-1">
                                <Col md={12}>
                                    <h4>
                                        Kesimpulan :
                                    </h4>
                                    <p>
                                        Berdasarkan data yang didapat jumlah keselurusan data adalah sebanyak <strong>{content != null ? content.size : null}</strong>&nbsp;
                                        Dan data diatas memiliki <strong>3 Sentiment</strong> yaitu <strong>Positif {sentiment.positif}</strong>, <strong>Negatif {sentiment.negatif}</strong>, dan <strong> Netral {sentiment.netral}</strong>.
                                    </p>
                                </Col>
                            </Row>
                        </>
                    :
                        <>
                            <CustomTable
                                header = {headerTableMedia}
                            >
                                {
                                    media != null ? 
                                        media.map((data,index) => (
                                            <CustomTableBody>
                                                <Col md={1}> 
                                                    {index+1}
                                                </Col>
                                                <Col md={4}> 
                                                    <Avatar 
                                                        className = "mr-1"
                                                        img = {`https://logo.clearbit.com/${data.value}`}
                                                    />
                                                    {data.value}
                                                </Col>
                                                <Col md={2}> 
                                                    <Eye 
                                                        size        = {20} 
                                                        onClick     = {() => { setDetailFilter(data.value); setIsDetailNewsAnalysisVisible(true)}} 
                                                        className   = "mr-2 cursor-pointer"
                                                    />
                                                </Col>
                                                <Col md={2}> 
                                                    {data.frequency}
                                                </Col>
                                                <Col md={1}>
                                                    {content != null ? content.list.filter((data2) => data2.media === data.value && data2.sentiment === "negatif").length : 0}
                                                </Col>
                                                <Col md={1}>
                                                    {content != null ? content.list.filter((data2) => data2.media === data.value && data2.sentiment === "positif").length : 0}
                                                </Col>
                                                <Col md={1}>
                                                    {content != null ? content.list.filter((data2) => data2.media === data.value && data2.sentiment === "netral").length : 0}
                                                </Col>
                                            </CustomTableBody>
                                        ))
                                    :
                                        <CustomTableBodyEmpty/>
                                }
                            </CustomTable>

                            <Row className="mt-2 mb-1">
                                <Col md={12}>
                                    <h4>
                                        Hasil Data :
                                    </h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={5}>
                                    <Card>
                                        <CardBody>
                                            <Pie
                                                data    = {pieData}
                                                options = {options}
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={7}>
                                    <h4>
                                        Kesimpulan :
                                    </h4>
                                    <p>
                                        Berdasarkan data yang didapat jumlah keselurusan data adalah sebanyak <strong>{content != null ? content.size : null}</strong>&nbsp;
                                        Dan data diatas memiliki <strong>3 Sentiment</strong> yaitu <strong>Positif {sentiment.positif}</strong>, <strong>Negatif {sentiment.negatif}</strong>, dan <strong> Netral {sentiment.netral}</strong>.
                                    </p>
                                </Col>
                            </Row>
                        </>
                }
                
            </ModalBase>

        </>
    )
}

export default DetailAnalysis;