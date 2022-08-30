import FetchServices from "../../../core/Axios";

const getAttachments=(agent_report_id)=>{
    return new FetchServices().post("feeds/agent-report/attachment/by-agent-report",{agent_report_id:agent_report_id})
}

export default getAttachments;