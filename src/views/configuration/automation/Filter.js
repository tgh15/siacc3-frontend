import { Fragment, useEffect, useState } from "react";
import { Eye } from "react-feather";
import { Card, CardBody, Col, Spinner } from "reactstrap";
import { ModalBase } from "../../../components/widgets/modals-base";
import AutomationApi from "../../../services/pages/configuration/automation";
import FilterResult from "./FilterResult";


const Filter = props => {

    const {
        data,
        show,
        onClose,
        dataFilters
    } = props

    // state
    const [showDetail, setShowDetail] = useState(false);
    const [dataDetail, setDataDetail] = useState([]);
    const [loading, setLoading] = useState(false);

    // get Detail
    const getResult = (id, generated_at) => {
        setLoading(true);
        console.log(id, generated_at);
        AutomationApi.resultFilter({
            id: id,
            generated_at: generated_at
        }).then(res => {
            setDataDetail(res.data);
            setLoading(false);
            setShowDetail(!showDetail);
        }, err => {
            console.log(err);
            setLoading(false);
        });
    }

    const CardItem = ({ data }) => {
        return (
            <Card className="border-secondary mb-1">
                <CardBody className="row">
                    <Col md={2} className="text-center">
                        {data[0]}
                    </Col>
                    <Col md={8} className="text-center">
                        {data[1]}
                    </Col>
                    <Col md={2} className="text-center">
                        {data[2]}
                    </Col>
                </CardBody>
            </Card>
        )
    }


    return (
        <Fragment>
            {/* modal Detail */}
            <FilterResult
                show={showDetail}
                data={dataDetail}
                onClose={() => setShowDetail(!showDetail)}
            />

            {/* content */}
            <ModalBase
                title="Hasil Automation"
                show={show}
                setShow={() => onClose()}
                size="lg"
            >

                <p className="text-center mt-2">{data?.model?.title}</p>

                <CardItem
                    data={[
                        "ID",
                        "Tanggal Automation",
                        "Aksi"
                    ]}
                />

                {dataFilters && dataFilters.map((data, index) => (

                    <CardItem
                        data={[
                            data.automation_id,
                            data.generated_at,
                            !loading ? <Eye
                                className="cursor-pointer"
                                onClick={() => {
                                    getResult(data.automation_id, data.generated_at)
                                }} /> : <Spinner size="sm" />


                        ]}
                    />
                ))}

            </ModalBase>
        </Fragment>
    )


}

export default Filter;