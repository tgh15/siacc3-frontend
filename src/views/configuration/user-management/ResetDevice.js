import { useState, useContext }         from "react";
import { Button, ModalFooter, Spinner } from "reactstrap";

//Components
import CustomToast                      from "../../../components/widgets/custom-toast";
import { ModalBase }                    from "../../../components/widgets/modals-base";

//API
import UserManagementApi                from "../../../services/pages/configuration/user-management";

//Context
import { UserManagementContext }        from "../../../context/UserManagementContext";


const ResetDevice = props => {
    //State
    const [loading, setLoading]                      = useState(false);

    //Props
    const { SetModalDeviced, show, setShow }         = props;

    //Context
    const { dataSelected, deviceSelected, getData }  = useContext(UserManagementContext);


    const SubmitResetDevice = () => {
        setLoading(true);

        UserManagementApi.resetDevice({
            data: dataSelected,

            onSuccess: (res) => {
                CustomToast("success", "Device Berhasil Direset");
                getData({page : 1});
                setLoading(false);
                setShow(false);
                SetModalDeviced(false);
            }, onFail: (err) => {
                CustomToast("danger", err.message);
                setLoading(false);
            }
        })
    };

    return (
        <ModalBase
            size    = "sm" 
            show    = {show} 
            title   = "Yakin akan mereset Device ?" 
            center  = {true} 
            setShow = {(par) => { setShow(par) }}
        >
            <h5 className="text-center px-3 font-weight-bolderer">
                {deviceSelected.request && deviceSelected.request.device}
            </h5>
            <p className="text-center">
                Device ID : <span className="font-weight-bolderer"> {deviceSelected.request && deviceSelected.request.mac} </span>
            </p>
            <ModalFooter className="d-flex justify-content-around px-0">
                <Button.Ripple
                    color   = "primary" 
                    outline 
                    onClick = {() => { setShow(false) }}
                >
                    Tidak
                </Button.Ripple>
                <Button.Ripple 
                    color       = "primary" 
                    onClick     = {() => { SubmitResetDevice() }}
                    className   = "px-3" 
                >
                    {loading ? <Spinner size="sm" /> : "Ya"}
                </Button.Ripple>
            </ModalFooter>
        </ModalBase>
    );
};

export default ResetDevice;