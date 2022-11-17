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
    ModalFooter
} from "reactstrap";

import Select                                           from "react-select";
import { yupResolver }                                  from '@hookform/resolvers/yup';
import { selectThemeColors }                            from '@utils';

//Image
import defaultLogo                                      from '@src/assets/images/portrait/small/150x150.png';

//Components
import validation                                       from "./validation";
import CustomToast                                      from "../../../components/widgets/custom-toast";
import SubmitButton                                     from "../../../components/widgets/submit-button";
import { PerformanceContext }                           from "../../../context/PerformanceContext";

//API
import positionAPI                                      from "../../../services/pages/configuration/position";
import workunitListAPI                                  from "../../../services/pages/configuration/unit-work-list/WorkunitList";
import Helper from "../../../helpers";


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
    const [logoFile, setLogoFile]                           = useState(null);
    const [workUnitLevelOptions, setWorkUnitLevelOptions]   = useState(false);

    const { 
        errors, 
        control, 
        register, 
        setValue, 
        handleSubmit, 
    } = useForm({ mode: "onChange", resolver: yupResolver(validation) });

    const selectLogo = (e) => {
        const reader = new FileReader(),
            files = e.target.files;
        reader.onload = function () {
            setLogo(reader.result);
            setLogoFile(files[0]);
        }
        reader.readAsDataURL(files[0]);
    };

    // Workunit level
    const WorkUnitLevelOptions = () => {
        positionAPI.getWorkunitLevel().then(
            res => {
                if (!res.is_error) {
                    let newData = [];

                    res.data.workunit_level.map((data, i) => (
                        newData.push({
                            key   : i,
                            value : data.id,
                            label : data.name
                        })
                    ))

                    setWorkUnitLevelOptions(newData);
                }else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //Create
    const create = (dataForm) => {
        let formData = {
            ...dataForm,
            sequence            : 1,
            latitude            : parseFloat(dataForm.latitude),
            parent_id           : parseInt(dataForm.parent_id.value),
            longitude           : parseFloat(dataForm.longitude),
            workunit_level_id   : parseInt(dataForm.workunit_level_id.value),
        };

        workunitListAPI.createWorkunitList(formData).then(
            res => {
                if (!res.is_error) {
                    if (logoFile == null) {
                        getData();
                        setLoading(false);
                        setListData(false);
                        setModalForm(false);
                        CustomToast("success", "Data Berhasil Disimpan");
                    }else {
                        let dataPhoto = new FormData();

                        dataPhoto.append("logo[]", logoFile);
                        dataPhoto.append("workunit_id", res.data.id);
                        dataPhoto.append("uuid", Helper.getUserData().uuid);

                        workunitListAPI.uploadLogo(dataPhoto).then(
                            res => {
                                if (!res.is_error) {
                                    getData();
                                    setLoading(false);
                                    setListData(false);
                                    setModalForm(false);
                                    CustomToast("success", "Data Berhasil Disimpan");
                                }else {
                                    CustomToast("danger", res.message);
                                }
                            }
                        )
                    }
                }else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                setLoading(false);
                CustomToast("danger", err.message);
            }
        )
    };

    //Update
    const update = (dataForm) => {
        let formData = {
            ...dataForm,
            id                  : data.id,
            data                : dataForm,
            old_logo_id         : data.logo_id,
            logo                : data, logo,
            logo_name           : data.logo_name,
            sequence            : 1,
            latitude            : parseFloat(dataForm.latitude),
            parent_id           : parseInt(dataForm.parent_id.value),
            longitude           : parseFloat(dataForm.longitude),
            workunit_level_id   : parseInt(dataForm.workunit_level_id.value),
        };

        workunitListAPI.updateWorkunitList(formData).then(
            res => {
                console.log(res,"-res")
                if (!res.is_error) {
                    if (logoFile == null) {
                        getData();
                        setLoading(false);
                        setListData(false);
                        setModalForm(false);
                        CustomToast("success", "Data Berhasil Diubah");
                    }else {
                        let dataPhoto = new FormData();

                        dataPhoto.append("logo[]", logoFile);
                        dataPhoto.append("workunit_id", res.data.id);
                        dataPhoto.append("old_logo_id", res.data.logo_id);

                        workunitListAPI.uploadLogo(dataPhoto).then(
                            res => {
                                if (!res.is_error) {
                                    getData();
                                    setLoading(false);
                                    setListData(false);
                                    setModalForm(false);
                                    CustomToast("success", "Data Berhasil Diubah");
                                }else {
                                    CustomToast("danger", res.message);
                                }
                            }
                        )
                    }
                }else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                setLoading(false);
                CustomToast("danger", err.message);
            }
        )
    };

    const onSubmit = (dataForm) => {
        setLoading(true);

        if (!data) {
            create(dataForm);
        } else {
            update(dataForm);
        }
    };

    useEffect(() => {
        WorkUnitLevelOptions();

        if(data){
            setValue('parent_id',         data.parent_id ? {value: data.parent_id, label:data.parent} : undefined);
            setValue('workunit_level_id', data.workunit_level_id ? {value: data.workunit_level_id, label:data.workunit_level} : undefined);
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
                                    defaultValue = {(data) ? data.address : null} 
                                />
                            </div>
                            {
                                errors && errors.address && 
                                <Label style={{ color: 'red' }}>
                                    {errors.address.message}
                                </Label>
                            }
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
                            {
                                errors && errors.latitude && 
                                <Label style={{ color: 'red' }}>
                                    {errors.latitude.message}
                                </Label>
                            }
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
                            {
                                errors && errors.code && 
                                <Label style={{ color: 'red' }}>
                                    {errors.code.message}
                                </Label>
                            }
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
                            {
                                errors && errors.longitude && 
                                <Label style={{ color: 'red' }}>
                                    {errors.longitude.message}
                                </Label>
                            }
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
                            {
                                errors && errors.name && 
                                <Label style={{ color: 'red' }}>
                                    {errors.name.message}
                                </Label>
                            }
                        </FormGroup>
                        <FormGroup className="mt-1">
                            <Label for='nameAgen'>No. Telepon</Label>
                            <div id="workunit-list-telpon">
                                <Input 
                                    type         = 'text' 
                                    name         = "phone_number" 
                                    invalid      = {(errors.phone_number) ? true : false}
                                    innerRef     = {register()}
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
                            {
                                errors && errors.description && 
                                <Label style={{ color: 'red' }}>
                                    {errors.description.message}
                                </Label>
                            }
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
                                <Controller
                                    name    = "workunit_level_id"
                                    control = {control}
                                    as      = {
                                        <Select
                                            id              = "workunit_level_id"
                                            theme           = {selectThemeColors}
                                            options         = {workUnitLevelOptions}
                                            className       = 'react-select'
                                            placeholder     = "Pilih Tingkat"
                                            isClearable
                                            classNamePrefix = 'select'
                                        />
                                    }
                                />
                            </div>
                            {
                                errors && errors.workunit_level_id && 
                                <Label style={{ color: 'red' }}>
                                    {errors?.workunit_level_id?.label?.message}
                                </Label>
                            }
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
                            {
                                errors && errors.email && 
                                <Label style={{ color: 'red' }}>
                                    {errors.email.message}
                                </Label>
                            }
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