import { Fragment, useContext } from "react"
import { Button } from "reactstrap"
import { PerformanceContext } from "../../context/PerformanceContext"


const CategoryWorkunit = (props) => {

    const{
        workunitLevel,
        getDataWorkunit
    } = useContext(PerformanceContext)

    return (
        <Fragment>
            <Button.Ripple
                id          = {`performance_workunit_filter_all`}
                size        = "sm"
                color       = "primary" 
                onClick     = {() => {getDataWorkunit({ workunit_level_id : 0})}} 
                outline     = {workunitLevel == 0 ? false : true} 
                className   = "round" 
            >
                Semua 
            </Button.Ripple>
            <Button.Ripple 
                id          = {`performance_workunit_filter_level_1`}
                size        = "sm"
                color       = "primary" 
                outline     = {workunitLevel == 1 ? false : true}  
                onClick     = {() => {getDataWorkunit({ workunit_level_id : 1})}}
                className   = "round ml-1" 
            >
                Kejaksaan Agung
            </Button.Ripple>
            <Button.Ripple 
                id          = {`performance_workunit_filter_level_2`}
                size        = "sm"
                color       = "primary" 
                onClick     = {() => {getDataWorkunit({ workunit_level_id : 2})}}
                outline     = {workunitLevel == 2 ? false : true} 
                className   = "round ml-1" 
            >
                Kejaksaan Tinggi
            </Button.Ripple>
            <Button.Ripple 
                id          = {`performance_workunit_filter_level_3`}
                size        = "sm"
                color       = "primary" 
                outline     = {workunitLevel == 3 ? false : true} 
                onClick     = {() => {getDataWorkunit({ workunit_level_id : 3})}}
                className   = "round ml-1" 
            >    
                Kejaksaan Negeri
            </Button.Ripple>
            <Button.Ripple 
                id          = {`performance_workunit_filter_level_4`}
                size        = "sm"
                color       = "primary" 
                outline     = {workunitLevel == 4 ? false : true} 
                onClick     = {() => {getDataWorkunit({ workunit_level_id : 4})}}
                className   = "round ml-1" 
            >
                Cabang Kejaksaan Negeri
            </Button.Ripple>

        </Fragment>
    )
}

export default CategoryWorkunit