import { Fragment, useState, useEffect, useContext }        from "react";
import { CheckCircle, Edit2, Eye, Key, Trash2, XCircle }    from "react-feather";
import { Col, Media }                                       from "reactstrap";

//Helper
import Helper                                               from "../../../helpers";

//Components
import Avatar                                               from "../../../components/widgets/avatar";
import FormDelete                                           from "../../../components/widgets/form-delete/FormDelete";
import CustomToast                                          from "../../../components/widgets/custom-toast";
import CustomTableBody                                      from "../../../components/widgets/custom-table/CustomTableBody";
import { UserManagementContext }                            from "../../../context/UserManagementContext";

//API
import UserManagementApi                                    from "../../../services/pages/configuration/user-management";
import userManagementAPI                                    from "../../../services/pages/configuration/user-management/UserManagement";


const TableBody = props => {
    const { 
        data, 
        index, 
        setModalForm, 
        setStatusType,
        setModalStatus, 
        setModalDetail, 
        SetModalDeviced, 
        SetModalUnDevice, 
        setModalChangeRequest 
    } = props;

    const { fallbackImage_, getRoleByMenuStatus } = Helper;
    
    const { 
        getData, 
        setListData, 
        dataSelected, 
        setDataSelected,
        setDeviceSelected 
    } = useContext(UserManagementContext);
    
    //State
    const [device, setDevice]                     = useState();
    const [loading, setLoading]                   = useState(false);
    const [showDeleteForm, setShowDeleteForm]     = useState(false);

    const iconKey = (data) => {
        if (data && data.type == "not_connected") {
            return <Key size={20} className="cursor-pointer" onClick={() => { SetModalUnDevice(true) }} />
        } else if (data && data.type === "connected") {
            return <Key size={20} className="cursor-pointer text-success" onClick={() => { setDeviceSelected(data);setDataSelected(data.biodata); SetModalDeviced(true) }} />
        } else if (data && data.type === "requested") {
            return <Key size={20} className="cursor-pointer text-danger" onClick={() => { setDeviceSelected(data); setDataSelected(data.biodata); setModalChangeRequest(true); }} />
        }
    }

    const getDevice = () => {
        UserManagementApi.checkRequest({
            uuid: data.uuid_user,
            onSuccess: (res) => {
                setDevice(res);
            }, onFail: err => {
                console.log(err);
            }
        })
    };

    //Delete
    const onDelete = () => {
        const formData = {
            id : dataSelected.id
        };

        userManagementAPI.deleteUserManagement(formData).then(
            res => {
                if (!res.is_error) {
                    setLoading(false);
                    setListData(false);
                    getData({page : 1});
                    setShowDeleteForm(!showDeleteForm);
                    CustomToast("success", "Data Berhasil di hapus");
                }else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    useEffect(() => {
        getDevice();
    }, []);

    return (
        <Fragment>
            {/* Form Delete */}
            <FormDelete
                show        = {showDeleteForm}
                title       = "Hapus Pengguna"
                setShow     = {(par) => setShowDeleteForm(par)}
                loading     = {loading} 
                onDelete    = {onDelete}
                description = {`${dataSelected.name}`}
            />

            <CustomTableBody>
                <Col md="1">
                    {index + 1}
                </Col>
                <Col md="3">
                    {data.identity_id}
                </Col>
                <Col md="4">
                    <Media>
                        <Media left href='#'>
                            <Avatar 
                                img         = {data.photo == "" ? `https://ui-avatars.com/api/?name=${data ? data.name : "UN"}&background=4e73df&color=fff&bold=true` : data.photo} 
                                status      = 'online'
                                onError     = {fallbackImage_} 
                                imgWidth    = '40' 
                                imgHeight   = '40' 
                            />
                        </Media>
                        <Media body>
                            <Media className="mb-0 ml-1 text-capitalize">{data.name}</Media>
                            <h6 className="text-muted ml-1 mt-0">{data.workunit}</h6>
                        </Media>
                    </Media>
                </Col>
                <Col md="2">
                    {data.user_group && data.user_group[0] ? data.user_group[0]?.name : null}
                </Col>
                <Col 
                    md        = "2" 
                    className = "d-flex justify-content-around"
                >
                    {
                        getRoleByMenuStatus('Manajemen Pengguna', 'show') ?
                            <div id="usermanajement-detail">
                                <Eye 
                                    size        = {20} 
                                    onClick     = {() => { setDataSelected(data); setModalDetail(true) }} 
                                    className   = "cursor-pointer" 
                                />
                            </div>
                        : null
                    }

                    {
                        getRoleByMenuStatus('Manajemen Pengguna', 'connected_device') ?
                            <div id="usermanajement-device">
                                {iconKey(device)}
                            </div>
                        : null
                    }

                    {
                        getRoleByMenuStatus('Manajemen Pengguna', 'non_active') ?
                            (data.status) ? (
                                <CheckCircle 
                                    id          = "usermanajement-active"
                                    size        = {20}
                                    onClick     = {() => {
                                        setStatusType(false);
                                        setDataSelected(data);
                                        setModalStatus(true);
                                    }} 
                                    className   = "cursor-pointer text-success"
                                />
                            ) : (
                                <XCircle 
                                    id          = "usermanajement-non-active"
                                    size        = {20} 
                                    onClick     = {() => {
                                        setStatusType(true);
                                        setDataSelected(data);
                                        setModalStatus(true);
                                    }}
                                    className   = "cursor-pointer"
                                />
                            )
                        : null
                    }
                    {
                        getRoleByMenuStatus('Manajemen Pengguna', 'edit') ?
                            <div id="usermanajement-update">
                                <Edit2 
                                    size        = {20} 
                                    onClick     = {() => { setDataSelected(data); setModalForm(true) }} 
                                    className   = "cursor-pointer" 
                                />
                            </div>
                        : null
                    }
                    {
                        getRoleByMenuStatus('Manajemen Pengguna', 'delete') ?
                            <div id="usermanajement-delete">
                                <Trash2 
                                    size        = {20} 
                                    onClick     = {() => { setDataSelected(data); setShowDeleteForm(true) }} 
                                    className   = "cursor-pointer" 
                                />
                            </div>
                        : null
                    }
                </Col>
            </CustomTableBody>
        </Fragment>
    );
};

export default TableBody;