import Helper from "../../../helpers";
import FetchServices from "../../core/Axios";

const TagDelete = ({  id,onSuccess, onFail }) => {
    const service = new FetchServices();

    let data = {
        user_id : Helper.getUserData().uuid,
        tag_id : id
    };

    service.delete("drive/tag/delete",data).then(res => {
        onSuccess(res)
    }).catch(err => {
        onFail(err)
    })
}

export  {TagDelete}