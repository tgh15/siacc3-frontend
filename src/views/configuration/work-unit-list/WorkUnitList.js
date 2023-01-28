import { Fragment, useEffect, useRef, useState } from "react";
import { Link }                                  from "react-router-dom";
import Skeleton                                  from "react-loading-skeleton";
import { Marker, Popup }                         from "react-map-gl";
import { Col, Row, Button }                      from "reactstrap";

//Icon
import { Edit2, Eye, Filter, Plus, Trash2 }      from "react-feather";

//Css
import 'mapbox-gl/dist/mapbox-gl.css';
import '@styles/react/libs/swiper/swiper.scss';

//API
import workunitListAPI                           from "../../../services/pages/configuration/unit-work-list/WorkunitList";

//Helper
import Helper                                    from "../../../helpers";

//Image
import imgMarker                                 from "../../../assets/images/map_icons/point-map.png";
import logo                                      from "../../../assets/images/logo/logo-kejaksaan.png";

//Components
import TourInput                                 from "./TourInput";
import TourFilter                                from "./TourFilter";
import FormDelete                                from '../../../components/widgets/form-delete/FormDelete'
import CustomTable                               from "../../../components/widgets/custom-table";
import headerTable                               from "./headerTable";
import CustomToast                               from "../../../components/widgets/custom-toast";
import SearchTable                               from "../../../components/widgets/custom-table/SearchTable";
import MapWorkunit                               from "./MapWorkunit";
import ImageRounded                              from "../../../components/widgets/image-rounded";
import { ModalBase }                             from "../../../components/widgets/modals-base";
import CustomTableBody                           from "../../../components/widgets/custom-table/CustomTableBody";
import WorkUnitLevelSelect                       from "./WorkUnitLevelSelect";
import CustomTablePaginate                       from "../../../components/widgets/custom-table/CustomTablePaginate";
import CustomTableBodyEmpty                      from "../../../components/widgets/custom-table/CustomTableBodyEmpty";
import CustomTableNotAuthorized                  from "../../../components/widgets/custom-table/CustomTableNotAuthorized";

import SwiperCore, {
    Lazy,
    Navigation,
    Pagination,
} from 'swiper';
import { UserManagementProvider } from "../../../context/UserManagementContext";


SwiperCore.use([Navigation, Pagination, Lazy]);


