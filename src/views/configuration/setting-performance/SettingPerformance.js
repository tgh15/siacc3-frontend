import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Edit2, Eye, Star, Trash2 } from "react-feather";
import { Col, Row, Nav, NavItem, NavLink } from "reactstrap";

//Components
import Helper from "../../../helpers";
import Detail from "./Detail";
import Skeleton from "react-loading-skeleton";
import ButtonAdd from "../../../components/widgets/custom-table/ButtonAdd";
import FormDelete from "../../../components/widgets/form-delete/FormDelete";
import headerTable from "./headerTable";
import CustomTable from "../../../components/widgets/custom-table";
import SearchTable from "../../../components/widgets/custom-table/SearchTable";
import CustomToast from "../../../components/widgets/custom-toast";
import { ModalBase } from "../../../components/widgets/modals-base";
import CustomTableBody from "../../../components/widgets/custom-table/CustomTableBody";
import CustomTablePaginate from "../../../components/widgets/custom-table/CustomTablePaginate";
import CustomTableBodyEmpty from "../../../components/widgets/custom-table/CustomTableBodyEmpty";
import SelectOptionsService from "../../../services/pages/select-options";
import FormSettingPerformance from './FormSettingPerformance';
import CustomTableNotAuthorized from "../../../components/widgets/custom-table/CustomTableNotAuthorized";

//API
import SettingPerformanceApi from "../../../services/pages/configuration/setting-performance";
import headerTableTrophy from "./headerTableTrophy";
import headerTableRating from "./headerTableRating";
import { ThemeColors } from "../../../components/utility/context/ThemeColors";
import Rating from 'react-rating'
import FormTrophy from "./FormTrophy";
import FormRating from "./FormRating";

