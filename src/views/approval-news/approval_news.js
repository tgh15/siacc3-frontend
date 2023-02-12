import React, { Fragment, useContext, useState }    from 'react';
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

import { PerformanceContext }           from '../../context/PerformanceContext';

const PersetujuanBerita = (props) => {


    const {
        workunitOptions
    }                                  = useContext(PerformanceContext);

    const {
        setFilter,
        setFilterKeyword,
        setFilterCategory,
        handleRemoveAgentReport,
        
        //All Status
        countAllStatus,
        loadingAllStatus,
        leftStateAllStatus,
        rightStateAllStatus,
        paginationAllStatus,
        getAgentReportByStatusAll,
        
        //Type Shared
        countTypeShared,
        loadingTypeShared,
        leftStateTypeShared,
        rightStateTypeShared,
        paginationTypeShared,
        getAgentReportByTypeSharedRead,

        //Type SharedLimit
        countTypeSharedLimit,
        loadingTypeSharedLimit,
        leftStateTypeSharedLimit,
        rightStateTypeSharedLimit,
        paginationTypeSharedLimit,
        getAgentReportByTypeSharedLimit,

        //Position Shared
        countPositionShared,
        loadingPositionShared,
        leftStatePositionShared,
        paginationPositionShared,
        rightStatePositionShared,
        getAgentReportByPositionShared,

        //Archive
        countArchive,
        loadingArchive,
        leftStateArchive,
        rightStateArchive,
        paginationArchive,
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
                <NavItem id={`agent_report_by_status_tab`}>
                    <NavLink
                        active  = {active === '1'}
                        onClick = {() => {toggle('1'); getAgentReportByStatusAll(1);}}
                    >
                        Semua Persetujuan Berita
                        <Badge className="ml-1" color="primary">
                            {countAllStatus}
                        </Badge>
                    </NavLink>
                </NavItem>
                <NavItem id={`agent_report_by_type_shared_read_tab`}>
                    <NavLink
                        active  = {active === '2'}
                        onClick = {() => {toggle('2'); getAgentReportByTypeSharedRead(1)}}
                    >
                        Dapat Dibaca Semua
                        <Badge className="ml-1" color="primary">
                            {countTypeShared}
                        </Badge>
                    </NavLink>
                </NavItem>
                <NavItem id={`agent_report_by_type_shared_limit_tab`}>
                    <NavLink
                        active  = {active === '3'}
                        onClick = {() => {toggle('3'); getAgentReportByTypeSharedLimit(1)}}
                    >
                        Pembatasan Berita
                        <Badge className="ml-1" color="primary">
                            {countTypeSharedLimit}
                        </Badge>
                    </NavLink>
                </NavItem>
                <NavItem id={`agent_report_by_position_shared_tab`}>
                    <NavLink
                        active  = {active === '4'}
                        onClick = {() => {toggle('4'); getAgentReportByPositionShared(1)}}
                    >
                        Dikirim Kepimpinan
                        <Badge className="ml-1" color="primary">
                            {countPositionShared}
                        </Badge>
                    </NavLink>
                </NavItem>
                <NavItem id={`agent_report_by_archive_tab`}>
                    <NavLink
                        active  = {active === '5'}
                        onClick = {() => {toggle('5'); getAgentReportByArchive(1)}}
                    >
                        Hanya Dilihat Pengirim
                        <Badge className="ml-1" color="primary">
                            {countArchive}
                        </Badge>
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
                                            onFilter           = {setFilter}
                                            isApproval         = {true}
                                            workunitOptions    = {workunitOptions}
                                            onChangeCategories = {(category) => {
                                                setFilterCategory({type: 'category', value: category})
                                            }}
                                        />
                                    </Col>

                                    <Col md={{offset: 1, size: 3}} className="d-flex justify-content-end">
                                        <SearchTable
                                            id          = "search-data-all-approval" 
                                            onSearch    = {(keyword) => {setFilterKeyword({type: 'keyword', value: keyword});}}
                                            placeholder = {'Cari berita'} 
                                        />
                                    </Col>
                                </Row>

                                <Row className="d-flex justify-content-end mb-2">
                                    <CustomTablePaginate 
                                        getData         = {(params) => { getAgentReportByStatusAll(params.page)}}
                                        pagination      = {paginationAllStatus} 
                                        offsetSearch    = {12} 
                                    />
                                </Row>
                                
                                <Row>
                                    {
                                        loadingAllStatus ?
                                            <Fragment>
                                                <Col md='6'>
                                                    <FeedSkeleton count={1}/>
                                                </Col>
                                                <Col md='6'>
                                                    <FeedSkeleton count={1}/>
                                                </Col>
                                            </Fragment>
                                        :

                                            leftStateAllStatus.length < 1 && 
                                            rightStateAllStatus.length < 1 ?
                                                <Col md='12' sm='12'>
                                                    <CustomTableBodyEmpty/>
                                                </Col>
                                            :
                                                <Fragment>
                                                    <Col md='6' sm='12'>
                                                        {
                                                            leftStateAllStatus &&
                                                            leftStateAllStatus.map((data,index) => (
                                                                <Card>
                                                                    <CardBody>
                                                                        <ApprovedNewsWidget
                                                                            id                  = {data.id}
                                                                            index               = {`left_state_all_status_`+index}
                                                                            title               = {data.title}
                                                                            method              = {true}
                                                                            onSubmit            = {handleRemoveAgentReport}
                                                                            agent_report        = {data}
                                                                            statePosition       = 'left'
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
                                                            rightStateAllStatus &&
                                                            rightStateAllStatus.map((data, index) => (
                                                                <Card>
                                                                    <CardBody>
                                                                        <ApprovedNewsWidget
                                                                            id                  = {data.id}
                                                                            index               = {`right_state_all_status_`+index}
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
                            !loadingTypeShared ?
                                <Fragment>
                                    <Row className="d-flex align-items-center">
                                        <Col md={8}>
                                            <CategoryFilter
                                                onFilter           = {setFilter}
                                                isApproval         = {true}
                                                workunitOptions    = {workunitOptions}
                                                onChangeCategories = {(category) => {
                                                    setFilterCategory({type: 'category', value: category})
                                                }}
                                            />
                                        </Col>

                                        <Col md={{offset: 1, size: 3}} className="d-flex justify-content-end">
                                            <SearchTable
                                                id          = "search-data-all-approval" 
                                                onSearch    = {(keyword) => {setFilterKeyword({type: 'keyword', value: keyword});}}
                                                placeholder = {'Cari berita'} 
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="d-flex justify-content-end mb-2">
                                        <CustomTablePaginate 
                                            getData         = {(params) => { getAgentReportByTypeSharedRead(params.page)}}
                                            pagination      = {paginationTypeShared} 
                                            offsetSearch    = {12} 
                                        />
                                    </Row>
                                    
                                    <Row>
                                        {
                                            leftStateTypeShared.length < 1 && 
                                            rightStateTypeShared.length < 1 ?
                                                <Col md='12' sm='12'>
                                                    <CustomTableBodyEmpty/>
                                                </Col>
                                            :
                                                <Fragment>
                                                    <Col md='6' sm='12'>
                                                        {
                                                            leftStateTypeShared &&
                                                            leftStateTypeShared.map((data, index) => (
                                                                <NewsWidget
                                                                    id              = {data.id}
                                                                    data            = {data}
                                                                    index           = {`left_state_type_shared_`+index}
                                                                    handleStore     = {props.handleStore}
                                                                    refreshData     = {() => getAgentReportByTypeSharedLimit(1)}

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
                                                            rightStateTypeShared &&
                                                            rightStateTypeShared.map((data, index) => (
                                                                <NewsWidget
                                                                    id              = {data.id}
                                                                    data            = {data}
                                                                    index           = {`right_state_type_shared_`+index}
                                                                    handleStore     = {props.handleStore}
                                                                    refreshData     = {() => getAgentReportByTypeSharedLimit(1)}
                                                                    
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
                                <Row>
                                    <Col md='6'>
                                        <FeedSkeleton count={1}/>
                                    </Col>
                                    <Col md='6'>
                                        <FeedSkeleton count={1}/>
                                    </Col>
                                </Row>
                        :
                            <CustomTableNotAuthorized/>
                    }
                </TabPane>
                <TabPane tabId='3'>
                    {
                        getRoleByMenuStatus('Daftar Persetujuan Berita', 'agent_report_restriction_list') ? 
                            !loadingTypeSharedLimit ?
                                <>
                                    <Row className="d-flex align-items-center">
                                        <Col md={8}>
                                            <CategoryFilter
                                                onFilter           = {setFilter}
                                                isApproval         = {true}
                                                workunitOptions    = {workunitOptions}
                                                onChangeCategories = {(category) => {
                                                    setFilterCategory({type: 'category', value: category})
                                                }}
                                            />
                                        </Col>

                                        <Col md={{offset: 1, size: 3}} className="d-flex justify-content-end">
                                            <SearchTable
                                                id          = "search-data-all-approval" 
                                                onSearch    = {(keyword) => {setFilterKeyword({type: 'keyword', value: keyword});}}
                                                placeholder = {'Cari berita'} 
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-end mb-2">
                                        <CustomTablePaginate 
                                            getData         = {(params) => { getAgentReportByTypeSharedLimit(params.page)}}
                                            pagination      = {paginationTypeSharedLimit} 
                                            offsetSearch    = {12} 
                                        />
                                    </Row>
                                    <Row>
                                        {
                                            leftStateTypeSharedLimit.length < 1 && 
                                            rightStateTypeSharedLimit.length < 1 ?
                                                <Col md='12' sm='12'>
                                                    <CustomTableBodyEmpty/>
                                                </Col>
                                            :
                                                <Fragment>
                                                    <Col md='6' sm='12'>
                                                        {
                                                            leftStateTypeSharedLimit &&
                                                            leftStateTypeSharedLimit.map((data,index) => (
                                                                <NewsWidget
                                                                    id              = {data.id}
                                                                    data            = {data}
                                                                    index           = {`left_state_type_shared_limit_`+index}
                                                                    approve         = {true}
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
                                                            rightStateTypeSharedLimit &&
                                                            rightStateTypeSharedLimit.map((data, index) => (
                                                                <NewsWidget
                                                                    id              = {data.id}
                                                                    data            = {data}
                                                                    index           = {`right_state_type_shared_limit_`+index}
                                                                    approve         = {true}
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
                                </>
                            :
                                <Row>
                                    <Col md='6'>
                                        <FeedSkeleton count={1}/>
                                    </Col>
                                    <Col md='6'>
                                        <FeedSkeleton count={1}/>
                                    </Col>
                                </Row>
                                    
                        :
                            <CustomTableNotAuthorized/>
                    }
                </TabPane>
                <TabPane tabId='4'>
                    {
                        getRoleByMenuStatus('Daftar Persetujuan Berita', 'sent_to_leader_list') ? 
                            !loadingPositionShared ?
                                <>
                                    <Row className="d-flex align-items-center">
                                        <Col md={8}>
                                            <CategoryFilter
                                                onFilter           = {setFilter}
                                                isApproval         = {true}
                                                workunitOptions    = {workunitOptions}
                                                onChangeCategories = {(category) => {
                                                    setFilterCategory({type: 'category', value: category})
                                                }}
                                            />
                                        </Col>

                                        <Col md={{offset: 1, size: 3}} className="d-flex justify-content-end">
                                            <SearchTable
                                                id          = "search-data-all-approval" 
                                                onSearch    = {(keyword) => {setFilterKeyword({type: 'keyword', value: keyword});}}
                                                placeholder = {'Cari berita'} 
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-end mb-2">
                                        <CustomTablePaginate 
                                            getData         = {(params) => { getAgentReportByPositionShared(params.page)}}
                                            pagination      = {paginationPositionShared} 
                                            offsetSearch    = {12} 
                                        />
                                    </Row>
                                    <Row>
                                        {
                                            leftStatePositionShared.length < 1 && 
                                            rightStatePositionShared.length < 1 ?
                                                <Col md='12' sm='12'>
                                                    <CustomTableBodyEmpty/>
                                                </Col>
                                            :
                                                <Fragment>
                                                    <Col md='6' sm='12'>
                                                        {
                                                            leftStatePositionShared &&
                                                            leftStatePositionShared.map((data) => (
                                                                <Card>
                                                                    <CardBody>
                                                                        <ApprovedNewsWidget
                                                                            title           = {data.title}
                                                                            method          = {true}
                                                                            agent_report    = {data}
                                                                            onSubmit        = {getAgentReportByPositionShared}
                                                                        />
                                                                    </CardBody>
                                                                </Card>
                                                            ))
                                                        }
                                                    </Col>
                                                    <Col md='6' sm='12'>
                                                        {
                                                            rightStatePositionShared &&
                                                            rightStatePositionShared.map((data) => (
                                                                <Card>
                                                                    <CardBody>
                                                                        <ApprovedNewsWidget
                                                                            title           = {data.title}
                                                                            method          = {true}
                                                                            agent_report    = {data}
                                                                            onSubmit        = {getAgentReportByPositionShared}
                                                                        />
                                                                    </CardBody>
                                                                </Card>
                                                            ))
                                                        }
                                                    </Col>
                                                </Fragment>
                                        }
                                    </Row>
                                </>
                            :
                                <Row>
                                    <Col md='6'>
                                        <FeedSkeleton count={1}/>
                                    </Col>
                                    <Col md='6'>
                                        <FeedSkeleton count={1}/>
                                    </Col>
                                </Row>
                        :
                            <CustomTableNotAuthorized/>
                    }
                </TabPane>
                <TabPane tabId='5'>
                    {
                        getRoleByMenuStatus('Daftar Persetujuan Berita', 'only_seen_by_sender_list') ? 
                            !loadingArchive ?
                                <>
                                    <Row className="d-flex align-items-center">
                                        <Col md={8}>
                                            <CategoryFilter
                                                onFilter           = {setFilter}
                                                isApproval         = {true}
                                                workunitOptions    = {workunitOptions}
                                                onChangeCategories = {(category) => {
                                                    setFilterCategory({type: 'category', value: category})
                                                }}
                                            />
                                        </Col>

                                        <Col md={{offset: 1, size: 3}} className="d-flex justify-content-end">
                                            <SearchTable
                                                id          = "search-data-all-approval" 
                                                onSearch    = {(keyword) => {setFilterKeyword({type: 'keyword', value: keyword});}}
                                                placeholder = {'Cari berita'} 
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-end mb-2">
                                        <CustomTablePaginate 
                                            getData         = {(params) => { getAgentReportByArchive(params.page)}}
                                            pagination      = {paginationArchive} 
                                            offsetSearch    = {12} 
                                        />
                                    </Row>
                                    <Row>
                                        {
                                            leftStateArchive.length < 1 && 
                                            rightStateArchive.length < 1 ?
                                                <Col md='12' sm='12'>
                                                    <CustomTableBodyEmpty/>
                                                </Col>
                                            :
                                                <Fragment>
                                                    <Col md='6' sm='12'>
                                                        {
                                                            leftStateArchive &&
                                                            leftStateArchive.map((data) => (
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
                                                            rightStateArchive &&
                                                            rightStateArchive.map((data) => (
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
                                </>
                            :
                                <Row>
                                    <Col md='6'>
                                        <FeedSkeleton count={1}/>
                                    </Col>
                                    <Col md='6'>
                                        <FeedSkeleton count={1}/>
                                    </Col>
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