import FetchServices from "../../../core/Axios";


const Filter = ({ data, page, onSuccess, onFail }) => {

    const service = new FetchServices();
    service.post("employee-biodata/employee/filter?page=" + page, data).then(response => {
        onSuccess(response.data)
    }).catch(err => {
        onFail(err)
    })
}

export default Filter