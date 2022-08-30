import FetchServices from "../../../core/Axios"


export default function Create(data){
    const path = "feeds/comment/create"
    return new FetchServices().post(path,data)
}