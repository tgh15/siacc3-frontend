import { Fragment, useEffect, useState } from "react"
import { Edit2, MoreVertical, Plus, Trash2 } from "react-feather";
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, Input, UncontrolledDropdown } from "reactstrap";
import FormDelete from "../../../components/widgets/form-delete/FormDelete";
import { ChatbotCongurationApi } from "../../../services/pages/helpdesk/chatbot-configuration";
import ModalForm from "./modalForm";
import './index.scss'
import CustomToast from '../../../components/widgets/custom-toast';

const ChatbotConfig = () => {


    const [treeData, setTreeData] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [searchFocusIndex, setSearchFocusIndex] = useState(0);
    const [searchFoundCount, setSearchFoundCount] = useState(null);
    const [showForm, setShowForm] = useState(false)
    const [showDeleteForm, setShowDeleteForm] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [dataSelected, setDataSelected] = useState(null)
    const [typeForm, setTypeForm] = useState("create")

    const customSearchMethod = ({ node, searchQuery }) =>
        searchQuery &&
        ((node.question &&
            node.question.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1) ||
            (node.answer &&
                node.answer.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1));


    const onDelete = () => {
        setLoadingDelete(true)
        ChatbotCongurationApi.remove(dataSelected?.id)
            .then((res) => {
                setLoadingDelete(false)
                setShowDeleteForm(false)
                getData();
            },
                err => {
                    console.log(err)
                });
    }


    const getData = () => {
        ChatbotCongurationApi.getAll()
            .then((res) => {
                setTreeData(res.data);
            },
                err => {
                    console.log(err)
                });
    }


    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="d-flex flex-column">

            {/* modal Form */}
            <ModalForm
                show={showForm}
                onClose={() => { setShowForm(!showForm) }}
                dataSelected={dataSelected}
                getData={getData}
                typeForm={typeForm} />


            {/* Form delete */}
            <FormDelete
                show={showDeleteForm}
                title="Hapus Konfigurasi"
                setShow={(par) => setShowDeleteForm(par)}
                description={`${dataSelected && dataSelected.question}`}
                loading={loadingDelete}
                onDelete={onDelete}
            />

            {/* Button Add */}
            <Button
                color="primary"
                size="sm"
                style={{ width: "10%" }}
                className="mb-2"
                disabled={treeData.length > 0}
                onClick={() => {
                    setDataSelected(null)
                    setShowForm(true)
                }}
            ><Plus /> Tambah </Button>

            <form
                style={{ display: "inline-block" }}
                onSubmit={event => {
                    event.preventDefault();
                }}
            >
                <div className="d-flex mb-2">
                    <Input
                        id="find-box"
                        type="text"
                        placeholder="Cari..."
                        style={{ fontSize: "1rem", width: "30%" }}
                        value={searchString}
                        onChange={event => setSearchString(event.target.value)}
                    />

                    <span className="mt-1">
                        &nbsp;
                        {searchFoundCount > 0 ? searchFocusIndex + 1 : null}
                        {searchFoundCount ? " / " : null}
                        {searchFoundCount > 0 ? searchFoundCount : null}
                    </span>
                </div>
            </form>

            <div style={{ height: "80%" }}>
                <SortableTree
                    treeData={treeData}
                    onChange={treeData => setTreeData(treeData)}
                    searchMethod={customSearchMethod}
                    searchQuery={searchString}
                    searchFocusOffset={searchFocusIndex}
                    isVirtualized={false}
                    rowHeight={({ node }) => {
                        let length = node.children?.length
                        if (length > 0) {

                            return (length * 40) + 150
                        }
                        else {
                            return 150
                        }
                    }}
                    searchFinishCallback={matches => {
                        setSearchFoundCount(matches.length);
                        setSearchFocusIndex(
                            matches.length > 0 ? searchFocusIndex % matches.length : 0
                        );
                    }}
                    canDrop={({ node, nextParent }) => {


                        if (nextParent == null) {
                            return false;
                        }

                        if (nextParent.id == node.parent_id) {
                            return false;
                        }

                        return true;
                    }}
                    onMoveNode={({ node, nextParentNode }) => {
                        let data = {
                            id: node.id,
                            parent_id: nextParentNode.id
                        }
                        ChatbotCongurationApi.update(data).then(
                            res => {
                                CustomToast("success", "Data Berhasil diubah")
                                getData();
                            }, err => {
                                console.log(err)
                            })
                    }}

                    generateNodeProps={row => {

                        return {

                            className: "node-item",
                            title: (
                                <Fragment>
                                    <div style={{ fontSize: "9pt" }} className="text-primary"> {row.node.question}</div>
                                    <div style={{ fontSize: "11pt" }} className="mt-1"> {row.node.answer} </div>
                                    <ol className="mt-1">
                                        {row.node.children?.map((item, index) => (
                                            <li className="text-primary" style={{ fontSize: "9pt", marginTop: "10px" }}> {item.question} </li>
                                        ))}
                                    </ol>
                                </Fragment>

                            ),
                            subtitle: (
                                <div className="mt-1 cursor-pointer" style={{ marginLeft: "-24px" }} >
                                    <Button
                                        color={{ backgroundColor: "transparent" }}
                                        onClick={() => {
                                            setTypeForm("create")
                                            setDataSelected(row.node);
                                            setShowForm(true)
                                        }}>
                                        <Plus size={14} />
                                        <span style={{ fontSize: "10pt" }} className="text-muted">
                                            Tambahkan Pilihan {typeForm}
                                        </span>
                                    </Button>
                                </div>
                            ),
                            buttons: [
                                <UncontrolledDropdown >
                                    <DropdownToggle
                                        color="secondary"
                                        type="button"
                                        className="btn btn-icon rounded-circle btn-sm "
                                        style={{
                                            verticalAlign: "middle",
                                            marginRight: "5px"
                                        }}

                                    >
                                        <MoreVertical size={14} />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem tag="a" onClick={() => {
                                            setTypeForm("update");
                                            setDataSelected(row.node);
                                            setShowForm(true)
                                        }}>
                                            <Edit2 size={14} /> Ubah</DropdownItem>
                                        {!row.node.children ?
                                            <DropdownItem
                                                tag="a"
                                                onClick={() => {

                                                    setDataSelected(row.node);
                                                    setShowDeleteForm(true)
                                                }}
                                                className="text-danger">

                                                <Trash2 size={14} /> Hapus</DropdownItem>
                                            : null}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            ]
                        };
                    }}
                />
            </div>
        </div>
    );
}

export default ChatbotConfig