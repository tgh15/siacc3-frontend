import { authURL } from ".";
import { Get, Post, Put } from "../../core/request"



const getUserByToken = token => Get(`${authURL.authPrefix}/${authURL.user}/${authURL.password}?forget=${token}`);
const changePassword = data => Put(`${authURL.authPrefix}/${authURL.user}/${authURL.password}`, data);

const NewPasswordApi = {
    getUserByToken,
    changePassword
}

export default NewPasswordApi;