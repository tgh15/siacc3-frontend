import FetchServices from "../../../core/Axios";

const Update=(agent_report_id,type)=>{
    return new FetchServices().put("feeds/like/update",{
        agent_report_id:agent_report_id,
        type:type
    })
}

export default Update;