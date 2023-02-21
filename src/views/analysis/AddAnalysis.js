
import Select from 'react-select'
import { selectThemeColors } from '@utils'

import {

    Label,
    FormGroup,
    Row,
    Col,
    Input,
    ModalFooter,
    Button,
    Form,
} from "reactstrap"
import { ModalBase } from '../../components/widgets/modals-base'
import Flatpickr                                from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'


import { yupResolver }          from '@hookform/resolvers/yup';
import { useForm, Controller }  from 'react-hook-form';
import moment                   from 'moment'
import {schema}                 from "./validation"
import crawlingAPI from '../../services/pages/analysis'
import CustomToast from '../../components/widgets/custom-toast'

const AddAnalysis = (props) => {

    const {
        getResultAll,
        isAddAnalysisVisible,
        setIsAddAnalysisVisible
    }                               = props;

    const { 
        errors, 
        control, 
        register, 
        handleSubmit, 
    } = useForm({ mode: "onChange", resolver: yupResolver(schema)});

    const analysisTypeOptions = [
        { value: 'media',       label: 'Analisis Berdasarkan Media' },
        { value: 'location',    label: 'Analisis Berdasarkan Lokasi' },
        { value: 'prediction',  label: 'Analisis Berdasarkan Prediksi' },
        { value: 'clustering',    label: 'Analisis Berdasarkan Estimasi' },
        { value: 'asosiasi',    label: 'Analisis Berdasarkan Klasifikasi' },
    ]

    const createQuery = (data) => {

        const formData = {
            by          : data.by.value,
            to          : moment(data.to[0]).format('YYYY-MM-DD'),    
            form        : moment(data.from[0]).format('YYYY-MM-DD'),
            size        : 1000,
            keyword     : data.keyword,
            location    : data.location
        };

        crawlingAPI.createQuery(formData).then(
            res => {
                if(res.status === 200){
                    createResult(res.data.id, data);
                }
            },
            err => {
                CustomToast('danger', 'Terjadi Kesalahan.');
                console.log('create query crawling', err);
            }
        )
    }

    const createResult = (id, data) => {
        const formData = {
            query_id    : id,
            name        : data.title,
            kind        : "analysis"
        }

        crawlingAPI.createResult(formData).then(
            res => {
                if(res.status === 200){
                    CustomToast('success', 'Data analisis berhasil disimpan.');

                    getResultAll();
                    setIsAddAnalysisVisible(false);
                }
            },
            err => {
                error_handler('create result analysis', err);
            }
        )
    }

    return (

        <div className='vertically-centered-modal modal-sm'>
            <ModalBase
                show        = {isAddAnalysisVisible}
                size        = "lg"
                title       = "Tambah Data Analysis"
                setShow     = {(par) => setIsAddAnalysisVisible(par)}
            >
                {console.log(errors)}
                <Form onSubmit = {handleSubmit(createQuery)}>
                    <Row>
                        <Col md="6" sm="12">
                            <FormGroup>
                                <Label for='title'>Judul Analisis</Label>
                                <Input 
                                    name        = 'title'
                                    innerRef    = {register()}
                                />
                                {
                                    errors && errors.title &&
                                    <Label style={{ color: 'red' }}>
                                        {errors.title.message}
                                    </Label>
                                }
                            </FormGroup>
                        </Col>
                        <Col md="6" sm="12">
                            <FormGroup>
                                <Label for='by'>Jenis Analisis</Label>
                                <br />
                                <Controller
                                    name    = "by"
                                    control = {control}
                                    as      = {
                                        <Select
                                            name            = 'by'
                                            theme           = {selectThemeColors}
                                            options         = {analysisTypeOptions}
                                            className       = 'react-select'
                                            isClearable
                                            placeholder     = "Pilih Jenis Analisis"
                                            classNamePrefix = 'select'
                                        />
                                    }
                                    tabIndex     = {2}
                                />
                                {
                                    errors && errors.kind && 
                                    <Label style={{ color: 'red' }}>
                                        {errors?.kind?.label?.message}
                                    </Label>
                                }
                            </FormGroup>
                        </Col>

                        <Col md="6" sm="12">
                            <FormGroup>
                                <Label for='keyword'>Topik Analisis</Label>
                                <Input 
                                    name        = 'keyword'
                                    innerRef    = {register()}
                                />
                                {
                                    errors && errors.keyword &&
                                    <Label style={{ color: 'red' }}>
                                        {errors.keyword.message}
                                    </Label>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label for='location'>Tempat</Label>
                                <Input 
                                    name        = 'location' 
                                    innerRef    = {register()}
                                />
                                <Label>Untuk pemisah tempat silahkan tanda ,</Label>
                                {
                                    errors && errors.location &&
                                    <Label style={{ color: 'red' }}>
                                        {errors.location.message}
                                    </Label>
                                }
                            </FormGroup>
                        </Col>
                        <Col md="6" sm="12">
                            <Row>
                                <FormGroup className="col-md-6">
                                    <Label for='id'>Tanggal Mulai</Label>
                                    <Controller
                                        name    = "from"
                                        control = {control}
                                        as      = {
                                            <Flatpickr 
                                                id          = 'from' 
                                                options     = {{ dateFormat: "d-m-Y"}}
                                                className   = 'form-control' 
                                                placeholder = {moment().format('DD-MM-YYYY')}
                                            />
                                        }
                                    />
                                    {
                                    errors && errors.from &&
                                    <Label style={{ color: 'red' }}>
                                        {errors.from.message}
                                    </Label>
                                }
                                </FormGroup>
                                <FormGroup className="col-md-6">
                                    <Label for='id'>Tanggal Selesai</Label>
                                    <Controller
                                        name    = "to"
                                        control = {control}
                                        as      = {
                                            <Flatpickr 
                                                id          = 'to' 
                                                options     = {{ dateFormat: "d-m-Y"}}
                                                className   = 'form-control' 
                                                placeholder = {moment().format('DD-MM-YYYY')}
                                            />
                                        }
                                    />
                                    {
                                        errors && errors.to &&
                                        <Label style={{ color: 'red' }}>
                                            {errors.to.message}
                                        </Label>
                                    }
                                </FormGroup>
                            </Row>
                        </Col>
                    </Row>
                    <ModalFooter className="d-flex justify-content-between px-0 mb-0">
                        <div id="batal-input">
                            <Button 
                                type    = "button" 
                                color   = 'primary' 
                                outline 
                            >
                                Batal
                            </Button>
                        </div>
                        <div id="submit-input">
                            <Button
                                type        = "submit"
                                color       = "primary" 
                            >
                                Simpan
                            </Button>
                        </div>
                    </ModalFooter>
                </Form>

            </ModalBase>
        </div>
    );
}

export default AddAnalysis
