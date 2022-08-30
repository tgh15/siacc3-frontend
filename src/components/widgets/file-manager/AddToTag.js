import { Fragment, useContext, useState } from "react"
import { Tag } from "react-feather"
import { Button, Card, CardBody, DropdownItem, FormGroup } from "reactstrap"
import CardFooter from "reactstrap/lib/CardFooter"
import { FileManagerContext } from "../../../context/FileManagerContext"
import DriveApi from "../../../services/pages/drive"
import CustomToast from "../custom-toast"
import "./FileManager.scss"

const AddToTags = (props) => {
    const [loading, setLoading] = useState(false)
    const [selectedTag,setSelectedTag ] = useState(false)
    const {dataSelected,getData,apiActive} = useContext(FileManagerContext)

    const selected = (data) => {
        if(selectedTag == data){
           return "selected";
        }
    }

    const onSubmit = () => {
        DriveApi.tagAddFile({
            object_id : dataSelected.id,
            tag_id : selectedTag.id,
            onSuccess : (res) => {
                getData(apiActive)
                CustomToast("success","Berhasil ditambahkan di tag")
            },
            onFail : (err) => {
                CustomToast("danger", err.message)
            }
        })
    }

    return (
        <Fragment>
            {props.tags && props.tags.map((t, i) => (

                <Card className={`mb-1 cursor-pointer ${selected(t)}`} style={{ width: "100%" }} onClick={()=> {
                    setSelectedTag(t)
                }}>
                    <CardBody className='d-flex py-1'>
                        <Tag className='mr-1' />{t.tag}
                    </CardBody>
                </Card>
            ))}
            <hr />
            <FormGroup className="d-flex justify-content-between">
                <Button outline color="primary" onClick={() => { props.onClose()}}>Batal</Button>&nbsp;
                <Button.Ripple size="sm" color="primary" disabled={!selectedTag} onClick={() => {onSubmit()}} >
                    Submit
                </Button.Ripple>
            </FormGroup>
        </Fragment>
    )
}

export default AddToTags