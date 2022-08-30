import FetchServices from "../../../core/Axios"


const Create = ({ data, onSuccess, onFail, params }) => {
    var datas = {
        workunit_level_id: 2,
        is_assisten: parseInt(data.is_assisten),
        name: data.name,
        description: data.description,
        parent_id: parseInt(data.parent_id)
    }

    new FetchServices().post("employee-biodata/sector/create", datas, params)
        .then(response => {
            onSuccess(response.data)
        }).catch(err => {
            onFail(err)
        })
}

export { Create }