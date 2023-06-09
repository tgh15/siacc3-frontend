import React, { useState, useEffect, useCallback, useRef }      from 'react';

import CustomToast                                              from '../../components/widgets/custom-toast';
import { BodyDashboardComponent, TopWidgetDashboard }           from '../../components/widgets/dashboard-components';
import ContainerFluid                                           from '../../components/widgets/fluid';

import { jsPDF }                                                from "jspdf";
import { toJpeg, toPng }                                        from 'html-to-image';

//API
import dashboardAPI                                             from '../../services/pages/dashboard';

import Helper                                                   from '../../helpers';
import CustomTableNotAuthorized                                 from '../../components/widgets/custom-table/CustomTableNotAuthorized';
import { ModalBase }                                            from '../../components/widgets/modals-base';
import { ModalDetailChartUpdate }                               from '../../components/widgets/dashboard-components/ModalDetailChartUpdate';

const DashboardComponent = () => {

    const ref                                                   = useRef();

    const [modalShow,setModalShow]                              = useState(false);
    const [chartSource, setChartSource]                         = useState(null);
    const [detailLayout, setDetailLayout]                       = useState(null);
    const [selectedIndex, setSelectedIndex]                     = useState(null);
    const [chartSourceList, setChartSourceList]                 = useState(null);
    const [downloadLoading, setDownloadLoading]                 = useState(false);
    const [dashboardLayout, setDashboardLayout]                 = useState([]);
    const [detailLayoutCol, setDetailLayoutCol]                 = useState(null);
    const [selectedDataSource, setSelectedDataSource]           = useState(null);
    const [isUpdateLayoutVisible, setIsUpdateLayoutVisible]     = useState(false);
    const [isNews, setIsNews]                                   = useState(false);

    const {
        getUserData,
        getRoleByMenuStatus
    }                                                           = Helper;

    const getDashboardLayout = () => {
        const formData = {
            uuid : getUserData().uuid
        };

        dashboardAPI.getUserLayout(formData).then(
            res => {
                if(!res.is_error){
                    if(res.status === 200 && res.data.layouts != null){
                        setDashboardLayout([...res.data.layouts]);
                    }else{
                        setDashboardLayout([]);
                    }
                }else{
                    CustomToast('danger', res.message);
                }
            },  
            err => {
                console.log(err);
                CustomToast('danger', err.message);
            }
        );
    };

    const handleFinish = (data) => {

        const formData = {
            employee_uuid : Helper.getUserData().uuid,
            layout : {
                col : data
            }
        };

        dashboardAPI.createUserLayout(formData).then(
            res => {
                if(!res.is_error){
                    CustomToast("success", "Dashboard berhasil ditambahkan.");
                    setModalShow(false);
                    getDashboardLayout();
                }else{
                    CustomToast('danger', res.message)
                }
            },
            err => {
                console.log(err, 'create dashboard');                
                CustomToast('danger', err.message);
            }
        );
    };

    const handleUpdate = (id, index) => {
        setSelectedIndex(index);

        const formData = {
            id : id
        };

        dashboardAPI.getLayout(formData).then(
            res => {
                if (res.status === 200){
                    if(res.data.layout != null){
                        setDetailLayout(res.data);
                        setDetailLayoutCol(res.data.layout.col[index]);
                        setIsUpdateLayoutVisible(true);
                        getSourceData(res.data.layout.col[index].chart);
                    }
                }
            },
            err => {
                console.log(err);
            }
        );
    };

    const handleUpdateAction = (values) => {

        //add id to value
        values.id = detailLayout.id

        let _layoutCol = detailLayout.layout.col;

        //replace array values
        _layoutCol.splice(selectedIndex, 1, values);

        const formData = {
            id  : detailLayout.id,
            employee_uuid : Helper.getUserData().uuid,
                layout : {
                    col : _layoutCol
            }
        }

        dashboardAPI.updateLayout(formData).then(
            res => {
                if (res.status === 200 || res.status === 201){
                    CustomToast('success','Layout berhasil diupdate');
                    getDashboardLayout();
                    setIsUpdateLayoutVisible(false);
                }
            },
            err => {
                console.log(err, 'udpate layout');
            }
        );
    };

    const handleDelete = (id) => {
        dashboardAPI.deleteLayout(id).then(
            res => {
                if(res.status === 200 || res.status === 201){
                    CustomToast("success", 'Layout berhasil dihapus');
                    getDashboardLayout();
                }
            },
            err => {
                console.log(err, 'delete layout');
            }
        );
    };

    const getSourceData = (chartName) => {
        dashboardAPI.chartList().then(
            res => {
                if(res.status === 200){
                    let _data = res.data.filter((data) => (
                        data.name === chartName
                    ))

                    let _restructur = [];
                    
                    _data[0].apis.map((data) => (
                        _restructur.push({
                            label : data.name,
                            value : data.type
                        })
                    ))
                    setChartSource(_restructur);
                    setChartSourceList(res.data);
                }else{
                    setChartSource(null);
                    setChartSourceList(null);
                }
            },
            err => {
                console.log(err, 'dashboard chart list');
            }
        )
    };

    const getShareLink = () => {
        dashboardAPI.getShareLink().then(
            res => {
                if(res.status === 200){
                    navigator.clipboard.writeText(res.data);
                    CustomToast("success", 'Link dashboard berhasil disalin.');
                }
            }, err => {
                error_handler(err, 'get share link');
            }
        )
    }

    const exportToJpg = useCallback(() => {
        if (ref.current === null) {
            return
        }

        setDownloadLoading(true);

        toJpeg(ref.current, { cacheBust: true, backgroundColor: 'white' , style: { padding: '5px' }})
            .then((dataUrl) => {
                const link      = document.createElement('a')
                link.download   = 'dashboar-export.jpeg'
                link.href       = dataUrl
                link.click()

                setDownloadLoading(false);
            })
            .catch((err) => {
                error_handler(err, 'export to jpg');
            })
    }, [ref]);

    const exportToPng = useCallback(() => {
        if (ref.current === null) {
            return
        }
        setDownloadLoading(true);

        toJpeg(ref.current, { cacheBust: true, style: { padding: '5px' }})
            .then((dataUrl) => {
                const link      = document.createElement('a')
                link.download   = 'dashboard-export.png'
                link.href       = dataUrl
                link.click()

                setDownloadLoading(false);
            })
            .catch((err) => {
                error_handler(err, 'export to png');
            })
    }, [ref]);

    const exportToPdf = useCallback(() => {
        let doc = new jsPDF('p', 'mm', "a3", {
            orientation: "landscape",
            
        });

        var width  = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();

        if (ref.current === null) {
            return
        }

        setDownloadLoading(true);

        toPng(ref.current, { cacheBust: true, style: { padding: '5px' }})
            .then((dataUrl) => {
                doc.addImage(dataUrl,'PNG',1,1, width-10, height-110);
                doc.save(`export-dashboard.pdf`);

                setDownloadLoading(false);
            })
            .catch((err) => {
                error_handler(err, 'export to pdf');
            })
    }, [ref]);

    const printToPdf = useCallback(() => {
        let doc = new jsPDF('p', 'mm', "a3", {
            orientation: "potrait",
            
        });

        var width  = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();

        if (ref.current === null) {
            return
        }

        setDownloadLoading(true);

        toPng(ref.current, { cacheBust: true, style: { padding: '5px' }})
            .then((dataUrl) => {
                doc.addImage(dataUrl, 'PNG',1,1, width-10, height-110);
                
                let print = window.open(doc.output('bloburl'), '_blank');
                print.print();
                
                setDownloadLoading(false);
                return doc;
            })
            .catch((err) => {
                error_handler(err, 'export to pdf');
            })
    }, [ref]);

    useEffect(() => {
        getDashboardLayout();

        return(() => (
            setDashboardLayout([])
        ))
    }, []);
    
    return(
        <div id="fs-component">
            <ContainerFluid>
                <TopWidgetDashboard
                    modalShow       = {modalShow}
                    handleFinish    = {handleFinish}
                    setModalShow    = {setModalShow}
                    getShareLink    = {getShareLink}

                    //Role
                    roleAdd         = {getRoleByMenuStatus('Dashboard', 'add')}
                    roleLink        = {getRoleByMenuStatus('Dashboard', 'export')}
                    roleExport      = {getRoleByMenuStatus('Dashboard', 'link')}

                    exportToJpg     = {exportToJpg}
                    exportToPng     = {exportToPng}
                    exportToPdf     = {exportToPdf}
                    downloadLoading = {downloadLoading}
                />
                
                {
                    getRoleByMenuStatus('Dashboard', 'List') ? 
                        <BodyDashboardComponent 
                            rows            = {dashboardLayout}
                            chartRef        = {ref}     
                            handleDelete    = {handleDelete}
                            handleUpdate    = {handleUpdate}

                            printToPdf      = {printToPdf}
                        />
                    :
                        <CustomTableNotAuthorized/>
                }
            </ContainerFluid>

            <ModalBase
                show    = {isUpdateLayoutVisible} 
                size    = "lg"
                title   = "Update Chart"
                setShow = {(par) => setIsUpdateLayoutVisible(par)} 
            >
                {
                    detailLayoutCol != null  &&
                    <ModalDetailChartUpdate
                        isNews                  = {isNews}
                        setIsNews               = {setIsNews}
                        namechart               = {detailLayoutCol.chart}
                        closeModal              = {() => setIsUpdateLayoutVisible(false)}
                        chartSource             = {chartSource}
                        chartSourceList         = {chartSourceList}
                        detailLayoutCol         = {detailLayoutCol}
                        selectedDataSource      = {selectedDataSource}
                        setSelectedDataSource   = {setSelectedDataSource}
                        handleUpdateAction      = {handleUpdateAction}
                    />

                }
            </ModalBase>
        </div>
    )
}

export default DashboardComponent;