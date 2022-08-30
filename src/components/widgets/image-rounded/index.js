import { Fragment } from "react"
import Helper       from "../../../helpers";

const ImageRounded = (props) => {

    const {
        width,
        height,
        src,
        onClick,
        className
    } = props

    let pointer = (onClick) ? "cursor-pointer" : '';
    return(
        <Fragment>
            <img onError={Helper.fallbackImage_} className={`img-fluid rounded ${pointer} ${className}` } src={src} style={{ width:width, height:height }} alt='-' onClick={onClick}/>
        </Fragment>
    )
}

export default ImageRounded