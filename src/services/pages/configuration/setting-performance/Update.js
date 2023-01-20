import FetchServices from "../../../core/Axios"
import UploadBadge from "./UploadBadge";

const UpdateSettingPerformance = ({id, data, onSuccess, onFail }) => {

    var datas = {
        id             : id,
        kind           : data.kind,
        note           : data.note,
        title          : data.title,
        points         : data.points,
        is_event       : data.is_event,
        condition      : data.condition,
        target_value   : parseInt(data.target_value),
    }

    if(data.is_event){
        datas.end_date      = data.end_date;
        datas.start_date    = data.start_date;
        datas.workunit_id   = Array.from(data.workunit_id, workunit => workunit.value);
        datas.max_recipient = parseInt(data.max_recipient) ?? 0;
    }

    let dataPhoto = new FormData();

    if (data.badge_name) {
        datas["badge"]      = data.badge;
        datas["badge_id"]   = data.badge_id;
        datas["badge_name"] = data.badge_name;
    }else{
        datas["badge"]      = data.badge
    }
    new FetchServices().put("feeds/achievement/update", datas)
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

export { UpdateSettingPerformance }