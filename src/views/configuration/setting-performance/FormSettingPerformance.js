import { Fragment, useContext, useState }   from 'react';
import { useForm, Controller }  from "react-hook-form";
import moment                   from 'moment';

import Select                   from 'react-select';
import Flatpickr                from 'react-flatpickr';
import { yupResolver }          from '@hookform/resolvers/yup';
import PerfectScrollbar         from 'react-perfect-scrollbar';
import { selectThemeColors }    from '@utils';
import {
    Row,
    Col,
    Card,
    Form,
    Label,
    Input,
    Media,
    Button,
    CardBody,
    FormGroup,
    ModalFooter,
    CustomInput,
    FormFeedback,
} from "reactstrap";

//Image
import Avatar                   from '@components/avatar';
import defaultBadge             from '@src/assets/images/achievement_icon/default_achievement.png';

//Components
import IconSwitch               from "../../../components/widgets/icon-switch/IconSwitch";
import CustomToast              from '../../../components/widgets/custom-toast';
import ImageRounded             from '../../../components/widgets/image-rounded';
import SubmitButton             from '../../../components/widgets/submit-button';
import { ModalBase }            from '../../../components/widgets/modals-base';
import { 
    validationEvent, 
    validationNotEvent  
    }                           from './validation';

//API
import SettingPerformanceApi    from '../../../services/pages/configuration/setting-performance';
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { PerformanceContext } from '../../../context/PerformanceContext';

const relationOptions = [
    { value: 'lebih_dari', label: 'Lebih dari' },
    { value: 'kurang_dari', label: 'Kurang dari' },
    { value: 'lebih_dari_sama_dengan', label: 'Lebih dari sama dengan' },
    { value: 'kurang_dari_sama_dengan', label: 'Kurang dari sama dengan' }
]

