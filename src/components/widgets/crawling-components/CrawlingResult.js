import { Fragment }             from "react";
import moment                   from "moment";
import { useHistory }           from "react-router-dom";

import { 
        Edit, 
        Share, 
        Trash2, 
        Archive, 
        AlignJustify, 
    }                           from "react-feather";
import { 
        Row,
        Col,
        Card, 
        CardBody,
        CardText,
        CardTitle,
        DropdownMenu,
        DropdownItem,
        DropdownToggle,
        UncontrolledDropdown,
    }                           from "reactstrap";

//Image
import Organization             from "../../../assets/icons/crawling-organization.svg";

//Components
import FormDelete               from "../form-delete/FormDelete";
import DoughnutChart            from "./DoughnutChart";
import CustomTableBodyEmpty     from "../custom-table/CustomTableBodyEmpty";


const CrawlingResult = (props) => {
    let history      = useHistory();

    //Props
    const {
        status,
        result, 
        loading,
        selectedData,
        deleteResult,
        handleDelete,
        handleRename,
        handleArchive,
        showDeleteForm,
        handleUnarchive,
        setShowDeleteForm,
    } = props;

    const handleDetail = (id) => {
        history.push(`/crawling-data/${id}?type=result`);
    };

    return(
        <Fragment>
            {/* Form Delete */}
            <FormDelete
                show        = {showDeleteForm}
                title       = "Hapus Crawling"
                setShow     = {(par) => setShowDeleteForm(par)}
                loading     = {loading} 
                onDelete    = {() => selectedData != null ? deleteResult(selectedData.id) : null}
                description = { selectedData != null ? `${selectedData.name}` : null}
            />

            <Row>
                {
                    result != null && result.length > 0 ?
                        result.map((data) => (
                            <Col md={4}>
                                <Card 
                                    id        = "list-crawling"
                                    className = 'mb-3' 
                                >
                                    <CardBody>
                                        <CardTitle className="d-flex justify-content-between">
                                            <h4 className="mt-1">{data.name}</h4>
                                            <UncontrolledDropdown>
                                                <div id="aksi-crawling">
                                                    <DropdownToggle 
                                                        size    = "sm"
                                                        color   = 'flat' 
                                                        outline 
                                                    >
                                                        <AlignJustify size={20}/>
                                                    </DropdownToggle>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownItem 
                                                        tag     = 'a' 
                                                        onClick = {() => {handleRename(data)}}
                                                    >
                                                        <Edit 
                                                            size      = {20} 
                                                            className = "mr-1"
                                                        />
                                                        Ganti Nama File
                                                    </DropdownItem>
                                                    {
                                                        status == 1 ?
                                                            <DropdownItem 
                                                                tag     = 'a' 
                                                                onClick = {() => {handleArchive(data.id)}}
                                                            >
                                                                <Archive 
                                                                    size      = {20} 
                                                                    className = "mr-1"
                                                                />
                                                                Arsipkan File
                                                            </DropdownItem>
                                                        :
                                                            <DropdownItem 
                                                                tag     = 'a' 
                                                                onClick = {() => {handleUnarchive(data.id)}}
                                                            >
                                                                <Archive 
                                                                    size      = {20} 
                                                                    className = "mr-1"
                                                                />
                                                                Batalkan Arsipkan File
                                                            </DropdownItem>
                                                    }
                                                    <DropdownItem 
                                                        tag  = 'a'
                                                        href = '/' 
                                                    >
                                                        <Share 
                                                            size      = {20} 
                                                            className = "mr-1"
                                                        />
                                                        Bagikan File
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        tag     = 'a' 
                                                        onClick = {() => {handleDelete(data)}}
                                                    >
                                                        <Trash2 
                                                            size      = {20} 
                                                            className = "mr-1"
                                                        />
                                                        Hapus
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </CardTitle>

                                        <div  
                                            style   = {{cursor: 'pointer'}}
                                            onClick = {() => handleDetail(data.id)} 
                                        >
                                            <CardText className="d-flex">
                                                Hasil Pencarian Untuk : <h5 className="ml-1">{data.query.keyword}</h5>
                                            </CardText>
                                            
                                            <div id="history-crawling">
                                                <DoughnutChart/>
                                            </div>

                                            <CardText className="text-center d-block">
                                                <img src={Organization} className="mb-1"/><br/>
                                                <strong>{data.sentiment}</strong><br/>
                                                Konten
                                            </CardText>

                                            <CardText className="d-flex">Dibuat : {moment(data.created_at).calendar()} </CardText>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))
                    :
                        <Col lg={12} md={12}>
                            <CustomTableBodyEmpty/>
                        </Col>
                }
            </Row>
        </Fragment>
    );
};

export default CrawlingResult;