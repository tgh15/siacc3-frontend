
import moment                   from 'moment'
import Comments                 from '../../../../services/pages/feeds/comments'
import feedsAgentReportAPI      from '../../../../services/pages/feeds/agent-reports'

//Assets
import defaultAvatar            from '@src/assets/images/portrait/small/150x150.png'

//Services
import getAttachments           from '../../../../services/pages/feeds/agent-reports/getAttachments';

//Widgets 
import Avatar                   from '../../avatar';
import CardUrl                  from '../../card-url/CardUrl';
import CardFile                 from '../../card-file/CardFile';
import CarouselAttachment       from '../../card-carousel';
import CardVideo                from '../../card-video';
import CardAudio from '../../card-audio';
import CustomToast from '../../custom-toast';

//Default Value
moment.locale("id");

const FeedsModel = {
    title               : "Arif Sona",
    newsType            : "nasional",
    location            : "MCDonald Pettarani",
    division            : "KELEMBAGAAN SISTEM INFORMASI",            
    subTitle            : "Hari ini Pukul 09:30",
    bodyText            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    comments            : [],
    imgAvatar           : defaultAvatar,
    likeCount           : 15,
    viewCount           : 25,
    dislikeCount        : 10,
}

const approveModel = {
    id                  : 0,
    text                : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    title               : "Korupsi",
    avatar              : defaultAvatar,
    account             : "Fajar",
    location            : "Koi Teppanyaki ITC BSD, Bumi Serpong Damai, Tangerang Selatan, Banten 15323, Indonesia",
    division            : "Sistem Informasi",
    timeUpdate          : "Kemarin pukul 10:00",
}

const commentModel = {
    id                  : 1,
    times               : "Kemarin Pukul 12:00 WIB",
    comments            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imgAvatar           : defaultAvatar,
    likeCounts          : 14,
    dislikeCounts       : 13,
    commentatorName     : "John Doe",
}

export default [
    {
        
        title           : "Arif Sona",
        newsType        : "nasional",
        location        : "MCDonald Pettarani",
        bodyText        : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        division        : "KELEMBAGAAN SISTEM INFORMASI",
        subTitle        : "Hari ini Pukul 09:30",
        imgAvatar       :  defaultAvatar,
        likeCount       : 15,
        viewCount       : 25,
        dislikeCount    : 10,
        comments        : [
                                {
                                    id:1,
                                    commentatorName:"John Doe",
                                    times:"Kemarin Pukul 12:00 WIB",
                                    comments:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                    likeCounts:14,
                                    dislikeCounts:13,
                                    imgAvatar:defaultAvatar,
                                    replies:[
                                        {
                                            id:1,
                                            commentatorName:"John Blur",
                                            times:"Kemarin Pukul 12:00 WIB",
                                            comments:"Lipsum dolor",
                                            imgAvatar:defaultAvatar,
                                        }
                                    ]
                                }
                            
                        ],
    },
    {
        title           : "Arif Abdullah",
        isSaved         : true,
        newsType        : "lokal",
        location        : "STMIK Profesional, Pettarani",
        division        : "KELEMBAGAAN SISTEM INFORMASI",
        subTitle        : "Hari ini Pukul 09:30",
        bodyText        : "lorem ipsum dolor",
        textFull        : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        likeCount       : 15,
        viewCount       : 25,
        imgAvatar       : defaultAvatar,
        dislikeCount    : 10,
        comments        : [
                                {
                                    imgAvatar: defaultAvatar,
                                    id:1,
                                    commentatorName:"John Doe",
                                    times:"Kemarin Pukul 12:00 WIB",
                                    comments:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                    likeCounts:14,
                                    dislikeCounts:13,
                                    replies:[
                                        {
                                            imgAvatar: defaultAvatar,
                                            id:1,
                                            commentatorName:"John Blur",
                                            times:"Kemarin Pukul 12:00 WIB",
                                            comments:"Lipsum dolor"
                            
                                        }
                                    ]
                                }
                            
                        ],
    },
]

