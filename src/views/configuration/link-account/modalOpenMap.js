import { MapPin }    from 'react-feather';
import { Button }    from 'reactstrap';
import { ModalBase } from '../../../components/widgets/modals-base'


const ModalOpenMap = props => {
    const {
        show,
        onClose,
    } = props;

    return (
        <ModalBase
            show    = {show}
            size    = "sm"
            title   = "Buka Maps"
            setShow = {() => onClose()}
        >
            <div className="d-flex justify-content-start font-weight-bolder m-1">
                <MapPin className='mr-1 text-primary'/> Sudiang, Makassar
            </div>
            <div className='d-flex justify-content-between mt-3'>
                <Button 
                    color     = "primary" 
                    onClick   = {() => onClose()} 
                    outline
                    className = "px-3" 
                >
                    Batal
                </Button>
                <Button 
                    color     = "primary" 
                    className = "px-3"
                >
                    Buka Maps
                </Button>
            </div>
        </ModalBase>
    );
};

export default ModalOpenMap;