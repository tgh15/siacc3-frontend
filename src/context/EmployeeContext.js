import { useEffect, useState } from "react";
import { createContext } from "react";
import CustomToast from "../components/widgets/custom-toast";
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
                    }else{
                        setEmployees([]);
                        setEmployeesList([]);
                    }
                }else{
                    CustomToast('danger', 'Terjadi Kesalahan.');
                }
            },
            err => {
                CustomToast('danger', 'Terjadi Kesalahan.');
                console.log(err, 'console log error');
            }
        )
    
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