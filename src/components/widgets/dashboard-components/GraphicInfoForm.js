import React, { Fragment, useEffect, useState } from 'react'
import { Col, CustomInput, FormGroup, Input, Label, Row } from 'reactstrap';


export const GraphicInfoForm=(props)=>{

    const {
        title, 
        setTitle,
        setTooltips,
        setLegendary,
        legendActive, 
        tooltipsActive, 
    }       = props;

    const [legend,setLegend] = useState(false)
    const [toltip,setToltip] = useState(false)
    const [node,setNode]     = useState(false)




    useEffect(() => {
        if(legendActive == true){
            setLegend(true);
        }

        if(tooltipsActive == true){
            setToltip(true);
        }

        
    }, [legendActive])

    return(
    <Fragment>
        <FormGroup>
            <Label>Judul Grafik</Label>                                
            <Input placeholder="Judul..." value={title} onChange={(e)=>{
                const {value} = e.target;
                setTitle(value)
            }}/>
        </FormGroup>
        <FormGroup>
            <Label>Properti Grafik</Label>                                
            <Row>
                <Col>
                    <Label>Legend</Label>
                    <CustomInput
                        id       = "switch-legend"
                        type     = "switch"
                        label    = {legend?"Ya":"Tidak"}
                        checked  = {legend}
                        onChange = {(e)=>{
                            const {checked:isChecked} = e.target
                            if(isChecked){
                                setLegend(true)
                                setLegendary(true)
                            }else{
                                
                                setLegend(false)
                                setLegendary(false)
                            }
                        }}
                        />
                </Col>
                <Col>
                    <Label>Tooltip</Label>
                    <CustomInput
                        id       = "switch-tooltip"
                        type     = "switch"
                        label    = {toltip?"Ya":"Tidak"}
                        checked  = {toltip}
                        onChange = {(e)=>{
                            const {checked:isChecked} = e.target
                            if(isChecked){
                                setToltip(true)
                                setTooltips(true)
                            }else{
                                setToltip(false)
                                setTooltips(false)
                            }
                        }}
                        />
                </Col>
            </Row>
            
            <Row style={{marginTop:"1em"}}>
                <Col>
                    <Label>Titik di Garis</Label>
                    <CustomInput
                        id      = "switch-node"
                        type    = "switch"
                        label   = {node?"Ya":"Tidak"}
                        onChange= { (e) => {
                            const {checked:isChecked} = e.target

                            if(isChecked){
                                setNode(true)
                            }else{
                                setNode(false)
                            }
                        }}
                        />
                </Col>
                
            </Row>

        </FormGroup>
    </Fragment>
    )
}