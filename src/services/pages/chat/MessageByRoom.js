import FetchServices from "../../core/Axios";

const MessageByRoom = ({room,onSuccess,onFail}) => {
    const service = new FetchServices();
    service.get(`communication/messages/${room}`).then(response => {
        onSuccess(response.data)
    }).catch(err => {
        onFail(err)
    })
}

export { MessageByRoom }