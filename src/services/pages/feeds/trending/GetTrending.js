import FetchServices from "../../../core/Axios"
import moment from 'moment'
const GetTrending=(trending_type,start_date,end_date)=>{
    const path = "feeds/agent-report/trending-by-type"
    const date_default = moment().format("YYYY-MM-DD")
    const date_default_next = moment().format("YYYY-MM-DD")
    const param = {
        trending_type:trending_type,
        start_date:start_date==undefined?date_default_next:start_date,
        end_date:end_date==undefined?date_default:end_date,
    }

    return new FetchServices().post(path,param)
}

export default GetTrending;