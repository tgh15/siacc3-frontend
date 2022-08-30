import React, { Fragment }      from 'react';

import { NewsWidget }           from "../../components/widgets/feeds/news-card-widget";
import CustomTableBodyEmpty     from '../../components/widgets/custom-table/CustomTableBodyEmpty';
import Helper                   from '../../helpers';

export function FeedWrapper(props) {
    
    let {feeds, handleStore, getAgentReportData} = props;

    const {getRoleByMenuStatus}     = Helper;

    return (
        <Fragment>
            {
                Array.isArray(feeds) ? 
                    feeds.length > 0 ?
                        feeds.map((news,index) => {
                            if(news != undefined) {
                                return (
                                    <NewsWidget
                                        key                     = {`news-feed-page-${news.id}-${index}`}
                                        data                    = {news}
                                        handleStore             = {(newss,data) => {handleStore(newss,data)}}
                                        getAgentReportData      = {getAgentReportData}

                                        //Role
                                        roleLike                = {getRoleByMenuStatus('Beranda', 'like')}
                                        roleViewer              = {getRoleByMenuStatus('Beranda', 'viewer')}   
                                        roleDislike             = {getRoleByMenuStatus('Beranda', 'dislike')}
                                        roleComment             = {getRoleByMenuStatus('Beranda', 'comment')}
                                        {...news}
                                    />
                                )
                            }
                        }) 
                    : 
                        <CustomTableBodyEmpty />
                :
                    null
            }
        </Fragment>
    );
};