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
    const [chartSource, setChartSource]                         = useState(null)
    const [detailLayout, setDetailLayout]                       = useState(null);
    const [selectedIndex, setSelectedIndex]                     = useState(null);
    const [dashboardLayout, setDashboardLayout]                 = useState([]);
    const [detailLayoutCol, setDetailLayoutCol]                 = useState(null);
    const [isUpdateLayoutVisible, setIsUpdateLayoutVisible]     = useState(false);
    const [selectedDataSource, setSelectedDataSource]           = useState(null);

    const {getRoleByMenuStatus}                                 = Helper;

    const getDashboardLayout = () => {
        
        const formData = {
            uuid : localStorage.getItem('uuid')
        };

        dashboardAPI.getUserLayout(formData).then(
            res => {
                if(res.status === 200 && res.data.layouts != null){
                    setDashboardLayout([...res.data.layouts]);
                }else{
                    setDashboardLayout([]);
                }
            },  
            err => {
                console.log(err);
            }
        );
    };

    const handleFinish = (data) => {

        const formData = {
            employee_uuid : localStorage.getItem('uuid'),
            layout : {
                col : data
            }
        };

        dashboardAPI.createUserLayout(formData).then(
            res => {
                if(res.status === 201){

                    CustomToast("success", "Dashboard berhasil ditambahkan.");
                    setModalShow(false);
                    getDashboardLayout();
                }
            },
            err => {
                console.log(err, 'create dashboard');                
                // error_handler(err);
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
                    console.log(res.data, 'disini');
                    if(res.data.layout != null){
                        setDetailLayout(res.data);
                        setDetailLayoutCol(res.data.layout.col[index]);
                        setIsUpdateLayoutVisible(true);
                        getSourceData(res.data.layout.col[index].chart);
                    }
                }
            },
            err => {
                error_handler(err, 'get layout')
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
            employee_uuid : localStorage.getItem('uuid'),
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
                if(res.status === 201){
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
                            value : data.url
                        })
                    ))

                    setChartSource(_restructur);
                }else{
                    setChartSource(null);
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

        toJpeg(ref.current, { cacheBust: true, backgroundColor: 'white' , style: { padding: '5px' }})
            .then((dataUrl) => {
                const link      = document.createElement('a')
                link.download   = 'dashboar-export.jpeg'
                link.href       = dataUrl
                link.click()
            })
            .catch((err) => {
                error_handler(err, 'export to jpg');
            })
    }, [ref]);

    const exportToPng = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toJpeg(ref.current, { cacheBust: true, style: { padding: '5px' }})
            .then((dataUrl) => {
                const link      = document.createElement('a')
                link.download   = 'dashboard-export.png'
                link.href       = dataUrl
                link.click()
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

        toPng(ref.current, { cacheBust: true, style: { padding: '5px' }})
            .then((dataUrl) => {
                doc.addImage(dataUrl,'PNG',1,1, width-10, height-110);
                doc.save(`export-dashboard.pdf`);
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

        toPng(ref.current, { cacheBust: true, style: { padding: '5px' }})
            .then((dataUrl) => {
                doc.addImage(dataUrl, 'PNG',1,1, width-10, height-110);
                
                let print = window.open(doc.output('bloburl'), '_blank');
                print.print();

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
                        namechart               = {detailLayoutCol.chart}
                        closeModal              = {() => setIsUpdateLayoutVisible(false)}
                        chartSource             = {chartSource}
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