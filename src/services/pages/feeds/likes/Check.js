import FetchServices from "../../../core/Axios";

const Check=(agent_id,type)=>{
    return new FetchServices().post("feeds/like/user-like-check",{
        agent_report_id:agent_id,
        type:type,
    })   
}

export default Check;