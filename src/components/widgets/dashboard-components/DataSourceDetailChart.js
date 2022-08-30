import React,{Fragment, useEffect}         from 'react'
import { FormGroup, Label }     from 'reactstrap'
import { CustomSelect }         from '../custom-select'
import Select                   from 'react-select'

export const DatasourceDetailChart = (props)=>{

    const ds = {
        datasource  : [],
        chartSize   : [
            {
                value   : "12",
                label   : "Besar"
            },
            {
                value   : "6",
                label   : "Cukup Besar"
            },
            {
                value   : "4",
                label   : "Sedang"
            },
            {
                value   : "3",
                label   : "Kecil"
            },
            {
                value   : "2",
                label   : "Sangat Kecil",
            }
        ]
    }


    return(
        <Fragment>
            <FormGroup>
                <Label>Sumber Data</Label>                                
                <Select 
                    multi       = {false} 
                    options     = {props.chartSource} 
                    onChange    = {(e)=>{
                        props.setSelectedDataSource(e)
                    }}
                    value       = {props.selectedDataSource}
                />
            </FormGroup>
            <FormGroup>
                <Label>Ukuran Chart</Label>                                
                <CustomSelect 
                    multi       = {false} 
                    dataSource  = {ds.chartSize} 
                    onChange    = {(e)=>{
                        props.widthSet(e)
                    }}
                    value       = {props.width}
                />
            </FormGroup>
        </Fragment>
    )
}