import FetchServices from "../../core/Axios";

const RemoveMemberFromRoom = ({datas,onSuccess,onFail}) => {
    const service = new FetchServices();
    service.delete(`communication/room/user`,datas).then(response => {
        onSuccess(response.data)
    }).catch(err => {
        onFail(err)
    })
}

export { RemoveMemberFromRoom }