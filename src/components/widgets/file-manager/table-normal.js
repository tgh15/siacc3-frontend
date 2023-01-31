import { useRef, Fragment } from "react";

import {
    Col,
    Row,
    Card,
    CardBody,
    CustomInput,
    UncontrolledTooltip,
} from "reactstrap";


//Icon
import { AlertCircle, Folder, Share2, Star, Tag, Link } from "react-feather";
import DropdownTrash from "./DropdownTrash";

//Helper
import Helper from "../../../helpers";

//Components
import { DropdownFilemanagerTable } from "./DropdownTable"


const TableNormal = props => {
    //Ref
    const tooltipRef = useRef(null);

    //Props
    const {
        i,
        data,
        fileIcon,
        getInObject,
        onOpenFolder,
        selectedRows,
        selectRow,
        setDataSelected,
        setShareSelected,
        setImageSelected,
        modalShareToggle
    } = props;

    //Hekper
    const {
        getRoleByMenuStatus
    } = Helper;



    return (
        <Card
            id="table-manajemen"
            key={i}
            className="mb-1 cursor-pointer"
            onDoubleClick={() => { onOpenFolder(data) }}
        >
            <CardBody>
                <Row>
                    <Col md="4">
                        <Row>
                            <Col
                                md={1}
                                id="delete-file"
                            >
                                <CustomInput
                                    id={`file-${i}`}
                                    f-id="file"
                                    type="checkbox"
                                    onClick={() => selectRow(data.id)}
                                    checked={selectedRows && selectedRows.indexOf(data.id) != -1 ? true : false}
                                />
                            </Col>
                            <Col md={11}>
                                {
                                    getInObject(data, "mime") ?
                                        fileIcon(getInObject(data, "mime"))
                                        :
                                        <Folder />
                                }

                                {
                                    getInObject(data, "mime") && getInObject(data, "mime").kind == "Image" ?
                                        <span
                                            onClick={() => { setImageSelected(getInObject(data, "url", "")) }}
                                            className="ml-1"
                                        >
                                            {getInObject(data, "name", "")}
                                        </span>
                                        :
                                        <span className="ml-1">
                                            {getInObject(data, "name", "")}
                                        </span>
                                }
                                {
                                    data.virus_action == "allowed" ?
                                        <AlertCircle
                                            ref={tooltipRef}
                                            size={16}
                                            style={{ marginLeft: "5px", marginTop: "2px" }}
                                            className="text-danger cursor-pointer"
                                        />
                                        : null
                                }
                                <UncontrolledTooltip
                                    target={tooltipRef}
                                    placement='top'
                                >
                                    File terdeteksi virus
                                </UncontrolledTooltip>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="5">
                        <Row>
                            {
                                getInObject(data, "is_trash", "option") ?
                                    <DropdownTrash data={data} />
                                    :
                                    <Fragment>
                                        <Col md={1}>
                                            {
                                                getInObject(data, "tags", "") ?
                                                    <Tag size={20} />
                                                    : null
                                            }
                                        </Col>
                                        <Col md={1}>
                                            {
                                                getInObject(data, "is_favorite", "option") ?
                                                    <Star size={20} />
                                                    : null
                                            }
                                        </Col>
                                        <Col
                                            md={5}
                                            className="d-flex justify-content-end"
                                        >
                                            {
                                                getRoleByMenuStatus('File Manajemen', 'share') ?
                                                    getInObject(data, "is_shared", "option") ?
                                                        <span onClick={() => { sharedClick(data.id) }}>
                                                            Shared
                                                            <Link
                                                                size={16}
                                                                className="mx-1"
                                                            />
                                                        </span>
                                                        :
                                                        <span id="share-file">
                                                            <Share2
                                                                size={16}
                                                                onClick={() => {
                                                                    setDataSelected(data);
                                                                    setShareSelected(null);
                                                                    modalShareToggle();
                                                                }}
                                                                className="mx-1"
                                                            />
                                                        </span>
                                                    : null
                                            }
                                        </Col>
                                        <Col md={2}>
                                            <DropdownFilemanagerTable data={data} />
                                        </Col>
                                    </Fragment>
                            }

                            <Col md={3}>
                                {data.mime ? Helper.fileSize(data.mime.size) : ""}
                            </Col>
                        </Row>
                    </Col>
                    <Col md="3">
                        {Helper.dateIndo(data.last_open)}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default TableNormal;