import {useEffect, useState, Fragment}      from 'react';
import { Link, useLocation }                      from "react-router-dom";
import parse                                from 'html-react-parser';


import {
        Col,
        Row,
        Card,
        Button,
    }                                       from 'reactstrap';

import {
        FileText
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

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const AdvancedSearch = () => {
    let query                                               = useQuery();

    //State
    const [page, setPage]                                   = useState(1);
    const [report, setReport]                               = useState([]);
    const [agentReport, setAgentReport]                     = useState([]);
    const [agentPerformance, setAgentPerformance]           = useState([]);
    const [workunitPerformance, setWorkunitPerformance]     = useState([]);
    
    //State detail
    const [showDetailAgent, setShowDetailAgent]             = useState(false);
    const [showDetailReport, setShowDetailReport]           = useState(false);
    const [showDetailWorkunit, setShowDetailWorkunit]       = useState(false);
    const [showDetailAgentReport, setShowDetailAgentReport] = useState(false);


    const getElasticSearchAPI = () => {
        const params = {
            q    : query.get("keyword"),
            page : page
        }

        elasticSearchAPI.getElasticSearch(params).then(
            res => {
                if(res.is_error === false){
                    //get agent report data

                    if(res.data.result.agent_report.data != null){
                        let dataFeeds = processAgentReports(res.data.result.agent_report.data.map((data) => (data._source)));

                        dataFeeds.then( res => { setAgentReport(res)})
                    }else{
                        setAgentReport([]);
                    }

                    //get agent performance data
                    if(res.data.result.employee.data != null){
                        setAgentPerformance(res.data.result.employee.data);
                    }else{
                        setAgentPerformance([]);
                    }

                    //get workunit performance data
                    if(res.data.result.workunit.data != null){
                        setWorkunitPerformance(res.data.result.workunit.data);
                    }else{
                        setWorkunitPerformance([]);
                    }

                    //get report data
                    if(res.data.result.report.data != null){
                        setReport(res.data.result.report.data);
                    }else{
                        setReport([]);
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
        getElasticSearchAPI();
    },[]);

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
                    <Row>
                        {
                            agentReport.length > 0 ?
                                agentReport.map((data, index) => (
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
                </ModalBase>

                {/* Modal Detail Workunit Section */}
                <ModalBase
                    show            = {showDetailWorkunit} 
                    size            = "xl"
                    title           = "Hasil Pencarian Satuan Kerja"
                    setShow         = {(par) => { setShowDetailWorkunit(par)}} 
                    unmountOnClose  = {true}
                >
                    <Row>
                        {
                            workunitPerformance.length > 0 ?
                                workunitPerformance.map((data, index) => (
                                    <Col md={6} className="d-flex flex-row">
                                        <CardWorkunit
                                            id      = {data._source.id} 
                                            key     = {`advanced-search-workunit-${index}`} 
                                            index   = {index}
                                            type    = "workunit"
                                        />
                                    </Col>
                                ))
                            :
                                <Col md={12}>
                                    <CustomTableBodyEmpty/>
                                </Col>
                        }
                    </Row>
                </ModalBase>

                {/* Modal Detail Agent Performance Section */}
                <ModalBase
                    show            = {showDetailAgent} 
                    size            = "xl"
                    title           = "Hasil Pencarian Agen"
                    setShow         = {(par) => { setShowDetailAgent(par)}} 
                    unmountOnClose  = {true}
                >
                    <Row>
                        {
                            agentPerformance.length > 0 ?
                                agentPerformance.map((data, index) => (
                                    <Col md={6} className="d-flex flex-row">
                                        <CardWorkunit
                                            id      = {data._source.uuid} 
                                            key     = {`advanced-search-agent-${index}`} 
                                            index   = {index}
                                            type    = "agent"
                                        />
                                    </Col>
                                ))
                            :
                                <Col md={12}>
                                    <CustomTableBodyEmpty/>
                                </Col>
                        }
                    </Row>
                </ModalBase>

                {/* Modal Detail Report Section */}
                <ModalBase
                    show            = {showDetailReport} 
                    size            = "xl"
                    title           = "Hasil Pencarian Laporan"
                    setShow         = {(par) => { setShowDetailReport(par)}} 
                    unmountOnClose  = {true}
                >
                    <Row>
                        {
                            report.length > 0 ?
                                report.map((data) => (
                                    <Col md={4} className="d-flex flex-row">
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
                                    </Col>
                                ))
                            :
                                <Col md={12}>
                                    <CustomTableBodyEmpty/>
                                </Col>
                        }
                    </Row>
                </ModalBase>


                {/* Agent Report Section */}
                <h2>Berita</h2>
                <Row className="d-flex">
                    {
                        agentReport.length > 0 ?
                            agentReport.map((data, index) => (
                                index < 3 ? 
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
                                : null
                            ))
                        :
                            <Col md={12}>
                                <CustomTableBodyEmpty/>
                            </Col>
                    }
                    {
                        agentReport.length > 3 ?
                            <Col 
                                md          = {12} 
                                className   = "d-flex justify-content-end"
                            >
                                {/* <a onClick={() => setShowDetailAgentReport(true)}>
                                    <h4>Tampilkan Lebih Banyak</h4>
                                </a> */}

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

                {/* Workunit Section */}
                <h2>Satuan Kerja</h2>
                <Row className="d-flex">
                    {
                        workunitPerformance.length > 0 ?
                            workunitPerformance.map((data, index) => (
                                index < 3 ? 
                                    <Col md={6} className="d-flex flex-row">
                                        <Link to={"/configuration/work-unit-list/"+data.id+"?level="+data.workunit_level_id}>
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
                        workunitPerformance.length > 2 ?
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

                {/* Agent Performance Section */}
                <h3>Agen</h3>
                <Row className="d-flex">
                    {
                        agentPerformance.length > 0 ?
                            agentPerformance.map((data, index) => (
                                index < 2 ? 
                                    <Col md={6} className="d-flex flex-row">
                                        <Link to={`/performance?id_agent=${data.id}`}>
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
                        agentPerformance.length > 2 ?
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

                {/* Report Section */}
                <h3>Laporan</h3>
                <Row className="d-flex">
                    {
                        report.length > 0 ?
                            report.map((data, index) => (
                                index < 3 ? 
                                    <Col md={4} className="d-flex flex-row">
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
                        report.length > 2 ?
                            <Col 
                                md          = {12} 
                                className   = "d-flex justify-content-end"
                            >
                                {/* <a href="/report">
                                    <h4>Tampilkan Lebih Banyak</h4>
                                </a> */}

                                <Button 
                                    color   = 'flat-dark' 
                                    onClick = {() => setShowDetailReport(true)}
                                >
                                    Tampilkan Lebih Banyak
                                </Button>
                            </Col>
                        : null
                    }
                </Row>
            </div>
        </Fragment>
    )
};

export default AdvancedSearch;