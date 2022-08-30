import { useState } from "react"
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Media, ModalFooter, Row } from "reactstrap"
import { ModalBase } from "../../../components/widgets/modals-base"
import SubmitButton from "../../../components/widgets/submit-button"
import defaultIcon from '@src/assets/images/achievement_icon/default_achievement.png';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import validationTrophy from "./validationTrophy";
import { GetSettingPerformance } from "../../../services/pages/configuration/setting-performance/Get";
import SettingPerformanceApi from "../../../services/pages/configuration/setting-performance";
import CustomToast from "../../../components/widgets/custom-toast";

const FormTrophy = props => {

    const {
        data,
        onClose,
        show,
        refreshData
    } = props

    // states  
    const [loading, setLoading] = useState(false)
    const [icon, setIcon] = useState(defaultIcon)
    const [errIcon, setErrIcon] = useState(false)

    // form hook
    const { register, errors, handleSubmit, control } = useForm({ mode: "onChange", resolver: yupResolver(validationTrophy) });

    // function change icon preview
    const selectIcon = e => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setIcon(reader.result);
        }
        reader.readAsDataURL(files[0]);
    };

    // function save data
    const create = data => {

        SettingPerformanceApi.createTrophy(data)
            .then(res => {

                // create request icon
                let formData = new FormData();
                formData.append('trophy_id', res.data.id);
                formData.append('file[]', data.icon);

                // upload icon
                SettingPerformanceApi.uploadIcon(formData).then(
                    res => {
                        setLoading(false)
                        CustomToast("success", "Berhasil menambahkan trophy")
                        onClose()
                        refreshData()
                    }, err => {
                        setLoading(false)
                        CustomToast("danger", err.response.data.message);
                    }
                )

            }, err => {
                setLoading(false)
                CustomToast("danger", "Gagal menambahkan trophy")
            });
    }

    // function update data
    const update = data => {

        SettingPerformanceApi.updateTrophy(data)
            .then(res => {
                if (data.icon) {
                    // create request icon
                    let formData = new FormData();
                    formData.append('trophy_id', data.id);
                    formData.append('old_icon_id', data.old_icon_id);
                    formData.append('file[]', data.icon);

                    // upload icon
                    SettingPerformanceApi.updateIcon(formData).then(
                        res => {
                            setLoading(false)
                            CustomToast("success", "Berhasil mengubah trophy")
                            onClose()
                            refreshData()
                        }, err => {
                            setLoading(false)
                            CustomToast("danger", err.response.data.message);
                        }
                    )
                } else {
                    setLoading(false)
                    CustomToast("success", "Berhasil mengubah trophy")
                    onClose()
                    refreshData()
                }

            }, err => {
                setLoading(false)
                CustomToast("danger", "Gagal menambahkan trophy")
            });
    }

    // function submit form
    const onSubmit = dataForm => {

        // validation Icon
        if (icon == defaultIcon) {
            if (data == null) {
                setErrIcon(true)
            }
        }

        // loading set true
        setLoading(true)

        // create request data
        let formData = {
            name: dataForm.name,
            points: dataForm.points,
            code: dataForm.name.toLowerCase().replace(/ /g, '_'),

        }

        // check process
        if (data) {
            formData.id = data.id
            if (!dataForm.icon) {
                formData.icon_id = data.icon_id
            } else {
                formData.old_icon_id = data.icon_id
                formData.icon = dataForm.icon[0]
            }
            update(formData)
        } else {
            formData.icon = dataForm.icon[0]
            create(formData)
        }


    }

    return (
        <ModalBase
            title={data ? "Ubah Trophy" : "Tambah Trophy"}
            setShow={() => onClose()}
            size="md"
            show={show}
        >
            <Form onSubmit={handleSubmit(onSubmit)}>

                <Row className="d-flex align-items-end mb-2">
                    <Col md="9">
                        <Media>
                            <Media
                                left
                                className='mr-25'
                            >
                                <Media
                                    src={data && icon == defaultIcon ? data.icon : icon}
                                    alt='Generic placeholder image'
                                    width='80'
                                    height='80'
                                    object
                                    className='rounded mr-50'
                                />
                            </Media>
                            <Media
                                body
                                className='mt-75 ml-1'
                            >
                                <Button.Ripple
                                    tag={Label}
                                    size='sm'
                                    color='primary'
                                    className='mr-75'
                                >
                                    Upload
                                    <Input
                                        type='file'
                                        hidden
                                        accept='image/*'
                                        innerRef={register}
                                        name="icon"
                                        onChange={selectIcon}
                                    />
                                </Button.Ripple>
                            </Media>
                        </Media>
                        {errIcon ? <Label className="text-danger"> Isian Belum Terisi </Label> : null}
                    </Col>

                </Row>

                <FormGroup>
                    <Label for="code">Nama</Label>
                    <Input
                        name="name"
                        invalid={(errors.name) ? true : false}
                        innerRef={register()}
                        defaultValue={data?.name}
                    />
                    {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                </FormGroup>

                <FormGroup>
                    <Label for="code">Point</Label>
                    <Input
                        type="number"
                        name="points"
                        invalid={(errors.points) ? true : false}
                        innerRef={register()}
                        defaultValue={data ? data.points : 0}

                    />
                    {errors.points && <FormFeedback>{errors.points.message}</FormFeedback>}
                </FormGroup>

                <ModalFooter className="d-flex justify-content-between px-0">
                    <Button
                        color='primary'
                        outline
                        onClick={onClose}
                    >
                        Batal
                    </Button>
                    <SubmitButton
                        size="sm"
                        isLoading={loading}
                    >
                        {data ? "Ubah" : "Simpan"}
                    </SubmitButton>
                </ModalFooter>
            </Form>
        </ModalBase>
    )
}

export default FormTrophy