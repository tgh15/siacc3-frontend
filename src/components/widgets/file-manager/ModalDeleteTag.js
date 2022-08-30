import { useContext, useState } from "react"
import { Fragment } from "react"
import { Trash } from "react-feather"
import { Button, FormGroup } from "reactstrap"
import { FileManagerContext } from "../../../context/FileManagerContext"
import DriveApi from "../../../services/pages/drive"
import { ModalBase } from "../modals-base"
import SubmitButton from "../submit-button"


const ModalDeleteTag = () => {

    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const { tagSelected, setTags, setMenuActive,setUrlApiActive,setBreadcums } = useContext(FileManagerContext)

    const onDelete = () => {
        DriveApi.tagDelete({
            id: tagSelected.id,
            onSuccess: (res) => {
                getTagAll()
                setMenuActive('all')
                setUrlApiActive()
                setBreadcums({ type: "create", name: "Semua File", url: "" })
            },
            onFail: (err) => {
                console.log(err)
            }
        })
    }

    const getTagAll = () => {
        DriveApi.get({
            path: "/tags",
            onSuccess: (res) => {
                setTags(res)
            },
            onFail: (err) => {
                console.log(err)
            }
        })
    }

    return (
        <Fragment>
            <ModalBase title="Hapus Tag" show={showModal} size={"sm"} setShow={(par) => setShowModal(par)}>
                <h5 className="text-center"> Apakah Anda Yakin hapus tag ini ? <br />
                    Berkas dengan tag ini tidak akan terhapus
                </h5>
                <hr />
                <FormGroup className="text-right d-flex justify-content-between">
                    <Button.Ripple outline onClick={() => {
                        setShowModal(false)
                    }} color="primary" >Batal</Button.Ripple>

                    <Button.Ripple size="sm" color="primary" onClick={onDelete}>
                        Submit
                    </Button.Ripple>
                </FormGroup>
            </ModalBase>
            <Button color="primary" size="sm" onClick={() => { setShowModal(!showModal) }}>
                <Trash size={14} /> Hapus Tag ini
            </Button>

        </Fragment>
    )
}

export default ModalDeleteTag