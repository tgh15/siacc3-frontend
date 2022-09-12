import React, { Fragment } from 'react';

import { 
        Button,
        CardBody, 
        FormGroup, 
    }                               from 'reactstrap';

import { WidgetNewsCardHeader }     from './widget-head';
import CardUrl                      from '../../card-url/CardUrl';
import CardFile                     from '../../card-file/CardFile';
import CarouselAttachment           from '../../card-carousel';
import CardVideo                    from '../../card-video';
import CardAudio                    from '../../card-audio';
import Helper                       from '../../../../helpers';


export const NewsPreview = (props) => {
    const { 
        video, 
        audio,
        links, 
        images,
        loading,
        location,  
        dataNews,
        attachmentFiles,
    } = props;

    return (
        <Fragment>
            {/* <Card> */}
                <CardBody>
                    {/* Header */}
                    <WidgetNewsCardHeader
                        title                   = {dataNews.title} 
                        avatar                  = {localStorage.getItem('userData').photo} 
                        preview                 = {true}
                        division                = {localStorage.getItem('workunit')} 
                        subTitle                = {`beberapa detik yang lalu - ${location}`} 
                    />

                    {/* Title */}
                    <FormGroup>
                        <h4>
                            {
                                dataNews.title == undefined || dataNews.title == null ? null : dataNews.title
                            }
                        </h4>
                    </FormGroup>

                    {/* Content */}
                    <FormGroup>
                        {
                            images != undefined && images.length > 0 ?
                                <CarouselAttachment 
                                    style  = {{marginTop:"1em",marginBottom:"1em"}}
                                    images = {images} 
                                />
                            :
                                null
                        }

                        {
                            video != undefined && video.length > 0 ? 
                                <CardVideo item={video}/> 
                            : 
                                null
                        }

                        
                        {
                            audio != undefined && audio.length > 0 ? 
                                <CardAudio item={audio}/> 
                            : 
                                null
                        }
                        
                        <p className="text-justify mt-1 mb-2" style={{ wordWrap: 'break-word'}}>
                            {dataNews.when_}, telah terjadi {dataNews.what}, 
                            bertempat di {dataNews.where} {dataNews.who}. 
                            Kejadian ini terjadi karena {dataNews.why}, {dataNews.how}
                        </p>

                        {
                            attachmentFiles != undefined && attachmentFiles.length > 0 ? 
                                <CardFile item={attachmentFiles}/> 
                            : 
                                null
                        }

                        {
                            links != undefined && links.length > 0 ? 
                                <CardUrl data={links}/> 
                            : 
                                null
                        }
                        
                        <div style={{wordWrap: 'break-word'}}>
                            {
                                dataNews != undefined ? 
                                    dataNews.hashtags.split(" ").map((data) => (
                                        <a href={`/advanced-search?keyword=${data.replace('#',"")}`}><h6 className="d-inline text-primary mr-1">{data}</h6></a>
                                    ))
                                :
                                    null
                            }
                        </div>
                    </FormGroup>
                    
                </CardBody>
            {/* </Card> */}
        </Fragment>
    );
};

export const NewsWithImage = () => {};