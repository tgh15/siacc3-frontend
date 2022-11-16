import { useEffect, useState } from "react";
import { createContext } from "react";
import UserManagementApi from "../services/pages/configuration/user-management";
import userManagementAPI from "../services/pages/configuration/user-management/UserManagement";


const EmployeeContext = createContext(null)

const EmployeeProvider = ({ children }) => {
    const [leader, setLeader]               = useState(null);
    const [employees, setEmployees]         = useState([])
    const [employeesList, setEmployeesList] = useState(null);

    const getEmployees = () => {

        userManagementAPI.getUserManagementList().then(
            res => {
                if(!res.is_error){
                    if(res.data != null){
                        setEmployees(res.data);
                        setEmployeesList(res.data.map((data) => ({label : data.name, value : data.id})) )
                    }
                }
                console.log(res, 'get user management')
            },
            err => {
                console.log(err, 'console log error');
            }
        )
        
        // UserManagementApi.list({
        //     onSuccess: (res) => {

        //         setEmployees(res)

        //         let data_ = [];
        //         res.map((data) => (
        //             data_.push({
        //                 label : data.name,
        //                 value : data.id
        //             })
        //         ))

        //         setEmployeesList(data_);
                
        //     },
        //     onFail: (err) => {
        //         console.log(err)
        //     }
        // })
    }

    const getLeader = () => {
        UserManagementApi.leaderList({
            onSuccess: (res) => {
                setLeader(res);
                
            },
            onFail: (err) => {
                console.log(err)
            }
        })
    }

    useEffect(() => {
        if (localStorage.getItem("userData")) {
            getEmployees();
            getLeader();
        }

        return(() => {
            setEmployees([]);
        })
    }, [])

    return <EmployeeContext.Provider
        value={{
            employees,
            setEmployees,
            leader,
            setLeader,
            employeesList,
            setEmployeesList
        }}>{children}</EmployeeContext.Provider>

}

export { EmployeeContext, EmployeeProvider }