const WorkUnitList = (props) => {
    const size = 20;

    //State
    const [data, setData]                                   = useState(false);
    const [loading, setLoading]                             = useState(false);
    const [dataMap, setDataMap]                             = useState(false);
    const [showForm, setShowForm]                           = useState(false);
    const [listData, setListData]                           = useState(false);
    const [filterForm, setFilterForm]                       = useState(false);
    const [pagination, setPagination]                       = useState(false);
    const [showDeleteForm, setShowDeleteForm]               = useState(false);
    const [selectedMarker, setSelectedMarker]               = useState(null);
    const [statusGetData, setStatusGetData]                 = useState(null);

    // refs 
    const params = useRef({
        page              : 1,
        keyword           : "",
        id_list           : [],
        order_by          : "latest",
        workunit_level_id : 0,
    })

    //Props
    const { setShowAction } = props;

    //Helper
    const { getRoleByMenuStatus, useQuery } = Helper;

    let query = useQuery();

    // useEffect tour action
    useEffect(() => {
        if (query.get('action') === 'get') {
            setShowAction('get');
        } else if (query.get('action') === 'search') {
            setShowAction('search');
        } else if (query.get('action') === 'delete') {
            setShowAction('delete');
        } else if (query.get('action') === 'create') {
            setShowAction('create');
        } else if (query.get('action') === 'update') {
            setShowAction('update');
        } else if (query.get('action') === 'filter') {
            setShowAction('filter');
        } else if (query.get('action') === 'detail') {
            setShowAction('detail');
        }
    }, []);

    useEffect(() => {
        getData();
    }, []);

    // Get workunit list
    const getData = () => {
        workunitListAPI.getWorkunitList(params.current.page, params.current.keyword).then(
            res => {
                if (!res.is_error) {
                    setDataMap(res.data.workunit);
                    setListData(res.data.workunit);
                    setPagination(res.data.pagination);
                } else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };
    
    // Delete workunit list
    const onDelete = () => {
        setLoading(true);

        const formData = {
            id : data.id
        };

        workunitListAPI.deleteWorkunitList(formData).then(
            res => {
                if (!res.is_error) {
                    getData();
                    setLoading(false);
                    setListData(false);
                    setShowDeleteForm(!showDeleteForm);
                    CustomToast("success", "Data Berhasil di hapus");
                } else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //Filter order by
    const filterByOrder = (formDatas) => {

        params.current.order_by = formDatas.order;
        
        setLoading(true);
        setListData(false);

        const formData = {
            order_by            : params.current.order_by,
            workunit_level_id   : params.current.workunit_level_id
        }

        if(formDatas.workunit_id.length > 0){
            formData.id_list      = formDatas.workunit_id;
        }

        workunitListAPI.filterByOrder(params.current.page, formData).then(
            res => {
                if (!res.is_error) {
                    setLoading(false);
                    setListData(res.data.workunit);
                    setDataMap(res.data.workunit);
                    setFilterForm(false);
                } else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //Filter workunit
    const FilterWorkunitByLevel = () => {
        setListData(false);

        const formData = {
            workunit_level_id: params.current.workunit_level_id
        }

        workunitListAPI.filterWorkunitByLevel(params.current.page, formData).then(
            res => {
                if (!res.is_error) {
                    setListData(res.data.workunit);
                    setDataMap(res.data.workunit);
                    setPagination(res.data.pagination);
                } else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    return (
        <Fragment>
            {/* modal Form */}
            <ModalBase
                size    = "lg"
                show    = {showForm}
                title   = {`${data ? "Ubah" : "Tambah"} Satuan Kerja`}
                setShow = {(par) => setShowForm(par)}
                unmount = {true}
            >
                <TourInput
                    data         = {data}
                    getData      = {getData}
                    onCancel     = {(par) => setShowForm(par)}
                    setListData  = {(par) => { setListData(par) }}
                    setModalForm = {(par) => { setShowForm(par) }}
                />
            </ModalBase>

            {/* modal Filter */}
            <ModalBase
                size    = "sm"
                show    = {filterForm}
                title   = "Filter"
                setShow = {(par) => setFilterForm(par)}
            >
                <UserManagementProvider>

                    <TourFilter
                        onFilter = {(par) => {
                            setStatusGetData("filter")
                            filterByOrder(par)
                        }}
                        loading  = {loading}
                        onClose  = {() => (setFilterForm(!filterForm))}
                    />
                </UserManagementProvider>
            </ModalBase>

            {/* modal Delete */}
            <FormDelete
                show        = {showDeleteForm}
                title       = "Hapus Jabatan"
                setShow     = {(par) => setShowDeleteForm(par)}
                loading     = {loading}
                onDelete    = {onDelete}
                description = {`${data.name}`}
            />

            <Row>
                <Col md="1"  className="pr-0">
                    <Button.Ripple
                        size    = "sm"
                        color   = "primary"
                        onClick = {() => { setFilterForm(!filterForm) }}
                    >
                        <Filter
                            id   = "filter-data"
                            size = {14}
                        />
                    </Button.Ripple>
                </Col>
                <Col
                    md        = "7"
                    id        = "filter-satker"
                    className = "pl-0"
                >
                    <WorkUnitLevelSelect
                        onSelect         = {(value) => {
                            setStatusGetData("level");
                            params.current.page = 1;
                            params.current.workunit_level_id = value;
                            FilterWorkunitByLevel();
                        }}
                        getAllData       = {() => { getData() }}
                        setListData      = {(par) => { setListData(par) }}
                        setStatusGetData = {() => setStatusGetData(null)}
                    />
                </Col>
                <Col md="4">
                    <SearchTable
                        onSearch    = {
                            (keyword) => {
                                setStatusGetData(null);
                                setListData(false);
                                params.current.keyword = keyword;
                                params.current.page = 1;
                                getData();
                            }
                        }
                        placeholder  = "Cari Satuan Kerja..."
                        offsetSearch = "8"
                    />
                </Col>
            </Row>

            {
                getRoleByMenuStatus('Daftar Satker', 'map') ?
                    dataMap &&
                    <MapWorkunit>
                        {
                            dataMap.map((data, i) => (
                                <Marker
                                    key       = {data.id}
                                    latitude  = {data.latitude}
                                    longitude = {data.longitude}
                                >
                                    <button
                                        style   = {{ background: 'none', border: 'none', height: size + 10, width: size + 10, borderRadius: '50%', textAlign: 'center', color: 'white', transform: `translate(${-size / 1.5}px,${-size}px)`, cursor: 'pointer' }}
                                        onClick = {(e) => { setSelectedMarker(data) }}
                                    >
                                        <ImageRounded
                                            src   = {imgMarker}
                                            style = {{ width: "20px" }}
                                        />
                                    </button>
                                </Marker>
                            ))
                        }
                        {
                            selectedMarker ? (
                                <Popup
                                    onClose   = {() => { setSelectedMarker(null) }}
                                    latitude  = {selectedMarker.latitude}
                                    longitude = {selectedMarker.longitude}
                                >
                                    <div className="d-flex flex-column align-items-center py-0">
                                        <div>
                                            <ImageRounded
                                                src   = {selectedMarker.logo}
                                                width = {40}
                                            />
                                        </div>
                                        <p
                                            style     = {{ color: "black", fontSize: "12px" }}
                                            className = "font-weight-bolder mt-1"
                                        >
                                            {selectedMarker.name}
                                        </p>
                                        <Link to={`/configuration/work-unit-list/${selectedMarker.id}`} > Detail </Link>
                                    </div>
                                </Popup>
                            ) : null
                        }
                    </MapWorkunit>
                    : null
            }

            {
                !dataMap && dataMap === null &&
                <MapWorkunit id="map-satker" />
            }

            {
                !dataMap && dataMap != null &&
                <Skeleton style={{ height: "300px", marginBottom: "20px" }} />
            }
            <div className="mb-1 d-flex justify-content-between">
                {
                    getRoleByMenuStatus('Daftar Satker', 'add') ?
                        <Button
                            id="add-data"
                            size    = "sm"
                            color   = "primary"
                            outline
                            onClick = {() => {
                                setData(false);
                                setShowForm(true);
                            }} >
                            <Plus size="14"/>
                        </Button> 
                    : null
                }

                <CustomTablePaginate
                    pagination = {pagination}
                    onNext     = {() => {
                        params.current.page = params.current.page + 1;

                        if (statusGetData == "filter") {
                            filterByOrder();
                        } else if (statusGetData == "level") {
                            FilterWorkunitByLevel();
                        } else {
                            setListData(false);
                            getData();
                        }
                    }}
                    onPrev={() => {
                        params.current.page = params.current.page - 1;

                        if (statusGetData == "filter") {
                            filterByOrder();
                        } else if (statusGetData == "level") {
                            FilterWorkunitByLevel();
                        } else {
                            setListData(false);
                            getData();
                        }
                    }}
                />
            </div>

            {
                getRoleByMenuStatus('Daftar Satker', 'workunit_list') ?
                    <CustomTable
                        header  = {headerTable}
                        getData = {(params) => { setListData(false); console.log(params); getData(params) }}
                    >
                        {
                            listData && listData.map((data, i) => (
                                <div 
                                    id  = "workunit-list-table"
                                    key = {i}
                                >
                                    <CustomTableBody>
                                        <Col
                                            md        = "1"
                                            className = "text-center"
                                        >
                                            {Helper.customTableNumber({ key: i, pagination: pagination })}
                                        </Col>
                                        <Col
                                            md        = "2"
                                            className = "text-center"
                                        >
                                            <img
                                                src       = {data.logo}
                                                style     = {{ width: 60, height: 60 }}
                                                onError   = {(val) => val.target.src = logo}
                                                className = "mb-1"
                                            /><br />
                                            <span
                                                style     = {{ overflowWrap: 'break-word', wordWrap: 'break-word' }}
                                                className = "mt-1"
                                            >
                                                {data.name}
                                            </span>
                                        </Col>
                                        <Col
                                            md        = "2"
                                            className = "d-flex align-items-center"
                                        >
                                            {data.name}
                                        </Col>
                                        <Col
                                            md        = "2"
                                            className = "d-flex align-items-center"
                                        >
                                            {data.phone_number}
                                        </Col>
                                        <Col
                                            md        = "2"
                                            className = "d-flex align-items-center text-justify"
                                        >
                                            {data.email}
                                        </Col>
                                        <Col
                                            md        = "2"
                                            className = "d-flex align-items-center text-justify"
                                        >
                                            {data.address}
                                        </Col>
                                        <Col
                                            md        = "1"
                                            className = "d-flex align-items-center justify-content-between"
                                        >
                                            {
                                                getRoleByMenuStatus('Daftar Satker', 'detail') ?
                                                    <div id="position-view">
                                                        <Link to={`/configuration/work-unit-list/${data.id}?level=${data.workunit_level_id}`} >
                                                            <Eye
                                                                size      = {20}
                                                                style     = {{ color: '#616161' }}
                                                                className = "cursor-pointer text-secondary"
                                                            />
                                                        </Link>
                                                    </div>
                                                : null
                                            }
                                            {
                                                getRoleByMenuStatus('Daftar Satker', 'edit') ?
                                                    <div id="position-update">
                                                        <Edit2
                                                            size      = {20}
                                                            onClick   = {() => { setData(data); setShowForm(true); }}
                                                            className = "cursor-pointer"
                                                        />
                                                    </div>
                                                : null
                                            }
                                            {
                                                getRoleByMenuStatus('Daftar Satker', 'delete') ?
                                                    <div id="position-delete">
                                                        <Trash2
                                                            size      = {20}
                                                            onClick   = {() => { setData(data); setShowDeleteForm(true) }}
                                                            className = "cursor-pointer"
                                                        />
                                                    </div>
                                                : null
                                            }
                                        </Col>
                                    </CustomTableBody>
                                </div>
                            ))
                        }
                        
                        {!listData && listData != null && <Skeleton height={100} count={3} style={{ marginBottom: "10px" }}/>}
                        {!listData && listData === null && <CustomTableBodyEmpty/>}
                    </CustomTable>
                : <CustomTableNotAuthorized/>
            }
        </Fragment>
    );
};

export default WorkUnitList;