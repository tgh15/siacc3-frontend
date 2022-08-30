import { Fragment, useEffect, useState }    from 'react';
import Select                               from 'react-select';
import { useForm }                          from 'react-hook-form';
import { yupResolver }                      from '@hookform/resolvers/yup';
import { selectThemeColors }                from '@utils';
import SelectOptionsService                 from '@src/services/pages/select-options';

import {
    Row,
    Col,
    Form,
    Input,
    Label,
    Button,
    FormGroup,
    ModalFooter,
    CustomInput,
    FormFeedback,
} from "reactstrap";

//Helper
import Helper                               from '../../../helpers';

//URL API
import selfLearningURL                      from '../../../services/pages/helpdesk/self-learning';

import validation                           from './validation';
import PositionApi                          from '../../../services/pages/configuration/position';
import CustomToast                          from '../../../components/widgets/custom-toast';
import SubmitButton                         from '../../../components/widgets/submit-button';

const typeOptions = [
    { key: "1", value: 1, label: 'PELAKSANA' },
    { key: "2", value: 2, label: 'FUNGSIONAL' },
    { key: "3", value: 3, label: 'STRUKTURAL' },
];


const ModalForm = (props) => {
    const {
        data,
        onCancel,
        setListData,
        setModalForm,
    } = props;

    //State
    const [loading, setLoading]                             = useState(false);
    const [parentId, setParentId]                           = useState(null);
    const [sectorOptions, setSectorOptions]                 = useState(false);
    const [postionOptions, setpositionOptions]              = useState(false);
    const [workUnitLevelOptions, setworkUnitLevelOptions]   = useState(false);

    //Helper
    const {useQuery}                                        = Helper;

    let query                                               = useQuery();

    const {
        errors, 
        register, 
        handleSubmit 
    } = useForm({ mode: "onChange", resolver: yupResolver(validation) });

    const WorkUnitLevelOptions = () => {
        SelectOptionsService.workUnitLevel({
            onSuccess: (res) => {
                setworkUnitLevelOptions(res);
            }, onFail: (err) => {
                CustomToast("danger", err.message);
            }
        })
    };

    const PositionOptions = () => {
        SelectOptionsService.positionList({
            onSuccess: (res) => {
                console.log(res);
                setpositionOptions(res);
            }, onFail: (err) => {
                CustomToast("danger", err.message);
            }
        })
    };

    const SectorOptions = () => {
        SelectOptionsService.sector({
            onSuccess: (res) => {
                setSectorOptions(res);
            }, onFail: (err) => {
                CustomToast("danger", err.message);
            }
        })
    };

    useEffect(() => {
        WorkUnitLevelOptions();
    }, []);

    useEffect(() => {
        PositionOptions();
    }, []);

    useEffect(() => {
        SectorOptions();
    }, []);

    const getData = () => {
        let params;

        if(query.get("mode") === 'tour'){
            params = {tutorial: true}
        }

        PositionApi.get({
            params,
            onSuccess: (res) => {
                setListData(res.data.position);
            }, onFail: (err) => {
                console.log(err);
            }
        })
    };

    const create = (dataForm, params) => {
        PositionApi.create({
            data: dataForm,
            onSuccess: (res) => {
                setLoading(false);
                setModalForm(false);
                CustomToast("success", "Data Berhasil Disimpan");
                setListData(false);
                
                if(params == undefined){
                    getData({tutorial:true});
                }else{
                    getData();
                }
            },
            onFail: (err) => {
                if(err.data.message === 'data posisi sudah ada'){
                    CustomToast("danger", "Data posisi sudah digunakan");
                }else{
                    CustomToast("danger", err.data.message);
                }
            }, params
        })

        const formData = {
            id       : parseInt(query.get("moduleId")),
            is_done  : true,
        }
        selfLearningURL.updateUserModul(formData)   
    };

    const update = (dataForm, params) => {
        PositionApi.update({
            id: data.id,
            data: dataForm,

            onSuccess: (res) => {
                setLoading(false);
                setModalForm(false);
                CustomToast("success", "Data Berhasil Diubah");
                setListData(false);
                
                if(params == undefined){
                    getData({tutorial:true});
                }else{
                    getData();
                }
            },
            onFail: (err) => {
                CustomToast("danger", err.message);
            }, params
        })

        const formData = {
            id       : parseInt(query.get("moduleId")),
            is_done  : true,
        }
        selfLearningURL.updateUserModul(formData) 
    };

    const onSubmit = dataForm => {
        setLoading(true);

        if (!data) {
            if(query.get("mode") === "tour"){
                create(dataForm, {tutorial:true})
            }else{
                create(dataForm)
            }
        } else {
            if(query.get("mode") === "tour"){
                update(dataForm, {tutorial:true})
            }else{
                update(dataForm)
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
                                <Select
                                    theme           = {selectThemeColors}
                                    options         = {postionOptions}
                                    className       = 'react-select'
                                    isClearable
                                    placeholder     = "Pilih Induk Satuan Kerja"
                                    classNamePrefix = 'select'
                                />
                                <Input
                                    type            = "hidden" 
                                    name            = "parent_id" 
                                    invalid         = {(errors.parent_id) ? true : false} 
                                    innerRef        = {register()} 
                                    defaultValue    = {data ? data.parent_id : parentId}
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
                            <br />
                            <div id="position-name">
                                <Input
                                    name            = 'name'
                                    invalid         = {(errors.name) ? true : false}
                                    innerRef        = {register()}
                                    defaultValue    = {(data) ? data.name : null}
                                />
                            </div>
                            {errors && errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                        </FormGroup>
                    </Col>

                    <Col md="6" sm="12">
                        <FormGroup>
                            <Label for='id'>Tipe Jabatan</Label>
                            <div id="position-type">
                                <CustomInput 
                                    id          = 'select-custom' 
                                    type        = 'select' 
                                    name        = 'position_type' 
                                    value       = {data.position_type}
                                    invalid     = {(errors.position_type) ? true : false}
                                    innerRef    = {register()}  
                                >
                                    <option disabled selected value=""> Pilih Tipe Jabatan </option>
                                    {typeOptions.map((data, i) => (
                                        <option 
                                            key     = {data.key} 
                                            value   = {data.value}
                                        >
                                            {data.label}
                                        </option>
                                    ))}
                                </CustomInput>
                            </div>
                            {errors && errors.position_type && <FormFeedback>{errors.position_type.message}</FormFeedback>}
                        </FormGroup>
                        <FormGroup>
                            <Label for='id'>Satuan Kerja</Label>
                            <div id="position-workunit">
                                <CustomInput 
                                    id          = 'select-custom'
                                    type        = 'select' 
                                    name        = 'workunit_level_id' 
                                    value       = {data.workunit_level_id} 
                                    invalid     = {(errors.workunit_level_id) ? true : false}
                                    innerRef    = {register()} 
                                >
                                    <option disabled selected value=""> Pilih Satuan Kerja </option>
                                    {workUnitLevelOptions && workUnitLevelOptions.map((data, i) => (
                                        <option 
                                            key     = {data.key} 
                                            value   = {data.value}
                                        >
                                            {data.label}
                                        </option>
                                    ))}
                                </CustomInput>
                            </div>
                            {errors && errors.workunit_level_id && <FormFeedback>{errors.workunit_level_id.message}</FormFeedback>}
                        </FormGroup>
                        <FormGroup>
                            <Label for='id'>Unit Kerja</Label>
                            <div id="position-units">
                                <CustomInput 
                                    id          = 'select-custom' 
                                    type        = 'select' 
                                    name        = 'sector_id' 
                                    value       = {data.sector_id} 
                                    invalid     = {(errors.sector_id) ? true : false}
                                    innerRef    = {register()} 
                                >
                                    <option disabled selected value=""> Pilh Unit Kerja </option>
                                    {sectorOptions && sectorOptions.map((data, i) => (
                                        <option 
                                            key     = {data.key} 
                                            value   = {data.value}
                                        >
                                            {data.label}
                                        </option>
                                    ))}
                                </CustomInput>
                            </div>
                            {errors && errors.sector_id && <FormFeedback>{errors.sector_id.message}</FormFeedback>}
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
                            {errors && errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
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