import { Fragment }            from "react";
import { useForm, Controller } from "react-hook-form";
import { 
        Row, 
        Col,
        Form,
        Input,
        Label,
        Button, 
    }                          from "reactstrap"

import moment                  from "moment";
import * as yup                from "yup";
import Flatpickr               from 'react-flatpickr'
import { yupResolver }         from '@hookform/resolvers/yup';

//Css
import '@styles/react/libs/flatpickr/flatpickr.scss';

//Components
import TourInput               from "../../../views/crawling-data/TourInput";
import { ModalBase }           from "../modals-base";

const schema = yup.object({
    to          : yup.date().required('Kolom Sampai Belum Terisi.'),
    from        : yup.date().required('Kolom Dari Belum Terisi.'),
    keyword     : yup.string().required('Kolom Kata Kunci Belum Terisi.'),
}).required();


const CrawlingCreate = (props) => {
    //Props
    const {
        handleSubmit_,
        showSubmitForm,
        setShowSubmitForm,
    }                           = props;

    const { 
        control, 
        register,
        handleSubmit, 
        formState   : { errors }
    }                           = useForm({resolver: yupResolver(schema)});

    return(
        <Fragment>
            <ModalBase
                show            = {showSubmitForm} 
                title           = "Pencarian Crawling"
                setShow         = {(par) => { setShowSubmitForm(par)}} 
                unmountOnClose  = {true}
            >
                {/* Tour */}
                <TourInput/>
                <Form onSubmit = {handleSubmit(handleSubmit_)}>
                    <Row>
                        <Col lg={12}>
                            <Row className='mb-1'>
                                <Label 
                                    sm          = '4' 
                                    for         = 'keyword'
                                    className   = 'form-label' 
                                >
                                    Kata Kunci :
                                </Label>
                                <Col sm='8'>
                                    <div id="keywords">
                                        <Input 
                                            id          = 'keyword' 
                                            type        = 'text' 
                                            name        = "keyword" 
                                            innerRef    = {register({required: true})}
                                            placeholder = 'Kata yang ingin ditelusuri'
                                        />
                                    </div>
                                </Col>
                                <Col sm={{offset: 4, size: 8}}>
                                    <p class="text-danger">{errors.keyword?.message}</p>
                                </Col>
                            </Row>
                            <Row className='mb-1'>
                                <Label 
                                    sm          = '4' 
                                    for         = 'size'
                                    className   = 'form-label' 
                                >
                                    Jumlah Data :
                                </Label>
                                <Col sm='8'>
                                    <div id="amount-data">
                                        <Input 
                                            id          = 'size'
                                            type        = 'text' 
                                            name        = 'size'
                                            innerRef    = {register({required: true})}
                                            placeholder = 'Jumlah Pencarian' 
                                        />
                                    </div>
                                </Col>
                                <Col sm={{offset: 4, size: 8}}>
                                    <p class="text-danger">{errors.size?.message}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Label 
                                    sm        = '4' 
                                    for       = 'size'
                                    className = 'form-label' 
                                >
                                    Atur Tanggal
                                </Label>
                            </Row>
                            <Row className='mb-1'>
                                <Label 
                                    sm        = '2' 
                                    for       = 'from'
                                    className = 'form-label' 
                                >
                                    Dari
                                </Label>
                                <Col sm='4'>
                                    <div id="start-date">
                                        <Controller
                                            as      = {
                                                <Flatpickr 
                                                    id          = 'from' 
                                                    options     = {{ dateFormat: "d-m-Y"}}
                                                    className   = 'form-control' 
                                                    placeholder = {moment().format('D-M-YYYY')}
                                                />
                                            }
                                            name    = "from"
                                            rules   = {{required: true}}
                                            control = {control}
                                        />
                                    </div>
                                </Col>
                                <Label 
                                    sm          = '2' 
                                    for         = 'to'
                                    className   = 'form-label' 
                                >
                                    Sampai
                                </Label>
                                <Col sm='4'>
                                    <div id="end-date">
                                        <Controller
                                            as      = {
                                                <Flatpickr 
                                                    id          = 'to' 
                                                    options     = {{ dateFormat: "d-m-Y"}}
                                                    className   = 'form-control' 
                                                    placeholder = {moment().format('D-M-YYYY')}
                                                />
                                            }
                                            name    = "to"
                                            rules   = {{required: true}}
                                            control = {control}
                                        />
                                    </div>
                                </Col>
                                <Col 
                                    sm        = '6'
                                    className = "mt-1"
                                >
                                    <p class="text-danger">{errors.from?.message}</p>
                                </Col>
                                <Col 
                                    sm        = '6'
                                    className = "mt-1"
                                >
                                    <p class="text-danger">{errors.to?.message}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row 
                        id        = "search-input"
                        className = "d-flex justify-content-center mt-1"
                    >
                        <Button.Ripple
                            type      = "submit"
                            color     = 'primary' 
                            className = "w-25" 
                        >
                            <span className='align-middle ms-25'>Cari</span>
                        </Button.Ripple>
                    </Row>
                </Form>
            </ModalBase>
        </Fragment>
    );
};

export default CrawlingCreate;