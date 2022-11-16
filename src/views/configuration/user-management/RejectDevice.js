import { useContext }               from "react";
import { Button, ModalFooter }      from "reactstrap";

//Context
import { UserManagementContext }    from '../../../context/UserManagementContext';

//Components
import CustomToast                  from "../../../components/widgets/custom-toast";
import { ModalBase }                from "../../../components/widgets/modals-base";
import UserManagementApi            from "../../../services/pages/configuration/user-management";


const RejectDevice = props => {
    const { dataSelected,getData }           = useContext(UserManagementContext);
    const { show, setShow,setChangeDevice }  = props;

    const onReject = action => {
        UserManagementApi.resetDevice({
            data    : dataSelected,
            action  : action,

            onSuccess: (res) => {
                CustomToast("success","Berhasil Tolak Pergantian Device");
                getData({page : 1});
                setShow(false);
                setChangeDevice(false);
            },onFail : (err) => {
                console.log(err);
            }
        })
    };

    return (
        <ModalBase 
            show    = {show} 
            size    = "sm"
            title   = "Tolak Permintaan Ganti Device"
            center  = {true} 
            setShow = {(par) => { setShow(par) }} 
        >
            <h5 className="text-center">Tolak Permintaan Ganti Device</h5>
            <ModalFooter className="d-flex justify-content-center px-0">
                <Button 
                    color   = 'primary' 
                    outline 
                    onClick = {() => { onReject("reject") }}
                >
                    Ya
                </Button>
                <Button.Ripple
                    color       = "primary" 
                    onClick     = {() => {onReject("non_active") }}
                    className   = "px-1 ml-2" 
                >
                    Tolak dan Nonaktifkan Akun
                </Button.Ripple>
            </ModalFooter>
        </ModalBase>
    );
};

export default RejectDevice;