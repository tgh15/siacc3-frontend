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

export const WidgetCardNewsBottom = (props)=>{
    const ref               = useRef(null)
    const viewRef           = useRef(null)
    const {fallbackImage_}  = Helper;
    
    const {
        id,
        saved,
        trophy,
        ratings,
        newsType,
        viewList,
        viewCounts,
        commentCounts,
        setShowViewForm,

        //Role
        roleLike,    
        roleViewer,  
        roleComment,
        
    }                               = props;

    const [rating, setRating]       = useState(ratings);
    const [popView, setPopView]     = useState(false);
    
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
            <div className="d-flex justify-content-end">
                {
                    roleLike ?
                        <Rating
                            onClick         = {(value) => {handleRatings(value)}}
                            fullSymbol      = {<Star size={22} fill='#ff9f43' stroke='#ff9f43' />}
                            emptySymbol     = {<Star size={22} fill='#babfc7' stroke='#babfc7' />}
                            initialRating   = {rating}
                        />
                    :
                        null
                }
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <Row>
                    {
                        roleComment ? 
                            <Button 
                                color       = "flat" 
                                className   = "d-flex pb-0"
                            >
                                <MessageCircle size={22}/>
                                <p className="ml-1">
                                    {commentCounts}
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
                                        color       = "flat" 
                                        className   = "d-flex pb-0"
                                    >
                                        <Eye size={22}/>
                                        <p className="ml-1">
                                            {viewCounts}
                                        </p>
                                    </Button>
                                </div>
                                <Popover
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
                                                viewList != null && viewList.sort((a,b) => {return a.level - b.level}).map((data, index ) => (
                                                    index < 5 ?
                                                        <Row className="px-1 pb-1">
                                                            <Col md={3} className="text-center">
                                                                <Avatar src={data.photo} onError={fallbackImage_}/>
                                                            </Col>
                                                            <Col md={9} className="d-flex align-items-center">
                                                                {data.name}
                                                            </Col>
                                                        </Row>
                                                    :
                                                        null
                                                ))
                                            }
                                            { 
                                                viewList != null && viewList.length > 5 ?
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
                                    className   = "d-flex pb-0"
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
                                className   = "d-flex pb-0"
                            >
                                <Bookmark size={22}/> 
                            </Button >
                        : 
                        null 
                    }
                    </Row>
                <Button className="text-right pr-0" color="flat">
                    {
                        newsType === 'nasional' ?
                            <Fragment>
                                <Globe size={22}/> Nasional
                            </Fragment>
                        :
                            <Fragment>
                                <MapPin size={18}/> Lokal
                            </Fragment>}   
                </Button>
            </div>
        </Fragment>
    )
}

export const AddCommentWidget=({textProps,buttonProps,childText,loading})=>{
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
                    <input  {...textProps} className="form-control" />
                    <div className="input-group-append">
                        {
                            loading === false ?
                                <span onClick={clickHandler} className="cursor-pointer input-group-text">
                                    <Send size={14}/>&nbsp;{childText==undefined?"":childText}
                                </span>
                            :
                                <span className="disabled input-group-text">
                                    <Send size={14}/>&nbsp;{childText==undefined?"":childText}
                                </span>
                        }
                    </div>
                </div>
                
            </Col>
        </Row>
    )
}