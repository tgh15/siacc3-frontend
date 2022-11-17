import Helper from "../../../../helpers";
import FetchServices from "../../../core/Axios";

const Disk = ({  onSuccess, onFail }) => {
    const service = new FetchServices();
    service.get("drive/statistic/disk",{"uuid" : Helper.getUserData().uuid}).then(res => {
        onSuccess(res.data.data)
    }).catch(err => {
        onFail(err)
    })
}

export  {Disk} 