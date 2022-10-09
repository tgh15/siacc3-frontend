import React, { Fragment, useState, useEffect } from 'react';

//Component
import Report                                   from './Report';
import CustomToast                              from '../../components/widgets/custom-toast';

//API
import { feedsReportAPI }                       from '../../services/pages/feeds/report';


const ReportAPI = () => {
    //State
    const [report, setReport]                                   = useState([]);
    const [loading, setLoading]                                 = useState(false);
    const [idSelected, setIdSelected]                           = useState(false);
    const [showDeleteForm, setShowDeleteForm]                   = useState(false);
    const [reportCategory, setReportCategory]                   = useState([]);

    const [detailReport, setDetailReport]                       = useState([]);
    const [detailResults, setdetailResults]                     = useState(null);
    const [selectedReport, setSelectedReport]                   = useState([]);
    const [isDetailReportVisible, setIsDetailReportVisible]     = useState(false);
    const [isDetailResultsVisible, setIsDetailResultsVisible]   = useState(false);


    const [showForm, setShowForm]               = useState(false);

    useEffect(() => {
        getReport();
        getReportCategory();
    }, []);

    //get report
    const getReport = () => {
        feedsReportAPI.getReport().then(
            res => {
                if (res.status === 200 && res.data != null) {
                    setReport(res.data);
                }else{
                    setReport();
                }
            },
            err => {
                CustomToast('danger', err.message);
            }
        )
    };

    //get filter categori all
    const getReportCategory = () => {
        feedsReportAPI.getReportCategory().then(
            res => {
                if (res.status === 200 && res.data != null) {
                    let data_ = res.data.map((data ) => (
                        {
                            label : data.name,
                            value : data.id
                        }
                    ))

                    setReportCategory(data_);
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
                if(res.status === 201){
                    setLoading(false);
                    setShowForm(false);

                    CustomToast('success', 'Data report berhasil ditambahkan');
                    getReport();
                }
            },
            err => {
                if(err.status == 400 ){
                    CustomToast('danger', 'Waktu schedule harus melebihi waktu sekarang!');
                }else{
                    console.log(err);
                }
            }
        )
    };

    //delete report
    const onDelete = () => {
        setLoading(true);

        const formData = {
            id : idSelected
        };

        feedsReportAPI.deleteReport(idSelected).then(
            res => {
                if (res.status == 200) {
                    setLoading(false);
                    
                    getReport();

                    setShowDeleteForm(!showDeleteForm);
                    CustomToast("success", "Data Berhasil di hapus");
                }
            },
            err => {
                CustomToast('danger', err.message);
            }
        )
    };

    //detail
    const handleDetailResults = (formData) => {
        delete formData.query;

        setSelectedReport(formData);   
        
        console.log(formData, 'disini');
        CustomToast('success', 'Mohon menunggu proses sedang berlangsung');

        feedsReportAPI.detailReport(formData).then(
            res => {
                if(res.status == 200 && res.data != null){
                    setdetailResults(res.data);
                    setIsDetailResultsVisible(true);
                    setIsDetailReportVisible(false)
                }
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
                setShowDeleteForm           = {setShowDeleteForm}
                setSelectedReport           = {setSelectedReport}
                isDetailReportVisible       = {isDetailReportVisible}
                isDetailResultsVisible      = {isDetailResultsVisible}
                setIsDetailReportVisible    = {setIsDetailReportVisible}
                setIsDetailResultsVisible   = {setIsDetailResultsVisible}

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