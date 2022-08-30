
function ToSelectValue(data){
    if(!Array.isArray(data)) return[]

    let wu = [];
    data.map(val=>{
        wu.push({
            value:val.id,
            label:val.name
        })
    });
    return wu;
}

function ViewAll(data){
    if(!Array.isArray(data)) return[]

    let wu = [{id:"all",name:"Semua"}];
    data.map(val=>{
        wu.push(val)
    })
    return wu;
}

export default {
    toSelectVal:ToSelectValue,
    toViewAll:ViewAll,
}