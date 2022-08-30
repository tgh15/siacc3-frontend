

import React,{Fragment, useRef, useState} from 'react'
import CustomInput from 'reactstrap/lib/CustomInput';
import RowAvatarWidget from '../rw-avatar';

const CheckboxLeader=(props)=>{
    
    const [check,setCheck] = useState(false)
    return(<Fragment>
        <div onClick={()=>{
            let e={
                target:{
                    checked:!check
                }
            }
            props.handlerCheck(e,props.data)
            setCheck(!check)
        }} className="d-flex justify-content-between cursor-pointer" style={{marginTop:"1em",marginBotton:"1em"}}>
            <div className="d-flex justify-content-start align-items-center">
                <RowAvatarWidget/>
                <span>{props.data.name}</span>
            </div>
            <div className="text-right">
            <CustomInput checked={check} inline type='checkbox' id={`chk-${props.data.id}`} onChange={(e)=>{
                console.log(e)
                props.handlerCheck(e,props.data)}} />
            </div>
        </div>
    </Fragment>)
}

export default CheckboxLeader;