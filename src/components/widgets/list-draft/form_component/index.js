import React, { useState, useRef, useEffect, useContext}        from 'react'
import { 
        X, 
        File, 
        Link, 
        Send, 
        Video, 
        Music,
        Edit2,
        Image, 
        MapPin, 
    }                                                           from 'react-feather'
import {
        Form,
        Card, 
        Input,
        Label, 
        Button, 
        Spinner,
        CardBody, 
        FormGroup, 
        InputGroup,
        InputGroupText
    }                                                           from 'reactstrap'
import Select                                                   from 'react-select'
import { selectThemeColors }                                    from '@utils'


//API
import feedsAgentReportAPI                                      from '../../../../services/pages/feeds/agent-reports'
import { feedsDraftAPI }                                        from '../../../../services/pages/feeds/list-draft'
import { CategoryContext }                                      from '../../../../context/CategoryContext'
import { BerandaFileContext }                                   from '../../../utility/context/pages/beranda'
import attachmentUpload, { setMediaData }                       from './attachmentUpload'

import CustomToast                                              from '../../custom-toast'
import FormUrlComponents                                        from '../../feeds/news-feed-add-card/form_url_component/UrlComponent'
import ModalTempatKejadian                                      from '../../feeds/modal-tempat-kejadian/ModalTempatKejadian'

import { ModalBase }                                            from '../../modals-base'
import { NewsPreview }                                          from '../../feeds/news-card-widget/preview';

import * as yup                                                 from "yup";
import { yupResolver }                                          from '@hookform/resolvers/yup';
import { useForm, Controller }                                  from "react-hook-form";
import Helper                                                   from '../../../../helpers'

const typeIcon=(type)=>{
    switch(type){
        case "Link":
            return <Link size={14}/>
        case"Image":
            return <Image size={14}/>
        default:
            return <File size={14}/>
    }
}

const MediaCardValue=({media,button})=>{
    return(
        <Card>
            <CardBody>
                <div className="d-flex justify-content-between">
                    <span>
                        {typeIcon(media.type)} &nbsp;
                        {
                            media.type === 'Link' ?
                                <a target="_blank" href={media.text}>
                                    {media.text}
                                </a>
                            :
                                media.text
                        }
                    </span>
                    <span {...button} className=" cursor-pointer"><X size={14}/></span>
                </div>
                </CardBody>
        </Card>
    )
}

const deleteMedia = (index,medias)=>{
    let cMedia = [...medias];
    cMedia.splice(index,1);
    return cMedia;
}

const HandleFileApp =(e,type,callback)=>{
    let files = e.target.files ;
    let media = [];
    for(let i in files){
        const file = files[i]
        if(typeof file == 'object'){
            media.push(setMediaData(type,file,file.name))
        }
    }
    callback(media);
}

const schema = yup.object({
    title     : yup.string().max(200, 'Jumlah maksimal karakter adalah 200!').required('Kolom judul belum terisi.'),
    what      : yup.string().required('Kolom apa yang terjadi belum terisi.').min(10, 'Jumlah minimal karakter adalah 10!').max(350, 'Jumlah maksimal karakter adalah 350!'),
    when_     : yup.string().required('Kolom kapan peristiwa itu terjadi belum terisi.'),
    where     : yup.string().required('Kolom lokasi kejadian belum terisi.'),
    why       : yup.string().required('Kolom mengapa hal itu terjadi belum terisi.').min(10, 'Jumlah minimal karakter adalah 10!').max(350, 'Jumlah maksimal karakter adalah 350!'),
    who       : yup.string().required('Kolom siapa saja yang terlibat belum terisi.').min(10, 'Jumlah minimal karakter adalah 10!').max(350, 'Jumlah maksimal karakter adalah 350!'),
    category  : yup.array().of(yup.object().shape({ value : yup.string(), label : yup.string()})).min(1, 'Kolom kategori belum terisi').required('Kolom kategori belum terisi'),
}).required();

