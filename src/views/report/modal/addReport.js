import { 
    Fragment, 
    useState, 
    useEffect, 
    useContext,
}                                                       from "react";

import { 
    Col, 
    Row, 
    Form,
    Card,
    Badge, 
    Input, 
    Label,
    Button, 
    CardText,
    CardBody,
    FormGroup,
    ModalFooter, 
    CustomInput,
}                                                       from "reactstrap";

import "../Report.scss";
import '@styles/react/libs/flatpickr/flatpickr.scss';

import moment                                           from "moment";
import Select                                           from "react-select";
import Flatpickr                                        from 'react-flatpickr';
import { yupResolver }                                  from '@hookform/resolvers/yup';
import { ReactSortable }                                from 'react-sortablejs';
import { selectThemeColors }                            from '@utils';
import { useForm, Controller }                          from "react-hook-form";

//Component
import IconSwitch                                       from '../../../components/widgets/icon-switch/IconSwitch';
import SubmitButton                                     from '../../../components/widgets/submit-button';

//Context
import CustomToast                                      from "../../../components/widgets/custom-toast";
import { EmployeeContext }                              from "../../../context/EmployeeContext";
import { CategoryContext }                              from "../../../context/CategoryContext";
import { PerformanceContext }                           from "../../../context/PerformanceContext";

import Helper                                           from "../../../helpers/index";
import {
    schemaWithFormat,
    schemaNoFormatNoSchedule,
    schemaNoFormatWithSchedule
}                                                       from "../validation";
import { HelpCircle }                                   from "react-feather";
import { ModalBase }                                    from "../../../components/widgets/modals-base";
import { workunitAPI } from "../../../services/pages/configuration/workunit";

