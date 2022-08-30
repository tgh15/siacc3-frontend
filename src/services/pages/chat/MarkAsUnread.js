import FetchServices from "../../core/Axios";

const MarkAsUnread = ({roomId,onSuccess,onFail}) => {
    const service = new FetchServices();
    service.put(`communication/room/un-read`,{id : roomId}).then(response => {
        onSuccess(response.data)
    }).catch(err => {
        onFail(err)
    })
}

export { MarkAsUnread }