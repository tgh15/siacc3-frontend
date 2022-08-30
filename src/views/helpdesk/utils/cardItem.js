import classNames from "classnames"
import { Fragment } from "react"
import { AlertCircle, AlertOctagon, CheckCircle, CheckSquare, Download, HelpCircle, Info, Loader, MoreVertical, Tag, Trash2, XCircle, XOctagon } from "react-feather"
import { Card, CardBody, DropdownItem, DropdownMenu, DropdownToggle, Media, UncontrolledDropdown } from "reactstrap"
import Avatar from "../../../components/widgets/avatar"
import Helper from "../../../helpers"
import "./utils.scss"

const IconhandlingStatus = ({ onSelect, handlingStatus }) => {

    switch (handlingStatus) {
        case "queue":
            return (
                <Info size={20} className="text-danger ml-1" />
            )
        case "process":
            return (
                <Loader size={20} className="text-info ml-1" />
            )
        case "done":
            return (
                <CheckSquare size={20} className="text-success ml-1" />
            )
        default:
            return null
    }
}

const CardItem = props => {

    const {
        image,
        title,
        description,
        handlingStatus,
        type,
        onClick,
        time,
        onSelect,
        saved,
        active
    } = props

    const { fallbackImage_ } = Helper



    const iconType = () => {
        if (type == "Error") {
            return <Fragment> <XOctagon size={14} style={{ marginRight: "5px" }} /> <span style={{ fontSize: "9pt" }}>  Error </span> </Fragment>
        } else if (type == "Ask") {
            return <Fragment> <HelpCircle size={14} style={{ marginRight: "5px" }} /> <span style={{ fontSize: "9pt" }}>  Bertanya </span> </Fragment>
        } else if (type == "Bug") {
            return <Fragment> <AlertOctagon size={14} style={{ marginRight: "5px" }} /> <span style={{ fontSize: "9pt" }}>  Bugs </span> </Fragment>
        }
    }

    return (
        <Card className={classNames("mb-1 border-secondary card-item", {
            "active": active
        })} >
            <CardBody>
                <Media>
                    <Media left>
                        <Avatar
                            onError={fallbackImage_}
                            img={image}
                            className="mr-1"
                        />

                    </Media>
                    <Media body className="d-flex flex-column">
                        <span style={{ fontSize: "10pt" }}
                            className="cursor-pointer title-card"
                            onClick={() => {
                                if (!active) {
                                    if (onClick != null) {
                                        onClick()
                                    }
                                }


                            }}>{title}</span>
                    </Media>
                    <Media right>
                        <div className="d-flex">
                            <IconhandlingStatus
                                handlingStatus={handlingStatus}
                            />

                            <UncontrolledDropdown>
                                <DropdownToggle tag="div">
                                    <MoreVertical size={20} className="cursor-pointer ml-1" />
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem tag="a" onClick={() => onSelect("pin")}><Tag size={14} /> Pin Pesan </DropdownItem>
                                    <DropdownItem tag="a" onClick={() => onSelect("done")}><CheckSquare size={14} className="text-success" /> Selesai </DropdownItem>
                                    <DropdownItem tag="a" onClick={() => onSelect("process")}><Loader size={14} className="text-info" /> Proses </DropdownItem>
                                    <DropdownItem tag="a" onClick={() => onSelect("queue")}><Info size={14} className="text-danger" /> Belum Dibaca </DropdownItem>
                                    {!saved ?
                                        <DropdownItem tag="a" onClick={() => onSelect("save")}><Download size={14} /> Simpan Pesan </DropdownItem>
                                        :
                                        <DropdownItem tag="a" onClick={() => onSelect("unsave")}><XCircle size={14} /> Batalkan Simpan </DropdownItem>
                                    }
                                    <DropdownItem tag="a" onClick={() => onSelect("delete")}><Trash2 size={14} /> Hapus </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>


                    </Media>
                </Media>

                <div style={{ fontSize: "10pt" }} className="mt-1">
                    {description.substring(0, 30)}{(description.length > 30) ? "..." : ""}
                </div>
                <div className="d-flex justify-content-between mt-1">
                    <div className="d-flex align-items-center" >
                        {iconType()}
                    </div>
                    <div style={{ fontSize: "8pt" }}>
                        {time}
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default CardItem