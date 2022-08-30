import { useContext } from "react"
import { Trash } from "react-feather"
import { Alert, Button } from "reactstrap"
import { FileManagerContext } from "../../../context/FileManagerContext"
import DriveApi from "../../../services/pages/drive"
import CustomToast from "../custom-toast"


const AlertTrash = () => {

    const {listData,apiActive,getData} = useContext(FileManagerContext)

    const onEmptyTrash = () => {

        DriveApi.delete({
            id : Array.from(listData, data => data.id),
            onSuccess : (res) => {
                getData(apiActive)
                CustomToast("success","Data Berhasil Dikosongkan")
            },onFail : (err) => {
                console.log(err)
            }
        })
    }

    return (
        <Alert color='secondary' >
            <div className='alert-body d-flex justify-content-between'>
                <span className='fw-bold'>Item di sampah akan dihapus selamanya setelah 30 hari!</span>
                <span>
                    <Button.Ripple disabled={!listData}  size="sm" color="primary" onClick={onEmptyTrash} >
                        <Trash size={14} /> Kosongkan Sekarang
                    </Button.Ripple>
                </span>
            </div>
        </Alert>
    )
}

export default AlertTrash