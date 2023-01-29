import { useEffect, useState } from "react";
import { createContext } from "react";
import CustomToast from "../components/widgets/custom-toast";
import UserManagementApi from "../services/pages/configuration/user-management";
import userManagementAPI from "../services/pages/configuration/user-management/UserManagement";


const EmployeeContext = createContext(null)

const EmployeeProvider = ({ children }) => {
    const [leader, setLeader]                   = useState(null);
    const [employees, setEmployees]             = useState([])
    const [employeesList, setEmployeesList]     = useState(null);
    const [employeesFilter, setEmployessFilter] = useState(null);

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

    const getEmployeesWithKeyword = (keyword) => {

        setEmployessFilter(null);

        const params = {
            limit  : 20,
            keyword : keyword
        }

        userManagementAPI.getUserManagement(params).then(
            res => {
                if(!res.is_error){
                    if(res.data.employee != null){
                        setEmployessFilter(res.data.employee);
                    }else{
                        setEmployessFilter([]);
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
            getEmployeesWithKeyword();
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
            setEmployeesList,

            employeesFilter,
            setEmployessFilter,
            
            getEmployeesWithKeyword,
        }}>{children}</EmployeeContext.Provider>

}

export { EmployeeContext, EmployeeProvider }