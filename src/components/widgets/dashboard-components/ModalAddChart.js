import React, {useState }                               from 'react'
import { Row }     from 'reactstrap'
import ContainerFluid                                   from '../fluid'
import SelectChart                                      from './SelectChart'
import SelectGrid                                       from './SelectGrid'

export const ModalAddChart = (props) =>{ 

    const {handleFinish}                        = props;

    const [gridItem, setGridItem]               = useState([]);
    const [isGridSelected, setIsGridSelected]   = useState(false);

    const unselect = () => {
        setIsGridSelected(false);
    };
    
    return(
        <Row>
            <ContainerFluid>
                {
                    !isGridSelected ?
                        <SelectGrid
                            setGridItem         = {setGridItem}
                            setIsGridSelected   = {setIsGridSelected}
                        />
                    :   
                        <SelectChart 
                            gridItem            = {gridItem} 
                            unSelected          = {unselect} 
                            setGridItem         = {setGridItem}
                            handleFinish        = {handleFinish}
                            setIsGridSelected   = {setIsGridSelected}
                        />
                }
            </ContainerFluid>
        </Row>
    )
}