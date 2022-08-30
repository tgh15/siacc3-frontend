import FetchServices from "../../../core/Axios";

const GetSettingPerformance = ({params,body,onSuccess,onFail}) => {
    const service = new FetchServices();
    service.post(`feeds/achievement/by-type?page=${params.page}&keyword=${params.keyword}`, body).then(response => {
        onSuccess(response.data)
    }).catch(err => {
        onFail(err)
    })
}

export { GetSettingPerformance }