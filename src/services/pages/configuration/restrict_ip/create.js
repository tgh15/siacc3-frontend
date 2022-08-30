import FetchServices from "../../../core/Axios";

const Create = ({ ip, onSuccess, onFail }) => {
    new FetchServices().post("api-gw/ip-restriction", {ip:ip}).then(response => {
        onSuccess(response.data);
    }).catch(err => {
        onFail(err);
    });
};

export { Create }