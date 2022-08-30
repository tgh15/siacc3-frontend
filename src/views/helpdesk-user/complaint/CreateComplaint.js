import React, { 
    useRef, 
    Fragment, 
    useState, 
    useEffect, 
} from 'react';

import { 
    Col, 
    Row, 
    Card, 
    Form, 
    Label,
    Input, 
    Button,
    CardBody, 
    FormGroup,
    FormFeedback
} from 'reactstrap';

import Select                   from 'react-select';
import { selectThemeColors }    from '@utils';
import { Controller, useForm }  from "react-hook-form";

//Css
import '../style.scss';

//Icon
import Ticket                   from '@src/assets/icons/ticket.svg';
import { 
    X, 
    File, 
    Image, 
    ArrowLeftCircle, 
} from 'react-feather';

//Utils
import Helper                   from '../../../helpers';

//API Url
import { ReportAPI }            from '../../../services/pages/helpdesk/report';
import { HelpdeskTicketApi }    from '../../../services/pages/helpdesk/ticket';

//Components
import CustomToast              from '../../../components/widgets/custom-toast';
import SubmitButton             from '../../../components/widgets/submit-button';
import { ModalBase }            from '../../../components/widgets/modals-base';


const CreateComplaint = () => {
    // Helper
    let { getCookieName }                 = Helper
    
    // Ref
    const refPic                          = useRef(null);
    const refFile                         = useRef(null);
    
    // State
    const [listFiles, setListFiles]       = useState([]);
    const [reportKind, setReportKind]     = useState(false);
    const [ticketNumber, setTicketNumber] = useState(null);
    const [successModal, setSuccessModal] = useState(false);

    const { 
        errors,
        control,
        register,
        handleSubmit 
    } = useForm({ mode: "onChange" })

    useEffect(() => {
        getReportKind();
    }, []);

    //Get report kind
    const getReportKind = () => {
        ReportAPI.getReportKind().then(
            res => {
                if (res.status === 200 && res.data != null) {
                    let newData = [];

                    res.data.map((data) => (
                        newData.push({
                            value : data.id,
                            label : data.name
                        })
                    ));

                    setReportKind(newData);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    const onSubmit = (dataForm) => {
        const formData = new FormData();
        
        formData.append("uuid", getCookieName("__app_data_helpdesk_uuid"));
        formData.append("subject", dataForm.subject);
        formData.append("report_kind_id", dataForm.report_kind_id.value);
        formData.append("content", dataForm.content);

        if(listFiles.length > 0 ){
            formData.append("files[]", listFiles[0]);
        }

        HelpdeskTicketApi.createTicket(formData).then(
            res => {
                if (res.status === 200) {
                    setTicketNumber(res.data);
                    setSuccessModal(true);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    //List files
    const handleListFiles = (e) => {
        const files = Array.from(e.target.files);
        setListFiles(files);
    };

    //Delete list files
    const handleDeleteFile  = (index) => {
        let oldFiles = listFiles;
        oldFiles.splice(index, 1);
        setListFiles([...oldFiles]);
    };

    return (
        <Fragment>
            {/* Success Modal */}
            <ModalBase
                show    = {successModal} 
                title   = ""
                center  = {true}
                setShow = {(par) => setSuccessModal(par)} 
            >
                <div className="text-center">
                    <h5>Pengaduan Berhasil Dibuat</h5>

                    <p className="pt-2">
                        Berikut no tiket laporan Bpk/Ibu: 
                        <strong>
                            {ticketNumber != null ? ticketNumber.code : '0000'}
                        </strong> 
                        simpan no tiket untuk melakukan pelacakan status pengaduan.
                    </p>

                    <div className="pt-2 d-flex justify-content-between px-1">
                        <Button 
                            color   = "primary" 
                            outline 
                            onClick = {() => {
                                navigator.clipboard.writeText(ticketNumber != null ? ticketNumber.code : '0000'); 
                                CustomToast("success", 'Nomor tiket berhasil dicopy ke clipboard')
                            }}
                        >
                            Copy nomor tiker
                        </Button>

                        <Button 
                            color   = "primary" 
                            onClick = {() => window.location.href = '/helpdesk/users?active=pengaduan'}
                        >
                            Lihat Pengaduan
                        </Button>
                    </div>
                </div>
            </ModalBase>

            <div style={{ padding: '3rem 2rem 0' }}>
                <Row>
                    <Col md='2' sm='12'></Col>
                    <Col 
                        md = '8' 
                        sm = '12'
                    >
                        <div className="d-flex mb-2">
                            <a href="/helpdesk/users?active=pengaduan">
                                <ArrowLeftCircle size={35}/>
                            </a>
                            <div style={{ margin: '1px 0px 0px 35px' }}>
                                <img 
                                    src   = {Ticket} 
                                    style = {{ width: '32px', height: '32px' }}
                                />
                            </div>
                            <p style={{ margin: '7px 0px 0px 10px', fontWeight: 'bold', fontSize: '15px' }}>
                                Buat Pengaduan
                            </p>
                        </div>

                        <Card>
                            <CardBody>
                                <Card style={{ border: '1px solid #ecedf4', margin: '0px' }}>
                                    <CardBody>
                                        {/* Image Input */}
                                        <input
                                            ref      = {refPic}
                                            type     = "file"
                                            style    = {{ display:'none' }} 
                                            accept   = "image/*" 
                                            multiple
                                            innerRef = {register} 
                                            onChange = {handleListFiles} 
                                        />

                                        {/* File Input */}
                                        <input
                                            ref      = {refFile} 
                                            type     = "file" 
                                            style    = {{ display:'none' }} 
                                            accept   = ".txt,.xls,.xlsx,application/pdf,.ppt,.pptx,.rar,.zip,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.mp4"
                                            innerRef = {register} 
                                            onChange = {handleListFiles} 
                                        />

                                        <Row>
                                            <Col md='2' sm='12'></Col>
                                            <Col 
                                                md = '8' 
                                                sm = '12'
                                            >
                                                <h5 style={{ fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}>
                                                    Buat Laporan
                                                </h5>
                                                <Form onSubmit={handleSubmit(onSubmit)}>
                                                    <FormGroup>
                                                        <Input 
                                                            name        = "subject"
                                                            innerRef    = {register} 
                                                            placeholder = "Masukkan Subjek Laporan"
                                                        />
                                                        {errors && errors.subject && <FormFeedback>{errors.subject.message}</FormFeedback>}
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Controller
                                                            name    = "report_kind_id"
                                                            control = {control}
                                                            as = {
                                                                <Select
                                                                    id              = "report_kind_id"
                                                                    theme           = {selectThemeColors}
                                                                    options         = {reportKind}
                                                                    className       = "react-select"
                                                                    placeholder     = "Pilih Jenis Laporan"
                                                                    isClearable
                                                                    classNamePrefix = "select"
                                                                />
                                                            }
                                                        />
                                                        {errors && errors.report_kind_id && <FormFeedback>{errors.report_kind_id.message}</FormFeedback>}
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Input 
                                                            type        = 'textarea'
                                                            name        = 'content'
                                                            rows        = '4'
                                                            innerRef    = {register} 
                                                            placeholder = "Masukkan Keterangan atau Kornologi Permasalahan"
                                                        />
                                                    </FormGroup>

                                                    {/* List file */}
                                                    {
                                                        listFiles.length > 0 ?
                                                        listFiles.map((data, index) => (
                                                            <div key={"files_news_"+index}>
                                                                <Card className="m-0 mb-1">
                                                                    <CardBody className="shadow-boxs p-1">
                                                                        <div className="d-flex justify-content-between">
                                                                            <span>{data.name}</span>
                                                                            <span 
                                                                                onClick   = {() => {handleDeleteFile(index)}}
                                                                                className = "cursor-pointer" 
                                                                            >
                                                                                <X size={14}/>
                                                                            </span>
                                                                        </div>
                                                                    </CardBody>
                                                                </Card>
                                                            </div>
                                                        )) : null
                                                    }

                                                    {/* <FormGroup>
                                                        <div className="d-flex justify-content-between mt-2">
                                                            <Label>Tambahkan Media</Label>
                                                            <span>
                                                                <Button 
                                                                    color       = 'flat-success'
                                                                    onClick     = {() => { refPic.current.click()}} 
                                                                    className   = 'btn-icon' 
                                                                >
                                                                    <Image/>
                                                                </Button>
                                                                <Button 
                                                                    color       = 'flat-success'
                                                                    onClick     = {() => {refFile.current.click()}} 
                                                                    className   = 'btn-icon' 
                                                                >
                                                                    <File/>
                                                                </Button>
                                                            </span>
                                                        </div>
                                                    </FormGroup> */}
                                                    
                                                    <div style={{ textAlign: 'center' }}>
                                                        <SubmitButton
                                                            size      = "sm" 
                                                            color     = "primary" 
                                                        >
                                                            Buat Laporan
                                                        </SubmitButton>
                                                    </div>

                                                    {/* Alert Complaint */}
                                                    {/* <div style={{ textAlign: 'center' }}>
                                                        <AlertComplaint/>
                                                    </div> */}
                                                </Form>
                                            </Col>
                                            <Col md='2' sm='12'></Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md='2' sm='12'></Col>
                </Row>
            </div>
        </Fragment>
    );
};

export default CreateComplaint;