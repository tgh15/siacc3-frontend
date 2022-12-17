import React, {Fragment, useContext, useEffect}                from 'react'
import { FormGroup, Label }                         from 'reactstrap'
import { CustomSelect }                             from '../custom-select'
import Select                                       from 'react-select'
import { PerformanceContext }                       from '../../../context/PerformanceContext'
import { selectThemeColors }                        from '@utils'
import { useState } from 'react'


export const DatasourceDetailChart = (props)=>{
    const {
        width,
        isNews,
        widthSet,
        setIsNews,
        nameChart,
        chartSource,
        selectedPeriod,
        chartSourceList,
        selectedWorkunit,
        setSelectedPeriod,
        selectedDataSource,
        setSelectedWorkunit,
        setSelectedDataSource,
        selectedWorkunitLevel,
        setSelectedWorkunitLevel,
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


    const checkSource = (val) => {
        let data_ = chartSourceList.filter((data) => (
            data.name === nameChart
        ))

        let selected = data_[0].apis.filter((data) => data.type === val.value);
        if(selected[0].kind === "berita"){
            setIsNews(true);
        }else{
            setIsNews(false);
        }
    }

    useEffect(() => {
        if(selectedDataSource != null){
            checkSource(selectedDataSource);
        }
        console.log(selectedDataSource)
    }, [selectedDataSource]);

    return(
        <Fragment>
            <FormGroup>
                <Label>Sumber Data</Label>                                
                <Select 
                    multi            = {false} 
                    value            = {selectedDataSource}
                    theme            = {selectThemeColors}
                    options          = {chartSource} 
                    onChange         = {(e) => {setSelectedDataSource(e); checkSource(e)}}
                    className        = 'react-select'
                    classNamePrefix  = 'select'
                />
            </FormGroup>
            {
                (isNews) &&
                    <>
                        <FormGroup>
                            <Label>Tingkat Satuan Kerja</Label>                                
                            <Select 
                                multi       = {false} 
                                options     = {[
                                    {value: 0   , label : 'Semua Satuan Kerja'},
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
                            (selectedWorkunitLevel != null && selectedWorkunitLevel.value != 0) &&
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
                                                selectedWorkunitLevel.value === 3?
                                                    workunitLevel3
                                                :
                                                    selectedWorkunitLevel.value === 4 ?
                                                        workunitLevel4
                                                    :
                                                        null
                                                      
                                    } 
                                    onChange            = {(e)=>{
                                        setSelectedWorkunit(e);
                                    }}
                                    isOptionDisabled    = {() => { return nameChart === 'map' ? selectedWorkunit.length > 40 : selectedWorkunit.length > 4}} 
                                    theme               = {selectThemeColors}
                                    className           = 'react-select'
                                    classNamePrefix     = 'select'
                                    closeMenuOnSelect   = {false}
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
                    value       = {width}
                    onChange    = {(e)=>{widthSet(e)}}
                    dataSource  = {ds.chartSize} 
                />
            </FormGroup>
        </Fragment>
    )
}