
import React from 'react'

import {Alert} from  'reactstrap'

export default function MyAlert({text,onClose,header}){
   

    const close = (
            <button onClick={()=>{
                onClose()
            }} type='button' className='ml-1 close'>
                <span>×</span>
            </button>
        )
     return(
        <Alert onClick={onClose} color='warning'>
            <h4 className='alert-heading'>{header}</h4>
            <div className='alert-body'>{text}</div>
        </Alert>
     )   
}