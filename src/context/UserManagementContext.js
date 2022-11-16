import { createContext, useEffect, useState }   from "react";

//Services
import { workunitAPI }                          from "../services/pages/configuration/workunit";
import userManagementAPI                        from "../services/pages/configuration/user-management/UserManagement";

//Components
import CustomToast                              from "../components/widgets/custom-toast";

//Context
const UserManagementContext  = createContext(null);


const UserManagementProvider = ({ children }) => {
    //State
    const [filter, setFilter]                   = useState(false);
    const [listData, setListData]               = useState(false);
    const [pagination, setPagination]           = useState(false);
    const [dataSelected, setDataSelected]       = useState(false);
    const [deviceSelected, setDeviceSelected]   = useState({});
    const [workunitOptions, setWorkunitOptions] = useState([]);
    
    const getWorkunitOptions = () => {
        let data    = [];

        workunitAPI.getWorkunitLevelList({workunit_level_id : 1}).then(
            res => {
                if(!res.is_error && res.data.length > 0){

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
                if(!res.is_error && res.data.length > 0){
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
                if(!res.is_error && res.data.length > 0){
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
                if(!res.is_error && res.data.length > 0){
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
        setWorkunitOptions(data);
    };

    //Get data employee (user management)
    const getData = (params) => {
        setFilter(false);
        setListData(false);

        userManagementAPI.getUserManagement(params).then(
            res => {
                if (!res.is_error) {
                    setFilter(false);
                    setListData(res.data.employee);
                    setPagination(res.data.pagination);
                }else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    useEffect(() => {
        getData({ page: 1 });
    }, []);

    useEffect(() => {
        getWorkunitOptions();
    }, []);

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