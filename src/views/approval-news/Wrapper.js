import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'

import { BottomPersetujuan } from '../../components/widgets/persetujuan-berita'

export const WrapperDataState = ({listdata,typeData})=>{
    const [lists,setLists] = useState({genap:null,ganjil:null})

    function dataProcessinState(param) {
        if(Array.isArray(param)){
            let genap = param.map((list,key)=>{
                
                    if(key%2===0){
                        return  <BottomPersetujuan 
                        data         = {list} 
                        key          = {`perset-lists-${list.id}`}/>

                    }
                
            })
            let ganjil = param.map((list,key)=>{
                
                    if(key%2!==0){
                        return  <BottomPersetujuan 
                        data         = {list} 
                        key          = {`perset-lists-${list.id}`}/>

                    }
                
            })
            return{
                genap:genap,
                ganjil:ganjil,
            }
        }
        return{
            genap:null,
            ganjil:null,
        }
    }
    
    useEffect(()=>{

        setLists(dataProcessinState(listdata))
        
    },[listdata])
return (
    <Row>
        <Col md={6} sm={12} lg={6} >
            {lists.genap}
        </Col>
        <Col md={6} sm={12} lg={6} >
            {lists.ganjil}
        </Col>
    </Row>
)
}

