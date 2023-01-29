import React from 'react';
import { 
    Card, 
    CardBody, 
    CardHeader, 
    CardSubtitle, 
    Spinner
} from "reactstrap";

import { useHistory }           from 'react-router-dom';
import CustomTableBodyEmpty     from '../../custom-table/CustomTableBodyEmpty';
import { ApprovedNewsWidget }   from './Approve';
import FeedSkeleton from '../../feed-skeleton/FeedSkeleton';


export const FeedsApprovedNewsCard = (props) => {

    const { news }  = props;
    const history   = useHistory();

    const handleNavigation = () => {
        history.push("/approval-news")
    };

    if(news != ""){
        return (
            <Card>
                <CardHeader style={{padding: '10px 21px 10px 21px'}}>
                    <span>Persetujuan Berita</span>
                    <CardSubtitle 
                        onClick     = {() => {handleNavigation()}}
                        className   = "cursor-pointer m-0" 
                    >
                        Lihat Semua
                    </CardSubtitle>
                </CardHeader>
                <hr className="m-0"/>
                <CardBody>
                    {
                        Array.isArray(news) ? 
                            news.map((v,i) => {
                                return (
                                    i <= 2 ?
                                        v.status === (localStorage.getItem('role') == "Verifikator Pusat" ? 1 : 0) ?
                                            <ApprovedNewsWidget 
                                                key               = {`ap-ne-widget${i}-${v.id}`} 
                                                onSubmit          = {() => {props.onSubmit()}} 
                                                onChangeToArchive = {props.onChangeToArchive}
                                                {...{agent_report:v}}
                                                {...v}
                                            />
                                        :
                                            null
                                    :
                                        null
                                );
                            }) 
                        :
                            <div className="text-center">
                                <FeedSkeleton count={2}/>
                            </div>
                    }
                </CardBody>
            </Card>
        );
    }else{
        return (
            <Card>
                <CardHeader style={{padding: '10px 21px 10px 21px'}}>
                    <span>Persetujuan Berita</span>
                    <CardSubtitle 
                        onClick     = {() => {handleNavigation()}}
                        className   = "cursor-pointer m-0" 
                    >
                        Lihat Semua
                    </CardSubtitle>
                </CardHeader>
                <hr className="m-0"/>
                <CardBody>
                    <div className="text-center">
                        <CustomTableBodyEmpty/>
                    </div>
                </CardBody>
            </Card>
        );
    }
};