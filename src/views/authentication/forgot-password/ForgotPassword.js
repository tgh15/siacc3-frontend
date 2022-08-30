import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import {
    Card,
    CardBody,
    CardText,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormFeedback
} from 'reactstrap'

import Logo from '@src/assets/images/logo/logo_dark.svg'
import ImageRounded from '@src/components/widgets/image-rounded'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ForgotPasswordService from '../../../services/pages/authentication/ForgotPasswordService'
import CustomToast from '../../../components/widgets/custom-toast'
import SubmitButton from '../../../components/widgets/submit-button'
import '../../../components/scss/base/pages/page-auth.scss'

const ForgotPassword = () => {

    const [centeredModal, setCenteredModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const schema = yup.object().shape({
        email: yup.string().email().required(),
    }).required();

    const { register, errors, handleSubmit } = useForm({ mode: "onChange", resolver: yupResolver(schema) })

    const onSubmit = dataForm => {
        setLoading(true)
        ForgotPasswordService({
            data: dataForm,
            onSuccess: (res) => {
                setLoading(false)
                setCenteredModal(true);
            }, onFail: (err) => {
                CustomToast("danger", err.message)
                setLoading(false)
            }
        })
    }

    return (
        <Fragment>
            <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered modal-sm'>
                <ModalHeader toggle={() => setCenteredModal(!centeredModal)}></ModalHeader>
                <ModalBody>
                    <h5> Silahkan Periksa Email dan ikuti instruksi untuk mengubah kata sandi Anda. </h5>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary col-5' center block onClick={() => setCenteredModal(!centeredModal)}>
                        OK
                    </Button>
                </ModalFooter>
            </Modal>

            <div className='auth-wrapper auth-v1 px-2'>
                <div className='auth-inner py-2'>
                    <Card className='mb-0'>
                        <CardBody>
                            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                                <ImageRounded src={Logo} width={50} />
                                <h1 className='brand-text text-primary ml-1 mt-1'>SIACC</h1>
                            </Link>
                            <CardText className='mb-2'>
                                Kami akan mengirimkan email instruksi untuk mengubah kata sandi Anda
                            </CardText>

                            <Form className='auth-forgot-password-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                                <FormGroup>
                                    <Label className='form-label' for='login-email'>
                                        Email
                                    </Label>
                                    <Input type='email'
                                        name="email"
                                        id='login-email' placeholder='Email'
                                        innerRef={register()}
                                        invalid={(errors.email) ? true : false}
                                        autoFocus />
                                    {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                                </FormGroup>
                                <SubmitButton size="sm" isLoading={loading} isBlock={true}>
                                    Kirim Email
                                </SubmitButton>

                            </Form>
                            <p className='text-center mt-2'>
                                <Link to='/login'>
                                    <ChevronLeft className='mr-25' size={14} />
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

export default ForgotPassword
