import FetchServices from "../../../core/Axios";

const Delete = ({ id, onSuccess, onFail }) => {
    new FetchServices().delete("api-gw/ip-restriction", {id:id}).then(response => {
        onSuccess(response.data);
    }).catch(err => {
        onFail(err);
    });
};

export { Delete }