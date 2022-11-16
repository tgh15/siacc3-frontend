import CustomToast      from "../../../components/widgets/custom-toast"
import FetchServices    from "../../core/Axios"

const GetAgentDetail = ({ datas, onSuccess, onFail }) => {

    new FetchServices().post("feeds/performance/agent/detail", datas)
        .then(response => {
            if(!response.is_error){
                onSuccess(response.data)
            }else{
                CustomToast('danger', response.message);
            }
        }).catch(err => {
            onFail(err)
        })
}
export { GetAgentDetail }