import React, { 
    useRef, 
    useState, 
    Fragment, 
    useEffect, 
    useContext,
} from 'react';

import moment                      from 'moment';
import { Archive, Star }           from 'react-feather';
import { 
        Col, 
        Row, 
        Card,
        Form,
        Label,
        Input,
        Button,
        CardBody, 
        FormGroup,
        PaginationItem,
        PaginationLink,
        Pagination, 
    }                               from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import Avatar                       from '../../avatar';
import Comments                     from '../../../../services/pages/feeds/comments';
import ViewerApi                    from '../../../../services/pages/feeds/viewer';
import CustomToast                  from '../../custom-toast';
import defaultAvatar                from '../../default-image/DefaultAvatar';
import ContainerFluid               from '../../fluid';
import { setFeedLists }             from '../../../../redux/actions/app/Feeds';
import { CommentWidgets }           from './comments';
import { WidgetChildDropdown }      from './widget-dropdown';
import { WidgetNewsCardHeader }     from './widget-head';
import Helper                       from '../../../../helpers';
import {TrophyContext}              from '../../../../context/TrophyContext';

import feedsRatingAPI               from '../../../../services/pages/feeds/rating';
import feedsAgentReportAPI          from '../../../../services/pages/feeds/agent-reports';
import { useForm }                  from "react-hook-form";
import parse                        from 'html-react-parser';

import { 
    getAllNews, 
    getReplies, 
    compareComment, 
    getNewsByCategories,
} from './NewsConfig';

import { 
    AddCommentWidget, 
    WidgetCardNewsBottom 
} from './footer-widget';
import { ModalBase } from '../../modals-base';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import { WebsocketURL } from '../../../../configs/socket';

