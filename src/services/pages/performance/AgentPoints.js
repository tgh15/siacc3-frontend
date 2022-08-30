import FetchServices from "../../core/Axios"


const AgentPoints = ({page, formData, onSuccess, onFail }) => {

    const params ={
        is_paginate :true,
        limit : 20,
        page : page
    }

    new FetchServices().post("feeds/agent-points", formData, params)
        .then(res => {
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
        }).catch(err => {
            onFail(err)
        })
}

export { AgentPoints }