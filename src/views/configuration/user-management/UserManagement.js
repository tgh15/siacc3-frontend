import { Fragment, useContext, useRef, useState } from 'react';
import { Button, ModalFooter, Modal, ModalHeader } from 'reactstrap';

// ** Components
import Helper from '../../../helpers';
import Detail from './Detail';
import Skeleton from 'react-loading-skeleton';
import TableBody from './TableBody';
import TourInput from './TourInput';
import TourFilter from './TourFilter';
import CustomTable from '../../../components/widgets/custom-table';
import HeaderTable from './HeaderTable';
import ModalStatus from './ModalStatus';
import ModalDeviced from './ModalDeviced';
import ModalUnDevice from './ModalUndevice';
import { ModalBase } from '../../../components/widgets/modals-base';
import ModalChangeDevice from './ModalChangeDevice';
import CustomTableBodyEmpty from '@src/components/widgets/custom-table/CustomTableBodyEmpty';
import CustomTableNotAuthorized from '@src/components/widgets/custom-table/CustomTableNotAuthorized';
import { UserManagementContext } from '../../../context/UserManagementContext';
import UserManagementApi from '../../../services/pages/configuration/user-management';


const UserManagement = () => {
    // Helper 
    const { getRoleByMenuStatus } = Helper;

    //Context
    const {
        getData,
        listData,
        pagination,
        setListData,
        dataSelected,
        setDataSelected,
        filter,
        setFilter,
        setPagination
    } = useContext(UserManagementContext);

    //State
    const [modalForm, setModalForm] = useState(false);
    const [statusType, setStatusType] = useState(false);
    const [modalFilter, setModalFilter] = useState(false);
    const [modalDetail, setModalDetail] = useState(false);
    const [modalStatus, setModalStatus] = useState(false);
    const [modalDeviced, SetModalDeviced] = useState(false);
    const [modalUnDevice, SetModalUnDevice] = useState(false);
    const [modalChangeRequest, setModalChangeRequest] = useState(false);
    const [dataFilter, setDataFilter] = useState(null);

    // refs
    const keyword = useRef({
        keyword : ""
    });


    const getDataFilter = (datas,page) => {
        
        setFilter(true)
        setListData(false);
        setModalFilter(false);
        
        UserManagementApi.filter({
            data: datas,
            page : page,
            onSuccess: (res) => {
                setListData(res.employee);
                setPagination(res.pagination);
            },
            onFail: (err) => {
                console.log(err);
            }
        })
    }

    return (
        <Fragment>
            {/* Modal detail  */}
            <Modal
                isOpen={modalDetail}
                toggle={() => setModalDetail(!modalDetail)}
                className="modal-detail"
                unmountOnClose={true}
            >
                <ModalHeader toggle={() => setModalDetail(!modalDetail)}>
                    Detail Pengguna
                </ModalHeader>

                <Detail data={dataSelected} />

                <ModalFooter>
                    <Button.Ripple
                        color="primary"
                        onClick={() => setModalDetail(false)}
                    >
                        Tutup
                    </Button.Ripple>
                </ModalFooter>
            </Modal>

            {/* Modal Non active  */}
            <ModalBase
                show={modalStatus}
                size="sm"
                center={true}
                setShow={(par) => { setModalStatus(par) }}
            >
                <ModalStatus
                    type={statusType}
                    setListData={(params) => setListData(params)}
                    dataSelected={dataSelected}
                    setModalStatus={(par) => setModalStatus(par)}
                />
            </ModalBase>

            {/* Modal Undevice  */}
            <ModalUnDevice
                show={modalUnDevice}
                SetModalUnDevice={(par) => { SetModalUnDevice(par) }}
            />

            {/* Modal Deviced  */}
            <ModalDeviced
                data={dataSelected}
                show={modalDeviced}
                refreshData={(par) => { getData({page:1}) }}
                SetModalDeviced={(par) => { SetModalDeviced(par) }}
            />

            {/* Modal Form  */}
            <ModalBase
                show={modalForm}
                size="lg"
                title={`${dataSelected ? "Ubah" : "Tambah"} Pengguna`}
                setShow={(par) => { setModalForm(par) }}
                unmount={true}
            >
                <TourInput
                    data            = {dataSelected}
                    setListData     = {(par) => { setListData(par) }}
                    setModalForm    = {(par) => { setModalForm(par) }}
                />
            </ModalBase>

            {/* Modal Filter  */}
            <ModalBase
                show={modalFilter}
                size="sm"
                title="Filter"
                setShow={(par) => { setModalFilter(par) }}
               
            >
                <TourFilter
                    setModalFilter={(par) => { setModalFilter(par) }}
                    onFilter={(value) => {
                        setDataFilter(value);
                        getDataFilter(value,1);
                    }}
                />
            </ModalBase>

            <ModalChangeDevice
                show={modalChangeRequest}
                setShow={(par) => { setModalChangeRequest(par) }}
                SetModalDeviced={(par) => { SetModalDeviced(par) }}

            />

            {
                getRoleByMenuStatus('Manajemen Pengguna', 'user_management_list') ?
                    <CustomTable
                        header={HeaderTable}
                        getData={(params) => {
                            getData({
                                page: pagination.page,
                                ...params
                            })
                        }}
                        onSearch={(value) => {
                            keyword.current.keyword = value;

                            getData({
                                page: 1,
                                params: keyword.current
                            });
                        }}
                        pagination={pagination}
                        onClickForm={() => { setDataSelected(false); setModalForm(true) }}
                        placeholder="Cari Pengguna..."
                        onClickFilter={() => { setModalFilter(true) }}
                        onNext  ={() => {
                            if (!filter) {
                                getData({
                                    page: pagination.current_page + 1,
                                    params: keyword.current
                                });
                            }else{
                                getDataFilter(dataFilter,pagination.current_page + 1);
                            }
                        }}
                        onPrev={() => {
                            if (!filter) {
                                getData({
                                    page: pagination.current_page - 1,
                                    params: keyword.current
                                });
                            }else{
                                getDataFilter(dataFilter,pagination.current_page - 1);
                            }
                        }}

                        //Role
                        roleAdd={getRoleByMenuStatus('Manajemen Pengguna', 'add')}
                    >
                        <div id="usermanajement-table">
                            {
                                listData && listData.map((data, i) => (
                                    <TableBody
                                        data={data}
                                        index={i}
                                        setModalForm={(par) => { setModalForm(par) }}
                                        setStatusType={(par) => { setStatusType(par) }}
                                        setModalStatus={(par) => { setModalStatus(par) }}
                                        setModalDetail={(par) => { setModalDetail(par) }}
                                        SetModalDeviced={(par) => { SetModalDeviced(par) }}
                                        SetModalUnDevice={(par) => { SetModalUnDevice(par) }}
                                        setModalChangeRequest={(par) => { setModalChangeRequest(par) }}
                                    />
                                ))
                            }
                        </div>

                        {!listData && listData !== null && <Skeleton height={60} count={3} style={{ marginBottom: "10px" }} />}
                        {!listData && listData === null && <CustomTableBodyEmpty />}
                    </CustomTable>
                    : <CustomTableNotAuthorized />
            }
        </Fragment>
    );
};

export default UserManagement;