const SettingPerformance = () => {
    //UseRef
    const searchTerm = useRef("");

    //State
    const [isEvent, setIsEvent] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [listData, setListData] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [pagination, setPagination] = useState(false);
    const [staticBadge, setStaticBadge] = useState(null);
    const [dataSelected, setDataSelected] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [workunitOption, setWorkunitOption] = useState(null);
    const [kindAchievementOption, setKindAchievementOption] = useState(null);
    const [showFormTrophy, setShowFormTrophy] = useState(false);
    const [showFormRating, setShowFormRating] = useState(false);

    const { getRoleByMenuStatus } = Helper;

    // context 
    const themeColors = useContext(ThemeColors)

    const toggle = tab => {
        if (isEvent !== tab) {
            setIsEvent(tab);
            console.log(tab)
            getData(tab);
        }
    };

    const getData = (tab, page) => {
        setListData(false);

        if (tab == true || tab == false) {
            SettingPerformanceApi.get({
                body: { is_event: tab },
                params: {
                    page: page ?? 1,
                    keyword: searchTerm.current
                },
                onSuccess: (res) => {
                    setListData(res.achievement);
                    setPagination(res.pagination);
                }, onFail: (err) => {
                    CustomToast("danger", err.message)
                }
            })
        } else if (tab == "trophy") {
            SettingPerformanceApi.getTrophy(null, { page: page ?? 1, keyword: searchTerm.current }).then(
                res => {
                    setListData(res.data.trophy_configs);
                    setPagination(res.data.pagination);
                },
                err => {
                    CustomToast("danger", err.message)
                }
            );
        } else if (tab == "rating") {
            SettingPerformanceApi.getRating({ page: page }).then(
                res => {
                    setListData(res.data.ratings_configs);
                    setPagination(res.data.pagination);
                },
                err => {
                    CustomToast("danger", err.message)
                }
            );
        }
    };

    const getStaticBadge = () => {
        SettingPerformanceApi.staticBadge({
            onSuccess: (res) => {
                setStaticBadge(res.data);
            }, onFail: (err) => {
                CustomToast("danger", err.message);
            }
        })
    };

    const onDelete = () => {
        setLoading(true);

        if (isEvent == true || isEvent == false) {
            SettingPerformanceApi.delete({
                id: dataSelected.id,
                onSuccess: (res) => {
                    setLoading(false);
                    setShowDeleteForm(false);
                    getData(isEvent)
                    CustomToast("success", "Data Berhasil Dihapus");
                }, onFail: (err) => {
                    setLoading(false);
                    setShowDeleteForm(false);
                    CustomToast("danger", err.message);
                }
            })
        } else if (isEvent == "trophy") {
            SettingPerformanceApi.deleteTrophy({ id: dataSelected.id }).then(
                res => {
                    setLoading(false);
                    setShowDeleteForm(false);
                    getData(isEvent)
                    CustomToast("success", "Data Berhasil Dihapus");
                },
                err => {
                    setLoading(false);
                    setShowDeleteForm(false);
                    CustomToast("danger", err.message)
                }
            );
        } else if (isEvent == "rating") {
            SettingPerformanceApi.deleteRating({ id: dataSelected.id }).then(
                res => {
                    setLoading(false);
                    setShowDeleteForm(false);
                    getData(isEvent)
                    CustomToast("success", "Data Berhasil Dihapus");
                },
                err => {
                    setLoading(false);
                    setShowDeleteForm(false);
                    CustomToast("danger", err.message)
                }
            );
        }

    };

    const getKindOptions = () => {
        SelectOptionsService.kindAchievement({
            onSuccess: (res) => {
                setKindAchievementOption(res);
            }, onFail: (err) => {
                console.log(err);
            }
        })
    };

    const workunitOptions = () => {
        SelectOptionsService.workunit({
            onSuccess: (res) => {
                setWorkunitOption(res);
            }, onFail: (err) => {
                console.log(err);
            }
        })
    };

    // get table dynamic
    // header
    const getHeaderTable = () => {
        if (isEvent == true || isEvent == false) {
            return headerTable;
        } else if (isEvent == "trophy") {
            return headerTableTrophy;
        } else if (isEvent == "rating") {
            return headerTableRating;
        }
    }

    // body
    const getTableBody = (data, i) => {
        if (isEvent == true || isEvent == false) {
            return (
                <Fragment>
                    <Col md="4">
                        {data.title}
                    </Col>
                    <Col md="5">
                        {data.note}
                    </Col>
                </Fragment>
            );
        } else if (isEvent == "trophy") {
            return (
                <Fragment>
                    <Col md="6">
                        {data.name}
                    </Col>
                    <Col md="3">
                        {data.points}
                    </Col>
                </Fragment>
            );
        } else if (isEvent == "rating") {
            return (
                <Fragment>
                    <Col md="3">
                        <Rating
                            emptySymbol={<Star size={32} fill='#babfc7' stroke='#babfc7' />}
                            fullSymbol={<Star size={32} fill={themeColors.colors.warning.main} stroke={themeColors.colors.warning.main} />}
                            initialRating={data.rating}
                            readonly
                        />
                    </Col>
                    <Col md="6">
                        {data.note}
                    </Col>
                </Fragment>
            );
        }
    }

    //  desctiption for form delete
    const getDescFormDelete = () => {
        if (isEvent == true || isEvent == false) {
            return dataSelected.title;
        } else if (isEvent == "trophy") {
            return dataSelected.name
        } else if (isEvent == "rating") {
            return dataSelected.note
        }
    }

    const callForm = () => {
        if (isEvent == true || isEvent == false) {
            setShowForm(true);
        } else if (isEvent == "trophy") {
            setShowFormTrophy(true);
        } else if (isEvent == "rating") {
            setShowFormRating(true);
        }
    }

    useEffect(() => {
        workunitOptions();
        getData(true);
        setIsEvent(true);
        getStaticBadge();
        getKindOptions();
    }, []);





    return (
        <Fragment>
            {/* modal Detail */}
            <ModalBase
                show={showDetail}
                size="lg"
                title="Detail Pengaturan Performance"
                setShow={(par) => { setShowDetail(par) }}
            >
                <Detail
                    isEvent={isEvent}
                    themeColors={themeColors}
                    data={dataSelected}
                    onClose={() => { setShowDetail(false) }}
                />
            </ModalBase>

            {/* Modal Form */}
            <ModalBase
                show    = {showForm}
                size    = "lg"
                title   = {`${dataSelected ? "Ubah" : "Tambah"} Pengaturan Penilaian`}
                setShow = {(par) => { setShowForm(par) }}
            >
                <FormSettingPerformance
                    data                    = {dataSelected}
                    isEvent                 = {isEvent}
                    onCancel                = {() => setShowForm(!showForm)}
                    staticBadge             = {staticBadge}
                    refreshData             = {() => { getData(isEvent) }}
                    workunitOption          = {workunitOption}
                    kindAchievementOption   = {kindAchievementOption}
                />
            </ModalBase>

            {/* Form Trophy */}
            <FormTrophy
                show={showFormTrophy}
                setShow={(par) => setShowFormTrophy(par)}
                onClose={() => setShowFormTrophy(!showFormTrophy)}
                refreshData={() => { getData(isEvent) }}
                isEvent={isEvent}
                data={dataSelected}
            />

            {/* Form Rating */}
            <FormRating
                show={showFormRating}
                setShow={(par) => setShowFormRating(par)}
                onClose={() => setShowFormRating(!showFormRating)}
                refreshData={() => { getData(isEvent) }}
                data={dataSelected}
                themeColors={themeColors}
                listData={listData}
            />

            {/* modal form delete */}
            <FormDelete
                show={showDeleteForm}
                title="Hapus Setting Performance"
                setShow={(par) => setShowDeleteForm(par)}
                loading={loading}
                onDelete={onDelete}
                description={getDescFormDelete()}
            />

            <Row>
                <Col md="1">
                    {
                        getRoleByMenuStatus('Setting Performance', 'add') ?
                            <ButtonAdd onClick={() => {
                                setDataSelected(false);
                                callForm();
                            }} />
                            :
                            null
                    }
                </Col>
                <Col md={{ size: 3, offset: 8 }}>
                    <SearchTable
                        onSearch={(e) => { searchTerm.current = e; getData(isEvent) }}
                        placeholder="Cari Setting Performance"
                    />
                </Col>
                <Col md="4">
                    <Nav className="mb-0" tabs>
                        <NavItem>
                            <NavLink
                                active={isEvent === true}
                                onClick={() => { toggle(true) }}
                            >
                                Event
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={isEvent == false}
                                onClick={() => { toggle(false) }}
                            >
                                Core
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={isEvent == "trophy"}
                                onClick={() => { toggle("trophy") }}
                            >
                                Trophy
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={isEvent == "rating"}
                                onClick={() => { toggle("rating") }}
                            >
                                Rating
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Col>

                <CustomTablePaginate
                    getData={(e) => { getData(isEvent, e.page) }}
                    pagination={pagination}
                    offsetSearch={6}
                />
            </Row>

            {
                getRoleByMenuStatus('Setting Performance', 'event_list') ?
                    <div id="performance-table">
                        <CustomTable header={getHeaderTable()}

                        >
                            {
                                listData && listData.map((data, i) => (
                                    <CustomTableBody key={i}>
                                        <Col md="1">
                                            {Helper.customTableNumber({ key: i, pagination: pagination })}
                                        </Col>
                                        {getTableBody(data, i)}
                                        <Col md="2" className="d-flex justify-content-arround">
                                            {
                                                getRoleByMenuStatus('Setting Performance', 'show') ?
                                                    <Eye
                                                        id="performance-detail"
                                                        size={20}
                                                        onClick={() => { setShowDetail(true); setDataSelected(data) }}
                                                        className="cursor-pointer"
                                                    />
                                                    :
                                                    null
                                            }
                                            {
                                                getRoleByMenuStatus('Setting Performance', 'edit') ?

                                                    <Edit2
                                                        id="performance-update"
                                                        size={20}
                                                        onClick={() => { setDataSelected(data); callForm() }}
                                                        className="ml-1 cursor-pointer"
                                                    />

                                                    :
                                                    null
                                            }
                                            {
                                                getRoleByMenuStatus('Setting Performance', 'delete') ?

                                                    <Trash2
                                                        id="performance-delete"
                                                        size={20}
                                                        onClick={() => { setDataSelected(data); setShowDeleteForm(true) }}
                                                        className="ml-1 cursor-pointer"
                                                    />

                                                    :
                                                    null
                                            }
                                        </Col>
                                    </CustomTableBody>
                                ))
                            }
                            {!listData && listData !== null && <Skeleton height={60} count={5} style={{ marginBottom: "10px" }} />}
                            {!listData && listData === null && <CustomTableBodyEmpty />}
                        </CustomTable>

                    </div>
                    :
                    <CustomTableNotAuthorized />
            }
        </Fragment>
    );
};

export default SettingPerformance;