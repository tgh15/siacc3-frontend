import FetchServices from "../../../core/Axios"

export default function GetReplies(parent_id,agent_report_id){
    const param = {
        parent_id:parent_id,
        agent_report_id:agent_report_id
    }
    const path ="feeds/comment/by-parent"

    return new FetchServices().post(path,param)
}