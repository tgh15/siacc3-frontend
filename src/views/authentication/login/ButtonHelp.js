import { Fragment, useState } from "react"
import { Headphones } from "react-feather"
import { useLocation } from "react-router-dom"
import { Button, Input, ModalBody } from "reactstrap"
import CustomToast from "../../../components/widgets/custom-toast"
import { ModalBase } from "../../../components/widgets/modals-base"
import { RequestHelpdeskApi } from "../../../services/pages/helpdesk/request"



const ButtonHelp = props => {

    const [modalHelp, setModalHelp] = useState(false)
    const [email, setEmail] = useState("")

    const toggleHelp = () => {
        setModalHelp(!modalHelp)
    }

    const handleSendRequest = () => {
        RequestHelpdeskApi.send({data : { email: email }})
            .then(res => {
                toggleHelp()
                CustomToast("success", "Request Berhasil dikirim \n silahkan cek email anda")
            }, err => {
                CustomToast("danger", "Request Gagal dikirim")
            })
    }



    return (
        <Fragment>
            <ModalBase
                show={modalHelp}
                setShow={toggleHelp}
                center={true}
                size="sm">
                <ModalBody >
                    <p style={{ textAlign: "center" }}>
                        Silahkan masukan email yang terdaftar <br />
                        maka link bantuan akan dikirimkan <br />
                        melalui email yang terdaftar
                    </p>

                    <Input
                        className="mt-2"
                        placeholder="Masukkan Email"
                        type="email"
                        onChange={(e) => {
                            setEmail(e.target.value)

                        }}
                    />

                    <Button
                        className="mt-2"
                        color="primary"
                        block={true}
                        onClick={handleSendRequest}>
                        Kirim
                    </Button>
                </ModalBody>
            </ModalBase>
            <Button.Ripple
                color="primary"
                onClick={toggleHelp}
                style={{ position: "fixed", bottom: '-0.5%', right: "5%", width: "15em" }}
                className="d-flex justify-content-between p-1">
                <span style={{ marginTop: "auto", marginBottom: "auto" }}>  <Headphones size={14} className="mr-1" /> Bantuan </span>

            </Button.Ripple>


        </Fragment>
    )
}

export default ButtonHelp