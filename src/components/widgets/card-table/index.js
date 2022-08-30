import { Fragment } from "react/cjs/react.production.min"
import { CardTableHeader } from "./CardTableHeader"



export const CardTable = ({headers,item})=>{
    return(
        <Fragment>
            <CardTableHeader tableElements = {headers}/>
            {item}
        </Fragment>
    )
}