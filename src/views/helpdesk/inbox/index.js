import { Button, Card, CardBody, Col, CustomInput, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Row, UncontrolledDropdown } from "reactstrap";
import PerfectScrollbar from 'react-perfect-scrollbar';
import CardItem from "../utils/cardItem";
import { Sliders } from "react-feather";
import { useEffect, useRef, useState } from "react";
import EmptyChat from "../utils/emptychat";
import ChatActive from "../utils/chat-active";
import { HelpdeskTicketApi } from "../../../services/pages/helpdesk/ticket";
import Skeleton from "react-loading-skeleton";
import Helper from "../../../helpers";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomTablePaginate from "../../../components/widgets/custom-table/CustomTablePaginate";


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Inbox = () => {

    let query = useQuery();

    const [dataSelected, setDataSelected] = useState(null);
    const [datas, setDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(false);
    const [dataPagination, setDataPagination] = useState([]);

    const params = useRef({
        keyword: "",
        order_by: "desc",
        page: 1,
        is_saved : false
    })

    // function update data
    const updateData = (data) => {
        setIsLoading(true);
        HelpdeskTicketApi.update(data)
            .then(res => {
                setIsLoading(false);
                setDataSelected(null)
                getData();

            }, err => {
                setIsLoading(false);
                console.log(err);
            })
    }

    // function delete data
    const deleteData = (id) => {
        setIsLoading(true);
        HelpdeskTicketApi.remove(id).then(res => {
            setIsLoading(false);
            setDataSelected(null)
            getData();
        }
            , err => {
                setIsLoading(false);
                console.log(err);
            })
    }

    const { dateIndo } = Helper

    const getData = () => {
        setIsLoading(true);

        HelpdeskTicketApi.getAll(params.current).then(res => {
            setIsLoading(false);
            setDatas(res.data.data.filter(data => data.is_saved == false));
            setDataPagination(res.data.pagination)
        }, err => {
            setIsLoading(false);
            console.log(err);
        });
    }

    const getDetail = (id) => {
        setDataSelected(null)
        setLoadingMessage(true);
        HelpdeskTicketApi.getDetail(id).then(res => {
            setLoadingMessage(false);
            setDataSelected(res.data);
        }, err => {
            setLoadingMessage(false);
            console.log(err);
        })
    }

    const handleDropdown = (value, data) => {
        let dataForm = {}
        dataForm["id"] = data.id


        switch (value) {
            case "pin":
                dataForm["is_pinned"] = true
                break;
            case "done":
                dataForm["status"] = "done"
                break;
            case "process":
                dataForm["status"] = "process"
                break;
            case "queue":
                dataForm["status"] = "queue"
                break;
            case "save":
                dataForm["is_saved"] = true
                break;
            case "delete":
                return deleteData(data.id);

        }

        updateData(dataForm)


    }

    const onFilter = () => {
        getData();
    }

    useEffect(() => {
        getData();
        if (query.get("id")) {
            getDetail(query.get("id"));
        }
    }, []) 

    return (
        <Row>
            <Col md={8}>
                {!loadingMessage ? dataSelected != null ?
                    <ChatActive data={dataSelected} /> : <EmptyChat /> :
                    <Skeleton style={{
                        width: "100%",
                        height: "100%"
                    }} />}

            </Col>
            <Col md={4}>
                <Card outline style={{ height: "45rem" }}>
                    <CardBody>
                        <div className="d-flex mb-2">

                            <UncontrolledDropdown>
                                <DropdownToggle tag="div" className="align-items-center">
                                    <Button
                                        color="primary"
                                        size="sm"
                                        className="mr-2"
                                    >
                                        <Sliders size={14} />
                                    </Button>
                                </DropdownToggle>
                                <DropdownMenu style={{ width: "300px" }} right>
                                    <div className="m-1">
                                        <CustomInput
                                            id="select-filter"
                                            type="select"
                                            onChange={e => {
                                                params.current.order_by = e.target.value;
                                            }}>
                                            <option value="desc"> Terbaru </option>
                                            <option value="asc"> Terlama </option>
                                        </CustomInput>
                                        <hr />
                                        <Button
                                            color="primary"
                                            block={true}
                                            onClick={onFilter}
                                        >
                                            Filter
                                        </Button>
                                    </div>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <Input
                                placeholder="Cari..."
                                onChange={(e) => {
                                    params.current.keyword = e.target.value;
                                    params.current.order_by = "desc"
                                    getData()
                                }} />
                        </div>
                        <Row className="mb-1">
                            <CustomTablePaginate
                                size="5"
                                offsetSearch={7}
                                pagination={dataPagination}
                                onNext={() =>{
                                    params.current.page = params.current.page + 1
                                    getData()
                                }}
                                onPrev={() =>{
                                    params.current.page = params.current.page - 1
                                    getData()
                                }}
                            />
                        </Row>

                        <PerfectScrollbar style={{ height: "85%" }}>

                            {!isLoading ?
                                datas.length > 0 ?

                                    datas.map((data, index) => (
                                        <CardItem
                                            onClick={
                                                () => getDetail(data.id)
                                            }
                                            image={data.user?.photo}
                                            title={`${data.user?.name} -  ${data.user?.position}`}
                                            description={data.last_message}
                                            handlingStatus={data.status}
                                            time={dateIndo(data.updated_at)}
                                            type={data.report_kind?.name}
                                            onSelect={(value) => {
                                                handleDropdown(value, data)
                                            }}
                                            active={data.id == dataSelected?.id ? true : false} />
                                    ))


                                    : null
                                :
                                <Skeleton
                                    count={5}
                                    height={150}
                                />}



                        </PerfectScrollbar>
                    </CardBody>
                </Card>
            </Col>


        </Row>
    );
}

export default Inbox;