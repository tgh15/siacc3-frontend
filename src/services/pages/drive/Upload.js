import FetchServices from "../../core/Axios";

const Upload = ({ file, dir, onSuccess, onFail, options }) => {
    console.log(file, 'files')
    const service = new FetchServices();
    let data = new FormData();

    if (file.length > 1) {
        for(let i = 0; i < file.length; i++){
            data.append("files[]", file[i]);
        }
    }else{
        data.append("files[]", file);
    }

    let url = (dir ? '?dir=' + dir : "")

    service.postMultipart(`drive${url}`, data, options).then(res => {
        onSuccess(res.data.data)
    }).catch(err => {
        onFail(err)
    })
}

export { Upload } 