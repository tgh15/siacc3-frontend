import FetchServices from "../../core/Axios";

const AuthGroup = ({  onSuccess, onFail }) => {
    const service = new FetchServices();
    service.get("auth/groups").then(res => {
        var datas = [];
        res.data.data.result.map((data, i) => {
            datas.push({ "key": i, "label": data.name, "value": data.id });
        })
        onSuccess(datas)
    }).catch(err => {
        onFail(err)
    })
}

const AuthGroupList = ({  onSuccess, onFail }) => {
    const service = new FetchServices();
    service.get("auth/groups?show_all=true").then(res => {
        var datas = [];
        res.data.data.result.map((data, i) => {
            if(localStorage.getItem('role') === 'Verifikator Daerah' || localStorage.getItem('role') === 'Admin Daerah'){
                if(data.title === 'admin-daerah' || data.title === 'verifikator-daerah' || data.title === 'pimpinan-daerah' || data.title === 'agen'){
                    datas.push({ "key": i, "label": data.name, "value": data.id });
                }
            }else{
                datas.push({ "key": i, "label": data.name, "value": data.id });
            }
        })
        onSuccess(datas)
    }).catch(err => {
        onFail(err)
    })
}

export { AuthGroup, AuthGroupList }