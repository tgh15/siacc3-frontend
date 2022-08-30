import { useState }     from 'react';

import { 
    Modal, 
    Button, 
    Spinner, 
    ModalBody, 
    ModalFooter, 
    ModalHeader, 
} from 'reactstrap';

import Media            from 'reactstrap/lib/Media';
import PerfectScrollbar from "react-perfect-scrollbar";

//URL API
import LinkedAccountApi from '../../../services/pages/configuration/linked-account/LinkedAccount';

//Helper
import Helpers          from "../../../helpers";

//Components
import CustomToast      from '../../../components/widgets/custom-toast';


const ModalDeleteAll = props => {
    // Props
    const {
        show,
        onClose,
        getData,
        histories,
        imageCondition,
        deviceTitleCondition,
    } = props;

    // Helper
    const { dateIndo }              = Helpers;

    // State
    const [isLoading, setIsLoading] = useState(false);

    //Delete All
    const deleteAll = () => {
        LinkedAccountApi.deleteAllHistory(Array.from(histories, history => history.id)).then(res => {
            setIsLoading(false);
            onClose();
            CustomToast("success", "Data Berhasil Dihapus");
            getData()
        }, err => {
            console.log(err)
        });
    }

    return (
        <Modal
            isOpen    = {show}
            toggle    = {() => onClose()}
            className = " modal-detail"
        >
            <ModalHeader>
                Hapus Semua Tautan
            </ModalHeader>
            <ModalBody>
                <PerfectScrollbar style={{ maxHeight: "350px" }}>
                    {
                        histories && histories.map((history) => (
                            <Media 
                                style     = {{ borderRadius: "5px" }}
                                className = "border-primary mb-1" 
                            >
                                <Media>
                                    <img 
                                        src     = {imageCondition(history.is_mobile)} 
                                        alt     = "laptop" 
                                        style   = {{ height: "150px", width: "150px" }}
                                        loading = "lazy" 
                                    />
                                </Media>
                                <Media body>
                                    <table className='table-information delete-all'>
                                        <tbody>
                                            <tr>
                                                <td>Status</td>
                                                <th>
                                                    <div className="d-flex">
                                                        <div className="status-round danger"></div>
                                                        <p className="font-weight-bolder text-danger">Tidak Tertaut</p>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {deviceTitleCondition(history.is_mobile)}
                                                </td>
                                                <th>
                                                    {history.is_mobile ? history.device_id : history.user_agent_parse.browser_name + ' ' + history.user_agent_parse.browser_version}
                                                </th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Location
                                                </td>
                                                <th>
                                                    {history.location}
                                                </th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Time
                                                </td>
                                                <th>
                                                    {dateIndo(history.updated_at)}
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Media>
                            </Media>
                        ))
                    }
                </PerfectScrollbar>
            </ModalBody>
            
            <ModalFooter className='d-flex justify-content-between'>
                <Button 
                    color     = "primary" 
                    onClick   = {() => onClose()} 
                    className = "px-3"
                >
                    Batal
                </Button>
                <Button 
                    color    = "primary" 
                    outline 
                    onClick  = {() => {
                        setIsLoading(true);
                        deleteAll();
                    }}
                    disabled = {isLoading} 
                >
                    {!isLoading ? "Hapus Semua Riwayat" : <Spinner color="primary" size="sm"/>}
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalDeleteAll;