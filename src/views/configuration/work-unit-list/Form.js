import { Fragment, useEffect, useState, useContext }    from "react";
import { useForm, Controller }                          from 'react-hook-form';
import { 
    Col, 
    Row, 
    Form, 
    Input, 
    Media, 
    Label, 
    Button, 
    FormGroup, 
    ModalFooter, 
    CustomInput, 
    FormFeedback, 
} from "reactstrap";

import Select                                           from "react-select";
import { yupResolver }                                  from '@hookform/resolvers/yup';
import { selectThemeColors }                            from '@utils';
import SelectOptionsService                             from '@src/services/pages/select-options';

//Image
import defaultLogo                                      from '@src/assets/images/portrait/small/150x150.png';

//Components
import validation                                       from "./validation";
import CustomToast                                      from "../../../components/widgets/custom-toast";
import SubmitButton                                     from "../../../components/widgets/submit-button";
import { PerformanceContext }                           from "../../../context/PerformanceContext";

//API
import workunitListAPI                                  from "../../../services/pages/configuration/unit-work-list/WorkunitList";
import WorkUnitListApi                                  from "../../../services/pages/configuration/unit-work-list";


const ModalForm = (props) => {
    //props
    const {
        data,
        getData,
        onCancel,
        setListData,
        setModalForm,
    } = props;

    //Context
    const { workunitOptions}                                 = useContext(PerformanceContext);

    //State
    const [logo, setLogo]                                   = useState(data.logo ?? defaultLogo);
    const [loading, setLoading]                             = useState(false);
    const [workUnitLevelOptions, setWorkUnitLevelOptions]   = useState(false);

    const selectLogo = e => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setLogo(reader.result)
        }
        reader.readAsDataURL(files[0]);
    };

    const WorkUnitLevelOptions = () => {
        SelectOptionsService.workUnitLevel({
            onSuccess: (res) => {
                setWorkUnitLevelOptions(res);
            }, onFail: (err) => {
                CustomToast("danger", err.message);
            }
        })
    };

    const { 
        errors, 
        control, 
        register, 
        setValue, 
        handleSubmit, 
    } = useForm({ mode: "onChange", resolver: yupResolver(validation) });

    const create = (dataForm) => {
        let formData = {
            ...dataForm,
            sequence            : 1,
            parent_id           : parseInt(dataForm.parent_id),
            workunit_level_id   : parseInt(dataForm.workunit_level_id),
            latitude            : parseFloat(dataForm.latitude),
            longitude           : parseFloat(dataForm.longitude)
        }

        workunitListAPI.createWorkunitList(formData).then(
            res => {
                if (!res.is_error) {
                    setLoading(false);
                    setModalForm(false);
                    CustomToast("success", "Data Berhasil Disimpan");
                    setListData(false);
                    getData();
                } else {
                    CustomToast("danger", err.code);
                }
            }
        ).catch(
            err => {
                setLoading(false);
                CustomToast("danger", err.code);
            }
        )
    }

    // const create = dataForm => {
    //     WorkUnitListApi.create({
    //         data: dataForm,

    //         onSuccess: (res) => {
    //             setLoading(false);
    //             setModalForm(false);
    //             CustomToast("success", "Data Berhasil Disimpan");
    //             setListData(false);
    //             getData();
    //         },
    //         onFail: (err) => {
    //             setLoading(false);
    //             CustomToast("danger", err.message);
    //         }
    //     })
    // };

    const update = (dataForm) => {
        let formData = {
            ...dataForm,
            id                  : data.id,
            sequence            : 1,
            parent_id           : parseInt(dataForm.parent_id),
            workunit_level_id   : parseInt(dataForm.workunit_level_id),
            latitude            : parseFloat(dataForm.latitude),
            longitude           : parseFloat(dataForm.longitude)
        }

        workunitListAPI.updateWorkunitList(formData).then(
            res => {
                if (!res.is_error) {
                    setLoading(false);
                    setModalForm(false);
                    CustomToast("success", "Data Berhasil Diubah");
                    setListData(false);
                    getData();
                } else {
                    CustomToast("danger", err.code);
                }
            }
        ).catch(
            err => {
                setLoading(false);
                CustomToast("danger", err.code);
            }
        )
    }

    // const update = dataForm => {
    //     WorkUnitListApi.update({
    //         id          : data.id,
    //         data        : dataForm,
    //         old_logo_id : data.logo_id,
    //         logo        : data, logo,
    //         logo_name   : data.logo_name,

    //         onSuccess: (res) => {
    //             setLoading(false);
    //             setModalForm(false);
    //             CustomToast("success", "Data Berhasil Diubah");
    //             setListData(false);
    //             getData();
    //         },
    //         onFail: (err) => {
    //             CustomToast("danger", err.message);
    //         }
    //     })
    // };

    const onSubmit = dataForm => {
        console.log(dataForm);
        if(dataForm.parent_id != undefined){
            dataForm.parent_id = dataForm.parent_id.value;
        }

        setLoading(true);
        if (!data) {
            create(dataForm)
        } else {
            update(dataForm)
        }
    };

    useEffect(() => {
        WorkUnitLevelOptions()

        if(data){
            setValue('parent_id', {value: data.parent_id, label:data.parent})
        }
    }, []);

    return (
        <Fragment>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col 
                        md = "6" 
                        sm = "12"
                    >
                        <FormGroup>
                            <Label for='exampleCustomFileBrowser'>Logo</Label>
                            <Media>
                                <Media 
                                    left
                                    className = 'mr-25' 
                                >
                                    <Media 
                                        src       = {logo} 
                                        alt       = 'Generic placeholder image'
                                        object 
                                        height    = '80' 
                                        width     = '80'
                                        className = 'rounded mr-50' 
                                    />
                                </Media>
                                <Media 
                                    id        = "workunit-list-photo"
                                    body
                                    className = 'mt-75 ml-1' 
                                >
                                    <Button.Ripple 
                                        tag       = {Label} 
                                        size      = 'sm' 
                                        color     = 'primary'
                                        className = 'mr-75' 
                                    >
                                        Upload
                                        <Input 
                                            type     = 'file' 
                                            name     = "photo" 
                                            hidden 
                                            accept   = 'image/*' 
                                            invalid  = {(errors.photo) ? true : false} 
                                            innerRef = {register()} 
                                            onChange = {selectLogo} 
                                        />
                                    </Button.Ripple>
                                </Media>
                            </Media>
                            {errors && errors.photo && <FormFeedback>{errors.photo.message}</FormFeedback>}
                        </FormGroup>
                    </Col>

                    <Col 
                        md = "6" 
                        sm = "12"
                    >
                        <FormGroup>
                            <Label for='address'>Alamat</Label>
                            <div id="workunit-list-address">
                                <Input
                                    type         = 'textarea'
                                    name         = 'address'
                                    rows         = '3'
                                    placeholder  = 'Alamat'
                                    innerRef     = {register()}
                                    invalid      = {(errors.address) ? true : false}
                                    defaultValue ={(data) ? data.address : null} 
                                />
                            </div>
                            {errors && errors.address && <FormFeedback>{errors.address.message}</FormFeedback>}
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col
                        md = "6" 
                        sm = "12"
                    >
                        <FormGroup>
                            <Label for='satker'>Induk</Label>
                            <div id="workunit-list-induk">
                                <Controller
                                    name    = "parent_id"
                                    control = {control}
                                    as      = {
                                        <Select
                                            id              = "parent_id" 
                                            theme           = {selectThemeColors}
                                            options         = {workunitOptions}
                                            className       = 'react-select'
                                            placeholder     = "Pilih Satker"
                                            isClearable
                                            classNamePrefix = 'select'
                                        />
                                    }
                                />
                            </div>
                        </FormGroup>
                    </Col>

                    <Col 
                        md = "6" 
                        sm = "12"
                    >
                        <FormGroup>
                            <Label for='struktur'>Garis Lintang</Label>
                            <div id="workunit-list-latitude">
                                <Input
                                    name         = "latitude"
                                    invalid      = {(errors.latitude) ? true : false}
                                    innerRef     = {register()}
                                    defaultValue = {(data) ? data.latitude : null}
                                />
                            </div>
                            {errors && errors.latitude && <FormFeedback>{errors.latitude.message}</FormFeedback>}
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col 
                        md = "6" 
                        sm = "12"
                    >
                        <FormGroup>
                            <Label for='ktpnumber'>ID</Label>
                            <div id="workunit-list-id">
                                <Input
                                    type         = 'text'
                                    name         = 'code'
                                    invalid      = {(errors.code) ? true : false}
                                    innerRef     = {register()}
                                    defaultValue = {(data) ? data.code : null}
                                />
                            </div>
                            {errors && errors.code && <FormFeedback>{errors.code.message}</FormFeedback>}
                        </FormGroup>
                    </Col>

                    <Col
                        md = "6" 
                        sm = "12"
                    >
                        <FormGroup>
                            <Label for='phone'>Garis Bujur</Label>
                            <div id="workunit-list-longitude">
                                <Input
                                    type         = 'text'
                                    name         = "longitude"
                                    invalid      = {(errors.longitude) ? true : false}
                                    innerRef     = {register()}
                                    defaultValue = {(data) ? data.longitude : null}
                                />
                            </div>
                            {errors && errors.longitude && <FormFeedback>{errors.longitude.message}</FormFeedback>}
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col 
                        md = "6" 
                        sm = "12"
                    >
                        <FormGroup>
                            <Label for='name'>Nama</Label>
                            <div id="workunit-list-name">
                                <Input
                                    type         = 'text'
                                    name         = 'name'
                                    invalid      = {(errors.name) ? true : false}
                                    innerRef     = {register()}
                                    defaultValue = {(data) ? data.name : null}
                                />
                            </div>
                            {errors && errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                        </FormGroup>
                        <FormGroup className="mt-1">
                            <Label for='nameAgen'>No. Telepon</Label>
                            <div id="workunit-list-telpon">
                                <Input 
                                    type     = 'text' 
                                    name     = "phone_number" 
                                    invalid      = {(errors.phone_number) ? true : false}
                                    innerRef = {register()}
                                    defaultValue = {(data) ? data.phone_number : null}
                                />
                            </div>
                        </FormGroup>
                    </Col>

                    <Col 
                        md = "6" 
                        sm = "12"
                    >
                        <FormGroup>
                            <Label for='email'>Deskripsi</Label>
                            <div id="workunit-list-description">
                                <Input
                                    type         = 'textarea'
                                    rows         = '4'
                                    name         = "description"
                                    invalid      = {(errors.description) ? true : false}
                                    innerRef     = {register()}
                                    defaultValue = {(data) ? data.description : null}
                                />
                            </div>
                            {errors && errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col 
                        md = "6" 
                        sm = "12"
                    >
                        <FormGroup>
                            <Label for='name'>Tingkat</Label>
                            <div id="workunit-list-level">
                                <CustomInput 
                                    id       = 'select-custom' 
                                    type     = 'select' 
                                    name     = 'workunit_level_id' 
                                    value    = {data.workunit_level_id} 
                                    invalid  ={(errors.workunit_level_id) ? true : false}
                                    innerRef ={register()} 
                                >
                                    <option 
                                        value    = ""
                                        disabled 
                                        selected 
                                    >
                                        Pilih Tingkat
                                    </option>
                                    {
                                        workUnitLevelOptions && 
                                        workUnitLevelOptions.map((data, i) => (
                                            <option 
                                                key   = {data.key} 
                                                value = {data.value}
                                            >
                                                {data.label}
                                            </option>
                                        ))
                                    }
                                </CustomInput>
                            </div>
                            {errors && errors.workunit_level_id && <FormFeedback>{errors.workunit_level_id.message}</FormFeedback>}
                        </FormGroup>
                    </Col>
                    <Col 
                        md = "6" 
                        sm = "12"
                    >
                        <FormGroup>
                            <Label for='name'>Email</Label>
                            <Input
                                type         = 'text'
                                name         = 'email'
                                invalid      = {(errors.email) ? true : false}
                                innerRef     = {register()}
                                defaultValue = {(data) ? data.email : null}
                            />
                            {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                        </FormGroup>
                    </Col>
                </Row>
                <ModalFooter className="justify-content-md-between px-0">
                    <div id="workunit-list-batal">
                        <Button.Ripple 
                            color   = "primary"
                            onClick = {() => { onCancel(false) }} 
                            outline
                        >
                            Batal
                        </Button.Ripple>
                    </div>
                    <div id="workunit-list-submit">
                        <SubmitButton 
                            size      = "sm" 
                            isLoading = {loading}
                        >
                            Submit
                        </SubmitButton>
                    </div>
                </ModalFooter>
            </Form>
        </Fragment>
    );
};

export default ModalForm;