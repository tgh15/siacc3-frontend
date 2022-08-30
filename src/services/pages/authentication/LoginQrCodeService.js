import { authURL } from ".";
import { Get, Post } from "../../core/request";


//GET
const getQr = () => Get(`${authURL.authPrefix}/${authURL.login}/${authURL.qr}/${authURL.new}`);
const loginByQr = (data) => Post(`${authURL.authPrefix}/${authURL.login}/${authURL.qr}`, data);

const LoginQrCodeApi = {
    getQr,
    loginByQr
}

export default LoginQrCodeApi;