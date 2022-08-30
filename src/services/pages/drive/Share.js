import FetchServices from "../../core/Axios";

const Share = ({  data,onSuccess, onFail }) => {
    const service = new FetchServices();

    service.post("drive/share",data).then(res => {
        onSuccess(res)
    }).catch(err => {
        onFail(err)
    })
}

export  {Share} 