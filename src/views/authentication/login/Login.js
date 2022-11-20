import { useRef, useState }             from 'react';
import { Link }                         from 'react-router-dom';
import { 
        Card, 
        Form, 
        Label, 
        Input, 
        Button, 
        CardBody, 
        FormGroup, 
    }                                   from 'reactstrap';

import { useForm }                      from 'react-hook-form';
import { yupResolver }                  from '@hookform/resolvers/yup';
import * as yup                         from 'yup';

//Assets
import Logo                             from '@src/assets/images/logo/logo_dark.svg';

//Service
import authAPI                          from '../../../services/pages/authentication/auth';

//Custom Component
import ButtonHelp                       from './ButtonHelp';
import ConfirmOtp                       from './ConfirmOtp';
import CustomToast                      from '@src/components/widgets/custom-toast';
import ImageRounded                     from '@src/components/widgets/image-rounded';
import SubmitButton                     from '@src/components/widgets/submit-button';
import { ModalBase }                    from '@src/components/widgets/modals-base';
import InputPasswordToggle              from '@src/components/widgets/input-password-toggle';

//Utils
import { secondsToMs }                  from '@utils';

//Scss
import "./login.scss";
import '../../../components/scss/base/pages/page-auth.scss';


const Login = (props) => {
    // Props
    let {fcmToken}                      = props;

    // State
    const [email, setEmail]             = useState(false);
    const [username, setUsername]       = useState(false);
    const [password, setPassword]       = useState(false);
    const [isPending, setPending]       = useState(false);
    const [isLoading, setIsLoading]     = useState(false);
    const [confirmOtp, setConfirmOtp]   = useState(false);
    const [pendingTime, setPendingTime] = useState(60);

    // Ref
    let intervalRef                     = useRef();

    //Schema for form validation
    const schema                        = yup.object().shape({
        username: yup.string().required('Kolom nama pengguna tidak boleh kosong.'),
        password: yup.string().required('Kolom kata tidak boleh kosong.'),
    }).required();

    const decreasePendingTime = () => setPendingTime((prev) => {
        if (prev <= 0) {
            setPendingTime(60);
            clearInterval(intervalRef.current);
            setPending(false);
        }
        return prev - 1
    });

    const { 
        errors, 
        register, 
        handleSubmit 
    } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        setUsername(data.username);
        setPassword(data.password);

        let formData;
        
        if (fcmToken) {
            formData = {
                username: data.username,
                password: data.password,
                fcm_token: fcmToken
            }
        } else {
            formData = {
                username: data.username,
                password: data.password
            }
        }

        setIsLoading(true);

        authAPI.loginUser(formData).then(
            res => {
                setIsLoading(false);

                if (!res.is_error) {
                    if (res.code === "auth_login_get_otp") {
                        setEmail(res.data.email);
                        setPassword(data.password);
                        setConfirmOtp(true);
                    } else {
                        localStorage.setItem("userData", JSON.stringify(res.data.biodata));
                        localStorage.setItem("role", res.data.biodata.user_group[0].name);
                        localStorage.setItem("menu", JSON.stringify(res.data.menu));
                        localStorage.setItem("username", res.data.username);
    
                        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
                            localStorage.setItem("token", res.data.token);
                        } else {
                            localStorage.setItem("token", res.data.token);
                        }
    
                        if (localStorage.getItem('role') === 'Helpdesk') {
                            window.location.href = "/helpdesk/home";
                        } else {
                            window.location.href = "/beranda";
                        }
                    }
                } else {
                    if (res.code === "auth_login_error_password_not_match") {
                        clearInterval(intervalRef.current);
                        CustomToast("danger", "Username atau password yang dimasukkan salah.");
                    } else if (res.code === "auth_login_error_freeze_login") {
                        setPending(true);
                        intervalRef.current = setInterval(decreasePendingTime, 1000);
                    }else{
                        CustomToast("danger", "Data akun tidak ditemukan.");
                    }
                }
            }
        ).catch(
            err => {
                setIsLoading(false);
                CustomToast("danger", err.code);
            }
        );
    };

    return (
        <div className='auth-wrapper auth-v1 px-2'>
            <div className='auth-inner py-2'>
                <Card className='mb-0'>
                    <CardBody>
                        <ModalBase 
                            show        = {confirmOtp} 
                            title       = {"Otentikasi Akun Data"}
                            center      = {true} 
                            setShow     = {(par) => { setConfirmOtp(par)}} 
                            backdrop    = "static"
                        >
                            <div className="container-fluid">
                                <ConfirmOtp 
                                    email    = {email} 
                                    username = {username} 
                                    password = {password} 
                                    fcmToken = {fcmToken} 
                                />
                            </div>
                        </ModalBase>

                        <Link 
                            to          = '/' 
                            onClick     = {e => e.preventDefault()}
                            className   = 'brand-logo' 
                        >
                            <ImageRounded 
                                src     = {Logo} 
                                width   = {50} 
                            />
                            <h1 className='brand-text text-primary ml-1 mt-1'>SIACC</h1>
                        </Link>

                        {
                            isPending ? 
                                <p 
                                    style       = {{ fontWeight: "bolder" }}
                                    className   = 'text-center text-danger' 
                                >
                                    Password Salah Sebanyak 3x! <br />
                                    Silahkan Tunggu {secondsToMs(pendingTime)} <br />
                                    Untuk Dapat Mencoba login kembali
                                </p> 
                            : 
                                null
                        }

                        <Form 
                            onSubmit    = {handleSubmit(onSubmit)}
                            className   = 'auth-login-form mt-2' 
                        >
                            <FormGroup>
                                <Label 
                                    for         = 'login-username'
                                    className   = 'form-label' 
                                >
                                    Nama Pengguna
                                </Label>

                                <Input
                                    id          = 'username'
                                    type        = 'text'
                                    name        = "username"
                                    invalid     = {(errors.username) ? true : false}
                                    innerRef    = {register({ required: true })}
                                    autoFocus 
                                    placeholder = 'Nama Pengguna'
                                />

                                {errors && errors.username && <Label className="text-danger">{errors.username.message}</Label>}
                            </FormGroup>
                            <FormGroup>
                                <div className='d-flex justify-content-between'>
                                    <Label 
                                        for         = 'login-password'
                                        className   = 'form-label' 
                                    >
                                        Kata Sandi
                                    </Label>
                                </div>
                                <InputPasswordToggle
                                    id          = 'login-password' 
                                    name        = "password"
                                    invalid     = {(errors.password) ? true : false}
                                    innerRef    = {register({ required: true })}
                                    className   = 'input-group-merge'
                                />

                                {errors && errors.password && <Label className="text-danger">{errors.password.message}</Label>}
                            </FormGroup>
                            <div className='d-flex justify-content-between'>
                                <FormGroup>
                                    <Link to='/forgot-password'>
                                        <p className="mb-2">Lupa Kata Sandi?</p>
                                    </Link>
                                </FormGroup>
                                <FormGroup>
                                    <Link to='/login-qrcode'>
                                        <div className="d-flex wrap-qrcode" >
                                            <div className="icon colored"></div>
                                            <p className="mb-2">Login By QR Code</p>
                                        </div>
                                    </Link>
                                </FormGroup>
                            </div>
                            {
                                !isPending ?
                                    <SubmitButton 
                                        size        = "sm" 
                                        color       = "primary" 
                                        isBlock     = {true} 
                                        isLoading   = {isLoading}
                                    >
                                        Masuk
                                    </SubmitButton>
                                :
                                    <Button.Ripple 
                                        color       = "primary" 
                                        block       = {true} 
                                        disabled    = {true} 
                                    >
                                        Masuk
                                    </Button.Ripple>
                            }
                        </Form>
                    </CardBody>
                </Card>
            </div>
            <ButtonHelp/>
        </div>
    )
}

export default Login;