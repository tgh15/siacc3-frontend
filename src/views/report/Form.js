import { 
    Fragment, 
    useState, 
    useEffect, 
    useContext,
} from "react";
import { 
    Col, 
    Row, 
    Badge, 
    Input, 
    Label,
    Button, 
    FormGroup, 
    ModalFooter, 
    CustomInput,
    Form
} from "reactstrap";

import "./Report.scss";
import '@styles/react/libs/flatpickr/flatpickr.scss';

import Card                     from "reactstrap/lib/Card";
import moment                   from "moment";
import Select                   from "react-select";
import CardBody                 from "reactstrap/lib/CardBody";
import CardText                 from "reactstrap/lib/CardText";
import Flatpickr                from 'react-flatpickr';
import { useForm }              from "react-hook-form";
import { selectThemeColors }    from '@utils';
import { ReactSortable }        from 'react-sortablejs';

//Component
import IconSwitch               from '../../components/widgets/icon-switch/IconSwitch';
import SubmitButton             from '../../components/widgets/submit-button';

//Context
import { EmployeeContext }      from "../../context/EmployeeContext";
import { CategoryContext }      from "../../context/CategoryContext";
import { WorkunitContext }      from "../../context/WorkunitContext";
import { PerformanceContext }   from "../../context/PerformanceContext";
import CustomToast from "../../components/widgets/custom-toast";


