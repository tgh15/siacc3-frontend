import React, {Fragment}        from 'react'
import Select                   from 'react-select'
import { FormGroup, Label }     from 'reactstrap'
import { CustomSelect }         from '../custom-select'

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
                    value       = {props.selectedDataSource}
                    options     = {props.chartSource} 
                    onChange    = {(e)=>{props.setSelectedDataSource(e)}}
                />
            </FormGroup>
            <FormGroup>
                <Label>Tingkat Satuan Kerja</Label>                                
                <Select 
                    multi       = {false} 
                    value       = {props.selectedDataSource}
                    options     = {props.chartSource} 
                    onChange    = {(e)=>{props.setSelectedDataSource(e)}}
                />
            </FormGroup>
            <FormGroup>
                <Label>Satuan Kerja</Label>                                
                <Select 
                    multi       = {false} 
                    value       = {props.selectedDataSource}
                    options     = {props.chartSource} 
                    onChange    = {(e)=>{props.setSelectedDataSource(e)}}
                />
            </FormGroup>
            <FormGroup>
                <Label>Ukuran Chart</Label>                                
                <CustomSelect 
                    multi       = {false} 
                    value       = {props.width}
                    onChange    = {(e)=> {props.widthSet(e)}}
                    dataSource  = {ds.chartSize} 
                />
            </FormGroup>
        </Fragment>
    )
}