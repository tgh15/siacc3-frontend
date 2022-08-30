import {
    Fragment,
    useState,
    useEffect,
    useContext,
} from "react";

//Icon
import {
    Tag,
    Link,
    File,
    Star,
    Image,
    Trash,
    Video,
    Folder,
    Share2,
    AlertCircle,
} from "react-feather";

import {
    Col,
    Row,
    Card,
    Alert,
    Button,
    CardBody,
    CustomInput,
    UncontrolledTooltip
} from "reactstrap";

import Viewer from "react-viewer";
import Skeleton from "react-loading-skeleton";

//Helper
import Helper from "../../../helpers";

//URl Api
import DriveApi from "../../../services/pages/drive";
import DriveTrashApi from "../../../services/pages/drive/trash";

//Components
import TableScan from "./table-scan";
import { object } from "yup/lib/locale";
import ModalShare from "./ModalShare";
import AlertTrash from "./AlertTrash";
import FormDelete from "../form-delete/FormDelete";
import TableVirus from "./table-virus";
import CustomToast from "../custom-toast";
import TableNormal from "./table-normal";
import DropdownTrash from "./DropdownTrash";
import ContainerFluid from "../fluid";
import CustomTableBody from "../custom-table";
import BreadcrumsManager from "./BreadcrumsManager";
import CustomTableBodyEmpty from "../custom-table/CustomTableBodyEmpty";
import { FileManagerContext } from "../../../context/FileManagerContext";
import { DropdownFilemanagerTable } from "./DropdownTable";


