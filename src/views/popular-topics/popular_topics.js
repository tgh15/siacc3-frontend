import React, { Fragment, useContext }  from 'react';

//Third Party
import { Col, Row }                     from 'reactstrap';
import Select                           from 'react-select'

//Components
import { NewsWidget }                   from '../../components/widgets/feeds/news-card-widget';
import FilterRegion                     from './filter_region';
import FilterTrending                   from './filter_trending';
import CustomTableBodyEmpty             from '../../components/widgets/custom-table/CustomTableBodyEmpty';
import CustomTableNotAuthorized         from '../../components/widgets/custom-table/CustomTableNotAuthorized';

//Utils
import Helper                           from '../../helpers';
import { selectThemeColors }            from '@utils'
import { PerformanceContext }           from '../../context/PerformanceContext';
import FeedSkeleton                     from '../../components/widgets/feed-skeleton/FeedSkeleton';


const PopularTopics = (props) => {

    const {workunitOptions}             = useContext(PerformanceContext);
    const {getRoleByMenuStatus}         = Helper;
    
    return (
        getRoleByMenuStatus('Topik Populer', 'agent_report_list') ?
            <Fragment>
                <Row className="mb-2">
                    <Col sm={9} md={9} lg={9}>
                        <FilterRegion
                            trendingType        = {props.trendingType}
                            setTrendingType     = {props.setTrendingType}
                        />
                    </Col>
                    <Col sm={3} md={3} lg={3}>
                        <FilterTrending
                            trendingFilter      = {props.trendingFilter}
                            setTrendingFilter   = {props.setTrendingFilter}
                        />
                    </Col>
                </Row>
                

                {
                    props.trendingType != "national" && localStorage.getItem('role') != 'agen'? 
                        <Row className="mb-2">
                            <Col 
                                sm = "12"
                                md = "3"
                            >
                                <Select
                                    id              = {`popular_topic_workunit_filter`}
                                    theme           = {selectThemeColors}
                                    options         = {workunitOptions}
                                    onChange        = {(e) => { e ? props.setSelectedWorkunit(e.value) : props.setSelectedWorkunit(0) }}
                                    className       = 'react-select'
                                    placeholder     = "Pilih Satker"
                                    isClearable
                                    getOptionValue  = {(option) => `${option['value']}`}
                                    classNamePrefix = 'select'
                                /> 
                            </Col>
                        </Row>
                    : null
                }

                <Row>
                    <Col md='12' sm='12'>
                        {
                            props.loading ?
                                <FeedSkeleton/>
                            :
                                props.reportAgent &&
                                props.reportAgent?.length === 0 ?
                                    <CustomTableBodyEmpty/>
                                :
                                    props.reportAgent?.map((data, index) => (
                                        <NewsWidget
                                            id                      = {data.id}
                                            data                    = {data}
                                            index                   = {`popular_topic_${index}`}
                                            handleStore             = {props.handleStore}

                                            //Role
                                            roleLike                = {getRoleByMenuStatus('Topik Populer', 'like')}
                                            roleViewer              = {getRoleByMenuStatus('Topik Populer', 'viewer')}   
                                            roleDislike             = {getRoleByMenuStatus('Topik Populer', 'dislike')}
                                            roleComment             = {getRoleByMenuStatus('Topik Populer', 'comment')}
                                            {...data}
                                        />
                                    ))
                            
                        }
                        
                        {/* {
                            props.reportAgent && 
                            props.reportAgent.length === 0 &&
                            <CustomTableBodyEmpty/>
                        } */}
                    </Col>
                </Row>
            </Fragment>
        :
            <CustomTableNotAuthorized/>
    );
};

export default PopularTopics;