const FormReport = (props) => {
    //Props
    const { onCancel }                          = props;

    //Context
    const { category }                          = useContext(CategoryContext);
    const { workunit }                          = useContext(WorkunitContext);
    const { workunitOptionsApproval }           = useContext(PerformanceContext);
    const { employees }                         = useContext(EmployeeContext);

    //State
    const [categoryFilter, setCategoryFilter]   = useState([]);
    const [employeeFilter, setEmployeeFilter]   = useState([]);
    const [inputCreateDate, setInputCreateDate] = useState(false);

    const [endDate, setEndDate]                 = useState(null);
    const [isFormat, setIsFormat]               = useState(null);
    const [startDate, setStartDate]             = useState(null);
    const [formatType, setFormatType]           = useState(null);

    const [request,setRequest]                  = useState({
        end             : null,
        time            : null,
        start           : null,
        title           : null,
        repeat          : null,
        content         : null,
        filter_agent    : null,
        filter_workunit : null,
        filter_category : null,
    });

    const [inputErr,setInputErr]                = useState({
        end             : false,
        start           : false,
        title           : false,
        content         : false,
        filter_category : false,
    });

    const { register, errors, handleSubmit }    = useForm({ mode: "onChange" });

    //Category filter select options
    const Category = () => {
        let data_ = category.map((data ) => (
            {
                label : data.name,
                value : data.id
            }
        ))

        setCategoryFilter(data_);
    };

    //Workunit filter select options
    const Employee = () => {
        let data_ = employees.map((data ) => (
            {
                label : data.name,
                value : data.id
            }
        ))

        setEmployeeFilter(data_);
    };

    const handleFinish = () => {
        let err_ = {...inputErr};
        let formData;

        if(request.title === null){
            err_.title = true;
        }else{
            err_.title = false;
        }

        if(request.start === null ){
            err_.start = true;
        }else{
            err_.start = false;
        }

        if(request.end === null ){
            err_.end = true;
        }else{
            err_.end = false;
        }

        if(request.content === null ){
            err_.content = true;
        }else{
            err_.content = false;
        }

        if(request.filter_category === null ){
            err_.filter_category = true;
        }else{
            err_.filter_category = false;
        }

        setInputErr(err_);

        if(!(err_.title && err_.content && err_.filter_category && startDate != null && endDate != null)){
            //Get Items ID
            let _newOrder   = [];
            let _newFilter  = [];

            if(isFormat == true) {

                if(formatType === 'yearly'){
                    _newOrder.push(11,17,19);
                }else{
                    _newOrder.push(11,18,19);
                }

                formData = {
                    model : {
                        title        : request.title,
                        start        : moment(startDate).format('YYYY-MM-DDTH:mm:ssZ'),
                        end          : moment(endDate).format('YYYY-MM-DDTH:mm:ssZ'),
                        contents_id  : _newOrder,
                        is_formatted : true
                    }
                }
            }else{
                console.log(request, 'request');
                if(request.content != null && request.content.filter(e => e.value == 10 || e.value == 11).length > 0){
                    CustomToast('warning', 'ada.')
                }else{
                    CustomToast('warning', 'Tidak ada.')
                }

                if(request.content != null){
                    request.content.map((data) => (
                        _newOrder.push(data.value)
                    ));
                }
    
                //Get Category Filter
                if(request.filter_category != null){
                    request.filter_category.map((data) => (
                        _newFilter.push({
                            report_filter_type_id: 1,
                            keyword : data.label
                        })
                    ));
                }
    
                if(request.filter_workunit != null){
                    request.filter_workunit.map((data) => (
                        _newFilter.push({
                            report_filter_type_id: 2,
                            keyword : data.value
                        })
                    ));
                };
    
                if(request.filter_agent != null){
                    request.filter_agent.map((data) => (
                        _newFilter.push({
                            report_filter_type_id: 3,
                            keyword : data.value
                        })
                    ));
                };

                if(request.time != null){
                    formData.time = moment(request.time).format('YYYY-MM-DDTH:mm:ssZ');
                }
    
                if(request.repeat != null){
                    formData.repeat = request.repeat;
                }
                
                formData = {
                    model : {
                        title        : request.title,
                        start        : moment(startDate).format('YYYY-MM-DDTH:mm:ssZ'),
                        end          : moment(endDate).format('YYYY-MM-DDTH:mm:ssZ'),
                        contents_id  : _newOrder,
                        filters      : _newFilter,
                        is_formatted : false
                    }
                }

            }
            console.log(formData);
            // props.onSubmit(formData);
        }
    };

    useEffect(() => {
        Category();
        Employee();
    }, []);

    return (
        <Fragment>
            <Form onSubmit={handleSubmit(handleFinish)}>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for='judul'>Jenis Format</Label>
                            <Select
                                options = {[
                                    {value: true, label : 'Sudah Ditentukan'},
                                    {value: false, label : 'Belum Ditentukan'},
                                ]}
                                onChange = {(value) => setIsFormat(value.value)}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                {
                    isFormat != null ?
                        <Row>
                            <Col 
                                md = "6" 
                                sm = "12"
                            >
                                <FormGroup>
                                    <Label for='judul'>Judul Laporan</Label>
                                    <div id="report-title">
                                        <Input 
                                            id          = 'judul' 
                                            name        = 'title'
                                            type        = 'text' 
                                            onChange    = {(e) => {
                                                let value   = e.target.value;
                                                let data    = {...request};
                                                let err     = {...inputErr};

                                                if(value.length > 0){
                                                    data.title = value;
                                                    err.title  = false;
                                                }else{
                                                    data.title = null;
                                                }

                                                setRequest(data);
                                                setInputErr(err);
                                            }}
                                            className   = {`form-control ${ !inputErr.title ?"":"is-invalid"}`}
                                        />
                                    </div>
                                    {
                                        inputErr.title ?
                                            <Label className="text-danger">Judul Laporan Belum Terisi!</Label>
                                        : null
                                    }
                                </FormGroup>
                            </Col>
                            <Col md ={12}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for='tgl_awal'>Tanggal Awal</Label>
                                            <div id="start-date">
                                                <Flatpickr 
                                                    id          = 'tgl_awal'
                                                    name        = "start"
                                                    className   = {`form-control `}
                                                    options     = {{ dateFormat: "d-m-Y H:i", enableTime: true, time_24hr: true }}
                                                    onChange    = {(value) => {
                                                        setStartDate(value[0]);
                                                    }}
                                                />
                                            </div>
                                            {
                                                startDate == null ?
                                                    <Label className="text-danger">Tanggal Awal Belum Terisi!</Label>
                                                : null
                                            }
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for='tgl_akhir'>Tanggal Akhir</Label>
                                            <div id="end-date">
                                                <Flatpickr 
                                                    id          = 'tgl_akhir' 
                                                    name        = "end"
                                                    className   = {`form-control`}
                                                    options     = {{ dateFormat: "d-m-Y H:i", enableTime: true, time_24hr: true }}
                                                    onChange    = {(value) => {
                                                        setEndDate(value[0]);
                                                    }}
                                                />
                                            </div>
                                            {
                                                endDate == null ?
                                                    <Label className="text-danger">Tanggal Akhir Belum Terisi!</Label>
                                                : null
                                            }
                                        </FormGroup>
                                    </Col>
                                </Row>

                            </Col>

                            {
                                isFormat ? 
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for='judul'>Format Laporan</Label>
                                            <Select
                                                options = {[
                                                    {value: 'yearly', label : 'Data Satuan Kerja Tahunan'},
                                                    {value: 'monthly', label : 'Data Satuan Kerja Bulanan'},
                                                ]}
                                                onChange = {(value) => setFormatType(value.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                :
                                    <>
                                        <Col 
                                            md = "6" 
                                            sm = "12"
                                        >
                                            <FormGroup>
                                                <Label for='id'>Jadwalkan Laporan?</Label><br/>
                                                <div id="schedule-report">
                                                    <CustomInput 
                                                        id          = 'icon-primary' 
                                                        name        = 'icon-primary' 
                                                        type        = 'switch' 
                                                        label       = {<IconSwitch/>} 
                                                        inline 
                                                        onChange    = {() => setInputCreateDate(!inputCreateDate)} 
                                                    />
                                                </div>
                                            </FormGroup>

                                            {
                                                (inputCreateDate) ?
                                                    <div>
                                                        <FormGroup>
                                                            <Label for='tgl_laporan'>Tanggal Laporan Dibuat</Label>
                                                            <Flatpickr 
                                                                id          = 'tgl_laporan'
                                                                name        = 'time'
                                                                className   = {`form-control ${ !inputErr.start ?"":"is-invalid"}`}
                                                                options     = {{ dateFormat: "d-m-Y H:i", enableTime: true, time_24hr: true }}
                                                                onChange    = {(value) => {
                                                                    let data  = {...request};

                                                                    if(value.length > 0){
                                                                        data.time = value[0];
                                                                    }else{
                                                                        data.time = null;
                                                                    }

                                                                    setRequest(data);
                                                                }}
                                                            />
                                                        </FormGroup>

                                                        <FormGroup>
                                                            <Label for='id'>Pengulangan Laporan</Label>
                                                            <div className='demo-inline-spacing'>
                                                                <CustomInput 
                                                                    id              = 'exampleCustomRadio' 
                                                                    type            = 'radio' 
                                                                    name            = 'repeat' 
                                                                    label           = 'Satu Kali'
                                                                    value           = 'single'
                                                                    inline 
                                                                    invalid         = {(errors.repeat) ? true : false}
                                                                    innerRef        = {register()}
                                                                    defaultChecked
                                                                />
                                                                <CustomInput 
                                                                    type        = 'radio' 
                                                                    id          = 'exampleCustomRadio2' 
                                                                    name        = 'repeat' 
                                                                    label       = 'Harian'
                                                                    value       = 'daily'
                                                                    inline 
                                                                    onChange    = {(e) => {
                                                                        let value = e.target.value;
                                                                        let data  = {...request};

                                                                        if(value.length > 0){
                                                                            data.repeat = value;
                                                                        }else{
                                                                            data.repeat = null;
                                                                        }

                                                                        setRequest(data);
                                                                    }}
                                                                />
                                                                <CustomInput 
                                                                    id          = 'exampleCustomRadio3' 
                                                                    type        = 'radio' 
                                                                    name        = 'repeat' 
                                                                    label       = 'Mingguan'
                                                                    value       = 'weekly'
                                                                    inline 
                                                                    onChange    = {(e) => {
                                                                        let value = e.target.value;
                                                                        let data  = {...request};

                                                                        if(value.length > 0){
                                                                            data.repeat = value;
                                                                        }else{
                                                                            data.repeat = null;
                                                                        }

                                                                        setRequest(data);
                                                                    }}
                                                                />
                                                                <CustomInput 
                                                                    type        = 'radio' 
                                                                    id          = 'exampleCustomRadio4' 
                                                                    name        = 'repeat' 
                                                                    label       = 'Bulanan' 
                                                                    value       = 'monthly'
                                                                    inline 
                                                                    onChange    = {(e) => {
                                                                        let value = e.target.value;
                                                                        let data  = {...request};

                                                                        if(value.length > 0){
                                                                            data.repeat = value;
                                                                        }else{
                                                                            data.repeat = null;
                                                                        }

                                                                        setRequest(data);
                                                                    }}
                                                                />
                                                            </div>
                                                        </FormGroup>
                                                    </div> 
                                                : null
                                            }
                                        </Col>
                                        <Col className="col-md-12 mt-1">
                                            <Card 
                                                color   = "secondary" 
                                                outline
                                            >
                                                <CardBody>
                                                    <CardText>Isi Laporan</CardText>
                                                    <FormGroup>
                                                        <div id="contents-report">
                                                            <Select
                                                                name                = 'content'
                                                                theme               = {selectThemeColors}
                                                                isMulti
                                                                className           = 'react-select'
                                                                placeholder         = "Pilih laporan"
                                                                isClearable
                                                                classNamePrefix     = 'select'
                                                                options             = {request.content != null && request.content.length > 4 ? request.content : props.reportCategory}
                                                                onChange            = {(value) => {
                                                                    let data    = {...request};
                                                                    let err     = {...inputErr};

                                                                    if(value.length > 0){
                                                                        data.content = value;
                                                                        err.content  = false;
                                                                    }else{
                                                                        data.content = null;
                                                                    }

                                                                    setRequest(data);
                                                                    setInputErr(err);
                                                                }}
                                                            />
                                                        </div>
                                                        {
                                                            inputErr.content ?
                                                                <Label className="text-danger">Isi Laporan Belum Terisi!</Label>
                                                            : null
                                                        }
                                                    </FormGroup>
                                                </CardBody>
                                            </Card>

                                            <Card 
                                                color   = "secondary" 
                                                outline
                                            >
                                                <CardBody>
                                                    <CardText>Filter Laporan</CardText>
                                                    <Row>
                                                        <Col md="2">
                                                            <Label for="filter_category">Kategori</Label>
                                                        </Col>
                                                        <Col md="10">
                                                            <div id="select-category">
                                                                <Select
                                                                    id                  = "filter_category"
                                                                    name                = "filter_category"
                                                                    theme               = {selectThemeColors}
                                                                    isMulti
                                                                    options             = {categoryFilter}
                                                                    className           = 'react-select'
                                                                    placeholder         = "Pilih Kategori"
                                                                    isClearable
                                                                    classNamePrefix     = 'select'
                                                                    onChange            = {(value) => {
                                                                        let data    = {...request};
                                                                        let err     = {...inputErr};

                                                                        if(value.length > 0){
                                                                            data.filter_category = value;
                                                                            err.filter_category  = false;
                                                                        }else{
                                                                            data.filter_category = null;
                                                                        }

                                                                        setRequest(data);
                                                                        setInputErr(err);
                                                                    }}
                                                                />
                                                            </div>
                                                            {
                                                                inputErr.filter_category ?
                                                                    <Label className="text-danger">Filter Kategori Belum Terisi!</Label>
                                                                : null
                                                            }
                                                        </Col>
                                                    </Row>
                                                    <Row className="mt-1">
                                                        <Col md="2">
                                                            <p>Satuan Kerja</p>
                                                        </Col>
                                                        <Col md="10">
                                                            <div id="select-workunit">
                                                                <Select
                                                                    name                = 'filter_workunit'
                                                                    theme               = {selectThemeColors}
                                                                    isMulti
                                                                    options             = {workunitOptionsApproval}
                                                                    className           = 'react-select'
                                                                    placeholder         = "Pilih Satuan Kerja"
                                                                    isClearable
                                                                    classNamePrefix     = 'select'
                                                                    onChange            = {(value) => {
                                                                        let data    = {...request};

                                                                        if(value.length > 0){
                                                                            data.filter_workunit = value;
                                                                        }else{
                                                                            data.filter_workunit = null;
                                                                        }

                                                                        setRequest(data);
                                                                    }}
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mt-1">
                                                        <Col md="2">
                                                            <p>Agen</p>
                                                        </Col>
                                                        <Col md="10">
                                                            <div id="select-agent">
                                                                <Select
                                                                    name                = 'filter_agent'
                                                                    theme               = {selectThemeColors}
                                                                    isMulti
                                                                    options             = {employeeFilter}
                                                                    className           = 'react-select'
                                                                    placeholder         = "Pilih Agen"
                                                                    isClearable
                                                                    classNamePrefix     = 'select'
                                                                    onChange            = {(value) => {
                                                                        let data    = {...request};

                                                                        if(value.length > 0){
                                                                            data.filter_agent = value;
                                                                        }else{
                                                                            data.filter_agent = null;
                                                                        }

                                                                        setRequest(data);
                                                                    }}
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col className="col-md-12 mt-1">
                                            <Card 
                                                id      = "list-report"
                                                color   = "secondary" 
                                                outline
                                            >
                                                <CardBody className="py-1">
                                                    <ReactSortable
                                                        list        = {request.content != null ? request.content : []}
                                                        group       = {{ name: 'shared-badge-group', pull: 'clone' }}
                                                        className   = 'demo-inline-spacing sortable mb-1'
                                                        setList     = {(value) => {
                                                            let data    = {...request};
                                                            let err     = {...inputErr};

                                                            if(value.length > 0){
                                                                data.content = value;
                                                                err.content  = false;
                                                            }else{
                                                                data.content = null;
                                                            }

                                                            setRequest(data);
                                                            setInputErr(err);
                                                        }}
                                                    >
                                                        {
                                                            request.content != null ? 
                                                                request.content.map((item) => {
                                                                    return (
                                                                        <Badge 
                                                                            key         = {"reorder_header_report_"+item.value} 
                                                                            color       = "primary"
                                                                            className   = 'draggable cursor-pointer mt-1' 
                                                                        >
                                                                            {item.label}
                                                                        </Badge>
                                                                    )
                                                                })
                                                            : null
                                                        }
                                                    </ReactSortable> 
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </>
                            }                                
                        </Row>
                    :
                        null
                }

                <ModalFooter className="d-flex justify-content-between">
                    <div id="batal-input">
                        <Button 
                            color   = 'primary' 
                            outline 
                            onClick = {onCancel}
                        >
                            Batal
                        </Button>
                    </div>
                    <div id="submit-input">
                        <SubmitButton
                            size        = "sm" 
                            isLoading   = {props.loading}
                        >
                            Submit
                        </SubmitButton>
                    </div>
                </ModalFooter>
            </Form>
        </Fragment>
    );
};

export default FormReport;