import { Card, CardBody } from "reactstrap";
import QRCode from 'qrcode';
import { useEffect, useRef, useState } from "react";
import './index.scss';
import { X } from "react-feather";
import { useHistory } from "react-router-dom";
import LoginQrCodeApi from "../../../services/pages/authentication/LoginQrCodeService";
import { WebsocketURL } from "../../../configs/socket";
import '../../../components/scss/base/pages/page-auth.scss'
import './index.scss';

const LoginQrcode = props => {

    let history = useHistory();

    const [src, setSrc] = useState('')
    const [num, setNum] = useState(60);

    const [loginQrSocket, setLoginQrSocket] = useState(null);
    let fcmToken = props.fcmToken;
    let intervalRef = useRef()
    const decreaseNum = () => setNum((prev) => prev - 1);

    const getToken = () => {
        LoginQrCodeApi.getQr().then(res => {
            if (res.status === 200) {
                clearInterval(intervalRef.current);
                if (num <= 0) {
                    setNum(60);  
                }

                // close socket if socket open
                if (loginQrSocket) {
                    loginQrSocket.close();
                }

                // login socket
                connectLoginQrSocket(res.data.new);

                QRCode.toDataURL(res.data.new, { errorCorrectionLevel: 'H' }, function (err, url) {
                    setSrc(url)
                });
                
                intervalRef.current = setInterval(decreaseNum, 1000);

            } 
        }, err => {
            console.log(err)
        });
    }
    // connect socket
    const connectLoginQrSocket = qrToken => {
        const websocket = new WebSocket(WebsocketURL.LoginQrSocket(qrToken));
        setLoginQrSocket(websocket);
    };

    // login byQr code
    const loginByQr = token => {
        // data params
        let data = {
            token: [
                {
                    fcm_token: fcmToken,
                    token: token
                }
            ],
            fcm_token: fcmToken,
            latitude: 0,
            longitude: 0
        };

        // get QR Code
        LoginQrCodeApi.loginByQr(data).then(res => {

            let userData = {
                "name"  : res.data.biodata.name,
                "photo" : res.data.biodata.photo,
            }

            if (res.status === 200) {

                localStorage.setItem("userData", JSON.stringify(userData));
                localStorage.setItem("uuid", res.data.biodata.uuid);
                localStorage.setItem("uuid_user", res.data.biodata.uuid_user);
                localStorage.setItem("position_id", res.data.biodata.position_id);
                localStorage.setItem("workunit_id", res.data.biodata.workunit_id);
                localStorage.setItem("workunit", res.data.biodata.workunit);
                localStorage.setItem("role", res.data.biodata.user_group[0].name);
                localStorage.setItem("menu", JSON.stringify(res.data.menu));

                if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
                } else {
                    localStorage.setItem("token", res.data.token);
                }

                if (loginQrSocket != null) {
                    loginQrSocket.close();
                }

                window.location.href = '/landing-page';
            }
        }, err => {
            console.log(err)
        });
    }

    if (loginQrSocket != null) {
        loginQrSocket.onopen = function (e) {
            console.log('connect login Qr socket');
        };

        // on message chatsocket
        loginQrSocket.onmessage = function (event) {
            let res = JSON.parse(event.data);
            if (res.status == 201 || res.status == 200) {
                switch (res.type) {
                    case "auth-login-qr-validation":
                        loginByQr(res.data);
                        break;
                    default:
                        break;
                }
            }
        }
    }

    useEffect(() => {
        getToken();
    }, [num == 0]);

    function secondsToMs(d) {
        d = Number(d);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var mDisplay = m > 0 ? m + (m == 1 ? " menit" : " menit, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " detik" : " detik") : "";
        return mDisplay + sDisplay;
    }

    return (
        <div className='auth-wrapper auth-v1 px-2'>
            <div className='auth-inner py-2'>
                <p className="font-weight-bolder text-center text-primary">
                    Silahkan buka aplikasi SIACC di handphone
                    tap menu kiri atas dan pilih Tautkan Akun
                    selanjutnya scan QR Code dibawah ini
                </p>
                <Card className='mb-0'>
                    <CardBody className="qrcode">
                        <X onClick={() => {
                            history.push("/login")
                            if (loginQrSocket != null) {
                                loginQrSocket.close();
                            }
                        }} />
                        <p>SCAN QR CODE UNTUK LOGIN</p>
                        {src && <img src={src} alt="QR Code" />}
                        <span>Ter-refresh dalam {secondsToMs(num)}</span>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default LoginQrcode