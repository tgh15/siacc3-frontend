import { useEffect, useMemo, useState }     from "react";
import { useForm }                          from "react-hook-form";
import { Link, useHistory, useLocation }    from "react-router-dom";
import { yupResolver }                      from '@hookform/resolvers/yup';
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
                    }
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.code);
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
                if (!res.is_error) {
                    setIsLoading(false);
                    CustomToast("success", "Password berhasil diperbaharui.");
                    history.push("/login");
                } else {
                    CustomToast("danger", err.code);
                }
            }
        ).catch(
            err => {
                setIsLoading(false);
                CustomToast("danger", err.code);
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
                                    for       = 'login-username'
                                    className = 'form-label'    
                                >
                                    Password Baru
                                </Label>
                                <Input
                                    id          = 'new-password'
                                    type        = 'password'
                                    name        = "password"
                                    invalid     = {(errors.password) ? true : false}
                                    innerRef    = {register()}
                                    placeholder = 'Password Baru'
                                />

                                {errors && errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                            </FormGroup>
                            <FormGroup className="pb-2">
                                <Label 
                                    for       = 'login-username'
                                    className = 'form-label' 
                                >
                                    Ulangi Password
                                </Label>
                                <Input
                                    id          = 'repeat-password'
                                    type        = 'password'
                                    name        = "repeat_password"
                                    invalid     = {(errors.repeat_password) ? true : false}
                                    innerRef    = {register()}
                                    placeholder = 'Ulangi Password'
                                />

                                {errors && errors.repeat_password && <FormFeedback>{errors.repeat_password.message}</FormFeedback>}
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