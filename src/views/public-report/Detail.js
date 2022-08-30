import { useContext } from "react"
import { Fragment } from "react"
import { PublicReportContext } from "../../context/PublicReportContext"
import Helper from "../../helpers"


const Detail = (props) => {

    const {dataSelected} = useContext(PublicReportContext)
    return (
        <Fragment>
            <p>
                Pengirim Laporan :
            </p>
            <span className="font-weight-bolder">
            {dataSelected.reporter_name} - {dataSelected.reporter_phone}
            </span>
            <br />
            <small>
                {Helper.dateIndo(dataSelected.created_at)} - {dataSelected.address}
            </small>

            <p className="font-weight-bolder mt-1">
                {dataSelected.content}
            </p>
        </Fragment>
    )
}

export default Detail