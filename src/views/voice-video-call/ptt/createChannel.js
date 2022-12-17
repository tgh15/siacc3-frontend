import React, { 
    Fragment, 
    useState 
}                                               from 'react';
import { Lock }                                 from 'react-feather';
import { 
    Form, 
    Label, 
    Input, 
    Button, 
    FormGroup, 
    ModalFooter, 
    CustomInput,
}                                               from 'reactstrap';

//Components
import SubmitButton                             from '../../../components/widgets/submit-button';
import { ModalBase }                            from '../../../components/widgets/modals-base';

import { 
    useForm, 
}                                               from "react-hook-form";
import * as yup                                 from "yup";
import { yupResolver }                          from '@hookform/resolvers/yup';


import CommunicationPTT                         from '../../../services/pages/chat/PushToTalk';
import CustomToast                              from '../../../components/widgets/custom-toast';
import InputPasswordToggle                      from '../../../components/widgets/input-password-toggle';

const CreateChannel = (props) => {
    const {
        show,
        size,
        title,
        setShow,
        selected,
        getServer,
    } = props

    const [isPrivate, setIsPrivate]             = useState(false);

    const schema = yup.object({
        name       : yup.string().required('Nama Server Belum Terisi.'),
    }).required();

    const { 
        register,
        handleSubmit, 
        formState   : { errors }
    }                                           = useForm({resolver: yupResolver(schema)});

    const handleAddChannel = (channelId) => {

        const params = {
            id      : selected.id,
            channel : 'add'
        }

        const formData = {
            channels_id : [channelId]
        };

        CommunicationPTT.addChannelToSever(formData, params).then(
            res => {
                if(res.status === 200){
                    CustomToast("success", 'Channel berhasil dibuat.');
                    setShow(false);
                    setIsPrivate(false);

                    getServer(selected.id);
                }
            },
            err => {
                console.log(err, 'communication ptt add channel to server err');
            }
        )
    }

    const handleSubmit_ = (data) => {

        const params = {
            mode : 'channel'
        };

        const formData = {
            room_name   : data.name,
        }

        if(isPrivate){
            formData.is_private = true,
            formData.password   = data.password
        }else{
            formData.is_private = false
        }

        CommunicationPTT.CreateChannel(formData, params).then(
            res => {
                if(res.status === 200){

                    //update channel to active server
                    handleAddChannel(res.data.id);
                    getServer(selected.id);
                }
            },
            err => {
                console.log(err, 'comunnication ptt create server err.');
            }
        )
    };


    return (
        <Fragment>
            <ModalBase 
                show      = {show} 
                size      = {size || "sm"}
                title     = {title} 
                center    = {true}
                setShow   = {() => { setShow(!show) }}
            >
                <Form onSubmit = {handleSubmit(handleSubmit_)}>
                    <FormGroup className="mb-0">
                        <Label>Nama Channel</Label>
                        <Input 
                            name        = "name"
                            innerRef    = {register({required: true})}
                        />
                        <Label className="text-danger">{errors.name?.message}</Label>
                    </FormGroup>

                    <FormGroup>
                        <Label>Private Channel</Label>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex'>
                                <Lock size={18}/>
                                <small style={{ margin: '2px 0px 0px 7px' }}>
                                    Channel Private
                                </small>
                            </div>
                            <CustomInput
                                id       = 'exampleCustomSwitch'
                                type     = 'switch'
                                name     = 'privateSwitch'
                                onChange = {(e) => setIsPrivate(e.target.checked)}
                            />
                        </div>
                    </FormGroup>

                    {
                        isPrivate && 
                        <FormGroup className="mb-0">
                            <Label>Password</Label>
                            <InputPasswordToggle
                                name        = "password"
                                invalid     = {(errors.password) ? true : false}
                                innerRef    = {isPrivate ? register({required: true }) : register()}
                                className   = 'input-group-merge'
                            />
                            <Label className="text-danger">{errors.name?.message}</Label>
                        </FormGroup>
                    }

                    <ModalFooter className="d-flex justify-content-center pb-0">
                        <Button 
                            type    = 'reset' 
                            color   = 'primary' 
                            outline 
                            onClick = {() => setShow(false)}
                            >
                            Batal
                        </Button>
                        <SubmitButton 
                            color   = 'primary'
                        >
                            Submit
                        </SubmitButton>
                    </ModalFooter>
                </Form>
            </ModalBase>
        </Fragment>
    );
};

export default CreateChannel;