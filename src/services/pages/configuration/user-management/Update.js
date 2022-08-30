import FetchServices from "../../../core/Axios"
import { UpdatePhoto } from "./UpdatePhoto";
import { UploadPhoto } from "./UploadPhoto";

const Update = ({ id, old_user_group,username, uuid, uuid_user, photo, photo_id, storage, password, data, onSuccess, onFail }) => {

    var datas = {
        id                  : id,
        identity_id         : data.identity_id,
        ktp                 : data.ktp,
        name                : data.name,
        address             : data.address,
        phone_number        : data.phone_number,
        email               : data.email,
        workunit_id         : parseInt(data.workunit_id),
        sector_id           : parseInt(data.sector_id),
        position_id         : parseInt(data.position_id),
        user_group          : [data.user_group],
        old_user_group      : [old_user_group],
        username            : username,
        uuid                : uuid,
        uuid_user           : uuid_user
    }

    let dataPhoto = new FormData();

    if(password != undefined){
        datas["password"] = password;
    }

    if (data.photo[0] === undefined) {
        datas["photo"] = photo;
        datas["storage"] = storage;
    }

    new FetchServices().put("employee-biodata/employee/update", datas)
        .then(response => {

            if (data.photo[0] === undefined) {
                onSuccess(response.data)
            } else {
                if (photo_id == "") {
                    dataPhoto.append("username", response.data.username);
                    dataPhoto.append("uuid", uuid);
                    dataPhoto.append("photo[]", data.photo[0]);

                    UploadPhoto({
                        dataPhoto: dataPhoto,
                        onSuccess: (res) => {
                            onSuccess(res.data)
                        }, onFail: (err) => {
                            onFail(err)
                        }
                    })

                } else {
                    dataPhoto.append("storage", storage);
                    dataPhoto.append("old_photo_id", photo_id);
                    dataPhoto.append("photo[]", data.photo[0]);
                    dataPhoto.append("uuid", uuid);

                    UpdatePhoto({
                        dataPhoto: dataPhoto,
                        onSuccess: (res) => {
                            onSuccess(res)
                        }, onFail: (err) => {
                            onFail(err)
                        }
                    })
                }

            }

        }).catch(err => {
            onFail(err)
        })




}

export { Update }