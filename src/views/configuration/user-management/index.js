import { PerformanceProvider } from "../../../context/PerformanceContext";
import { UserManagementProvider }   from "../../../context/UserManagementContext";
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