import { createContext, useEffect, useState } from "react"
import UserManagementApi from "../services/pages/configuration/user-management"
import { workunitAPI } from "../services/pages/configuration/workunit"
import SelectOptionsService from "../services/pages/select-options"

const UserManagementContext = createContext(null)

const UserManagementProvider = ({ children }) => {

    const [filter, setFilter]                   = useState(false)
    const [listData, setListData]               = useState(false)
    const [pagination, setPagination]           = useState(false)
    const [dataSelected, setDataSelected]       = useState(false)
    const [deviceSelected, setDeviceSelected]   = useState({})
    const [workunitOptions, setWorkunitOptions] = useState([])
    
    const getWorkunitOptions = () => {


        let data    = [];

        workunitAPI.getWorkunitLevelList({workunit_level_id : 1}).then(
            res => {
                if(res.data.length > 0){

                    res.data.map((val) => (
                        data.push({
                            label : val.name,
                            value : val.id,
                            workunit_level_id : val.workunit_level_id
                        })
                    ))
                }
            },
            err => {
                console.log(err, 'disini');
            }
        )

        workunitAPI.getWorkunitLevelList({workunit_level_id : 2}).then(
            res => {
                if(res.data.length > 0){
                    res.data.map((val) => (
                        data.push({
                            label : val.name,
                            value : val.id,
                            workunit_level_id : val.workunit_level_id
                        })
                    ))
                }
            },
            err => {
                console.log(err, 'disini');
            }
        )
        workunitAPI.getWorkunitLevelList({workunit_level_id : 3}).then(
            res => {
                if(res.data.length > 0){
                    res.data.map((val) => (
                        data.push({
                            label : val.name,
                            value : val.id,
                            workunit_level_id : val.workunit_level_id
                        })
                    ))
                }
            },
            err => {
                console.log(err, 'disini');
            }
        )

        workunitAPI.getWorkunitLevelList({workunit_level_id : 4}).then(
            res => {
                if(res.data.length > 0){
                    res.data.map((val) => (
                        data.push({
                            label : val.name,
                            value : val.id,
                            workunit_level_id : val.workunit_level_id
                        })
                    ))
                }
            },
            err => {
                console.log(err, 'disini');
            }
        )
        setWorkunitOptions(data)
    }

    const getData = ({ page, params }) => {
        setFilter(false)
        setListData(false);
        UserManagementApi.get({
            params: params,
            page: page,
            onSuccess: (res) => {
                setFilter(false)
                setListData(res.employee);
                setPagination(res.pagination);
            }, onFail: (err) => {
                console.log(err, 'disini juga error');
            }
        })
    }

    useEffect(() => {
        getData({ page: 1 })
    }, []);

    useEffect(() => {
        getWorkunitOptions()
    }, [])

    return <UserManagementContext.Provider
        value={{
            listData,
            setListData,
            pagination,
            setPagination,
            dataSelected,
            setDataSelected,
            getData,
            workunitOptions,
            deviceSelected,
            setDeviceSelected,
            filter,
            setFilter
        }}
    > {children}</UserManagementContext.Provider>
}

export { UserManagementContext, UserManagementProvider }