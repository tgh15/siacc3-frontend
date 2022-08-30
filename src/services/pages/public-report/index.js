import { CreateBanner } from "./createBanner"
import { Delete } from "./delete"
import { DeleteBanner } from "./deleteBanner"
import Forward from "./Forward"
import Get from "./get"
import GetBanner from "./getBanner"
import { UpdateBanner } from "./updateBanner"
import UploadAttachment from "./uploadAttachment"

const PublicReportApi = {
    get:Get,
    delete : Delete,
    getBaner : GetBanner,
    deleteBanner : DeleteBanner,
    createBanner : CreateBanner,
    uploadAttachment : UploadAttachment,
    updateBanner : UpdateBanner,
    forward : Forward
}

export default PublicReportApi