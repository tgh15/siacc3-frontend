import {useEffect, useState, Fragment}      from 'react';
import { Link, useLocation }                      from "react-router-dom";
import parse                                from 'html-react-parser';


import {
        Col,
        Row,
        Card,
        Button,
        Pagination,
        PaginationItem,
        PaginationLink,
    }                                       from 'reactstrap';

import {
        FileText, LogIn
    }                                       from 'react-feather';

//API
import { StoreNews }                        from '../beranda/beranda_api';
import elasticSearchAPI                     from '../../services/pages/advanced-search';
import { processAgentReports }              from '../../components/widgets/feeds/news-card-widget/NewsConfig';

//Component
import CardWorkunit                         from './CardWorkunit';
import { ModalBase }                        from '../../components/widgets/modals-base';
import { NewsWidget }                       from '../../components/widgets/feeds/news-card-widget';
import CustomTableBodyEmpty                 from '../../components/widgets/custom-table/CustomTableBodyEmpty';
import Skeleton from 'react-loading-skeleton';
import CustomTablePaginate from '../../components/widgets/custom-table/CustomTablePaginateV2';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const AdvancedSearch = () => {
    let query                                                       = useQuery();

    //State
    const [page, setPage]                                           = useState(1);
    const [kind, setKind]                                           = useState(null);
    const [report, setReport]                                       = useState([]);
    const [loading, setLoading]                                     = useState(true);
    const [agentReport, setAgentReport]                             = useState([]);
    const [detailLoading, setDetailLoading]                         = useState(false);
    const [agentPerformance, setAgentPerformance]                   = useState([]);
    const [workunitPerformance, setWorkunitPerformance]             = useState([]);

    //state detail data
    const [detailReport, setDetailReport]                           = useState([]);
    const [detailAgentReport, setDetailAgentReport]                 = useState([]);
    const [detailAgentPerformance, setDetailAgentPerfomance]        = useState([]);
    const [detailWorkunitPerformance, setDetailWorkunitPerformance] = useState([]);

    //State detail modal
    const [showDetailAgent, setShowDetailAgent]                     = useState(false);
    const [showDetailReport, setShowDetailReport]                   = useState(false);
    const [showDetailWorkunit, setShowDetailWorkunit]               = useState(false);
    const [showDetailAgentReport, setShowDetailAgentReport]         = useState(false);

    const getElasticSearchAPI = (kind) => {
        console.log(kind);
        if(kind === null){
            setLoading(true);
        }else{
            setDetailLoading(true);
        }

        const params = {
            q    : query.get("keyword"),
            page : page
        }

        elasticSearchAPI.getElasticSearch(params).then(
            res => {
                if(res.is_error === false){
                    if(kind === null){
                        setLoading(false);
                        //get agent report data
                        if(res.data.result.agent_report.data != null){
                            let dataFeeds = processAgentReports(res.data.result.agent_report.data.map((data) => (data._source)));
                            dataFeeds.then( res2 => { 
                                setAgentReport({data : res2, total : res.data.result.agent_report.total});
                                setDetailAgentReport({data : res2, total : res.data.result.agent_report.total});
                            })
                        }else{
                            setAgentReport([]);
                            setDetailAgentReport([]);
                        }
    
                        //get agent performance data
                        if(res.data.result.employee.data != null){
                            setAgentPerformance(res.data.result.employee);
                            setDetailAgentPerfomance(res.data.result.employee);
                        }else{
                            setAgentPerformance([]);
                            setDetailAgentPerfomance([]);
                        }
    
                        //get workunit performance data
                        if(res.data.result.workunit.data != null){
                            setWorkunitPerformance(res.data.result.workunit);
                            setDetailWorkunitPerformance(res.data.result.workunit);
                        }else{
                            setWorkunitPerformance([]);
                            setDetailWorkunitPerformance([]);
                        }
    
                        //get report data
                        if(res.data.result.report.data != null){
                            setReport(res.data.result.report);
                            setDetailReport(res.data.result.report);
                        }else{
                            setReport([]);
                            setDetailReport([]);
                        }
                    }else{
                        setDetailLoading(false);

                        if(kind === 1){
                            if(res.data.result.agent_report.data != null){
                                let dataFeeds = processAgentReports(res.data.result.agent_report.data.map((data) => (data._source)));
                                dataFeeds.then( res2 => { setDetailAgentReport({data : res2, total : res.data.result.agent_report.total})})
                            }else{
                                setDetailAgentReport([]);
                            }
                        }else if (kind === 2){
                            //get agent performance data
                            if(res.data.result.workunit.data != null){
                                setDetailWorkunitPerformance(res.data.result.workunit);
                            }else{
                                setDetailWorkunitPerformance([]);
                            }
                        }else if (kind === 3){
                            //get agent performance data
                            if(res.data.result.employee.data != null){
                                setDetailAgentPerfomance(res.data.result.employee);
                            }else{
                                setDetailAgentPerfomance([]);
                            }
                        }else{
                            if(res.data.result.report.data != null){
                                setDetailReport(res.data.result.report);
                            }else{
                                setDetailReport([]);
                            }
                        }
                    }
                }
            },
            err => {
                console.log(err, 'get elastic search');
            }
        )
    };

    const handleStore = (stored_data, resps) => {
        StoreNews(stored_data, resps);
    };

    useEffect(() => {
        getElasticSearchAPI(kind);
    },[page]);

    return (
        <Fragment>
            <div className="mb-5">
                {/* Modal Detail Agent Report */}
                <ModalBase
                    show            = {showDetailAgentReport} 
                    size            = "xl"
                    title           = "Hasil Pencarian Berita"
                    setShow         = {(par) => { setShowDetailAgentReport(par)}} 
                    unmountOnClose  = {true}
                >
                    {
                        detailLoading ? 
                            Array(3).fill(0).map(() => (
                                <Row className="py-1">
                                    <Col md={4}>
                                        <Skeleton height={150} />
                                    </Col>
                                    <Col md={4}>
                                        <Skeleton height={150} />
                                    </Col>
                                    <Col md={4}>
                                        <Skeleton height={150} />
                                    </Col>
                                </Row>
                            ))
                        :
                            <Row className="d-flex">
                                <Col md={12}>
                                    {
                                        parseInt(detailAgentReport.total) > 10 ? 
                                            <div className="d-flex justify-content-end">
                                                <Pagination className='d-flex mt-1'>
                                                    {
                                                        page == 1 ? 
                                                            <PaginationItem
                                                                disabled    = {true}
                                                                className   = "prev-item"
                                                            >
                                                                <PaginationLink>
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        :
                                                            <PaginationItem
                                                                onClick     = {() => {setKind(1); setPage(page-1)}}
                                                                disabled    = {false}
                                                                className   = "prev-item"
                                                            >
                                                                <PaginationLink>
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                    }
                                                    <PaginationItem active>
                                                        <PaginationLink>{page}</PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink>/</PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink>{Math.ceil(detailAgentReport.total/10)}</PaginationLink>
                                                    </PaginationItem>
                                                    
                                                    {
                                                        page < Math.ceil(detailAgentReport.total/10) ?  
                                                            <PaginationItem 
                                                                onClick     = {() => {setKind(1); setPage(page+1);}}
                                                                disabled    = {false}
                                                                className   = "next-item"
                                                            >
                                                                <PaginationLink>
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        :
                                                            <PaginationItem 
                                                                disabled    = {true}
                                                                className   = "next-item"
                                                            >
                                                                <PaginationLink>
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                    }
                                                </Pagination>
                                            </div>
                                        :
                                            null
                                    }
                                </Col>
                                {
                                    detailAgentReport.total > 0 ?
                                        detailAgentReport.data.map((data, index) => (
                                            <Col md={4} className="d-flex flex-row">
                                                <Link to={"/beranda/detail/"+data.id}>
                                                    <NewsWidget
                                                        key                     = {`advanced-search-news-${index}`}
                                                        handleStore             = {(newss,data) => {handleStore(newss,data)}}

                                                        roleLike                = {true}
                                                        roleViewer              = {true}   
                                                        roleDislike             = {true}
                                                        roleComment             = {true}

                                                        {...data}
                                                    />
                                                </Link>
                                            </Col>
                                        ))
                                    :
                                        <Col md={12}>
                                            <CustomTableBodyEmpty/>
                                        </Col>
                                }
                            </Row>
                    }
                </ModalBase>

                {/* Modal Detail Workunit Section */}
                <ModalBase
                    show            = {showDetailWorkunit} 
                    size            = "xl"
                    title           = "Hasil Pencarian Satuan Kerja"
                    setShow         = {(par) => { setShowDetailWorkunit(par)}} 
                    unmountOnClose  = {true}
                >
                    {
                        detailLoading ? 
                        Array(3).fill(0).map(() => (
                            <Row className="py-1">
                                <Col md={6}>
                                    <Skeleton height={150} />
                                </Col>
                                <Col md={6}>
                                    <Skeleton height={150} />
                                </Col>
                            </Row>
                        ))
                    :
                        <Row>
                            <Col md={12}>
                                {
                                    parseInt(detailWorkunitPerformance.total) > 10 ? 
                                        <div className="d-flex justify-content-end">
                                            <Pagination className='d-flex mt-1'>
                                                {
                                                    page == 1 ? 
                                                        <PaginationItem
                                                            disabled    = {true}
                                                            className   = "prev-item"
                                                        >
                                                            <PaginationLink>
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                    :
                                                        <PaginationItem
                                                            onClick     = {() => {setKind(2); setPage(page-1)}}
                                                            disabled    = {false}
                                                            className   = "prev-item"
                                                        >
                                                            <PaginationLink>
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                }
                                                <PaginationItem active>
                                                    <PaginationLink>{page}</PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink>/</PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink>{Math.ceil(detailWorkunitPerformance.total/10)}</PaginationLink>
                                                </PaginationItem>
                                                
                                                {
                                                    page < Math.ceil(detailWorkunitPerformance.total/10) ?  
                                                        <PaginationItem 
                                                            onClick     = {() => {setKind(2); setPage(page+1);}}
                                                            disabled    = {false}
                                                            className   = "next-item"
                                                        >
                                                            <PaginationLink>
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                    :
                                                        <PaginationItem 
                                                            disabled    = {true}
                                                            className   = "next-item"
                                                        >
                                                            <PaginationLink>
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                }
                                            </Pagination>
                                        </div>
                                    :
                                        null
                                }
                            </Col>
                            {
                                detailWorkunitPerformance.total > 0 ?
                                    detailWorkunitPerformance.data.map((data, index) => (
                                        <Col md={6} className="d-flex flex-row">
                                            <Link to={"/configuration/work-unit-list/"+data._source.id+"?level="+data._source.workunit_level_id}>
                                                <CardWorkunit
                                                    id      = {data._source.id} 
                                                    key     = {`advanced-search-workunit-${index}`} 
                                                    index   = {index}
                                                    type    = "workunit"
                                                />
                                            </Link>
                                        </Col>
                                    ))
                                :
                                    <Col md={12}>
                                        <CustomTableBodyEmpty/>
                                    </Col>
                            }
                        </Row>
                    }
                </ModalBase>

                {/* Modal Detail Agent Performance Section */}
                <ModalBase
                    show            = {showDetailAgent} 
                    size            = "xl"
                    title           = "Hasil Pencarian Agen"
                    setShow         = {(par) => { setShowDetailAgent(par)}} 
                    unmountOnClose  = {true}
                >
                    {
                        detailLoading ? 
                            Array(5).fill(0).map(() => (
                                <Row className="py-1">
                                    <Col md={6}>
                                        <Skeleton height={150} />
                                    </Col>
                                    <Col md={6}>
                                        <Skeleton height={150} />
                                    </Col>
                                </Row>
                            ))
                        :
                            <Row>
                                <Col md={12}>
                                    {
                                        parseInt(detailAgentPerformance.total) > 10 ? 
                                            <div className="d-flex justify-content-end">
                                                <Pagination className='d-flex mt-1'>
                                                    {
                                                        page == 1 ? 
                                                            <PaginationItem
                                                                disabled    = {true}
                                                                className   = "prev-item"
                                                            >
                                                                <PaginationLink>
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        :
                                                            <PaginationItem
                                                                onClick     = {() => {setKind(3); setPage(page-1)}}
                                                                disabled    = {false}
                                                                className   = "prev-item"
                                                            >
                                                                <PaginationLink>
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                    }
                                                    <PaginationItem active>
                                                        <PaginationLink>{page}</PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink>/</PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink>{Math.ceil(detailAgentPerformance.total/10)}</PaginationLink>
                                                    </PaginationItem>
                                                    
                                                    {
                                                        page < Math.ceil(detailAgentPerformance.total/10) ?  
                                                            <PaginationItem 
                                                                onClick     = {() => {setKind(3); setPage(page+1);}}
                                                                disabled    = {false}
                                                                className   = "next-item"
                                                            >
                                                                <PaginationLink>
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        :
                                                            <PaginationItem 
                                                                disabled    = {true}
                                                                className   = "next-item"
                                                            >
                                                                <PaginationLink>
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                    }
                                                </Pagination>
                                            </div>
                                        :
                                            null
                                    }
                                </Col>
                                {
                                    detailAgentPerformance.total > 0 ?
                                        detailAgentPerformance.data.map((data, index) => (
                                            <Col md={6} className="d-flex flex-row">
                                                <Link to={`/performance?id_agent=${data._source.name}`}>
                                                    <CardWorkunit
                                                        id      = {data._source.uuid} 
                                                        key     = {`advanced-search-agent-${index}`} 
                                                        index   = {index}
                                                        type    = "agent"
                                                    />
                                                </Link>
                                            </Col>
                                        ))
                                    :
                                        <Col md={12}>
                                            <CustomTableBodyEmpty/>
                                        </Col>
                                }
                            </Row>
                    }
                </ModalBase>

                {/* Modal Detail Report Section */}
                <ModalBase
                    show            = {showDetailReport} 
                    size            = "xl"
                    title           = "Hasil Pencarian Laporan"
                    setShow         = {(par) => { setShowDetailReport(par)}} 
                    unmountOnClose  = {true}
                >
                    {
                        detailLoading ? 
                            Array(5).fill(0).map(() => (
                                <Row className="py-1">
                                    <Col md={6}>
                                        <Skeleton height={150} />
                                    </Col>
                                    <Col md={6}>
                                        <Skeleton height={150} />
                                    </Col>
                                </Row>
                            ))
                        :
                            <Row>
                                <Col md={12}>
                                    {
                                        parseInt(detailReport.total) > 10 ? 
                                            <div className="d-flex justify-content-end">
                                                <Pagination className='d-flex mt-1'>
                                                    {
                                                        page == 1 ? 
                                                            <PaginationItem
                                                                disabled    = {true}
                                                                className   = "prev-item"
                                                            >
                                                                <PaginationLink>
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        :
                                                            <PaginationItem
                                                                onClick     = {() => {setKind(3); setPage(page-1)}}
                                                                disabled    = {false}
                                                                className   = "prev-item"
                                                            >
                                                                <PaginationLink>
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                    }
                                                    <PaginationItem active>
                                                        <PaginationLink>{page}</PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink>/</PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink>{Math.ceil(detailReport.total/10)}</PaginationLink>
                                                    </PaginationItem>
                                                    
                                                    {
                                                        page < Math.ceil(detailReport.total/10) ?  
                                                            <PaginationItem 
                                                                onClick     = {() => {setKind(3); setPage(page+1);}}
                                                                disabled    = {false}
                                                                className   = "next-item"
                                                            >
                                                                <PaginationLink>
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        :
                                                            <PaginationItem 
                                                                disabled    = {true}
                                                                className   = "next-item"
                                                            >
                                                                <PaginationLink>
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                    }
                                                </Pagination>
                                            </div>
                                        :
                                            null
                                    }
                                </Col>
                                {
                                    detailReport.total > 0 ?
                                        detailReport.data.map((data) => (
                                            <Col md={6} className="d-flex flex-row">
                                                <Link to={`/report?id_report=${data._source.id}`}>
                                                    <Card className="w-100 p-2">
                                                        <Row>
                                                            <Col md={3} className="text-center">
                                                                <FileText/>
                                                            </Col>

                                                            <Col md={9} className="d-flex align-items-center">
                                                                <h5 className="mb-0">{parse(data._source.title)}</h5>
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                </Link>
                                            </Col>
                                        ))
                                    :
                                        <Col md={12}>
                                            <CustomTableBodyEmpty/>
                                        </Col>
                                }
                            </Row>
                    }
                </ModalBase>

                {/* Agent Report Section */}
                <h2>Berita</h2>
                {
                    loading ?
                        <Skeleton height={150} className="mb-1"/>
                    :
                        <Row className="d-flex">
                            {
                                parseInt(agentReport.total) > 0 ?
                                    agentReport.data.map((data, index) => (
                                        index < 3 ? 
                                            <Col 
                                                md          = {4} 
                                                className   = "d-flex flex-row"
                                            >
                                                <Link to={"/beranda/detail/"+data.id}>
                                                    <NewsWidget
                                                        key                     = {`advanced-search-news-${index}`}
                                                        handleStore             = {(newss,data) => {handleStore(newss,data)}}

                                                        roleLike                = {true}
                                                        roleViewer              = {true}   
                                                        roleDislike             = {true}
                                                        roleComment             = {true}

                                                        {...data}
                                                    />
                                                </Link>
                                            </Col>
                                        : null
                                    ))
                                :
                                    <Col md={12}>
                                        <CustomTableBodyEmpty/>
                                    </Col>
                            }
                            {
                                agentReport.total > 3 ?
                                    <Col 
                                        md          = {12} 
                                        className   = "d-flex justify-content-end"
                                    >
                                        <Button 
                                            color   = 'flat-dark' 
                                            onClick = {() => setShowDetailAgentReport(true)}
                                        >
                                            Tampilkan Lebih Banyak
                                        </Button>
                                    </Col>
                                :  null
                            }
                        </Row>
                }

                {/* Workunit Section */}
                <h2>Satuan Kerja</h2>
                {
                    loading ?
                        <Skeleton height={150} className="mb-1"/>
                    :
                        <Row>
                            {
                                parseInt(workunitPerformance.total) > 0 ?
                                    workunitPerformance.data.map((data, index) => (
                                        index < 2 ? 
                                            <Col md={6}>
                                                <Link to={"/configuration/work-unit-list/"+data._source.id+"?level="+data._source.workunit_level_id}>
                                                    <CardWorkunit
                                                        id      = {data._source.id} 
                                                        key     = {`advanced-search-workunit-${index}`} 
                                                        index   = {index}
                                                        type    = "workunit"
                                                    />
                                                </Link>
                                            </Col>
                                        :
                                            null
                                    ))
                                :
                                    <Col md={12}>
                                        <CustomTableBodyEmpty/>
                                    </Col>
                            }
                            {
                                workunitPerformance.total > 2 ?
                                    <Col 
                                        md          = {12} 
                                        className   = "d-flex justify-content-end"
                                    >
                                        {/* <a href="/performance">
                                            <h4>Tampilkan Lebih Banyak</h4>
                                        </a> */}

                                        <Button 
                                            color   = 'flat-dark' 
                                            onClick = {() => setShowDetailWorkunit(true)}
                                        >
                                            Tampilkan Lebih Banyak
                                        </Button>
                                    </Col>
                                : null
                            }
                        </Row>
                }

                {/* Agent Performance Section */}
                <h3>Agen</h3>
                {
                    loading ?
                        <Skeleton height={150} className="mb-1"/>
                    :
                        <Row>
                            {
                                parseInt(agentPerformance.total) > 0 ?
                                    agentPerformance.data.map((data, index) => (
                                        index < 2 ? 
                                            <Col md={6}>
                                                <Link to={`/performance?id_agent=${data._source.name}`}>
                                                    <CardWorkunit
                                                        id      = {data._source.uuid} 
                                                        key     = {`advanced-search-agent-${index}`} 
                                                        index   = {index}
                                                        type    = "agent"
                                                    />
                                                </Link>
                                            </Col>
                                        : null
                                    ))
                                :
                                    <Col md={12}>
                                        <CustomTableBodyEmpty/>
                                    </Col>
                            }
                            {
                                agentPerformance.total > 2 ?
                                    <Col 
                                        md          = {12} 
                                        className   = "d-flex justify-content-end"
                                    >
                                        {/* <a href="/performance">
                                            <h4>Tampilkan Lebih Banyak</h4>
                                        </a> */}

                                        <Button 
                                            color   = 'flat-dark' 
                                            onClick = {() => setShowDetailAgent(true)}
                                        >
                                            Tampilkan Lebih Banyak
                                        </Button>
                                    </Col>
                                : null
                            }
                        </Row>
                }

                {/* Report Section */}
                <h3>Laporan</h3>
                {
                    loading ?
                        <Skeleton height={150} className="mb-1"/>
                    :
                        <Row>
                            {
                                parseInt(report.total) > 0 ?
                                    report.data.map((data, index) => (
                                        index < 2 ? 
                                            <Col md={6}>
                                                <Link to={`/report?id_report=${data._source.id}`}>
                                                    <Card className="w-100 p-2">
                                                        <Row>
                                                            <Col md={3} className="text-center">
                                                                <FileText/>
                                                            </Col>

                                                            <Col md={9} className="d-flex align-items-center">
                                                                <h5 className="mb-0">{parse(data._source.title)}</h5>
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                </Link>
                                            </Col>
                                        :
                                            null
                                    ))
                                :
                                    <Col md={12}>
                                        <CustomTableBodyEmpty/>
                                    </Col>
                            }
                            {
                                report.total > 2 ?
                                    <Col 
                                        md          = {12} 
                                        className   = "d-flex justify-content-end"
                                    >
                                        <Button 
                                            color   = 'flat-dark' 
                                            onClick = {() => setShowDetailReport(true)}
                                        >
                                            Tampilkan Lebih Banyak
                                        </Button>
                                    </Col>
                                : 
                                    null
                            }
                        </Row>
                }
            </div>
        </Fragment>
    )
};

export default AdvancedSearch;