export const FileManagerTable = () => {
    //State
    const [loading, setLoading] = useState(false);
    const [imageSelected, setImageSelected] = useState(null);
    const [showModalShare, setShowModalShare] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    const modalShareToggle = () => setShowModalShare(!showModalShare);

    //Helper
    const { getRoleByMenuStatus } = Helper;

    //Context
    const {
        getData,
        listData,
        apiActive,
        menuActive,
        setBreadcums,
        selectedRows,
        dataBreadcums,
        setDataSelected,
        setSelectedRows,
        selectedAllRows,
        setDataBreadcums,
        setShareSelected,
        setSelectedAllRows,
    } = useContext(FileManagerContext);

    const onOpenFolder = data => {
        if (!getInObject(data, "mime")) {
            setDataBreadcums([...dataBreadcums, { name: data.name, url: `?dir=${data.id}` }])
            getData(`?dir=${data.id}`)
            setSelectedRows([])
            setSelectedAllRows(false)
        }
    };

    const sharedClick = (id) => {
        DriveApi.shareDetail({
            id: id,
            onSuccess: (res) => {
                setShareSelected(res.data)
                modalShareToggle()
            },
            onFail: (err) => {

            }
        })
    };

    const selectRow = id => {
        if (selectedRows.indexOf(id) != -1) {
            setSelectedRows(selectedRows.filter(opt => opt != id));
            setSelectedAllRows(false);
        } else {
            if (listData.length == selectedRows.length + 1) {
                setSelectedAllRows(true);
            }
            setSelectedRows([...selectedRows, id]);
        }
    };

    const selectAllRow = () => {
        if (listData) {
            if (selectedAllRows) {
                setSelectedRows([])
                setSelectedAllRows(false)
            } else {
                setSelectedRows(Array.from(listData, opt => opt.id))
                setSelectedAllRows(true)
            }
        }
    };

    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        setBreadcums({ type: "create", name: "Semua File", url: "" })
    }, []);

    const getInObject = (data, fieldName, type) => {
        if (menuActive == "recent") {
            if (type == "option") {
                return data.object.option[fieldName]
            }

            return data.object[fieldName]
        } else {
            if (type == "option") {
                return data.option[fieldName]
            }
            return data[fieldName]
        }
    };

    const fileIcon = (mime) => {
        switch (mime.kind) {
            case "Image":
                return <Image />;
                break;
            case "Video":
                return <Video />;
                break;
            default:
                return <File />
                break;
        }
    };

    const onDelete = () => {
        setLoading(true)

        if (menuActive == 'trash') {
            DriveApi.delete({
                id: selectedRows,
                onSuccess: (res) => {
                    setLoading(false)
                    setShowDeleteForm(false)
                    CustomToast("success", `item Berhasil dihapus selamanya`)
                    getData(apiActive)
                    setSelectedAllRows(false)
                    setSelectedRows([])
                },
                onFail: (err) => {
                    CustomToast("danger", err.data.message)
                }
            })
        } else {
            DriveTrashApi.moveToTrash({
                id: selectedRows,
                onSuccess: (res) => {
                    setLoading(false)
                    setShowDeleteForm(false)
                    CustomToast("success", "Data Berhasil dihapus")
                    getData(apiActive)
                    setSelectedAllRows(false)
                    setSelectedRows([])
                }, onFail: (err) => {
                    console.log(err)
                }
            })
        }
    };

    return (
        <Fragment>
            <Viewer
                images={[{ src: process.env.REACT_APP_BASE_ENDPOINT + imageSelected }]}
                visible={imageSelected}
                onClose={() => { setImageSelected(null) }}
                container={document.getElementById("container")}
            />

            <FormDelete
                show={showDeleteForm}
                title={menuActive == 'trash' ? `Hapus Selamanya` : `Hapus Item`}
                loading={loading}
                setShow={(par) => setShowDeleteForm(par)}
                onDelete={onDelete}
                description={`Hapus ${selectedRows.length} "Item"`}
            />

            {/* <Lightbox  />; */}
            {menuActive == "trash" ? <AlertTrash /> : null}

            {/* modal share */}
            <ModalShare
                isShow={showModalShare}
                setShow={modalShareToggle}
            />

            <Row>
                <Col md={selectedRows && selectedRows.length > 0 ? 10 : 12}>
                    {/* breadcums */}
                    <BreadcrumsManager />
                </Col>
                {selectedRows && selectedRows.length > 0 ?
                    <Col
                        md={2}
                        className="d-flex justify-content-end"
                    >
                        <Button
                            size="sm"
                            color="primary"
                            onClick={() => { setShowDeleteForm(!showDeleteForm) }}
                        >
                            {selectedRows.length} item terpilih
                        </Button>
                    </Col>
                    : null}
            </Row>

            {/* table */}
            {/* header table */}
            <Card
                id="header-table"
                style={{ backgroundColor: "transparent" }}
                className="bg-transparant mb-0"
            >
                <CardBody>
                    <Row>
                        <Col md={4}>
                            <Row>
                                <Col
                                    md={1}
                                    id="delete-all"
                                >
                                    <CustomInput
                                        id="checkall"
                                        type="checkbox"
                                        onClick={() => { selectAllRow() }}
                                        checked={selectedAllRows}
                                    />
                                </Col>
                                <Col md={11}>
                                    Nama File
                                </Col>
                            </Row>
                        </Col>
                        <Col md={5}>
                            <Row>
                                <Col md={1}></Col>
                                <Col md={1}></Col>
                                <Col md={5}></Col>
                                <Col md={2}></Col>
                                <Col md={3}>
                                    Ukuran File
                                </Col>
                            </Row>
                        </Col>
                        <Col md={3}>
                            Terakhir Dibuka
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            {/*  table  body */}
            {
                listData && listData != null && listData.map((data, i) => (
                    !data.is_scanned && getInObject(data, "mime") ?
                        <TableScan
                            data={data}
                            fileIcon={fileIcon}
                            getInObject={getInObject}
                        />
                        :
                        data.is_virus && data.virus_action != "allowed" ?
                            <TableVirus
                                data={data}
                                fileIcon={fileIcon}
                                getInObject={getInObject}
                            />
                            :
                            <TableNormal
                                i={i}
                                data={data}
                                fileIcon={fileIcon}
                                getInObject={getInObject}
                                selectedRows={selectedRows}
                                onOpenFolder={onOpenFolder}
                                setDataSelected={setDataSelected}
                                modalShareToggle={modalShareToggle}
                                setShareSelected={setShareSelected}
                                setImageSelected={setImageSelected}
                                selectRow={selectRow}
                            />
                ))
            }

            {!listData && listData != null && <Skeleton count={3} style={{ height: "60px", marginBottom: "10px" }}></Skeleton>}
            {!listData && listData == null && <CustomTableBodyEmpty />}
        </Fragment>
    );
};