export const NewsWidget = (props) => {
    const {
        id,
        title,
        status,
        ratings,
        isSaved, 
        hashtag,
        archived,
        subTitle, 
        division, 
        newsType,
        publish_date, 
        time_update,
        location, 
        bodyText, 
        imgAvatar, 
        feedsTitle, 
        ratings_check,
        selected_check,
        self_selected_check,

        //api
        // getAgentReportData,

        //Role
        roleLike,            
        roleViewer, 
        roleDislike,            
        roleComment,             
        handleStore,
        
        trophies        : trophyData,
        
        data            : dataNews, 
        comments        : xcomments, 
        viewCount       : viewerCount, 
        commentsCount   : commentCount, 
        attachmentsData : attdata,
    } = props;

    const bodyCardRef                                       = useRef();

    const {
            countWord,
            shortenWord,
            fallbackImage_,
            getRoleByMenuStatus, 
        }                                                   = Helper;

    const { 
        register,
        setValue,
        handleSubmit,
        formState   : { errors }
    }                                                       = useForm();

    const [parentID]                                        = useState(0);
    const [attach,setAttach]                                = useState(null);
    const [savedBerita, setSaved]                           = useState(false);
    const [agent_id,set_agent_id]                           = useState(0);   
    const [showAnalog,setShowAnalog]                        = useState(1);
    const [showViewForm, setShowViewForm]                   = useState(false);
    const [detailRating, setDetailRating]                   = useState(null);
    const [analogComment, setAnalogComment]                 = useState(1);
    const [showTrophyForm, setShowTrophyForm]               = useState(false);
    const [showRatingForm, setShowRatingForm]               = useState(false);
    const [commentLoading, setCommentLoading]               = useState(false);
    const [showHashtagForm, setShowHashtagForm]             = useState(false);

    //Comment
    const [comments,setComments]                            = useState(xcomments);
    const [countComment, setCountComment]                   = useState(commentCount);
    const [currentCount, setCurrentCount]                   = useState(0);
    const [socketStatus, setSocketStatus]                   = useState(false);
    const [commentSocket, setCommentSocket]                 = useState(null);

    const [trophy, setTrophy]                                   = useState(trophyData);
    const [viewList, setViewList]                               = useState(null);
    const [viewCount,setViewCount]                              = useState(viewerCount);
    const [pageViewList, setPageViewList]                       = useState(1);
    const [viewListLeader, setViewListLeader]                   = useState(null);
    const [viewListCombine, setViewListCombine]                 = useState(null);
    const [totalPageViewList, setTotalPageViewList]             = useState(null);
    const [pageViewListLeader, setPageViewListLeader]           = useState(1);
    const [totalPageViewListLeader, setTotalPageViewListLeader] = useState(null);

    const [selectedCheck, setSelectedCheck]                 = useState(selected_check); 

    const {trophies}                                        = useContext(TrophyContext);

    const [sendData, setSendData] = useState({
        agent_report_id: id,
        parent_id: parentID,
        comment: "",
    }) ;

    const ref           = useRef();
    const select        = useSelector(state => {return state});
    const dispatcher    = useDispatch();

    const toggle = {
        save: () => {
            setSaved(!savedBerita);
            handleStore(id,!savedBerita);
        }
    };

    const handleSelectedNews = (id) => {
        const formData = {
            agent_report_id : id
        };
    
        feedsAgentReportAPI.changeAgentReportToSelected(formData).then(
            res => {
                if(res.status === 200){
                    CustomToast('success', 'Pemilihan berita berhasil.');
                    setSelectedCheck(true);
                }
            },
            err => {
                if(err.status == 400){
                    CustomToast('danger', 'Fitur ini hanya tersedia untuk Pimpinan Pusat, Verifikator Pusat, dan Analis Direktorat');
                }else{
                    console.log(err, 'change agent report to selected news');
                }
            }
        )
    }

    const getRatingByAgentReport = () => {

        const formData = {
            agent_report_id : id
        }

        feedsRatingAPI.getRatingByAgentReport(formData).then(
            res => {
                if(res.status === 200 && res.data.ratings_detail != null){
                    setDetailRating(res.data);
                }
            },
            err => {
                console.log(err, 'get detail rating');
            }
        )
    };
    
    const handleCancelSelectedNews = (id) => {
        const formData = {
            agent_report_id : id
        };
    
        feedsAgentReportAPI.cancelAgentReportFromSelected(formData).then(
            res => {
                if(res.status === 200){
                    CustomToast('success', 'Pemilihan berita berhasil dibatalkan.');
                    setSelectedCheck(false);
                }
            },
            err => {
                if(err.status === 400){
                    CustomToast('danger', 'Fitur ini hanya tersedia untuk Pimpinan Pusat, Verifikator Pusat, dan Analis Direktorat');
                }else{
                    console.log(err, 'change agent report to selected news');
                }
            }
        )
    }

    const dropdownWidget = (archived || status < 2) ? 
        null 
    : 
        <WidgetChildDropdown
            key                     = {"widget_child_dropdown_"+id}  
            saved                   = {savedBerita} 
            hashtag                 = {hashtag}
            dataNews                = {id}
            setSaved                = {() => { toggle.save() }}
            selectedCheck           = {selectedCheck}
            changeToSelected        = {handleSelectedNews}
            setShowTrophyForm       = {setShowTrophyForm}
            setShowRatingForm       = {setShowRatingForm}
            setShowHashtagForm      = {setShowHashtagForm}
            cancelFromSelected      = {handleCancelSelectedNews}
            self_selected_check     = {self_selected_check}
            getRatingByAgentReport  = {getRatingByAgentReport}
        />

    const setAnalog = (p) => {
        setAnalogComment(p)
    };

    const commentTextHandlers = {
        ref         : ref,
        placeholder : "Tulis Komentar...",

        onChange: (e) => {
            const { target: { value } } = e;
            let sdata = { ...sendData }
            sdata.comment = value;
            setSendData(sdata);
        },
        onKeyUp: ({ keyCode, target }) => {
            const { value } = target;

            if (keyCode === 13) {
                if (value != "") {
                    commentButtonHandlers.onClick();
                }
            }
        }
    }
    
    const refreshFeeds = () => {
        const {FeedsCategoriesReducer : {activeCategories}, FeedsReducer} = select;

        if(activeCategories.id == 'all'){
            getAllNews({handler : (data) => {
                if(Array.isArray(data)) {
                    dispatcher(setFeedLists(data));
                }
            },callback : () => {}})
        }else{
            getNewsByCategories({
                handler:(response)=>{
                    console.log(response);
                },
                callback:(er) => {
                }
            })
        }
    };
    
    const commentButtonHandlers = {
        onClick: () => {
            let validated = true;
            let errs = [];

            if(sendData.comment == ""){
                validated = false;
            }else{
                validated = true;
            };

            console.log(sendData.comment, 'comment')
            console.log(validated, 'validated')
            
            if (validated && commentLoading === false) {
                setCommentLoading(true);

                Comments.create(sendData).then(response => {
                    CustomToast("success", "Berhasil Menambahkan komentar", "Add Comment");
                    commentTextHandlers.ref.current.value = "";
                    const {FeedsCategoriesReducer} = select;

                    moment.locale("id");
                    const time = moment(response.data.created_at).calendar();
                    let komen  = {
                        id              : response.data.id,
                        times           : time,
                        comments        : response.data.comment,
                        imgAvatar       : response.data.photo == "" ? `https://ui-avatars.com/api/?name=${ response.data.name ? response.data.name : "UN"}&background=4e73df&color=fff&bold=true` : response.data.photo,
                        likeCounts      : 0,
                        commentatorName : response.data.name,
                    }

                    let commen_arr = [komen,...comments];
                    setComments(commen_arr);
                    refreshFeeds();
                    setCommentLoading(false);
                }).catch(err => {
                    console.log("ERR",err);
                    CustomToast("danger", "Gagal Menambahkan Komentar Server \n", "Add Comment");
                })
            } else {
                CustomToast("danger", `Gagal Menambahkan komentar \n ${errs.join('\n')}`, "Add Comment");
            }
        }
    };

    const refreshComments = async () => {
        let comment = [...comments];
        comment = await getReplies(comment);
        setComments(comment);
    }
    
    const analogHandler = () => {
        Comments.byAgent({
            page         : analogComment,
            agent_report : {id : agent_id},
        }).then(async(response) => {
            const { 
                data : {
                    comment, 
                    pagination : {
                        current_page    : p_active, 
                        page_total      : p_total, has_next
                    }
                }
            } = response;
            
            setAnalog(p_active+1);
            let com_res = compareComment(comment);
            let coment  = [];

            if(p_active == 1){
                coment = com_res;
            }else{
                coment = [...comments,...com_res];
            }

            coment = await getReplies(coment);
            setComments(coment);
            setCurrentCount(currentCount + coment.length);
            setShowAnalog(has_next);
        })
    }

    const CommentAnalogs = () => {
        if (commentCount > 3 && showAnalog) {
            return (
                <Fragment>
                    <p 
                        onClick   = {() => { 
                            analogHandler();
                        }} 
                        className = "cursor-pointer mb-1"
                    >
                        Tampilkan  {commentCount - currentCount - 2} komentar sebelumnya ...
                    </p>

                    <ContainerFluid>
                        <CommentWidgets 
                            threadID        = {id} 
                            comments        = {comments} 
                            limitation      = {analogComment == 1 ? 2 : analogComment * 10} 
                            refreshComments = {refreshComments} 
                        />
                    </ContainerFluid>
                </Fragment>
            )
        } else {
            return (
                <ContainerFluid>
                    <ContainerFluid>
                        <CommentWidgets 
                            threadID        = {id} 
                            comments        = {comments} 
                            refreshComments = {refreshComments} 
                        />
                    </ContainerFluid>
                </ContainerFluid>
            )
        }
    };

    const handleViewer = () => {
        ViewerApi.create(agent_id).then(response => {
            ViewerApi.count(agent_id).then(response_count => {
                
            })
        })
    };

    const addTrophy = (agent_report_id, trophy_id) => {
        const formData = {
            agent_report_id : agent_report_id,
            trophy_id : trophy_id
        }
    
        feedsAgentReportAPI.addTrophy(formData).then(
            res => {
                if(res.status === 201){
                    CustomToast('success', 'Trophy berhasil diberikan.');
                    setShowTrophyForm(false);
                    if(res.data != null){
                        setTrophy([res.data]);
                    }
                }
            },
            err => {
                console.log(err, 'add trophy');
            }
        )
    }

    const getViewerByAgentReport = () => {
        const formData = {
            agent_report_id : id
        };

        feedsAgentReportAPI.getViewerByAgentReport(formData).then(
            res => {
                if(res.status == 200){

                    let viewListAgen_    = [];
                    let viewListLeader_  = [];

                    if(res.data != null && res.data.length > 0){
                        res.data.map((data) => (
                            data.group == "Pimpinan Daerah" || data.group == "Pimpinan Pusat" ?
                                viewListLeader_.push(data)
                            :
                                viewListAgen_.push(data)
                        ))

                        setTotalPageViewList(Math.ceil(viewListAgen_.length/10));
                        setTotalPageViewListLeader(Math.ceil(viewListLeader_.length/10));

                        setViewList(viewListAgen_);
                        setViewListLeader(viewListLeader_);
                        setViewListCombine(res.data.slice(0,6))
                    }else{
                        setViewList([]);
                        setViewListLeader([]);
                        setViewListCombine([]);
                    }

                }
            },
            err => {
                console.log(err, 'get list view');
            }
        )
    };

    const handleSubmit_ = (val) => {

        const formData = {
            agent_report_id : id,
            hashtags        : val.hashtag.split(' ')
        }

        feedsAgentReportAPI.changeHashtagByAgentReport(formData).then(
            res => {
                if(res.status === 200){
                    CustomToast('success', 'Hashtag Berhasil Diubah');
                    setShowHashtagForm(false);
                    window.location.reload();
                }
            },
            err => {
                console.log(err, 'update hashtag');
            }
        )
    };

    const connectFeedsSocket = () => {
        const websocket = new WebSocket(WebsocketURL.feedsSocket(id));
        setCommentSocket(websocket);  
    };

    //API create comment
    const handleComment = (id) => event => { 
        setParent(false);
        if(commentSocket != null && event.length > 0){

            let val = {
                type        : "feeds-comment",
                is_secure   : true,
                token       : localStorage.getItem('apiToken'),
                payload     : {
                    comment : event,
                    parent_id   : parent == false ? 0 : parent,
                    agent_report_id : parseInt(id)
                }
            };

            commentSocket.send(JSON.stringify(val)); 
            resetForm.resetFields();
        }
    };

    //Get Comment From Socket
    if(commentSocket != null){
        commentSocket.onopen = function(e) {
            setSocketStatus(true);
        };

        commentSocket.onmessage = function(event) {
            let res = JSON.parse(event.data);

            if(res.status === 201 && res.type === "feeds-comment") {
                
                if(res.data.parent_id == 0){

                    let oldComment = comments;
                    oldComment.push(res.data);
                    setComments([...oldComment]);
                    
                    if(countComment >= 0){
                        setCountComment(countComment+1);
                        setCurrentCount(currentCount+1);
                    }
                    resetForm.resetFields();
                }
            }
        };

        commentSocket.onclose = function(e){
            connectFeedsSocket();
        };
    }

    useEffect(() => {
        setSaved(isSaved);
    },[isSaved]);

    useEffect(() => {
        set_agent_id(id);
        setAttach(attdata);
    },[attach]);

    useEffect(() => {
        connectFeedsSocket();
        getViewerByAgentReport();
        getRatingByAgentReport();
    }, []);

    return (
        <Fragment>

            {/* Modal Add Trophy */}
            <ModalBase
                key             = {"modal_detail_trophy_"+id}
                size            = "lg"
                show            = {showTrophyForm} 
                title           = "Daftar Trophy"
                center          = {true}
                setShow         = {(par) => { setShowTrophyForm(par)}} 
                unmountOnClose  = {true}
            >
                {
                    trophies != null ? 
                        trophies.map((data) => (
                            <Card>
                                <Row>
                                    <Col md={2} className="d-flex align-items-center justify-content-center">
                                        <Avatar onError={fallbackImage_} img={data.icon} imgHeight='50' imgWidth='50' />
                                    </Col>
                                    <Col md={3} className="mt-1 text-center">
                                        <p className="text-secondary font-weight-bold">Status</p>
                                        <p>{data.name}</p>
                                    </Col>
                                    <Col md={3} className="mt-1 text-center">
                                        <p className="text-secondary font-weight-bold">Points</p>
                                        <p>{data.points}</p>
                                    </Col>
                                    <Col md={4} className="mt-2 text-center">
                                        <Button color="primary w-75" onClick={() => addTrophy(id, data.id)}>
                                            Tambahkan
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        ))
                    :
                        null
                }
            </ModalBase>

            {/* Modal Detail Viewer */}
            <ModalBase
                key             = {"modal_detail_viewer_"+id}
                size            = "lg"
                show            = {showViewForm} 
                title           = "Daftar Penonton"
                center          = {true}
                setShow         = {(par) => { setShowViewForm(par)}} 
                unmountOnClose  = {true}
            >
                <div className='my-1'>
                    {/* List Viewer Pimpinan */}
                    {
                        viewListLeader != null && viewListLeader.length > 10 &&
                        <Row>
                            <Col md={12}>
                                <div className="d-flex justify-content-end">
                                    <Pagination className='d-flex mt-1'>
                                        {
                                            pageViewListLeader == 1 ? 
                                                <PaginationItem
                                                    disabled    = {true}
                                                    className   = "prev-item"
                                                >
                                                    <PaginationLink>
                                                    </PaginationLink>
                                                </PaginationItem>
                                            :
                                                <PaginationItem
                                                    onClick     = {() => {setPageViewListLeader(pageViewListLeader-1)}}
                                                    disabled    = {false}
                                                    className   = "prev-item"
                                                >
                                                    <PaginationLink>
                                                    </PaginationLink>
                                                </PaginationItem>
                                        }
                                        <PaginationItem active>
                                            <PaginationLink>{pageViewListLeader}</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink>/</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink>{totalPageViewListLeader}</PaginationLink>
                                        </PaginationItem>
                                        {
                                            pageViewListLeader < totalPageViewListLeader ?  
                                                <PaginationItem 
                                                    onClick     = {() => {setPageViewListLeader(pageViewListLeader+1)}}
                                                    disabled    = {false}
                                                    className   = "next-item"
                                                >
                                                    <PaginationLink>
                                                    </PaginationLink>
                                                </PaginationItem>
                                            :
                                                <PaginationItem 
                                                    disabled    = {true}
                                                    className   = "next-item"
                                                >
                                                    <PaginationLink>
                                                    </PaginationLink>
                                                </PaginationItem>
                                        }
                                    </Pagination>
                                </div>
                            </Col>
                        </Row>
                    }
                    {
                        viewListLeader != null && viewListLeader.length > 0 &&
                        <Row className="p-1">
                            <Col md={8}>
                                <h5>Pimpinan</h5>
                            </Col>
                            <Col md={4}>
                                <h5>Dilihat</h5>
                            </Col>
                        </Row>
                    }
                    {
                        viewListLeader != null && viewListLeader.length > 0 &&
                        viewListLeader.map((data, index) => (
                            (pageViewListLeader == 1 ? index < 10 : index+1 > pageViewListLeader*10-10 && index < pageViewListLeader*10) &&
                            <Row className="px-1 mb-1">
                                <Col md={1}>
                                    <Avatar img={data.photo} onError={fallbackImage_}/>
                                </Col>
                                <Col md={7} className="d-flex align-items-center">
                                    <span>{data.name}</span>
                                </Col>
                                <Col md={4} className="d-flex align-items-center">
                                    <span>{moment(data.created_at).calendar()}</span>
                                </Col>
                            </Row>
                        ))
                    }

                    {/* List viewer agent */}
                    {
                        viewList != null && viewList.length > 10 &&
                        <Row>
                            <Col md={12}>
                                <div className="d-flex justify-content-end">
                                    <Pagination className='d-flex mt-1'>
                                        {
                                            pageViewList == 1 ? 
                                                <PaginationItem
                                                    disabled    = {true}
                                                    className   = "prev-item"
                                                >
                                                    <PaginationLink>
                                                    </PaginationLink>
                                                </PaginationItem>
                                            :
                                                <PaginationItem
                                                    onClick     = {() => {setPageViewList(pageViewList-1)}}
                                                    disabled    = {false}
                                                    className   = "prev-item"
                                                >
                                                    <PaginationLink>
                                                    </PaginationLink>
                                                </PaginationItem>
                                        }
                                        <PaginationItem active>
                                            <PaginationLink>{pageViewList}</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink>/</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink>{totalPageViewList}</PaginationLink>
                                        </PaginationItem>
                                        {
                                            pageViewList < totalPageViewList ?  
                                                <PaginationItem 
                                                    onClick     = {() => {setPageViewList(pageViewList+1)}}
                                                    disabled    = {false}
                                                    className   = "next-item"
                                                >
                                                    <PaginationLink>
                                                    </PaginationLink>
                                                </PaginationItem>
                                            :
                                                <PaginationItem 
                                                    disabled    = {true}
                                                    className   = "next-item"
                                                >
                                                    <PaginationLink>
                                                    </PaginationLink>
                                                </PaginationItem>
                                        }
                                    </Pagination>
                                </div>
                            </Col>
                        </Row>
                    }
                    {
                        viewList != null && viewList.length > 0 &&
                        <Row className="px-1 pb-1">
                            <Col md={8}>
                                <h5>Agent</h5>
                            </Col>
                            <Col md={4}>
                                <h5>Dilihat</h5>
                            </Col>
                        </Row>
                    }
                    {
                        viewList != null && viewList.length > 0 &&
                        viewList.map((data, index) => (
                            (pageViewList == 1 ? index < 10 : index+1 > pageViewList*10-10 && index < pageViewList*10) &&
                            <Row className="px-1 mb-1">
                                <Col md={1}>
                                    <Avatar img={data.photo} onError={fallbackImage_}/>
                                </Col>
                                <Col md={7} className="d-flex align-items-center">
                                    <span>{data.name}</span>
                                </Col>
                                <Col md={4} className="d-flex align-items-center">
                                    <span>{moment(data.created_at).calendar()}</span>
                                </Col>
                            </Row>
                        ))
                    }

                </div>

            </ModalBase>

            {/* Modal Detail Rating*/}
            <ModalBase
                key             = {"modal_detail_rating"+id}
                size            = "lg"
                show            = {showRatingForm} 
                title           = "Jumlah Rating"
                center          = {true}
                setShow         = {(par) => { setShowRatingForm(par)}} 
                unmount         = {true}
            >
                <div className='mt-2 d-flex justify-content-center'>
                    <Card className="p-2 w-50 d-flex">
                        <div className="d-flex align-items-center justify-content-center">
                            <Rating
                                fullSymbol      = {<Star size={30} fill='#ff9f43' stroke='#ff9f43' />}
                                emptySymbol     = {<Star size={30} fill='#babfc7' stroke='#babfc7' />}
                                initialRating   = {
                                    detailRating != null && detailRating.ratings_detail.length === 5 ?
                                        ((
                                            (detailRating.ratings_detail[0].count*5) + 
                                            (detailRating.ratings_detail[1].count*4) + 
                                            (detailRating.ratings_detail[2].count*3) + 
                                            (detailRating.ratings_detail[3].count*2) + 
                                            (detailRating.ratings_detail[4].count*1)
                                        ) / 
                                        (
                                            (detailRating.ratings_detail[0].count+ 
                                            detailRating.ratings_detail[1].count+
                                            detailRating.ratings_detail[2].count+
                                            detailRating.ratings_detail[3].count+
                                            detailRating.ratings_detail[4].count)
                                        )).toFixed(1)
                                    :
                                        0
                                }
                                readonly        = {true}
                            /> 
                            <h4 className="ml-1" style={{marginTop:'6px'}}> 
                                {
                                    detailRating != null && detailRating.ratings_detail.length === 5 ?
                                        ((
                                            (detailRating.ratings_detail[0].count*5) + 
                                            (detailRating.ratings_detail[1].count*4) + 
                                            (detailRating.ratings_detail[2].count*3) + 
                                            (detailRating.ratings_detail[3].count*2) + 
                                            (detailRating.ratings_detail[4].count*1)
                                        ) / 
                                        (
                                            (detailRating.ratings_detail[0].count+ 
                                            detailRating.ratings_detail[1].count+
                                            detailRating.ratings_detail[2].count+
                                            detailRating.ratings_detail[3].count+
                                            detailRating.ratings_detail[4].count)
                                        )).toFixed(1)
                                    :
                                        0
                                }
                                &nbsp;dari 5
                            </h4>
                        </div>
                    </Card>

                </div>
                <div className="d-flex justify-content-center">
                    {detailRating != null ? detailRating.person_total : 0} Orang memberikan rating
                </div>
                <div className="text-center px-5 py-2">
                    <Row className="my-1">
                        <Col md={3}>
                            5 Bintang
                        </Col>
                        <Col md={6}>
                            <Rating
                                fullSymbol      = {<Star size={30} fill='#ff9f43' stroke='#ff9f43' />}
                                emptySymbol     = {<Star size={30} fill='#babfc7' stroke='#babfc7' />}
                                initialRating   = {5}
                                readonly        = {true}
                            /> 
                        </Col>
                        <Col md={3}>
                            {
                                detailRating != null && detailRating.ratings_detail.length > 0 ? 
                                    detailRating.ratings_detail.filter((data) => data.rating === 5).length > 0 ?
                                        detailRating.ratings_detail.filter((data) => (data.rating === 5))[0].count
                                    :
                                        0
                                : 
                                    0
                            }
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col md={3}>
                            4 Bintang
                        </Col>
                        <Col md={6}>
                            <Rating
                                fullSymbol      = {<Star size={30} fill='#ff9f43' stroke='#ff9f43' />}
                                emptySymbol     = {<Star size={30} fill='#babfc7' stroke='#babfc7' />}
                                initialRating   = {4}
                                readonly        = {true}
                            /> 
                        </Col>
                        <Col md={3}>
                            {
                                detailRating != null && detailRating.ratings_detail.length > 0 ? 
                                    detailRating.ratings_detail.filter((data) => data.rating === 4).length > 0 ?
                                        detailRating.ratings_detail.filter((data) => (data.rating === 4))[0].count
                                    :
                                        0
                                : 
                                    0
                            }
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col md={3}>
                            3 Bintang
                        </Col>
                        <Col md={6}>
                            <Rating
                                fullSymbol      = {<Star size={30} fill='#ff9f43' stroke='#ff9f43' />}
                                emptySymbol     = {<Star size={30} fill='#babfc7' stroke='#babfc7' />}
                                initialRating   = {3}
                                readonly        = {true}
                            /> 
                        </Col>
                        <Col md={3}>
                            {
                                detailRating != null && detailRating.ratings_detail.length > 0 ? 
                                    detailRating.ratings_detail.filter((data) => data.rating === 3).length > 0 ?
                                        detailRating.ratings_detail.filter((data) => (data.rating === 3))[0].count
                                    :
                                        0
                                : 
                                    0
                            }
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col md={3}>
                            2 Bintang
                        </Col>
                        <Col md={6}>
                            <Rating
                                fullSymbol      = {<Star size={30} fill='#ff9f43' stroke='#ff9f43' />}
                                emptySymbol     = {<Star size={30} fill='#babfc7' stroke='#babfc7' />}
                                initialRating   = {2}
                                readonly        = {true}
                            /> 
                        </Col>
                        <Col md={3}>
                            {
                                detailRating != null && detailRating.ratings_detail.length > 0 ? 
                                    detailRating.ratings_detail.filter((data) => data.rating === 2).length > 0 ?
                                        detailRating.ratings_detail.filter((data) => (data.rating === 2))[0].count
                                    :
                                        0
                                : 
                                    0
                            }
                        </Col>
                    </Row>
                    <Row className="my-1">
                        <Col md={3}>
                            1 Bintang
                        </Col>
                        <Col md={6}>
                            <Rating
                                fullSymbol      = {<Star size={30} fill='#ff9f43' stroke='#ff9f43' />}
                                emptySymbol     = {<Star size={30} fill='#babfc7' stroke='#babfc7' />}
                                initialRating   = {1}
                                readonly        = {true}
                            /> 
                        </Col>
                        <Col md={3}>
                            {
                                detailRating != null && detailRating.ratings_detail.length > 0 ? 
                                    detailRating.ratings_detail.filter((data) => data.rating === 1).length > 0 ?
                                        detailRating.ratings_detail.filter((data) => (data.rating === 1))[0].count
                                    :
                                        0
                                : 
                                    0
                            }
                        </Col>
                    </Row>
                </div>
            </ModalBase>
            
            {/* Modal Edit Hashtag */}
            <ModalBase
                key             = {"modal_detail_hashtag_"+id}
                size            = "md"
                show            = {showHashtagForm} 
                title           = "Jumlah Rating"
                center          = {true}
                setShow         = {(par) => { setShowHashtagForm(par)}}
                unmount         = {true}
            >
                <Form onSubmit={handleSubmit(handleSubmit_)}>
                    <FormGroup>
                        <Label>Hashtag</Label>
                        <Input
                            name        = "hashtag"  
                            invalid     = {'hashtag' in errors}
                            innerRef    = {register({required: true})}
                            className   = 'form-control w-100'
                            placeholder = "Hashtag..."
                            defaultValue= {hashtag != undefined ? hashtag.map((data) => (data.tag)).slice(',').join(' ') : null}
                        />
                        <Label>Pemisah untuk hashtag silahkan menggunakan spasi.</Label>
                    </FormGroup>
                    <FormGroup className="d-flex justify-content-end">
                        <Button 
                            size        = "md" 
                            type        = "submit"
                            color       = "primary" 
                        >
                            Simpan
                        </Button>
                    </FormGroup>

                </Form>
            </ModalBase>

            <Card 
                ref          = {bodyCardRef} 
                style        = {{ overflow: 'auto', height: 'auto'}}
                onMouseEnter = {() => {handleViewer();}}
            >
                <CardBody>
                    {/* Header */}
                    <WidgetNewsCardHeader
                        title                   = {title} 
                        avatar                  = {imgAvatar} 
                        division                = {division} 
                        subTitle                = {`${subTitle} - ${location}`} 
                        defaultNews             = {dropdownWidget} 
                        selectedCheck           = {selectedCheck}
                        cancelFromSelected      = {handleCancelSelectedNews}
                    />

                    {/* Title */}
                    <FormGroup>
                        <h4>
                            {
                                feedsTitle == undefined || feedsTitle == null ? null : parse(feedsTitle)
                            }
                        </h4>
                    </FormGroup>

                    {/* Content */}
                    <FormGroup>
                        {attach == null ? null : attach.img}
                        {attach == null ? null : attach.video}
                        {attach == null ? null : attach.audio}

                        {
                            "method" in props ?
                                <Fragment>
                                    <p className="text-justify mt-1 mb-2">
                                        {
                                            parse(
                                                `
                                                    ${dataNews.when_}, telah terjadi ${dataNews.what}, 
                                                    bertempat di ${dataNews.where} ${dataNews.who}. 
                                                    Kejadian ini terjadi karena ${dataNews.why}, ${dataNews.how}
                                                `
                                            )
                                        }
                                        {dataNews.when_}, telah terjadi {dataNews.what}, 
                                        bertempat di {dataNews.where} {dataNews.who}. 
                                        Kejadian ini terjadi karena {dataNews.why}, {dataNews.how}
                                    </p>
                                </Fragment>
                            :
                                "detail" in props ?
                                    <p className='text-justify mt-1'>
                                        {parse(bodyText)}
                                    </p>
                                :
                                    <p className="text-justify mt-1 mb-2">
                                        {
                                            countWord(bodyText) > 100 ?
                                                <>
                                                    {parse(shortenWord(bodyText))}
                                                    &nbsp;
                                                    <Link to={"/beranda/detail/"+props.id}>
                                                        <span style={{ color: 'inherit', whiteSpace: 'pre-line'}}>
                                                            Lihat Detail ...
                                                        </span>
                                                    </Link>
                                                </>
                                            :    
                                                parse(bodyText)
                                        }
                                    </p>
                        }

                        {
                            time_update != publish_date &&
                            `Tanggal Publikasi : ${moment(publish_date).format('DD MMMM YYYY')}`
                        }

                        {attach == null ? null : attach.files}
                        {attach == null ? null : attach.links}
                        
                        <div style={{wordWrap: 'break-word'}}>
                            {
                                hashtag != undefined ? 
                                    hashtag.map((data) => (
                                        <a href={`/advanced-search?keyword=${data.tag.replace('#',"")}`}><h6 className="d-inline text-primary mr-1">{parse(data.tag)}</h6></a>
                                    ))
                                :
                                    null
                            }
                        </div>


                    </FormGroup>
                    
                    {
                        archived || status < 2 ? (
                            <>
                                {
                                    !archived && status == 0 ?
                                        <>
                                            <hr/>
                                            <FormGroup className="d-flex align-items-center justify-content-end">
                                                Menunggu Persetujuan Verifikator Daerah
                                            </FormGroup>
                                        </>
                                    :
                                        null
                                }
                                { 
                                    !archived && status == 1 ?
                                        <>
                                            <hr/>
                                            <FormGroup className="d-flex align-items-center justify-content-end">
                                                Menunggu Persetujuan Verifikator Pusat
                                            </FormGroup>
                                        </>
                                    :
                                        null
                                }
                                {
                                    archived ? 
                                        archived === 1 ?
                                            <>
                                                <hr/>
                                                <FormGroup className="d-flex align-items-center justify-content-end">
                                                    <Archive size={16} style={{marginRight: '5px'}}/>&nbsp;Berita Diarsipkan Verifikator Daerah
                                                </FormGroup>
                                            </>
                                        :
                                            archived === 2 ?
                                                <>
                                                    <hr/>
                                                    <FormGroup className="d-flex align-items-center justify-content-end">
                                                        <Archive size={16} style={{marginRight: '5px'}}/>&nbsp;Berita Diarsipkan Verifikator Pusat
                                                    </FormGroup>
                                                </>
                                            :
                                                <>
                                                    <hr/>
                                                    <FormGroup className="d-flex align-items-center justify-content-end">
                                                        <Archive size={16} style={{marginRight: '5px'}}/>&nbsp;Berita Diarsipkan Analis Per. Dir
                                                    </FormGroup>
                                                </>
                                    :
                                        null
                                }
                            </>
                        ) : 
                            // Icon
                            <WidgetCardNewsBottom
                                id              = {id}
                                key             = {`footer-widget-${id}`}
                                saved           = {savedBerita}
                                trophy          = {trophy}
                                ratings         = {ratings}
                                newsType        = {newsType}
                                viewList        = {viewList}
                                viewListLeader  = {viewListLeader}
                                viewListCombine = {viewListCombine}
                                viewCounts      = {viewCount}
                                commentCounts   = {commentCount}
                                ratings_check   = {ratings_check}
                                setShowViewForm = {setShowViewForm}

                                //Role
                                roleLike        = {roleLike}
                                roleDislike     = {roleDislike}
                                roleComment     = {roleComment}
                                roleViewer      = {roleViewer}
                            />
                    }
                    
                    {
                        "commentHidden" in props ?
                            null 
                        :
                            archived || status < 2? null : (
                                roleComment ?
                                    <>
                                        <hr/>
                                        {/* //List Comment  */}
                                        <ContainerFluid>
                                            <CommentAnalogs/>
                                        </ContainerFluid>

                                        {/* Write Comment */}
                                        <ContainerFluid>
                                            <AddCommentWidget
                                                loading     = {commentLoading}
                                                textProps   = {commentTextHandlers}
                                                childText   = "Kirim"
                                                buttonProps = {commentButtonHandlers}
                                            />
                                        </ContainerFluid>
                                    </>
                                :
                                    null
                            )
                    }
                </CardBody>
            </Card>
        </Fragment>
    );
};