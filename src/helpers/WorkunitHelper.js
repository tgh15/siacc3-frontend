function UnitToSelectValue(workunit){
    if(!Array.isArray(workunit)) return[]

    let wu = [{value:"all",label:"Semua Wilayah"}] 
    workunit.map(val=>{
        wu.push({
            value:val.id,
            label:val.name
        })
    })
    return wu
}


export default {
    unitToSelectVal:UnitToSelectValue,
}