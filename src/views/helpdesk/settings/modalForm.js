import React, { Fragment, useState } from 'react';
import { 
    Form, 
    Input, 
    Label, 
    Button, 
    FormGroup, 
    ModalFooter, 
    FormFeedback 
} from 'reactstrap';

import { useForm }                   from 'react-hook-form';
import * as yup                      from 'yup';
import { yupResolver }               from '@hookform/resolvers/yup';

//Components
import SubmitButton                  from '../../../components/widgets/submit-button';
import CustomToast                   from '../../../components/widgets/custom-toast';

//API
import { SettingsAPI }               from '../../../services/pages/helpdesk/settings';


const ModalForm = (props) => {
    //State
    const [loading, setLoading] = useState(false);

    //Props
    const { 
        data,
        onCancel,
        setListData,
        setModalForm,
        getCategoryHelpdesk
    } = props;

    const schema = yup.object().shape({
        name: yup.string().min(3).required(),
    }).required();
    
    const { 
        errors, 
        register,
        handleSubmit 
    } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

    //Create
    const handleCreate = (dataForm) => {
        const formData = {
            name : dataForm.name
        };

        SettingsAPI.createCategory(formData).then(
            res => {
                if (res.status === 200) {
                    setLoading(false);
                    setListData(false);
                    setModalForm(false);

                    //Success Message
                    CustomToast("success", "Data Berhasil Disimpan");
                    
                    //Refresh Page
                    getCategoryHelpdesk();
                }
            },
            err => {
                setLoading(false);
                CustomToast("danger", err.message);
            }
        )
    };

    //Update
    const handleUpdate = (dataForm) => {
        const formData = {
            id   : parseInt(dataForm.id),
            name : dataForm.name
        };

        SettingsAPI.updateCategory(formData).then(
            res => {
                if (res.status === 200) {
                    setLoading(false);
                    setListData(false);
                    setModalForm(false);

                    //Success Message
                    CustomToast("success", "Data Berhasil Diubah");
                    
                    //Refresh Page
                    getCategoryHelpdesk();
                }
            },
            err => {
                setLoading(false);
                CustomToast("danger", err.message);
            }
        )
    };

    const onSubmit = dataForm => {
        setLoading(true);
        
        if (!data) {
            handleCreate(dataForm);
        }else {
            handleUpdate(dataForm);
        }
    };

    return (
        <Fragment>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label>Kategori Helpdesk</Label>
                    <Input
                        name         = "name"
                        invalid      = {(errors.name) ? true : false}
                        autoFocus
                        innerRef     = {register({ required: true })}
                        defaultValue = {(data) ? data.name : null}
                    />
                    {
                        data &&  
                        <Input
                            name         = "id" 
                            type         = "hidden"
                            innerRef     = {register({ required: true })} 
                            defaultValue = {data.id} 
                        /> 
                    }
                    {
                        errors && errors.name && 
                        <FormFeedback>
                            {errors.name.message}
                        </FormFeedback>
                    }
                </FormGroup>
                <ModalFooter className="d-flex justify-content-between px-0 mb-0">
                    <Button
                        type    = "button" 
                        color   = 'primary' 
                        outline 
                        onClick = {onCancel}
                    >
                        Batal
                    </Button>
                    <SubmitButton
                        size      = "sm" 
                        color     = "primary" 
                        isLoading = {loading}
                    >
                        Submit
                    </SubmitButton>
                </ModalFooter>
            </Form>
        </Fragment>
    );
};

export default ModalForm;