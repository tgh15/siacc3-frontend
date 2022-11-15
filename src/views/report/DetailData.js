import { Fragment, useEffect, useState }        from "react"
import { Card, CardBody, CardText, Col,  Row }  from "reactstrap"
import CustomTable                              from "../../components/widgets/custom-table"
import CustomTableBody                          from "../../components/widgets/custom-table/CustomTableBody"
import CustomTableBodyEmpty                     from "../../components/widgets/custom-table/CustomTableBodyEmpty"
import Helper                                   from "../../helpers"
import dataDetails                              from "./data-details"
import DoughnutChart                            from "./doughnut-chart"



const headerTable = [
    {
        title: "No.",
        size: 1
    },
    {
        title: "Isi Berita",
        size: 3,
    },
    {
        title: "Tanggal Publikasi",
        size: 2
    },
    {
        title: "Jumlah Suka Pimpinan",
        size: 2
    },
    {
        title: "Jumlah Suka Agen",
        size: 2
    },
    {
        title: "Jumlah Komentar Pimpinan",
        size: 2
    }
]

const DetailData = (props) => {

    const {
        detailReport,
        selectedReport,
        selectForwardChat,
        isDetailResultsVisible,
        setIsDetailResultsVisible,
    }                                        = props;

    const {
        formatDate
    }                                        = Helper;
    
    return (
        <Fragment>
            <div>
                <Card className="bg-header" bodyStyle={{ padding: '0px' }}>
                    <CardBody>
                        <Row>
                            <Col lg={1} md={24} sm={32}>
                                No.
                            </Col>
                            {
                                props.detailReport != null && "headers" in props.detailReport && props.detailReport.headers.length > 0 ?
                                    props.detailReport.headers.map((data) => (
                                        <Col
                                            // style={{ wordWrap: 'break-word', wordBreak: 'break-all', wordSpacing: '100vw' }}
                                            md={
                                                data.report_content.id == 1 ?
                                                        // isi berita
                                                        4
                                                    :
                                                        data.report_content.id == 2 ?
                                                            // tanggal publikasi
                                                            2
                                                        :
                                                            data.report_content.id == 3 ?
                                                                // jumlah suka pimpinan
                                                                2
                                                            :
                                                                data.report_content.id == 4 ?
                                                                    // jumlah komentar pimpinan
                                                                    2
                                                                :
                                                                    data.report_content.id == 5 ?
                                                                        // jumlah komentar agen
                                                                        2
                                                                    :
                                                                        data.report_content.id == 6 ?
                                                                            // jumlah penonton
                                                                            2
                                                                        :
                                                                            data.report_content.id == 7 ?
                                                                                // kategori
                                                                                2
                                                                            :
                                                                                data.report_content.id == 8 ?
                                                                                    // nama agen 
                                                                                    3
                                                                                :
                                                                                    data.report_content.id == 9 ?
                                                                                        // satuan kerja
                                                                                        2
                                                                                    :
                                                                                        data.report_content.id == 10 ?
                                                                                            // jabatan
                                                                                            3
                                                                                        :
                                                                                            data.report_content.id == 11 ?
                                                                                                // jumlah berita di publikasi
                                                                                                2
                                                                                            :   
                                                                                                data.report_content.id == 12 ?
                                                                                                    //jumlah berita di arsip
                                                                                                    2
                                                                                                :
                                                                                                    data.report_content.id == 13 ?
                                                                                                        //jumlah berita ke pimpinan
                                                                                                        2
                                                                                                    :
                                                                                                        data.report_content.id == 14 ?
                                                                                                            //jumlah agent 
                                                                                                            2
                                                                                                        :
                                                                                                            null
                                                                                                        
                                                                                                    

                                            }
                                        >
                                            {
                                                data.report_content.name
                                            }
                                        </Col>
                                    ))
                                : null
                            }
                        </Row>
                    </CardBody>

                </Card>
                {
                    props.detailReport != null && props.detailReport.agent_reports != null ?
                        props.detailReport.agent_reports.map((data, index) => (
                            <Card className="bg-content pb-2">
                                <CardBody>
                                    <Row gutter={10}>
                                        <Col md={1}>
                                            {index + 1}
                                        </Col>

                                        {
                                            props.detailReport != null && props.detailReport.headers.length > 0 ?
                                                props.detailReport.headers.map((dataHeader) => (
                                                    <Col
                                                        md={
                                                            dataHeader.report_content.id == 1 ?
                                                                    // isi berita
                                                                    4
                                                                :
                                                                    dataHeader.report_content.id == 2 ?
                                                                        // tanggal publikasi
                                                                        2
                                                                    :
                                                                        dataHeader.report_content.id == 3 ?
                                                                            // jumlah suka pimpinan
                                                                            2
                                                                        :
                                                                            dataHeader.report_content.id == 4 ?
                                                                                // jumlah komentar pimpinan
                                                                                2
                                                                            :
                                                                                dataHeader.report_content.id == 5 ?
                                                                                    // jumlah komentar agen
                                                                                    2
                                                                                :
                                                                                    dataHeader.report_content.id == 6 ?
                                                                                        // jumlah penonton
                                                                                        2
                                                                                    :
                                                                                        dataHeader.report_content.id == 7 ?
                                                                                            // kategori
                                                                                            2
                                                                                        :
                                                                                            dataHeader.report_content.id == 8 ?
                                                                                                // nama agen 
                                                                                                3
                                                                                            :
                                                                                                dataHeader.report_content.id == 9 ?
                                                                                                    // satuan kerja
                                                                                                    2
                                                                                                :
                                                                                                    dataHeader.report_content.id == 10 ?
                                                                                                        // jabatan
                                                                                                        3
                                                                                                    :
                                                                                                        dataHeader.report_content.id == 11 ?
                                                                                                            // jumlah berita di publikasi
                                                                                                            2
                                                                                                        :   
                                                                                                            dataHeader.report_content.id == 12 ?
                                                                                                                //jumlah berita di arsip
                                                                                                                2
                                                                                                            :
                                                                                                                dataHeader.report_content.id == 13 ?
                                                                                                                    //jumlah berita ke pimpinan
                                                                                                                    2
                                                                                                                :
                                                                                                                    dataHeader.report_content.id == 14 ?
                                                                                                                        //jumlah agent 
                                                                                                                        2
                                                                                                                    :
                                                                                                                        null
                                                                                                                    
                                                                                                                
            
                                                        }
                                                    >
                                                        {
                                                            dataHeader.report_content.id == 1 ?
                                                                data.when_+' '+'bertempat di '+ (data.where != undefined ? data.where.replace(/[.]+$/g,"") : data.where)  +". "+data.who+' '+ (data.what != undefined ? data.what.replace(/[.]+$/g,"") : data.what )+'. '+data.why+'. '+ (data.how != undefined ? data.how.replace(/[.]+$/g,"")+ '.' : data.how)
                                                            :
                                                                dataHeader.report_content.id == 2 ?
                                                                    formatDate(data.publication_date)
                                                                :
                                                                    dataHeader.report_content.id == 3 ?
                                                                        data.rating
                                                                        :
                                                                            dataHeader.report_content.id == 4 ?
                                                                                data.leader_comments
                                                                            :
                                                                                dataHeader.report_content.id == 5 ?
                                                                                    data.agent_comments
                                                                                    :
                                                                                        dataHeader.report_content.id == 6 ?
                                                                                            data.viewers
                                                                                        :
                                                                                            dataHeader.report_content.id == 7 ?
                                                                                                data.categories
                                                                                            :
                                                                                                dataHeader.report_content.id == 8 ?
                                                                                                    data.employee
                                                                                                :
                                                                                                    dataHeader.report_content.id == 9 ?
                                                                                                        data.workunit
                                                                                                    :
                                                                                                        dataHeader.report_content.id == 10 ?
                                                                                                            data.position
                                                                                                        :
                                                                                                            dataHeader.report_content.id == 11 ?
                                                                                                                data.publication_count
                                                                                                            :
                                                                                                                dataHeader.report_content.id == 12 ?
                                                                                                                    data.archive_count
                                                                                                                :
                                                                                                                    dataHeader.report_content.id == 13 ?
                                                                                                                        data.forward_count
                                                                                                                    :
                                                                                                                        dataHeader.report_content.id == 14 ?
                                                                                                                            data.agent_count
                                                                                                                        :
                                                                                                                            null
                                                                                                                
                                                        }
                                                    </Col>
                                                ))
                                            : 
                                                <CustomTableBodyEmpty/>
                                        }
                                    </Row>
                                </CardBody>
                            </Card>
                        ))
                    : null
                }
            </div>
            
            <Row>
                {
                    detailReport != null && detailReport.chart != null ?
                        detailReport.chart.map((data) => (
                            <Col className="gutter-row mt-1" md={4}>
                                <Card className="text-center" style={{ border: '1px solid #d9dbe9', borderRadius: '7px' }}>
                                    <CardText className="mt-1">{data.label}</CardText>
                                    <div>
                                        <DoughnutChart 
                                            chartData = {data.data}
                                        />
                                    </div>
                                </Card>
                            </Col>
                        ))
                    : null
                }
            </Row>

            {/* {
                detailReport != null && detailReport.agent_reports.length > 0  ?
                    <div className="my-2">
                        <b>Kesimpulan :</b>
                        <p className="m-0">Dari data diatas menunjukan rata-rata perbedaan jumlah berita disetiap satuan kerja adalah {Math.round(props.detailReport.conclusion.average_difference.percentage)} %</p>
                        <p className="m-0">Satuan kerja terbaik dengan jumlah rata-rata adalah { props.detailReport.conclusion.best_work_unit != null ? props.detailReport.conclusion.best_work_unit.name : null } </p>
                        <p className="m-0">Kategori dengan berita terbanyak adalah {props.detailReport.conclusion.most_report_categories != null ? props.detailReport.conclusion.most_report_categories.name : null} </p>
                        <p className="m-0">Jumlah berita dari tanggal {props.detailReport.conclusion.total_report != null ? Helper.dateIndo1(props.detailReport.conclusion.total_report.from_date) : null} s/d { props.detailReport.conclusion.total_report != null ? Helper.dateIndo1(props.detailReport.conclusion.total_report.till_date) : null} adalah { props.detailReport.conclusion.total_report != null ? props.detailReport.conclusion.total_report.total : null}</p>
                    </div>
                : null
            } */}

        </Fragment>
    )
}

export default DetailData