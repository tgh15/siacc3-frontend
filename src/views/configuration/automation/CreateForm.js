import { useContext, useState } from 'react';
import Select                   from "react-select";
import moment                   from 'moment'
import Flatpickr                from 'react-flatpickr';
import classNames               from 'classnames'
import { XCircle }              from 'react-feather';
import { useForm }              from 'react-hook-form';
import { yupResolver }          from '@hookform/resolvers/yup';
import { selectThemeColors }    from '@utils';

import {
    Row,
    Col,
    Card,
    Form,
    Label,
    Input,
    Button,
    CardBody,
    FormGroup,
    CustomInput,
    ModalFooter,
    FormFeedback,
} from "reactstrap";

//Components
import Repeater                 from '../../../components/widgets/repeater';
import validation               from './validation';
import TourCreate               from './TourCreate';
import CustomToast              from '../../../components/widgets/custom-toast';
import SubmitButton             from '../../../components/widgets/submit-button';
import { ModalBase }            from '../../../components/widgets/modals-base';

//Context
import { EmployeeContext }      from '../../../context/EmployeeContext';

//Url Api
import AutomationApi            from '../../../services/pages/configuration/automation';


const CreateForm = (props) => {
    //Props
    const {
        thens,
        onClose,
        getData,
        showForm,
        operators,
        statements,
    } = props;

    // context
    const { employees }                             = useContext(EmployeeContext);

    //State
    const [count, setCount]                         = useState(0);
    const [isLoading, setIsLoading]                 = useState(false);
    const [thenSelected, setThenSelected]           = useState(null);
    const [conditionSelected, setConditionSelected] = useState(null);

    // default value input
    const [time, setTime]                           = useState(null);
    const [roles, setRoles]                         = useState([]);
    const [period, setPeriod]                       = useState(null);
    const [formReapeat, setFormReapet]              = useState([]);

    // form
    const { register, errors, handleSubmit } = useForm({ mode: "onChange", resolver: yupResolver(validation) })

    // custom err
    const [customErr, setCustomErr] = useState({
        time        : false,
        roles       : false,
        period      : false,
        formReapeat : false
    });

    const selectCondition = (id) => {
        var statement = statements.find(item => item.id == id);
        setConditionSelected(statement);
    };

    const increaseCount = () => {
        setFormReapet(prevState => ([...prevState, {
            "index"        : count,
            "condition"    : null,
            "statement_id" : null,
            "operator_id"  : null,
            "value"        : null,
            "options"      : null
        }]));

        setCount(count + 1);
    };

    const deleteRepeatForm = e => {
        e.preventDefault();

        var formRepeats = formReapeat.filter(item => item.index != e.target.id);
        setFormReapet(formRepeats);
        e.target.closest('.form-repeater').remove();
    };

    const changeFormRepeat = (value, index, name) => {
        var formRepeats = formReapeat.map(item => {
            if (item.index == index) {
                item[name] = value;
            }
            return item;
        });
        setFormReapet(formRepeats);
    };

    const formatOptions = (options) => {
        if (thenSelected == 3) {
            return options.filter(opt => opt.user_group != null && opt.user_group[0].name == "Pimpinan Pusat").map(item => {
                return { value: item.position_id, label: item.name }
            })
        } else if (thenSelected == 4) {
            return options.map(item => {
                return { value: item.uuid, label: item.name }
            })
        }
    };

    const onSubmit = dataForm => {
        /* check custom error */
        var err_ = { ...customErr };

        // validation period
        (period == null || period.length != 2)
            ? err_.period = true
            : err_.period = false;

        // validation time
        (time == null) ? err_.time = true : err_.time = false;

        (roles.length == 0)
            ? (thenSelected == 3 || thenSelected == 4)
                ? err_.roles = true : err_.roles = false
            : err_.roles = false;

        if (formReapeat.length > 0) {
            var errFormReapeat = [];
            formReapeat.map(item => {
                var errIndex = {};

                if (item.condition == null) {
                    errIndex["conditon"] = true;
                }

                if (item.statement_id == null) {
                    errIndex["statement_id"] = true;
                }

                if (item.operator_id == null) {
                    errIndex["operator_id"] = true;
                }
                if (item.value == null) {
                    errIndex["value"] = true;
                }

                if (errIndex.conditon || errIndex.statement_id || errIndex.operator_id || errIndex.value) {
                    errIndex["index"] = item.index;
                    errFormReapeat.push(errIndex);
                }
            })

            err_.formReapeat = errFormReapeat.length > 0 ? errFormReapeat : false;
        }
        setCustomErr(err_)

        if (!err_.time || !err_.period || !err_.roles) {
            setIsLoading(true);

            let requestRelationOr = [];
            let requestRelationAnd = [];

            requestRelationAnd.push(
                {
                    "statement_id": dataForm.condition,
                    "operator_id": dataForm.relation,
                    "value": dataForm.value
                }
            );

            if (formReapeat.length > 0) {
                formReapeat.map(item => {
                    if (item.condition == "or") {
                        requestRelationOr.push(
                            {
                                "statement_id": parseInt(item.statement_id),
                                "operator_id": parseInt(item.operator_id),
                                "value": item.value
                            }
                        )
                    } else if (item.condition == "and") {
                        requestRelationAnd.push(
                            {
                                "statement_id": parseInt(item.statement_id),
                                "operator_id": parseInt(item.operator_id),
                                "value": item.value
                            }
                        )
                    }
                })
            }

            var formData = {
                "repeat": dataForm.repeat,
                "time": moment(new Date(time)).format('YYYY-MM-DDTH:mm:ssZ'),
                "from": moment(new Date(period[0])).format('YYYY-MM-DDTH:mm:ssZ'),
                "till": moment(new Date(period[1])).format('YYYY-MM-DDTH:mm:ssZ'),
                "model": {
                    "title": dataForm.title,
                    "uuid": localStorage.getItem('uuid'),
                    "auto_relations_and": requestRelationAnd,
                    "auto_relations_or": requestRelationOr,
                    "auto_then": [
                        {
                            "id": dataForm.auto_then,
                        }
                    ],
                    "values": roles
                },
            }

            AutomationApi.create(formData).then(res => {
                setIsLoading(false);
                onClose();
                CustomToast("success", "Data Berhasil disimpan");
                getData();
            }, err => {
                console.log(err)
                setIsLoading(false);
            })
        }
    };

    return (
        <ModalBase
            size    = "lg"
            show    = {showForm}
            title   = "Tambah Data Automation"
            setShow = {() => { onClose() }}
        >
            <TourCreate/>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col
                        md = "6"
                        sm = "12"
                    >
                        <Label for='name'>Judul Automation</Label>
                        <div id="input-title">
                            <Input
                                type     = 'text'
                                name     = 'title'
                                invalid  = {(errors.title) ? true : false}
                                innerRef = {register()}
                            />
                        </div>
                        {errors && errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
                    </Col>
                </Row>

                <Card
                    color     = "secondary"
                    outline
                    className = "mt-1"
                >
                    <CardBody>
                        <Row>
                            <Col md="1">
                                <p className='mt-2'>Jika</p>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label>Pilih Kondisi</Label>
                                    <div id="select-condition">
                                        <CustomInput
                                            id          = 'select-custom'
                                            type        = 'select'
                                            name        = 'condition'
                                            invalid     = {(errors.condition) ? true : false}
                                            onChange    = {(e) => { selectCondition(e.target.value) }}
                                            innerRef    = {register()}
                                        >
                                            <option 
                                                value={0}
                                                disabled 
                                                selected 
                                            >
                                                Pilih Kondisi
                                            </option>
                                            {statements && statements.map((data) => (
                                                <option value={data.id}>{data.name}</option>
                                            ))}
                                        </CustomInput>
                                    </div>
                                    {errors && errors.condition && <FormFeedback>{errors.condition.message}</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label>Pilih Relas</Label>
                                    <div id="select-relationship">
                                        <CustomInput
                                            id       = 'select-custom'
                                            type     = 'select'
                                            name     = 'relation'
                                            invalid  = {(errors.relation) ? true : false}
                                            innerRef = {register()}
                                        >
                                            <option
                                                value={0}
                                                disabled 
                                                selected 
                                            >
                                                Pilih Relasi
                                            </option>
                                            {operators && operators.map((data) => (
                                                <option value={data.id}>{data.name}</option>
                                            ))}
                                        </CustomInput>
                                    </div>
                                    {errors && errors.relation && <FormFeedback>{errors.relation.message}</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label></Label>
                                    <div id="condition-select">
                                        {
                                            conditionSelected && conditionSelected.values.length > 0 ?
                                            <CustomInput
                                                id        = 'select-custom'
                                                type      = 'select'
                                                name      = 'value'
                                                invalid   = {(errors.value) ? true : false}
                                                innerRef  = {register()}
                                                className = "mt-2"
                                            >
                                                <option 
                                                    value=""
                                                    disabled 
                                                    selected 
                                                >
                                                    Pili
                                                </option>
                                                {conditionSelected.values.map((data) => (
                                                    <option value={data.name}> {data.name} </option>
                                                ))}
                                            </CustomInput>
                                            :
                                            <Input
                                                name     = "value"
                                                invalid  = {(errors.value) ? true : false}
                                                innerRef = {register()}
                                            />
                                        }
                                    </div>
                                    {errors && errors.value && <FormFeedback>{errors.value.message}</FormFeedback>}
                                </FormGroup>
                            </Col>
                        </Row>

                        <Repeater count={count}>
                            {i => (
                                <Row 
                                    key       = {i} 
                                    className = 'justify-content-between align-items-center form-repeater'
                                >
                                    <Col md="2">
                                        <CustomInput
                                            type     = 'select'
                                            onChange = {(e) => {
                                                changeFormRepeat(e.target.value, i, "condition")
                                            }}
                                            className   = "form-control"
                                        >
                                            <option 
                                                value=""
                                                disabled 
                                                selected
                                            >
                                                Pilih
                                            </option>
                                            <option value="and">Dan</option>
                                            <option value="or">Atau</option>
                                        </CustomInput>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label for={`item-name-${i}`}>Pilih Tindakan</Label>
                                            <CustomInput
                                                type     = 'select'
                                                onChange = {(e) => {
                                                    changeFormRepeat(e.target.value, i, "statement_id")
                                                    changeFormRepeat(statements.filter(item => item.id == e.target.value)[0].values, i, "options")
                                                }}
                                            >
                                                <option 
                                                    value=""
                                                    disabled 
                                                    selected 
                                                >
                                                    Pilih Kondisi
                                                </option>
                                                {statements && statements.map((data) => (
                                                    <option value={data.id}>{data.name}</option>
                                                ))}
                                            </CustomInput>
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label for={`cost-${i}`}>Pilih Relasi</Label>
                                            <CustomInput
                                                type     = 'select'
                                                onChange = {(e) => changeFormRepeat(e.target.value, i, "operator_id")}
                                            >
                                                <option 
                                                    value=""
                                                    disabled 
                                                    selected 
                                                >
                                                    Pilih Kondisi
                                                </option>
                                                {operators && operators.map((data) => (
                                                    <option value={data.id}>{data.name}</option>
                                                ))}
                                            </CustomInput>
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            {formReapeat.find(item => item.index == i) && formReapeat.find(item => item.index == i).options?.length > 0 ?
                                                <CustomInput
                                                    type      = 'select'
                                                    onChange  = {(e) => changeFormRepeat(e.target.value, i, "value")}
                                                    className = "mt-2"
                                                >
                                                    <option
                                                        value=""
                                                        disabled 
                                                        selected 
                                                    >
                                                        Pilih
                                                    </option>
                                                    {formReapeat.find(item => item.index == i).options.map((data) => (
                                                        <option value={data.name}>{data.name}</option>
                                                    ))}
                                                </CustomInput> :
                                                <Input
                                                    onChange  = {(e) => changeFormRepeat(e.target.value, i, "value")}
                                                    className = "mt-2"
                                                />
                                            }
                                        </FormGroup>
                                    </Col>
                                    <Col md={1}>
                                        <div className="text-danger">
                                            <XCircle
                                                id        = {i}
                                                size      = {20}
                                                onClick   = {deleteRepeatForm}
                                                className = "cursor-pointer"
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            )}
                        </Repeater>

                        <Row>
                            <div id="add-condition">
                                <Button
                                    color     = "flat-primary"
                                    onClick   = {increaseCount}
                                    className = "ml-2"
                                >
                                    [ + Tambah Kondisi ]
                                </Button>
                            </div>
                        </Row>

                        <Row className="mt-1">
                            <Col md="2">
                                <p className="mt-2">Maka</p>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label>Pilih Tindakan</Label>
                                    <div id="choose-action">
                                        <CustomInput
                                            id       = 'select-custom'
                                            type     = 'select'
                                            name     = 'auto_then'
                                            invalid  = {(errors.auto_then) ? true : false}
                                            innerRef = {register()}
                                            onChange = {(e) => {
                                                setThenSelected(e.target.value)
                                            }}
                                        >
                                            <option 
                                                value={0}
                                                disabled 
                                                selected 
                                            >
                                                Pilih Tindakan
                                            </option>
                                            {thens && thens.map((data) => (
                                                <option value={data.id}>{data.name}</option>
                                            ))}
                                        </CustomInput>
                                    </div>
                                    {errors && errors.auto_then && <FormFeedback>{errors.auto_then.message}</FormFeedback>}
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                <Card
                    color   = "secondary"
                    outline
                >
                    <CardBody>
                        <Row>
                            <Col md="1">
                                Role
                            </Col>
                            <Col md="6">
                                {
                                    thenSelected == 3 || thenSelected == 4 ?
                                        <Select
                                            name            = 'content'
                                            theme           = {selectThemeColors}
                                            isMulti
                                            options         = {formatOptions(employees)}
                                            onChange        = {(e) => { setRoles(Array.from(e).map(item => item.value)) }}
                                            className       = {classNames('react-select', { 'is-invalid': customErr.roles })}
                                            placeholder     = "Pilih"
                                            isClearable
                                            classNamePrefix = 'select'
                                        />
                                    : null
                                }
                                {customErr.roles ? <FormFeedback>Isian Role Belum Terisi</FormFeedback> : null}
                            </Col>
                            <Col md="5">
                                <FormGroup>
                                    <Label> Jangka Waktu</Label>
                                    <div id="period-of-time">
                                        <Flatpickr
                                            id        = 'range-picker'
                                            name      = 'period'
                                            value     = {period}
                                            onChange  = {date => {
                                                setPeriod(date);
                                                setCustomErr({
                                                    time: customErr.time,
                                                    period: false
                                                })
                                            }}
                                            options   = {{
                                                mode: 'range',
                                                defaultDate: [new Date(), new Date()],
                                            }}
                                            className = {classNames('form-control', { 'is-invalid': customErr.period })}
                                        />
                                    </div>
                                    {customErr.period ? <FormFeedback>Jangka Waktu Belum Terisi</FormFeedback> : null}
                                </FormGroup>

                                <FormGroup>
                                    <Label for='time'>Tanggal Dibuat</Label>
                                    <div id="create-date">
                                        <Flatpickr
                                            id        = 'time'
                                            name      = 'time'
                                            value     = {time}
                                            options   = {{
                                                enableTime : true,
                                                dateFormat : 'Y-m-d H:i',
                                                time_24hr  : true
                                            }}
                                            onChange  = {date => setTime(date)}
                                            className = {classNames('form-control', { 'is-invalid': customErr.time })}
                                        />
                                    </div>
                                    {customErr.time ? <FormFeedback>Tanggal dibuat Belum Terisi</FormFeedback> : null}
                                </FormGroup>
                                <FormGroup>
                                    <Label for='id'>Pengulangan Laporan</Label>
                                    <div 
                                    id        = "report-repeat"
                                    className = 'demo-inline-spacing'
                                    >
                                        <CustomInput
                                            id              = 'exampleCustomRadio'
                                            type            = 'radio'
                                            name            = 'repeat'
                                            label           = 'Satu Kali'
                                            value           = "single"
                                            inline
                                            innerRef        = {register()}
                                            defaultChecked
                                        />
                                        <CustomInput
                                            id       = 'exampleCustomRadio2'
                                            type     = 'radio'
                                            name     = 'repeat'
                                            label    = 'Harian'
                                            value    = "daily"
                                            inline
                                            innerRef = {register()}
                                        />
                                        <CustomInput
                                            id       = 'exampleCustomRadio3'
                                            type     = 'radio'
                                            name     = 'repeat'
                                            label    = 'Mingguan'
                                            value    = "weekly"
                                            inline
                                            innerRef = {register()}
                                        />
                                        <CustomInput
                                            id       = 'exampleCustomRadio4'
                                            type     = 'radio'
                                            name     = 'repeat'
                                            label    = 'Bulanan'
                                            value    = "monthly"
                                            inline
                                            innerRef = {register()}
                                        />
                                    </div>
                                </FormGroup>
                                {errors && errors.repeat && <FormFeedback>{errors.repeat.message}</FormFeedback>}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                <ModalFooter className="d-flex justify-content-between">
                    <div id="batal-input">
                        <Button
                            color   = 'primary'
                            outline
                            onClick = {() => onClose()}
                        >
                            Batal
                        </Button>
                    </div>
                    <div id="submit-input">
                        <SubmitButton
                            size      = "sm"
                            isLoading = {isLoading}
                        >
                            Simpan
                        </SubmitButton>
                    </div>
                </ModalFooter>
            </Form>
        </ModalBase>
    );
};

export default CreateForm;