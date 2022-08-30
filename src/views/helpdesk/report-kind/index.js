import React, { Fragment, useEffect, useState } from 'react';
import { Col }                                  from 'reactstrap';
import Skeleton                                 from 'react-loading-skeleton';

//Icon
import { Edit2, Trash2 }                        from 'react-feather';

//Components
import ModalForm                                from './modalForm';
import FormDelete                               from '../../../components/widgets/form-delete/FormDelete';
import indexHeader                              from '../report-kind/indexHeader';
import CustomTable                              from '../../../components/widgets/custom-table';
import CustomToast                              from '../../../components/widgets/custom-toast';
import { ModalBase }                            from '../../../components/widgets/modals-base';
import CustomTableBody                          from '../../../components/widgets/custom-table/CustomTableBody';
import CustomTableBodyEmpty                     from '../../../components/widgets/custom-table/CustomTableBodyEmpty';

//Url Api
import { ReportKindAPI }                        from '../../../services/pages/helpdesk/report-kind';


const ReportKind = () => {
    //State
    const [loading, setLoading]               = useState(false);
    const [dataForm, setDataForm]             = useState(null);
    const [modalForm, setModalForm]           = useState(false);
    const [allReportKind, setAllReportKind]   = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    useEffect(() => {
        getReportKind();
    }, []);

    //Get report kind
    const getReportKind = () => {
        ReportKindAPI.getAllReportKind().then(
            res => {
                if(res.status === 200 && res.data != null){
                    setAllReportKind(res.data);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //Delete report kind
    const handleDelete = () => {
        setLoading(true);

        ReportKindAPI.deleteReportKind(dataForm).then(
            res => {
                if (res.status === 200) {
                    setLoading(false);
                    setAllReportKind(false);
                    setShowDeleteForm(false);

                    //Success Message
                    CustomToast("success", "Data Berhasil di hapus");

                    //Refresh page
                    getReportKind();
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    return (
        <Fragment>
            {/* Delete */}
            <FormDelete
                show        = {showDeleteForm}
                title       = "Hapus Jenis Laporan"
                setShow     = {(par) => setShowDeleteForm(par)}
                loading     = {loading} 
                onDelete    = {handleDelete}
            />

            {/* Create and Update */}
            <ModalBase
                show    = {modalForm}
                size    = "sm"
                title   = {`${(dataForm) ? "Ubah" : "Tambah"} Jenis Laporan`}
                setShow = {(par) => { setModalForm(par) }}
            >
                <ModalForm
                    data          = {dataForm}
                    onCancel      = {() => setModalForm(false)}
                    setListData   = {(data) => setAllReportKind(data)}
                    setModalForm  = {(par) => setModalForm(par)}
                    getReportKind = {getReportKind}
                />
            </ModalBase>

            <CustomTable 
                header      = {indexHeader}
                onClickForm = {() => { 
                    setDataForm(null); 
                    setModalForm(!modalForm)
                }}

                //Role
                roleAdd     = {true}
            >
                {
                    allReportKind && allReportKind.map((data, index) => (
                        <CustomTableBody>
                            <Col md="1">
                                {index+1}
                            </Col>
                            <Col md="9">
                                {data.name}
                            </Col>
                            <Col md="2">
                                <Edit2
                                    size      = {20}
                                    onClick   = {() => { 
                                        setDataForm(data); 
                                        setModalForm(!modalForm) 
                                    }}
                                    className = "mr-1 cursor-pointer"
                                />
                                <Trash2
                                    size      = {20}
                                    onClick   = {() => { 
                                        setDataForm(data.id); 
                                        setShowDeleteForm(true) 
                                    }}
                                    className = "cursor-pointer"
                                />
                            </Col>
                        </CustomTableBody>
                    ))
                }

                {
                    !allReportKind && allReportKind !== null &&
                    <Skeleton
                        count   = {3} 
                        style   = {{ marginBottom: "10px" }}
                        height  = {60} 
                    />
                }
                {
                    allReportKind && allReportKind.length === 0 &&
                    <CustomTableBodyEmpty/>
                }
            </CustomTable>
        </Fragment>
    );
};

export default ReportKind;