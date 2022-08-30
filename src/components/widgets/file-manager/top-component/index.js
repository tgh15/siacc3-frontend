import React, { Fragment, useContext, useState }    from 'react';
import { useForm }                                  from 'react-hook-form';
import { yupResolver }                              from '@hookform/resolvers/yup';
import { 
    File, 
    Plus, 
    Folder, 
    Minimize, 
    Maximize, 
    UploadCloud 
} from 'react-feather';

import { 
    Col, 
    Row, 
    Form, 
    Input, 
    Label, 
    Button, 
    FormGroup, 
    DropdownItem, 
    FormFeedback, 
    DropdownMenu, 
    DropdownToggle, 
    UncontrolledDropdown,
} from 'reactstrap';

import CustomToast                                  from '../../custom-toast';
import SubmitButton                                 from "../../submit-button";
import DriveHomeApi                                 from '../../../../services/pages/drive/home';
import { ModalBase }                                from '../../modals-base';
import UploadProgressSidebar                        from '../UploadProgressSidebar';
import { FileManagerContext }                       from '../../../../context/FileManagerContext';
import CreateFolderValidation                       from '../validations/CreateFolderValidation';

//Helper
import Helper                                       from '../../../../helpers';

//API
import DriveApi                                     from '../../../../services/pages/drive';


