import FetchServices from "../../../core/Axios";

const Update = ({id, ip, onSuccess, onFail}) => {
    new FetchServices().put("api-gw/ip-restriction", {id:id, ip:ip}).then(response => {
        onSuccess(response.data);
    }).catch(err => {
        console.log(err);
    });
};

export { Update }