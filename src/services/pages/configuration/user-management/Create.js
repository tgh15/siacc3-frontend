import FetchServices from "../../../core/Axios"
import { UpdatePhoto } from "./UpdatePhoto";
import { UploadPhoto } from "./UploadPhoto";


const Create = ({ data, onSuccess, onFail }) => {
    var datas = {
        identity_id: data.identity_id,
        ktp: data.ktp,
        name: data.name,
        address: data.address,
        phone_number: data.phone_number,
        email: data.email,
        workunit_id: parseInt(data.workunit_id),
        sector_id: parseInt(data.sector_id),
        position_id: parseInt(data.position_id),
        username: data.username,
        password: data.password,
        user_group: [data.user_group]
    }


        new FetchServices().post("employee-biodata/employee/create", datas)
            .then(response => {

                if(data.photo.length > 0){
                    let dataPhoto = new FormData();
        
                    dataPhoto.append("username", response.data.username);
                    dataPhoto.append("uuid", response.data.uuid);
                    dataPhoto.append("photo[]", data.photo[0]);
        
                    UploadPhoto({
                        dataPhoto : dataPhoto,
                        onSuccess : (res) => {
                            onSuccess(res.data)    
                        },onFail : (err) => {
                            onFail(err)
                        }
                    })
                }else{
                    onSuccess(true);
                }
            }).catch(err => {
                onFail(err)
            })
    

}

export { Create }