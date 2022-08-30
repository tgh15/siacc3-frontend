import { Fragment } from "react"
import { Check, X } from "react-feather"

const IconSwitch = () => (
    <Fragment>
        <span className='switch-icon-left'>
            <Check size={14} />
        </span>
        <span className='switch-icon-right'>
            <X size={14} />
        </span>
    </Fragment>
)

export default IconSwitch