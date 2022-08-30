import { useContext, useState } from "react"
import { Button, Col, CustomInput, Form, FormFeedback, FormGroup, Input, Label, Media, ModalFooter, Row } from "reactstrap"
import { ModalBase } from "../../components/widgets/modals-base"
import defaultPhoto from '@src/assets/images/pages/default_280x400.png'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import validation from "./validation"
import SubmitButton from "../../components/widgets/submit-button"
import PublicReportApi from "../../services/pages/public-report"
import CustomToast from "../../components/widgets/custom-toast"
import { PublicReportContext } from "../../context/PublicReportContext"


const BannerForm = (props) => {
    const {
        data,
        onClose
    } = props
    // states
    const [photo, setPhoto] = useState(defaultPhoto)
    const [loading, setLoading] = useState(false)
    const [errImage, setErrorImage] = useState(false)

    const { register, errors, handleSubmit } = useForm({ mode: "onChange", resolver: yupResolver(validation) })
    const { getBanner } = useContext(PublicReportContext)

    const selectPhoto = e => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setPhoto(reader.result)

        }
        reader.readAsDataURL(files[0])
        setErrorImage(false)
    }

    const create = dataForm => {
        PublicReportApi.createBanner({
            datas: dataForm,
            onSuccess: (res) => {
                getBanner()
                onClose()
                setLoading(false)
                CustomToast("success", "Banner Berhasil ditambahkan");

            }, onFail: (err) => {
                setLoading(false)
                CustomToast("danger", err.message)
            }
        })
    }

    const update = dataForm => {
        PublicReportApi.updateBanner({
            id : data.id,
            attachmentId : data.attachment_id,
            datas: dataForm,
            onSuccess: (res) => {
                getBanner()
                onClose()
                setLoading(false)
                CustomToast("success", "Banner Berhasil diubah");

            }, onFail: (err) => {
                setLoading(false)
                CustomToast("danger", err.message)
            }
        })
    }

    const getPhoto = () => {
        if(data && photo == defaultPhoto){
            return data.attachment.content
        }else{
            return photo;
        }
    }

    // function submit button 
    const onSubmit = dataForm => {
        if (!data) {
            if (!dataForm.attachment[0]) {
                setErrorImage(true);
                return false
            }
        }

        setLoading(true)

        if (data) {
            // alert("update")
            update(dataForm)
        } else {
            create(dataForm)
        }

    }

    return (
        <ModalBase
            show={props.show}
            title={`${data ? 'Ubah Banner' : 'Tambah Banner'}`}
            setShow={props.onClose} >
            <p>Banner akan ditampilkan pada halaman Form Laporan Masyarakat</p>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md="6">

                        <Media object className='rounded mr-50' src={getPhoto()} alt='Generic placeholder image' height='210' width='220' />
                    </Col>
                    <Col md="6">
                        <FormGroup>
                            <Label> Ganti Banner</Label>
                            <br />
                            <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                                Upload
                                <Input type='file' accept="image/*" innerRef={register()} name="attachment" onChange={selectPhoto} hidden />
                            </Button.Ripple>
                            <br />
                            {errImage && <span className="text-danger" style={{ fontSize: "12px" }}>Banner Tidak Boleh Kosong</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label> Nomor Urut</Label>
                            <Input
                                type="number"
                                name="sequence"
                                defaultValue={data ? data.sequence : ""}
                                innerRef={register()}
                                invalid={(errors.sequence) ? true : false} />
                            {errors && errors.sequence && <FormFeedback>{errors.sequence.message}</FormFeedback>}
                        </FormGroup>
                        <FormGroup>
                            <Label> Judul</Label>
                            <Input
                                type="text"
                                name="title"
                                defaultValue={data ? data.title : ""}
                                innerRef={register()}
                                invalid={(errors.title) ? true : false} />
                            {errors && errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
                        </FormGroup>

                    </Col>
                    <Col md="12">
                        <FormGroup>
                            <Label> Keterangan</Label>
                            <Input
                                type="textarea"
                                rows="5"
                                name="description"
                                innerRef={register()}
                                defaultValue={data ? data.description : ""}
                                invalid={(errors.description) ? true : false} />
                            {errors && errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
                        </FormGroup>
                    </Col>
                </Row>
                <ModalFooter className="d-flex justify-content-between px-0">
                    <Button.Ripple outline color="primary" onClick={props.onClose}>
                        Batal
                    </Button.Ripple>
                    <SubmitButton color="primary" size="sm" isLoading={loading}>
                        Submit
                    </SubmitButton>
                </ModalFooter>
            </Form>
        </ModalBase>
    )
}


export default BannerForm