export const EditDraftComponent = ({getDraftAPI, data, closeModal})=>{

    const {
        getUserData
    }                               = Helper;

    const { 
        control, 
        register,
        setValue,
        getValues,
        handleSubmit,
        formState   : { errors }
    }                               = useForm({resolver: yupResolver(schema)});
    
    const imageRef                  = useRef()
    const fileRef                   = useRef()
    const videoRef                  = useRef()
    const audioRef                  = useRef()
    const {category}                = useContext(CategoryContext);

    let category_ = category.slice(1).map((data) => (
        {
            value   : data.id,
            label   : data.name,
        }
    ));

    const [show,setShow]                          = useState(false)
    const [selected, setSelected]                 = useState(null);    
    const [mediaData,setMediaData]                = useState([])
    const [modalUrlState,setModalUrl]             = useState(false)
    const [isCompleted, setIsCompleted]           = useState(false);
    const [deleteDraft, setDeleteDraft]           = useState([]);
    const [previewForm, setPreviewForm]           = useState(null);
    const [draftAttachments, setDraftAttachments] = useState(null);

    const {attachments,setAttachments}            = useContext(BerandaFileContext)

    const toggle     = () => {setShow(!show)};

    const modalUrl   = {
        modal   : {
            show    : modalUrlState,
            setShow : () => {
                setModalUrl(!modalUrlState)
            }
        },
        formUrl : {
            onSubmit:(media) => {
                let _oldAttachment = attachments;

                _oldAttachment.push({
                    type    : "Link",
                    data    : media,
                    text    : media
                });

                setAttachments([..._oldAttachment]);
                modalUrl.modal.setShow();
            }
        }
    }

    const handleSubmit_ = (formData) => {
        formData.latitude       = data.latitude
        formData.longitude      = data.longitude
        formData.location_name  = data.location_name

        if(selected === 'draft'){
            formData.id         = data.id
            formData.uuid       = getUserData().uuid;
            formData.category   = formData.category.map((data) => ({id: parseInt(data.value)}))
            formData.hashtag    = formData.hashtags.split(" ").map((data) => ({tag : data}));
        }else{
            formData.hashtags   = formData.hashtags.split(" ");
            formData.category   = formData.category.map((data) => ((parseInt(data.value))))
        }

        if(selected === 'agent_report'){
            setIsCompleted(true);
            feedsAgentReportAPI.createAgentReport({...formData}).then(
                res => {
                    if( res.data != null ){
                        
                        //Delete existing draft attachment if exist
                        if(deleteDraft.length > 0){
                            deleteDraft.map((data) => (
                                feedsAgentReportAPI.deleteAgentReportAttachment({attachment_id : data})
                            ))
                        }

                        //move attachment draft
                        feedsDraftAPI.getDraft(data.id, res.data.id).then(
                            () => {
                                //Delete existing draft attachment if exist
                                if(deleteDraft.length > 0){
                                    deleteDraft.map((data) => (
                                        feedsAgentReportAPI.deleteAgentReportAttachment({attachment_id : data})
                                    ))
                                }

                                //delete draft
                                feedsDraftAPI.deleteListDraft(data.id);
                            }
                        )

                        if( attachments.length > 0){
                            //upload attachment
                            attachmentUpload('agent_report',res.data.id,attachments).then(response=>{
                                CustomToast("success","Berhasil Simpan data");
                                
                                setAttachments([]);
                                closeModal();
    
                                setIsCompleted(false);
                            })
                        }else{
                            CustomToast("success","Berhasil Simpan data");
    
                            closeModal();
                            setIsCompleted(false);
                        }
                        
                        getDraftAPI();
                        setPreviewForm(false);
                    }
                }
            ).catch(
                err => {
                    CustomToast("danger","Oops.");
                    console.log(err);
                    setIsCompleted(false);
                }
            )
        }else if(selected === 'draft'){
            feedsDraftAPI.updateDraft({...formData}).then(
                res => {
                    const {data} = res;
                        
                    if( data != null || data != undefined ){

                        //Delete existing draft attachment if exist
                        if(deleteDraft.length > 0){
                            deleteDraft.map((data) => (
                                feedsAgentReportAPI.deleteAgentReportAttachment({attachment_id : data})
                            ))
                        }

                        if( attachments.length > 0){
                            attachmentUpload('draft',data.id,attachments).then(response=>{
                                CustomToast("success","Draft Berhasil Update data");
                                
                                setAttachments([]);

                                closeModal();
                                setIsCompleted(false);
                            })
                        }else{
                            CustomToast("success","Berhasil Update data");
                            closeModal();
                            setIsCompleted(false);
                        }

                        getDraftAPI();

                    }
                }
            ).catch(
                err => {
                    CustomToast("danger","Oops.");
                    console.log(err);
                    setIsCompleted(false);
                }
            )
        }else{
            setPreviewForm(true);
        }
    }

    const processAttachments = (type) => {
        let data_ = [];
        if(data.attachment.length > 0){
            data.attachment.map((data) => (
                data.type === type ?
                    data_.push({
                        id         : data.id,
                        attachment : data.attachment,
                        Name       : data.Name
                    })
                :
                    null
            ))
        }
        return data_;
    }

    const processAttachmentsOff = (type) => {
        let data_ = [];
        if(attachments.length > 0){
            if(type == "Image" || type ==  "Video" || type ==  "Audio") {
                attachments.map((data) => (
                    data.type === type ?
                        data_.push({
                            attachment : URL.createObjectURL(data.data),
                            name: data.text
                        })
                    :
                        null
                ))
            }else if(type == "Document"){
                attachments.map((data) => (
                    data.type === type ?
                        data_.push({
                            attachment : data.data,
                            Name: data.text
                        })
                    :
                        null
                ))
            }else{
                attachments.map((data) => (
                    data.type === type ?
                        data_.push({
                            attachment : data.data,
                            name: data.text
                        })
                    :
                        null
                ))
            }
        }
        return data_;
    }

    useEffect(() => {
        if(data != null){
            setValue('title', data.title);
            setValue('what', data.what);
            setValue('when_', data.when_);
            setValue('where', data.where);
            setValue('why', data.why);
            setValue('who', data.who);
            setValue('how', data.how);

            if(data.hashtag.length > 0){
                setValue('hashtags', data.hashtag.map((data) => (data.tag)).slice(',').join(' '))
            }

            setDraftAttachments(data.attachment.map((data) => (
                {
                    id  : data.attachment_id,
                    type: data.type,
                    text: data.Name != "" ? data.Name : data.attachment
                }
            )));

            if(data.category.length > 0){
                setValue('category', data.category.map((data) => ({label: data.name, value: data.id})))
            }
        }
    }, [data]);

    useEffect(() => {
        let mdata=[];
        if(Array.isArray(attachments)){
            attachments.map(mv=>{
                mdata.push(mv)
            })
        }
        setMediaData(mdata)
    },[show,attachments]);

    return(
        <div>
            {/* location modal */}
            <ModalBase 
                show    = {show} 
                title   = "Tempat Kejadian" 
                setShow = {toggle}
            >
                <ModalTempatKejadian 
                    setLocation = {(location)=>{
                        setValue('where', location.location)
                        toggle();
                    }}
                />
            </ModalBase>

            {/* input link modal */}
            <ModalBase {...modalUrl.modal} title="Buat Tautan">
                <FormUrlComponents {...modalUrl.formUrl}/>
            </ModalBase>

            <ModalBase
                show    = {previewForm} 
                title   = "Preview Berita"
                size    = "lg" 
                setShow = {(par) => {setPreviewForm(par); setIsCompleted(false)}}
                footer  = {
                    <>
                        <Button 
                            size        = "md" 
                            color       = "primary"
                            className   = "mr-1"
                            onClick     = {() => {setPreviewForm(false); setIsCompleted(false)}}
                        >
                            Batal
                        </Button>
                        {
                            !isCompleted ? 
                                <Button
                                    size        = "md" 
                                    type        = "submit"
                                    color       = "primary"
                                    form        = 'form_draft_news'
                                    onClick     = {() => setSelected('agent_report')}
                                    className   = "ml-1" 
                                >
                                    Kirim
                                </Button> 
                            :
                                <Button 
                                    size        = "sm" 
                                    color       = "primary"

                                    disabled    = {true} 
                                >
                                    <Spinner/>
                                </Button>
                        }
                         
                    </>
                }
            >
                <NewsPreview
                    links               = {processAttachments("Link").concat(processAttachmentsOff("Link"))}
                    video               = {processAttachments("Video").concat(processAttachmentsOff("Video"))}
                    audio               = {processAttachments("Audio").concat(processAttachmentsOff("Audio"))}
                    images              = {processAttachments("Image").concat(processAttachmentsOff("Image"))}
                    loading             = {isCompleted}
                    dataNews            = {getValues()}
                    location            = {data.location_name}
                    attachments         = {attachments}
                    setSelected         = {setSelected}
                    handleSubmit        = {handleSubmit_}
                    setPreviewForm      = {setPreviewForm}
                    attachmentFiles     = {processAttachments("Document").concat(processAttachmentsOff("Document"))}
                />
            </ModalBase>

            <Form id="form_draft_news" onSubmit={handleSubmit(handleSubmit_)}>
                <FormGroup>
                    <Label>Judul</Label>
                    <Input
                        type        = "textarea"
                        name        = "title"  
                        invalid     = {'title' in errors}
                        innerRef    = {register({required: true})}
                        className   = 'form-control'
                        placeholder = "Judul..."
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
                    <Label>Kapan peristiwa itu terjadi</Label>
                    <Input
                        type        = "textarea"
                        name        = "when_"
                        invalid     = {'when_' in errors}
                        innerRef    = {register({required: true})}
                        className   = 'form-control'
                        placeholder = "Kapan Peristiwa itu Terjadi..."
                    />
                    
                    {
                        'when_' in errors ? 
                            <div className="invalid-feedback">
                                {errors.when_.message}
                            </div>
                        :
                            null
                    }
                </FormGroup>
                
                <FormGroup>
                    <Label>Lokasi Kejadian</Label>
                    <InputGroup className="input-group-merge mb-2">
                        <Input
                            name        = "where"
                            invalid     = {'where' in errors}
                            innerRef    = {register({required: true})}
                            placeholder = "Lokasi..."
                        />
                        <InputGroupText
                            onClick     = {toggle} 
                            className   = "cursor-pointer"
                        >
                            <MapPin/>
                        </InputGroupText>
                        
                        {
                            'where' in errors ? 
                                <div className="invalid-feedback">
                                    {errors.where.message}
                                </div>
                            :
                                null
                        }
                    </InputGroup>
                </FormGroup>
                
                <FormGroup>
                    <Label>Siapa Saja yang Terlibat</Label>
                    <Input 
                        type        = "textarea"
                        name        = "who"
                        invalid     = {'who' in errors}
                        innerRef    = {register({required: true})}
                        className   = 'form-control'
                        placeholder = "Siapa Saja yang Terlibat..."
                    />
                    {
                        'who' in errors ? 
                            <div className="invalid-feedback">
                                {errors.who.message}
                            </div>
                        :
                            null
                    }
                </FormGroup>

                <FormGroup>
                    <Label>Apa yang terjadi</Label>
                    <Input
                        type        = "textarea"
                        name        = "what"
                        invalid     = {'what' in errors}
                        innerRef    = {register({required: true})}
                        className   = 'form-control'
                        placeholder = "Apa yang terjadi..."
                    />

                    {
                        'what' in errors ? 
                            <div className="invalid-feedback">
                                {errors.what.message}
                            </div>
                        :
                            null
                    }
                </FormGroup>
                
                <FormGroup>
                    <Label>Mengapa hal itu terjadi</Label>
                    <Input
                        type        = "textarea"
                        name        = "why"
                        invalid     = {'why' in errors}
                        innerRef    = {register({required: true})}
                        className   = 'form-control'
                        placeholder = "Mengapa hal itu terjadi..."
                    />
                    
                    {
                        'why' in errors ? 
                            <div className="invalid-feedback">
                                {errors.why.message}
                            </div>
                        :
                            null
                    }
                </FormGroup>

                <FormGroup>
                    <Label>Bagaimana Peristiwa itu terjadi</Label>
                    <Input
                        name        = "how"
                        type        = "textarea"
                        className   = 'form-control'
                        innerRef    = {register()}
                        placeholder = "Bagaimana peristiwa itu terjadi..."
                    />
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
                                isMulti
                                options         = {category_}
                                onChange        = {(val) => console.log(val)}
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
                    <Label>Hastags</Label>
                    <Input
                        name        = "hashtags"
                        invalid     = {'hashtags' in errors}
                        innerRef    = {register()}
                        className   = 'form-control'
                        placeholder = "#Kebakaran #Pencurian"
                    />
                    
                    {
                        'hashtags' in errors ? 
                            <div className="invalid-feedback">
                                {errors.hashtags.message}
                            </div>
                        :
                            null
                    }
                    <Label>Untuk pemisah silahkan menggunakan spasi</Label>
                </FormGroup>

                <FormGroup>
                    <Label>Media</Label>
                    {
                        draftAttachments != null && draftAttachments.map((value,key) => {
                            const button = {
                                onClick : () => {
                                    let oldDraft_ = deleteDraft;
                                    oldDraft_.push(value.id);
                                    setDeleteDraft([...oldDraft_]);

                                    let draft_ = draftAttachments;
                                    draft_.splice(key,1);
                                    setDraftAttachments(draft_);
                                }
                            }
                            return(
                                <MediaCardValue 
                                    key         = {`spr012944-${key}`}
                                    media       = {value} 
                                    button      = {button} 
                                    mediakey    = {key}
                                />
                            )
                        })
                    }
                    {
                        mediaData.map((value,key) => {
                            const button = {
                                onClick : () => {
                                    let media = deleteMedia(key,mediaData);
                                    setAttachments(media);
                                }
                            }
                            return(
                                <MediaCardValue 
                                    key         = {`spr012944-${key}`}
                                    media       = {value} 
                                    button      = {button} 
                                    mediakey    = {key}
                                />
                            )
                        })
                    }
                </FormGroup>

                <FormGroup>
                    <div className="d-flex justify-content-between">

                        {/* Image Input */}
                        <input 
                            ref         = {imageRef}
                            type        = "file" 
                            style       = {{display:'none'}} 
                            accept      = "image/*"
                            onChange    = {(e) => {
                                HandleFileApp(e, "Image", (data) => {
                                    let medias = [...mediaData,...data];
                                    setAttachments(medias);
                                });
                            }} 
                            multiple 
                        />

                        {/* File Input */}
                        <input 
                            ref         = {fileRef} 
                            type        = "file" 
                            style       = {{display:'none'}}  
                            accept      = ".txt,.xls,.xlsx,application/pdf,.ppt,.pptx,.rar,.zip,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange    = {(e) => {
                                HandleFileApp(e, "Document", (data) => {
                                    let medias = [...mediaData,...data];
                                    setAttachments(medias);
                                });
                            }} 
                        />

                        {/* Audio Input */}
                        <input 
                            type   = "file" 
                            style  = {{display:'none'}} 
                            ref    = {audioRef} 
                            accept = ".mp3,.wav,.ogg"
                            onChange = {(e)=>{
                                HandleFileApp(e, "Audio", (data) => {
                                    let medias = [...mediaData,...data];
                                    setAttachments(medias);
                                });
                            }}
                        />

                        {/* Video Input */}
                        <input 
                            type   = "file" 
                            style  = {{display:'none'}} 
                            ref    = {videoRef} 
                            accept = ".mp4,.mkv,.webm"
                            onChange = {(e)=>{
                                HandleFileApp(e, "Video", (data) => {
                                    let medias = [...mediaData,...data];
                                    setAttachments(medias);
                                });
                            }}
                        />

                        <Label>Tambahkan Media</Label>
                        <span>
                            <Button 
                                color     = ""
                                onClick   = {() => {
                                    imageRef.current.click()
                                }} 
                                className = "btn-icon btn-sm" 
                            >
                                <Image/>
                            </Button>
                            <Button 
                                color     = ""
                                onClick   = {() => {
                                    videoRef.current.click()
                                }} 
                                className = "btn-icon btn-sm" 
                            >
                                <Video/>
                            </Button>
                            <Button 
                                color     = ""
                                onClick   = {() => {
                                    audioRef.current.click()
                                }} 
                                className = "btn-icon btn-sm" 
                            >
                                <Music/>
                            </Button>
                            <Button 
                                color       = ""
                                onClick     = {() => {
                                    fileRef.current.click();
                                }} 
                                className   = "btn-icon btn-sm" 
                            >
                                <File/>
                            </Button>
                            <Button 
                                color       = ""
                                onClick     = {() => {
                                    modalUrl.modal.setShow();
                                }} 
                                className   = "btn-icon btn-sm" 
                            >
                                <Link/>
                            </Button>
                        </span>
                    </div>
                </FormGroup>
                
                <FormGroup className="d-flex justify-content-between">
                    <Button 
                        size        = "md" 
                        type        = "submit"
                        color       = "primary"
                        className   = "w-50 mr-1"
                        onClick     = {() => setSelected('draft')}
                    >
                        Simpan Draft
                    </Button>

                    <Button 
                        size        = "md" 
                        type        = "submit"
                        color       = "primary"
                        value       = "agent_report"
                        onClick     = {() => setSelected('preview')}
                        className   = "w-50 ml-1" 
                    >
                        Preview
                    </Button>
                    
                </FormGroup>
            </Form>
            
        </div>
    )
}