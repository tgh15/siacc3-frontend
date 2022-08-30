import FetchServices from "../../core/Axios";

const AddUserToRoom = ({datas,onSuccess,onFail}) => {
    const service = new FetchServices();
    service.post(`communication/room/user`,datas).then(response => {
        onSuccess(response.data)
    }).catch(err => {
        onFail(err)
    })
}

export { AddUserToRoom }