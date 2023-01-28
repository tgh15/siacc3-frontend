import { 
    useState, 
    useEffect, 
}                               from "react"
import { 
    Eye, 
    Trash2 
}                               from "react-feather";
import Skeleton from "react-loading-skeleton";
import { 
    Col, 
    Row,
    Card, 
    CardBody, 
 }                              from "reactstrap"
import CustomTable              from "../../components/widgets/custom-table"
import CustomTableBodyEmpty from "../../components/widgets/custom-table/CustomTableBodyEmpty";
import CustomToast from "../../components/widgets/custom-toast";
import FormDelete from "../../components/widgets/form-delete/FormDelete";
import crawlingAPI from "../../services/pages/analysis";
import AddAnalysis              from "./AddAnalysis";
import FormAnalysis             from "./AddAnalysis";
import DetailAnalysis from "./DetailAnalysis";
import DetailAnalysisNews from "./DetailAnalysisNews";


const Analysis = () => {


    const [filter, setFilter]                                           = useState(null);
    const [queryData, setQueryData]                                     = useState(null);
    const [resultData, setResultData]                                   = useState(null);
    const [detailFilter, setDetailFilter]                               = useState(null);
    const [selectedData, setSelectedData]                               = useState(null);
    const [isDeleteFormVisible, setIsDeleteFormVisible]                 = useState(false);
    const [isAddAnalysisVisible, setIsAddAnalysisVisible]               = useState(false);
    const [isDetailAnalysisVisible, setIsDetailAnalysisVisible]         = useState(false);
    const [isDetailNewsAnalysisVisible, setIsDetailNewsAnalysisVisible] = useState(false);

    const getResultAll = () => {

        const params = {
            all : 'analysis'
        }

        crawlingAPI.getResultAll(params).then(
            res => {
                if(res.status === 200){
                    console.log(res.data, 'resultData')
                    setResultData(res.data);
                }else{
                    setResultData(null);
                }
            },
            err => {
                console.log('get result all crawling', err);
                CustomToast('danger', 'Terjadi Kesalahan.');
            }
        )
    }

    const getResultData = (data) => {

        const params = {
            id : data.id
        }

        crawlingAPI.getResultData(params).then(
            res => {
                if(res.status === 200){
                    setQueryData(res.data);
                    setIsDetailAnalysisVisible(true);
                }else{
                    setQueryData(null);
                }
            },
            err => {
                console.log('get result all analysis', err);
                CustomToast('danger', 'Terjadi Kesalahan.');
            }
        )
    }

    const handleDelete = () => {

        const params = {
            id : selectedData.id
        }

        crawlingAPI.deleteResult(params).then(
            res => {
                if(res.status === 200){
                    setIsDeleteFormVisible(false);
                    CustomToast('success', 'Data analisis berhasil dihapus.');
                    getResultAll();
                }
            },
            err => {
                console.log('delete analysis', err);
                CustomToast('danger', 'Terjadi Kesalahan.');
            }
        )
    }

    const headerTable = [
        {
            title: "No",
            size: 1
        },
        {
            title: "Judul Analisis",
            size: 8
        },
        {
            title: "Aksi",
            size: 3
        },
    ];

    useEffect(() => {
        getResultAll();
    },[])


    return (
        <>

            <FormDelete
                show        = {isDeleteFormVisible}
                title       = "Hapus Analisis"
                setShow     = {(par) => setIsDeleteFormVisible(par)}
                onDelete    = {handleDelete}
                description = {`Yakin ingin menghapus data ${selectedData != null && selectedData.name}`}
            />

            <AddAnalysis
                getResultAll                = {getResultAll}
                isAddAnalysisVisible        = {isAddAnalysisVisible}
                setIsAddAnalysisVisible     = {setIsAddAnalysisVisible}
            />

            <DetailAnalysis
                queryData                       = {queryData}
                setDetailFilter                 = {setDetailFilter}
                isDetailAnalysisVisible         = {isDetailAnalysisVisible}
                setIsDetailAnalysisVisible      = {setIsDetailAnalysisVisible}
                setIsDetailNewsAnalysisVisible  = {setIsDetailNewsAnalysisVisible}
            />

            <DetailAnalysisNews
                queryData                       = {queryData}
                detailFilter                    = {detailFilter}
                isDetailNewsAnalysisVisible     = {isDetailNewsAnalysisVisible}
                setIsDetailNewsAnalysisVisible  = {setIsDetailNewsAnalysisVisible}
            />

            <CustomTable 
                form        = {<FormAnalysis />} 
                page        = "1" 
                header      = {headerTable} 
                totalData   = "50"

                //role
                roleAdd     = {true}
                onClickForm = {() => {setIsAddAnalysisVisible(true)}}
            >
                {/* Modal Add Analysis */}
                

                {
                    resultData === null &&  <Skeleton height={60} count={5}/>
                }

                {
                    resultData != null && resultData.length === 0 && <CustomTableBodyEmpty/>
                }

                {
                    resultData != null && resultData.length > 0 &&
                    resultData.map((data, index) => (
                        <Card key={`analysis_index_${index}`}>
                            <CardBody>
                                <Row>
                                    <Col md="1">
                                        {index+1}
                                    </Col>
                                    <Col md="8">
                                        {data.name}
                                    </Col>
                                    <Col md="3">
                                        <Eye 
                                            size        = {20} 
                                            onClick     = {() => { getResultData(data)}} 
                                            className   = "mr-2 cursor-pointer"
                                        />
                                        <Trash2 
                                            size        = {20} 
                                            onClick     = {() => {setSelectedData(data); setIsDeleteFormVisible(true)}}
                                            className   = "cursor-pointer"
                                        />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    ))
                }

            </CustomTable>
        </>
    )
}

export default Analysis