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
    schemaNoFormatNoSchedule,
    schemaNoFormatWithSchedule,
    schemaFormatMonthlyLevel1,
    schemaFormatMonthlyLevel2,
    schemaFormatMonthlyLevel3,
    schema,
    schema2,
    schema3,
    schemaFormatMonthlyLevel4,
    schemaFormatQuarterlyLevel1,
    schemaFormatQuarterlyLevel2,
    schemaFormatQuarterlyLevel3,
    schemaFormatQuarterlyLevel4,
    schemaFormatYearlylyLevel1,
    schemaFormatYearlylyLevel2,
    schemaFormatYearlylyLevel3,
    schemaFormatYearlylyLevel4,
    schemaFormatPeriodicallyLevel1,
    schemaFormatPeriodicallyLevel2,
    schemaFormatPeriodicallyLevel3,
    schemaFormatPeriodicallyLevel4
}                                                       from "../validation";
import { HelpCircle }                                   from "react-feather";
import { ModalBase }                                    from "../../../components/widgets/modals-base";
import { workunitAPI }                                  from "../../../services/pages/configuration/workunit";

const FormReport = (props) => {
    //Props
    const {
        onSubmit,
        isAddFormVisible,
        setIsAddFormVisible,
        isFormat,
        setIsFormat,
        reportKind,
        setReportKind,
        workunitKind,
        setWorkunitKind,
    }                                  = props;

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

    const [workunitLevel2_, setWorkunitLevel2_]         = useState(null);
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
        = useForm({ mode: "onTouched", 
        resolver: yupResolver(
            isFormat === null ?
                schema
            :
                isFormat ? 
                    reportKind === null ?
                        schema2
                    :
                        reportKind === 'monthly' ?
                            workunitKind === 1 ?
                                schemaFormatMonthlyLevel1
                            :
                                workunitKind === 2 ?
                                    schemaFormatMonthlyLevel2
                                :
                                    workunitKind === 3 ?
                                        schemaFormatMonthlyLevel3
                                    :
                                        workunitKind === 4 ?
                                            schemaFormatMonthlyLevel4
                                        :
                                            schema3
                        :
                            reportKind === "quarterly" ?
                                workunitKind === 1 ?
                                    schemaFormatQuarterlyLevel1
                                :
                                    workunitKind === 2 ?
                                        schemaFormatQuarterlyLevel2
                                    :
                                        workunitKind === 3 ?
                                            schemaFormatQuarterlyLevel3
                                        :
                                            workunitKind === 4 ?
                                                schemaFormatQuarterlyLevel4
                                            :
                                                schema3
                            :
                                reportKind === "yearly" ?
                                    workunitKind === 1 ?
                                        schemaFormatYearlylyLevel1
                                    :
                                        workunitKind === 2 ?
                                            schemaFormatYearlylyLevel2
                                        :
                                            workunitKind === 3 ?
                                                schemaFormatYearlylyLevel3
                                            :
                                                workunitKind === 4 ?
                                                    schemaFormatYearlylyLevel4
                                                :
                                                    schema3
                                :
                                    workunitKind === 1 ?
                                        schemaFormatPeriodicallyLevel1
                                    :
                                        workunitKind === 2 ?
                                            schemaFormatPeriodicallyLevel2
                                        :
                                            workunitKind === 3 ?
                                                schemaFormatPeriodicallyLevel3
                                            :
                                                workunitKind === 4 ?
                                                    schemaFormatPeriodicallyLevel4
                                                :
                                                    schema3
                :
                    inputCreateDate ? 
                        schemaNoFormatWithSchedule
                    :
                        schemaNoFormatNoSchedule 
        )
    });

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

    const handleReportFormat = (value) => {
        if (value === true){
            setIsFormat(true)
        }else{
            setIsFormat(false);
            setReportKind(null); 
            setWorkunitKind(null); 
        }
    }

    const handleFinish = (data) => {

        let formData;
        let _newOrder   = [];
        let _newFilter  = [];

        //check is report formatted or note
        if(isFormat){
            // if formatted then check what format type
            // monthly, quarterly, yearly, periodic
            formData = {
                is_formatted   : true,
                by_work_unit   : true,
                is_aggregation : true,
            }

            console.log(data,'data')

            if(reportKind === 'monthly'){
                formData.year           = parseInt(data.year.value);
                formData.month          = parseInt(data.month.value);
                formData.title          = `Data Berita ${workunitKind === 1 ? 'Kejagung' : workunitKind === 2 ? 'Kejati' : workunitKind === 3 ? 'Kejari' : 'Cabjari'} ${`Bulan ${data.month.label} Tahun ${data.year.value}`}
                `
                formData.contents_id    = [parseInt(data.report_body.value)];
                formData.report_type    = 'monthly'
    
            }else if(reportKind === 'quarterly'){
                formData.year           = parseInt(data.year.value);
                formData.title          = `${`Data Berita ${workunitKind === 1 ? 'Kejagung' : workunitKind === 2 ? 'Kejati' : workunitKind === 3 ? 'Kejari' : 'Cabjari'} ${data.quarter_type.length > 3 || data.quarter_type.filter((data) => parseInt(data.value) === 0).length > 0 ?'Triwulan I (Januari - Maret) - Triwulan IV (Oktober - Desember)':data.quarter_type.length > 1 ?`${(data.quarter_type.filter((data_) => parseInt(data_.value) === (Math.min.apply(Math, data.quarter_type.map((data) => (parseInt(data.value)))))))[0].label} ${data.quarter_type.length > 2 ? '-' : '&'} ${(data.quarter_type.filter((data_) => parseInt(data_.value) === (Math.max.apply(Math, data.quarter_type.map((data) => (parseInt(data.value)))))))[0].label }` : data.quarter_type[0].label} Tahun ${data.year.value}`}`
                formData.contents_id    = [parseInt(data.report_body.value)];
                formData.report_type    = 'quarterly'

                if(data.quarter_type.filter(data => parseInt(data.value) === 0 ).length > 0){
                    formData.quarterly = [
                        { id : 1 },
                        { id : 2 },
                        { id : 3 },
                        { id : 4 },
                    ]
                }else{
                    formData.quarterly = data.quarter_type.map((data) => (
                        { id : parseInt(data.value) }
                    ))
                }
    
            }else if(reportKind === 'yearly'){
                formData.year           = parseInt(data.year.value);
                formData.title          = `Data Berita ${workunitKind === 1 ? 'Kejagung' : workunitKind === 2 ? 'Kejati' : workunitKind === 3 ? 'Kejari' : 'Cabjari'} Tahun ${data.year.value}`;
                formData.report_type    = 'yearly'
                formData.contents_id    = [parseInt(data.report_body.value)];

            }else if(reportKind === 'periodic'){
                formData.end            = moment(data.end_date[0]).format('YYYY-MM-DDT23:59:59Z');
                formData.start          = moment(data.start_date[0]).format('YYYY-MM-DDT00:00:01Z');
                formData.title          = `Data Berita ${workunitKind === 1 ? 'Kejagung' : workunitKind === 2 ? 'Kejati' : workunitKind === 3 ? 'Kejari' : 'Cabjari'} Periode ${moment(data.start_date[0]).format('DD-MM-YYYY')} - ${moment(data.end_date[0]).format('DD-MM-YYYY')}`;
                formData.report_type    = 'periodically';
                formData.contents_id    = data.report_body.map((data) => parseInt(data.value));
            }
            
            if(workunitKind === 2){
                formData.is_kejati              = true;
                formData.work_unit_id           = data.workunit_level_2.map((data) => data.value).toString();
                if(data.with_child.value === 'true'){
                    formData.with_kejari  = true; 
                    formData.with_cabjari = true; 
                }
            }else if (workunitKind === 3){
                formData.is_kejari              = true;
                formData.work_unit_id           = data.workunit_level_3.map((data) => data.value).toString();
                formData.work_unit_parent_id    = data.workunit_level_2.value;

                if(data.with_child.value === true){
                    formData.with_cabjari = true; 
                }

            }else if (workunitKind === 4 ){
                formData.is_cabjari             = true,
                formData.work_unit_id           = data.workunit_level_4.map((data) => data.value).toString();
                formData.work_unit_parent_id    = data.workunit_level_3.value;
            }

            onSubmit({model : formData});
        }else{
            if(data.content != null && data.content.filter(e => parseInt(e.value) === 1).length > 0){
                if(data.content.filter(e => parseInt(e.value) >= 10 && parseInt(e.value) <= 17).length > 0){
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
                        formData.time = moment(data.time[0]).format('YYYY-MM-DDTH:mm:ssZ');
                    }
                
                    if(data.repeat != null){
                        formData.repeat = data.repeat;
                    }
                    props.onSubmit(formData);
                }
            }else if(data.content.filter(e => parseInt(e.value) === 14).length > 0){
    
                if(data.content.filter(e => parseInt(e.value) === 9).length > 0){
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
                        formData.time = moment(data.time[0]).format('YYYY-MM-DDTH:mm:ssZ');
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
            }else if(data.content.filter(e => parseInt(e.value) >= 11 && parseInt(e.value) <= 13 ).length > 0){
                if(data.content.filter(e => parseInt(e.value) === 8 || parseInt(e.value) === 9 ).length > 0){
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
                        formData.time = moment(data.time[0]).format('YYYY-MM-DDTH:mm:ssZ');
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
            parent_id     : workunit_id, 
            condition_by  : "child_list",
        };

        workunitAPI.getWorkunitFilter(formData).then(
            res => {
                if(!res.is_error && res?.data?.length > 0){
                    
                    if(level === 3){
                        let level_3_ = res.data.map((data) => ({
                            label : "KEJAKSAAN NEGERI " +data.name,
                            value : data.id
                        }))

                        if(level_3_.length > 0){
                            level_3_.unshift({label : 'SEMUA KEJAKSAAN NEGERI', value : (level_3_.map((data) => (data.value))).toString()})
                        }

                        setWorkunitLevel3(
                            level_3_
                        )
                    }
                    
                    if(level === 4){
                        let level_4_ = res.data.map((data) => ({
                            label : "CABANG KEJAKSAAN NEGERI " + data.name,
                            value : data.id
                        }))

                        if(level_4_.length > 0){
                            level_4_.unshift({label : 'SEMUA CABANG KEJAKSAAN NEGERI', value : (level_4_.map((data) => (data.value))).toString()})
                        }
                        
                        setWorkunitLevel4(
                            level_4_
                        )
                    }
                }
            }
        )
    }

    useEffect(() => {
        Category();
        Employee();

        let workunit_level_2 = workunitLevel2;
        if(workunit_level_2 != null && workunit_level_2.length > 0){
            workunit_level_2.unshift({label : 'SEMUA KEJAKSAAN TINGGI', value : (workunitLevel2.map((data) => (data.value))).toString()})
        }
        setWorkunitLevel2_(workunit_level_2);

    }, [workunitLevel2]);

    useEffect(() => {
        if(watch('workunit_level_2')){
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
                setShow = {(val) => setIsHelpModalVisible(val)}
            >
                - Jika memilih <strong>Isi Berita</strong>, maka Pilihan <strong>Jabatan, Jumlah Berita Di Publikasi, Jumlah Berita di Arsip, Jumlah Berita Ke Pimpinan, Jumlah Agen, Bulan, Tanggal, </strong> dan <strong> Jumlah </strong> Tidak Dapat Digunakan.
                <hr/>
                - Jika memilih <strong>Jumlah Agen</strong>, maka harus memilih <strong>Satuan Kerja</strong>.
                <hr/>
                - Jika memilih <strong>Jumlah Berita Di Publikasi, Jumlah Berita di Arsip, Jumlah Berita Ke Pimpinan, </strong> maka harus memilih <strong>Nama Agen</strong> atau <strong>Satuan Kerja</strong>.
            </ModalBase>

            <ModalBase
                show    = {isAddFormVisible}
                size    = "lg"
                title   = "Tambah Laporan"
                setShow = {(par) => setIsAddFormVisible(par)}
            >
                <Form onSubmit={handleSubmit(handleFinish)}>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for='judul'>Jenis Laporan</Label>
                                <Select
                                    options         = {[
                                        {value: true, label : 'Sudah Ditentukan'},
                                        {value: false, label : 'Belum Ditentukan'},
                                    ]}
                                    onChange        = {(value) => handleReportFormat(value.value)}
                                    placeholder     = "Pilih Jenis Laporan"

                                />
                                {errors && errors.report_type && <Label className="text-danger">{errors.report_type.message}</Label>}
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    {
                        isFormat &&
                        <div>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for='judul'>Periode Laporan</Label>
                                        <Select
                                            id              = "report_period" 
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
                                        {errors && errors.report_kind && <Label className="text-danger">{errors.report_kind.message}</Label>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <div>
                                <Row>
                                    {
                                        reportKind === 'monthly' &&
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for = 'month'>
                                                        Bulan
                                                    </Label>
                                                    <Controller
                                                        name    = "month"
                                                        control = {control}
                                                        as      = {
                                                            <Select
                                                                theme           = {selectThemeColors}
                                                                options         = {getMonthName()}
                                                                className       = 'react-select'
                                                                placeholder     = "Pilih Bulan"
                                                                classNamePrefix = 'select'
                                                            />
                                                        }
                                                    />
                                                    {errors && errors.month && <Label className="text-danger">{errors?.month?.label?.message}</Label>}
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
                                                    <Controller
                                                        name    = "quarter_type"
                                                        control = {control}
                                                        as      = {
                                                            <Select
                                                                theme               = {selectThemeColors}
                                                                isMulti
                                                                options             = {[
                                                                    {value: 0 , label : 'Semua Triwulan'},
                                                                    {value: 1 , label : 'Triwulan I (Januari - Maret)'},
                                                                    {value: 2 , label : 'Triwulan II (April - Juni)'},
                                                                    {value: 3 , label : 'Triwulan III (Juli - September)'},
                                                                    {value: 4 , label : 'Triwulan IV (Oktober - Desember)'},
                                                                ]}
                                                                className           = 'react-select'
                                                                isClearable
                                                                placeholder         = "Pilih Jenis Laporan"
                                                                classNamePrefix     = 'select'
                                                                closeMenuOnSelect   = {false}
        
                                                            />
                                                        }
                                                    />
                                                    {errors && errors.quarter_type && <Label className="text-danger">{errors?.quarter_type?.message}</Label>}
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
                                                                options     = {{ dateFormat: "d-m-Y"}}
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
                                                <Label for = 'year'>
                                                    Tahun
                                                </Label>
                                                <Controller
                                                    name    = "year"
                                                    control = {control}
                                                    as      = {
                                                        <Select
                                                            theme           = {selectThemeColors}
                                                            options         = {getYearsBefore(10)}
                                                            className       = 'react-select'
                                                            placeholder     = "Pilih Tahun Laporan"
                                                            classNamePrefix = 'select'
                                                        />
                                                    }
                                                />
                                                {errors && errors.year && <Label className="text-danger">{errors?.year?.label?.message}</Label>}
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
                                                
                                                {errors && errors.workunit_kind && <Label className="text-danger">{errors?.workunit_kind?.label?.message}</Label>}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for='judul'>Dengan Satuan Kerja Dibawahnya</Label>
                                                <Controller
                                                    name    = "with_child"
                                                    control = {control}
                                                    as      = {
                                                        <Select
                                                            theme           = {selectThemeColors}
                                                            options         = {[
                                                                {value: true   , label : 'Ya'},
                                                                {value: false  , label : 'Tidak'},
                                                            ]}
                                                            className       = 'react-select'
                                                            placeholder     = "Pilih Salah Satu"
                                                            classNamePrefix = 'select'
                                                        />
                                                    }
                                                />
                                                {errors && errors.with_child && <Label className="text-danger">{errors?.with_child?.label?.message}</Label>}
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
                                                        options             = {
                                                            workunitKind === 2  ?
                                                                workunitLevel2_
                                                            :
                                                                workunitLevel2_.filter((data) => (data.label != 'SEMUA KEJAKSAAN TINGGI'))
                                                        }
                                                        className           = 'react-select'
                                                        placeholder         = "Pilih Satuan Kerja"
                                                        classNamePrefix     = 'select'
                                                        isMulti             = {workunitKind === 2 ? true : false}
                                                        isClearable         = {workunitKind === 2 ? true : false}
                                                        closeMenuOnSelect   = {workunitKind === 2 ? false : true}
                                                    />
                                                }
                                            />

                                            {/* {errors && errors.workunit_level_2 && <Label className="text-danger">{errors?.workunit_level_2?.message}</Label> } */}
                                            {workunitKind === 2 ? errors && errors.workunit_level_2 && <Label className="text-danger">{errors?.workunit_level_2?.message}</Label> : errors && errors.workunit_level_2 && <Label className="text-danger">{errors?.workunit_level_2?.label?.message}</Label>  }

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
                                                    options             = {
                                                        workunitKind === 3  ?
                                                            workunitLevel3
                                                        :
                                                            workunitLevel3?.filter((data) => (data.label != 'SEMUA KEJAKSAAN NEGERI'))
                                                    }
                                                    className           = 'react-select'
                                                    isDisabled          = {!workunitLevel3}
                                                    placeholder         = {workunitLevel3 ? "Pilih Kejaksaan Negeri" : "Pilih Kejati Terlebih Dahulu"}
                                                    classNamePrefix     = 'select'
                                                    isMulti             = {workunitKind === 3 ? true : false}
                                                    isClearable         = {workunitKind === 3 ? true : false}
                                                    closeMenuOnSelect   = {workunitKind === 3 ? false : true}

                                                />
                                            }
                                        />
                                        {workunitKind === 3 ? errors && errors.workunit_level_3 && <Label className="text-danger">{errors?.workunit_level_3?.message}</Label> : errors && errors.workunit_level_3 && <Label className="text-danger">{errors?.workunit_level_3?.label?.message}</Label>  }
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
                                                        options             = {
                                                            workunitKind === 4  ?
                                                                workunitLevel4
                                                            :
                                                                workunitLevel4?.filter((data) => (data.label != 'SEMUA CABANG KEJAKSAAN NEGERI'))
                                                        }
                                                        className           = 'react-select'
                                                        isDisabled          = {!workunitLevel4}
                                                        placeholder         = {workunitLevel4 ? "Pilih Cabang Kejaksaan Negeri" : "Pilih Kejari Terlebih Dahulu"}
                                                        classNamePrefix     = 'select'
                                                        isMulti             = {workunitKind === 4 ? true : false}
                                                        isClearable         = {workunitKind === 4 ? true : false}
                                                        closeMenuOnSelect   = {workunitKind === 4 ? false : true}
                                                    />
                                                }
                                            />
                                            {errors && errors.workunit_level_4 && <Label className="text-danger">{errors?.workunit_level_4?.message}</Label> }
                                        </FormGroup>
                                    </Col>
                                }
                                    <Col md={6}>
                                    </Col>
                                </Row>

                                <Row>
                                {
                                    workunitKind &&
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
                                                    options             = {props.reportCategory.filter((data) => data.value === 11 || data.value === 12 || data.value === 13)}
                                                    className           = 'react-select'
                                                    placeholder         = "Pilih Satuan Kerja"
                                                    classNamePrefix     = 'select'
                                                    isMulti             = {reportKind === 'periodic' ? true : false}
                                                    isClearable         = {reportKind === 'periodic' ? true : false}
                                                    closeMenuOnSelect   = {reportKind === 'periodic' ? false : true}

                                                />
                                            }
                                        />

                                        { errors && errors.report_body && reportKind === 'periodic' ? <Label className="text-danger">{errors?.report_body?.message}</Label> : <Label className="text-danger">{errors?.report_body?.label?.message}</Label>}
                                    </Col>
                                }
                                    <Col md={6}>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    }

                    {
                        isFormat === false &&
                        <div>
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
                                                                        options     = {{ dateFormat: "d-m-Y", enableTime: true, time_24hr: true }}
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
                                                                        options         = {props.reportCategory.filter((data) => data.value >= 1 && data.value <= 14 )}
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
                        </div>
                    }
                    <ModalFooter className="d-flex justify-content-between px-0 mt-1">
                        <div id="batal-input">
                            <Button 
                                color   = 'primary' 
                                outline 
                                onClick = {() => setIsAddFormVisible(false)}
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