export const TopComponentFileManager = ({ show, setProgress }) => {
    //State
    const [showModal, setShow]               = useState(show);
    const [loading, setLoading]              = useState(false);

    //Form
    const { register, errors, handleSubmit } = useForm({ mode: "onChange", resolver: yupResolver(CreateFolderValidation) });
    
    //Helper
    const { getRoleByMenuStatus }            = Helper;    

    //Context
    const { setUrlApiActive,
        getData,
        fullScreen,
        setBreadcums,
        dataBreadcums,
        setMenuActive,
        setProgressData,
        setSelectedRows,
        handlerFullScren,
        setSelectedAllRows,
        uploadProgressSidebarOpen,
        toggleUploadProgressSidebar,
        setUploadProgressSidebarOpen,
    } = useContext(FileManagerContext);

    const selectFolder = e => {
        const reader = new FileReader(),
        files        = e.target.files
        console.log(e.target.files[0]);

        let dir;

        if (dataBreadcums.length == 1){
            dir = "";
        }else{
            let dirlink = dataBreadcums[dataBreadcums.length - 1];
            dir = dirlink.url.split("=")[1]
        }

        let nameFolder = files[0].webkitRelativePath.split("/")[0];

        DriveApi.home.createFolder({
            dir         : dir,
            name        : nameFolder,
            onSuccess   : (res) => {
                let folderId = res.id;

                const options = {
                    onUploadProgress: (progressEvent) => {
                        const { loaded, total } = progressEvent;
                        let percent = Math.floor((loaded * 100) / total)
                        toggleUploadProgressSidebar()
                        setProgressData([{ fileName: nameFolder, percent: percent }])
                    }
                }

                DriveApi.upload({
                    dir       : folderId,
                    file      : files,
                    options   : options,
                    onSuccess : (res) => {
                        CustomToast("success", "Folder Berhasil di Upload");
                        setSelectedRows([]);
                        setSelectedAllRows(false);
                        
                        if (dir != "") {
                            getData(`?dir=${dir}`);
                        }else{
                            setMenuActive("all");
                            setUrlApiActive();
                            setBreadcums({ type: "create", name: "Semua File", url: "" });
                        }
                    }, onFail: (err) => {
                        console.log(err);
                    }
                })
            }, onFail: (err) => {
                console.log(err);
            }
        })
    };

    const selectFile = e => {
        const reader = new FileReader(),
        files        = e.target.files
        let dir;

        if (dataBreadcums.length == 1) {
            dir = "";
        }else{
            let dirlink = dataBreadcums[dataBreadcums.length - 1];
            dir = dirlink.url.split("=")[1]
        }

        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total)
                toggleUploadProgressSidebar()
                setProgressData([{ fileName: files[0].name, percent: percent }])
            }
        }

        DriveApi.upload({
            dir         : dir,
            file        : files[0],
            options     : options,
            onSuccess   : (res) => {
                setUploadProgressSidebarOpen(false);
                CustomToast("success", "Berkas Berhasil di Upload");
                setSelectedRows([]);
                setSelectedAllRows(false);

                if (dir != "") {
                    getData(`?dir=${dir}`);
                }else{
                    setMenuActive("all");
                    setUrlApiActive();
                    setBreadcums({ type: "create", name: "Semua File", url: "" });
                }
            }, onFail: (err) => {}
        })
    };

    const toggleModal = () => {
        const isShow = showModal;
        setShow(!isShow);
    };

    const onSubmit = dataForm => {
        let dir;

        if (dataBreadcums.length == 1) {
            dir = "";
        } else {
            let dirlink = dataBreadcums[dataBreadcums.length - 1];
            dir = dirlink.url.split("=")[1];
        }

        setLoading(true);

        DriveHomeApi.createFolder({
            dir         : dir,
            name        : dataForm.name,
            onSuccess   : (res) => {
                CustomToast("success", "Folder Berhasil ditambahkan");
                setLoading(false);
                toggleModal();

                if (dir != "") {
                    getData(`?dir=${dir}`)
                }else{
                    setMenuActive("all");
                    setUrlApiActive();
                    setBreadcums({ type: "create", name: "Semua File", url: "" });
                }
            },
            onFail: (err) => {
                console.log(err);
                setLoading(false);
            }
        })
    };

    return (
        <div>
            {/* Modal Add Folder */}
            <ModalBase 
                show    = {showModal} 
                title   = "Buat Folder"
                setShow = {() => { toggleModal() }} 
            >
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <Label>Nama Folder</Label>
                        <Input
                            name        = "name"
                            type        = "text"
                            invalid     = {(errors.name) ? true : false}
                            innerRef    = {register()}
                            placeholder = "Nama Folder"
                        />
                        {errors && errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                    </FormGroup>
                    <FormGroup className="d-flex justify-content-between">
                        <Button 
                            color   = "primary" 
                            outline 
                            onClick = {() => { toggleModal() }}
                        >
                            Batal
                        </Button>&nbsp;
                        <SubmitButton size="sm" isLoading={loading}>
                            Submit
                        </SubmitButton>
                    </FormGroup>
                </Form>
            </ModalBase>

            <UploadProgressSidebar
                open            = {uploadProgressSidebarOpen} 
                toggleSidebar   = {toggleUploadProgressSidebar}
            />

            <Row style={{ marginBottom: "1em" }}>
                <Col 
                    md = {6} 
                    sm = {6}
                >
                    <UncontrolledDropdown>
                        <DropdownToggle 
                            id    = "add-data"
                            size  = 'sm'
                            color = 'primary' 
                        >
                            <Plus size={14}/>
                        </DropdownToggle>
                        <DropdownMenu>
                            {
                                getRoleByMenuStatus('File Manajemen', 'add_folder') ? 
                                    <DropdownItem 
                                        tag     = 'a'
                                        href    = '#' 
                                        onClick = {() => {setShow(true);}} 
                                    >
                                        <Folder 
                                            size    = {16} 
                                            style   = {{ marginRight: "0.5em" }}
                                        />
                                        Folder Baru
                                    </DropdownItem>
                                :  null
                            }
                            {
                                getRoleByMenuStatus('File Manajemen', 'upload') ? 
                                    <Fragment>
                                        <hr />
                                        <Button.Ripple 
                                            tag     = 'label' 
                                            color   = "flat-primary" 
                                            style   = {{ backgroundColor: "transparent !important", display: "block" }} 
                                        >
                                            <Input 
                                                type        = 'file' 
                                                hidden 
                                                onChange    = {selectFile}
                                            />
                                            <File 
                                                size    = {16} 
                                                style   = {{ marginRight: "0.5em", marginLeft: "-6px" }}
                                            />Unggah Berkas
                                        </Button.Ripple>
                                        <Button.Ripple 
                                            tag     = 'label' 
                                            color   = "flat-primary" 
                                            style   = {{ backgroundColor: "transparent !important" }}
                                        >
                                            <Input 
                                                id              = "upload-folder" 
                                                type            = 'file' 
                                                hidden 
                                                onChange        = {selectFolder}
                                                directory       = "" 
                                                webkitdirectory = "" 
                                            />
                                            <Folder 
                                                size    = {16} 
                                                style   = {{ marginRight: "0.5em", marginLeft: "-6px" }}
                                            />Unggah Folder
                                        </Button.Ripple>
                                    </Fragment>
                                :
                                    null
                            }
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Col>
                <Col 
                    md = {6} 
                    sm = {6}
                >
                    <div className="container-fluid">
                        <Row>
                            <Col 
                                sm        = {12} 
                                className = 'text-right'
                            >
                                <Button 
                                    id          = "full-screen"
                                    color       = "primary" 
                                    outline 
                                    onClick     = {() => {handlerFullScren()}}
                                    className   = "btn-sm btn-icon" 
                                >
                                    {
                                        !fullScreen ? (
                                            <Fragment>
                                                <Maximize size={16} />&nbsp;Fullscreen
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <Minimize size={16} />&nbsp;Exit Fullscreen
                                            </Fragment>
                                        )
                                    }
                                </Button>&nbsp;
                                <Button 
                                    id          = "progress"
                                    size        = "sm" 
                                    color       = "primary" 
                                    onClick     = {() => {toggleUploadProgressSidebar()}} 
                                    outline 
                                    className   = 'ml-1'
                                >
                                    <UploadCloud size={16}/> Progress
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    );
};