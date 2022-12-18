import { Fragment, useEffect, useState }    from 'react';
import Select                               from 'react-select';
import { yupResolver }                      from '@hookform/resolvers/yup';
import { Controller, useForm }              from 'react-hook-form';
import { selectThemeColors }                from '@utils';

import {
    Row,
    Col,
    Form,
    Input,
    Label,
    Button,
    FormGroup,
    ModalFooter
} from "reactstrap";

//Helper
import Helper                               from '../../../helpers';

//URL API
import positionAPI                          from '../../../services/pages/configuration/position/index';
import selfLearningURL                      from '../../../services/pages/helpdesk/self-learning';

//Components
import validation                           from './validation';
import CustomToast                          from '../../../components/widgets/custom-toast';
import SubmitButton                         from '../../../components/widgets/submit-button';

const typeOptions = [
    { value: 1, label: 'PELAKSANA' },
    { value: 2, label: 'FUNGSIONAL' },
    { value: 3, label: 'STRUKTURAL' },
];


const ModalForm = (props) => {
    const {
        data,
        getData,
        onCancel,
        setListData,
        setModalForm,
        sectorOptions,
        postionOptions,
        workUnitLevelOptions,
    } = props;

    //State
    const [loading, setLoading] = useState(false);

    //Helper
    const {useQuery}            = Helper;

    let query                   = useQuery();

    const {
        errors, 
        control,
        setValue,
        register, 
        handleSubmit 
    } = useForm({ mode: "onChange", resolver: yupResolver(validation) });

    useEffect(() => {
        if(data){
            setValue('parent_id',         data.parent_id ? {value: data.parent_id, label: data.parent} : null)
            setValue('sector_id',         data.sector_id ? {value: data.sector_id, label: data.sector} : null)
            setValue('position_type',     data.position_type ? {value: data.position_type, label: data.type_name} : null)
            setValue('workunit_level_id', data.workunit_level_id ? {value: data.workunit_level_id, label: data.workunit_level} : null)
        }
    }, []);

    //Create
    const create = (dataForm, params) => {
        const formData = {
            name                : dataForm.name,
            sector_id           : parseInt(dataForm.sector_id.value),
            parent_id           : parseInt(dataForm.parent_id.value),
            description         : dataForm.description,
            position_type       : parseInt(dataForm.position_type.value),
            workunit_level_id   : parseInt(dataForm.workunit_level_id.value),
        };

        positionAPI.createPosition(formData, params).then(
            res => {
                if (!res.is_error) {
                    setLoading(false);
                    setModalForm(false);
                    CustomToast("success", "Data Berhasil Disimpan");
                    setListData(false);
                    
                    if(query.get("mode") === "tour"){
                        getData({tutorial:true});
                    }else{
                        getData();
                    }
                }else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                if (err.message === "data posisi sudah ada") {
                    CustomToast("danger", "Data posisi sudah digunakan");
                }else {
                    CustomToast("danger", err.message);
                }
            }
        )
        
        //tour
        const tourFormData = {
            id       : parseInt(query.get("moduleId")),
            is_done  : true,
        }
        selfLearningURL.updateUserModul(tourFormData); 
    };

    //Update
    const update = (dataForm, params) => {
        const formData = {
            ...dataForm,
            id                  : data.id,
            name                : dataForm.name,
            sector_id           : parseInt(dataForm.sector_id.value),
            parent_id           : parseInt(dataForm.parent_id.value),
            description         : dataForm.description,
            position_type       : parseInt(dataForm.position_type.value),
            workunit_level_id   : parseInt(dataForm.workunit_level_id.value),
        };

        positionAPI.updatePosition(formData, params).then(
            res => {
                if (!res.is_error) {
                    setLoading(false);
                    setModalForm(false);
                    CustomToast("success", "Data Berhasil Diubah");
                    setListData(false);
                    
                    if(query.get("mode") === "tour"){
                        getData({tutorial:true});
                    }else {
                        getData();
                    }
                }else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
        
        //tour
        const tourFormData = {
            id       : parseInt(query.get("moduleId")),
            is_done  : true,
        }
        selfLearningURL.updateUserModul(tourFormData);
    };
    
    const onSubmit = dataForm => {
        setLoading(true);

        if (!data) {
            if(query.get("mode") === "tour"){
                create(dataForm, {tutorial:true});
            }else {
                create(dataForm);
            }
        }else {
            if(query.get("mode") === "tour"){
                update(dataForm, {tutorial:true});
            }else {
                update(dataForm);
            }
        }
    };

    return (
        <Fragment>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col 
                        md = "6" 
                        sm = "12"
                    >
                        <FormGroup>
                            <Label for='id'>Induk</Label>
                            <div id="position-parent">
                                <Controller
                                    name    = "parent_id"
                                    control = {control}
                                    as      = {
                                        <Select
                                            id              = "parent_id"
                                            theme           = {selectThemeColors}
                                            options         = {postionOptions}
                                            className       = 'react-select'
                                            placeholder     = "Pilih Induk Satuan Kerja"
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
                            <Label for='name'>Nama</Label>
                            <br/>
                            <div id="position-name">
                                <Input
                                    name            = 'name'
                                    invalid         = {(errors.name) ? true : false}
                                    innerRef        = {register()}
                                    defaultValue    = {(data) ? data.name : null}
                                />
                            </div>
                            {
                                errors && errors.name && 
                                <Label style={{ color: 'red' }}>
                                    {errors.name.message}
                                </Label>
                            }
                        </FormGroup>
                    </Col>
                    <Col 
                        md = "6" 
                        sm = "12"
                    >
                        <FormGroup>
                            <Label for='id'>Tipe Jabatan</Label>
                            <div id="position-type">
                                <Controller
                                    name    = "position_type"
                                    control = {control}
                                    as      = {
                                        <Select
                                            id              = "position_type"
                                            theme           = {selectThemeColors}
                                            options         = {typeOptions}
                                            className       = 'react-select'
                                            placeholder     = "Pilih Satuan Kerja"
                                            isClearable
                                            classNamePrefix = 'select'
                                        />
                                    }
                                />
                            </div>
                            {
                                errors && errors.position_type && 
                                <Label style={{ color: 'red' }}>
                                    {errors?.position_type?.label?.message}
                                </Label>
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label for='id'>Satuan Kerja</Label>
                            <div id="position-workunit">
                                <Controller
                                    name    = "workunit_level_id"
                                    control = {control}
                                    as      = {
                                        <Select
                                            id              = "workunit_level_id"
                                            theme           = {selectThemeColors}
                                            options         = {workUnitLevelOptions}
                                            className       = 'react-select'
                                            placeholder     = "Pilih Satuan Kerja"
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
                        <FormGroup>
                            <Label for='id'>Unit Kerja</Label>
                            <div id="position-units">
                                <Controller
                                    name    = "sector_id"
                                    control = {control}
                                    as      = {
                                        <Select
                                            id              = "sector_id"
                                            theme           = {selectThemeColors}
                                            options         = {sectorOptions}
                                            className       = 'react-select'
                                            placeholder     = "Pilih Unit Kerja"
                                            isClearable
                                            classNamePrefix = 'select'
                                        />
                                    }
                                />
                            </div>
                            {
                                errors && errors.sector_id && 
                                <Label style={{ color: 'red' }}>
                                    {errors?.sector_id?.label?.message}
                                </Label>
                            }
                        </FormGroup>
                    </Col>
                    <Col 
                        md = "6" 
                        sm = "12"
                    >
                        <FormGroup>
                            <Label for='id'>Deskripsi</Label>
                            <div id="position-description">
                                <Input
                                    rows            = '4'
                                    type            = 'textarea'
                                    name            = 'description'
                                    invalid         = {(errors.description) ? true : false}
                                    innerRef        = {register({ required: true })}
                                    defaultValue    = {(data) ? data.description : null}
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

                <ModalFooter className="d-flex justify-content-between px-0">
                    <div id="position-batal">
                        <Button 
                            color   = 'primary' 
                            outline 
                            onClick = {onCancel}
                        >
                            Batal
                        </Button>
                    </div>
                    <div id="position-submit">
                        <SubmitButton 
                            size        = "sm" 
                            isLoading   = {loading}
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