import { Button, Form, FormGroup, Input, Label, Modal }                 from "reactstrap";
import { ModalBase }                                            from "../../components/widgets/modals-base";
import { useForm, Controller }                                  from "react-hook-form";
import * as yup                                                 from "yup";
import { yupResolver }                                          from '@hookform/resolvers/yup';
import Select                                                   from 'react-select'
import { selectThemeColors }                                    from '@utils'


//context
import { CategoryContext }                                      from '../../context/CategoryContext'
import { useContext }                                           from "react";
import VideoStreamingAPI                                        from "../../services/pages/video-streaming";
import CustomToast from "../../components/widgets/custom-toast";
import Helper from "../../helpers";

const CreateVideoStreaming = (props) => {

    const {
        isAddVideoVisible,
        setIsAddVideoVisible
    }                       = props;

    const schema = yup.object({
        title       : yup.string().max(200, 'Jumlah maksimal karakter adalah 200!').required('Kolom judul siaran belum terisi.'),
        category    : yup.object().shape({ value : yup.string().required('Kolom kategori belum terisi'), label : yup.string().required('Kolom kategori belum terisi')}),
        saved       : yup.object().shape({ value : yup.string().required('Kolom simpan siaran belum terisi'), label : yup.string().required('Kolom simpan siaran belum terisi')}),
        visibility  : yup.object().shape({ value : yup.string().required('Kolom jenis siaran belum terisi'), label : yup.string().required('Kolom jenis siaran belum terisi')}),
    }).required();
    
    const { 
        control, 
        register,
        handleSubmit,
        formState   : { errors }
    }                               = useForm({resolver: yupResolver(schema)});

    const {category}                = useContext(CategoryContext)

    const processSubmit = (data) => {
        const formData = {
            uuid        : Helper.getUserData().uuid,
            title       : data.title,
            category    : data.category.value,
            visibility  : data.visibility.value,
        }

        if(data.saved.value === '1'){
            formData.saved_by = [Helper.getUserData().uuid]
        }

        
        VideoStreamingAPI.CreateVideoStreaming(formData).then(
            res => {
                if(res.is_error === false){
                    setIsAddVideoVisible(false);

                    CustomToast('success', 'Siaran Langsung Berhasil Dibuat');
                    setTimeout(() => (
                        window.location.href = `/video-streaming/${res.data.id}`
                    ), 2000)
                }
            },
            err => {
                console.log(err, 'create video streaming');
            }
        )
    }

    return (
        <>
            <ModalBase
                show    = {isAddVideoVisible}
                title   = "Tambah Siaran Langsung"
                setShow = {(par) => setIsAddVideoVisible(par)}
            >
                
                <Form onSubmit={handleSubmit(processSubmit)}>
                    <FormGroup>
                        <Label>Judul Siaran</Label>
                        <Input
                            type        = "text"
                            name        = "title"  
                            invalid     = {'title' in errors}
                            innerRef    = {register({required: true})}
                            className   = 'form-control'
                            placeholder = "Judul Siaran..."
                        />

                        {
                            'title' in errors ? 
                                <div className="invalid-feedback">
                                    {errors.title.message}
                                </div>
                            :
                                null
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>Pilih Kategori</Label>
                        <Controller
                            name    = "category"
                            rules   = {{required: true}}
                            control = {control}
                            as      = {
                                <Select
                                    id              = {'category'}
                                    theme           = {selectThemeColors}
                                    options         = {category.slice(2).map((data) => (
                                        {
                                            value   : data.id,
                                            label   : data.name,
                                        }
                                    ))}
                                    isInvalid       = {'category' in errors ? true : false}
                                    className       = {`react-select ${'category' in errors ? 'is-invalid' : ''}` }
                                    isClearable     = {true}
                                    classNamePrefix = 'select'
                                />
                            }
                        />
                        {
                            'category' in errors ? 
                                <div className="invalid-feedback">
                                    {errors.category.message}
                                </div>
                            :
                                null
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>Jenis Siaran</Label>
                        <Controller
                            name    = "visibility"
                            rules   = {{required: true}}
                            control = {control}
                            as      = {
                                <Select
                                    id              = {'visibility'}
                                    theme           = {selectThemeColors}
                                    options         = {[
                                        {label : 'Siaran Publik', value : 'public'},
                                        {label : 'Siaran Private', value : 'private'},
                                    ]}
                                    isInvalid       = {'visibility' in errors ? true : false}
                                    className       = {`react-select ${'visibility' in errors ? 'is-invalid' : ''}` }
                                    classNamePrefix = 'select'
                                />
                            }
                        />
                        {
                            'visibility' in errors ? 
                                <div className="invalid-feedback">
                                    {errors.visibility.message}
                                </div>
                            :
                                null
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label>Simpan Siaran</Label>
                        <Controller
                            name    = "saved"
                            rules   = {{required: true}}
                            control = {control}
                            as      = {
                                <Select
                                    id              = {'saved'}
                                    theme           = {selectThemeColors}
                                    options         = {[
                                        {label : 'Ya', value : 1},
                                        {label : 'Tidak', value :0}
                                    ]}
                                    className       = {`react-select` }
                                    isClearable     = {true}
                                    classNamePrefix = 'select'
                                />
                            }
                        />
                        {
                            'saved' in errors ? 
                                <div className="invalid-feedback">
                                    {errors.saved.message}
                                </div>
                            :
                                null
                        }
                    </FormGroup>
                    <FormGroup>
                        <Button 
                            size        = "md" 
                            type        = "submit"
                            color       = "primary"
                            className   = "w-100" 
                        >
                            Buat Siaran Langsung
                        </Button>   
                    </FormGroup>
                </Form>
            </ModalBase>
        </>
    );
}

export default CreateVideoStreaming;