import { useContext } from "react"
import { Fragment } from "react"
import { Radio } from "react-feather"
import { Media } from "reactstrap"
import Button from "reactstrap/lib/Button"
import ModalFooter from "reactstrap/lib/ModalFooter"
import { BroadcastContext } from "../../../../context/BroadcastContext"
import Helper from "../../../../helpers"
import Avatar from "../../../widgets/avatar"
import { ModalBase } from "../../../widgets/modals-base"


const BroadcastDetail = props => {

    const {
        show,
        setShow,
    } = props

    const { broadcastSelected } = useContext(BroadcastContext)

    const { dateIndo } = Helper

    return (
        <Fragment>
            <ModalBase show={show} setShow={(par) => setShow(par)} title="Detail Pesan Siaran">
                {broadcastSelected != null && (
                    <Fragment>
                        <Media className="d-flex border-primary p-1" style={{ borderRadius:"5px" }}>
                            <Media left>
                                <Avatar color='primary' icon={<Radio size={14} />} />
                            </Media>
                            <Media body className="ml-1">
                                {broadcastSelected.name}<br />
                                {dateIndo(broadcastSelected.time)}
                            </Media>
                        </Media>

                        <p className="mt-3">
                            {broadcastSelected.last_message}
                        </p>
                    </Fragment>
                )}

                <ModalFooter className="d-flex justify-content-end px-0">
                    <Button color="primary" onClick={() => {setShow(false)}}>
                        OK
                    </Button>
                </ModalFooter>
            </ModalBase>
        </Fragment>
    )
}

export default BroadcastDetail