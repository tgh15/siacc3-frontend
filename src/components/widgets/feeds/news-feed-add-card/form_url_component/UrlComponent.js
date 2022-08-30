import { Fragment, useState } from "react"
import { Button, FormGroup, Input, Label } from "reactstrap"
import CustomToast from "../../../custom-toast"


const FormUrlComponents = (props) => {

    const [url,setUrl]  = useState("");

    return(
        <Fragment>
            <FormGroup>
                <Label>Masukkan Tatuan</Label>
                <Input placeholder="" onChange={(e)=>{
                    setUrl(e.target.value)
                }}/>
            </FormGroup>
            <FormGroup className="text-right">

                <Button onClick={()=>{
                    if(url==""){
                        CustomToast("danger","URL kosong")
                    }else{
                        props.onSubmit(url)
                    }
                }} color="primary">Simpan</Button>
                &nbsp;
                <Button color="primary" outline onClick={props.cancel}>Batal</Button>
            </FormGroup>
        </Fragment>
    )
}

export default FormUrlComponents