import { Link } from 'react-router-dom'
import InputPasswordToggle from '../../../components/widgets/input-password-toggle'
import { Form, FormGroup, Label, Input, Button, Card, CardBody, FormFeedback, Spinner } from 'reactstrap'
import '../../../components/scss/base/pages/page-auth.scss'
import { useRef, useState } from 'react'
import { ModalBase } from '../../../components/widgets/modals-base'
import ConfirmOtp from './ConfirmOtp'
import Logo from '@src/assets/images/logo/logo_dark.svg'
import ImageRounded from '@src/components/widgets/image-rounded'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import SubmitButton from '../../../components/widgets/submit-button'
import CustomToast from '../../../components/widgets/custom-toast'
import AuthService from '../../../services/pages/authentication/AuthService'
import { useHistory } from "react-router-dom";
import "./login.scss";
import ButtonHelp from './ButtonHelp'

const Login = props => {

    let fcmToken = props.fcmToken
    const history = useHistory()
    const [confirmOtp, setConfirmOtp] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState(false)
    const [username, setUsername] = useState(false)
    const [password, setPassword] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [isPending, setPending] = useState(false)
    const [pendingTime, setPendingTime] = useState(60);


    let intervalRef = useRef()
    const decreasePendingTime = () => setPendingTime((prev) => {
        if (prev <= 0) {
            setPendingTime(60);
            clearInterval(intervalRef.current);
            setPending(false)
        }
        return prev - 1
    });

    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    }).required();

    const { register, errors, handleSubmit } = useForm({ mode: "onChange", resolver: yupResolver(schema) })

    const onSubmit = data => {
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
        AuthService.post({
            data: formData,
            onSuccess: (res) => {
                console.log(res, 'err');
                setIsLoading(false);
                if (res.message === "otp") {
                    setEmail(res.data.email)
                    setPassword(data.password)
                    setConfirmOtp(true)
                } else {
                    let userData = {
                        "name": res.data.biodata.name,
                        "photo": res.data.biodata.photo,
                    }
                    localStorage.setItem("userData", JSON.stringify(userData));
                    localStorage.setItem("uuid", res.data.biodata.uuid);
                    localStorage.setItem("uuid_user", res.data.biodata.uuid_user);
                    localStorage.setItem("role", res.data.biodata.user_group[0].name);
                    localStorage.setItem("position_id", res.data.biodata.position_id);
                    localStorage.setItem("workunit_id", res.data.biodata.workunit_id);
                    localStorage.setItem("workunit", res.data.biodata.workunit);
                    localStorage.setItem("menu", JSON.stringify(res.data.menu));

                    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
                    } else {
                        localStorage.setItem("token", res.data.token);
                    }

                    if (localStorage.getItem('role') === 'Helpdesk') {
                        window.location.href = "/helpdesk/home";
                    } else {
                        window.location.href = "/beranda";
                    }
                }
            },
            onFail: (err) => {
                setIsLoading(false);
                console.log(err, 'disini')
                if (err == "pending for 1 minutes") {
                    setPending(true)
                    intervalRef.current = setInterval(decreasePendingTime, 1000);
                } else {
                    clearInterval(intervalRef.current);
                    CustomToast("danger", err)
                }
            }
        })
    }

    function secondsToMs(d) {
        d = Number(d);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var mDisplay = m > 0 ? m + (m == 1 ? " menit" : " menit") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " detik" : " detik") : "";
        return mDisplay + sDisplay;
    }

    return (
        <div className='auth-wrapper auth-v1 px-2'>
            <div className='auth-inner py-2'>
                <Card className='mb-0'>
                    <CardBody>
                        <ModalBase show={confirmOtp} center={true} setShow={(par) => {
                            setConfirmOtp(par)
                        }} title={"Otentikasi Akun Data"}>
                            <div className="container-fluid">
                                <ConfirmOtp email={email} username={username} password={password} fcmToken={fcmToken} />
                            </div>
                        </ModalBase>
                        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                            <ImageRounded src={Logo} width={50} />
                            <h1 className='brand-text text-primary ml-1 mt-1'>SIACC</h1>
                        </Link>

                        {isPending ? <p className='text-center text-danger' style={{ fontWeight: "bolder" }}>
                            Password Salah Sebanyak 3x! <br />
                            Silahkan Tunggu {secondsToMs(pendingTime)} <br />
                            Untuk Dapat Mencoba login kembali
                        </p> : null}

                        <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <Label className='form-label' for='login-username'>
                                    Nama Pengguna
                                </Label>
                                <Input
                                    type='text'
                                    id='username'
                                    placeholder='Nama Pengguna'
                                    name="username"
                                    innerRef={register({ required: true })}
                                    invalid={(errors.username) ? true : false}
                                    autoFocus />
                                {errors && errors.username && <FormFeedback>{errors.username.message}</FormFeedback>}
                            </FormGroup>
                            <FormGroup>
                                <div className='d-flex justify-content-between'>
                                    <Label className='form-label' for='login-password'>
                                        Password
                                    </Label>
                                </div>
                                <InputPasswordToggle
                                    name="password"
                                    innerRef={register({ required: true })}
                                    invalid={(errors.password) ? true : false}
                                    className='input-group-merge'
                                    id='login-password' />
                                {errors && errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
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
                                            <div class="icon colored"></div>
                                            <p className="mb-2">Login By QR Code</p>
                                        </div>
                                    </Link>
                                </FormGroup>
                            </div>
                            {!isPending ?
                                <SubmitButton size="sm" color="primary" isBlock={true} isLoading={isLoading}>
                                    Masuk
                                </SubmitButton>
                                :
                                <Button.Ripple color="primary" disabled={true} block={true} >
                                    Masuk
                                </Button.Ripple>
                            }
                        </Form>
                    </CardBody>
                </Card>
            </div>

            <ButtonHelp
                onClick={(par) => setShowPopup(par)} 
            />

        </div>
    )
}

export default Login
