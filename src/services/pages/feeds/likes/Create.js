import FetchServices from "../../../core/Axios";

const Create=(params)=>{
    const path = "feeds/like/create"
    return new FetchServices().post(path,params)
}

export default Create;