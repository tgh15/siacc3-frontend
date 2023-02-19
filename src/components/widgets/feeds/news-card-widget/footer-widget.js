import React, { Fragment, useEffect, useState, useRef }     from 'react'
import { 
        Eye, 
        Send,
        Star, 
        Globe, 
        MapPin,
        Bookmark,
        MessageCircle,
    }                                                           from 'react-feather'
import {
        Col, 
        Row,
        Button, 
        Popover,
        PopoverBody,
        UncontrolledPopover, 
    }                                                       from 'reactstrap'
import RowAvatarWidget                                      from '../../rw-avatar'
import Rating                                               from 'react-rating'
import Avatar                                               from '../../avatar'
import Helper                                               from '../../../../helpers'


//API
import feedsRatingAPI                                       from '../../../../services/pages/feeds/rating';

import Trophy                                               from '../../../../assets/icons/trophy.svg';
import { SelectWilayah } from '../../persetujuan-berita'

export const WidgetCardNewsBottom = (props)=>{
    const ref               = useRef(null)
    const viewRef           = useRef(null)
    const {fallbackImage_}  = Helper;
    
    const {
        id,
        saved,
        index,
        trophy,
        ratings,
        comments,
        approve,
        kind,
        publish_type,
        status,
        newsType,
        viewList,
        viewCounts,
        refreshData,
        commentCounts,
        viewListLeader,
        setShowViewForm,
        viewListCombine,

        //Role
        roleLike,    
        roleViewer,  
        roleComment,
        
    }                               = props;

    const [rating, setRating]                               = useState(ratings);
    const [popView, setPopView]                             = useState(false);
    const [publicationModalState, setPublicationModalState] = useState(false);
    
    const [state,setState]          = useState({
        refreshed               : false,
        textLikedStyle          : "none",
        textUnlikedStyle        : "none",
    });

    const createRating  = (value) => {
        const formData = {
            agent_report_id : id,
            rating          : value
        };

        feedsRatingAPI.submitRating(formData).then(
            res => {
                if(res.status === 201){
                }
            },
            err => {
                console.log(err, 'create rating');
            }
        )
    }

    const updateRating = (value) => {
        const formData = {
            agent_report_id : id,
            rating          : value
        };

        feedsRatingAPI.updateRating(formData).then(
            res => {
                if(res.status === 200){
                }
            },
            err => {
                console.log(err, 'update rating');
            }
        )
    };

    const deleteRating = () => {
        const formData = {
            agent_report_id : id
        };

        feedsRatingAPI.deleteRating(formData).then(
            res => {
                if(res.status === 200){
                    setRating(0);
                }
            },
            err => {
                console.log(err, 'create rating');
            }
        )
    };

    const handleRatings = (value) => {
        setRating(value);
        if(rating === 0){
            createRating(value);
        }
        else if(value === rating){
            deleteRating(value);
        }else{
            updateRating(value);
        }
        
    };

    useEffect(() => {
        let isMount=true
        let textLikeStyle=""
        let textDislikeStyle=""
        const {like,dislike,refreshed}=state
        let tmp_state = {...state}
        if(!refreshed){
            if(like){
                textLikeStyle="text-primary"
            }else{
                textLikeStyle=""
            }
            if(dislike){
                textDislikeStyle="text-primary"
            }else{
                textDislikeStyle=""
            }
            tmp_state={
                ...tmp_state,
                textLikedStyle:textLikeStyle,
                textUnlikedStyle:textDislikeStyle,
                refreshed:true
            }            
            setState(tmp_state)
        }

        return () => {
            isMount=false
        }
    }, [state])
    
    return (
        <Fragment>
            <Row >
                <Col md={9} className="d-flex align-items-center">
                    {
                        roleComment ? 
                            <Button
                                id          = {`comment_count_${index}`}
                                color       = "flat" 
                                className   = "d-flex pb-0 pl-0"
                            >
                                <MessageCircle size={22}/>
                                <p className="ml-1">
                                    {/* {commentCounts} */}
                                    {comments != null ? comments.length : 0}
                                </p>
                            </Button >
                        :
                            null
                    }
                    {
                        roleViewer ?
                            <>
                                <div ref={viewRef}>
                                    <Button
                                        id          = {`viewer_count_${index}`}
                                        color       = "flat" 
                                        className   = "d-flex pb-0 pl-0"
                                    >
                                        <Eye size={22}/>
                                        <p className="ml-1">
                                            {
                                                (viewList != null && viewListLeader != null) ?
                                                    viewList.length+viewListLeader.length
                                                :
                                                    viewList != null && viewListLeader == null ?
                                                        viewList.length
                                                    :
                                                        viewList == null && viewListLeader != null ?
                                                            viewListLeader.length
                                                        :
                                                            0
                                            }
                                        </p>
                                    </Button>
                                </div>

                                <Popover
                                    id          = {`viewer_popover_${index}`}
                                    isOpen      = {popView} 
                                    toggle      = {() => setPopView(!popView)} 
                                    target      = {viewRef}
                                    trigger     = 'legacy'
                                    placement   = "top" 
                                >
                                    <PopoverBody>
                                        {/* <Card className="mb-0"> */}
                                            <Row className="mx-0 p-1">
                                                <p>Dilihat Oleh :</p>
                                            </Row>
                                            {
                                                viewListCombine != null  && viewListCombine.sort((a,b) => {return a.level - b.level}).map((data, index ) => (
                                                    index < 5 ?
                                                        <Row className="px-1 pb-1">
                                                            <Col md={4} className="text-center">
                                                                <Avatar img={data.photo} onError={fallbackImage_}/>
                                                            </Col> 
                                                            <Col md={8} className="d-flex align-items-center">
                                                                {data.name}
                                                            </Col>
                                                        </Row>
                                                    :
                                                        null
                                                ))
                                            }
                                            { 
                                                viewListCombine != null && viewListCombine.length > 5 ?
                                                    <Row className="mx-0 pl-1">
                                                        <p type="flat" class="text-primary cursor-pointer" onClick={() => {setShowViewForm(true); setPopView(false)}}>Lihat Semuanya...</p>
                                                    </Row>
                                                :
                                                    null
                                            }
                                        {/* </Card> */}
                                    </PopoverBody>
                                </Popover>
                            </>
                        :
                            null
                    }
                    {
                        trophy != null ?
                            <>
                                <Button 
                                    key         = {'trophy_id_button'+id}
                                    id          = {'trophy_id_button'+id}
                                    color       = "flat" 
                                    className   = "d-flex pb-0 ml-1"
                                >
                                    <img tabIndex="-1" ref={ref} src={Trophy} height={20} width={20}/>
                                </Button>
                                <UncontrolledPopover trigger='legacy' placement="top" target={ref}>
                                    <PopoverBody>
                                        {
                                            trophy.map((data) => (
                                                    <Row className="mx-0 p-1">
                                                        <Col md={2} className="d-flex align-items-center justify-content-center">
                                                            <Avatar onError={fallbackImage_} img={data.trophy_detail.icon} imgHeight='35' imgWidth='35' />
                                                        </Col>
                                                        <Col md={10}>
                                                            <span>{data.trophy_detail.name}</span><br/>
                                                            {data.trophy_detail.points} Pts
                                                        </Col>
                                                    </Row>
                                            ))
                                        }
                                    </PopoverBody>
                                </UncontrolledPopover>
                            </>
                        :
                            null
                    }
                    {
                        saved ?
                            <Button 
                                color       = "flat" 
                                className   = "d-flex pb-0 ml-1"
                            >
                                <Bookmark size={22}/> 
                            </Button >
                        : 
                        null 
                    }
                </Col>
                <Col md={3} className="d-flex align-items-center justify-content-end">
                    {
                        roleLike ?
                            <Rating
                                id              = {`news_rating_${index}`}
                                onClick         = {(value) => {handleRatings(value)}}
                                fullSymbol      = {<Star size={22} fill='#ff9f43' stroke='#ff9f43' />}
                                emptySymbol     = {<Star size={22} fill='#babfc7' stroke='#babfc7' />}
                                initialRating   = {rating}
                            />
                        :
                            null
                    }
                </Col>
            </Row>
            <Row>
                <Col md={9} className="d-flex align-items-center">

                    <SelectWilayah 
                        data                = {{id : id}} 
                        show                = {publicationModalState} 
                        index               = {1}
                        setShow             = {() => setPublicationModalState(false)}
                        onSubmit            = {() => {refreshData(); console.log('trigger')}} 
                        publishType         = {publish_type == 'not_publish_yet' ? 0 : 1}
                    />

                    {
                        approve && ((localStorage.getItem('role') === 'Verifikator Pusat' || localStorage.getItem('role') === 'Admin') && publish_type == 'local_publish') ?
                        <Button 
                            id          = {`set_state_${index}`}
                            color       = "primary" size="sm" 
                            onClick     = {() => { setPublicationModalState(true)}} 
                            className   = "btn-sm"
                        >
                            Publikasi Nasional
                        </Button>
                        :
                            null
                    }

                </Col>
                <Col md={3} className="d-flex justify-content-end">
                    <Button className="text-right pr-0" color="flat">
                        {
                            newsType === 'nasional' ?
                                <Fragment>
                                    <Globe size={22}/> Nasional
                                </Fragment>
                            :
                                <Fragment>
                                    <MapPin size={18}/> Lokal
                                </Fragment>
                        }   
                    </Button>
                </Col>
            </Row>
        </Fragment>
    )
}

