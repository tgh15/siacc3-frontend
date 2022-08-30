import FetchServices from "../../core/Axios"
import UploadAttachment from "./uploadAttachment"

const UpdateBanner = ({ id, attachmentId, datas, onSuccess, onFail }) => {
    if (datas.attachment[0]) {
        let dataAttachment = new FormData();
        dataAttachment.append("attachment[]", datas.attachment[0]);

        UploadAttachment({
            datas: dataAttachment,
            onSuccess: (res) => {
                let dataBanner = {
                    id: id,
                    title: datas.title,
                    description: datas.description,
                    sequence: parseInt(datas.sequence),
                    attachment_id: parseInt(res[0].id)
                }
                new FetchServices().post("public-report/banner", dataBanner)
                    .then(response => {
                        onSuccess(response.data)
                    }).catch(err => {
                        onFail(err)
                    })
            },
            onFail: (err) => {
                onFail(err)
            }
        })
    } else {

        let dataBanner = {
            id: id,
            title: datas.title,
            description: datas.description,
            sequence: parseInt(datas.sequence),
            attachment_id: attachmentId
        }
        new FetchServices().put("public-report/banner", dataBanner)
            .then(response => {
                onSuccess(response.data)
            }).catch(err => {
                onFail(err)
            })

    }


}

export { UpdateBanner }