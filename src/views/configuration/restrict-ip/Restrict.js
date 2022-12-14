import React, { Fragment, useState, useEffect } from 'react';
import { Col }                                  from "reactstrap";
import Skeleton                                 from "react-loading-skeleton";

//Icon
import { Edit2, Trash2 }                        from 'react-feather';

//Base Modal
import { ModalBase }                            from '@src/components/widgets/modals-base';

//Component
import ModalForm                                from "./ModalForm";
import FormDelete                               from '../../../components/widgets/form-delete/FormDelete';
import HeaderTable                              from './HeaderTable';
import CustomToast                              from '../../../components/widgets/custom-toast';
import CustomTable                              from '../../../components/widgets/custom-table';
import CustomTableBody                          from '../../../components/widgets/custom-table/CustomTableBody';
import CustomTableBodyEmpty                     from '../../../components/widgets/custom-table/CustomTableBodyEmpty';

//Service API
import RestrictAPI                              from '../../../services/pages/configuration/restrict_ip';


const Restrict = () => {
    //State
    const [loading, setLoading]                 = useState(false);
    const [dataForm, setDataForm]               = useState(null);
    const [listData, setListData]               = useState(false);
    const [modalForm, setModalForm]             = useState(false);
    const [idSelected, setIdSelected]           = useState(false);
    const [showDeleteForm, setShowDeleteForm]   = useState(false);

    useEffect(() => {
        getData();
    }, []);

    //API get restrict IP
    const getData = (params) => { 
        RestrictAPI.get({
            onSuccess: (res) => {
                setListData(res.data);
            },
            onFail: (err) => {
                CustomToast("danger", err.message);
            }, params
        });
    };

    //API delete restrict IP
    const handleDelete = () => {
        setLoading(true);

        RestrictAPI.delete({
            id: idSelected.ID,

            onSuccess: (res) => {
                getData();
                setLoading(false);
                setListData(false);
                setShowDeleteForm(!showDeleteForm);

                //message succsess
                CustomToast("success", "Data Berhasi Dihapus");
            },
            onFail: (err) => {
                CustomToast("danger", err.message);
            }
        });
    };

    return (
        <Fragment>
            <ModalBase
                size    = "sm"
                show    = {modalForm}
                title   = {`${(dataForm) ? "Ubah" : "Tambah"} Restriction IP`}
                setShow = {(par) => { setModalForm(par) }}
            >
                <ModalForm
                    getData         = {getData}
                    data            = {dataForm}
                    onCancel        = {() => setModalForm(false)}
                    setListData     = {(data) => setListData(data)}
                    setModalForm    = {(par) => setModalForm(par)} 
                />
            </ModalBase>

            {/* Delete */}
            <FormDelete
                show        = {showDeleteForm}
                title       = "Hapus Restriction IP"
                setShow     = {(par) => setShowDeleteForm(par)} 
                loading     = {loading}
                onDelete    = {handleDelete}
                description = {`IP ${idSelected.ip}`}
            />

            {/* Index */}
            <CustomTable
                header      = {HeaderTable}
                getData     = {(params) => { getData(params) }}
                onClickForm = {() => {
                                setDataForm(null); 
                                setModalForm(!modalForm) 
                            }}
                roleAdd     = {true}
            >   
                <div id="restrict-table">
                    {
                        listData &&
                        listData.map((data, index) => (
                            <CustomTableBody>
                                <Col md="1">
                                    {index+1}
                                </Col>
                                <Col md="9">
                                    {data.ip}
                                </Col>
                                <Col md="2" className="d-flex">
                                    <div id="restrict-update">
                                        <Edit2 
                                            size        = {20}
                                            onClick     = {() => {
                                                            setDataForm(data); 
                                                            setModalForm(!modalForm)
                                                        }} 
                                            className   = "mr-1 cursor-pointer"
                                        />
                                    </div>
                                    <div id="restrict-delete">
                                        <Trash2 
                                            size        = {20} 
                                            onClick     = {() => { 
                                                            setIdSelected(data); 
                                                            setShowDeleteForm(!showDeleteForm)
                                                        }} 
                                            className   = "ml-1 cursor-pointer"
                                        />
                                    </div>
                                </Col>
                            </CustomTableBody>
                        ))
                    }
                </div>

                {
                    !listData && listData !== null && 
                    <Skeleton 
                        count   = {3} 
                        style   = {{ marginBottom: "10px" }} 
                        height  = {60} 
                    />
                }

                {
                    listData && listData.length === 0 && 
                    <CustomTableBodyEmpty/>
                }
            </CustomTable>
        </Fragment>
    );
};

export default Restrict;