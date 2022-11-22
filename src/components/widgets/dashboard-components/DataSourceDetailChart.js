import React, {Fragment, useContext, useState}      from 'react'
import { FormGroup, Label }                         from 'reactstrap'
import { CustomSelect }                             from '../custom-select'
import Select                                       from 'react-select'
import { PerformanceContext }                       from '../../../context/PerformanceContext'
import { selectThemeColors }                        from '@utils'


export const DatasourceDetailChart = (props)=>{


    const {
        selectedWorkunit,
        setSelectedWorkunit     ,
        selectedWorkunitLevel   ,
        setSelectedWorkunitLevel,
        selectedPeriod,
        setSelectedPeriod
    }                       = props

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

    const {
        workunitLevel1,
        workunitLevel2,
        workunitLevel3,
        workunitLevel4 
    }                                                       = useContext(PerformanceContext);

    return(
        <Fragment>
            <FormGroup>
                <Label>Sumber Data</Label>                                
                <Select 
                    multi            = {false} 
                    value            = {props.selectedDataSource}
                    theme            = {selectThemeColors}
                    options          = {props.chartSource} 
                    onChange         = {(e) => {props.setSelectedDataSource(e)}}
                    className        = 'react-select'
                    classNamePrefix  = 'select'
                />
            </FormGroup>
            {
                (props.nameChart && props.nameChart === 'line') &&
                    <>
                        <FormGroup>
                            <Label>Tingkat Satuan Kerja</Label>                                
                            <Select 
                                multi       = {false} 
                                options     = {[
                                    {value: 1   , label : 'Kejaksaan Agung'},
                                    {value: 2   , label : 'Kejaksaan Tinggi'},
                                    {value: 3   , label : 'Kejaksaan Negeri'},
                                    {value: 4   , label : 'Cabang Kejaksaan Negeri'},
                                ]} 
                                onChange            = {(e)=>{setSelectedWorkunitLevel(e)}}
                                theme               = {selectThemeColors}
                                className           = 'react-select'
                                classNamePrefix     = 'select'
                                value               = {selectedWorkunitLevel}
                            />
                        </FormGroup>
                        {
                            selectedWorkunitLevel != null &&
                            <FormGroup>
                                <Label>Satuan Kerja</Label>                                
                                <Select 
                                    isMulti     = {true} 
                                    options     = {
                                        selectedWorkunitLevel.value === 1 ?
                                            workunitLevel1
                                        :   
                                            selectedWorkunitLevel.value === 2 ?
                                                workunitLevel2
                                            :
                                                selectedWorkunitLevel.value === 3 ?
                                                    workunitLevel3
                                                :
                                                    selectedWorkunitLevel.value === 4 ?
                                                        workunitLevel4
                                                    :
                                                        null
                                    } 
                                    onChange            = {(e)=>{setSelectedWorkunit(e);}}
                                    isOptionDisabled    = {() => selectedWorkunit.length > 4} 
                                    theme               = {selectThemeColors}
                                    className           = 'react-select'
                                    classNamePrefix     = 'select'
                                    closeMenuOnSelecte  = {false}
                                    value               = {selectedWorkunit}
                                />
                            </FormGroup>
                        }
                        <FormGroup>
                            <Label>Periode</Label>                                
                            <Select 
                                multi       = {false} 
                                options     = {[
                                    {value: 'daily'   , label : 'Harian'},
                                    {value: 'weekly'   , label : 'Mingguan'},
                                    {value: 'monthly'   , label : 'Bulanan'},
                                ]} 
                                onChange            = {(e)=>{setSelectedPeriod(e)}}
                                value               = {selectedPeriod}
                                theme               = {selectThemeColors}
                                className           = 'react-select'
                                classNamePrefix     = 'select'
                            />
                        </FormGroup>
                    </>

            }
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