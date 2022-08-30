import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Star } from "react-feather"
import { useForm } from "react-hook-form"
import Rating from "react-rating"
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, ModalFooter, Row } from "reactstrap"
import CustomToast from "../../../components/widgets/custom-toast"
import { ModalBase } from "../../../components/widgets/modals-base"
import SubmitButton from "../../../components/widgets/submit-button"
import SettingPerformanceApi from "../../../services/pages/configuration/setting-performance"
import validationRating from "./validationRating"


const FormRating = props => {

    const {
        data,
        show,
        onClose,
        themeColors,
        isEvent,
        listData,
        refreshData
    } = props

    const [loading, setLoading] = useState(false)
    const [rating, setRating] = useState(0)
    const [errRating, setErrRating] = useState(false)


    const { register, errors, handleSubmit, control } = useForm({ mode: "onChange", resolver: yupResolver(validationRating) });


    const create = data => {

        SettingPerformanceApi.createRating(data)
            .then(res => {
                setLoading(false)
                CustomToast("success", "Berhasil menambahkan rating")
                onClose()
                refreshData()
            }, err => {
                CustomToast("danger", "Gagal menambahkan rating");
                setLoading(false)
            })
    }

    const update = data => {

        SettingPerformanceApi.updateRating(data)
            .then(res => {
                setLoading(false)
                CustomToast("success", "Berhasil mengubah rating")
                onClose()
                refreshData()
            }, err => {
                setLoading(false)
                CustomToast("danger", "Gagal mengubah rating");
            })
    }

    const onSubmit = dataForm => {

        let errRating = "";
        let ratingValue = data && rating == 0 ? data.rating : rating;

        if (ratingValue == 0) {
            errRating = "Rating harus diisi"
        } else {

            // check has rating create
            if (!data && listData &&listData.find(item => item.rating == ratingValue) != undefined) {
                errRating = "Rating sudah ada"
            } else {
                errRating = false;
            }

            // check has rating update
            if (data) {
                if (data.rating != ratingValue && listData.filter(item => item.rating != ratingValue).find(item => item.rating == dataForm.rating) != undefined) {
                    errRating = "Rating sudah ada"
                } else {
                    errRating = false;
                }
            }

        }


        setErrRating(errRating)



        if (errRating === false) {

            setLoading(true)
            let formData = {
                rating: ratingValue,
                basic_points: [
                    {
                        level: 1,
                        points: dataForm.basic_leader
                    },
                    {
                        level: 2,
                        points: dataForm.basic_agent,
                    },
                ],
                trending_points: [
                    {
                        level: 1,
                        points: dataForm.trending_leader
                    },
                    {
                        level: 2,
                        points: dataForm.trending_agent,
                    },
                ]
            }

            if (data) {
                formData.id = data.id
                formData.basic_points[0].id = data?.basic_ratings[0]?.id
                formData.basic_points[1].id = data?.basic_ratings[1]?.id
                formData.trending_points[0].id = data?.trending_ratings[0]?.id
                formData.trending_points[1].id = data?.trending_ratings[1]?.id
                update(formData)
            } else {
                create(formData)
            }

        }

    }

    return (
        <ModalBase
            title={data ? "Ubah Rating" : "Tambah Rating"}
            setShow={() => onClose()}
            size="md"
            show={show}
        >

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-2 mt-1">
                    <Col>
                        <Label className="mr-2" >Pilih Rating</Label>
                        <Rating
                            emptySymbol={<Star size={32} fill='#babfc7' stroke='#babfc7' />}
                            fullSymbol={<Star size={32} fill={themeColors.colors.warning.main} stroke={themeColors.colors.warning.main} />}
                            initialRating={data && rating == 0 ? data.rating : rating}
                            onChange={value => setRating(value)}

                        />
                    </Col>

                </Row>
                {errRating ? <Label className="text-danger mb-1"> {errRating}</Label> : null}


                <h5 style={{ fontWeight: "bold" }}> Basic Point </h5>
                <Row>
                    <Col md={6} sm={12}>
                        <FormGroup>
                            <Label for="basic_leader">Pimpinan</Label>
                            <Input
                                type="number"
                                name="basic_leader"
                                id="basic_leader"
                                innerRef={register}
                                defaultValue={data && isEvent == "rating" ? data?.basic_ratings[0]?.points : 0}
                                invalid={errors.basic_leader ? true : false}
                            />

                            {errors.basic_leader && <FormFeedback>{errors.basic_leader?.message}</FormFeedback>}
                        </FormGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <FormGroup>
                            <Label for="basic_leader">Agent</Label>
                            <Input
                                type="number"
                                name="basic_agent"
                                id="basic_agent"
                                innerRef={register}
                                defaultValue={data && isEvent == "rating" ? data?.basic_ratings[1]?.points : 0}
                                invalid={errors.basic_agent ? true : false}
                            />
                            {errors.basic_agent && <FormFeedback>{errors.basic_agent?.message}</FormFeedback>}
                        </FormGroup>
                    </Col>
                </Row>

                <h5 style={{ fontWeight: "bold" }} className="mt-1"> Trending Point </h5>
                <Row>
                    <Col md={6} sm={12}>
                        <FormGroup>
                            <Label for="trending_leader">Pimpinan</Label>
                            <Input
                                type="number"
                                name="trending_leader"
                                id="trending_leader"
                                innerRef={register}
                                defaultValue={data && isEvent == "rating" ? data?.trending_ratings[0]?.points : 0}
                                invalid={errors.trending_leader ? true : false}
                            />
                            {errors.trending_leader && <FormFeedback>{errors.trending_leader?.message}</FormFeedback>}
                        </FormGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <FormGroup>
                            <Label for="trending_leader">Agent</Label>
                            <Input
                                type="number"
                                name="trending_agent"
                                id="trending_agent"
                                innerRef={register}
                                defaultValue={data && isEvent == "rating" ? data?.trending_ratings[0]?.points : 0}
                                invalid={errors.trending_agent ? true : false}
                            />
                            {errors.trending_agent && <FormFeedback>{errors.trending_agent?.message}</FormFeedback>}
                        </FormGroup>
                    </Col>
                </Row>
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

export default FormRating