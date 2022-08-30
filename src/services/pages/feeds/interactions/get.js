import FetchServices from "../../../core/Axios";

const GetInteraction=()=>{
    const path = "feeds/agent-report/interaction-by-category"
    console.log("PATH",path)
    return new FetchServices().get(path,{})
}

export default GetInteraction;