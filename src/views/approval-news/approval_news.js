import React, { Fragment, useState }    from 'react';
import { 
    Row, 
    Col, 
    Nav, 
    Card, 
    Badge, 
    NavItem, 
    NavLink, 
    TabPane,
    CardBody, 
    TabContent,
}                                       from 'reactstrap';

//Components
import SearchTable                      from '../../components/widgets/custom-table/SearchTable';
import FeedSkeleton                     from '../../components/widgets/feed-skeleton/FeedSkeleton';
import CustomTablePaginate              from '../../components/widgets/custom-table/CustomTablePaginate';
import CustomTableBodyEmpty             from '../../components/widgets/custom-table/CustomTableBodyEmpty';
import CustomTableNotAuthorized         from '../../components/widgets/custom-table/CustomTableNotAuthorized';
import { NewsWidget }                   from '../../components/widgets/feeds/news-card-widget';
import { CategoryFilter }               from '../../components/widgets/feeds/feeds-categories-components/categoryFilter';
import { ApprovedNewsWidget }           from '../../components/widgets/feeds/feeds-approved-news/Approve';

//Helper
import Helper                           from '../../helpers'; 

const PersetujuanBerita = (props) => {

    const {
        allStatusPage,
        setAllStatusPage,
        allStatusCount,
        allStatusPagination,
        setAllStatusPagination,
        handleRemoveAgentReport,
        getAgentReportByStatusAll,

        //Type Shared
        loadingTypeShared,
        typeSharedPagination,
        getAgentReportByTypeSharedRead,

        //Type SharedLimit
        getAgentReportByTypeSharedLimit,

        getAgentReportByPositionShared,

        //getAgentReportByArchive
        getAgentReportByArchive,
    } = props;
    
    //State
    const [active, setActive]   = useState('1');

    const {getRoleByMenuStatus} = Helper;
    
    //Tab
    const toggle = tab => {
        if (active !== tab) {
            setActive(tab);
        }
    };

    return(
        <Fragment>
            <Nav tabs justified>
                <NavItem>
                    <NavLink
                        active  = {active === '1'}
                        onClick = {() => {toggle('1'); getAgentReportByStatusAll(1)}}
                    >
                        Semua Persetujuan Berita
                        <Badge className="ml-1" color="primary">
                            {allStatusPagination != null ? allStatusPagination.data_total : 0}
                        </Badge>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active  = {active === '2'}
                        onClick = {() => {toggle('2'); getAgentReportByTypeSharedRead(1)}}
                    >
                        Dapat Dibaca Semua
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active  = {active === '3'}
                        onClick = {() => {toggle('3'); getAgentReportByTypeSharedLimit(1)}}
                    >
                        Pembatasan Berita
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active  = {active === '4'}
                        onClick = {() => {toggle('4'); getAgentReportByPositionShared(1)}}
                    >
                        Dikirim Kepimpinan
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active  = {active === '5'}
                        onClick = {() => {toggle('5'); getAgentReportByArchive(1)}}
                    >
                        Hanya Dilihat Pengirim
                    </NavLink>
                </NavItem>
            </Nav>
            
            <TabContent 
                className   = 'py-50' 
                activeTab   = {active}
            >
                <TabPane tabId='1'>
                    {
                        getRoleByMenuStatus('Daftar Persetujuan Berita', 'all_agent_report_approval_list') ? 
                            <Fragment>

                                <Row className="d-flex align-items-center">
                                    <Col md={8}>
                                        <CategoryFilter
                                            onFilter           = {props.setFilterAllState}
                                            isApproval         = {true}
                                            workunitOptions    = {props.workunitFilter}
                                            onChangeCategories = {(category) => {
                                                props.setFilterAllState({type: 'category', value: category})
                                                setAllStatusPage(1);
                                            }}
                                        />
                                    </Col>

                                    <Col md={{offset: 1, size: 3}} className="d-flex justify-content-end">
                                        <SearchTable
                                            id          = "search-data-all-approval" 
                                            onSearch    = {(keyword) => {props.setFilterAllState({type: 'keyword', value: keyword}); setAllStatusPage(1)}}
                                            placeholder = {'Cari berita'} 
                                        />
                                    </Col>
                                </Row>

                                <Row className="d-flex justify-content-end mb-2">
                                    <CustomTablePaginate 
                                        getData         = {(params) => { getAgentReportByStatusAll(params.page)}}
                                        pagination      = {allStatusPagination} 
                                        offsetSearch    = {12} 
                                    />
                                </Row>
                                
                                <Row>
                                    {
                                        props.loadingAllState ?
                                            <Fragment>

                                                <Col md='6'>
                                                    <FeedSkeleton count={1}/>
                                                </Col>
                                                <Col md='6'>
                                                    <FeedSkeleton count={1}/>
                                                </Col>
                                            </Fragment>
                                        :

                                            props.statusAllLeftState.length < 1 && 
                                            props.statusAllRightState.length < 1 ?
                                                <Col md='12' sm='12'>
                                                    <CustomTableBodyEmpty/>
                                                </Col>
                                            :
                                                <Fragment>
                                                    <Col md='6' sm='12'>
                                                        {
                                                            props.statusAllLeftState &&
                                                            props.statusAllLeftState.map((data,index) => (
                                                                <Card>
                                                                    <CardBody>
                                                                        <ApprovedNewsWidget
                                                                            id                  = {data.id}
                                                                            index               = {index}
                                                                            statePosition       = 'left'
                                                                            title               = {data.title}
                                                                            method              = {true}
                                                                            onSubmit            = {handleRemoveAgentReport}
                                                                            agent_report        = {data}
                                                                            onChangeToArchive   = {props.changeToArchive}
                                                                            getAgentReportByStatusAll = {getAgentReportByStatusAll}
                                                                        />
                                                                    </CardBody>
                                                                </Card>
                                                            ))
                                                        }
                                                    </Col>
                                                    <Col md='6' sm='12'>
                                                        {
                                                            props.statusAllRightState &&
                                                            props.statusAllRightState.map((data, index) => (
                                                                <Card>
                                                                    <CardBody>
                                                                        <ApprovedNewsWidget
                                                                            id                  = {data.id}
                                                                            index               = {index}
                                                                            statePosition       = 'right'
                                                                            title               = {data.title}
                                                                            method              = {true}
                                                                            onSubmit            = {handleRemoveAgentReport}
                                                                            agent_report        = {data}
                                                                            onChangeToArchive   = {props.changeToArchive}
                                                                            getAgentReportByStatusAll = {getAgentReportByStatusAll}
                                                                        />
                                                                    </CardBody>
                                                                </Card>
                                                            ))
                                                        }
                                                    </Col>
                                                </Fragment>
                                    }
                                </Row>
                            </Fragment>
                        :
                            <CustomTableNotAuthorized/>
                    }
                </TabPane>
                <TabPane tabId='2'>
                    {
                        getRoleByMenuStatus('Daftar Persetujuan Berita', 'all_can_be_read_list') ? 

                            <Fragment>
                                <Row className="d-flex justify-content-end mb-2">
                                    <CustomTablePaginate 
                                        getData         = {(params) => { getAgentReportByTypeSharedRead(params.page)}}
                                        pagination      = {typeSharedPagination} 
                                        offsetSearch    = {12} 
                                    />
                                </Row>
                                
                                <Row>
                                    {
                                        loadingTypeShared ?
                                            <Fragment>
                                                <Col md='6'>
                                                    <FeedSkeleton count={1}/>
                                                </Col>
                                                <Col md='6'>
                                                    <FeedSkeleton count={1}/>
                                                </Col>
                                            </Fragment>
                                        :
                                            props.typeSharedLeftState.length < 1 && 
                                            props.typeSharedRightState.length < 1 ?
                                                <Col md='12' sm='12'>
                                                    <CustomTableBodyEmpty/>
                                                </Col>
                                            :
                                                <Fragment>
                                                    <Col md='6' sm='12'>
                                                        {
                                                            props.typeSharedLeftState &&
                                                            props.typeSharedLeftState.map((data) => (
                                                                <NewsWidget
                                                                    id              = {data.id}
                                                                    data            = {data}
                                                                    handleStore     = {props.handleStore}

                                                                    //Role
                                                                    roleLike        = {true}
                                                                    roleDislike     = {true}
                                                                    roleComment     = {true}
                                                                    roleViewer      = {true}   
                                                                    {...data}
                                                                />
                                                            ))
                                                        }
                                                    </Col>
                                                    <Col md='6' sm='12'>
                                                        {
                                                            props.typeSharedRightState &&
                                                            props.typeSharedRightState.map((data) => (
                                                                <NewsWidget
                                                                    id              = {data.id}
                                                                    data            = {data}
                                                                    handleStore     = {props.handleStore}
                                                                    
                                                                    //Role
                                                                    roleLike        = {true}
                                                                    roleDislike     = {true}
                                                                    roleComment     = {true}
                                                                    roleViewer      = {true}   
                                                                    {...data}
                                                                />
                                                            ))
                                                        }
                                                    </Col>
                                                </Fragment>
                                    }
                                </Row>
                            </Fragment>
                        :
                            <CustomTableNotAuthorized/>
                    }
                </TabPane>
                <TabPane tabId='3'>
                    {
                        getRoleByMenuStatus('Daftar Persetujuan Berita', 'agent_report_restriction_list') ? 
                            <Row>
                                {
                                    props.typeSharedLimitLeftState.length < 1 && 
                                    props.typeSharedLimitRightState.length < 1 ?
                                        <Col md='12' sm='12'>
                                            <CustomTableBodyEmpty/>
                                        </Col>
                                    :
                                        <Fragment>
                                            <Col md='6' sm='12'>
                                                {
                                                    props.typeSharedLimitLeftState &&
                                                    props.typeSharedLimitLeftState.map((data) => (
                                                        <NewsWidget
                                                            id              = {data.id}
                                                            data            = {data}
                                                            handleStore     = {props.handleStore}

                                                            roleLike        = {true}
                                                            roleDislike     = {true}
                                                            roleComment     = {true}
                                                            roleViewer      = {true}   
                                                            {...data}
                                                        />
                                                    ))
                                                }
                                            </Col>
                                            <Col md='6' sm='12'>
                                                {
                                                    props.typeSharedLimitRightState &&
                                                    props.typeSharedLimitRightState.map((data) => (
                                                        <NewsWidget
                                                            id              = {data.id}
                                                            data            = {data}
                                                            handleStore     = {props.handleStore}

                                                            roleLike        = {true}
                                                            roleDislike     = {true}
                                                            roleComment     = {true}
                                                            roleViewer      = {true}   
                                                            {...data}
                                                        />
                                                    ))
                                                }
                                            </Col>
                                        </Fragment>
                                }
                            </Row>
                        :
                            <CustomTableNotAuthorized/>
                    }
                </TabPane>
                <TabPane tabId='4'>
                    {
                        getRoleByMenuStatus('Daftar Persetujuan Berita', 'sent_to_leader_list') ? 
                            <Row>
                                {
                                    props.positionSharedLeftState.length < 1 && 
                                    props.positionSharedRightState.length < 1 ?
                                        <Col md='12' sm='12'>
                                            <CustomTableBodyEmpty/>
                                        </Col>
                                    :
                                        <Fragment>
                                            <Col md='6' sm='12'>
                                                {
                                                    props.positionSharedLeftState &&
                                                    props.positionSharedLeftState.map((data) => (
                                                        <Card>
                                                            <CardBody>
                                                                <ApprovedNewsWidget
                                                                    title           = {data.title}
                                                                    method          = {true}
                                                                    agent_report    = {data}
                                                                    onSubmit        = {props.getAgentReportByPositionShared}
                                                                />
                                                            </CardBody>
                                                        </Card>
                                                    ))
                                                }
                                            </Col>
                                            <Col md='6' sm='12'>
                                                {
                                                    props.positionSharedRightState &&
                                                    props.positionSharedRightState.map((data) => (
                                                        <Card>
                                                            <CardBody>
                                                                <ApprovedNewsWidget
                                                                    title           = {data.title}
                                                                    method          = {true}
                                                                    agent_report    = {data}
                                                                    onSubmit        = {props.getAgentReportByPositionShared}
                                                                />
                                                            </CardBody>
                                                        </Card>
                                                    ))
                                                }
                                            </Col>
                                        </Fragment>
                                }
                            </Row>
                        :
                            <CustomTableNotAuthorized/>
                    }
                </TabPane>
                <TabPane tabId='5'>
                    {
                        getRoleByMenuStatus('Daftar Persetujuan Berita', 'only_seen_by_sender_list') ? 
                            <Row>
                                {
                                    props.archiveLeftState.length < 1 && 
                                    props.archiveRightState.length < 1 ?
                                        <Col md='12' sm='12'>
                                            <CustomTableBodyEmpty/>
                                        </Col>
                                    :
                                        <Fragment>
                                            <Col md='6' sm='12'>
                                                {
                                                    props.archiveLeftState &&
                                                    props.archiveLeftState.map((data) => (
                                                        <Card>
                                                            <CardBody>
                                                                <ApprovedNewsWidget
                                                                    title           = {data.title}
                                                                    method          = {true}
                                                                    agent_report    = {data}
                                                                    hidden_status   = {true}
                                                                />
                                                            </CardBody>
                                                        </Card>
                                                    ))
                                                }
                                            </Col>
                                            <Col md='6' sm='12'>
                                                {
                                                    props.archiveRightState &&
                                                    props.archiveRightState.map((data) => (
                                                        <Card>
                                                            <CardBody>
                                                                <ApprovedNewsWidget
                                                                    title           = {data.title}
                                                                    method          = {true}
                                                                    agent_report    = {data}
                                                                    hidden_status   = {true}
                                                                />
                                                            </CardBody>
                                                        </Card>
                                                    ))
                                                }
                                            </Col>
                                        </Fragment>
                                }
                            </Row>
                        :
                            <CustomTableNotAuthorized/>
                    }
                </TabPane>
            </TabContent>
        </Fragment>
    );
};

export default PersetujuanBerita;