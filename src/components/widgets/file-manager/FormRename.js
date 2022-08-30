import React, { Fragment, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import SubmitButton from '../submit-button'
import { yupResolver } from '@hookform/resolvers/yup'
import RenameValidation from './validations/RenameValidation'
import DriveHomeApi from '../../../services/pages/drive/home'
import CustomToast from '../custom-toast'
import { FileManagerContext } from '../../../context/FileManagerContext'


export const FormRename = ({ id,type, oldName, onBack }) => {

    const onCancel = () => {
        onBack()
    }

    const { register, errors, handleSubmit } = useForm({ mode: "onChange", resolver: yupResolver(RenameValidation) })
    const [loading,setLoading] = useState(false)
    const {apiActive,getData} = useContext(FileManagerContext)

    const onSubmit = dataForm => {
        setLoading(true)
        DriveHomeApi.rename({
            id : id,
            name : dataForm.name,
            onSuccess : (res) => {
                getData(apiActive)
                setLoading(false)
                onBack()
                CustomToast("success",`Nama ${type} Berhasil diubah`)
                
            },
            onFail : (err) => {
                setLoading(false)

            }
        })
    }

    return (
        <Fragment>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label>Nama {type}</Label>
                    <Input 
                            type="text" 
                            defaultValue={oldName} 
                            maxLength={20}
                            name="name"
                            innerRef={register()}
                            invalid={(errors.name) ? true : false} />
                    
                    <Input 
                            type="hidden" 
                            defaultValue={oldName} 
                            maxLength={20}
                            name="old_name"
                            innerRef={register()}
                            invalid={(errors.old_name) ? true : false} />
                </FormGroup>

                <FormGroup className="text-right d-flex justify-content-between">
                    <Button.Ripple outline onClick={() => {
                        onCancel()
                    }} color="primary" >Batal</Button.Ripple>

                    <SubmitButton size="sm" isLoading={loading}>
                        Submit
                    </SubmitButton>
                </FormGroup>
            </Form>
        </Fragment>
    )
}