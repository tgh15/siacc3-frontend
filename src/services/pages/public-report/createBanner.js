import FetchServices from "../../core/Axios"
import UploadAttachment from "./uploadAttachment"

const CreateBanner = ({ datas, onSuccess, onFail }) => {

    let dataAttachment = new FormData();
    dataAttachment.append("attachment[]", datas.attachment[0]);

    UploadAttachment({
        datas: dataAttachment,
        onSuccess: (res) => {
            let dataBanner = {
                title : datas.title,
                description : datas.description,
                sequence : parseInt(datas.sequence),
                attachment_id : parseInt(res[0].id)
            }
            new FetchServices().post("public-report/banner", dataBanner)
                .then(response => {
                    onSuccess(response.data)
                }).catch(err => {
                    onFail(err)
                })
        },
        onFail : (err) => {
            onFail(err)
        }
    })

}

export { CreateBanner }