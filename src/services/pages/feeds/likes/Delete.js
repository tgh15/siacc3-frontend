import Helper from "../../../../helpers";
import FetchServices from "../../../core/Axios";


const Delete=(agent_report_id)=>{

    const uuid = Helper.getUserData().uuid
    return new FetchServices().delete("feeds/like/delete-by-user",{
        agent_report_id:agent_report_id,
        uuid:uuid,
    })
}

export default Delete;