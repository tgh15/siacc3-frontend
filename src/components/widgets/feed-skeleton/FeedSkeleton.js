import React, { Fragment }  from 'react';

import  Skeleton            from 'react-loading-skeleton';
import { FormGroup }        from 'reactstrap';
import ContainerFluid       from '../fluid';


const FeedSkeleton = ({count}) => {
    const getArrCount = (count_arr) => {
        let arrs = []
        for(let i=1; i<=count_arr; i++) arrs.push(1);
        return arrs
    }
    const arrCount = count == undefined ? getArrCount(1) : getArrCount(count);
    return (
        <Fragment>
            {
                arrCount.map((e, index) => {
                    return (
                        <ContainerFluid 
                            key   = {`arr-skeleton-index${index}`} 
                            style = {{marginTop:"3em", marginBottom:"3em"}}
                        >
                            <ContainerFluid>
                                <FormGroup>
                                    <div className="d-flex justify-content-start">
                                        <Skeleton style={{borderRadius:50, width:32, height:32}}/>
                                        <ContainerFluid>
                                            <Skeleton style={{width:"50%"}}/>
                                            <Skeleton style={{width:"20%"}}/>
                                        </ContainerFluid>
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Skeleton style={{width:"20%", height:"1em", marginBottom:"1em"}}/>
                                    <Skeleton style={{height:"5em"}}/>
                                </FormGroup>
                            </ContainerFluid>
                        </ContainerFluid>
                    )
                })
            }
        </Fragment>
    )
}

export default FeedSkeleton;