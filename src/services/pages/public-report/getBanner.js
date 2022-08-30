
import FetchServices from "../../core/Axios"

const GetBanner = ({  onSuccess, onFail }) => {


    new FetchServices().get(`public-report/banners`)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })

}

export default GetBanner