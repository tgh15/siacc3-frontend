import React, { Fragment, useState, useEffect } from 'react';

//Component
import Report                                   from './Report';
import CustomToast                              from '../../components/widgets/custom-toast';
import Helper                                   from '../../helpers';

//API
import { feedsReportAPI }                       from '../../services/pages/feeds/report';


const ReportAPI = () => {
    //State
    const [report, setReport]                                   = useState(null);
    const [loading, setLoading]                                 = useState(false);
    const [idSelected, setIdSelected]                           = useState(false);
    const [showDeleteForm, setShowDeleteForm]                   = useState(false);
    const [reportCategory, setReportCategory]                   = useState([]);
    const [detailResultLoading, setDetailResultLoading]         = useState(true);

    const [detailReport, setDetailReport]                       = useState([]);
    const [detailResults, setdetailResults]                     = useState(null);
    const [selectedReport, setSelectedReport]                   = useState([]);
    const [isAddFormVisible, setIsAddFormVisible]               = useState(false);
    const [isDetailReportVisible, setIsDetailReportVisible]     = useState(false);
    const [isDetailResultsVisible, setIsDetailResultsVisible]   = useState(false);

    const [isFormat, setIsFormat]                               = useState(null);
    const [reportKind , setReportKind]                          = useState(null);
    const [workunitKind, setWorkunitKind]                       = useState(null);

    const [showForm, setShowForm]                               = useState(false);

    const {useQuery}                                            = Helper;
    const query                                                 = useQuery();                  

    //get report
    const getReport = () => {
        feedsReportAPI.getReport().then(
            res => {
                if (res.is_error === false && res.data != null) {
                    setReport(res.data);

                    if(query.get('id_report') != undefined){
                        let filter = res.data.filter((data) => (data.id === parseInt(query.get('id_report'))));
                        if(filter.length > 0 ){
                            if(filter[0].results.length > 0){
                                handleDetail(filter[0])
                            }else{
                                handleDetailResults(filter[0])
                            }
                        }
                    }
                }else{
                    setReport([]);

                    if(res.is_error){
                        console.log(res, 'error get report');
                        CustomToast('danger', 'Terjadi kesalahan.');
                    }
                }
            },
            err => {
                console.log(err, 'get report error');
                CustomToast('danger', err.message);
            }
        )
    };

    //get filter categori all
    const getReportCategory = () => {
        feedsReportAPI.getReportCategory().then(
            res => {
                if (res.is_error === false && res.data != null) {
                    let data_ = res.data.map((data ) => (
                        {
                            label : data.name,
                            value : data.id
                        }
                    ))

                    setReportCategory(data_);
                }else{
                    setReportCategory([]);

                    if(res.is_error){
                        console.log(res, 'error get report category');
                        CustomToast('danger', 'Terjadi kesalahan.');
                    }
                }
            },
            err => {
                CustomToast('danger', err.message);
            }
        )
    };

    //create report
    const onSubmit = (formData) => {

        setLoading(true);

        feedsReportAPI.createReport(formData).then(
            res => {
                if(res.is_error === false){
                    setLoading(false);
                    setIsAddFormVisible(false);

                    CustomToast('success', 'Data report berhasil ditambahkan');
                    getReport();
                }else{
                    if(res.message === "time schedule can't be before now"){
                        CustomToast('danger', 'Waktu schedule harus melebihi waktu sekarang!');
                    }else{
                        CustomToast('danger', 'Terjadi Kesalahan.');

                    }
                    console.log(res, 'create report error');
                }
            },
            err => {
                console.log(err, 'create report error');
                CustomToast('danger', 'Terjadi kesalahan.');
            }
        )
    };

    //delete report
    const onDelete = () => {
        setLoading(true);

        feedsReportAPI.deleteReport('asd').then(
            res => {
                if (res.is_error == false) {
                    
                    getReport();

                    setShowDeleteForm(!showDeleteForm);
                    CustomToast("success", "Data Berhasil di hapus");
                }else{
                    console.log(res, 'delete report error');
                    CustomToast('danger', 'Terjadi Kesalahan.');
                }

                setLoading(true);
            },
            err => {
                setLoading(true);
                CustomToast('danger', err.message);

            }
        )
    };

    //detail
    const handleDetailResults = (formData) => {
        delete formData.query;

        setSelectedReport(formData);   
        
        setDetailResultLoading(true);
        setIsDetailResultsVisible(true);
        setIsDetailReportVisible(false);
        
        feedsReportAPI.detailReport(formData).then(
            res => {
                if(res.is_error === false && res.data != null){
                    setdetailResults(res.data);
                }else{
                    setdetailResults([]);

                    if(res.is_error){
                        console.log(res, 'error handle detail results');
                        CustomToast('danger', 'Terjadi kesalahan.');
                    }
                }
                setDetailResultLoading(false);
            },
            err => {
                console.log(err, 'detail report');
            }
        )
    };

    //detail
    const handleDetail = (data) => {
        setDetailReport(data);
        setIsDetailReportVisible(true);
    };

    const printPDF = () => {
        const doc = new jsPDF({
            orientation: "landscape",
        })
        var width = doc.internal.pageSize.getWidth()
    
        doc.text("Laporan Tanpa Schedule", width / 2, 20, { align: 'center' });
        doc.text("1 Oktober 2021", width / 2, 28, { align: 'center' });
        doc.autoTable({
            html: '#my-table',
            margin: { top: 30 },
        })
    
        let dataBody = [];
    
        dataDetails.map((data,i) => (
            dataBody.push([i+1,data.news,data.date,data.like_pimpinan,data.like_agen,data.total_comment])
    ))
        
    
        // Or use javascript directly:
        doc.autoTable({
    
            headStyles: { fillColor: "#176138" },
    
            head: [['No', 'Isi Berita', 'Tanggal Publikasi', 'Jumlah Suka Pimpinan', 'Jumlah Suka Agen', 'Jumlah Komentar Pimpinan']],
            body: dataBody,
        })
    
        doc.save('table.pdf')
    }

    useEffect(() => {

        if(report === null){
            getReport();
        }
        getReportCategory();
    }, []);

    return (
        <Fragment>
            <Report
                report                      = {report}
                loading                     = {loading}
                showForm                    = {showForm}
                setShowForm                 = {setShowForm}
                detailReport                = {detailReport}
                detailResults               = {detailResults}
                setIdSelected               = {setIdSelected}
                reportCategory              = {reportCategory}
                selectedReport              = {selectedReport}
                showDeleteForm              = {showDeleteForm}
                isAddFormVisible            = {isAddFormVisible}
                setShowDeleteForm           = {setShowDeleteForm}
                setSelectedReport           = {setSelectedReport}
                detailResultLoading         = {detailResultLoading}
                setIsAddFormVisible         = {setIsAddFormVisible}
                isDetailReportVisible       = {isDetailReportVisible}
                isDetailResultsVisible      = {isDetailResultsVisible}
                setIsDetailReportVisible    = {setIsDetailReportVisible}
                setIsDetailResultsVisible   = {setIsDetailResultsVisible}
                isFormat                    = {isFormat}
                setIsFormat                 = {setIsFormat}
                reportKind                  = {reportKind}
                setReportKind               = {setReportKind}
                workunitKind                = {workunitKind}
                setWorkunitKind             = {setWorkunitKind}

                

                //function
                onDelete                    = {onDelete}
                onSubmit                    = {onSubmit}
                printPDF                    = {printPDF}
                handleDetail                = {handleDetail}
                handleDetailResults         = {handleDetailResults}
            />
        </Fragment>
    );
};

export default ReportAPI;