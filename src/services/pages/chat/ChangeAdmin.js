import FetchServices from "../../core/Axios";

const ChangeAdmin = ({datas,onSuccess,onFail}) => {
    const service = new FetchServices();
    service.put(`communication/room/admin`,datas).then(response => {
        onSuccess(response.data)
    }).catch(err => {
        onFail(err)
    })
}

export { ChangeAdmin }