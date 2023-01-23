import { Fragment, useContext, useEffect, useState, memo, useCallback } from 'react';
import Flatpickr from 'react-flatpickr';
import { XCircle } from 'react-feather';
import { selectThemeColors } from '@utils';
import Select from "react-select";
import moment from 'moment'
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
import Repeater from '../../../components/widgets/repeater';
import { ModalBase } from '../../../components/widgets/modals-base';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validation from './validation';
import SubmitButton from '../../../components/widgets/submit-button';
import classNames from 'classnames'
import { EmployeeContext } from '../../../context/EmployeeContext';
import AutomationApi from '../../../services/pages/configuration/automation';
import CustomToast from '../../../components/widgets/custom-toast';
import { date } from 'yup';
import Helper from '../../../helpers';



const EditForm = (props) => {
    //Props
    const {
        thens,
        onClose,
        showForm,
        statements,
        operators,
        getData,
        data,
        dataEdit
    } = props;

    // context
    const { employees } = useContext(EmployeeContext);

    //State
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [conditionSelected, setConditionSelected] = useState(null);
    const [thenSelected, setThenSelected] = useState(null);




    // form
    const { register, errors, handleSubmit } = useForm({
        mode: "onChange", resolver: yupResolver(validation)

    });

    // custom err
    const [customErr, setCustomErr] = useState({
        time: false,
        period: false,
        roles: false,
        formReapeat: false
    });

    // default value input
    const [time, setTime] = useState(null);
    const [period, setPeriod] = useState(null);
    const [roles, setRoles] = useState([]);
    const [formReapeat, setFormReapet] = useState([]);

    const selectCondition = (id) => {
        var statement = statements.find(item => item.id == id);
        setConditionSelected(statement);
    }




    const increaseCount = () => {

        if (count == 0 && dataEdit.length > 0) {
            setCount(dataEdit.length + 1)
            setFormReapet([...dataEdit, {
                "index": count,
                "condition": null,
                "statement_id": null,
                "operator_id": null,
                "value": null,
                "options": null
            }
            ])
        } else {
            setFormReapet(prevState => ([...prevState, {
                "index": count,
                "condition": null,
                "statement_id": null,
                "operator_id": null,
                "value": null,
                "options": null
            }]));
            setCount(count + 1)
        }


    };

    const deleteRepeatForm = e => {
        e.preventDefault();
        if (count == 0 && dataEdit.length > 0) {
            var formRepeats = dataEdit.filter(item => item.index != e.target.id);
        } else {
            var formRepeats = formReapeat.filter(item => item.index != e.target.id);
        }
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
    }

    const formatOptions = (options) => {
        if (thenSelected == 3 || thens.find(then => then.id == data.model?.auto_then[0].id).id == 3) {
            return options.filter(opt => opt.user_group != null && opt.user_group[0].name == "Pimpinan Pusat").map(item => {
                return { value: item.position_id, label: item.name }
            })
        } else if (thenSelected == 4 || thens.find(then => then.id == data.model?.auto_then[0].id).id == 4) {
            return options.map(item => {
                return { value: item.uuid, label: item.name }
            })
        }
    }


    const onSubmit = dataForm => {

        var err_ = { ...customErr };
        /*
            check custom error
        */

        // validation period
        if (period == null) {
            if (data.from == null || data.till == null) {
                err_.period = true;
            } else {
                err_.period = false;
            }
        } else {
            err_.time = false;
        }

        // validation time
        if (time == null) {
            if (data.time == null) {
                err_.time = true;
            } else {
                err_.time = false;
            }
        } else {
            err_.time = false;
        }

        if (roles.length == 0) {
            if (thenSelected == 3 || thenSelected == 4) {
                err_.roles = true;
            } else {
                err_.roles = false;
            }
        } else {
            err_.roles = false;
        }

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
            } else {
                dataEdit.map(item => {
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
                "id" : data.id, 
                "repeat": dataForm.repeat,
                "time": moment(new Date(time ? time : data.time)).format('YYYY-MM-DDTH:mm:ssZ'),
                "from": moment(new Date(period ? period[0] : data.from)).format('YYYY-MM-DDTH:mm:ssZ'),
                "till": moment(new Date(period ? period[1] : data.till)).format('YYYY-MM-DDTH:mm:ssZ'),
                "model": {
                    "title": dataForm.title,
                    "uuid": Helper.getUserData().uuid,
                    "auto_relations_and": requestRelationAnd,
                    "auto_relations_or": requestRelationOr,
                    "auto_then": [
                        {
                            "id": dataForm.auto_then,
                        }
                    ],
                    "values": roles.length == 0 && data.model?.values.length > 0 ? data.model?.values : roles
                },



            }

            AutomationApi.update(formData).then(res => {
                setIsLoading(false);
                onClose();
                CustomToast("success", "Data Berhasil diubah");
                getData();

            }, err => {
                console.log(err)
                setIsLoading(false);
            })
        }

        console.log(formData)

    }



    return (
        <Fragment>
            <ModalBase
                size="lg"
                show={showForm}
                title="Ubah Data Automation"
                setShow={() => { onClose() }}
            >
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col
                            md="6"
                            sm="12"
                        >
                            <Label for='name'>Judul Automation</Label>
                            <Input

                                type='text'
                                name='title'
                                innerRef={register()}
                                defaultValue={data.model?.title}
                                invalid={(errors.title) ? true : false}
                            />
                            {errors && errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
                        </Col>
                    </Row>

                    <Card
                        color="secondary"
                        outline
                        className="mt-1"
                    >
                        <CardBody>
                            <Row>
                                <Col md="1" >
                                    <p className='mt-2'>Jika</p>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label> Pilih Kondisi </Label>
                                        <CustomInput
                                            id='select-custom'
                                            type='select'
                                            name='condition'
                                            innerRef={register()}
                                            invalid={(errors.condition) ? true : false}
                                            onChange={(e) => { selectCondition(e.target.value) }}
                                            defaultValue={data.model?.auto_relations_and[0]?.statement_id}
                                        >
                                            <option disabled selected value={0}> Pilih Kondisi </option>
                                            {statements && statements.map((data, index) => (
                                                <option value={data.id}> {data.name} </option>
                                            ))}
                                        </CustomInput>
                                        {errors && errors.condition && <FormFeedback>{errors.condition.message}</FormFeedback>}
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label> Pilih Relasi </Label>
                                        <CustomInput
                                            id='select-custom'
                                            type='select'
                                            name='relation'
                                            innerRef={register()}
                                            invalid={(errors.relation) ? true : false}
                                            defaultValue={data.model?.auto_relations_and[0]?.operator_id}
                                        >
                                            <option disabled selected value={0}> Pilih Relasi </option>
                                            {operators && operators.map((data, index) => (
                                                <option value={data.id}> {data.name} </option>
                                            ))}
                                        </CustomInput>
                                        {errors && errors.relation && <FormFeedback>{errors.relation.message}</FormFeedback>}
                                    </FormGroup>
                                </Col>
                                <Col md="3">
                                    <FormGroup >

                                        <Label></Label>
                                        {data && !conditionSelected && statements.find(item => item.id == data.model?.auto_relations_and[0]?.statement_id).values.length > 0
                                            || conditionSelected && conditionSelected.values.length > 0 ?
                                            <CustomInput
                                                id='select-custom'
                                                type='select'
                                                name='value'
                                                innerRef={register()}
                                                invalid={(errors.value) ? true : false}
                                                className="mt-2"
                                                defaultValue={data.model?.auto_relations_and[0]?.value}

                                            >
                                                <option disabled selected value=""> Pilih </option>
                                                {conditionSelected ? conditionSelected.values.map((data, index) => (
                                                    <option value={data.name}> {data.name} </option>
                                                ))
                                                    : statements.find(item => item.id == data.model?.auto_relations_and[0]?.statement_id).values.map((data, index) => (
                                                        <option value={data.name}> {data.name} </option>
                                                    ))}
                                            </CustomInput>
                                            :
                                            <Input
                                                name="value"
                                                innerRef={register()}
                                                invalid={(errors.value) ? true : false}
                                                defaultValue={data.model?.auto_relations_and[0]?.value}
                                            />}
                                        {errors && errors.value && <FormFeedback>{errors.value.message}</FormFeedback>}
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Repeater count={count > 0 ? count : dataEdit.length}>

                                {i => (

                                    <Row key={i} className='justify-content-between align-items-center form-repeater'>
                                        <Col md="2">
                                            <CustomInput
                                                id='select-custom'
                                                className="form-control"
                                                type='select'
                                                onChange={(e) => {
                                                    changeFormRepeat(e.target.value, i, "condition")
                                                }}
                                                defaultValue={dataEdit[i]?.condition}
                                            >
                                                <option disabled selected value=""> Pilih </option>
                                                <option value="and"> Dan </option>
                                                <option value="or"> Atau </option>

                                            </CustomInput>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for={`item-name-${i}`}>Pilih Tindakan</Label>
                                                <CustomInput
                                                    id='select-custom'
                                                    type='select'
                                                    onChange={(e) => {
                                                        changeFormRepeat(e.target.value, i, "statement_id")
                                                        changeFormRepeat(statements.filter(item => item.id == e.target.value)[0].values, i, "options")
                                                    }}
                                                    defaultValue={dataEdit[i]?.statement_id}
                                                >
                                                    <option disabled selected value=""> Pilih Kondisi </option>
                                                    {statements && statements.map((data, index) => (
                                                        <option value={data.id}  > {data.name} </option>
                                                    ))}
                                                </CustomInput>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for={`cost-${i}`}>Pilih Relasi</Label>
                                                <CustomInput
                                                    id='select-custom'
                                                    type='select'
                                                    onChange={(e) => changeFormRepeat(e.target.value, i, "operator_id")}
                                                    defaultValue={dataEdit[i]?.statement_id}
                                                >
                                                    <option disabled selected value=""> Pilih Kondisi </option>
                                                    {operators && operators.map((data, index) => (
                                                        <option value={data.id}> {data.name} </option>
                                                    ))}
                                                </CustomInput>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>

                                                {formReapeat.find(item => item.index == i) && formReapeat.find(item => item.index == i).options?.length > 0
                                                    || formReapeat.length == 0 && dataEdit && dataEdit[i].options?.length > 0 ?

                                                    <CustomInput
                                                        id="select-custom"
                                                        type='select'
                                                        className="mt-2"
                                                        onChange={(e) => changeFormRepeat(e.target.value, i, "value")}
                                                        defaultValue={dataEdit[i]?.value}
                                                    >
                                                        <option disabled selected value=""> Pilih </option>
                                                        {formReapeat.length > 0 ? formReapeat.find(item => item.index == i).options.map((data, index) => (
                                                            <option value={data.name}> {data.name} </option>
                                                        )) :
                                                            dataEdit[i].options.map((data, index) => (
                                                                <option value={data.name}> {data.name} </option>
                                                            ))
                                                        }
                                                    </CustomInput> :
                                                    <Input
                                                        className="mt-2"
                                                        defaultValue={dataEdit[i]?.value}
                                                        onChange={(e) => changeFormRepeat(e.target.value, i, "value")} />
                                                }

                                            </FormGroup>
                                        </Col>
                                        <Col md={1}>
                                            <div className="text-danger">
                                                <XCircle
                                                    id={i}
                                                    size={20}
                                                    onClick={deleteRepeatForm}
                                                    className="cursor-pointer"
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                )}
                            </Repeater>

                            <Row>
                                <Button
                                    color="flat-primary"
                                    onClick={increaseCount}
                                    className="ml-2"
                                >
                                    [ + Tambah Kondisi ]
                                </Button>
                            </Row>

                            <Row className="mt-1">
                                <Col md="2" >
                                    <p className="mt-2"> Maka </p>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label> Pilih Tindakan </Label>
                                        <CustomInput
                                            id='select-custom'
                                            type='select'
                                            name='auto_then'
                                            invalid={(errors.auto_then) ? true : false}
                                            innerRef={register()}
                                            onChange={(e) => {
                                                setThenSelected(e.target.value)
                                            }}
                                            defaultValue={data.model?.auto_then[0].id}
                                        >
                                            <option disabled selected value={0}> Pilih Tindakan </option>
                                            {thens && thens.map((data, index) => (
                                                <option value={data.id}> {data.name} </option>
                                            ))}
                                        </CustomInput>
                                        {errors && errors.auto_then && <FormFeedback>{errors.auto_then.message}</FormFeedback>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                    <Card
                        color="secondary"
                        outline
                    >
                        <CardBody>
                            <Row>
                                <Col md="1">
                                    Role
                                </Col>
                                <Col md="6">

                                    {data && !thenSelected && thens.find(then => then.id == data.model?.auto_then[0].id).id == 3 ||
                                        data && !thenSelected && thens.find(then => then.id == data.model?.auto_then[0].id).id == 4 ||
                                        thenSelected == 3 || thenSelected == 4 ?
                                        <Select
                                            name='content'
                                            theme={selectThemeColors}
                                            isMulti
                                            className={classNames('react-select',
                                                { 'is-invalid': customErr.roles })}
                                            placeholder="Pilih"
                                            isClearable
                                            classNamePrefix='select'
                                            options={formatOptions(employees)}
                                            defaultValue={formatOptions(employees).filter(item => data.model?.values && data.model?.values.includes(item.value))}
                                            onChange={(e) => {
                                                setRoles(Array.from(e).map(item => item.value))
                                            }}

                                        />
                                        : null}

                                    {customErr.roles ? <FormFeedback>Isian Role Belum Terisi</FormFeedback> : null}
                                </Col>
                                <Col md="5">
                                    <FormGroup>
                                        <Label> Jangka Waktu</Label>
                                        <Flatpickr
                                            id='range-picker'
                                            name='period'
                                            onChange={date => {
                                                setPeriod(date);
                                                setCustomErr({
                                                    time: customErr.time,
                                                    period: false
                                                })
                                            }}
                                            options={{
                                                mode: 'range',
                                                defaultDate: [new Date(data.from), new Date(data.till)],
                                            }}
                                            className={classNames('form-control'
                                                , { 'is-invalid': customErr.period })}

                                        />
                                        {customErr.period ? <FormFeedback>Jangka Waktu Belum Terisi</FormFeedback> : null}

                                    </FormGroup>


                                    <FormGroup>
                                        <Label for='time'>Tanggal Dibuat</Label>
                                        <Flatpickr
                                            options={{
                                                enableTime: true,
                                                dateFormat: 'Y-m-d H:i',
                                                time_24hr: true,
                                                defaultDate: new Date(data.time),
                                            }}
                                            id='time'
                                            name='time'
                                            onChange={date => setTime(date)}
                                            className={classNames('form-control'
                                                , { 'is-invalid': customErr.time })}
                                        // defaultValue={new Date(data.time)}

                                        />
                                        {customErr.time ? <FormFeedback>Tanggal dibuat Belum Terisi</FormFeedback> : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='id'>Pengulangan Laporan</Label>
                                        <div className='demo-inline-spacing'>
                                            <CustomInput
                                                id='exampleCustomRadio'
                                                type='radio'
                                                name='repeat'
                                                label='Satu Kali'
                                                value="single"
                                                innerRef={register()}
                                                inline
                                                defaultChecked={data.repeat == "single"}
                                            />
                                            <CustomInput
                                                id='exampleCustomRadio2'
                                                type='radio'
                                                name='repeat'
                                                label='Harian'
                                                value="daily"
                                                innerRef={register()}
                                                inline
                                                defaultChecked={data.repeat == "daily"}

                                            />
                                            <CustomInput
                                                id='exampleCustomRadio3'
                                                type='radio'
                                                name='repeat'
                                                label='Mingguan'
                                                value="weekly"
                                                innerRef={register()}
                                                inline
                                                defaultChecked={data.repeat == "weekly"}
                                            />
                                            <CustomInput
                                                id='exampleCustomRadio4'
                                                type='radio'
                                                name='repeat'
                                                label='Bulanan'
                                                value="monthly"
                                                innerRef={register()}
                                                inline
                                                defaultChecked={data.repeat == "monthly"}
                                            />
                                        </div>
                                    </FormGroup>
                                    {errors && errors.repeat && <FormFeedback>{errors.repeat.message}</FormFeedback>}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                    <ModalFooter className="d-flex justify-content-between">
                        <Button
                            color='primary'
                            outline
                            onClick={() => onClose()}
                        >
                            Batal
                        </Button>

                        <SubmitButton
                            size="sm"
                            isLoading={isLoading}
                        >
                            Ubah
                        </SubmitButton>
                    </ModalFooter>
                </Form>
            </ModalBase>
        </Fragment>
    );
};

export default EditForm;