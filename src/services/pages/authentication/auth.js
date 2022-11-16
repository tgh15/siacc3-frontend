import { Get, Post, Put }     from "../../core/request";
import { authURL }            from "./url";


//Get
const getQrcode      = () => Get(`${authURL.authPrefix}/${authURL.authLogin}/${authURL.authQrcode}/${authURL.authNew}`);
const getUserByToken = (token) => Get(`${authURL.authPrefix}/${authURL.authUser}/${authURL.authPassword}?forget=${token}`);

//Post
const loginUser      = (data, params) => Post(`${authURL.authPrefix}/${authURL.authLogin}`, data, params)
const loginByQrcode  = (data) => Post(`${authURL.authPrefix}/${authURL.authLogin}/${authURL.authQrcode}`, data);
const forgotPassword = (data) => Post(`${authURL.authPrefix}/${authURL.authUser}/${authURL.authPassword}`, data);

//Put
const changePassword = (data) => Put(`${authURL.authPrefix}/${authURL.authUser}/${authURL.authPassword}`, data);

const authAPI = {
    getQrcode,
    loginUser,
    loginByQrcode,
    getUserByToken,
    forgotPassword,
    changePassword,
};

export default authAPI;