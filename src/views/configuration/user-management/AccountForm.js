import { Fragment }                             from "react";
import { 
    Col,
    Row,
    Label, 
    Input, 
    FormGroup, 
}                                               from "reactstrap";

//Components
import InputPasswordToggle                      from "../../../components/widgets/input-password-toggle";


const AccountForm = (props) => {
    const {
        register,
        errors,
    } = props;

    return (
        <Fragment>
            <Row>
                <Col md={12}>
                    <FormGroup>
                        <Label>Nama Pengguna</Label>
                        <Input
                            name        = "username"
                            invalid     = {(errors.username) ? true : false}
                            innerRef    = {register()}
                            placeholder = "Nama Pengguna"
                        />

                        {
                            errors && errors.username && 
                            <Label style={{ color: 'red' }}>
                                {errors.username.message}
                            </Label>
                        }
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label>Password</Label>
                        <InputPasswordToggle
                            id          = "password"
                            name        = "password"
                            invalid     = {(errors.password) ? true : false}
                            innerRef    = {register()}
                            className   = 'input-group-merge'
                            placeholder = "Password"
                        />

                        {
                            errors && errors.password && 
                            <Label style={{ color: 'red' }}>
                                {errors.password.message}
                            </Label>
                        }
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label>Ulangi Password</Label>
                        <InputPasswordToggle
                            name        = "repeat_password"
                            invalid     = {(errors.repeat_password) ? true : false}
                            innerRef    = {register()}
                            className   = 'input-group-merge'
                            placeholder = "Ulangi Password"
                        />

                        {
                            errors && errors.repeat_password && 
                            <Label style={{ color: 'red' }}>
                                {errors.repeat_password.message}
                            </Label>
                        }
                    </FormGroup>
                </Col>
            </Row>
        </Fragment>
    );
};

export default AccountForm;