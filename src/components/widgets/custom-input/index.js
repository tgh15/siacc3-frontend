import {  useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { selectThemeColors } from '@utils'
import Select from 'react-select'


const PickerRange = (props) => {
  const [picker, setPicker] = useState(new Date())
  return (
    
      <Flatpickr
        {...props}
        value     = {picker}
        id        = 'range-picker'
        className = 'form-control'
        onChange  = {
          date => {
            setPicker(date)
            props.onChange(date)
          }
        }
        options = {{
          mode        : 'range',
          defaultDate : ['2020-02-01', '2020-02-15']
        }}
      />
  )
}


export const CustomSelect = ({options,name,onChange,placeholder, value}) => {

  let sat = options.map(v=>{
    return {
      ...v,
      color:'#00B8D9'
    }
  })
  
  return (
    <Select 
      name            = {name}
      value           = {value}
      theme           = {selectThemeColors}
      options         = {sat}
      isMulti
      onChange        = {(e)=>{onChange(e)}}
      className       = 'react-select'
      placeholder     = {placeholder}
      classNamePrefix = 'select'
    />
  )
}

export  {PickerRange}
