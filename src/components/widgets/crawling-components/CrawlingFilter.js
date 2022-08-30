import { Fragment}              from "react";
import { useForm, Controller }  from "react-hook-form";
import { 
        Row, 
        Col,
        Form,
        Input,
        Label,
        Button, 
    }                           from "reactstrap";
import moment                   from "moment";
import Flatpickr                from 'react-flatpickr';

//Components
import TourFilter               from "../../../views/crawling-data/TourFilter";
import { ModalBase }            from "../modals-base";


const CrawlingFilter = (props) => {
    //Props
    const {
        getResultAll,
        handleFilter,
        showFilterForm,
        setShowFilterForm,
    }                           = props;

    const {
        control, 
        register,
        handleSubmit, 
        formState   : { errors }
    }                           = useForm();

    return (
        <Fragment>
            <ModalBase
                show            = {showFilterForm} 
                title           = "Filter Data"
                setShow         = {(par) => { setShowFilterForm(par)}} 
                unmount         = {true}
            >
                {/* Tour */}
                <TourFilter/>

                <Form onSubmit = {handleSubmit(handleFilter)}>
                    <Row>
                        <Col lg={12}>
                            <Row className='mb-1'>
                                <Col 
                                    id        = "asc"
                                    sm        = '2' 
                                    className = "d-flex justify-content-center align-items-center"
                                >
                                    <Input
                                        name        = 'sort'
                                        type        = 'radio'
                                        value       = 'desc'
                                        innerRef    = {register()}
                                        className   = "ml-0"
                                    />
                                </Col>
                                <Label 
                                    sm          = '10' 
                                    for         = 'keyword'
                                    className   = 'form-label'
                                >
                                    Terbaru > Terlama 
                                </Label>
                                <Col sm={{offset: 4, size: 8}}>
                                    <p class="text-danger">{errors.keyword?.message}</p>
                                </Col>
                            </Row>
                            <Row className='mb-1'>
                                <Col 
                                    id        = "desc"
                                    sm        = '2' 
                                    className = "d-flex justify-content-center align-items-center"
                                >
                                    <Input
                                        name        = 'sort'
                                        type        = 'radio'
                                        value       = 'asc'
                                        className   = "ml-0"
                                        innerRef    = {register()}
                                    />
                                </Col>
                                <Label 
                                    sm          = '10' 
                                    for         = 'keyword'
                                    className   = 'form-label' 
                                >
                                    Terlama > Terbaru 
                                </Label>
                                <Col sm={{offset: 4, size: 8}}>
                                    <p class="text-danger">{errors.keyword?.message}</p>
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
                                                    id          = 'start' 
                                                    options     = {{ dateFormat: "d-m-Y"}}
                                                    className   = 'form-control' 
                                                    placeholder = {moment().format('D-M-YYYY')}
                                                />
                                            }
                                            name    = "start"
                                            control = {control}
                                        />
                                    </div>
                                </Col>
                                <Label 
                                    sm        = '2' 
                                    for       = 'to'
                                    className = 'form-label' 
                                >
                                    Sampai
                                </Label>
                                <Col sm='4'>
                                    <div id="end-date">
                                        <Controller
                                            as      = {
                                                <Flatpickr 
                                                    id          = 'end' 
                                                    options     = {{ dateFormat: "d-m-Y"}}
                                                    className   = 'form-control' 
                                                    placeholder = {moment().format('D-M-YYYY')}
                                                />
                                            }
                                            name    = "end"
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
                    <Row className="d-flex justify-content-between px-5 mt-2">
                        <Button.Ripple
                            id        = "reset-input"
                            color     = 'primary' 
                            outline 
                            onClick   = {() => {getResultAll()}}
                            className = "w-25" 
                        >
                            <span className='align-middle ms-25'>Reset</span>
                        </Button.Ripple>
                        <Button.Ripple 
                            id        = "search-input"
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
    )
}

export default CrawlingFilter;