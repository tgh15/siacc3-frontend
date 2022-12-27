import { Fragment, useEffect, useState } from "react";
import Skeleton                          from "react-loading-skeleton";
import { 
    Col, 
    Row, 
    Card,
    Media, 
    Input,
    CardBody, 
} from "reactstrap";

//Image
import imagePower                        from "../../../assets/images/logo/power.png";
import imagePhone                        from "../../../assets/images/logo/phone.png";
import imageLaptop                       from "../../../assets/images/logo/laptop.png";

//Helper
import Helpers                           from "../../../helpers";

//Url Api
import LinkedAccountApi                  from "../../../services/pages/configuration/linked-account/LinkedAccount";

//Css
import "./index.scss";

//Components
import ModalDelete                       from "./modalDelete";
import SearchTable                       from "../../../components/widgets/custom-table/SearchTable";
import ModalOpenMap                      from "./modalOpenMap";
import ModalDeleteAll                    from "./modalDeleteAll";
import CustomTableBodyEmpty              from "../../../components/widgets/custom-table/CustomTableBodyEmpty";
import CustomTablePaginate from "../../../components/widgets/custom-table/CustomTablePaginate";
import CustomToast from "../../../components/widgets/custom-toast";
import { responseURL } from "../../../services";


const LinkAccount = (props) => {
    //Props
    const {setShowAction}                             = props;

    // Helper
    const { dateIndo, useQuery, getUserData }         = Helpers;

    let query                                         = useQuery();
    
    //State
    const [linkeds, setLinkeds]                       = useState([]);
    const [histories, setHistories]                   = useState(null);
    const [isLoading, setIsLoading]                   = useState(false);
    const [pagination, setPagination]                 = useState(null);
    const [searchTerm, setSearchTerm]                 = useState("");
    const [modalDelete, setModalDelete]               = useState(false);
    const [modalOpenMap, setModalOpenMap]             = useState(false);
    const [dataSelected, setDataSelected]             = useState(null);
    const [modalDeleteAll, setModalDeleteAll]         = useState(false);
    const [AvaiableDeleteAll, setAvaiableDeleteAll]   = useState(false);
    const [modalDeleteHistory, setModalDeleteHistory] = useState(false);

    //useEffect tour action
    useEffect(() => {
        if (query.get('action') === 'get'){
            setShowAction('get');
        }else if(query.get('action') === 'search'){
            setShowAction('search');
        }else if(query.get('action') === 'delete'){
            setShowAction('delete');
        }
    }, []);

    const getData = (page=1) => {
        setIsLoading(true);

        const params = {
            page : page,
            uuid : getUserData().uuid_user
        }
        
        LinkedAccountApi.get(params).then(res => {
            if(!res.is_error){
                setIsLoading(false);
                setAvaiableDeleteAll(false)

                if(res.data.linked_device != null && res.data.linked_device.length > 0){
                    setLinkeds(res.data.linked_device);
                    setHistories(res.data.histories.result);
                    setPagination(res.data.histories.pagination);
                }else{
                    setLinkeds([]);
                    setHistories([]);
                    setPagination([]);
                }
                    
            }else{
                CustomToast('danger', res.message)
            }

        }, err => {
            CustomToast('danger', err.message);
        })
    };

    const imageCondition = (is_mobile) => {
        return is_mobile ? imagePhone : imageLaptop;
    };

    const deviceTitleCondition = (is_mobile) => {
        return is_mobile ? "Device ID" : "Browser Version";
    };

    const formatDataSelected = ({
        id,
        time,
        location,
        is_active,
        is_mobile,
        device_id,
        browser = null,
    }) => {
        return setDataSelected({
            id,
            time,
            browser,
            location,
            is_active,
            is_mobile,
            device_id,
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Fragment>
            {/* modal Delete Device Active */}
            <ModalDelete
                data                 = {dataSelected}
                show                 = {modalDelete}
                title                = "Lepas Tautan"
                getData              = {getData}
                onClose              = {() => setModalDelete(!modalDelete)}
                titleButton          = "Akhiri Tautan"
                imageCondition       = {imageCondition}
                deviceTitleCondition = {deviceTitleCondition}
            />

            {/* modal Delete History Device  */}
            <ModalDelete
                data                 = {dataSelected}
                show                 = {modalDeleteHistory}
                title                = "Hapus Tautan"
                getData              = {getData}
                onClose              = {() => setModalDeleteHistory(!modalDeleteHistory)}
                titleButton          = "Hapus Riwayat"
                imageCondition       = {imageCondition}
                deviceTitleCondition = {deviceTitleCondition}
            />

            {/* modal delete all history */}
            <ModalDeleteAll
                show                 = {modalDeleteAll}
                onClose              = {() => setModalDeleteAll(!modalDeleteAll)}
                getData              = {getData}
                histories            = {histories}
                imageCondition       = {imageCondition}
                deviceTitleCondition = {deviceTitleCondition}
            />

            {/* modal open map */}
            <ModalOpenMap
                show    = {modalOpenMap}
                onClose = {() => setModalOpenMap(!modalOpenMap)}
            />

            {/* body */}
            <Row>
                <Col md={{ size: 3, offset: 9 }}>
                    <div id="search-table">
                        <SearchTable 
                            onSearch    = {(e) => { setSearchTerm(e); }} 
                            placeholder = "Cari..." 
                        />
                    </div>
                </Col>
            </Row>
            
            <div id="linked-table">
                {
                    linkeds && linkeds.length > 0 &&
                    <Card>
                        <CardBody>
                            <div>
                                <h4 className="font-weight-bolder">Perangkat Tertaut</h4>
                            </div>
                            {linkeds.filter((val) => {
                                if (searchTerm == "") {
                                    return val
                                } else if (val.login_activity.location.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return val
                                }
                            }).map((linked, index) => (
                                <Media
                                    style     = {{ borderRadius: "5px" }}
                                    className = "d-flex border-primary p-1 mb-1" 
                                >
                                    <Media left>
                                        <img 
                                            src       = {imageCondition(linked.login_activity.is_mobile)}
                                            alt       = "laptop" 
                                            loading   = "lazy" 
                                            className = "image-device"
                                        />
                                    </Media>
                                    <Media
                                        body 
                                        className = "ml-1"
                                    >
                                        <Row>
                                            <Col md={3}>
                                                <p>{deviceTitleCondition(linked.login_activity.is_mobile)}</p>
                                                <p className="font-weight-bolder">{linked.login_activity.is_mobile ? linked.login_activity.device_id : `${linked.login_activity.user_agent_parse.browser_name} ${linked.login_activity.user_agent_parse.browser_version}`}</p>
                                            </Col>
                                            <Col md={3}>
                                                <p>Location</p>
                                                <a 
                                                    href      = {`https://www.google.com/maps/@${linked.login_activity.latitude},${linked.login_activity.longitude},15z`} 
                                                    target    = "_blank" 
                                                    className = "font-weight-bolder"
                                                >
                                                    {linked.login_activity.location}
                                                </a>
                                            </Col>
                                            <Col md={3}>
                                                <p>Time</p>
                                                <p className="font-weight-bolder">
                                                    {new Date(linked.login_activity.updated_at).getHours()}:{new Date(linked.login_activity.updated_at).getMinutes()}
                                                </p>
                                            </Col>
                                            <Col md={3}>
                                                <p>Status</p>
                                                <div className="d-flex">
                                                    <div className="status-round primary"></div>
                                                    <p className="font-weight-bolder text-primary">Aktif</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Media>
                                    <div id="turn-off-device">
                                        <Media right>
                                            <img 
                                                src       = {imagePower} 
                                                alt       = "laptop" 
                                                loading   = "lazy" 
                                                onClick   = {() => {
                                                    formatDataSelected({
                                                        id        : linked.id,
                                                        is_active : true,
                                                        location  : linked.login_activity.location,
                                                        is_mobile : linked.login_activity.is_mobile,
                                                        browser   : `${linked.login_activity.user_agent_parse.browser_name} ${linked.login_activity.user_agent_parse.browser_version}`,
                                                        device_id : linked.login_activity.device_id,
                                                        time      : new Date(linked.login_activity.updated_at).getHours() + ":" + new Date(linked.login_activity.updated_at).getMinutes()
                                                    });
                                                    setModalDelete(true)
                                                }}
                                                className = "cursor-pointer" 
                                            />
                                        </Media>
                                    </div>
                                </Media>
                            ))}
                        </CardBody>
                    </Card>
                }
            </div>

            {isLoading && <Skeleton style={{ height: "180px", marginBottom: "40px" }} />}
            
            <div id="history-linked">
                {!isLoading && histories && histories.length > 0 &&
                    <Card>
                        
                        <CardBody>
                            
                            <div className="d-flex justify-content-between">
                                <h4 className="font-weight-bolder">{AvaiableDeleteAll ? `${histories.length} Perangkat Terpilih` : "History Perangkat Tertaut"}</h4>
                                <div 
                                    id        = "turn-off-history"
                                    className = "d-flex" 
                                >
                                    <Input
                                        type     = "checkbox"
                                        onChange = {() => setAvaiableDeleteAll(!AvaiableDeleteAll)}
                                    />
                                    <p>Pilih Semua</p>
                                    {
                                        AvaiableDeleteAll ?
                                            <img
                                                src       = {imagePower}
                                                alt       = "laptop"
                                                style     = {{ width: "25px", height: "25px" }}
                                                loading   = "lazy"
                                                onClick   = {() => setModalDeleteAll(!modalDeleteAll)}
                                                className = "cursor-pointer ml-2"
                                            />
                                        : null
                                    }
                                </div>
                            </div>
                            
                            <Row className="d-flex justify-content-end mb-2">
                                <CustomTablePaginate
                                    getData         = {(params) => { getData(params.page)}}
                                    pagination      = {pagination} 
                                    offsetSearch    = {12} 
                                />
                            </Row>

                            {histories && histories.length > 0 && histories.filter((val) => {
                                if (searchTerm == "") {
                                    return val
                                } else if (val.location.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return val
                                }
                            }).map((history, index) => (
                                <Media 
                                    style     = {{ borderRadius: "5px" }}
                                    className = "d-flex border-primary p-1 mb-1" 
                                >
                                    <Media left>
                                        <img
                                            src       = {imageCondition(history.is_mobile)}
                                            alt       = "device"
                                            loading   = "lazy"
                                            onClick   = {() => {
                                                formatDataSelected({
                                                    id        : history.id,
                                                    is_active : false,
                                                    location  : history.location,
                                                    is_mobile : history.is_mobile,
                                                    browser   : `${history.user_agent_parse.browser_name} ${history.user_agent_parse.browser_version}`,
                                                    device_id : history.device_id,
                                                    time      : dateIndo(history.updated_at)
                                                });
                                                setModalDeleteHistory(true)
                                            }}
                                            className = "cursor-pointer"
                                        />
                                    </Media>
                                    <Media body className="ml-1">
                                        <Row>
                                            <Col md={3}>
                                                <p> {deviceTitleCondition(history.is_mobile)} </p>
                                                <p className="font-weight-bolder">{history.is_mobile ? history.device_id : history.user_agent_parse.browser_name + ' ' + history.user_agent_parse.browser_version}</p>
                                            </Col>
                                            <Col md={3}>
                                                <p>Location</p>
                                                <a target="_blank" href={`https://www.google.com/maps/@${history.latitude},${history.longitude},15z`} className="font-weight-bolder cursor-pointer">{history.location}</a>
                                            </Col>
                                            <Col md={3}>
                                                <p>Time</p>
                                                <p className="font-weight-bolder">
                                                    {dateIndo(history.updated_at)}
                                                </p>
                                            </Col>
                                            <Col md={3}>
                                                <p>Status</p>
                                                <div className="d-flex">
                                                    <div className="status-round danger"></div>
                                                    <p className="font-weight-bolder text-danger">Tidak Tertaut</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Media>
                                </Media>
                            ))}
                        </CardBody>
                    </Card>
                }
            </div>
            {!isLoading && histories && histories.length === 0 && <CustomTableBodyEmpty/>}

            {isLoading && <Skeleton style={{ height: "180px", marginBottom: "40px" }}/>}
        </Fragment>
    );
};

export default LinkAccount;