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
    FormFeedback,
} from "reactstrap";

import * as yup                             from 'yup';
import { useForm }                          from 'react-hook-form';
import { yupResolver }                      from '@hookform/resolvers/yup';

//Components
import IconSwitch                           from '../../../components/widgets/icon-switch/IconSwitch';
import CustomToast                          from "../../../components/widgets/custom-toast";
import SubmitButton                         from '../../../components/widgets/submit-button';

//API
import Helper                               from '../../../helpers';
import WorkUnitApi                          from "../../../services/pages/configuration/unit-work/index";
import selfLearningURL                      from '../../../services/pages/helpdesk/self-learning';

const ModalForm = (props) => {
    //Props
    const {
        data,
        onCancel,
        setListData,
        setModalForm
    } = props;

    //Helper
    const {useQuery}                        = Helper;

    //State
    const [loading, setLoading]             = useState(false);
    const [isAssisten, setAssisten]         = useState(false);
    const [parentOptions, setParentOptions] = useState([]);


    let query        = useQuery();

    const getOptions = (params) => {
        WorkUnitApi.get({
            onSuccess: (res) => {
                var datas = [];
                res.data.sector.map((data, i) => {
                    datas.push({ "key": i, "label": data.name, "value": data.id });
                })
                setParentOptions(datas);
            }, onFail: (err) => {
                CustomToast("danger", err.message);
            }, params
        })
    };

    const getData = () => {
        let params;
        if(query.get("mode") === 'tour'){
            params = {tutorial: true}
        }

        WorkUnitApi.get({
            params,
            onSuccess: (res) => {
                setListData(res.data.sector);
            }, onFail: (err) => {
                console.log(err);
            }
        })


    };

    useEffect(() => {
        getOptions()
    }, []);

    useEffect(() => {
        if (data.is_assisten == 1) {
            setAssisten(true);
        } else if (data.is_assisten == 0) {
            setAssisten(false);
        }
    }, []);

    const schema = yup.object().shape({
        name        : yup.string().min(3).required(),
        description : yup.string().required(),
        sequence    : yup.number().required(),
    }).required();

    const { register, errors, handleSubmit } = useForm({ mode: "onChange", resolver: yupResolver(schema) })

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

    const create = (dataForm, params) => {
        WorkUnitApi.create({
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
                console.log(err);
                // CustomToast("danger", err.message);
            }, params
        })

        const formData = {
            id       : parseInt(query.get("moduleId")),
            is_done  : true,
        }
        selfLearningURL.updateUserModul(formData)        
    };

    const update = (dataForm, params) => {
        WorkUnitApi.update({
            data : dataForm,
            id   : data.id,

            onSuccess: (res) => {
                setLoading(false);
                CustomToast("success", "Data Berhasil DiUbah");
                setListData(false);
                setModalForm(false);

                if(params == undefined){
                    getData({tutorial:true});
                }else{
                    getData();
                }
            },
            onFail: (err) => {
                CustomToast("danger", err.message);
            },
            params
        })

        const formData = {
            id       : parseInt(query.get("moduleId")),
            is_done  : true,
        }
        selfLearningURL.updateUserModul(formData)   
    };

    const chekedAsissten = () => {
        return (isAssisten) ? 1 : 0;
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
                            <Label> Induk</Label>
                            <div id="workunit-induk">
                                <CustomInput 
                                    id       = 'select-custom' 
                                    type     = 'select' 
                                    name     = 'parent_id' 
                                    value    = {data.parent_id} 
                                    innerRef = {register()}
                                >
                                <option value="">Pilih Induk</option>
                                    {
                                        parentOptions.map((data,i) => (
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
                        {errors && errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                    </Col>

                    <Col 
                        md = "6" 
                        sm = "12"
                    >
                        <Label >Asisten</Label>
                        <br/>
                        <div id="workunit-assistant">
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
                            className = "mt-2"
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
                        {errors && errors.sequence && <FormFeedback>{errors.sequence.message}</FormFeedback>}
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
                        {errors && errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
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