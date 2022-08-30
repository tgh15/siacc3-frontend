import React, { Fragment }      from 'react';
import { Col, Row }             from 'reactstrap';

//Components
import FeedSkeleton             from '../../components/widgets/feed-skeleton/FeedSkeleton';
import { NewsWidget }           from '../../components/widgets/feeds/news-card-widget';
import CustomTableBodyEmpty     from '../../components/widgets/custom-table/CustomTableBodyEmpty';
import CustomTableNotAuthorized from '../../components/widgets/custom-table/CustomTableNotAuthorized';

//Helper
import Helper                   from '../../helpers';


const SavedFeed = (props) => {

    const {getRoleByMenuStatus} = Helper;

    return (
        <Fragment>
            {
                getRoleByMenuStatus('Berita Tersimpan', 'saved_agent_report_list') ?
                    <Row>
                        {
                            props.loadingAllState ?
                                <Fragment>
                                    <Col md="6">
                                        <FeedSkeleton count={1}/>
                                    </Col>
                                    <Col>
                                        <FeedSkeleton count={1}/>
                                    </Col>
                                </Fragment>
                            :
                                props.leftState.length < 1 &&
                                props.rightState.length < 1 ?
                                    <Col md='12' sm='12'>
                                        <CustomTableBodyEmpty/>
                                    </Col>
                                :
                                    <Fragment>
                                        <Col 
                                            md = '6' 
                                            sm = '12'
                                        >
                                            {
                                                props.leftState &&
                                                props.leftState.map((data) => (
                                                    <NewsWidget
                                                        id              = {data.id}
                                                        data            = {data}
                                                        handleStore     = {props.handleStore}
                                                        
                                                        //Role
                                                        roleLike        = {getRoleByMenuStatus('Berita Tersimpan', 'like')}
                                                        roleDislike     = {getRoleByMenuStatus('Berita Tersimpan', 'dislike')}
                                                        roleComment     = {getRoleByMenuStatus('Berita Tersimpan', 'comment')}
                                                        roleViewer      = {getRoleByMenuStatus('Berita Tersimpan', 'viewer')}  
                                                        {...data}
                                                    />
                                                ))
                                            }
                                        </Col>
                                        <Col 
                                            md = '6' 
                                            sm = '12'
                                        >
                                            {
                                                props.rightState &&
                                                props.rightState.map((data) => (
                                                    <NewsWidget
                                                        id              = {data.id}
                                                        data            = {data}
                                                        handleStore     = {props.handleStore}
                                                        
                                                        //Role
                                                        roleLike        = {getRoleByMenuStatus('Berita Tersimpan', 'like')}
                                                        roleDislike     = {getRoleByMenuStatus('Berita Tersimpan', 'dislike')}
                                                        roleComment     = {getRoleByMenuStatus('Berita Tersimpan', 'comment')}
                                                        roleViewer      = {getRoleByMenuStatus('Berita Tersimpan', 'viewer')}  
                                                        {...data}
                                                    />
                                                ))
                                            }
                                        </Col>
                                    </Fragment>
                        }
                    </Row>
                : <CustomTableNotAuthorized/>
            }
        </Fragment>
    );
};

export default SavedFeed;