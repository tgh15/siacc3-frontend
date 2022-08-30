import React from 'react'

import { selectThemeColors } from '@utils'

import Select from 'react-select'

export default (props)=>{
    let inv="";
    if(props.isInvalid!==null){
        inv="is-invalid"
    }
    const {dataSource,multi} = props
    if(multi||multi==undefined){
        return <Select
            {...props}
            isClearable={true}
            theme={selectThemeColors}
            isMulti
            name='colors'
            options={dataSource}
            className={`react-select ${inv}`}
            classNamePrefix='select'
        />

    }else{
        return <Select
            {...props}
            isClearable={true}
            theme={selectThemeColors}
            
            name='colors'
            options={dataSource}
            className={`react-select ${inv}`}
            classNamePrefix='select'
        />
    }
}


