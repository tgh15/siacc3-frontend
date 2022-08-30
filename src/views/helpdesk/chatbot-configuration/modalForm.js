import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Form, FormFeedback, FormGroup, Input, Label, ModalFooter } from "reactstrap"
import { ModalBase } from "../../../components/widgets/modals-base"
import * as yup from 'yup'
import { ChatbotCongurationApi } from "../../../services/pages/helpdesk/chatbot-configuration";
import SubmitButton from "../../../components/widgets/submit-button";
import { useState } from "react";

const ModalForm = props => {

    //  props
    const {
        show,
        onClose,
        dataSelected,
        getData,
        typeForm
    } = props

    // states
    const [isLoading, setIsLoading] = useState(false)

    // validation
    const schema = yup.object().shape({
        question: yup.string().required("Isian ini harus diisi"),
        // answer: yup.string().required("Isian ini harus diisi"),
    }).required();

    // hooks form
    const { register,
        errors,
        handleSubmit } =
        useForm({ mode: "onChange", resolver: yupResolver(schema) });

    // methods save data
    const create = formData => {
        ChatbotCongurationApi.create(formData)
            .then(res => {
                getData();
                setIsLoading(false);
                onClose();
            }, err => {
                console.log(err)
                setIsLoading(false);
            });
    }

    // methods update data
    const update = formData => {
        ChatbotCongurationApi.update(formData)
            .then(res => {
                getData();
                setIsLoading(false);
                onClose();
            }, err => {
                console.log(err)
                setIsLoading(false);
            });
    }

    // methods submit form
    const onSubmit = data => {
        setIsLoading(true)
        let formData = data;

        if (dataSelected && typeForm == "create") {
            formData.parent_id = dataSelected.id;
        }
        
        if(!dataSelected && typeForm == "create"){
            formData.parent_id = 0;
        }

        if (typeForm == "update" && dataSelected) {
            formData.id = dataSelected.id;
        }
        console.log(formData);

        if (typeForm == "create") {
            create(formData);
        } else {
            update(formData);
        }

    }

    return (
        <ModalBase
            unmount={true}
            show={show}
            setShow={onClose}
            title={typeForm == "update" ? "Ubah Konfigurasi" : `Tambah Konfigurasi`}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label>Judul</Label>
                    <Input
                        name="question"
                        invalid={(errors.question) ? true : false}
                        innerRef={register()}
                        defaultValue={typeForm == "update" ? dataSelected?.question : ""}
                    />
                    {errors.question && <FormFeedback>{errors.question.message}</FormFeedback>}
                </FormGroup>

                <FormGroup>
                    <Label>Keterangan</Label>
                    <Input
                        name="answer"
                        invalid={(errors.answer) ? true : false}
                        innerRef={register()}
                        defaultValue={typeForm == "update" ? dataSelected?.answer : ""}
                    />
                    {errors.answer && <FormFeedback>{errors.answer.message}</FormFeedback>}
                </FormGroup>

                <FormGroup>
                    <Label>Tautan</Label>
                    <Input
                        name="link"
                        innerRef={register()}
                        defaultValue={typeForm == "update" ? dataSelected?.link : ""}

                    />
                </FormGroup>

                <ModalFooter className="d-flex justify-content-between px-0">
                    <Button
                        color="primary"
                        outline
                        onClick={() => { onClose() }}>
                        Batal
                    </Button>
                    <SubmitButton
                        isLoading={isLoading}
                        color="primary"
                        size="sm">
                        {typeForm == "update" ? "Ubah" : "Tambah"}
                    </SubmitButton>
                </ModalFooter>
            </Form>
        </ModalBase>
    )
}

export default ModalForm