import FetchServices from "../../../core/Axios"


const Update = ({id,data,onSuccess,onFail, params}) => {
    var datas = {
        id : parseInt(id),
        workunit_level_id: 2,
        is_assisten: parseInt(data.is_assisten),
        name: data.name,
        description: data.description,
        parent_id: parseInt(data.parent_id)
    }

    new FetchServices().put("employee-biodata/sector/update",datas, params)
    .then(response=>{
        onSuccess(response.data)
    }).catch(err=>{
        onFail(err.data.message)
    })
}

export {Update}