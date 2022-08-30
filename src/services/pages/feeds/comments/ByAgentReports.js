import FetchServices from "../../../core/Axios"


const GetCommentByAgents = ({agent_report,page})=>{
    
    const path = `feeds/comment/by-agent-report?page=${page==undefined?1:page}`
    return new FetchServices().post(path,{agent_report_id:agent_report.id})
}

export default GetCommentByAgents