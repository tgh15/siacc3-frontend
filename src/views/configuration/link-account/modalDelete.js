import { useState }                  from 'react';
import { useHistory }                from "react-router-dom";
import { Button, Col, Row, Spinner } from 'reactstrap';

//URL API
import AuthService                   from '../../../services/pages/authentication/AuthService';
import LinkedAccountApi              from '../../../services/pages/configuration/linked-account/LinkedAccount';

//Components
import CustomToast                   from "../../../components/widgets/custom-toast";
import { ModalBase }                 from '../../../components/widgets/modals-base'


const ModalDelete = props => {
    //Props
    const {
        show,
        data,
        title,
        onClose,
        getData,
        titleButton,
        imageCondition,
        deviceTitleCondition,
    } = props;

    //History
    let history                     = useHistory();

    //State
    const [isLoading, setIsLoading] = useState(false);

    const deleteData = (id) => {
        if (data && data.is_active == false) {
            deleteHistory(id);
        } else {
            deleteLinked(id);
        }
    };

    const deleteLinked = (id) => {
        LinkedAccountApi.deleteLinked(id).then(res => {
            AuthService.checkToken().then(res => {
                setIsLoading(false);
                onClose();
                CustomToast("success", "Data Berhasil Dihapus");
                getData();
            }, err => {
                if (err.status == 401 || err.status == 410) {
                    localStorage.clear();
                    history.push("/login");
                }
            });
        }, err => {
            console.log("err", err);
        });
    };

    const deleteHistory = (id) => {
        LinkedAccountApi.deleteHistory(id).then(res => {
            setIsLoading(false);
            onClose();
            CustomToast("success", "Data Berhasil Dihapus");
            getData();
        }, err => {
            console.log("err", err);
        });
    };

    return (
        <ModalBase
            show    = {show}
            title   = "Informasi Perangkat Tertaut"
            setShow = {() => { onClose(); }}
        >
            <Row>
                <Col md={4}>
                    <img 
                        src     = {imageCondition(data && data.is_mobile)} 
                        alt     = "laptop" 
                        style   = {{ height: "150px" }}
                        loading = "lazy" 
                    />
                    <h4 className='font-weight-bolder text-center mt-1'>{title}</h4>
                </Col>
                <Col>
                    <table className='table-information'>
                        <tbody>
                            <tr>
                                <td>Status</td>
                                <th>
                                    {data && data.is_active ?
                                        <div className="d-flex">
                                            <div className="status-round primary"></div>
                                            <p className="font-weight-bolder text-primary">Aktif</p>
                                        </div> :
                                        <div className="d-flex">
                                            <div className="status-round danger"></div>
                                            <p className="font-weight-bolder text-danger">Tidak Tertaut</p>
                                        </div>
                                    }
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <p>{deviceTitleCondition(data && data.is_mobile)}</p>
                                </td>
                                <th>
                                    {data && data.is_mobile ? data.device_id : data != null ? data.browser : ""}
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    Location
                                </td>
                                <th>
                                    {data && data.location}
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    Time
                                </td>
                                <th>
                                    {data && data.time}
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <div className='d-flex justify-content-between'>
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
                                deleteData(data && data.id);
                            }}
                            disabled = {isLoading} 
                        >
                            {!isLoading ? titleButton : <Spinner color="primary" size="sm" />}
                        </Button>
                    </div>
                </Col>
            </Row>
        </ModalBase>
    );
};

export default ModalDelete;