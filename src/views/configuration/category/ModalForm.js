import { Fragment, useState }       from 'react';
import * as yup                     from 'yup';
import { useForm }                  from 'react-hook-form';
import { yupResolver }              from '@hookform/resolvers/yup';

import {
    Col,
    Row,
    Form,
    Label,
    Input,
    Button,
    FormGroup,
    ModalFooter,
    FormFeedback,
}                                   from "reactstrap";

//Helper
import Helper                       from '../../../helpers';

//API
import selfLearningURL              from '../../../services/pages/helpdesk/self-learning';
import { feedsCategoryAPI }         from '../../../services/pages/feeds/categories';

//Widget
import CustomToast                  from '../../../components/widgets/custom-toast';
import SubmitButton                 from '../../../components/widgets/submit-button';


const ModalForm = (props) => {
    //Props
    const {
        data,
        onCancel,
        setListData,
        setModalForm
    } = props;

    //State
    const [loading, setLoading] = useState(false);

    //Helper
    const {useQuery}            = Helper;
    let query                   = useQuery();

    const schema = yup.object().shape({
        name: yup.string().min(3).required(),
    }).required();
    
    const { 
        errors, 
        register, 
        handleSubmit 
    } = useForm({ mode: "onChange", resolver: yupResolver(schema) });


    const getData = () => {
        let params; 
        
        if(query.get("mode") === 'tour'){
            params = {tutorial: true}
        }

        feedsCategoryAPI.getCategory(1, undefined, params).then(
            res => {
                setListData(res.data.category);
            }
        ).catch(
            err => {
                console.log(err);
                CustomToast("danger", "Oops.");
            }
        )
    };

    const create = (dataForm, params) => {
        const formData = {
            name : dataForm.name
        };

        feedsCategoryAPI.createCategory(formData, params).then(
            res => {
                if(res.status === 201){
                    setLoading(false);
                    setListData(false);
                    setModalForm(false);
                    CustomToast("success", "Data Berhasil Disimpan");
                    
                    if(params == undefined){
                        getData({tutorial:true});
                    }else{
                        getData();
                    }    
                }
            }
        ).catch(
            err => {
                setLoading(false);
                CustomToast("danger", "Oops.");
            }
        )

        const formDatas = {
            id       : parseInt(query.get("moduleId")),
            is_done  : true,
        }
        selfLearningURL.updateUserModul(formDatas);
    };

    const update = (dataForm, params) => {
        const formData = {
            id      : parseInt(dataForm.id),
            name    : dataForm.name
        }

        feedsCategoryAPI.updateCategory(formData, params).then(
            res => {
                setLoading(false);
                setListData(false);
                setModalForm(false);
                CustomToast("success", "Data Berhasil Diubah");

                if(params == undefined){
                    getData({tutorial:true});
                }else{
                    getData();
                }
            }
        ).catch(
            err => {
                console.log(err);
                setLoading(false);
                CustomToast("danger", "Oops.");
            }
        )

        const formDatas = {
            id       : parseInt(query.get("moduleId")),
            is_done  : true,
        }
        selfLearningURL.updateUserModul(formDatas)  
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
                        md = "12" 
                        sm = "12"
                    >
                        <FormGroup>
                            <Label for='name'>Kategori</Label>
                            <div id="input-category">
                                <Input
                                    name            = "name"
                                    invalid         = {(errors.name) ? true : false}
                                    innerRef        = {register({ required: true })}
                                    autoFocus
                                    defaultValue    = {(data) ? data.name : null}
                                />
                            </div>
                            {data &&  <Input name="id" type="hidden" innerRef={register({ required: true })} defaultValue={data.id} /> }
                            {errors && errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                        </FormGroup>
                    </Col>
                </Row>

                <ModalFooter className="d-flex justify-content-between px-0 mb-0">
                    <div id="batal-input">
                        <Button 
                            type    = "button" 
                            color   = 'primary' 
                            outline 
                            onClick = {onCancel}
                        >
                            Batal
                        </Button>
                    </div>
                    <div id="submit-input">
                        <SubmitButton 
                            size        = "sm" 
                            color       = "primary" 
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