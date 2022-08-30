import FetchServices from "../../core/Axios";

const Room = ({onSuccess,onFail}) => {
    const service = new FetchServices();
    service.get("communication/room/by-uuid").then(response => {
        onSuccess(response.data)
    }).catch(err => {
        onFail(err)
    })
}

export { Room }