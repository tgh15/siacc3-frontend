
import FetchServices from "../../../core/Axios";

const Get = ({ params, page = 1, onSuccess, onFail }) => {
    const service = new FetchServices();
    service.get("employee-biodata/employee?page=" + page, params).then(response => {

        onSuccess(response.data.data)
    }).catch(err => {
        onFail(err)
    })
}

export { Get }

