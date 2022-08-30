
import React, { useEffect, useState } from 'react'
import { Col, CustomInput, FormGroup, Input, Label, Row } from 'reactstrap'
import ContainerFluid from '../fluid'

export const AxisComponent = (props)=>{

    const {
        title,
        lineID,
        labelId,
        onChangeJudul,

        axisNode,
        axisTitle,
        axisLabel
    }                       = props;

    const [line,setLine]              = useState(null);
    const [text,setText]              = useState("");
    const [label,setLabel]            = useState(false);

    useEffect(() => {
        if(axisNode != undefined){
            setText(axisTitle);
            setLine(axisNode);
            setLabel(axisLabel);
        }
    },[]);
    
    return (
        <ContainerFluid>
            <FormGroup>
                <strong>{title}</strong>
                <FormGroup>
                    <Label>Judul</Label>
                    <Input 
                        value    = {text}
                        onChange = {(e) => {
                            const { target : {value}} = e;
                            setText(value);
                            const options = {
                                display : line,
                                title   : {
                                    display : label,
                                    text    : value,
                                }
                            }
                            onChangeJudul(options)
                        }}
                    />
                </FormGroup>
                <Row>
                    <Col>
                        <Label>Garis</Label>
                        <CustomInput
                            id          = {lineID}
                            type        = "switch"
                            label       = {line == null ? "Ya" : "Tidak"}
                            checked     = {line == null ? true : line}
                            onChange    = {(e) => {
                                const {target : {checked : isChecked}} = e;

                                let options = {
                                    display : line,
                                    title   : {
                                        text    : text,
                                        display : label,
                                    }
                                }

                                if(isChecked){
                                    options.display = true;
                                    setLine(true);
                                }else{
                                    options.display = false;
                                    setLine(false);
                                }
                                
                                onChangeJudul(options)
                            }}
                            />
                    </Col>
                    <Col>
                        <Label>Label</Label>
                        <CustomInput
                            id          = {labelId}
                            type        = "switch"
                            label       = {label?"Ya":"Tidak"}
                            checked     = {label == null ? true : label}
                            onChange    = {(e) => {
                                const {target : {checked : isChecked}} = e;
                                
                                let options = {
                                    display : line,
                                    title   : {
                                        display : label,
                                        text    : text,
                                    }
                                }

                                if(isChecked){
                                    options.title.display = true;
                                    setLabel(true)
                                }else{
                                    options.title.display = false;
                                    setLabel(false)
                                }
                                
                                onChangeJudul(options);
                            }}
                            />
                    </Col>
                </Row>
            </FormGroup>
        </ContainerFluid>
    )

}