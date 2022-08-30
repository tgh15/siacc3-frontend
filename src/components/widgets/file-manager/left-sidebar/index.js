import React, {
    Fragment, 
    useState, 
    useEffect,
    useContext,
} from 'react';
import { 
    Nav, 
    Form, 
    Card, 
    Label, 
    Input, 
    Button, 
    NavLink, 
    CardBody, 
    FormGroup, 
    FormFeedback,
} from 'reactstrap';

import { 
    Tag, 
    Link, 
    Plus, 
    Star, 
    User, 
    Users, 
    Clock, 
    Trash, 
    Folder,
    Share2, 
    CloudOff, 
    PieChart, 
} from 'react-feather';

import Skeleton                 from 'react-loading-skeleton';
import { useForm }              from 'react-hook-form';
import { yupResolver }          from '@hookform/resolvers/yup';

//API
import DriveApi                 from '../../../../services/pages/drive';

//Component
import CustomToast              from '../../custom-toast';
import SubmitButton             from '../../submit-button';
import { ModalBase }            from '../../modals-base';
import { CustomNavItem }        from './CustomNavItem';
import { FileManagerContext }   from '../../../../context/FileManagerContext';
import CreateFolderValidation   from '../validations/CreateFolderValidation';


export const LeftSidebarFileManagement = ({ diskData }) => {
    //State
    const [loading, setLoading]             = useState(false);
    const [showedMenu, setShowed]           = useState(false);
    const [modalTag, setModalTag]           = useState(false);
    const [showMenuTags, setShowMenuTags]   = useState(false);

    const toggle = () => {setShowed(!showedMenu)}
    const { 
        tags, 
        setTags, 
        menuActive, 
        setListData, 
        setBreadcums, 
        setMenuActive, 
        setTagSelected, 
        setUrlApiActive, 
        setSelectedRows, 
        setDataBreadcums, 
        setSelectedAllRows, 
    } = useContext(FileManagerContext);

    let result = menuActive.indexOf("share");
    const { register, errors, handleSubmit } = useForm({ mode: "onChange", resolver: yupResolver(CreateFolderValidation) });

    const onSubmit = dataForm => {
        setLoading(true);

        DriveApi.tagCreate({
            name: dataForm.name,
            onSuccess: (res) => {
                setLoading(false);
                setModalTag(false);
                getTagAll();
                CustomToast("success", "Tag Berhasil ditambahkan");
            }, onFail: (err) => {
                setLoading(false);
                console.log(err);
            }
        })
    };

    const addTag = () => {
        return (
            <ModalBase 
                show    = {modalTag} 
                title   = "Tambah Tag"
                setShow = {() => { setModalTag(!modalTag) }} 
            >
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <Label>Nama Tag</Label>
                        <Input
                            name        = "name"
                            type        = "text"
                            invalid     = {(errors.name) ? true : false}
                            innerRef    = {register()}
                            placeholder = "Nama Tag"
                        />
                        {errors && errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                    </FormGroup>
                    <FormGroup className="d-flex justify-content-between">
                        <Button 
                            color   = "primary" 
                            outline 
                            onClick = {() => { setModalTag(!modalTag) }}
                        >
                            Batal
                        </Button>&nbsp;
                        <SubmitButton 
                            size        = "sm" 
                            isLoading   = {loading}
                        >
                            Submit
                        </SubmitButton>
                    </FormGroup>
                </Form>
            </ModalBase>
        );
    };

    const getTagAll = () => {
        DriveApi.get({
            path: "/tags",
            
            onSuccess: (res) => {
                setTags(res);
            },
            onFail: (err) => {
                console.log(err);
            }
        })
    };

    const getTag = (id) => {
        setListData(false);

        DriveApi.tagGet({
            id: id,

            onSuccess: (res) => {
                setListData(res);
            },
            onFail: (err) => {
                alert("gagal");
            }
        })
    };

    const SbMenu = () => {
        return (
            <Nav pills vertical>
                <CustomNavItem>
                    <NavLink
                        style       = {{ width: "100%" }}
                        active      = {menuActive === 'share-with-other'}
                        onClick     = {() => {
                            setMenuActive('share-with-other')
                            setUrlApiActive('/shared/with-other')
                            setBreadcums({ type: "create", name: "Bagikan > Dengan Yang Lain", url: "/shared/with-other" })
                            setSelectedRows([])
                            setSelectedAllRows(false)
                        }}
                        className   = "d-flex justify-content-start ml-1"
                    >
                        <Users/>&nbsp;&nbsp;Dengan Yang Lain
                    </NavLink>
                </CustomNavItem>
                <CustomNavItem>
                    <NavLink
                        style       = {{ width: "100%" }}
                        active      = {menuActive === 'share-with-me'}
                        onClick     = {() => {
                            setMenuActive('share-with-me')
                            setUrlApiActive('/shared/with-me')
                            setBreadcums({ type: "create", name: "Bagikan > Dengan Anda", url: "/shared/with-me" })
                            setSelectedRows([])
                            setSelectedAllRows(false)
                        }}
                        className   = "d-flex justify-content-start ml-1"
                    >
                        <User/>&nbsp;&nbsp;Dengan Anda
                    </NavLink>
                </CustomNavItem>
                <CustomNavItem>
                    <NavLink
                        style       = {{ width: "100%" }}
                        active      = {menuActive === 'share-by-link'}
                        onClick     = {() => {
                            setMenuActive('share-by-link')
                            setUrlApiActive('/shared/by-link')
                            setBreadcums({ type: "create", name: "Bagikan > Dengan Link", url: "/shared/by-link" })
                            setSelectedRows([])
                            setSelectedAllRows(false)
                        }}
                        className   = "d-flex justify-content-start ml-1"
                    >
                        <Link/>&nbsp;&nbsp;Dengan Link
                    </NavLink>
                </CustomNavItem>
                <CustomNavItem>
                    <NavLink
                        style       = {{ width: "100%" }}
                        active      = {menuActive === 'share-deleted'}
                        onClick     = {() => {
                            setMenuActive('share-deleted')
                            setUrlApiActive('/shared/deleted')
                            setBreadcums({ type: "create", name: "Bagikan > Terhapus", url: "/shared/deleted" })
                            setSelectedRows([])
                            setSelectedAllRows(false)
                        }}
                        className   = "d-flex justify-content-start ml-1"
                    >
                        <CloudOff/>&nbsp;&nbsp;Terhapus
                    </NavLink>
                </CustomNavItem>
            </Nav>
        );
    };

    const MenuTags = () => {
        return (
            <Nav pills vertical>
                <CustomNavItem>
                    <NavLink
                        style       = {{ width: "100%" }}
                        active      = {menuActive === 'tag-add-tag'}
                        onClick     = {() => {
                            setModalTag(!modalTag)
                            setMenuActive("tag-add-tag")
                            setSelectedRows([])
                            setSelectedAllRows(false)
                        }}
                        className   = "d-flex justify-content-start ml-1"
                    >
                        <Plus className='mr-1'/>Tambah Tag Baru
                    </NavLink>
                    {tags && tags.map((data, i) => (
                        <NavLink
                            key={i}
                            style       = {{ width: "100%" }}
                            active      = {menuActive === `tag-${data.tag}`}
                            onClick     = {() => {
                                setMenuActive(`tag-${data.tag}`)
                                getTag(data.id)
                                setTagSelected(data)
                                setBreadcums({ type: "create", name: `Tag > ${data.tag}`, url: "/shared/with-other" })
                                setSelectedRows([])
                                setSelectedAllRows(false)
                            }}
                            className   = "d-flex justify-content-start ml-1"
                        >
                            <Tag className='mr-1'/>{data.tag}
                        </NavLink>
                    ))}
                </CustomNavItem>
            </Nav>
        );
    };

    useEffect(() => {
        getTagAll();
    }, []);

    return (
        <Fragment>
            {addTag()}
            <Card 
                id    = "sidebar-menu"
                style = {{ minHeight: "82vh" }} 
            >
                <CardBody className="d-flex justify-content-between flex-column">
                    <Nav 
                        pills
                        vertical
                    >
                        <div id="all-files">
                            <CustomNavItem>
                                <NavLink
                                    style       = {{ width: "100%" }}
                                    active      = {menuActive === 'all'}
                                    onClick     = {() => {
                                        setMenuActive('all')
                                        setUrlApiActive()
                                        setBreadcums({ type: "create", name: "Semua File", url: "" })
                                        setSelectedRows([])
                                        setSelectedAllRows(false)
                                    }}
                                    className   = "d-flex justify-content-start"
                                >
                                    <Folder className="mr-1"/>Semua File
                                </NavLink>
                            </CustomNavItem>
                        </div>
                        <div id="just-seen">
                            <CustomNavItem>
                                <NavLink
                                    style       = {{ width: "100%" }}
                                    active      = {menuActive === 'recent'}
                                    onClick     = {() => {
                                        setMenuActive('recent');
                                        setUrlApiActive('/recent')
                                        setBreadcums({ type: "create", name: "Baru Dilihat", url: "/recent" })
                                        setSelectedRows([])
                                        setSelectedAllRows(false)
                                    }}
                                    className   = "d-flex justify-content-start"
                                >
                                    <Clock className="mr-1"/>Baru Dilihat
                                </NavLink>
                            </CustomNavItem>
                        </div>
                        <div id="favorite">
                            <CustomNavItem>
                                <NavLink
                                    style       = {{ width: "100%" }}
                                    active      = {menuActive === 'favorit'}
                                    onClick     = {() => {
                                        setMenuActive('favorit')
                                        setUrlApiActive('/favorite')
                                        setBreadcums({ type: "create", name: "Favorit", url: "/favorite" })
                                    }}
                                    className   = "d-flex justify-content-start"
                                >
                                    <Star className="mr-1" />Favorit
                                </NavLink>
                            </CustomNavItem>
                        </div>
                        <div id="share">
                            <CustomNavItem>
                                <NavLink
                                    style       = {{ width: "100%" }}
                                    active      = {menuActive === 'share'}
                                    onClick     = {() => {
                                        setMenuActive('share')
                                        toggle()
                                    }}
                                    className   = "d-flex justify-content-start"
                                >
                                    <Share2 className={`mr-1 ${showedMenu && menuActive !== "share" ? "text-primary" : ""}`}/>
                                    <span className={`${showedMenu && menuActive !== "share" ? "text-primary" : ""}`}>
                                        Bagikan
                                    </span>
                                </NavLink>
                                {showedMenu ? (<SbMenu />) : null}
                            </CustomNavItem>
                        </div>
                        <div id="tag">
                            <CustomNavItem>
                                <NavLink
                                    style       = {{ width: "100%" }}
                                    active      = {menuActive === 'tags'}
                                    onClick     = {() => {setShowMenuTags(!showMenuTags)}}
                                    className   = "d-flex justify-content-start"
                                >
                                    <Tag className="mr-1"/>Tag
                                </NavLink>
                                {showMenuTags ? (<MenuTags />) : null}
                            </CustomNavItem>
                        </div>
                    </Nav>
                    <Nav 
                        pills 
                        style     = {{ marginBottom: "0px" }}
                        vertical 
                    >
                        <div id="just-deleted">
                            <CustomNavItem>
                                <NavLink
                                    style       = {{ width: "100%" }}
                                    active      = {menuActive === 'trash'}
                                    onClick     = {() => {
                                        setMenuActive('trash')
                                        setUrlApiActive('/trash')
                                        setBreadcums({ type: "create", name: "Baru Saja Dihapus", url: "/trash" })
                                        setSelectedRows([])
                                        setSelectedAllRows(false)
                                    }}
                                    className   = "d-flex justify-content-start"
                                >
                                    <Trash className="mr-1"/>Baru Saja Dihapus
                                </NavLink>
                            </CustomNavItem>
                        </div>
                        <div id="capacity">
                            <CustomNavItem>
                                <NavLink href="#">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <PieChart/>
                                            {
                                                diskData &&
                                                <div style={{ marginLeft: "1em" }}>
                                                    <p>{diskData.free.readable} of {diskData.used.readable}  used</p>
                                                </div>
                                            }
                                            {!diskData && <Skeleton count={5} style={{ height: "50px" }} />}
                                        </div>
                                    </div>
                                </NavLink>
                            </CustomNavItem>
                        </div>
                    </Nav>
                </CardBody>
            </Card>
        </Fragment>
    );
};