export const getReplies = (com) => {
    return new Promise((accept)=>{

        let comment_arr = [...com];

        comment_arr.map(async(value)=>{
            const replies           = await Comments.getReplies(value.id,value.agent_report_id);
            const {comment:reply}   = replies.data;

            if(Array.isArray(reply)){
                let reps        = compareComment(reply);
                let vcomment    = comment_arr;

                comment_arr.map((v,i)=>{
                    if(v.id === value.id){
                        vcomment[i].replies = reps
                    }
                })
                comment_arr = vcomment
                
            }
        })
        accept(comment_arr)
    })   
    
}
export const compareComment = (last_comment,no_replies) => {

    let comments    = last_comment.map( val => {
        const { photo }             = val;
        const { 
            agent_report_id,
            name,
            comment,
            id:comment_id,
            comment_likes_count,
            created_at:time_update} = val;
            
        const momen                 = moment(time_update).calendar();
        let xcoment                 = {};

        if(no_replies == undefined){
            xcoment = {
                id                  : comment_id,
                times               : momen,
                replies             : [],
                comments            : comment,
                imgAvatar           : photo==""?defaultAvatar:photo,
                likeCounts          : comment_likes_count,
                agent_report_id     : agent_report_id,
                commentatorName     : name,
            }
        }else{
            xcoment = {
                id                  : comment_id,
                comments            : comment,
                times               : momen,
                imgAvatar           : photo == "" ? defaultAvatar : photo,
                likeCounts          : comment_likes_count,
                parent_id           : no_replies.comment_pid,
                agent_report_id     : agent_report_id,
                commentatorName     : name,
            }
        }
        return xcoment
    })
    return comments
}

export const newsByStatus = (data) => {
    let prom = new Promise((resolve,reject) => {

        // const formData = {
        //     status : data
        // };

        let params = {};

        params.approvement = 'approvement';
        params.new         = true;
        params.sort_by     = 'updated_at';
        params.sort        = 'desc';
        params.page        = 1;

        feedsAgentReportAPI.getFeeds(params).then(
            response => {
                if(!response.is_error){
                    let NmapData                         = [];
                    const { data : {result:data} } = response;
    
                    if(Array.isArray(data)){
                        data.map(valueData=>{
                            const {
                                id              : id,
                                who             : who,
                                why             : why,
                                how             : how,
                                when_           : when,
                                status,
                                what,
                                title,
                                where           : where,
                                created_at      : time_update,
                                location_name   : location,
                                employee        : { 
                                    name        : account,
                                    position    : wo1,
                                    workunit    : wo2,
                                    photo       : img
                                },
                                
                            } = valueData;
            
                            let model = {
                                ...approveModel,
                            };
    
                            model.id            = id;
                            model.account       = account
                            model.division      = `${wo1} ${wo2}`
                            model.location      = location
                            model.title         = title
                            model.status        = status
                            model.timeUpdate    = moment(time_update).calendar();
                            model.avatar        = (img) || `https://ui-avatars.com/api/?name=${ account ? account : "UN"}&background=4e73df&color=fff&bold=true`
                            model.text          = `${when}, telah terjadi ${what}, bertempat di ${where} ${who}. Kejadian ini terjadi karena ${why}, ${how}`
                            NmapData.push(model)
                        })
                    } 
                    resolve(NmapData);
                }
        }).catch(err=>{
            reject(err)
        })
    
    })
    return prom;     
}

