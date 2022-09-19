import { Post }     from "../../core/request";
import { authURL }  from "./url";


const loginUser     = (data, otp) => otp == undefined ? 
                    Post(`${authURL.authPrefix}/${authURL.authLogin}`, data) :
                    Post(`${authURL.authPrefix}/${authURL.authLogin}?otp=${otp}`, data);


const authAPI = {
    loginUser
};

export default authAPI;