import React, { Fragment, useEffect, useState }   from "react";
import { ModalBase }                    from "../modals-base";
import dashboardAPI                     from "../../../services/pages/dashboard";
import { Card, Row, Col, CardBody, Spinner }     from "reactstrap";
import Avatar                           from "../avatar";
import Helper                           from "../../../helpers";
import CustomTablePaginate from "../custom-table/CustomTablePaginate";



const DetailChartData = (props) => {

    const {
        detailChartData,
        detailChartToggle, 
        detailChartVisible,
    }   = props;

    const {
        fallbackImage_
    }   = Helper;

    const [page, setPage]               = useState(1);
    const [chartData, setChartData]     = useState(null);
    const [isLoading, setIsLoading]     = useState(true);
    const [pagination, setPagination]   = useState(null);

    const getDetailChartData = (currentPage) => {
        const params = {
            page : currentPage
        };

        setIsLoading(true);

        dashboardAPI.getChartData(detailChartData.url, detailChartData.body, params).then(
            res => {
                if(res.status === 200 && res.data.agent_report != null){
                    setPagination(res.data.pagination);
                    setChartData(res.data);
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
    useEffect(() => {

        if(detailChartData != null){
            getDetailChartData(page);
        };

    },[detailChartData]);

    return (
        <ModalBase 
            show    = {detailChartVisible} 
            size    = {'lg'}
            title   = {`Detail Data ${detailChartData != null ? detailChartData.title: null}`} 
            setShow = {detailChartToggle} 
            unmount = {true}
        >
            {
                !isLoading ? 
                    <Fragment>
                        <Row className="d-flex justify-content-end mb-2">
                            <CustomTablePaginate 
                                getData         = {(params) => { getDetailChartData(params.page)}}
                                pagination      = {pagination} 
                                offsetSearch    = {12} 
                            />
                        </Row>
                        <div>
                            <Card
                                style       = {{ backgroundColor: "transparent" }}
                                className   = "bg-transparant mb-0"
                            >
                                <CardBody>
                                    <Row>
                                        <Col md={1}>
                                            No.
                                        </Col>
                                        <Col md={3} style={{height: '5px', widht:'5px'}}>
                                            Foto Agen
                                        </Col>
                                        <Col md={5}>
                                            Nama Agen
                                        </Col>
                                        <Col md={3}>
                                            Judul Berita
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            {
                                chartData != null && "agent_report" in chartData ? 
                                    chartData.agent_report.length > 0 ?
                                        chartData.agent_report.map((data, index) => (
                                            <Card>
                                                <CardBody>
                                                    <Row>
                                                        <Col md={1}>
                                                            {page == 1 ? index+1 : (index+1)+(page*10) - 10}
                                                        </Col>
                                                        <Col md={3}>
                                                            {/* <div className="image-header"> */}
                                                                <Avatar 
                                                                    img         = {data.employee.photo == "" ? `https://ui-avatars.com/api/?name=${data ? data.employee.name : "UN"}&background=4e73df&color=fff&bold=true` : data.employee.photo} 
                                                                    status      = 'online'
                                                                    onError     = {fallbackImage_} 
                                                                />
                                                            {/* </div> */}
                                                        </Col>
                                                        <Col md={5}>
                                                            {data.employee !== undefined ? data.employee.name: ''}
                                                        </Col>
                                                        <Col md={3}>
                                                            <a href={`/beranda/detail/${data.id}`}>
                                                                {data.title}
                                                            </a>
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