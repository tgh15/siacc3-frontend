import { Fragment } from "react";
import { useForm }                                  from "react-hook-form";
import { 
        Row, 
        Col,
        Form,
        Input,
        Label,
        Button, 
    }                                               from "reactstrap"

import { ModalBase }                                from "../modals-base";

import { yupResolver }                              from '@hookform/resolvers/yup';
import * as yup                                     from "yup";

const schema = yup.object({
    name     : yup.string().required('Kolom Nama Belum Terisi.'),
}).required();

const CrawlingSave = (props) => {

    const {
        center,
        createResult,
        selectedData,
        showResultForm,
        setShowResultForm,
    }                                               = props;

    const { 
        register,
        handleSubmit, 
        formState   : { errors }
    }                                               = useForm({resolver: yupResolver(schema)});

    const handleSubmit_ = (data) => {
        const formData = {
            name    : data.name
        }
        createResult(formData);
    };

    return(
        <Fragment>
            <ModalBase
                show            = {showResultForm} 
                title           = "Pencarian Crawling"
                setShow         = {(par) => { setShowResultForm(par)}} 
                unmountOnClose  = {true}
                center          = {center}
            >
                <Form onSubmit  = {handleSubmit(handleSubmit_)}>
                    <Row>
                        <Col lg={12}>
                            <Row className='mb-1'>
                                <Label 
                                    sm          = '4' 
                                    for         = 'name'
                                    className   = 'form-label' 
                                >
                                    Nama Crawling :
                                </Label>
                                <Col sm='8'>
                                    <Input 
                                        id          = 'name' 
                                        type        = 'text' 
                                        placeholder = 'Kata yang ingin ditelusuri'
                                        name        = "name" 
                                        innerRef    = {register({required: true})}
                                        defaultValue= {selectedData != null ? selectedData.name : null}
                                    />
                                </Col>
                                <Col sm={{offset: 4, size: 8}}>
                                    <p class="text-danger">{errors.name?.message}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-center mt-2">
                        <Button.Ripple color = 'primary' className="w-25" type="submit">
                            <span className='align-middle ms-25'>Save</span>
                        </Button.Ripple>
                    </Row>
                </Form>
            </ModalBase>
        </Fragment>
    )
};

export default CrawlingSave;