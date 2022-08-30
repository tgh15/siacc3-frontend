import React, { 
    Fragment, 
    useState, 
    useEffect
}                                       from 'react';

import { 
    useForm, 
}                                       from "react-hook-form";
import * as yup                         from "yup";
import { yupResolver }                  from '@hookform/resolvers/yup';

import { 
    Form, 
    Media,
    Label, 
    Input, 
    Modal, 
    Button, 
    FormGroup, 
    ModalBody,
    ModalFooter
}                                       from 'reactstrap';

//Icon
import { Plus }                         from 'react-feather';

//Image
import DefaultPhoto                     from '@src/assets/images/portrait/small/150x150.png';

//Component
import ChatApi                          from '../../../services/pages/chat/';
import CustomToast                      from '../../../components/widgets/custom-toast';
import CommunicationPTT                 from '../../../services/pages/chat/PushToTalk';
import SelectMultipleUser               from '../../../components/widgets/select-multiple-user';

//Utils
import Helper                           from '../../../helpers';


const CreateRoom = (props) => {

    const {
        show,
        setShow,
        getServer
    }                                                   = props;

    const [photo, setPhoto]                             = useState(null);
    const [uploadPhoto, setUploadPhoto]                 = useState(null);
    const [isSelectUserVisible, setIsSelectUserVisible] = useState(false);

    const schema = yup.object({
        name       : yup.string().required('Nama Server Belum Terisi.'),
    }).required();

    const { 
        register,
        getValues,
        handleSubmit, 
        formState   : { errors }
    }                                                   = useForm({resolver: yupResolver(schema)});

    //Photo
    const selectPhoto = e => {
        const reader = new FileReader(),
        files = e.target.files
        reader.onload = function () {
            setPhoto(reader.result);
        }
        setUploadPhoto(files[0]);
        reader.readAsDataURL(files[0]);
    };

    const handleSubmit_ = () => {
        //if form is valid show select user form for next step
        setIsSelectUserVisible(true);
    };

    const handleCreateServer = (selectedUser) => {
        
        if (uploadPhoto != null){

            let dataPhoto = new FormData();
            dataPhoto.append("attachment[]", uploadPhoto);

            ChatApi.uploadAttachment({
                dataFile    : dataPhoto,
                onSuccess   : (res) => {
                    const formData = {
                        name        : getValues().name,
                        logo        : res[0].content,
                        member_id   : selectedUser
                    }

                    CommunicationPTT.createServer(formData).then(
                        res_ => {
                            if(res_.status === 200){
                                CustomToast('success', 'Server berhasil dibuat.');

                                //get list server
                                getServer();

                                //close modal 
                                setIsSelectUserVisible(false);
                                setShow(false);
                            }
                        },
                        err_ => {
                            console.log(err_, 'communication ptt create server err');
                            CustomToast('error', 'communication ptt create server err');
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
                name        : getValues().name,
                member_id   : selectedUser
            }

            CommunicationPTT.createServer(formData).then(
                res_ => {
                    if(res_.status === 200){
                        CustomToast('success', 'Server berhasil dibuat.');

                        //get list server
                        getServer();

                        //close modal 
                        setIsSelectUserVisible(false);
                        setShow(false);
                    }
                },
                err_ => {
                    console.log(err_, 'communication ptt create server err');
                    CustomToast('error', 'communication ptt create server err');
                }
            )
        }

    };

    return (
        <Fragment>
            
            {/* Modal Select Multiple User */}
            <SelectMultipleUser
                show        = {isSelectUserVisible}
                title       = "Tambahkan Anggota"
                center      = {true}
                setShow     = {(par) => setIsSelectUserVisible(par)}
                onSelect    = {(selected) => handleCreateServer(selected) }
                titleButton = "Buat Server"
            />

            <Modal 
                size        = "md"
                isOpen      = {show} 
                toggle      = {() => setShow(!show)}
                centered    = {true}
            >
                <Form onSubmit = {handleSubmit(handleSubmit_)}>
                    <ModalBody>
                            <div className='text-center mb-2'>
                                <h5 className='font-weight-bolder mb-2 mt-2'>Buat Server</h5>
                                <div className='d-flex justify-content-center'>
                                    <FormGroup>
                                        <Media
                                            src         = {photo == null ? DefaultPhoto : photo}
                                            alt         = 'Generic placeholder image'
                                            style       = {{ borderRadius: '4rem', borderStyle: 'dashed' }}
                                            width       = '90'
                                            height      = '90'
                                            onError     = {Helper.fallbackImage_}
                                        />
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
                                <small>
                                    <p className='m-0'>Silahkan masukkan icon group bila perlu</p>
                                    <p>jika tidak maka kosongkan saja</p>
                                </small>
                            </div>
                            <FormGroup>
                                <Label>Nama Room</Label>
                                <Input 
                                    id          = 'name'
                                    name        = "name"
                                    innerRef    = {register({required: true})}
                                />
                                <Label color="danger">{errors.name?.message}</Label>
                            </FormGroup>
                    </ModalBody>
                    <ModalFooter className='d-flex justify-content-between'>
                        <Button 
                            color   = 'primary' 
                            outline
                            onClick = {() => setShow(!show)}
                        >
                            Batal
                        </Button>
                        <Button 
                            type    = "submit"
                            color   = 'primary' 
                        >
                            Selanjutnya
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </Fragment>
    );
};

export default CreateRoom;