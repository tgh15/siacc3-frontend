import { Fragment, useEffect, useState }    from 'react';
import {
    Row,
    Col,
    Form,
    Label,
    Input,
    Button,
    FormGroup,
    ModalFooter,
    CustomInput,
} from "reactstrap";

import Select                               from 'react-select';
import * as yup                             from 'yup';
import { yupResolver }                      from '@hookform/resolvers/yup';
import { selectThemeColors }                from '@utils';
import { Controller, useForm }              from 'react-hook-form';

//Components
import IconSwitch                           from '../../../components/widgets/icon-switch/IconSwitch';
import CustomToast                          from "../../../components/widgets/custom-toast";
import SubmitButton                         from '../../../components/widgets/submit-button';

//Helper
import Helper                               from '../../../helpers';

//API
import sectorAPI                            from '../../../services/pages/configuration/unit-work';
import selfLearningURL                      from '../../../services/pages/helpdesk/self-learning';


const ModalForm = (props) => {
    //Props
    const {
        data,
        getData,
        onCancel,
        setListData,
        setModalForm
    } = props;

    //Helper
    const {useQuery}                        = Helper;

    //Query
    let query                               = useQuery();

    //State
    const [loading, setLoading]             = useState(false);
    const [isAssisten, setAssisten]         = useState(false);
    const [parentOptions, setParentOptions] = useState([]);

    //Schema
    const schema = yup.object().shape({
        name        : yup.string().min(3, 'Kolom nama belum terisi').required(),
        description : yup.string().required('Kolom deskripsi belum terisi'),
        sequence    : yup.number().typeError('Hanya bisa memasukkan angka').integer().required('Kolom urutan belum terisi'),
    }).required();

    const { 
        errors, 
        control,
        setValue,
        register, 
        handleSubmit 
    } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

    useEffect(() => {
        getOptions();

        if(data){
            data.parent_id ? 
                setValue('parent_id', {value: data.parent_id, label: data.parent}) 
            : undefined
        }
    }, []);

    useEffect(() => {
        if (data.is_assisten == 1) {
            setAssisten(true);
        } else if (data.is_assisten == 0) {
            setAssisten(false);
        }
    }, []);

    //Select induk
    const getOptions = (params) => {
        sectorAPI.getAllSector(params).then(
            res => {
                if (!res.is_error) {
                    let newData = [];

                    res.data.sector.map((data) => (
                        newData.push({
                            value : data.id,
                            label : data.name
                        })
                    ))

                    setParentOptions(newData);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };
    
    //Create
    const create = (dataForm, params) => {
        const formData = {
            name              : dataForm.name,
            description       : dataForm.description,
            sequence          : parseInt(dataForm.sequence),
            is_assisten       : isAssisten ? 1 : 0,
            parent_id         : parseInt(dataForm.parent_id.value)
        };

        sectorAPI.createSector(formData, params).then(
            res => {
                if (!res.is_error) {
                    setLoading(false);
                    setListData(false);
                    setModalForm(false);
                    CustomToast("success", "Data Berhasil Disimpan");
                    
                    if(query.get("mode") === "tour") {
                        getData({tutorial:true});
                    }else {
                        getData();
                    }
                }else {
                    CustomToast("denger", res.message);
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

    //Update
    const update = (dataForm, params) => {
        const formData = {
            id                : parseInt(dataForm.id),
            name              : dataForm.name,
            description       : dataForm.description,
            sequence          : parseInt(dataForm.sequence),
            is_assisten       : isAssisten ? 1 : 0,
            parent_id         : parseInt(dataForm.parent_id.value)
        };

        sectorAPI.updateSector(formData, params).then(
            res => {
                if (!res.is_error) {
                    setLoading(false);
                    setListData(false);
                    setModalForm(false);
                    CustomToast("success", "Data Berhasil DiUbah");

                    if(query.get("mode") === "tour"){
                        getData({tutorial:true});
                    }else{
                        getData();
                    }
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
    }

    const onSubmit = (dataForm) => {
        setLoading(true);

        if (!data) {
            if(query.get("mode") === "tour"){
                create(dataForm, {tutorial:true});
            }else{
                create(dataForm);
            }
        } else {
            if(query.get("mode") === "tour"){
                update(dataForm, {tutorial:true});
            }else{
                update(dataForm);
            }
        }
    };

    const chekedAsissten = () => {
        return (isAssisten) ? 1 : 0;
    };

    return (
        <Fragment>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className='mb-1'>
                    {data &&  
                        <Input 
                            name         = "id" 
                            type         = "hidden" 
                            innerRef     = {register({ required: true })} 
                            defaultValue = {data.id} 
                        />
                    }
                    <Col 
                        md = "6" 
                        sm = "12"
                    >
                        <FormGroup>
                            <Label> Induk</Label>
                            <div id="workunit-induk">
                                <Controller
                                    name    = "parent_id"
                                    control = {control}
                                    as      = {
                                        <Select
                                            id              = "parent_id"
                                            theme           = {selectThemeColors}
                                            options         = {parentOptions}
                                            className       = 'react-select'
                                            placeholder     = "Pilih Induk"
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
                        <Label for='name'>Nama</Label>
                        <div id="workunit-name">
                            <Input
                                type         = 'text'
                                name         = "name"
                                invalid      = {(errors.name) ? true : false}
                                innerRef     = {register()}
                                defaultValue = {(data) ? data.name : ""}
                            />
                        </div>
                        {
                            errors && errors.name && 
                            <Label style={{ color: 'red' }}>
                                {errors.name.message}
                            </Label>
                        }
                    </Col>
                    <Col 
                        md = "6" 
                        sm = "12"
                    >
                        <Label >Asisten</Label>
                        <div 
                            id    = "workunit-assistant" 
                            style = {{ position: 'fixed' }}
                        >
                            <CustomInput
                                id       = 'icon-primary'
                                type     = 'switch'
                                label    = {<IconSwitch />}
                                inline
                                checked  = {isAssisten}
                                onChange = {() => { setAssisten(!isAssisten) }}
                            />

                            <Input 
                                type         = "hidden" 
                                name         = "is_assisten" 
                                innerRef     = {register()} 
                                defaultValue = {data.is_assisten ?? chekedAsissten()} 
                            />
                        </div>
                        <br/>

                        <Label 
                            for       = 'name' 
                            className = "mt-3"
                        >
                            Urutan
                        </Label>
                        <div id="workunit-order">
                            <Input
                                type         = 'text'
                                name         = "sequence"
                                invalid      = {(errors.sequence) ? true : false}
                                innerRef     = {register()}
                                defaultValue = {data ? data.sequence : ""}
                            />
                        </div>
                        {
                            errors && errors.sequence && 
                            <Label style={{ color: 'red' }}>
                                {errors.sequence.message}
                            </Label>
                        }
                    </Col>
                    <Col 
                        md = "6" 
                        sm = "12"
                    >
                        <Label>Deskripsi</Label>
                        <div id="workunit-description">
                            <Input
                                type         = 'textarea'
                                name         = 'description'
                                rows         = '4'
                                invalid      = {(errors.description) ? true : false}
                                innerRef     = {register()}
                                defaultValue = {(data) ? data.description : ""}
                            />
                        </div>
                        {
                            errors && errors.description && 
                            <Label style={{ color: 'red' }}>
                                {errors.description.message}
                            </Label>
                        }
                    </Col>
                </Row>

                <ModalFooter className="d-flex justify-content-between px-0">
                    <div id="workunit-batal">
                        <Button 
                            color   = 'primary' 
                            outline 
                            onClick = {onCancel}
                        >
                            Batal
                        </Button>
                    </div>
                    <div id="workunit-submit">
                        <SubmitButton 
                            size      = "sm" 
                            color     = "primary" 
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