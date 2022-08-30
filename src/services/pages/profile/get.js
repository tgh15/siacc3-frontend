import FetchServices from "../../core/Axios";


const GetDetailIdentification = ({ params, onSuccess, onFail }) => {
    const service = new FetchServices();

    service.get("employee-biodata/employee/header/by-uuid-user", params).then(response => {
        onSuccess(response.data);
    }).catch(err => {
        onFail(err);
    });
};

export { GetDetailIdentification };