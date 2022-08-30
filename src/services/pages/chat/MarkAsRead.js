import FetchServices from "../../core/Axios";

const MarkAsRead = ({roomId,onSuccess,onFail}) => {
    const service = new FetchServices();
    service.post(`communication/room/read`,{id : roomId}).then(response => {
        onSuccess(response.data)
    }).catch(err => {
        onFail(err)
    })
}

export { MarkAsRead }