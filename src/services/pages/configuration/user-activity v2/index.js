import { Get}  from "../../../core/request";

const getUserActivity = (param) => Get(`api-gw/activities`, param);

const UserActivityAPI = {

    getUserActivity
    
}
export default UserActivityAPI