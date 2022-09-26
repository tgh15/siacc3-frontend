import { Fragment, useState }   from 'react';
import { Link }                 from 'react-router-dom';
import { useForm }              from 'react-hook-form';
import { ChevronLeft }          from 'react-feather';
import { yupResolver }          from '@hookform/resolvers/yup';
import * as yup                 from 'yup';

import {
    Card,
    Form,
    Label,
    Input,
    Modal,
    Button,
    CardText,
    CardBody,
    FormGroup,
    ModalBody,
    ModalHeader,
    ModalFooter,
    FormFeedback
} from 'reactstrap';

//Css
import '../../../components/scss/base/pages/page-auth.scss';

//Assets
import Logo                     from '@src/assets/images/logo/logo_dark.svg';

//Service
import authAPI                  from '../../../services/pages/authentication/auth';

//Components
import CustomToast              from '../../../components/widgets/custom-toast';
import ImageRounded             from '@src/components/widgets/image-rounded';
import SubmitButton             from '../../../components/widgets/submit-button';


const ForgotPassword = () => {
    //State
    const [loading, setLoading]             = useState(false);
    const [centeredModal, setCenteredModal] = useState(false);

    const schema = yup.object().shape({
        email: yup.string().email().required("Kolom email tidak boleh kosong."),
    }).required();

    //Schema for form validation
    const { 
        register, 
        errors, 
        handleSubmit 
    } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

    const onSubmit = (formData) => {
        setLoading(true);

        authAPI.forgotPassword(formData).then(
            res => {
                if (!res.is_error) {
                    setLoading(false);
                    setCenteredModal(true);
                } else {
                    CustomToast("danger", err.code);
                }
            }
        ).catch(
            err => {
                setLoading(false);
                CustomToast("danger", err.code);
            }
        )
    }

    return (
        <Fragment>
            <Modal 
                isOpen    = {centeredModal} 
                toggle    = {() => setCenteredModal(!centeredModal)} 
                className = 'modal-dialog-centered modal-sm'
            >
                <ModalHeader toggle={() => setCenteredModal(!centeredModal)}></ModalHeader>
                <ModalBody>
                    <h5 className='text-center'>
                        Silahkan Periksa Email dan ikuti instruksi untuk mengubah kata sandi Anda.
                    </h5>
                </ModalBody>
                <ModalFooter className='d-flex justify-content-center'>
                    <Button 
                        color   = 'primary' 
                        style   = {{width: '100px'}}
                        block 
                        center 
                        onClick = {() => setCenteredModal(!centeredModal)}
                    >
                        OK
                    </Button>
                </ModalFooter>
            </Modal>

            <div className='auth-wrapper auth-v1 px-2'>
                <div className='auth-inner py-2'>
                    <Card className='mb-0'>
                        <CardBody>
                            <Link 
                                to          = '/' 
                                onClick     = {e => e.preventDefault()}
                                className   = 'brand-logo' 
                            >
                                <ImageRounded 
                                    src   = {Logo} 
                                    width = {50}
                                />
                                <h1 className='brand-text text-primary ml-1 mt-1'>SIACC</h1>
                            </Link>
                            <CardText className='mb-2'>
                                Kami akan mengirimkan email instruksi untuk mengubah kata sandi Anda
                            </CardText>

                            <Form 
                                onSubmit  = {handleSubmit(onSubmit)}
                                className = 'auth-forgot-password-form mt-2' 
                            >
                                <FormGroup>
                                    <Label 
                                        for       = 'login-email'
                                        className = 'form-label' 
                                    >
                                        Email
                                    </Label>
                                    <Input 
                                        id          = 'login-email' 
                                        type        = 'email'
                                        name        = "email"
                                        invalid     = {(errors.email) ? true : false}
                                        innerRef    = {register()}
                                        autoFocus
                                        placeholder = 'Email'
                                    />

                                    {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                                </FormGroup>
                                <SubmitButton 
                                    size      = "sm" 
                                    isBlock   = {true}
                                    isLoading = {loading} 
                                >
                                    Kirim Email
                                </SubmitButton>
                            </Form>
                            <p className='text-center mt-2'>
                                <Link to='/login'>
                                    <ChevronLeft 
                                        size      = {14} 
                                        className = 'mr-25' 
                                    />
                                    <span className='align-middle'>Back to login</span>
                                </Link>
                            </p>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </Fragment>
    )
}

export default ForgotPassword;