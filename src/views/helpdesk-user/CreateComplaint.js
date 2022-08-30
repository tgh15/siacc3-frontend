import React, { 
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
    Spinner,
    CardBody,
    FormGroup,
    FormFeedback,
} from 'reactstrap';

import Select                           from 'react-select';
import classNames                       from 'classnames';
import { useHistory }                   from 'react-router-dom';
import { Controller, useForm }          from 'react-hook-form';

// Yup
import * as yup                         from 'yup';
import { yupResolver }                  from '@hookform/resolvers/yup';

//Icon and Image
import Ticket                           from '@src/assets/icons/ticket.svg';
import { ArrowLeftCircle, File, Image } from 'react-feather';

//Utils
import Helper                           from '../../helpers';
import { selectThemeColors }            from '@utils';

//URL API
import { ReportAPI }                    from '../../services/pages/helpdesk/report';
import { HelpdeskTicketApi }            from '../../services/pages/helpdesk/ticket';

//Components
import AlertComplaint                   from './AlertComplaint';


const CreateComplaint = () => {
    //State
    const [code, setCode]                   = useState('');
    const [loading, setLoading]             = useState(false);
    const [showAlert, setShowAlert]         = useState(false);
    const [optionReport, setOptionReport]   = useState([]);
    
    const getReportKind = () => {
        ReportAPI.getReportKind()
        .then(res => {
            let data = res.data.map(item => {
                return {
                    value: item.id,
                    label: item.name
                }
            })
            setOptionReport(data)
        }, err => {
            
        })
    };
    
    let history                             = useHistory();
    let { getCookieName }                   = Helper

    const schema = yup.object().shape({
        subject: yup.string().required("Isian Tidak Boleh Kosong"),
        content: yup.string().required("Isian Tidak Boleh Kosong"),
        report_kind_id: yup.object().required("Isian Tidak Boleh Kosong"),
    }).required();

    const {
        errors,
        control,
        register,
        handleSubmit
    } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

    const onSubmit = dataForm => {
        setLoading(true);

        let formData = new FormData();
        formData.append('uuid', getCookieName("__app_data_helpdesk_uuid"))
        formData.append("subject", dataForm.subject);
        formData.append("content", dataForm.content);
        formData.append("report_kind_id", dataForm.report_kind_id.value);

        HelpdeskTicketApi.create(formData)
            .then(res => {
                setLoading(false)
                setCode(res.data.code)
                setShowAlert(true)
            },
                err => {
                    console.log(err)
                })
    }

    useEffect(() => {
        setCode('')
        getReportKind()
    }, []);

    return (
        <Fragment>
            <AlertComplaint
                show    = {showAlert}
                code    = {code}
                onClose = {() => setShowAlert(!showAlert)}
            />

            <div style={{ padding: '3rem 2rem 0' }}>
                <Row>
                    <Col md='2' sm='12'></Col>
                    <Col
                        md = '8'
                        sm = '12'
                    >
                        <div className="d-flex mb-2">
                            <ArrowLeftCircle 
                                size      = {35} 
                                onClick   = {() => { history.push("/complaint") }}
                                className = "cursor-pointer"
                            />

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
                                        <Row>
                                            <Col md='2' sm='12'></Col>
                                            <Col
                                                md = '8'
                                                sm = '12'
                                            >
                                                <div >
                                                    <h5 style={{ fontWeight: 'bold', marginBottom: '30px', textAlign: "center" }}>Buat Laporan</h5>
                                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                                        <FormGroup>
                                                            <Input
                                                                name="subject"
                                                                invalid     = {errors.subject ? true : false}
                                                                innerRef    = {register}
                                                                placeholder = "Masukkan Subjek Laporan"
                                                            />
                                                            {errors.subject && <FormFeedback>{errors.subject.message}</FormFeedback>}
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Controller
                                                                name    = "report_kind_id"
                                                                control = {control}
                                                                as      = {
                                                                    <Select
                                                                        name            = "type-report"
                                                                        theme           = {selectThemeColors}
                                                                        options         = {optionReport}
                                                                        className       = {classNames("react-select", {
                                                                            "is-invalid": errors.report_kind_id ? true : false
                                                                        })}
                                                                        placeholder     = "Pilih Jenis Laporan"
                                                                        isClearable
                                                                        classNamePrefix = "select"
                                                                        
                                                                    />
                                                                }
                                                            />
                                                            {errors.report_kind_id && <small className='text-danger'>{errors.report_kind_id.message}</small>}
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Input
                                                                type        = 'textarea'
                                                                name        = 'content'
                                                                rows        = '4'
                                                                invalid     = {errors.content ? true : false}
                                                                innerRef    = {register}
                                                                placeholder = "Masukkan Keterangan atau Kronologi Permasalahan"
                                                            />
                                                            {errors.content && <FormFeedback>{errors.content.message}</FormFeedback>}
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <div className="d-flex justify-content-between">
                                                                <Label>Tambahkan Media</Label>
                                                                <span>
                                                                    <Button
                                                                        type      = "button"
                                                                        color     = 'flat-success'
                                                                        className = 'btn-icon'
                                                                    >
                                                                        <File/>
                                                                    </Button>
                                                                    <Button
                                                                        type      = "button"
                                                                        color     = 'flat-success'
                                                                        className = 'btn-icon'
                                                                    >
                                                                        <Image/>
                                                                    </Button>
                                                                </span>
                                                            </div>
                                                        </FormGroup>

                                                        {/* Alert Complaint */}
                                                        <div className='d-flex justify-content-end mt-3'>
                                                            <Button
                                                                type      = "submit"
                                                                color     = 'primary'
                                                                disabled  = {loading}
                                                                className = 'px-5'
                                                            >
                                                                {loading ? <Spinner size="sm" color="light" /> : 'Buat Laporan'}
                                                            </Button>
                                                        </div>
                                                    </Form>
                                                </div>
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