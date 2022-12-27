import { useEffect, useMemo, useState }     from "react";
import { useForm }                          from "react-hook-form";
import { Link, useHistory, useLocation }    from "react-router-dom";
import { yupResolver }                      from '@hookform/resolvers/yup';
import InputPasswordToggle                  from '@src/components/widgets/input-password-toggle';
import * as yup                             from "yup";

//Validasi data
import validation                           from "./validation";

import { 
    Card, 
    Form, 
    Input, 
    Label, 
    CardBody, 
    FormGroup, 
    FormFeedback, 
} from "reactstrap";

//Image
import Logo                                 from '@src/assets/images/logo/logo_dark.svg';
import ImageRounded                         from '@src/components/widgets/image-rounded';

//Css
import "../login/login.scss";
import '../../../components/scss/base/pages/page-auth.scss';

//Services
import authURL                              from "../../../services/pages/authentication/auth";

//Components
import SubmitButton                         from "../../../components/widgets/submit-button";
import CustomToast                          from "../../../components/widgets/custom-toast";


function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}


const NewPassword = () => {
    let query                       = useQuery();
    let history                     = useHistory();

    //States
    const [uuid, setUuid]           = useState(null);
    const [username, setUsername]   = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const { 
        register, 
        errors, 
        handleSubmit 
    } = useForm({ mode: "onChange", resolver: yupResolver(validation) });

    const getUserByToken = () => {
        authURL.getUserByToken(query.get("forget")).then(
            res => {
                if (!res.is_error) {
                    setUsername(res.data.username);
                    setUuid(res.data.uuid);
                } else {
                    if(res.status === 403){
                        CustomToast("danger", "Tautan Kadaluarsa.");
                        history.push('/login');
                    }else{
                        CustomToast("danger", res.message)
                    }
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    }

    const onSubmit = (dataFom) => {
        setIsLoading(true);

        let formData = {
            uuid     : uuid,
            username : username,
            password : dataFom.password
        }

        authURL.changePassword(formData).then(
            res => {
                setIsLoading(false);
                if (!res.is_error) {
                    CustomToast("success", "Password berhasil diperbaharui.");
                    history.push("/login");
                } else {
                    CustomToast("danger", res.message);
                }
            },
            err => {
                setIsLoading(false);
                CustomToast("danger", err.message);

            }
        ).catch(
            err => {
                setIsLoading(false);
                CustomToast("danger", err);
            }
        )
    }

    useEffect(() => {
        getUserByToken();
    }, []);

    return (
        <div className='auth-wrapper auth-v1 px-2'>
            <div className='auth-inner py-2'>
                <Card className='mb-0'>
                    <CardBody>
                        <Link 
                            to        = '/' 
                            onClick   = {e => e.preventDefault()}
                            className = 'brand-logo' 
                        >
                            <ImageRounded 
                                src   = {Logo} 
                                width = {50}
                            />
                            <h1 className='brand-text text-primary ml-1 mt-1'>SIACC</h1>
                        </Link>
                        <Form 
                            onSubmit  = {handleSubmit(onSubmit)}
                            className = 'auth-login-form mt-2' 
                        >
                            <FormGroup>
                                <Label  
                                    for       = 'new-password'
                                    className = 'form-label'    
                                >
                                    Password Baru
                                </Label>

                                <InputPasswordToggle
                                    id          = 'new-password' 
                                    name        = "password"
                                    invalid     = {(errors.password) ? true : false}
                                    innerRef    = {register({ required: true })}
                                    className   = 'input-group-merge'
                                    placeholder = "Masukkan Password Baru"
                                />
                                {errors && errors.password && <Label className="text-danger">{errors.password.message}</Label>}
                            </FormGroup>
                            <FormGroup className="pb-2">
                                <Label 
                                    for       = 'repeat-password'
                                    className = 'form-label' 
                                >
                                    Ulangi Password
                                </Label>
                                <InputPasswordToggle
                                    id          = 'repeat-password' 
                                    name        = "repeat_password"
                                    invalid     = {(errors.repeat_password) ? true : false}
                                    innerRef    = {register({ required: true })}
                                    className   = 'input-group-merge'
                                    placeholder = "Ulangi Password Baru"
                                />
                                {console.log(errors)}
                                {errors && errors.repeat_password && <Label className="text-danger">{errors.repeat_password.message}</Label>}
                            </FormGroup>
                            <SubmitButton 
                                size      = "sm" 
                                color     = "primary" 
                                isBlock   = {true} 
                                isLoading = {isLoading}
                            >
                                Simpan Perubahan
                            </SubmitButton>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default NewPassword;