export const getNewsByCategories = ({handler,callback,category})=>{
    let arrComment = [];

    feedsAgentReportAPI.getAgentReportByCategory({category_id:category, 
    onSuccess:(data) => {
        let agent_array = [];
        const agent     = data.agent_report;

        if(Array.isArray(agent)){
            agent.map(agentReport => {
                const {
                    id              : agent_report_id,
                    employee        : {
                        name        : title,
                        position    : division1,
                        workunit    : division2
                    },
                    like_count      : likeCount,
                    title           : feedsTitle,
                    dislike_count   : dislikeCount,
                    location_name   : location,
                    created_at      : time_update,
                    viewer_count    : viewCount,
                    kind            : newsType,
                    when_           : when,
                    where           : where,
                    who             : who,
                    why             : why,
                    how             : how,
                    last_comment,
                    comment_count,
                } = agentReport;
                
                const momen     = moment(time_update).calendar();
                let feed        = {...FeedsModel};

                if(Array.isArray(last_comment)){
                    arrComment  = compareComment(last_comment);
                    getReplies(arrComment).then(
                        r => {
                            arrComment = r;

                            if(newsType !== 0){
                                let bodyText=`${when}, bertempat di ${where} ${who} ${why} ${how}`;
                                
                                feed = {
                                    id              : agent_report_id,
                                    title           : title,
                                    bodyText        : bodyText,
                                    comments        : [],
                                    division        : `${division1} ${division2}`,
                                    subTitle        : momen,
                                    location        : location,
                                    newsType        : newsType==2?"nasional":"lokal",
                                    comments        : arrComment,
                                    likeCount       : likeCount,
                                    imgAvatar       : defaultAvatar,
                                    viewCount       : viewCount,
                                    feedsTitle      : feedsTitle,
                                    nodropdown      : null,
                                    dislikeCount    : dislikeCount,
                                    commentsCount   : comment_count,
                                }
                            }else{
                                feed = null;
                            }

                            if(feed != null){
                                agent_array.push(feed)
                            }
                        }
                    )
                }else{
                    if(newsType !== 0){

                        let bodyText = `${when}, bertempat di ${where} ${who} ${why} ${how}`;

                        feed = {
                            id              : agent_report_id,
                            title           : title,
                            bodyText        : bodyText,
                            comments        : [],
                            division        : `${division1} ${division2}`,
                            subTitle        : momen,
                            location        : location,
                            newsType        : newsType==2?"nasional": "lokal",
                            comments        : arrComment,
                            likeCount       : likeCount,
                            imgAvatar       : defaultAvatar,
                            viewCount       : viewCount,
                            feedsTitle      : feedsTitle,
                            nodropdown      : null,
                            dislikeCount    : dislikeCount,
                            commentsCount   : comment_count,
                        }
                    }else{
                        feed = null;
                    }

                    if(feed != null){
                        agent_array.push(feed)
                    }
                }
                
            })
        }
        
        callback(null);
        handler(agent_array);
    },
    onFail : (err) => {console.log("OK",err)} })
}

export const getComments = (agent_report_id,page) => {
    return Comments.byAgent({agent_report:agent_report_id,page:page});
}

export const getAllNews = ({handler,callback})=>{
    let arrComment      = [];
    feedsAgentReportAPI.getAgentReport( {onResponse:({data} )=>{
        let agent_array = [];

        const agent     = data.agent_report;
        if(Array.isArray(agent)){
            agent.map(async(agentReport) => {

                const {
                    id,
                    who             : who,
                    why             : why,
                    how             : how,
                    kind            : newsType,
                    title           : feedsTitle,
                    when_           : when,
                    where           : where,
                    employee        : {name:title,position:division1,workunit:division2},
                    like_count      : likeCount,
                    created_at      : time_update,
                    last_comment,
                    viewer_count    : viewCount,
                    dislike_count   : dislikeCount,
                    location_name   : location,
                    comment_count,
                } = agentReport;

                let feed        = {...FeedsModel};
                const momen     = moment(time_update).calendar();

                if(Array.isArray(last_comment)){
                    arrComment  = await getComments(id,1);
                    arrComment  = compareComment(arrComment);

                    getReplies(arrComment).then(arrComment=>{    
                        if(newsType!==0){
                            
                            let bodyText = `${when}, bertempat di ${where} ${who} ${why} ${how}`;
            
                            feed = {
                                id              : id,
                                title           : title,
                                bodyText        : bodyText,
                                comments        : [],
                                division        : `${division1} ${division2}`,
                                subTitle        : momen,
                                location        : location,
                                newsType        : newsType == 2 ? "nasional" : "lokal",
                                comments        : arrComment,
                                likeCount       : likeCount,
                                imgAvatar       : defaultAvatar,
                                viewCount       : viewCount,
                                feedsTitle      : feedsTitle,
                                nodropdown      : null,
                                dislikeCount    : dislikeCount,
                                commentsCount   : comment_count,
                            }
                        }else{
                            feed = null
                        }

                        if(feed != null){
                            agent_array.push(feed)
                        }
                    })
                }else{
                    if(newsType !== 0){
        
                        let bodyText = `${when}, bertempat di ${where} ${who} ${why} ${how}`;
        
                        feed = {
                            id              : id,
                            title           :  title,
                            bodyText        : bodyText,
                            comments        : [],
                            division        : `$ {division1} ${division2}`,
                            subTitle        : momen,
                            location        : location,
                            newsType        : newsType==2?"nasional":"lokal",
                            comments        : arrComment,
                            likeCount       : likeCount,
                            imgAvatar       : defaultAvatar,
                            viewCount       : viewCount,
                            feedsTitle      : feedsTitle,
                            nodropdown      : null,
                            dislikeCount    : dislikeCount,
                            commentsCount   : comment_count,
                        }
                    }else{
                        feed=null
                    }

                    if(feed != null){
                        agent_array.push(feed)
                    }
                }
            })
        }
        
        handler(agent_array);
        callback(null);

    },onFail:(err)=>{console.log("ERR-REQUEST",err)}})
}

