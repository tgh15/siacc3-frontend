import FetchServices from "../../../core/Axios"

const Update = ({ id, logo_id, logo, logo_name, data, onSuccess, onFail }) => {

    var datas = {
        id                  : id,
        name                : data.name,
        code                : data.code,
        email               : data.email,
        address             : data.address,
        sequence            : 1,
        latitude            : parseFloat(data.latitude),
        longitude           : parseFloat(data.longitude),
        parent_id           : data.parent_id ? parseInt(data.parent_id) : null,
        description         : data.description,
        phone_number        : data.phone_number,
        workunit_level_id   : parseInt(data.workunit_level_id),
    }

    let dataPhoto = new FormData();

    dataPhoto.append("workunit_id", id);
    dataPhoto.append("old_logo_id", logo_id);
    dataPhoto.append("uuid", localStorage.getItem("uuid"));
    dataPhoto.append("logo[]", data.photo[0]);

    if (data.photo[0] === undefined) {
        datas["logo"] = logo;
        datas["logo_name"] = logo_name;
    }

    new FetchServices().put("employee-biodata/workunit/update", datas)
        .then(response => {

            if (data.photo[0] === undefined) {
                onSuccess(response.data)
            } else {
                new FetchServices().postMultipart("employee-biodata/workunit/update-logo", dataPhoto).then(res => {
                    onSuccess(response.data)
                }).catch(err => {
                    onFail(err)
                })
            }

        }).catch(err => {
            onFail(err)
        })




}

export { Update }