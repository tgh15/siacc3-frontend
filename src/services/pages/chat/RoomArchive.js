import FetchServices from "../../core/Axios";

const RoomArchive = ({onSuccess,onFail}) => {
    const service = new FetchServices();
    service.get("communication/room/archive").then(response => {
        onSuccess(response.data)
    }).catch(err => {
        onFail(err)
    })
}

export { RoomArchive }