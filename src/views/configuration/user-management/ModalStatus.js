import { Fragment, useState }   from "react";
import { Button, ModalFooter }  from "reactstrap";

import CustomToast              from "../../../components/widgets/custom-toast";
import UserManagementApi        from "../../../services/pages/configuration/user-management";

const ModalStatus = (props) => {
    const {
        type,
        setListData,
        dataSelected,
        setModalStatus
    } = props;
    
    //State
    const [loading,setLoading] = useState(false);

    const getData = () => {
        UserManagementApi.get({
            onSuccess: (res) => {
                setListData(res.employee);
            }, onFail: (err) => {
                CustomToast("danger",'403'+err.message);
            }
        })
    };

    const data = {
        email   : dataSelected.email,
        uuid    : dataSelected.uuid_user,
        status  : type
    };
    
    const onSubmit = () => {
        setListData(false);
        UserManagementApi.status({
            data: data,
            onSuccess: (res) => {
                setLoading(false);
                setModalStatus(false);
                
                CustomToast("success", `User Berhasil Di ${(!type) ? "Non" : ""} Aktifkan`);
                getData({page : 1});
            },
            onFail: (err) => {
                CustomToast("danger", err.message);
                setLoading(false);
            }
        })
    };

    return (
        <Fragment>
            <h4 className="text-center">
                Yakin {(!type) ?"non-":""}aktifkan pengguna ini ?
            </h4>
            <p className="text-center px-5">
                Setelah di{(!type) ?"non":""}aktifkan, pengguna ini {(!type) ?"tidak":""} dapat mengakses aplikasi dari perangkat manapun
            </p>
            <ModalFooter className="d-flex justify-content-around">
                <Button.Ripple 
                    color   = "primary" 
                    onClick = {() => { setModalStatus(false) }} 
                    outline
                >
                    Batal
                </Button.Ripple>
                <Button.Ripple 
                    color   = "primary" 
                    onClick = {onSubmit}
                >
                    Ya
                </Button.Ripple>
            </ModalFooter>
        </Fragment>
    );
};

export default ModalStatus;