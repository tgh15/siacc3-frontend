import axios from "axios"
import FetchServices from "../../core/Axios"
import { getTemplateArea } from "../../core/default"

export const geoMapbox = ({query,accessToken})=>{
    return new FetchServices().mapboxGeo(query,accessToken)
}