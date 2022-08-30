import React, { 
    Fragment,
    useState,
    useEffect
} from 'react';

import { 
    Row, 
    Col, 
    Form, 
    Modal, 
    Input, 
    Label, 
    Button, 
    ModalBody, 
    FormGroup, 
    ModalHeader, 
    ModalFooter, 
    CustomInput,
} from 'reactstrap';

//Css
import '@styles/react/libs/flatpickr/flatpickr.scss';

import moment           from 'moment';
import Flatpickr        from 'react-flatpickr';
import { useForm }      from 'react-hook-form';

//Icon
import { Plus }         from 'react-feather';

//Component
import CustomToast      from '../../../components/widgets/custom-toast';
import SubmitButton     from '../../../components/widgets/submit-button';

//API URL
import { ReportAPI }    from '../../../services/pages/helpdesk/report';


const CreateReport = (props) => {
    //Props
    const { getData, setListData } = props;

    //State
    const [period, setPeriod]                 = useState(null);
    const [reportKind, setReportKind]         = useState(false);
    const [modalReport, setModalReport]       = useState(false);
    const [avaiableRepeat, setAvaiableRepeat] = useState(false);

    const { 
        errors, 
        register,
        handleSubmit 
    } = useForm({ mode: "onChange" });

    useEffect(() => {
        getAllReportKind();
    }, []);

    //Get all report kind
    const getAllReportKind = () => {
        ReportAPI.getReportKind().then(
            res => {
                if (res.status === 200 && res.data != null) {
                    setReportKind(res.data);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //Create
    const handleCreate = (dataForm) => {

        const formData = new FormData();

        formData.append("title", dataForm.title);
        formData.append("status", dataForm.status);
        formData.append("repeat", dataForm.repeat);
        formData.append("is_repeat", dataForm.is_repeat);
        formData.append("report_kind_id", parseInt(dataForm.report_kind_id));
        formData.append("from", moment(period[0]).format('YYYY-MM-DD'));
        formData.append("to", moment(period[1]).format('YYYY-MM-DD'));

        ReportAPI.createReport(formData).then(
            res => {
                if (res.status === 200) {
                    setListData(false);
                    setModalReport(false);

                    //Success Message
                    CustomToast("success", "Data Berhasil Disimpan");

                    //Refresh Page
                    getData();
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    const onSubmit = dataForm => {
        handleCreate(dataForm);
    };

    return (
        <Fragment>
            <Button 
                size    = "sm"
                color   = 'primary' 
                onClick = {() => setModalReport(!modalReport)}
            >
                <Plus/> Buat Laporan
            </Button>
            <Modal 
                size    = "lg"
                isOpen  = {modalReport} 
                toggle  = {() => setModalReport(!modalReport)}
            >
                <ModalHeader toggle={() => setModalReport(!modalReport)}>
                    Buat Laporan Helpdesk
                </ModalHeader>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label>Judul Laporan</Label>
                                    <Input
                                        name     = "title"
                                        innerRef = {register()}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Status Laporan</Label>
                                    <div 
                                        style       = {{ borderRadius: '5px' }}
                                        className   = "border p-1" 
                                    >
                                        <CustomInput
                                            id          = 'all_'
                                            type        = 'radio'
                                            name        = 'status'
                                            label       = 'Semua'
                                            value       = "all"
                                            innerRef    = {register()}
                                            className   = "mb-1"
                                        />
                                        <CustomInput
                                            id          = 'done_'
                                            type        = 'radio'
                                            name        = 'status'
                                            label       = 'Selesai'
                                            value       = "done"
                                            innerRef    = {register()}
                                            className   = "mb-1"
                                        />
                                        <CustomInput
                                            id          = 'process_'
                                            type        = 'radio'
                                            name        = 'status'
                                            value       = "queue"
                                            label       = 'Proses'
                                            innerRef    = {register()}
                                        />
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col md="6">
                                            <div 
                                                style       = {{ borderRadius: '5px' }}
                                                className   = "border p-1" 
                                            >
                                                <CustomInput
                                                    id       = 'exampleCustomRadio1'
                                                    type     = 'radio'
                                                    name     = 'is_repeat'
                                                    label    = 'Sekali'
                                                    value    = {false}
                                                    innerRef = {register()}
                                                    onChange = {() => setAvaiableRepeat(false)} 
                                                />
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div 
                                                style       = {{ borderRadius: '5px' }}
                                                className   = "border p-1" 
                                            >
                                                <CustomInput
                                                    id       = 'exampleCustomRadio2'
                                                    type     = 'radio'
                                                    name     = 'is_repeat'
                                                    label    = 'Berulang'
                                                    value    = {true}
                                                    innerRef = {register()}
                                                    onChange = {() => setAvaiableRepeat(true)} 
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Label>Jenis Laporan</Label>
                                    <div 
                                        style       = {{ borderRadius: '5px' }}
                                        className   = "border p-1" 
                                    >
                                        {
                                            reportKind && reportKind.map((data) => (
                                                <CustomInput
                                                    id          = {data.id}
                                                    type        = 'radio'
                                                    name        = 'report_kind_id'
                                                    label       = {data.name}
                                                    value       = {data.id}
                                                    innerRef    = {register()}
                                                    className   = "mb-1"
                                                />
                                            ))
                                        }
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for='range-picker'>Waktu Laporan</Label>

                                    <Flatpickr
                                        id        = 'range-picker'
                                        name      = 'period'
                                        value     = {period}
                                        onChange  = {date => {
                                            setPeriod(date);
                                        }}
                                        options   = {{
                                            mode        : 'range',
                                            defaultDate : [new Date(), new Date()],
                                        }}
                                        className = 'form-control'
                                        />
                                </FormGroup>
                            </Col>
                        </Row>
                        {
                            avaiableRepeat === true ?
                                <Row className="mb-2">
                                    <Col md="3"></Col>
                                    <Col md="3">
                                        <div 
                                            style       = {{ borderRadius: '5px' }}
                                            className   = "border p-1" 
                                        >
                                            <CustomInput
                                                id       = 'exampleCustomRadio3'
                                                type     = 'radio'
                                                name     = 'repeat'
                                                label    = 'Harian'
                                                value    = "daily"
                                                innerRef = {register()}
                                            />
                                        </div>
                                    </Col>
                                    <Col md="3">
                                        <div 
                                            style       = {{ borderRadius: '5px' }}
                                            className   = "border p-1" 
                                        >
                                            <CustomInput
                                                id       = 'exampleCustomRadio4'
                                                type     = 'radio'
                                                name     = 'repeat'
                                                label    = 'Mingguan'
                                                value    = "weekly"
                                                innerRef = {register()}
                                            />
                                        </div>
                                    </Col>
                                    <Col md="3">
                                        <div 
                                            style       = {{ borderRadius: '5px' }}
                                            className   = "border p-1" 
                                        >
                                            <CustomInput
                                                id       = 'exampleCustomRadio5'
                                                type     = 'radio'
                                                name     = 'repeat'
                                                label    = 'Bulanan'
                                                value    = "monthly"
                                                innerRef = {register()}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            : null
                        }
                        
                        <div 
                            style     = {{ borderRadius: '7px' }}
                            className = "border p-1 text-center" 
                        >
                            <Row>
                                <Col md="3">
                                    Judul Laporan
                                </Col>
                                <Col md="3">
                                    Jenis Laporan
                                </Col>
                                <Col md="3">
                                    Status Laporan
                                </Col>
                                <Col md="3">
                                    Waktu
                                </Col>
                            </Row>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <SubmitButton 
                            size        = "sm" 
                            color       = "primary" 
                        >
                            Buat Laporan
                        </SubmitButton>
                    </ModalFooter>
                </Form>
            </Modal>
        </Fragment>
    );
};

export default CreateReport;