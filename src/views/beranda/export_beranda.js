import { useCallback, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Row } from "reactstrap";
import CustomTableBodyEmpty from "../../components/widgets/custom-table/CustomTableBodyEmpty";
import CustomToast from "../../components/widgets/custom-toast";
import { NewsWidget } from "../../components/widgets/feeds/news-card-widget";
import { processAgentReports } from "../../components/widgets/feeds/news-card-widget/NewsConfig";
import { ModalBase } from "../../components/widgets/modals-base";
import feedsAgentReportAPI from "../../services/pages/feeds/agent-reports";

import { jsPDF }                                                from "jspdf";
import { toPng }                                        from 'html-to-image';


const ExportFeeds = (props) => {

    const {
        exportData,
        isExportVisible,
        setIsExportVisible
    }  = props

    const [feedsData, setFeedsData] = useState(null);
    const feedsRef                  = useRef();


    const exportToPdf = useCallback(() => {

        if (feedsRef.current === null) {
            return
        }

        toPng(feedsRef.current, { cacheBust: true, backgroundColor: 'white' , style: { padding: '5px' }})
            .then((dataUrl) => {
                const link      = document.createElement('a')
                link.download   = 'feeds-export.jpeg'
                link.href       = dataUrl
                link.click()
            })
            .catch((err) => {
                CustomToast('danger', 'export to pdf');
            })
    }, [feedsRef]);

    const getFeedsData = () => {
        exportData.filter_type = "export";

        feedsAgentReportAPI.filterAgentReport(exportData).then(
            res => {
                if(!res.is_error){
                    if(res.data != null){
                        processAgentReports(res.data).then(
                            res_ => {
                                setFeedsData(res_);
                                // setTimeout(() => {
                                    exportToPdf();
                                // }, 1000);
                            }
                        );
                    }else{
                        setFeedsData([]);
                    }
                }else{
                    CustomToast('danger', res.message);
                }
            },
            err => {
                CustomToast('danger', err.message);
            }
        )
    }

    useEffect(() => {
        if(exportData != null){
            getFeedsData();
        }
    }, [exportData])

    return (
        <>
            <ModalBase
                title   = "Print Berita"
                show    = {isExportVisible}
                size    = "lg"
                setShow = {(par) => {setIsExportVisible(par)}}
            >
                <div ref={feedsRef}>
                    <Row>
                        {
                            feedsData != null ?
                                feedsData.length > 0 ?
                                    feedsData.map((data) => (
                                        <Col md={12}>
                                            <NewsWidget
                                                id              = {data.id}
                                                data            = {data}

                                                //Role
                                                roleLike        = {true}
                                                roleViewer      = {true}   
                                                // roleDislike     = {true}
                                                // roleComment     = {true}
                                                {...data}
                                            />
                                        </Col>
                                    ))
                                :
                                    <Col md={12}>
                                        <CustomTableBodyEmpty/>
                                    </Col>
                            :
                                <Col md={12}>
                                    {
                                        Array(3).fill(0).map(() => (
                                            <Skeleton height={200} />
                                        ))
                                    }
                                </Col>
                        }
                    </Row>
                </div>
            </ModalBase>
        </>
    )
}

export default ExportFeeds;