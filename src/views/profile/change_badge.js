import React, { Fragment, useEffect }   from 'react';
import { 
    Col, 
    Row, 
    Form, 
    Input, 
    Button,
    FormGroup,
    ModalFooter, 
} from 'reactstrap';

//Components
import {ModalBase}                      from '../../components/widgets/modals-base';
import SubmitButton                     from '../../components/widgets/submit-button';
import CustomTableBodyEmpty             from '../../components/widgets/custom-table/CustomTableBodyEmpty';
import Helper                           from '../../helpers';


const ChangeBadge = (props) => {

    const {fallbackImage_}          = Helper;

    const handleFinish = (values) => {
        props.setSelectedBadge(values.selected_badge);
        props.changeProfileAchievement(values.selected_badge);
    };

    useEffect(() => {
        if(props.achievement.length > 0){
            let _data = [];
            
            props.achievement.filter((data) => (
                _data.push(data.id)
            ));

            console.log(_data)
        }
    }, [props.achievement]);

    return (
        <Fragment>
            <Button 
                color   = "primary" 
                onClick = {props.showModalAchievement}
            >
                Ganti Lencana
            </Button>

            <ModalBase
                size    = "lg"
                show    = {props.BadgeAchievement}
                title   = "Ganti Lencana"
                setShow = {() => {props.setBadgeAchievement()}}
            >
                <Form onSubmit={handleFinish}>
                    <FormGroup className="mx-5">
                        <Row>
                            {
                                props.achievementAgent != null ?
                                props.achievementAgent.map((data) => (
                                    <Col
                                        md = '3' 
                                        sm = '12'
                                    >
                                        <div style={{float: 'right', marginRight: '-7px'}}>
                                            <Input 
                                                id      = {"checkbox_"+data.id}
                                                key     = {"checkbox_"+data.id} 
                                                type    = "checkbox"
                                                name    = "selected_badge"
                                                value   = {data.id}
                                                style   = {{position: 'absolute', marginTop: '-3px'}}
                                            />
                                        </div>
                                        <div className="box-badge">
                                            <img 
                                                src         = {data.oldBadge != "" ? data.oldBadge : null}
                                                alt         = {'Profile Pic'} 
                                                style       = {{width: '80px', height: '77px', marginTop: '7px', borderRadius: '10px'}} 
                                                className   = "img-fluid"
                                                onError     = {fallbackImage_}
                                            />
                                            <p style={{fontSize: '12px'}}>
                                                {data.title}
                                            </p>
                                        </div>
                                    </Col>
                                )) : <CustomTableBodyEmpty/>
                            }
                        </Row>
                    </FormGroup>
                    <ModalFooter 
                        style       = {{borderTop: 'none'}}
                        className   = "d-flex justify-content-center p-0"
                    >
                        <SubmitButton>
                            OK
                        </SubmitButton>
                    </ModalFooter>
                </Form>
            </ModalBase>
        </Fragment>
    );
};

export default ChangeBadge;