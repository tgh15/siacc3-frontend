//Context
import { PerformanceProvider }      from "../../../context/PerformanceContext";
import { UserManagementProvider }   from "../../../context/UserManagementContext";

//Components
import UserManagement               from "./UserManagement";


const UserManagementContainer = () => {
    return (
        <PerformanceProvider>
            <UserManagementProvider>
                <UserManagement/>
            </UserManagementProvider>
        </PerformanceProvider>
    );
};

export default UserManagementContainer;