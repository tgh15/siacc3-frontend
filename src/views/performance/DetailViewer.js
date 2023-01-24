import { useContext, useEffect, useState }  from "react";
import { Row, Table }                from "reactstrap";
import { ModalBase }            from "../../components/widgets/modals-base";
import Skeleton                 from "react-loading-skeleton";
import { PerformanceContext }   from "../../context/PerformanceContext";
import agentProfileAPI from "../../services/pages/profile/url";
import CustomToast from "../../components/widgets/custom-toast";
import CustomTablePaginate from "../../components/widgets/custom-table/CustomTablePaginate";
import CustomTableBodyEmpty from "../../components/widgets/custom-table/CustomTableBodyEmpty";
import feedsAgentReportAPI from "../../services/pages/feeds/agent-reports";

const DetailViewer = () => {

    const {
        active,
        dataSelected,
        isDetailViewerVisible,
        setIsDetailViewerVisible
    }                                   = useContext(PerformanceContext)

    const [viewer, setViewer]           = useState(null);
    const [pagination, setPagination]   = useState(null);


    const getViewerDataAgent = (page=1) => {

        setViewer(null);

        const formData = {
            category : 0,
            uuid     : dataSelected.uuid
        };

        const params = {
            page : page
        }

        agentProfileAPI.getByEmployeeAgentReport(formData, params).then(
            res => {
                if(!res.is_error){
                    if(res.data.agent_report != null){
                        setViewer(res.data.agent_report);
                        setPagination(res.data.pagination);
                    }else{
                        setViewer([]);
                        setPagination([]);
                    }
                }else{
                    CustomToast('danger', 'Terjadi Kesalahan.');
                }
            },
            err => {
                CustomToast('danger', 'Terjadi Kesalahan.');
            }
        )
    };

    const getViewerDataWorkunit = (page=1) => {
        setViewer(null);

        const formData = {
            workunit_id : dataSelected.id
        }

        const params = {
            page : page
        }

        feedsAgentReportAPI.getAgentReportByWorkunit(formData, params).then(
            res => {
                if(!res.is_error){
                    if(res.data.agent_report != null){
                        setViewer(res.data.agent_report);
                        setPagination(res.data.pagination);
                    }else{
                        setViewer([]);
                        setPagination([]);
                    }
                }else{
                    CustomToast('danger', 'Terjadi Kesalahan.');
                }
            },
            err => {
                CustomToast('danger', 'Terjadi Kesalahan.');
            }
        )
    }

    useEffect(() => {

        if(dataSelected != null){
            if(active === 'agent'){
                getViewerDataAgent();
            }else{
                getViewerDataWorkunit();
            }
        }


    }, [isDetailViewerVisible]);
    
    return (
        <>
            <ModalBase
                show        = {isDetailViewerVisible}
                size        = "lg"
                title       = {`Detail Viewer ${active === 'agent' ? 'Personal' : 'Satuan Kerja' }`}
                setShow     = {(par) => { setIsDetailViewerVisible(par)}} 
            >
                <Row className="mb-1">
                    <CustomTablePaginate
                        size            = {12}
                        length          = {10}
                        getData         = {(val) => active === 'agent' ? getViewerDataAgent(val.page) : getViewerDataWorkunit(val.page)}
                        pagination      = {pagination} 
                        offsetSearch    = {0} 
                    />
                </Row>

                {
                    viewer != null ? 
                        viewer.length > 0 ?
                            <Table responsive>
                                <thead>
                                    <tr>
                                        {
                                            active != 'agent' &&
                                            <th>
                                                Nama Agent
                                            </th>
                                        }
                                        <th>Judul Berita</th>
                                        <th>Jumlah Viewer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        viewer.map((data) => (
                                            <tr className='table-default'>
                                                {
                                                    active != 'agent' &&
                                                    <td>
                                                        {data.employee.name}
                                                    </td>
                                                }
                                                <td>
                                                    <a href={`/beranda/detail/${data.id}`} target="_blank">
                                                        {data.title}
                                                    </a>
                                                    {/* <img className='me-50' src={data.oldBadge} alt={data.kind} height='80' width='80' /> */}
                                                </td>
                                                <td>
                                                    {data.viewer_count}
                                                    {/* <span className='align-middle fw-bold'>{data.title}</span> */}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        :
                            <CustomTableBodyEmpty/>
                    :
                        <Skeleton height={60} count={3} style={{ marginBottom: "10px" }} />
                }

            </ModalBase>
        </>
    );
}

export default DetailViewer;