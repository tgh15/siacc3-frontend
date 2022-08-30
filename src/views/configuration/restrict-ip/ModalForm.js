import React, { Fragment, useState }    from 'react';
import { 
    Form, 
    Input, 
    Label, 
    Button, 
    FormGroup, 
    ModalFooter,
    FormFeedback
} from 'reactstrap';

import * as yup                         from 'yup';
import { useForm }                      from 'react-hook-form';
import { yupResolver }                  from '@hookform/resolvers/yup';

//Component
import CustomToast                      from '../../../components/widgets/custom-toast';
import SubmitButton                     from '../../../components/widgets/submit-button';

//Service API
import RestrictAPI                      from '../../../services/pages/configuration/restrict_ip';


const ModalForm = (props) => {
    //State
    const [loading, setLoading] = useState(false);

    const {
        data,
        onCancel,
    } = props;

    const schema = yup.object().shape({
        ip: yup.string().min(6).required(),
    }).required();

    const { 
        register,
        errors, 
        handleSubmit 
    } = useForm(
        { mode: "onChange", resolver: yupResolver(schema) }
    );

    // API create restrict IP
    const handleCreate = dataForm => {
        RestrictAPI.create({
            ip : dataForm.ip,

            onSuccess: (res) => {
                props.getData();
                setLoading(false);
                props.setListData(false);
                props.setModalForm(false);

                //message succsess
                CustomToast("success", "Data Berhasil Disimpan");
            },
            onFail: (err) => {
                CustomToast("danger", err);
            }
        });
    };

    //API update restrict IP
    const handleUpdate = dataForm => {
        RestrictAPI.update({
            id  : parseInt(dataForm.ID),
            ip  : dataForm.ip,

            onSuccess: (res) => {
                props.getData();
                setLoading(false);
                props.setListData(false);
                props.setModalForm(false);

                //message succsess
                CustomToast("success", "Data Berhasil Diubah");
            },
            onFail: (err) => {
                setLoading(false);
                CustomToast("danger", err.message);
            }
        });
    };

    const onSubmit = dataForm => {
        setLoading(true);
        
        if (!data) {
            handleCreate(dataForm);
        }else{
            handleUpdate(dataForm);
        }
    };

    return (
        <Fragment>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label for="restrict_ip">
                        Restriction IP
                    </Label>
                    <Input
                        id              = "restrict_ip"
                        type            = "text"
                        name            = "ip"
                        invalid         = {(errors.ip) ? true : false}
                        innerRef        = {register({ required: true })}
                        defaultValue    = {(data) ? data.ip : null}
                    />
                    {
                        data &&  
                        <Input 
                            name            = "ID"
                            type            = "hidden"
                            innerRef        = {register({ required: true })}
                            defaultValue    = {data.ID} 
                        /> 
                    }
                    
                    {
                        errors && errors.ip && 
                        <FormFeedback>
                            {errors.ip.message}
                        </FormFeedback>
                    }
                </FormGroup>

                <ModalFooter className="d-flex justify-content-between px-0">
                    <Button
                        color   = "primary" 
                        outline
                        onClick = {onCancel}
                    >
                        Batal
                    </Button>
                    <SubmitButton
                        size        = "sm" 
                        color       = "primary"
                        isLoading   = {loading}
                    >
                        Submit
                    </SubmitButton>
                </ModalFooter>
            </Form>
        </Fragment>
    );
};

export default ModalForm;