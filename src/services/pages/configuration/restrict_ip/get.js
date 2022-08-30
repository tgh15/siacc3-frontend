import FetchServices from "../../../core/Axios";

const Get = ({ params, onSuccess, onFail }) => {
    const service = new FetchServices();

    service.get("api-gw/ip-restriction", params).then(response => {
        onSuccess(response.data);
    }).catch(err => {
        console.log(err);
    });
};

export { Get }