import { Fragment } from "react";
import { CheckSquare, Download, Info, Loader, MoreVertical, Tag, Trash2 } from "react-feather";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";


const IconHandlingStatus = props => {

    const {
        status,
        className,
        description,
        onSelect
    } = props

    switch (status) {
        case "queue":
            return (
                <Fragment>
                    <Info size={20} className={`text-danger ${className}`} /> {description ? "Belum dibaca" : ""}
                </Fragment>
            )
        case "process":
            return (
                <Fragment>
                    <Loader size={20} className={`text-info ${className}`} /> {description ? "Proses" : ""}
                </Fragment>
            )
        case "done":
            return (
                <Fragment>
                    <CheckSquare size={20} className={`text-success ${className}`} /> {description ? "Selesai" : ""}
                </Fragment>
            )
        default:
            return null

    }
}

export default IconHandlingStatus