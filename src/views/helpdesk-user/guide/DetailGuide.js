import React, { 
    Fragment, 
    useState, 
    useEffect 
} from 'react';
import { 
    Col, 
    Row, 
    Card, 
    CardBody
} from 'reactstrap';

import parse                from 'html-react-parser';

//Icon
import Book                 from '@src/assets/icons/book.svg';
import { ArrowLeftCircle }  from 'react-feather';

//API
import { InstructionAPI } from '../../../services/pages/helpdesk/instruction';


const DetailGuide = ({ match }) => {
    //State
    const [detailGuide, setDetailGuide] = useState(false);

    useEffect(() => {
        getDetailGuide();
    }, []);

    const getDetailGuide = () => {
        InstructionAPI.getDetailGuide(match.params.id).then(
            res => {
                if (res.status === 200) {
                    setDetailGuide(res.data);
                }
            },
            err => {
                console.log(err.message);
            }
        )
    };

    return (
        <Fragment>
            <div style={{ padding: '3rem 2rem 0' }}>
                <Row>
                    <Col md='2' sm='12'></Col>
                    <Col 
                        md = '8' 
                        sm = '12'
                    >
                        <Row>
                            <Col 
                                md = "7" 
                                sm = "12"
                            >
                                <div className="d-flex" style={{ marginBottom: '17px' }}>
                                    <a href="/helpdesk/user-guide">
                                        <ArrowLeftCircle size={35}/>
                                    </a>
                                    <div style={{ margin: '1px 0px 0px 35px' }}>
                                        <img 
                                            src   = {Book} 
                                            style = {{ width: '32px', height: '32px' }}
                                        />
                                    </div>
                                    <p style={{ margin: '7px 0px 0px 10px', fontWeight: 'bold', fontSize: '15px' }}>
                                        Detail Panduan Pengguna
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        
                        <Card style={{ border: '1px solid #ecedf4', margin: '0px' }}>
                            <CardBody>
                                <Card style={{ border: '1px solid #ecedf4', margin: '0px', padding: '20px 20px 10px 20px' }}>
                                    <h5 className="font-weight-bolder mb-2">
                                        {detailGuide.title}
                                    </h5>
                                    <p className='text-justify m-0'>
                                        {
                                            detailGuide.content != null ?
                                                parse(detailGuide.content) 
                                            : null
                                        }
                                    </p>
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

export default DetailGuide;