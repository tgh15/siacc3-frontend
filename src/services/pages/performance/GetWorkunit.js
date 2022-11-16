import CustomToast from "../../../components/widgets/custom-toast";
import FetchServices from "../../core/Axios"

const GetWorkunit = ({ keyword,params, onSuccess, onFail }) => {

    let keywords = keyword != null ? `?keyword=${keyword}` : "";

    new FetchServices().post(`feeds/performance/workunit${keywords}`, params)
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
export { GetWorkunit }