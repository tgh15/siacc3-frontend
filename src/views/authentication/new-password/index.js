import { Link, useHistory, useLocation } from "react-router-dom";
import { Card, CardBody, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap"
import Logo from '@src/assets/images/logo/logo_dark.svg'
import ImageRounded from '@src/components/widgets/image-rounded'
import "../login/login.scss";
import SubmitButton from "../../../components/widgets/submit-button";
import { useEffect, useMemo, useState } from "react";
import CustomToast from "../../../components/widgets/custom-toast";
import NewPasswordApi from "../../../services/pages/authentication/NewPasswordService";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import validation from "./validation";
import '../../../components/scss/base/pages/page-auth.scss'

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

const NewPassword = () => {

    let query   = useQuery();
    let history = useHistory();

    // states
    const [uuid, setUuid]           = useState(null)
    const [username, setUsername]   = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    
    const { register, errors, handleSubmit } = useForm({ mode: "onChange", resolver: yupResolver(validation) })

    const getUserByToken = () => {
        NewPasswordApi.getUserByToken(query.get("forget")).then(
            res => {
                setUsername(res.data.username)
                setUuid(res.data.uuid)
            },
            err => {
                if(err.status === 403){
                    CustomToast("danger", "Tautan Kadaluarsa.");
                    history.push('/login');
                }else{
                    CustomToast("danger", "getuserByToken")
                }
            }
        )
    }

    const onSubmit = dataFom => {
        setIsLoading(true);

        let data = {
            username: username,
            uuid: uuid,
            password: dataFom.password
        }

        NewPasswordApi.changePassword(data).then(
            res => {
                CustomToast("success", "Password berhasil diperbaharui")
                setIsLoading(false);
                history.push("/login")
            },
            err => {
                CustomToast("danger", err)
                setIsLoading(false);
            }
        )

    }


    useEffect(() => {
        getUserByToken()
    }, [])
    return (
        <div className='auth-wrapper auth-v1 px-2'>
            <div className='auth-inner py-2'>
                <Card className='mb-0'>
                    <CardBody>
                        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                            <ImageRounded src={Logo} width={50} />
                            <h1 className='brand-text text-primary ml-1 mt-1'>SIACC</h1>
                        </Link>
                        <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <Label className='form-label' for='login-username'>
                                    Password Baru
                                </Label>
                                <Input
                                    type='password'
                                    id='new-password'
                                    placeholder='Password Baru'
                                    name="password"
                                    innerRef={register()}
                                    invalid={(errors.password) ? true : false}
                                />
                                {errors && errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                            </FormGroup>
                            <FormGroup className="pb-2">
                                <Label className='form-label' for='login-username'>
                                    Ulangi Password
                                </Label>
                                <Input
                                    type='password'
                                    id='repeat-password'
                                    placeholder='Ulangi Password'
                                    name="repeat_password"
                                    innerRef={register()}
                                    invalid={(errors.repeat_password) ? true : false}
                                />
                                {errors && errors.repeat_password && <FormFeedback>{errors.repeat_password.message}</FormFeedback>}
                            </FormGroup>
                            <SubmitButton size="sm" color="primary" isBlock={true} isLoading={isLoading}>
                                Simpan Perubahan
                            </SubmitButton>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default NewPassword