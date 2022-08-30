import { Button, ModalFooter }  from 'reactstrap';

//Components
import ImageRounded             from '../../../components/widgets/image-rounded';
import { ModalBase }            from '../../../components/widgets/modals-base';
import ImageNotDevice           from '../../../assets/images/pages/not-connected-device-dark.png';


const ModalUnDevice = (props) => {
    const {
        show,
        SetModalUnDevice
    } = props;

    return (
        <ModalBase 
            size    = "sm" 
            show    = {show} 
            center  = {true} 
            setShow = {(par) => {SetModalUnDevice(par)}}
        >
            <div className="text-center">
                <ImageRounded src={ImageNotDevice}/>
            </div>
            <p className="text-center px-5">
                Belum Terhubung dengan device mobile manapun
            </p>
            <ModalFooter className="d-flex justify-content-around">
                <Button.Ripple color="primary" onClick={() => { SetModalUnDevice(false) }} block>
                    Ok
                </Button.Ripple>
            </ModalFooter>
        </ModalBase>
    );
};

export default ModalUnDevice;