import React, { Fragment, useEffect, useState } from 'react';
import { 
    Form, 
    Media,
    Label, 
    Input, 
    Button, 
    FormGroup,
}                                               from 'reactstrap';

//Image and Icon
import { Plus }                                 from 'react-feather';
import DefaultPhoto                             from '@src/assets/images/portrait/small/150x150.png';

//Components
import SubmitButton                             from '../../../../components/widgets/submit-button';

import { 
    useForm, 
}                                               from "react-hook-form";
import * as yup                                 from "yup";
import { yupResolver }                          from '@hookform/resolvers/yup';

//Utils
import Helper                                   from '../../../../helpers';
import CommunicationPTT                         from '../../../../services/pages/chat/PushToTalk';
import ChatApi                                  from '../../../../services/pages/chat';
import CustomToast                              from '../../../../components/widgets/custom-toast';

const GeneralInformation = (props) => {

    const {
        selected,
        getServer
    }                       = props;

    const schema = yup.object({
        name       : yup.string().required('Nama Server Belum Terisi.'),
    }).required();

    const { 
        register,
        setValue,
        getValues,
        handleSubmit, 
        formState   : { errors }
    }                                                   = useForm({resolver: yupResolver(schema)});
    
    const [photo, setPhoto]                             = useState(null);
    const [uploadPhoto, setUploadPhoto]                 = useState(null);


    //Photo
    const selectPhoto = e => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setPhoto(reader.result)
        }
        
        setUploadPhoto(files[0]);
        reader.readAsDataURL(files[0]);
    };

    const handleSubmit_ = (data) => {
        if (uploadPhoto != null){

            let dataPhoto = new FormData();
            dataPhoto.append("attachment[]", uploadPhoto);

            ChatApi.uploadAttachment({
                dataFile    : dataPhoto,
                onSuccess   : (res) => {
                    const formData = {
                        name        : data.name,
                        logo        : res[0].content,
                    }

                    CommunicationPTT.updateServer(selected.id, formData).then(
                        res_ => {
                            if(res_.status === 200){
                                CustomToast('success', 'Server berhasil diubah.');

                                //get list server
                                getServer(selected.id);
                            }
                        },
                        err_ => {
                            console.log(err_, 'communication ptt update server err');
                            CustomToast('error', 'communication ptt update server err');
                        }
                    )
                },
                onFail      : (err) => {
                    console.log(err)
                    CustomToast('error', 'communication ptt upload attachment err.');

                }
            })
        }else{
            const formData = {
                name        : data.name,
            }

            CommunicationPTT.updateServer(selected.id, formData).then(
                res_ => {
                    if(res_.status === 200){
                        CustomToast('success', 'Server berhasil diubah.');

                        //get list server
                        getServer(selected.id);
                    }
                },
                err_ => {
                    console.log(err_, 'communication ptt update server err');
                    CustomToast('error', 'communication ptt update server err');
                }
            )
        }
    }

    useEffect(() => {
        if(selected != null){
            setValue('name', selected.name)
            setPhoto(selected.logo)
        }
    },[selected]);

    return (
        <Fragment>
            <Form onSubmit = {handleSubmit(handleSubmit_)}>
                <div style={{width: '35em' }} className="">
                    <div className='d-flex justify-content-center mb-2'>
                        <FormGroup>
                            <Media>
                            <Media
                                src         = {photo == null ? DefaultPhoto : photo}
                                alt         = 'Generic placeholder image'
                                style       = {{ borderRadius: '4rem', borderStyle: 'dashed' }}
                                width       = '90'
                                height      = '90'
                                onError     = {Helper.fallbackImage_}
                            />
                            </Media>
                            <Media
                                id          = "room-photo"
                                style       = {{ float: 'right', marginTop: '-80px', marginRight: '2px' }}
                            >
                                <Button.Ripple
                                    tag         = {Label}
                                    size        = 'sm'
                                    color       = 'primary'
                                    className   = 'p-0 rounded-circle'
                                >
                                    <Plus size={14}/>
                                    <Input
                                        type        = 'file'
                                        name        = "photo"
                                        hidden
                                        accept      = 'image/*'
                                        onChange    = {selectPhoto}
                                    />
                                </Button.Ripple>
                            </Media>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Label className='text-left'>Nama Room</Label>
                        <Input 
                            name        = "name"
                            innerRef    = {register({required: true})}

                        />
                        <Label className="text-danger">{errors.name?.message}</Label>
                    </FormGroup>
                    <div className='text-center mt-2'>
                        <SubmitButton 
                            size        = "sm" 
                            color       = "primary"
                        >
                            Simpan
                        </SubmitButton>
                    </div>
                </div>
            </Form>
        </Fragment>
    );
};

export default GeneralInformation;