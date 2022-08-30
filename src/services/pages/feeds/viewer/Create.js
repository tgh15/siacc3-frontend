import FetchServices from "../../../core/Axios"

const Create=(agent_report_id)=>{
    const path ="feeds/viewer/create"
    return new FetchServices().post(path,{agent_report_id:agent_report_id})

}

export default Create