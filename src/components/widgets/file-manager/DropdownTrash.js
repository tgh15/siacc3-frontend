import { Fragment, useContext, useState } from "react"
import { MoreHorizontal, RefreshCw, Trash } from "react-feather"
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap"
import { FileManagerContext } from '../../../context/FileManagerContext'
import DriveApi from "../../../services/pages/drive"
import CustomToast from "../custom-toast"
import FormDelete from "../form-delete/FormDelete"

const DropdownTrash = ({ data }) => {

    const { apiActive, getData } = useContext(FileManagerContext)
    const [showDeleteForm, setShowDeleteForm] = useState(false)
    const [loading, setLoading] = useState(false)

    let type = data.mime ? "File" : "Folder"

    const onRestore = () => {
        DriveApi.restore({
            id: data.id,
            onSuccess: (res) => {
                CustomToast("success", `${type} Berhasil dipulihkan`)
                getData(apiActive)
            },
            onFail: (err) => {
                CustomToast("danger", err.data.message)

            }
        })
    }

    const onDelete = () => {
        setLoading(true)
        DriveApi.delete({
            id: data.id,
            onSuccess: (res) => {
                CustomToast("success", `${type} Berhasil dihapus selamanya`)
                getData(apiActive)
            },
            onFail: (err) => {
                CustomToast("danger", err.data.message)
            }
        })
    }




    return (
        <Fragment>

            <FormDelete
                show={showDeleteForm}
                title={`Hapus Selamanya`}
                setShow={(par) => setShowDeleteForm(par)}
                customDescription={`${type} "${data.name}" akan dihapus selamanya dan Anda tidak akan dapat memulihkannya`}
                onDelete={onDelete}
                size="md"
                loading={loading} />

            <UncontrolledDropdown direction='right'>
                <DropdownToggle tag="div" >
                    <MoreHorizontal size={20} />
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem tag="a" onClick={() => { onRestore() }}>
                        <RefreshCw size={14} /> Pulihkan
                    </DropdownItem>
                    <DropdownItem tag="a" onClick={() => { setShowDeleteForm(true) }}>
                        <Trash size={14} /> Hapus Selamanya
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Fragment>
    )
}

export default DropdownTrash