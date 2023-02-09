import { feedsURL }                                       from "..";
import { Get, Post, PostUpload, Delete }                  from "../../../core/request";

//All
const getFeeds                    = (params)                    => Get(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}`, params);
const getAgentReport              = (page)                      => page == undefined ? Get(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsAgentReportByRole}`) : Get(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsAgentReportByRole}?page=${page}`);
const createAgentReport           = (data)                      => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.create}`, data);
const detailAgentReport           = (data)                      => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.detail}`, data);
const filterAgentReport           = (data, page)                => page == undefined ? Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.filter}`, data) : Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.filter}?page=${page}`, data);

//Attachment
const getAgentReportAttachment    = (data)                      => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsGetAttachment}`, data);
const uploadAgentReportAttachment = (data, onUploadProgress)    => PostUpload(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsUploadAttachment}`, data, onUploadProgress);
const deleteAgentReportAttachment = (data)                      => Delete(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsDeleteAttachment}`, data);

//Get By
const getAgentReportByStatus      = (data, page, search)        => page == undefined && search == undefined ?
                                                                        Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsAgentReportByStatus}`, data)
                                                                    :
                                                                        page != undefined && search == undefined ? 
                                                                            Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsAgentReportByStatus}?page=${page}`, data) 
                                                                        :
                                                                            Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsAgentReportByStatus}?page=${page}&keyword=${search}`, data);
const getAgentReportByCategory    = (data, page)                => page == undefined ? Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsGetByCategory}`, data) : Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsGetByCategory}?page=${page}`, data);
const getAgentReportBySelected    = (data, page)                => page == undefined ? Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsGetBySelected}`, data) : Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsGetBySelected}?page=${page}`, data);
const getAgentReportByWorkunit    = (data, param)               => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsByWorkunit}`, data, param); 


//Share Agent Report
const shareAgentReportByWorkunit  = (data)                      => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsShareByWorkunit}`, data);
const shareAgentReportByPosition  = (data)                      => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsShareByPosition}`, data);

//Stored Agent Report
const changeAgentReportToStored   = (data)                      => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsChangeToStored}`, data);
const deleteAgentReportFromStored = (data)                      => Delete(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsDeleteFromStored}`,data);

//Archive
const getAgentReportByArchieve    = (data, page, search)        => page == undefined && search == undefined ?
                                                                        Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsByArchieve}`, data)
                                                                    :
                                                                        page != undefined && search == undefined ? 
                                                                            Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsByArchieve}?page=${page}`, data)
                                                                        :
                                                                            Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsByArchieve}?page=${page}&keyword=${search}`, data)
const changeAgentReportToArchive  = (data)                      => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsChangeToArchive}`, data);

//Selected Agent Report
const changeAgentReportToSelected   = (data)                    => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsChangeToSelected}`, data);
const cancelAgentReportFromSelected = (data)                    => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsAgentReport}/${feedsURL.feedsCancelFromSelected}`, data);

//Trophy
const addTrophy                     = (data)                    => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsTrophy}/${feedsURL.create}`, data);

//Viewer
const getViewerByAgentReport        = (data)                    => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsViewer}/${feedsURL.feedsByAgentReport}`, data);


//Hashtag
const changeHashtagByAgentReport    = (data)                    => Post(`${feedsURL.feedsPrefix}/${feedsURL.hashtagPrefix}/${feedsURL.feedsByAgentReport}?action=update`, data);

const feedsAgentReportAPI = {
    // All
    getFeeds,
    getAgentReport,
    createAgentReport,
    detailAgentReport,
    filterAgentReport,

    // Get
    getAgentReportByStatus,
    getAgentReportBySelected,
    getAgentReportByCategory,
    getAgentReportByWorkunit,

    // Share    
    shareAgentReportByWorkunit,
    shareAgentReportByPosition,

    // Attachment
    getAgentReportAttachment,
    uploadAgentReportAttachment,
    deleteAgentReportAttachment,

    // Stored
    changeAgentReportToStored,
    deleteAgentReportFromStored,

    // Archive
    getAgentReportByArchieve,
    changeAgentReportToArchive,

    // Selected
    changeAgentReportToSelected,
    cancelAgentReportFromSelected,

    //Trophy
    addTrophy,

    //Viewer,
    getViewerByAgentReport,

    //Hashtag
    changeHashtagByAgentReport
};

export default feedsAgentReportAPI;