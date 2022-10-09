import { 
    Fragment, 
    useState, 
    useEffect, 
    useContext,
}                               from "react";

import { 
    Col, 
    Row, 
    Form,
    Badge, 
    Input, 
    Label,
    Button, 
    FormGroup, 
    ModalFooter, 
    CustomInput,
}                               from "reactstrap";

import "./Report.scss";
import '@styles/react/libs/flatpickr/flatpickr.scss';

import Card                     from "reactstrap/lib/Card";
import moment                   from "moment";
import Select                   from "react-select";
import CardBody                 from "reactstrap/lib/CardBody";
import CardText                 from "reactstrap/lib/CardText";
import Flatpickr                from 'react-flatpickr';
import { useForm, Controller }  from "react-hook-form";
import { yupResolver }          from '@hookform/resolvers/yup';
import { ReactSortable }        from 'react-sortablejs';
import { selectThemeColors }    from '@utils';

//Component
import IconSwitch               from '../../components/widgets/icon-switch/IconSwitch';
import SubmitButton             from '../../components/widgets/submit-button';

//Context
import { EmployeeContext }      from "../../context/EmployeeContext";
import { CategoryContext }      from "../../context/CategoryContext";
import { PerformanceContext }   from "../../context/PerformanceContext";
import CustomToast              from "../../components/widgets/custom-toast";

import {
    schemaWithFormat,
    schemaNoFormatNoSchedule,
    schemaNoFormatWithSchedule
}                               from "./validation";
import { HelpCircle } from "react-feather";
import { ModalBase } from "../../components/widgets/modals-base";

