import React, { Fragment } from 'react'


export const FeedsFilterCustomModals=({children,show,setShow})=>{
    return(
        <Fragment>
            <ModalBase show={show} setShow={setShow}>
                {children}
            </ModalBase>
        </Fragment>
        
        )    
}