import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import CustomTableBodyEmpty from "../../components/widgets/custom-table/CustomTableBodyEmpty";
import { ModalBase } from "../../components/widgets/modals-base";

const DetailAnalysisNews = (props) => {

    const {
        queryData,
        detailFilter,
        isDetailNewsAnalysisVisible,
        setIsDetailNewsAnalysisVisible,
    }                                       = props;

    const [content, setContent]             = useState(null)

    const getData = () => {
        let data_;

        data_ = queryData.Payload.content.list;

        setContent(
            data_.filter((data) => (
                data.media === props.detailFilter
            ))
        )
    };

    useEffect(() => {
        if(queryData != null){
            getData();
        }
    }, [detailFilter])

    return(
        <>
            <ModalBase
                show    = {isDetailNewsAnalysisVisible}
                size    = {"xl"}
                title   = {detailFilter != null ? `Detail Berita ${detailFilter}` : null}
                setShow = {setIsDetailNewsAnalysisVisible}
            >
                <Row>
                    {
                        content != null ?
                            content.map((data) => (
                                <Col md={4} className="d-flex">
                                    <Card>
                                        <CardBody>
                                            <CardTitle>
                                                <a href={data.url} className="cursor-pointer" target="_blank">
                                                    {data.title}
                                                </a>
                                            </CardTitle>
                                            <Row>
                                                <Col md={12}>
                                                    <p>Sentimen : {data.sentiment != undefined ? data.sentiment.toUpperCase() : null}</p>
                                                </Col>
                                                <Col md={12} className="text-justify">
                                                    {data.full_article.slice(2).slice(0,-2)}
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))
                        :
                            <CustomTableBodyEmpty/>
                    }
                </Row>
            </ModalBase>
        </>
    )
}

export default DetailAnalysisNews;