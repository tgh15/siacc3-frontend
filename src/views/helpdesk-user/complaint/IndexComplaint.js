import React, { Fragment, useState } from 'react';
import { useHistory }                from 'react-router-dom';
import { 
    Col, 
    Row, 
    Card, 
    Input,
    Button,
    Spinner, 
    CardBody, 
} from 'reactstrap';

//Icon
import { Plus }                      from 'react-feather';

//Helper
import Helper                        from '../../../helpers';

//URL APi
import { HelpdeskTicketApi }         from '../../../services/pages/helpdesk/ticket';


const IndexComplaint = () => {
    // State
    const [code, setCode]           = useState('');
    const [errCode, setErrCode]     = useState(false);
    const [loading, setLoading]     = useState(false);

    // History
    let history                     = useHistory();

    // Helper
    let { getCookieName }           = Helper

    // check code
    const checkCode = () => {
        setLoading(true)
        HelpdeskTicketApi.getByCode(code,getCookieName("__app_data_helpdesk"))
            .then(res => {
                setLoading(false)
                history.push(`/helpdesk/track-complaint?code=${code}`)
            }, err => {
                setLoading(false)
                setErrCode(true)
            })
    };

    return (
        <Fragment>
            <Card>
                <CardBody>
                    <Card style={{ border: '1px solid #ecedf4', margin: '0px' }}>
                        <CardBody>
                            <div style={{ textAlign: 'center' }}>
                                <h5 style={{ fontWeight: 'bold' }}>
                                    Masukkan No Tiket Untuk Lacak Pengaduan
                                </h5>

                                <Row style={{ justifyContent: 'center', margin: '20px' }}>
                                    <Col
                                        md        = '6'
                                        sm        = '12'
                                        className = "p-0"
                                    >
                                        <Input
                                            invalid     = {errCode}
                                            onChange    = {(e) => {
                                                setCode(e.target.value)
                                                setErrCode(false)
                                            }}
                                            placeholder = "Masukkan nomor tiket"
                                        />
                                        {
                                            errCode && (
                                                <div className="invalid-feedback">
                                                    Nomor tiket tidak ditemukan
                                                </div>
                                            )
                                        }
                                    </Col>
                                    <Col
                                        md        = '1'
                                        sm        = '12'
                                        className = "p-0"
                                    >
                                        <Button.Ripple
                                            color    = "primary"
                                            onClick  = {() => { checkCode() }}
                                            disabled = {code === '' || errCode || loading}
                                        >
                                            {
                                                loading ? (
                                                    <Spinner 
                                                        size  = "sm" 
                                                        color = "success"
                                                    />
                                                ) : "OK"
                                            }
                                        </Button.Ripple>
                                    </Col>
                                </Row>
                                <p>Atau</p>
                                <p>Buat Pengaduan Baru</p>
                                <Button
                                    color     = 'primary'
                                    onClick   = {() => {
                                        history.push("/helpdesk/create-complaint")
                                    }}
                                    className = "btn-icon rounded-circle"
                                >
                                    <Plus size={16}/>
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </CardBody>
            </Card>
        </Fragment>
    );
};

export default IndexComplaint;