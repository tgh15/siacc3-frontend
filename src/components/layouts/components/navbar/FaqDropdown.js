import { useEffect, useState }  from 'react';
import { Link }                 from 'react-router-dom';

import {
        Col, 
        Row,
        Card,
        Progress, 
        DropdownMenu, 
        DropdownItem,
        DropdownToggle, 
        UncontrolledDropdown,
    }                           from 'reactstrap';
import { 
        Circle,
        BookOpen,
        HelpCircle,
        CheckCircle
    }                           from 'react-feather';

import { ModalBase }            from '../../../widgets/modals-base';

//API
import selfLearningURL          from '../../../../services/pages/helpdesk/self-learning';
import Avatar from '../../../widgets/avatar';
import Helper from '../../../../helpers';

const FaqDropdown = () => {

    const [detailData, setDetailData]       = useState(null);
    const [selfLearning, setSelfLearning]   = useState(null);
    const [modalVisible, setModalVisible]   = useState(false);
    const [detailVisible, setDetailVisible] = useState(null);

    const getSelfLearning = () => {
        selfLearningURL.userPratice().then(
            res => {
                if(res.status === 200){
                    setSelfLearning(res.data);
                }
            },
            err => {
                console.log(err);
            }
        )
    }

    useEffect(() => {
        getSelfLearning();
    }, []);

    return (
        <>
            {/* modal detail self learning   */}
            <ModalBase
                show    = {detailVisible}
                size    = "lg"
                title   = "Detail Self Learning Practice"
                center  = {true}
                setShow = {(par) => setDetailVisible(par)}

            >
                <Row className="py-2">
                    <Col md={3} className="text-center">
                        <h4>No.</h4>
                    </Col>
                    <Col md={3}>
                        <h4>Materi</h4>
                    </Col>
                    <Col md={3} className="text-center">
                        <h4>Poin</h4>
                    </Col>
                    <Col md={3} className="text-center">
                        <h4>Lencana</h4>
                    </Col>
                </Row>
                {
                    detailData != null ?
                        <div style={{maxHeight: '25vh'}} className="border rounded mb-2 py-1">
                            <Row className="h-100 d-flex align-items-center">
                                <Col md={3} className="text-center">                                        
                                    <h5>{detailData.practice.title}</h5>
                                    <Progress value={50} className="ml-2 w-75"/>
                                </Col>
                                <Col md={3} >
                                    {
                                        detailData.modules.length > 0 ?
                                        detailData.modules.map((data_, index) => (
                                                <div className='d-flex' key={"detail_module_"+index}>
                                                    {
                                                        data_.is_done === true ? 
                                                            <CheckCircle size={20} className="mr-2 text-primary"/>
                                                        :
                                                            <Circle size={20} className="mr-2"/>
                                                    }
                                                    <a href={`${data_.module.link}&moduleId=${data_.id}`}>
                                                        <h5>{data_.module.title}</h5>
                                                    </a>
                                                </div>
                                            ))
                                        :
                                            null
                                    }
                                </Col>
                                <Col md={3} className="text-center">
                                    <h4>{detailData.practice.point}</h4>
                                </Col>
                                <Col md={3} className="text-center">
                                    <h4>Lencana</h4>
                                </Col>
                            </Row>
                        </div>
                    :
                        null
                }
            </ModalBase>

            {/* modal self learning */}
            <ModalBase
                show    = {modalVisible}
                size    = "lg"
                title   = "Self Learning Practice"
                center  = {true}
                setShow = {(par) => {setModalVisible(par)}}
            >   
                <Row className="py-2">
                    <Col md={3} className="text-center">
                        <h4>No.</h4>
                    </Col>
                    <Col md={3}>
                        <h4>Materi</h4>
                    </Col>
                    <Col md={3} className="text-center">
                        <h4>Poin</h4>
                    </Col>
                    <Col md={3} className="text-center">
                        <h4>Lencana</h4>
                    </Col>
                </Row>
                {
                    selfLearning != null ?
                        selfLearning.map((data, index) => (
                            <div 
                                key         = {"self_learning_"+index}
                                style       = {{maxHeight: '25vh'}} 
                                className   = "border rounded mb-2 py-1"
                            >
                                <Row className="h-100 d-flex align-items-center">
                                    <Col md={3} className="text-center">                                        
                                        <h5>{data.practice.title}</h5>
                                        <Progress value={data.progress*100} className="ml-2 w-75"/>
                                    </Col>
                                    <Col md={3} >
                                        {
                                            data.modules.length > 0 ?
                                                data.modules.map((data_, index) => (
                                                    index < 3 ?
                                                        <div className='d-flex' key={"faq_dropdown_"+index}>
                                                            {
                                                                data_.is_done === true ? 
                                                                    <CheckCircle size={20} className="mr-2 text-primary"/>
                                                                :
                                                                    <Circle size={20} className="mr-2"/>
                                                            }
                                                            <a href={`${data_.module.link}&moduleId=${data_.id}`}>
                                                                <h5>{data_.module.title}</h5>
                                                            </a>
                                                        </div>
                                                    :
                                                        null
                                                ))
                                            :
                                                null
                                        }
                                        {
                                            data.modules.length > 3 ? 
                                                <h5 onClick={() => {setDetailData(data); setDetailVisible(true)}} className="text-primary">
                                                    Lihat Detail ...
                                                </h5>
                                            :
                                                null
                                        }
                                    </Col>
                                    <Col md={3} className="text-center">
                                        <h4>{data.practice.point}</h4>
                                    </Col>
                                    <Col md={3} className="text-center">
                                        <Avatar img={data.practice.badge} onError={Helper.fallbackImage_} imgHeight='60' imgWidth='60' />
                                    </Col>
                                </Row>
                            </div>
                        ))
                    :
                        null
                }
            </ModalBase>

            <UncontrolledDropdown 
                id          = {'header_faq'}
                tag         = 'li' 
                className   = 'dropdown-user nav-item'
            >   
                <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
                    <HelpCircle/>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem
                        tag     = 'div' 
                        onClick = {() => {
                            setModalVisible(true)
                        }}
                    >
                        <BookOpen size={14} className='mr-75' />
                        <span className='align-middle'>Self Learning</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </>
    )

};

export default FaqDropdown;
