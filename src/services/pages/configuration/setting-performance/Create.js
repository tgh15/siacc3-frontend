import FetchServices from "../../../core/Axios"
import UploadBadge from "./UploadBadge";

const CreateSettingPerformance = ({ data, onSuccess, onFail }) => {

    var datas = {
        note                : data.note,
        kind                : data.kind,
        title               : data.title,
        points              : data.points,
        is_event            : data.is_event,
        end_date            : data.end_date,
        condition           : data.condition,
        start_date          : data.start_date,
        workunit_id         : Array.from(data.workunit_id, workunit => workunit.value),
        target_value        : parseInt(data.target_value),
        max_recipient       : parseInt(data.max_recipient),
        max_recipient       : parseInt(data.max_recipient) ?? 0,
    }

    let dataPhoto = new FormData();

    if (data.badge_name) {
        datas["badge"]      = data.badge;
        datas["badge_id"]   = data.badge_id;
        datas["badge_name"] = data.badge_name;
    }else{
        datas["badge"] = data.badge
    }

    new FetchServices().post("feeds/achievement/create", datas)
        .then(response => {
            if (data.badge_name) {
                onSuccess(response.data)
            } else {
                    dataPhoto.append("achievement_id", response.data.id);
                    dataPhoto.append("badge[]", data.badge);
                    UploadBadge({
                        dataPhoto: dataPhoto,
                        onSuccess: (res) => {
                            onSuccess(res)
                        }, onFail: (err) => {
                            onFail(err)
                        }
                    })
            }

        }).catch(err => {
            onFail(err)
        })




}

export { CreateSettingPerformance }