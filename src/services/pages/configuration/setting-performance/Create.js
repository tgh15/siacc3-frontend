import FetchServices from "../../../core/Axios"
import UploadBadge from "./UploadBadge";

const CreateSettingPerformance = ({ data, onSuccess, onFail }) => {

    var datas = {
        title: data.title,
        kind: data.kind,
        condition: data.condition,
        target_value: parseInt(data.target_value),
        note: data.note,
        points : data.points,
        is_event: data.is_event,
        max_recipient: parseInt(data.max_recipient),
        start_date: data.start_date,
        end_date: data.end_date,
        max_recipient : parseInt(data.max_recipient) ?? 0,
        workunit_id: Array.from(data.workunit_id, workunit => workunit.value),
    }

    let dataPhoto = new FormData();

    if (data.badge_name) {
        datas["badge"] = data.badge;
        datas["badge_name"] = data.badge_name;
        datas["badge_id"] = data.badge_id;
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
                            console.log(res)
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