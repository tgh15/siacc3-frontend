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
            <Button.Ripple color="primary" onClick={ () => {getDataWorkunit({ workunit_level_id : 0})}} outline={workunitLevel == 0 ? false : true} className="round" size="sm">
                Semua 
            </Button.Ripple>
            <Button.Ripple 
                        color="primary" 
                        outline={workunitLevel == 1 ? false : true}  
                        className="round ml-1" 
                        size="sm"
                        onClick={() => {getDataWorkunit({ workunit_level_id : 1})}}>
                Kejaksaan Agung
            </Button.Ripple>
            <Button.Ripple 
                        color="primary" 
                        outline={workunitLevel == 2 ? false : true} 
                        className="round ml-1" 
                        size="sm"
                        onClick={() => {getDataWorkunit({ workunit_level_id : 2})}}>
                Kejaksaan Tinggi
            </Button.Ripple>
            <Button.Ripple 
                        color="primary" 
                        outline={workunitLevel == 3 ? false : true} 
                        className="round ml-1" 
                        size="sm"
                        onClick={() => {getDataWorkunit({ workunit_level_id : 3})}}>
                Kejaksaan Negeri
            </Button.Ripple>
            <Button.Ripple 
                        color="primary" 
                        outline={workunitLevel == 4 ? false : true} 
                        className="round ml-1" 
                        size="sm"
                        onClick={() => {getDataWorkunit({ workunit_level_id : 4})}}>
                Cabang Kejaksaan Negeri
            </Button.Ripple>

        </Fragment>
    )
}

export default CategoryWorkunit