import { Fragment, useContext, useState }   from "react";
import { Button, ModalFooter }              from "reactstrap";

//Components
import ResetDevice                          from "./ResetDevice";
import { ModalBase }                        from "../../../components/widgets/modals-base";
import { UserManagementContext }            from "../../../context/UserManagementContext";


const ModalDeviced = (props) => {
    const { show, SetModalDeviced }         = props;
    
    //Context
    const { deviceSelected }                = useContext(UserManagementContext);

    //State
    const [confirmReset, setConfirmReset]   = useState(false);
    
    return (
        <Fragment>
            <ResetDevice 
                show            = {confirmReset} 
                setShow         = {(par) => {setConfirmReset(par)}} 
                SetModalDeviced = {(par) => {SetModalDeviced(par)}}
            />

            <ModalBase 
                show    = {show} 
                size    = "sm" 
                title   = "Terdaftar" 
                center  = {true} setShow={(par) => {SetModalDeviced(par)}}
            >
                <h5 className="text-center px-3 font-weight-bolderer">
                    {deviceSelected.request && deviceSelected.request.device}
                </h5>
                <p className="text-center">
                    Device ID : <span className="font-weight-bolderer">{deviceSelected.request && deviceSelected.request.mac}</span>
                </p>
                <ModalFooter className="d-flex justify-content-around">
                    <Button.Ripple 
                        color   = "primary" 
                        outline 
                        onClick = {() => { setConfirmReset(true) }}
                    >
                        Reset Device
                    </Button.Ripple>
                    <Button.Ripple 
                        color       = "primary" 
                        onClick     = {() => { SetModalDeviced(false) }}
                        className   = "px-5" 
                    >
                        Ok
                    </Button.Ripple>
                </ModalFooter>
            </ModalBase>
        </Fragment>
    );
};

export default ModalDeviced;