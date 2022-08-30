import FetchServices from "../../../core/Axios"


const Create = ({ data, onSuccess, onFail, params }) => {
    var datas = {
        name: data.name,
        sequence: 1,
        position_type: data.position_type,
        description: data.description,
        parent_id: data.parent_id ? parseInt(data.parent_id) : null,
        workunit_level_id : data.workunit_level_id,
        sector_id : data.sector_id
    }

    new FetchServices().post("employee-biodata/position/create", datas, params)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}

export { Create }