import FetchServices from "../../../core/Axios";

const Count=(agent_report_id)=>{
    const path = "feeds/viewer/by-agent-report/count"
    const param ={agent_report_id:agent_report_id}
    return new FetchServices().post(path,param)

}

export default Count;