const FormReport = (props) => {
    //Props
    const { onCancel }                                  = props;

    //Context
    const { category }                                  = useContext(CategoryContext);
    const { 
        workunitLevel2,
        workunitOptionsApproval 
    }                                                   = useContext(PerformanceContext);
    const { employees }                                 = useContext(EmployeeContext);
    const { 
        getMonthName,
        getYearsBefore,
    }                                                   = Helper;

    //State
    const [categoryFilter, setCategoryFilter]           = useState([]);
    const [employeeFilter, setEmployeeFilter]           = useState([]);
    const [inputCreateDate, setInputCreateDate]         = useState(false);
    const [isHelpModalVisible, setIsHelpModalVisible]   = useState(false);

    const [isFormat, setIsFormat]                       = useState(null);
    const [reportKind , setReportKind]                  = useState(null);
    const [workunitKind, setWorkunitKind]               = useState(null);

    const [workunitLevel3, setWorkunitLevel3]           = useState(null);
    const [workunitLevel4, setWorkunitLevel4]           = useState(null);

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
                if(data.content.filter(e => parseInt(e.value) >= 12 && parseInt(e.value) <= 19).length > 0){
                    CustomToast('warning', 'Jika memilih Isi Berita, maka Pilihan Jabatan, Jumlah Berita Di Publikasi, Jumlah Berita di Arsip, Jumlah Berita Ke Pimpinan, Jumlah Agen, Bulan, Tanggal, dan Jumlah Tidak Dapat Digunakan.');
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
                            end          : moment(data.end_date[0]).format('YYYY-MM-DDTH:mm:ssZ'),
                            title        : data.title,
                            start        : moment(data.start_date[0]).format('YYYY-MM-DDTH:mm:ssZ'),
                            filters      : _newFilter,
                            contents_id  : _newOrder,
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
            }else if(data.content.filter(e => parseInt(e.value) >= 12 && parseInt(e.value) <= 16 ).length > 0){
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

    const getChildWorkunit = (workunit_id, level) => {
        const formData = {
            id : workunit_id
        };

        workunitAPI.getWorkunitChild(formData).then(
            res => {
                console.log(res, 'get child workunit');
                if(!res.is_error && res?.data?.child?.length > 0){
                    
                    if(level === 3){
                        setWorkunitLevel3(res.data.child.map((data) => ({
                            label : "KEJAKSAAN NEGERI " +data.name,
                            value : data.id
                        })))
                    }
                    
                    if(level === 4){
                        setWorkunitLevel4(res.data.child.map((data) => ({
                            label : "CABANG KEJAKSAAN NEGERI " + data.name,
                            value : data.id
                        })))
                    }
                }
            }
        )
    }

    useEffect(() => {
        Category();
        Employee();
    }, []);

    useEffect(() => {
        if(watch('workunit_level_2')){
            console.log('level_2')
            getChildWorkunit(watch('workunit_level_2').value, 3);
        }

        if(watch('workunit_level_3')){
            getChildWorkunit(watch('workunit_level_3').value, 4);
        }

    }, [watch('workunit_level_2'), watch('workunit_level_3')]);

    return (
        <Fragment>

            <ModalBase
                show    = {isHelpModalVisible}
                size    = "lg"
                title   = "Isi Laporan Yang Dapat Digunakan"
                // setShow = {(val) => setIsHelpModalVisible(val)}
            >
                - Jika memilih <strong>Isi Berita</strong>, maka Pilihan <strong>Jabatan, Jumlah Berita Di Publikasi, Jumlah Berita di Arsip, Jumlah Berita Ke Pimpinan, Jumlah Agen, Bulan, Tanggal, </strong> dan <strong> Jumlah </strong> Tidak Dapat Digunakan.
                <hr/>
                - Jika memilih <strong>Jumlah Agen</strong>, maka harus memilih <strong>Satuan Kerja</strong>.
                <hr/>
                - Jika memilih <strong>Jumlah Berita Di Publikasi, Jumlah Berita di Arsip, Jumlah Berita Ke Pimpinan, </strong> maka harus memilih <strong>Nama Agen</strong> atau <strong>Satuan Kerja</strong>.
            </ModalBase>

            <ModalBase
                show    = {true}
                title   = "Tambah Laporan"
                size    = "lg"
            >
                <Form onSubmit={handleSubmit(handleFinish)}>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for='judul'>Jenis Laporan</Label>
                                <Select
                                    options = {[
                                        {value: true, label : 'Sudah Ditentukan'},
                                        {value: false, label : 'Belum Ditentukan'},
                                    ]}
                                    onChange = {(value) => setIsFormat(value.value)}
                                    placeholder     = "Pilih Jenis Laporan"

                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    {
                        isFormat &&
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for='judul'>Periode Laporan</Label>
                                        <Select
                                            id              = "format_type" 
                                            theme           = {selectThemeColors}
                                            options         = {[
                                                {value: 'monthly'   , label : 'Bulanan'},
                                                {value: 'quarterly' , label : 'Triwulan'},
                                                {value: 'yearly'    , label : 'Tahunan'},
                                                {value: 'periodic'  , label : 'Periodik'},
                                            ]}
                                            className       = 'react-select'
                                            placeholder     = "Pilih Periode Laporan"
                                            classNamePrefix = 'select'
                                            onChange        = {(value) => {setReportKind(value.value)}}
                                        />
                                </FormGroup>
                            </Col>
                        </Row>
                    }

                    <Row>
                        {
                            reportKind === 'monthly' &&
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for = 'judul'>
                                            Bulan
                                        </Label>
                                        <Select
                                            options         = {getMonthName()}
                                            onChange        = {(value) => setIsFormat(value.value)}
                                            placeholder     = "Pilih Bulan"
                                        />
                                    </FormGroup>
                                </Col>
                        }
                        {
                            reportKind === 'quarterly' &&
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for = 'judul'>
                                            Triwulan
                                        </Label>
                                        <Select
                                            theme               = {selectThemeColors}
                                            isMulti
                                            options             = {[
                                                {value: [1,2,3,4,5,6,7,8,9,10,11,12]    , label : 'Semua Triwulan'},
                                                {value: [1,2,3]                         , label : 'Triwulan I (Januari - Maret)'},
                                                {value: [4,5,6]                         , label : 'Triwulan II (April - Juni)'},
                                                {value: [7,8,9]                         , label : 'Triwulan III (Juli - September)'},
                                                {value: [10,11,12]                      , label : 'Triwulan IV (Oktober - Desember)'},
                                            ]}
                                            onChange            = {(value) => setIsFormat(value.value)}
                                            className           = 'react-select'
                                            isClearable
                                            placeholder         = "Pilih Jenis Laporan"
                                            classNamePrefix     = 'select'
                                            closeMenuOnSelect   = {false}

                                        />
                                    </FormGroup>
                                </Col>
                        }

                        {
                            reportKind == 'periodic' &&
                            <Col md={6}>
                                <FormGroup>
                                    <Label for='start_date'>Tanggal Awal</Label>
                                    <div id="start-date">
                                        <Controller
                                            as      = {
                                                <Flatpickr 
                                                    id          = 'start_date' 
                                                    options     = {{ dateFormat: "d-m-Y"}}
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
                        }
                        {
                            reportKind === 'periodic' &&
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
                        }

                        {
                            reportKind != null && reportKind != 'periodic' &&
                            <Col md={6}>
                                <FormGroup>
                                    <Label for = 'judul'>
                                        Tahun
                                    </Label>
                                    <Select
                                        options         = {getYearsBefore(10)}
                                        onChange        = {(value) => setIsFormat(value.value)}
                                        placeholder     = "Pilih Jenis Laporan"
                                    />
                                </FormGroup>
                            </Col>
                        }
                    </Row>

                    {
                        reportKind && 
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for='judul'>Satuan Kerja</Label>
                                    <Select
                                        id              = "workunit_kind" 
                                        theme           = {selectThemeColors}
                                        options         = {[
                                            {value: 1   , label : 'Kejaksaan Agung'},
                                            {value: 2   , label : 'Kejaksaan Tinggi'},
                                            {value: 3   , label : 'Kejaksaan Negeri'},
                                            {value: 4   , label : 'Cabang Kejaksaan Negeri'},
                                        ]}
                                        onChange        = {(value) => {setWorkunitKind(value.value)}}
                                        className       = 'react-select'
                                        placeholder     = "Pilih Satuan Kerja"
                                        classNamePrefix = 'select'
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    }

                    <Row>
                    {
                        workunitKind && (workunitKind >= 2 && workunitKind <= 4) &&
                        <Col md={6}>
                            <FormGroup>
                                <Label for = 'judul'>
                                    Kejaksaan Tinggi
                                </Label>
                                <Controller
                                    name    = "workunit_level_2"
                                    control = {control}
                                    as      = {
                                        <Select
                                            id                  = "workunit_level_2" 
                                            theme               = {selectThemeColors}
                                            options             = {workunitLevel2}
                                            className           = 'react-select'
                                            placeholder         = "Pilih Satuan Kerja"
                                            classNamePrefix     = 'select'
                                        />
                                    }
                                />
                            </FormGroup>

                        </Col>
                    }
                    {
                        workunitKind && (workunitKind === 3 || workunitKind === 4) &&
                        <Col md={6}>
                            <Label for = 'judul'>
                                Kejaksaan Negeri
                            </Label>
                            <Controller
                                name    = "workunit_level_3"
                                control = {control}
                                as      = {
                                    <Select
                                        id                  = "workunit_level_3" 
                                        theme               = {selectThemeColors}
                                        options             = {workunitLevel3}
                                        className           = 'react-select'
                                        isDisabled          = {!workunitLevel3}
                                        placeholder         = {workunitLevel3 ? "Pilih Kejaksaan Negeri" : "Pilih Kejati Terlebih Dahulu"}
                                        classNamePrefix     = 'select'
                                    />
                                }
                            />
                        </Col>
                    }
                    </Row>

                    <Row>
                    {
                        workunitKind && workunitKind === 4 &&
                        <Col md={{size: 6}}>
                            <FormGroup>

                                <Label for = 'judul'>
                                    Cabang Kejaksaan Negeri
                                </Label>
                                <Controller
                                    name    = "workunit_level_4"
                                    control = {control}
                                    as      = {
                                        <Select
                                            id                  = "workunit_level_4" 
                                            theme               = {selectThemeColors}
                                            options             = {workunitLevel4}
                                            className           = 'react-select'
                                            isDisabled          = {!workunitLevel4}
                                            placeholder         = {workunitLevel4 ? "Pilih Cabang Kejaksaan Negeri" : "Pilih Kejari Terlebih Dahulu"}
                                            classNamePrefix     = 'select'
                                        />
                                    }
                                />
                            </FormGroup>
                        </Col>
                    }
                        <Col md={6}>
                        </Col>
                    </Row>

                    <Row>
                    {
                        workunitKind && workunitKind === 4 &&
                        <Col md={6}>
                            <Label for = 'judul'>
                                Isi Laporan
                            </Label>
                            <Controller
                                name    = "report_body"
                                control = {control}
                                as      = {
                                    <Select
                                        id                  = "report_body" 
                                        theme               = {selectThemeColors}
                                        options             = {[
                                            {value : 0, label : 'Pilih Semua'},
                                            {value : 1, label : 'Berita Dipublikasi'},
                                            {value : 2, label : 'Berita Diarsipkan'},
                                            {value : 3, label : 'Berita Ke Pimpinan'},
                                        ]}
                                        className           = 'react-select'
                                        placeholder         = "Pilih Satuan Kerja"
                                        classNamePrefix     = 'select'
                                    />
                                }
                            />
                        </Col>
                    }
                        <Col md={6}>
                        </Col>
                    </Row>

                    <ModalFooter className="d-flex justify-content-between px-0 mt-1">
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
            </ModalBase>
        </Fragment>
    );
};

export default FormReport;