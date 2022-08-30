import FetchServices from "../../../core/Axios"


const Update = ({ id, data, onSuccess, onFail, params }) => {
    var datas = {
        id : id,
        name: data.name,
        sequence: 1,
        position_type: data.position_type,
        description: data.description,
        parent_id: data.parent_id ? parseInt(data.parent_id) : null,
        workunit_level_id : data.workunit_level_id,
        sector_id : data.sector_id
    }

    new FetchServices().put("employee-biodata/position/update", datas, params)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}

export { Update }