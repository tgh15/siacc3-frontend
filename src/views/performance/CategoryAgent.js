import { Fragment, useContext } from "react"
import { Button } from "reactstrap"
import { PerformanceContext } from "../../context/PerformanceContext"


const CategoryAgent = (props) => {
    
    const {
        sectorAgent,
        getDataAgent,
        setSectorAgent,
    } = useContext(PerformanceContext)

    const onNasional = () => {
        if(sectorAgent != "Nasional"){
            getDataAgent(); setSectorAgent("Nasional")
        }
    } 
    return (
        <Fragment>
            <Button.Ripple 
                id          = {`performance_personal_national_filter`}
                size        = "sm"
                color       = "primary" 
                onClick     = {() => {onNasional()}}
                outline     = {sectorAgent == "Nasional" ? false : true} 
                className   = "round" 
            >
                Nasional
            </Button.Ripple>
            <Button.Ripple 
                id          = {`performance_personal_local_filter`}
                size        = "sm"
                color       = "primary" 
                onClick     = {() => { setSectorAgent("Lokal")}}
                outline     = {sectorAgent == "Lokal" ? false : true} 
                className   = "round ml-1" 
            >
                Lokal
            </Button.Ripple>
        </Fragment>
    )
}

export default CategoryAgent