import React,{Fragment} from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Card } from 'reactstrap';
import CardBody from 'reactstrap/lib/CardBody';

const CardProcess=({text,display})=>{
    const [dsp,setDsp] = useState(null)
    useEffect(()=>{
        if(dsp==null){
            setDsp(display?"visible":"none")
        }
    })
    const style = {
        position:"fixed",
        display:dsp,
        zIndex:9999999,
        bottom:10,
        padding:"0.7em",
        left:"50%",
        alignSelf:"center"
    }
    
    return(
    <Card style={style}>
        {text}
    </Card>
    )
}

export default CardProcess;