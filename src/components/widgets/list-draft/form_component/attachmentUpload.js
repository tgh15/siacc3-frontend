import feedsAgentReportAPI from "../../../../services/pages/feeds/agent-reports";

export default function attachmentUpload (type, id ,attachments){
    let data = new FormData()

    if(type == 'draft'){
        data.append('draft_id', id);
    }else{
        data.append("agent_report_id",id);
    }

    if(Array.isArray(attachments)){
        attachments.map(attachValue=>{
            if(attachValue.type == "Image" || attachValue.type == "Document" || attachValue.type=="Video" || attachValue.type == "Audio"){
                data.append("attachment[]",attachValue.data)
            }else{
                data.append("link[]",attachValue.data)
            }

        })
    }
    return feedsAgentReportAPI.uploadAgentReportAttachment(data)
    // return AgentReportApi.share.byAttachment(data)
}
export const setMediaData = (type,data,text)=>{
    return {
        type:type,
        data:data,
        text:text,
    }

}