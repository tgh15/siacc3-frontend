import { Fragment, useRef, useState }           from "react";
import { Col, Input, Row, Form, FormFeedback }  from "reactstrap";

import * as yup                                 from 'yup';
import { useForm }                              from 'react-hook-form';
import { yupResolver }                          from '@hookform/resolvers/yup';

//Service
import authAPI                                  from "../../../services/pages/authentication/auth";

//Component
import CustomToast                              from "../../../components/widgets/custom-toast";
import SubmitButton                             from "../../../components/widgets/submit-button";

const ConfirmOtp = ({ email, username, password, fcmToken }) => {
    // State
    const [isLoading, setLoading]       = useState(false);
    const [timeLimit, setTimeLimit]     = useState(60);
    const [isDisabled, setDisabled]     = useState(false);

    //Schema for form validation
    const schema = yup.object().shape({
        otp: yup.string().max(6, 'OTP maksimal 6 karakter').min(6, 'OTP minimal 6 karakter.').required("Kolom kode OTP tidak boleh kosong."),
    }).required();

    const { 
        errors, 
        register, 
        handleSubmit 
    } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

    //Function to change email letter to * symbol
    const showEmail = email.replace(/(.{3})(.*)(?=@)/,
        (gp1, gp2, gp3) => { 
        for(let i = 0; i < gp3.length; i++) { 
            gp2 += "*"; 
        } return gp2; 
    });

    const onSubmit = (data) => {
        let params, formData;

        if (fcmToken) {
            formData = {
                username    : data.username,
                password    : data.password,
                fcm_token   : fcmToken,
            }
        } else {
            formData = {
                username    : data.username,
                password    : data.password,
            }
        }

        params = {
            otp : data.otp
        }

        setLoading(true);

        authAPI.loginUser(formData,params).then(
            res => {
                setLoading(false);

                if (!res.is_error) {
                    localStorage.setItem("userData", JSON.stringify(res.data.biodata));
                    localStorage.setItem("role", res.data.biodata.user_group[0].name);
                    localStorage.setItem("menu", JSON.stringify(res.data.menu));
                    localStorage.setItem("token", res.data.token);

                    if (res.data.biodata.user_group[0].name != 'Helpdesk') {
                        window.location.href = "/beranda";
                    } else {
                        window.location.href = "/helpdesk/home";
                    }
                } else {
                    CustomToast("danger", "Kode OTP tidak sesuai");
                }
            }
        ).catch(
            err => {
                setLoading(false);
                CustomToast("danger", err.code);
            }
        );
    }

    const repeatSendOtp = () => {
        let formData;

        if (fcmToken) {
            formData = {
                username: username,
                password: password,
                fcm_token: fcmToken
            }
        } else {
            formData = {
                username: username,
                password: password
            }
        }

        setLoading(true);

        authAPI.loginUser(formData).then(
            res => {
                setLoading(false);
                CustomToast("success", "Kode OTP Baru Berhasil dikirim");

                setDisabled(true);
                intervalRef.current = setInterval(decreaseNum, 1000);
            }
        ).catch(
            err => {
                setLoading(false);
                CustomToast("danger", err.code);
            }
        );
    }

    let intervalRef = useRef();

    const decreaseNum = () => setTimeLimit((prev) => {
        if (prev === 1) {
            clearInterval(intervalRef.current);
            setDisabled(false);
            setTimeLimit(60);
        }
        return prev - 1
    });

    const secondsToMs = (d) => {
        d = Number(d);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var mDisplay = m > 0 ? m + (m == 1 ? " menit" : " menit, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " detik" : " detik") : "";
        return mDisplay + sDisplay;
    }

    return (
        <Fragment>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <p className="text-center">
                    Melindungi data anda adalah prioritas kami. Harap konfirmasi
                    akun anda dengan memasukkan kode otorisasi yang dikirim ke <br/>
                    <span className="font-weight-bolder">{showEmail}</span>
                </p>
                <Input
                    id          = "otp"
                    type        = 'text'
                    name        = 'otp'
                    invalid     = {(errors.otp) ? true : false}
                    innerRef    = {register({ required: true })}
                    className   = "col-md-6 offset-md-3"
                    maxLength   = "6"
                    autoFocus 
                />
                {errors && errors.otp && <FormFeedback className="text-center">{errors.otp.message}</FormFeedback>}

                <Row className="mt-1">
                    <Col md="12">
                        <p>
                            Mungkin butuh beberapa menit untuk menerima kode anda.
                        </p>
                    </Col>
                    <Col md="8">
                        <p>Belum menerima kode?
                            {
                                !isDisabled ?
                                    <span
                                        onClick     = {repeatSendOtp}
                                        className   = "text-primary cursor-pointer" 
                                    >
                                        &nbsp;Kirim Kode Baru
                                    </span>
                                : 
                                    <span className="text-primary"> 
                                        {secondsToMs(timeLimit)} 
                                    </span> 
                            }
                        </p>
                    </Col>
                    <Col className="align-self-end offset-md-1 mb-1">
                        <SubmitButton 
                            size        = "sm" 
                            color       = "primary" 
                            isLoading   = {isLoading}
                        >
                            Kirim
                        </SubmitButton>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    )
}

export default ConfirmOtp;