export const processAgentReports = async(agentReports, commentsPage) => {
    if(Array.isArray(agentReports)){
        let report = await Promise.all(agentReports.map(async(agentReport) => {
            const {
                id              : ar_id,
                employee        : {
                    name                : title,
                    photo               : work_photo,
                    workunit            : division2,
                    workunit_id         : division_id,
                    workunit_level      : division_level,
                    workunit_level_id   : division_level_id
                },
                title           : feedsTitle,
                location_name   : location,
                created_at      : time_update,
                updated_at      : publish_date,
                publish_type    : publish_type,
                viewer_count    : viewCount,
                kind            : newsType,
                status          : status,
                when_           : when,
                hashtag         : hashtag,
                where           : where,
                who             : who,
                why             : why,
                how             : how,
                given_rating    : ratings,
                ratings_check   : ratings_check,
                selected_check  : selected_check,
                self_selected_check : self_selected_check,
                trophies        : trophies,
                trending_sequence : trending,
                trending_time   : trending_time,
                is_archive,
                what,
                comment_count,
                last_comment,
                stored_check,
            } = agentReport;

            let feeds      = {...FeedsModel};
            const momen    = moment(time_update).format('DD MMMM YYYY, HH:mm');
            const time_trending = trending_time != "" ? moment(trending_time).format('DD MMMM YYYY, HH:mm') : null;
            let comment    = [] ;
            let comments   = [];

            //get comments and replies
            if(comment_count > 0){
                const result = await getComments(agentReport, commentsPage == undefined ? 1 : commentsPage);
                comment  = result.data.comment;
                comments = compareComment(comment) ;
                comments = await getReplies(comments);
            };

            // let stateNews = newsdata !== 0;

            //get attachments 
            const attachmentsData = await getAttachments(ar_id);
            let attachments = [];

            if(attachmentsData.data != null) {
                let images          = [];
                let links           = [];
                let audio           = [];
                let video           = [];
                let attachmentFiles = [];

                attachmentsData.data.map(values => {
                    const {type, name, id} = values;

                    if(type === "Image"){
                        images.push(values);
                    }else if(type === "Link"){
                        links.push(values);
                    }else if(type === "Audio"){
                        audio.push(values);
                    }else if(type === "Video"){
                        video.push(values);
                    }else{
                        attachmentFiles.push(values);
                    }
                });

                const carousel     = images.length > 0 ? 
                                        <CarouselAttachment 
                                            style  = {{marginTop:"1em",marginBottom:"1em"}}
                                            images = {images} 
                                        /> 
                                    : 
                                        null;
                const linkControl  = links.length > 0 ? <CardUrl data={links}/> : null;
                const fileControl  = attachmentFiles.length > 0 ? <CardFile item={attachmentFiles}/> : null;
                const videoControl = video.length > 0 ? <CardVideo item={video}/> : null;
                const audioControl = audio.length > 0 ? <CardAudio item={audio}/> : null;
                
                attachments = {
                    img   : carousel,
                    links : linkControl,
                    files : fileControl,
                    video : videoControl,
                    audio : audioControl,
                }
            };

            let bodyText     = `${when}, telah terjadi ${what}, bertempat di ${where} ${who}. Kejadian ini terjadi karena ${why}, ${how}`
            // const userAvatar = (work_photo) || `https://ui-avatars.com/api/?name=${ title ? title : "AN"}&background=4e73df&color=fff&bold=true`
            // const avatars    = <Avatar img={userAvatar} style={{marginRight:"8px"}}/>
            feeds = {
                id              : ar_id,
                title           : title,
                status          : status,
                hashtag         : hashtag,
                archived        : is_archive,
                bodyText        : bodyText,
                division        : `${division2}`,
                division_id     : division_id,
                division_level  : division_level,
                division_level_id : division_level_id,
                subTitle        : momen,
                location        : location,
                kind            : newsType,
                newsType        : newsType == 2 ? "nasional" : "lokal",
                publish_date    : publish_date,
                time_update     : time_update,
                imgAvatar       : "avatars",
                viewCount       : viewCount,
                nodropdown      : null,
                feedsTitle      : feedsTitle,
                publish_type    : publish_type,
                comments        : comments,
                ratings         : ratings,
                isSaved         : stored_check == 1,
                trophies        : trophies,
                trending        : trending,
                time_trending   : time_trending,
                last_comment    : last_comment,
                commentsCount   : comment_count,
                ratings_check   : ratings_check,
                attachmentsData : attachments,
                selected_check  : selected_check,
                self_selected_check : self_selected_check
            }
            return feeds;
        }))
        return report;
    }
};

