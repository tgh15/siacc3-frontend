import React, { 
    Fragment, 
    useState, 
    useEffect,
} from 'react';

import { 
    Col, 
    Row,
    Card, 
    Form, 
    Input, 
    Button, 
    Spinner,
    CardBody, 
    FormGroup,
    CustomInput,
    FormFeedback,
} from 'reactstrap';

//Summernote
import ReactSummernote                  from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles

import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';

import parse                            from 'html-react-parser';
import { useParams }                    from "react-router-dom";
import { useForm, Controller }          from "react-hook-form";

//Icon
import { ArrowLeftCircle }              from 'react-feather';

//Component
import CustomToast                      from '../../../components/widgets/custom-toast';
import { ModalBase }                    from '../../../components/widgets/modals-base';

//URL API
import { SettingsAPI }                  from '../../../services/pages/helpdesk/settings';
import { InstructionAPI }               from '../../../services/pages/helpdesk/instruction';


const CreateInstructions = () => {
    let { id }                          = useParams();

    //State
    const [loading, setLoading]           = useState(false);
    const [selected, setSelected]         = useState(false);
    const [getDetail, setGetDetail]       = useState(null);
    const [allCategory, setAllCategory]   = useState(false);
    const [previewForm, setPreviewForm]   = useState(false);

    const { 
        errors,
        control, 
        register,
        setValue,
        getValues,
        handleSubmit 
    } = useForm({ mode: "onChange" })

    useEffect(() => {
        if (id != undefined) {
            detailUpdate();
        }
        
        getAllCategory();
    }, []);

    //Get all category
    const getAllCategory = () => {
        SettingsAPI.getAllCategory().then(
            res => {
                if (res.status === 200 && res.data != null) {
                    setAllCategory(res.data);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //Get detail update
    const detailUpdate = () => {
        InstructionAPI.detailUpdateGuide(id).then(
            res => {
                setValue('content', res.data.content);
                setGetDetail(res.data);
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //Create
    const handleCreate = (dataForm) => {
        setLoading(true);

        const formData = {
            title               : dataForm.title,
            content             : dataForm.content,
            guide_category_id   : parseInt(dataForm.guide_category_id)
        };

        InstructionAPI.createGuide(formData).then(
            res => {
                if (res.status === 200) {
                    setLoading(false);

                    //Success Message
                    CustomToast("success", "Data Berhasil Disimpan");

                    //Refresh Page
                    window.location.href = '/helpdesk/instruction';
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
        setLoading(true);

        const formData = {
            id                  : parseInt(dataForm.id),
            title               : dataForm.title,
            content             : dataForm.content,
            guide_category_id   : parseInt(dataForm.guide_category_id)
        };

        InstructionAPI.updateGuide(formData).then(
            res => {
                if (res.status === 200) {
                    setLoading(false);

                    //Success Message
                    CustomToast("success", "Data Berhasil Diubah");

                    //Refresh Page
                    window.location.href = '/helpdesk/instruction';
                }
            },
            err => {
                setLoading(false);
                CustomToast("danger", err.message);
            }
        )
    };

    const handleSummernoteImageUpload = async (image) => {

        let base64 = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image[0]);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        await base64.then(
            res => {
                console.log(res);
                ReactSummernote.insertImage(res, val => console.log(val));
            },
            err => {
                console.log('err', err);
            }
        )
    };

    const onSubmit = dataForm => {
        if (selected === "preview") {
            setPreviewForm(true);
        }else{
            if (!getDetail) {
                handleCreate(dataForm);
            }else{
                handleUpdate(dataForm);
            }
        }
    };

    return (
        <Fragment>
            <div className="d-flex mb-2">
                <a href="/helpdesk/instruction">
                    <ArrowLeftCircle size={35}/>
                </a>
                <h4 
                    style       = {{ margin: '7px 0px 0px 20px' }}
                    className   = "font-weight-bolder" 
                >
                    {getDetail ? "Ubah" : "Buat"} Postingan
                </h4>
            </div>
            <Card>
                <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md="8">
                                <FormGroup>
                                    {
                                        getDetail && 
                                        <Input 
                                            name         = "id" 
                                            type         = "hidden" 
                                            innerRef     = {register({ required: true })}
                                            defaultValue = {getDetail.id} 
                                        /> 
                                    }

                                    <Input
                                        name         = "title"
                                        innerRef     = {register()} 
                                        placeholder  = "Masukan judul postingan"
                                        defaultValue = {(getDetail) ? getDetail.title : null}
                                    />
                                    {
                                        errors && errors.title && 
                                        <FormFeedback>
                                            {errors.title.message}
                                        </FormFeedback>
                                    }
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <CustomInput
                                        id       = 'input-position'
                                        type     = 'select'
                                        name     = 'guide_category_id'
                                        innerRef = {register()}
                                    >
                                        <option 
                                            value    = ""
                                            disabled 
                                            selected 
                                        >
                                            Pilih Kategori
                                        </option>
                                        {
                                            allCategory && allCategory.map((data) => (
                                                <option
                                                    key      = {data.key}
                                                    value    = {data.id}
                                                    selected = {(getDetail) ? data.id == getDetail.guide_category_id : false}
                                                >
                                                    {data.name}
                                                </option>
                                            ))
                                        }
                                    </CustomInput>
                                    {
                                        errors && errors.guide_category_id && 
                                        <FormFeedback>
                                            {errors.guide_category_id.message}
                                        </FormFeedback>
                                    }
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Controller
                                as      = {
                                    <ReactSummernote
                                        onImageUpload   = {handleSummernoteImageUpload}
                                        options         = {{
                                            height        : 350,
                                            dialogsInBody : true,
                                            toolbar: [
                                                ['style', ['style']],
                                                ['font', ['bold', 'underline', 'clear']],
                                                ['fontname', ['fontname']],
                                                ['para', ['ul', 'ol', 'paragraph']],
                                                ['table', ['table']],
                                                ['insert', ['link', 'picture', 'video']],
                                                ['view', ['fullscreen', 'codeview']]
                                            ]
                                        }}
                                    />
                                }
                                name         = "content"
                                rules        = {{required: true}}
                                control      = {control}
                            />
                            {
                                errors && errors.content && 
                                <FormFeedback>
                                    {errors.content.message}
                                </FormFeedback>
                            }
                        </FormGroup>
                        <div className="text-center">
                            <ModalBase
                                show    = {previewForm} 
                                size    = "lg" 
                                title   = "Preview Postingan"
                                setShow = {(par) => setPreviewForm(par)}
                            >
                                <h5 className="font-weight-bolder mb-1">
                                    {getValues().title}
                                </h5>
                                <p className='text-justify m-0'>
                                    {getValues().content != null ? parse(getValues().content): getValues().content}
                                </p>
                            </ModalBase>

                            <Button 
                                color     = 'primary' 
                                type      = "submit"
                                onClick   = {() => setSelected("preview")}
                                className = "mr-1"
                            >
                                Preview
                            </Button>

                            {
                                loading ?
                                    <Button 
                                        color       = "primary"
                                        disabled    = {true}
                                        className   = "mr-1"
                                    >
                                        <Spinner/>
                                    </Button>
                                :
                                    <Button 
                                        color     = 'primary' 
                                        type      = "submit"
                                        onClick   = {() => setSelected("save")}
                                        className = "mr-1"
                                    >
                                        Simpan
                                    </Button>
                            }
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Fragment>
    );
};

export default CreateInstructions;