import FetchServices from "../../../core/Axios"


const Create = ({ data, onSuccess, onFail }) => {
    var datas = {
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


    new FetchServices().post("employee-biodata/workunit/create", datas)
        .then(response => {
            let resWorkunit = response.data;

            if(data.photo.length > 0){ 
                let dataPhoto = new FormData();

                dataPhoto.append("workunit_id", resWorkunit.id);
                dataPhoto.append("uuid", localStorage.getItem("uuid"));
                dataPhoto.append("logo[]", data.photo[0]);

                new FetchServices().postMultipart("employee-biodata/workunit/upload-logo", dataPhoto).then(res => {
                    onSuccess(res.data)
                }).catch(err => {
                    onFail(err)
                    console.log(err);
                })
            }else{
                onSuccess(resWorkunit);
            }

        }).catch(err => {
            onFail(err)
        })
}

export { Create }