export const getAgentReportFilter = async(page,filter) => {
    let promise = new Promise(async (resolve,reject) => {
        let dataFeeds;

        console.log('filter disini 2')
    
        //if normal category
        dataFeeds = feedsAgentReportAPI.filterAgentReport(filter,page).then(async(response) => {
            console.log(response, 'response')
            if (response.agentReport === null ){
                resolve({results: [], response:response.data})
            }else{   
                const {data}    = response;
                dataFeeds       = processAgentReports(data.agent_report).then(categori => {
                    dataFeeds   = categori;
                    console.log(dataFeeds, 'filter data');
                    resolve({results:dataFeeds,response:data});
                })
            }
        }).catch(e => {
            reject(e);
        })
    })
    return promise;
}

export const getAgentReportLists = async (page=1,category) => {
    let promise =  new Promise(async (resolve,reject)=>{
        let dataFeeds;

        //if all category
        if(category == null || category == undefined){
            feedsAgentReportAPI.getAgentReport(page == null ? 1 : page).then(async(response) => {
                const {data} = response;

                dataFeeds = await processAgentReports(data.agent_report);

                resolve({results:dataFeeds,response:data});
            }).catch(e => {
                reject(e);
            })
        }else if(category === 'selected_news'){
            const formData = {
                action : "get_all"
            }

            feedsAgentReportAPI.getAgentReportBySelected(formData, page == null ? 1 : page).then(async(response) => {
                const {data} = response;

                dataFeeds = await processAgentReports(data.agent_report);

                resolve({results:dataFeeds,response:data});
            }).catch(e => {
                reject(e);
            })

        }else{

            const formData = {
                categories : [category]
            }

            //jika categori biasa
            dataFeeds = feedsAgentReportAPI.getAgentReportByCategory(formData, page == null ? 1 : page).then(async(response) => {
                const {data} = response;
                
                // dataFeeds = processAgentReports(data.agent_report).then(categori => {
                //     dataFeeds = categori;
                //     resolve({results:dataFeeds,response:response});
                // })

                dataFeeds = await processAgentReports(data.agent_report);
                resolve({results:dataFeeds,response:data});
            }).catch(e => {
                reject(e);
            })
        }
    })
    return promise;
};


