import { Fragment, useContext } from "react"
import { Button } from "reactstrap"
import { PerformanceContext } from "../../context/PerformanceContext"


const CategoryAgent = (props) => {
    
    const {
        sectorAgent,
        setSectorAgent,
        getDataAgent
    } = useContext(PerformanceContext)

    const onNasional = () => {
        if(sectorAgent != "Nasional"){
            getDataAgent(); setSectorAgent("Nasional")
        }
    } 
    return (
        <Fragment>
            <Button.Ripple 
                        color="primary" 
                        outline={sectorAgent == "Nasional" ? false : true} 
                        className="round" 
                        size="sm"
                        onClick={() => {onNasional()}}
                        >
                Nasional
            </Button.Ripple>
            <Button.Ripple 
                        outline color="primary" 
                        outline={sectorAgent == "Lokal" ? false : true} 
                        className="round ml-1" 
                        size="sm"
                        onClick={() => { setSectorAgent("Lokal")}}>
                Lokal
            </Button.Ripple>
        </Fragment>
    )
}

export default CategoryAgent