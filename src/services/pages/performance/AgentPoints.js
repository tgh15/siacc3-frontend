import CustomToast from "../../../components/widgets/custom-toast";
import FetchServices from "../../core/Axios"


const AgentPoints = ({page, formData, onSuccess, onFail }) => {

    const params = {
        is_paginate :true,
        page : page
    }

    new FetchServices().post("feeds/agent-points", formData, params)
        .then(res => {
            if(!res.is_error){
                if (res.data.log_points != null) {
                    const groups = res.data.log_points.reduce((groups, data) => {
                        const date = data.created_at.split('T')[0];
                        if (!groups[date]) {
                            groups[date] = [];
                        }
                        groups[date].push(data);
                        return groups;
                    }, {});
    
                    const groupArrays = Object.keys(groups).map((date) => {
                        return {
                            date,
                            data: groups[date]
                        };
                    });
    
                    const result = {
                        data        : groupArrays,
                        pagination  : res.data.pagination
                    }
                    onSuccess(result)
                }else{
                    onSuccess({
                        data        : [],
                        pagination  : res.data.pagination
                    })
                }
            }else{
                CustomToast('danger', res.message);
            }
        }).catch(err => {
            onFail(err)
        })
}

export { AgentPoints }