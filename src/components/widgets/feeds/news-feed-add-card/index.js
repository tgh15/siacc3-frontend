
import {Fragment, useContext, useRef, useState }        from "react"
import { Link, Image, File, Music, Video }              from "react-feather"

import ContainerFluid                                   from "../../fluid"
import RowAvatarWidget                                  from "../../rw-avatar"
import FormUrlComponents                                from "./form_url_component/UrlComponent"

import { ModalBase }                                    from "../../modals-base"
import { setMediaData }                                 from "./form_component/attachmentUpload"
import { BerandaFileContext }                           from "../../../utility/context/pages/beranda"
import { AddBeritaFormComponent }                       from "./form_component"
import { Row,Button, Card, CardBody}                    from "reactstrap"
import { feedsDraftAPI }                                from "../../../../services/pages/feeds/list-draft"
import FormDelete                                       from "../../form-delete/FormDelete";

export const NewsFeedAddWidget = (props)=>{

    const {attachments, setAttachments}                 = useContext(BerandaFileContext);

    const [isLink,setIsLink]                            = useState(false);
    const [draftId, setDraftId]                         = useState(false);
    const [modalUrl,setModalUrl]                        = useState(false);
    const [showmodal,showModaldata]                     = useState(false);
    const [modalUnmount, setModalUnmount]               = useState(false);
    const [showDeleteForm, setShowDeleteForm]           = useState(false);

    const refPic                                        = useRef(null)
    const refFile                                       = useRef(null)
    const refAudio                                      = useRef(null)
    const refVideo                                      = useRef(null)

    const toggle =  {
        formModal       : () => {showModaldata(!showmodal)},
        urlModal        : () => {setModalUrl(!modalUrl)},
        deleteModal     : () => {setShowDeleteForm(!showDeleteForm)}
    }

    const submitUrlModals = (media)=>{

        let _oldAttachment = attachments;

        _oldAttachment.push({
            type    : "Link",
            data    : media,
            text    : media
        });

        setAttachments([..._oldAttachment]);
        setIsLink(true)
        toggle.urlModal();
    }

    const onURLAtModalCommonClicked = ()=>{
        toggle.urlModal()
    }

    const handleFile        = (e,type) => {
        return new Promise((resolve,reject)=>{
            try{

                let files = e.target.files 
                let media = [] 
                for(let i in files){
                    const file = files[i]
                    if(typeof file =='object'){
                        media.push(setMediaData(type,file,file.name))
                    }
                }
                resolve(media)
            }catch(er){
                reject(er)
            }

        })
    }

    const deleteDraft = () => {
        if(draftId != null){
            feedsDraftAPI.deleteListDraft(draftId).then(
                res => {
                    setShowDeleteForm(false);
                },
                err => {
                    console.log(err,'beranda delete draft')
                }
            )
        }
    };

    return(
        <Fragment>
            <FormDelete
                show        = {showDeleteForm}
                title       = "Ingin Jadikan Draft"
                setShow     = {(par) => setShowDeleteForm(par)}
                // loading     = {loading} 
                onDelete    = {deleteDraft}
                // description = {`${dataSelected.name}`}
            />
            <Card>
                <CardBody>
                    {/* Image Input */}
                    <input 
                        multiple 
                        type     = "file" 
                        style    = {{display:'none'}} 
                        accept   = "image/*" 
                        ref      = {refPic}
                        onChange = {(e)=>{
                            handleFile(e,"Image").then(result=>{
                                setAttachments(result)
                                toggle.formModal()
                            }).catch(err=>console.log("something error",err))
                        }}
                    />

                    {/* File Input */}
                    <input 
                        type   = "file" 
                        style  = {{display:'none'}} 
                        ref    = {refFile} 
                        accept = ".txt,.xls,.xlsx,application/pdf,.ppt,.pptx,.rar,.zip,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.mp4"
                        onChange = {(e)=>{
                            handleFile(e,"Document").then(result=>{
                                setAttachments(result)
                                toggle.formModal()
                            }).catch(err=>console.log("something error",err))
                        }}
                    />

                    {/* Audio Input */}
                    <input 
                        type   = "file" 
                        style  = {{display:'none'}} 
                        ref    = {refAudio} 
                        accept = ".mp3,.wav,.ogg"
                        onChange = {(e)=>{
                            handleFile(e,"Audio").then(result=>{
                                setAttachments(result)
                                toggle.formModal()
                            }).catch(err=>console.log("something error",err))
                        }}
                    />

                    {/* Video Input */}
                    <input 
                        type   = "file" 
                        style  = {{display:'none'}} 
                        ref    = {refVideo} 
                        accept = ".mp4,.mkv,.webm"
                        onChange = {(e)=>{
                            handleFile(e,"Video").then(result=>{
                                setAttachments(result)
                                toggle.formModal()
                            }).catch(err=>console.log("something error",err))
                        }}
                    />

                    <ModalBase 
                        show        = {showmodal} 
                        title       = {"Buat Postingan Berita"}
                        setShow     = {toggle.formModal} 
                        unmount     = {modalUnmount}
                        onclose     = {toggle.deleteModal}
                    >
                        <ContainerFluid>
                            <AddBeritaFormComponent 
                                onUrl           = {() => {onURLAtModalCommonClicked()}}  
                                onSave          = {() => {props.onSave()}} 
                                isLink          = {isLink} 
                                draftId         = {draftId}
                                closeModal      = {toggle.formModal} 
                                setDraftId      = {setDraftId}
                                deleteDraft     = {deleteDraft}
                                setModalUnmount = {setModalUnmount}
                            />
                        </ContainerFluid>
                    </ModalBase>

                    <ModalBase 
                        show    = {modalUrl} 
                        title   = "Buat Tautan" 
                        setShow = {toggle.urlModal}
                    >
                        <ContainerFluid>
                            <FormUrlComponents 
                                onSubmit = {(mediaText) => {submitUrlModals(mediaText)}}
                                cancel   = {() => {toggle.urlModal()}}
                            />
                        </ContainerFluid>
                    </ModalBase>
                    
                    <ContainerFluid style={{paddingTop:"1em"}}>
                        <Row>
                            <RowAvatarWidget
                                img = {JSON.parse(localStorage.getItem('userData')).photo}
                            />
                            <div className='col'>
                                <div 
                                    onClick     = {() => {showModaldata(true)}} 
                                    className   = "form-control"
                                >
                                    <span className="text-muted">Tulis Berita anda...</span>
                                </div>
                            </div>
                        </Row>
                        <Row 
                            style       = {{marginTop:"1em"}}
                            className   = "justify-content-center" 
                        >
                            <div className="col text-center">
                                <Button 
                                    color       = "" 
                                    onClick     = {() => { refPic.current.click() }} 
                                    className   = "btn-icon"
                                >
                                    <Image /><br/>
                                    <small>Album</small>
                                </Button>
                            </div>

                            <div className="col text-center">
                                <Button 
                                    color       = "" 
                                    onClick     = {() => { refVideo.current.click() }} 
                                    className   = "btn-icon"
                                >
                                    <Video /><br/>
                                    <small>Video</small>
                                </Button>
                            </div>


                            <div className="col text-center">
                                <Button 
                                    color       = "" 
                                    onClick     = {() => { refAudio.current.click() }} 
                                    className   = "btn-icon"
                                >
                                    <Music /><br/>
                                    <small>Audio</small>
                                </Button>
                            </div>

                            <div className="col text-center">
                                <Button
                                    color       = ""
                                    onClick     = {()=>{toggle.urlModal()}}
                                >
                                    <Link/><br/>
                                    <small>Tautan</small>
                                </Button>
                            </div>
                            
                            <div className="col text-center">
                                <Button 
                                    color       = ""
                                    onClick     = {()=>{refFile.current.click()}} 
                                >
                                    <File/><br/><small>Berkas</small>
                                </Button>
                            </div>
                            
                        </Row>
                    </ContainerFluid>

                </CardBody>

            </Card>
        </Fragment>
    )
}