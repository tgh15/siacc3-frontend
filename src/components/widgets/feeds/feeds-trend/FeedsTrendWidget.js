import React, { Fragment }  from 'react';
import {
    Card,
    CardBody, 
    CardHeader, 
    CardSubtitle,
    Spinner,
} from 'reactstrap';
import { useHistory }       from 'react-router';

import { NewsWidget }       from '../news-card-widget';
import CustomTableBodyEmpty from '../../custom-table/CustomTableBodyEmpty';
import Helper               from '../../../../helpers';
import FeedSkeleton from '../../feed-skeleton/FeedSkeleton';

export const FeedsTrendWidget = (props) => {

    let {reportTrending, handleStore} = props;

    const {getRoleByMenuStatus}     = Helper;

    //useHistory
    const history = useHistory();

    const handleNavigation = () => {
        history.push("/popular-topic")
    };


    return (
        <Fragment>
            <Card className="pb-0">
                <CardHeader style={{padding: '10px 21px 10px 21px'}}>
                    <span>Berita Trending</span>
                    <CardSubtitle 
                        onClick     = {() => {handleNavigation()}}
                        className   = "cursor-pointer m-0" 
                    >
                        <span>Lihat Semua</span>
                    </CardSubtitle>
                </CardHeader>
                <hr className="m-0"/>
                <CardBody className="p-0">
                    {
                        reportTrending != null ?
                            reportTrending.length > 0 ?
                                reportTrending.map((news, index) => (
                                    <NewsWidget
                                        id                     = {`report_trending_${news.id}-${index}`}
                                        data                    = {news}
                                        handleStore             = {(newss,data) => {handleStore(newss,data)}}

                                        //Role
                                        roleLike                = {getRoleByMenuStatus('Beranda', 'like')}
                                        roleViewer              = {getRoleByMenuStatus('Beranda', 'viewer')}   
                                        roleDislike             = {getRoleByMenuStatus('Beranda', 'dislike')}
                                        roleComment             = {false}
                                        {...news}
                                    />
                                )) 
                            :
                                <CustomTableBodyEmpty/>
                        : 
                            <FeedSkeleton count={2}/>
                    }
                </CardBody>
            </Card>
        </Fragment>
    );
};