const FormSettingPerformance = (props) => {
    const {
        data,
        isEvent,
        onCancel,
        staticBadge,
        refreshData,
        kindAchievementOption
    } = props;

    const { workunitOptions }                   = useContext(PerformanceContext);


    //State
    const [picker, setPicker]                   = useState(false);
    const [loading, setLoading]                 = useState(false);
    const [badgeId, setBadgeId]                 = useState(data ? data.badge_id :null);
    const [badgeName, setBadgeName]             = useState(data ? data.badge_name : null);
    const [FormImage, setFormImage]             = useState(false);
    const [inputAgent, setInputAgent]           = useState(data.max_recipient ? true : false);
    const [badgeDefault, setBadgeDefault]       = useState(data ? data.badge : defaultBadge);
    const [inputRangeDate, setInputRangeDate]   = useState(new Date());

    const defaultWorkunit =  () => {
        let datas    =  Array.from(data.achievement_workunit,data => data.workunit_id);
        let values   = [];
        
        datas.map((data,i) => (
            values.push(workunitOptions.filter(opt=> opt.value == data)[0])
        ))

        return values;
    };
    
    const defaultValues = {
        title           : (data) ? data.title : null,
        note            : (data) ? data.note : null,
        points          : (data) ? data.points : 0,
        workunit_id     : (data) ? defaultWorkunit() : [],
        target_value    : (data) ? data.target_value : 0,  
        max_recipient   : (data) ? data.max_recipient : null
    };

    const { register, errors, handleSubmit, control } = useForm({ defaultValues : defaultValues, mode: "onChange", resolver: yupResolver(isEvent ? validationEvent : validationNotEvent ) });

    const selectBadge = e => {
        const reader  = new FileReader(),
            files     = e.target.files
        reader.onload = function () {
            setBadgeDefault(reader.result);
            setFormImage(false);
        }
        reader.readAsDataURL(files[0]);
    };

    const onSubmit = dataForm => {
        setLoading(true);
        dataForm["badge"]       = badgeDefault;
        dataForm["is_event"]    = isEvent;
        dataForm["badge_id"]    = badgeId;
        dataForm["badge_name"]  = badgeName;

        if(picker){
            dataForm["end_date"]    = moment(inputRangeDate[1]).format("YYYY-MM-DD")  
            dataForm["start_date"]  = moment(inputRangeDate[0]).format("YYYY-MM-DD")
        }

        if(!data){
            SettingPerformanceApi.create({
                data : dataForm,
                onSuccess : (res) => {
                    setLoading(false);
                    refreshData();
                    onCancel();
                    CustomToast("success","Data Berhasil ditambahkan")  ;
                },
                onFail : (err) => {
                    console.log(err);
                    setLoading(false);
                }
            })
        }else{
            SettingPerformanceApi.update({
                id    : data.id,
                data  : dataForm,

                onSuccess : (res) => {
                    setLoading(false);
                    refreshData();
                    onCancel();
                    CustomToast("success","Data Berhasil diubah")  ;
                },
                onFail : (err) => {
                    console.log(err);
                    setLoading(false);
                }
            })
        }
    };

    return (
        <Fragment>
            {/*  modal icon achievement */}
            <ModalBase 
                show    = {FormImage} 
                title   = "Tambah Lencana" 
                setShow = {(par) => { setFormImage(par) }}
            >
                <Row className="d-flex align-items-end">
                    <Col md="9">
                        <Media>
                            <Media 
                                left
                                className = 'mr-25' 
                            >
                                <Media 
                                    src         = {badgeDefault} 
                                    alt         = 'Generic placeholder image' 
                                    width       = '80'
                                    height      = '80' 
                                    object 
                                    className   = 'rounded mr-50' 
                                />
                            </Media>
                            <Media 
                                body
                                className = 'mt-75 ml-1' 
                            >
                                <Button.Ripple 
                                    tag         = {Label} 
                                    size        = 'sm' 
                                    color       = 'primary'
                                    className   = 'mr-75' 
                                >
                                    Upload
                                    <Input 
                                        type     = 'file' 
                                        hidden 
                                        accept   = 'image/*'
                                        onChange = {selectBadge} 
                                    />
                                </Button.Ripple>
                            </Media>
                        </Media>
                    </Col>
                    <small className="pl-1 mt-1">Pilih Data yang sudah ada</small>
                </Row>
                <PerfectScrollbar style={{ maxHeight: "350px" }}>
                    <Row className="mt-2">
                        {
                            staticBadge != null && staticBadge.map((data, i) => (
                                <Col md="3" key={i}>
                                    <Avatar 
                                        img         = {data.url} 
                                        imgHeight   = {90} 
                                        imgWidth    = {90} 
                                        className   = "mb-1" 
                                        onClick     = {() => { 
                                            setBadgeId(data.id); 
                                            setBadgeName(data.name); 
                                            setBadgeDefault(data.url); 
                                            setFormImage(false) 
                                        }}
                                    />
                                </Col>
                            ))
                        }
                    </Row>
                </PerfectScrollbar>

                <ModalFooter className="d-flex justify-content-between">
                    <Button.Ripple 
                        color   = "primary" 
                        outline
                        onClick = {() => { setFormImage(false) }} 
                    >
                        Batal
                    </Button.Ripple>
                    <Button.Ripple color="primary">
                        Simpan
                    </Button.Ripple>
                </ModalFooter>
            </ModalBase>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <Label>Judul Performa/ Penelitian</Label>
                            <Input
                                name            = "title"
                                innerRef        = {register()}
                                invalid         = {(errors.title) ? true : false}
                                defaultValues   = {defaultValues.title}
                            />
                            {errors && errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                            <Label>Keterangan</Label>
                            <Input
                                name            = "note"
                                invalid         = {(errors.note) ? true : false}
                                innerRef        = {register()}
                                defaultValues   = {defaultValues.note}
                            />
                            {errors && errors.note && <FormFeedback>{errors.note.message}</FormFeedback>}
                        </FormGroup>
                    </Col>
                </Row>

                <Card color="secondary" outline>
                    <CardBody>
                        <Row>
                            <Col md="2">
                                JIKA
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label>Jenis Penilaian</Label>
                                    <CustomInput
                                        id          = 'select-custom'
                                        type        = 'select'
                                        name        = 'kind'
                                        innerRef    = {register()}
                                        invalid     = {(errors.kind) ? true : false} >
                                        <option disabled selected value=""> Pilih </option>
                                        {kindAchievementOption && kindAchievementOption.map((opt, i) => (
                                            <option 
                                                key         = {opt.key} 
                                                value       = {opt.value} 
                                                selected    = {(data) ? opt.value == data.kind : false}
                                            >
                                                {opt.label}
                                            </option>
                                        ))}
                                    </CustomInput>
                                    {errors && errors.kind && <FormFeedback>{errors.kind.message}</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label>Pilih Relasi</Label>
                                    <CustomInput
                                        type        = 'select'
                                        name        = 'condition'
                                        invalid     = {(errors.condition) ? true : false}
                                        innerRef    = {register()}
                                    >
                                        <option disabled selected value=""> Pilih </option>
                                        {relationOptions && relationOptions.map((opt, i) => (
                                            <option 
                                                key         = {opt.key} 
                                                value       = {opt.value} 
                                                selected    = {(data) ? opt.value == data.condition : false}
                                            >
                                                {opt.label}
                                            </option>
                                        ))}
                                    </CustomInput>
                                    {errors && errors.condition && <FormFeedback>{errors.condition.message}</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label></Label>
                                    <Input
                                        name            = "target_value"
                                        invalid         = {(errors.target_value) ? true : false}
                                        innerRef        = {register()}
                                        defaultValue    = {defaultValues.target_value}
                                    />
                                    {errors && errors.target_value && <FormFeedback>{errors.target_value.message}</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col md="2">Maka</Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label>Point</Label>
                                    <Input
                                        name            = "points"
                                        invalid         = {(errors.points) ? true : false}
                                        innerRef        = {register()}
                                        defaultValue    = {defaultValues.points}
                                    />
                                    {errors && errors.points && <FormFeedback>{errors.points.message}</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col md="2">
                                <ImageRounded 
                                    src     = {badgeDefault} 
                                    width   = {80} 
                                    height  = {80} 
                                    onClick = {() => { setFormImage(true) }}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                {
                    isEvent &&
                    <Card 
                        color   = "secondary" 
                        outline
                    >
                        <CardBody>
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <Label>
                                            Satuan Kerja
                                        </Label>
                                        <Controller
                                            as              = {Select}
                                            name            = "workunit_id"
                                            theme           = {selectThemeColors}
                                            control         = {control}
                                            options         = {workunitOptions}
                                            isMulti
                                            className       = 'react-select'
                                            isClearable     = {false}
                                            placeholder     = "Pilih Satker"
                                            classNamePrefix = 'select'
                                        />
                                        {errors && errors.workunit_id && <Label className="text-danger">{errors.workunit_id.message}</Label>}
                                    </FormGroup>
                                </Col>
                                <Col md="5">
                                    <FormGroup>
                                        <Label>
                                            Aktifkan Jumlah Agen
                                        </Label>
                                        <CustomInput
                                            id              = 'icon-primary'
                                            type            = 'switch'
                                            label           = {<IconSwitch />}
                                            onChange        = {() => { setInputAgent(!inputAgent) }}
                                            defaultChecked  = {inputAgent}
                                        />
                                    </FormGroup>
                                    {
                                        inputAgent &&
                                        <FormGroup>
                                            <Label>
                                                Jumlah Agen
                                            </Label>
                                            <Input 
                                                name            = 'max_recipient'
                                                disabled        = {!inputAgent} 
                                                innerRef        = {register()}
                                                defafultValue   = {defaultValues.max_recipient}
                                            />
                                        </FormGroup>
                                    }
                                </Col>
                                <Col 
                                    md          = "5" 
                                    className   = "offset-md-2"
                                >
                                    <FormGroup>
                                        <Label>
                                            Aktifkan Jangka Waktu
                                        </Label>
                                        <CustomInput 
                                            id          = 'icon-primary2'
                                            type        = 'switch' 
                                            name        = 'icon-primary' 
                                            label       = {<IconSwitch/>} 
                                            onChange    = {() => {setPicker(!picker)}} 
                                        />
                                    </FormGroup>
                                    {
                                        picker &&
                                        <FormGroup>
                                            <Label>
                                                Jangka Waktu
                                            </Label>
                                            <Flatpickr
                                                options     = {{
                                                    mode    : 'range',
                                                    minDate : new Date()
                                                }}
                                                onChange    = {date => { setInputRangeDate(date)}}
                                                disabled    = {!picker}
                                                className   = 'form-control'
                                            />
                                        </FormGroup>
                                    }
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                }

                <ModalFooter className="d-flex justify-content-between px-0">
                    <Button 
                        color   = 'primary' 
                        outline 
                        onClick = {onCancel}
                    >
                        Batal
                    </Button>
                    <SubmitButton 
                        size        = "sm" 
                        isLoading   = {loading}
                    >
                        Simpan
                    </SubmitButton>
                </ModalFooter>
            </Form>
        </Fragment>
    );
};

export default FormSettingPerformance;