export const AddCommentWidget=({textProps,buttonProps,childText,loading,index})=>{
    const clickHandler = ()=>{ 
        buttonProps.onClick()
    }

    const user       = window.localStorage.getItem("userData")
    const userData   = JSON.parse(user)
    const userAvatar = (userData && userData.photo) ? userData.photo : `https://ui-avatars.com/api/?name=${ userData ? userData["name"] : "UN"}&background=4e73df&color=fff&bold=true`
    return (
        <Row className="mt-2 px-1">
            <RowAvatarWidget img={userAvatar}/>
            <Col>
                <div className="input-group-merge mb-2 input-group">
                    <input  
                        id = {`comment_input_${index}`}
                        {...textProps} className="form-control" />
                    <div className="input-group-append">
                        {
                            loading === false ?
                                <span 
                                    id          = {`comment_sent_${index}`}
                                    onClick     = {clickHandler} 
                                    className   = "cursor-pointer input-group-text"
                                >
                                    <Send size={14}/>&nbsp;{childText==undefined?"":childText}
                                </span>
                            :
                                <span 
                                    id          = {`comment_sent_disabled_${index}`}
                                    className   = "disabled input-group-text"
                                >
                                    <Send size={14}/>&nbsp;{childText==undefined?"":childText}
                                </span>
                        }
                    </div>
                </div>
                
            </Col>
        </Row>
    )
}