const FormReport = (props) => {
    //Props
    const { onCancel }                          = props;

    //Context
    const { category }                          = useContext(CategoryContext);
    const { workunitOptionsApproval }           = useContext(PerformanceContext);
    const { employees }                         = useContext(EmployeeContext);

    //State
    const [categoryFilter, setCategoryFilter]         = useState([]);
    const [employeeFilter, setEmployeeFilter]         = useState([]);
    const [inputCreateDate, setInputCreateDate]       = useState(false);
    const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);

    const [isFormat, setIsFormat]               = useState(null);

    const { 
        errors, 
        control, 
        register, 
        setValue,
        watch,
        handleSubmit, 
    }   
        = useForm({ mode: "onTouched", resolver: yupResolver(
            isFormat ? 
                schemaWithFormat
            :
                inputCreateDate ? 
                    schemaNoFormatWithSchedule
                :
                    schemaNoFormatNoSchedule 
        )});

    //Category filter select options
    const Category = () => {
        let data_ = (category.slice(2)).map((data) => (
            {
                label : data.name,
                value : data.id
            }
        ))

        let category_ = [
            {
                label : 'Semua Kategori',
                options : [{
                    label : 'SEMUA KATEGORI',
                    value : 0
                }],
            },
            {
                label   : 'Kategori',
                options : data_
            },
        ]

        setCategoryFilter(category_);
    };

    //Workunit filter select options
    const Employee = () => {
        let data_ = employees.map((data ) => (
            {
                label : data.name,
                value : data.uuid
            }
        ))

        setEmployeeFilter(data_);
    };

    const handleFinish = (data) => {

        let formData;
        let _newOrder   = [];
        let _newFilter  = [];
    
        if(isFormat == true) {
            //report with format yearly or monthly
            if(data.format_type === 'yearly'){
                _newOrder.push(11,17,19);
            }else{
                _newOrder.push(11,18,19);
            }
    
            formData = {
                model : {
                    title        : data.title,
                    start        : moment(data.start_date[0]).format('YYYY-MM-DDTH:mm:ssZ'),
                    end          : moment(data.end_date[0]).format('YYYY-MM-DDTH:mm:ssZ'),
                    contents_id  : _newOrder,
                    is_formatted : true
                }
            }
    
            props.onSubmit(formData);
    
        }else{
            if(data.content != null && data.content.filter(e => parseInt(e.value) === 1).length > 0){
                if(data.content.filter(e => parseInt(e.value) >= 13 && parseInt(e.value) <= 19).length > 0){
                    CustomToast('warning', 'Jika memilih Isi Berita, maka Pilihan Jumlah Berita Di Publikasi, Jumlah Berita di Arsip, Jumlah Berita Ke Pimpinan, Jumlah Agen, Bulan, Tanggal, dan Jumlah Tidak Dapat Digunakan.');
                }else{
                    if(data.content != null){
                        data.content.map((data) => (
                            _newOrder.push(parseInt(data.value))
                        ));
                    }
                
                    //Get Category Filter
                    if(data.filter_category != null && !(data.filter_category.filter(e => parseInt(e.value) === 0).length > 0)){
                        data.filter_category.map((data) => (
                            _newFilter.push({
                                report_filter_type_id: 1,
                                keyword : data.label.toString()
                            })
                        ));
                    }else{
                        (category.slice(2)).map((data) => (
                            _newFilter.push({
                                report_filter_type_id: 1,
                                keyword : data.name.toString()
                            })
                        ));
                    }
                
                    if(data.filter_workunit != null && !(data.filter_workunit.filter(e => parseInt(e.value) === 0).length > 0)){
                        data.filter_workunit.map((data) => (
                            _newFilter.push({
                                report_filter_type_id: 3,
                                keyword : data.value.toString()
                            })
                        ));
                    };
                
                    if(data.filter_agent != null){
                        data.filter_agent.map((data) => (
                            _newFilter.push({
                                report_filter_type_id: 2,
                                keyword : data.value.toString()
                            })
                        ));
                    }
                    
                    formData = {
                        model : {
                            title        : data.title,
                            start        : moment(data.start_date[0]).format('YYYY-MM-DDTH:mm:ssZ'),
                            end          : moment(data.end_date[0]).format('YYYY-MM-DDTH:mm:ssZ'),
                            contents_id  : _newOrder,
                            filters      : _newFilter,
                            is_formatted : false
                        }
                    }
    
                    if(data.time != null){
                        formData.time = moment(data.time).format('YYYY-MM-DDTH:mm:ssZ');
                    }
                
                    if(data.repeat != null){
                        formData.repeat = data.repeat;
                    }
                
                    props.onSubmit(formData);
                }
            }else if(data.content.filter(e => parseInt(e.value) === 16).length > 0){
    
                if(data.content.filter(e => parseInt(e.value) === 11).length > 0){
                    if(data.content != null){
                        data.content.map((data) => (
                            _newOrder.push(parseInt(data.value))
                        ));
                    }
                
                    //Get Category Filter
                    if(data.filter_category != null && !(data.filter_category.filter(e => parseInt(e.value) === 0).length > 0)){
                        data.filter_category.map((data) => (
                            _newFilter.push({
                                report_filter_type_id: 1,
                                keyword : data.label.toString()
                            })
                        ));
                    }else{
                        (category.slice(2)).map((data) => (
                            _newFilter.push({
                                report_filter_type_id: 1,
                                keyword : data.name.toString()
                            })
                        ));
                    }
                
                    if(data.filter_workunit != null && !(data.filter_workunit.filter(e => parseInt(e.value) === 0).length > 0)){
                        data.filter_workunit.map((data) => (
                            _newFilter.push({
                                report_filter_type_id: 3,
                                keyword : data.value.toString()
                            })
                        ));
                    };
                
                    if(data.filter_agent != null){
                        data.filter_agent.map((data) => (
                            _newFilter.push({
                                report_filter_type_id: 2,
                                keyword : data.value.toString()
                            })
                        ));
                    };
                
                    if(data.time != null){
                        formData.time = moment(data.time).format('YYYY-MM-DDTH:mm:ssZ');
                    }
                
                    if(data.repeat != null){
                        formData.repeat = data.repeat;
                    }
                    
                    formData = {
                        model : {
                            title        : data.title,
                            start        : moment(data.start_date[0]).format('YYYY-MM-DDTH:mm:ssZ'),
                            end          : moment(data.end_date[0]).format('YYYY-MM-DDTH:mm:ssZ'),
                            contents_id  : _newOrder,
                            filters      : _newFilter,
                            is_formatted : false
                        }
                    }
                
                    props.onSubmit(formData);
                }else{
                    CustomToast('warning', 'Jika memilih Jumlah Agen, maka harus memilih Satuan Kerja');
                }
            }else if(data.content.filter(e => parseInt(e.value) >= 13 && parseInt(e.value) <= 16 ).length > 0){
                if(data.content.filter(e => parseInt(e.value) === 10 || parseInt(e.value) === 11 ).length > 0){
                    if(data.content != null){
                        data.content.map((data) => (
                            _newOrder.push(parseInt(data.value))
                        ));
                    }
                
                    //Get Category Filter
                    if(data.filter_category != null && !(data.filter_category.filter(e => parseInt(e.value) === 0).length > 0)){
                        data.filter_category.map((data) => (
                            _newFilter.push({
                                report_filter_type_id: 1,
                                keyword : data.label.toString()
                            })
                        ));
                    }else{
                        (category.slice(2)).map((data) => (
                            _newFilter.push({
                                report_filter_type_id: 1,
                                keyword : data.name.toString()
                            })
                        ));
                    }
                
                    if(data.filter_workunit != null && !(data.filter_workunit.filter(e => parseInt(e.value) === 0).length > 0)){
                        data.filter_workunit.map((data) => (
                            _newFilter.push({
                                report_filter_type_id: 3,
                                keyword : data.value.toString()
                            })
                        ));
                    };
                
                    if(data.filter_agent != null){
                        data.filter_agent.map((data) => (
                            _newFilter.push({
                                report_filter_type_id: 2,
                                keyword : data.value.toString()
                            })
                        ));
                    };
                
                    if(data.time != null){
                        formData.time = moment(data.time).format('YYYY-MM-DDTH:mm:ssZ');
                    }
                
                    if(data.repeat != null){
                        formData.repeat = data.repeat;
                    }
                    
                    formData = {
                        model : {
                            title        : data.title,
                            start        : moment(data.start_date[0]).format('YYYY-MM-DDTH:mm:ssZ'),
                            end          : moment(data.end_date[0]).format('YYYY-MM-DDTH:mm:ssZ'),
                            contents_id  : _newOrder,
                            filters      : _newFilter,
                            is_formatted : false
                        }
                    }
                
                    props.onSubmit(formData);
                }else{
                    CustomToast('warning', 'Jika memilih Jumlah Berita Di Publikasi, Jumlah Berita di Arsip, Jumlah Berita Ke Pimpinan, maka harus memilih Nama Agen atau Satuan Kerja');
                }
            }else{
                CustomToast('warning', 'Isi laporan harus menggunakan Satuan Kerja atau Nama Agen.');
            }
        }
    };

    useEffect(() => {
        Category();
        Employee();
    }, []);

    return (
        <Fragment>

            <ModalBase
                show    = {isHelpModalVisible}
                size    = "lg"
                title   = "Isi Laporan Yang Dapat Digunakan"
                setShow = {(val) => setIsHelpModalVisible(val)}
            >
                - Jika memilih <strong>Isi Berita</strong>, maka Pilihan <strong> Jumlah Berita Di Publikasi, Jumlah Berita di Arsip, Jumlah Berita Ke Pimpinan, Jumlah Agen, Bulan, Tanggal, </strong> dan <strong> Jumlah </strong> Tidak Dapat Digunakan.
                <hr/>
                - Jika memilih <strong>Jumlah Agen</strong>, maka harus memilih <strong>Satuan Kerja</strong>.
                <hr/>
                - Jika memilih <strong>Jumlah Berita Di Publikasi, Jumlah Berita di Arsip, Jumlah Berita Ke Pimpinan, </strong> maka harus memilih <strong>Nama Agen</strong> atau <strong>Satuan Kerja</strong>.
            </ModalBase>

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
                                    <Label for='title'>Judul Laporan</Label>
                                    <div id="report-title">
                                        <Input 
                                            id          = 'title' 
                                            name        = 'title'
                                            type        = 'text'
                                            innerRef    = {register()}
                                            className   = 'form-control'
                                        />
                                    </div>
                                    {errors && errors.title && <Label className="text-danger">{errors.title.message}</Label>}
                                </FormGroup>
                            </Col>
                            <Col md ={12}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for='start_date'>Tanggal Awal</Label>
                                            <div id="start-date">
                                                <Controller
                                                    as      = {
                                                        <Flatpickr 
                                                            id          = 'start_date' 
                                                            options     = {{ dateFormat: "d-m-Y H:i", enableTime: true, time_24hr: true }}
                                                            className   = 'form-control' 
                                                            placeholder = {moment().format('DD-M-YYYY')}
                                                        />
                                                    }
                                                    name    = "start_date"
                                                    rules   = {{required: true}}
                                                    control = {control}
                                                />
                                            </div>
                                            {errors && errors.start_date && <Label className="text-danger">{errors.start_date.message}</Label>}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for='tgl_akhir'>Tanggal Akhir</Label>
                                            <div id="end-date">
                                                <Controller
                                                    as      = {
                                                        <Flatpickr 
                                                            id          = 'end_date' 
                                                            options     = {{ dateFormat: "d-m-Y H:i", enableTime: true, time_24hr: true }}
                                                            className   = 'form-control' 
                                                            placeholder = {moment().format('DD-M-YYYY')}
                                                        />
                                                    }
                                                    name    = "end_date"
                                                    rules   = {{required: true}}
                                                    control = {control}
                                                />
                                            </div>
                                            {errors && errors.end_date && <Label className="text-danger">{errors.end_date.message}</Label>}
                                        </FormGroup>
                                    </Col>
                                </Row>

                            </Col>

                            {
                                isFormat ? 
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for='judul'>Format Laporan</Label>
                                            <Controller
                                                name    = "format_type"
                                                control = {control}
                                                as      = {
                                                    <Select
                                                        id              = "format_type" 
                                                        theme           = {selectThemeColors}
                                                        options         = {[
                                                            {value: 'yearly', label : 'Data Satuan Kerja Tahunan'},
                                                            {value: 'monthly', label : 'Data Satuan Kerja Bulanan'},
                                                        ]}
                                                        className       = 'react-select'
                                                        placeholder     = "Pilih Jenis Laporan"
                                                        isClearable
                                                        isMulti
                                                        classNamePrefix = 'select'
                                                        closeMenuOnSelect={false}
                                                    />
                                                }
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

                                                            <Controller
                                                                as      = {
                                                                    <Flatpickr 
                                                                        id          = 'time' 
                                                                        options     = {{ dateFormat: "d-m-Y H:i", enableTime: true, time_24hr: true }}
                                                                        className   = 'form-control' 
                                                                        placeholder = {moment().format('DD-M-YYYY')}
                                                                    />
                                                                }
                                                                name    = "time"
                                                                rules   = {{required: true}}
                                                                control = {control}
                                                            />

                                                            {errors && errors.time && <Label className="text-danger">{errors.time.message}</Label>}
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
                                                                    innerRef    = {register()}

                                                                />
                                                                <CustomInput 
                                                                    id          = 'exampleCustomRadio3' 
                                                                    type        = 'radio' 
                                                                    name        = 'repeat' 
                                                                    label       = 'Mingguan'
                                                                    value       = 'weekly'
                                                                    inline 
                                                                    innerRef    = {register()}

                                                                />
                                                                <CustomInput 
                                                                    type        = 'radio' 
                                                                    id          = 'exampleCustomRadio4' 
                                                                    name        = 'repeat' 
                                                                    label       = 'Bulanan' 
                                                                    value       = 'monthly'
                                                                    inline 
                                                                    innerRef    = {register()}
                                                                />
                                                            </div>

                                                            {errors && errors.repeat && <Label className="text-danger">{errors.repeat.message}</Label>}
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
                                                    <CardText className="d-flex justify-content-between">
                                                        Isi Laporan
                                                        <HelpCircle 
                                                            onClick     = {() => setIsHelpModalVisible(true)}
                                                            className   = "cursor-pointer"
                                                        />
                                                    </CardText>
                                                    <FormGroup>
                                                        <div id="contents-report">
                                                            <Controller
                                                                name    = "content"
                                                                control = {control}
                                                                as      = {
                                                                    <Select
                                                                        id              = "content" 
                                                                        theme           = {selectThemeColors}
                                                                        options         = {props.reportCategory}
                                                                        className       = 'react-select'
                                                                        placeholder     = "Pilih isi Laporan"
                                                                        isClearable
                                                                        isMulti
                                                                        classNamePrefix = 'select'
                                                                        closeMenuOnSelect={false}
                                                                    />
                                                                }
                                                            />

                                                        </div>
                                                        {errors && errors.content && <Label className="text-danger">{errors.content.message}</Label>}
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
                                                                <Controller
                                                                    name    = "filter_category"
                                                                    control = {control}
                                                                    as      = { 
                                                                        <Select
                                                                            id                  = "filter_category" 
                                                                            theme               = {selectThemeColors}
                                                                            options             = {watch('filter_category') ? watch('filter_category').filter(val => val.value === 0).length > 0 ? [] : categoryFilter : categoryFilter}
                                                                            isMulti
                                                                            className           = 'react-select'
                                                                            placeholder         = "Pilih Kategori"
                                                                            isClearable
                                                                            classNamePrefix     = 'select'
                                                                            closeMenuOnSelect   = {false}
                                                                        />
                                                                    }
                                                                />
                                                            </div>
                                                            {errors && errors.filter_category && <Label className="text-danger">{errors.filter_category.message}</Label>}
                                                        </Col>
                                                    </Row>

                                                    <Row className="mt-1">
                                                        <Col md="2">
                                                            <p>Satuan Kerja</p>
                                                        </Col>
                                                        <Col md="10">
                                                            <div id="select-workunit">
                                                                <Controller
                                                                    name    = "filter_workunit"
                                                                    control = {control}
                                                                    as      = {
                                                                        <Select
                                                                            id                  = "filter_workunit" 
                                                                            theme               = {selectThemeColors}
                                                                            isMulti
                                                                            options             = {watch('filter_workunit') ? watch('filter_workunit').filter(val => val.value === 0).length > 0 ? [] : workunitOptionsApproval : workunitOptionsApproval}
                                                                            className           = 'react-select'
                                                                            placeholder         = "Pilih Satuan Kerja"
                                                                            isClearable
                                                                            classNamePrefix     = 'select'
                                                                            closeMenuOnSelect   = {false}
                                                                        />
                                                                    }
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
                                                                <Controller
                                                                    name    = "filter_agent"
                                                                    control = {control}
                                                                    as      = {
                                                                        <Select
                                                                            id              = "filter_agent" 
                                                                            theme           = {selectThemeColors}
                                                                            options         = {employeeFilter}
                                                                            className       = 'react-select'
                                                                            placeholder     = "Pilih Agen"
                                                                            isClearable
                                                                            isMulti
                                                                            classNamePrefix = 'select'
                                                                            closeMenuOnSelect={false}
                                                                        />
                                                                    }
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
                                                        list        = {watch('content') ? watch('content') : []}
                                                        group       = {{ name: 'shared-badge-group', pull: 'clone' }}
                                                        className   = 'demo-inline-spacing sortable mb-1'
                                                        setList     = {(value) => {
                                                            setValue('content', value);
                                                        }}
                                                    >
                                                        {
                                                            watch('content') ? 
                                                                watch('content').map((item) => {
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