export const MAPBOX_SKIN     = "mapbox://styles/zephyrfn/ckra22zgd4uh517m5plawan4p"
export const API_MAPBOX      = "pk.eyJ1IjoiemVwaHlyZm4iLCJhIjoiY2trNzI5bWN1MDlubDJ1cW94Z3hicm9qdCJ9.HPNjaaL1I5rkMdSg1AJf5g"

export const getTemplateArea = (area)=>{

    const REACT_GEO  = "geocoding/v5/mapbox.places/LOCATION_NAME.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN"
    
    let data = REACT_GEO.replace(/LOCATION_NAME|YOUR_MAPBOX_ACCESS_TOKEN/g,(match)=>{
        const LOCATE = {
            LOCATION_NAME               : area,
            YOUR_MAPBOX_ACCESS_TOKEN    : API_MAPBOX,
        }
        return LOCATE[match]
    })
    return data
}