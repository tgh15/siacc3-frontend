import React, { Fragment, useEffect, useState }   from "react";
import { ModalBase }                    from "../modals-base";
import dashboardAPI                     from "../../../services/pages/dashboard";
import { useHistory }                   from 'react-router-dom'
import { Card, Row, Col, CardBody, Spinner }     from "reactstrap";
import Avatar                           from "../avatar";
import Helper                           from "../../../helpers";
import { ChevronLeft, ChevronRight } from "react-feather";



const DetailChartData = (props) => {

    const {
        detailChartData,
        detailChartToggle, 
        detailChartVisible,
    }   = props;

    const {
        fallbackImage_
    }   = Helper;

    const history                       = useHistory();

    const [page, setPage]               = useState(1);
    const [chartData, setChartData]     = useState(null);
    const [isLoading, setIsLoading]     = useState(true);

    const getDetailChartData = (currentPage) => {
        setIsLoading(true);
        dashboardAPI.getChartData(detailChartData.url+`&page=${currentPage}`).then(
            res => {
                if(res.status === 200 && res.data.agent_report != null){
                    setChartData(res.data);

                    setPage(res.data.pagination.current_page);

                }else{
                    setChartData(null);
                }
                setIsLoading(false);
            },
            err => {
                console.log(err, 'get detail chart data');
            }
        )
    };

    const handleDetail = (id) => {
        // history.push(`/beranda/${id}`);
    };

    useEffect(() => {

        if(detailChartData != null){
            getDetailChartData(page);
        };

    },[detailChartData]);

    return (
        <ModalBase 
            show    = {detailChartVisible} 
            size    = {'lg'}
            title   = {detailChartData != null ? detailChartData.title: null} 
            setShow = {detailChartToggle} 
            unmount = {true}
        >
            {
                !isLoading ? 
                    <Fragment>
                        <Row className="mb-1">
                            {
                                chartData != null && chartData.pagination && chartData.pagination.data_total > 10  && 
                                <Col sm={12} className="text-right">
                                    {(chartData.pagination.current_page * 10) - 9} - {chartData.pagination.current_page * 10} of {chartData.pagination.data_total}
                                    {chartData.pagination.has_previous ? <ChevronLeft className="cursor-pointer" onClick={() => {getDetailChartData(page-1)}} /> : <ChevronLeft className="text-muted" /> }
                                    {chartData.pagination.has_next ? <ChevronRight className="cursor-pointer" onClick={() => {getDetailChartData(page+1)}}  /> : <ChevronRight className="text-muted" />} 
                                </Col>
                            }
                        </Row>
                        <div style = {{overflow: 'scroll', height: '55vh'}}>
                            {
                                chartData != null && "agent_report" in chartData ? 
                                    chartData.agent_report.length > 0 ?
                                        chartData.agent_report.map((data, index) => (
                                            <Card 
                                                style={{ margin: '0 10px 20px 10px', minHeight: '80px'}} onClick={() => handleDetail(data.id)}
                                            >
                                                <CardBody>
                                                    <Row>
                                                        <Col lg={1}>
                                                            {page == 1 ? index+1 : (index+1)+(page*10) - 10}
                                                        </Col>
                                                        <Col lg={3} style={{height: '5px', widht:'5px'}}>
                                                            <div className="image-header">
                                                            <Avatar 
                                                                img         = {data.employee.photo == "" ? `https://ui-avatars.com/api/?name=${data ? data.employee.name : "UN"}&background=4e73df&color=fff&bold=true` : data.employee.photo} 
                                                                status      = 'online'
                                                                onError     = {fallbackImage_} 
                                                                imgWidth    = '40' 
                                                                imgHeight   = '40' 
                                                            />
                                                            </div>
                                                        </Col>
                                                        <Col lg={5}>
                                                            {data.employee !== undefined ? data.employee.name: ''}
                                                        </Col>
                                                        <Col lg={3}>
                                                            {data.title}
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        ))
                                    :
                                        'Kosong'
                                :
                                    null
                            }
                        </div>
                    </Fragment>

                :
                    <div style = {{height: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Spinner size="lg">
                            Loading...
                        </Spinner>
                    </div>
            }
        </ModalBase>
    )
};


export default DetailChartData;