import { Fragment }   from "react";
import {
    Col, 
    Row,
    Input, 
    Label,
    FormGroup, 
    FormFeedback,
} from "reactstrap";


import CustomToast              from "../../../components/widgets/custom-toast";
import InputPasswordToggle      from "../../../components/widgets/input-password-toggle";

//API
import UserManagementApi        from "../../../services/pages/configuration/user-management";


const EditAccountForm = ({data, register, errors}) => {

    return (
        <Fragment>
            <Row>
                <Col md={12}>
                    <FormGroup>
                        <Label>Nama Pengguna</Label>
                        <Input
                            name            = "username"
                            invalid         = {(errors && errors.username) ? true : false}
                            innerRef        = {register()}
                            readOnly
                            placeholder     = "Nama Pengguna"
                            defaultValue    = {data.username}
                        />
                        {errors && errors.username && <FormFeedback>{errors.username.message}</FormFeedback>}
                    </FormGroup>
                </Col>
                {
                    !(localStorage.getItem('role') === 'Verifikator Pusat' || localStorage.getItem('role') === 'Admin' || localStorage.getItem('role') === 'Verifikator Daerah' || localStorage.getItem('role') === 'Admin Daerah') &&
                        <Col md={12}>
                            <FormGroup>
                                <Label>Password Lama</Label>
                                <InputPasswordToggle
                                    id          = "old_password"
                                    name        = "old_password"
                                    invalid     = {(errors && errors.old_password) ? true : false} 
                                    innerRef    = {register()}
                                    className   = 'input-group-merge'
                                    placeholder = "Password Lama"
                                />
                                {errors && errors.old_password && <Label>{errors.old_password.message}</Label>}
                            </FormGroup>
                        </Col>
                }
                <Col md={6}>
                    <FormGroup>
                        <Label>Password Baru</Label>
                        <InputPasswordToggle
                            id          = "update_password"
                            name        = "update_password"
                            invalid     = {(errors && errors.update_password) ? true : false}
                            innerRef    = {register()}
                            className   = 'input-group-merge'
                            placeholder = "Password Baru"
                        />
                        {errors && errors.update_password && <Label>{errors.update_password.message}</Label>}
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label>Ulangi Password Baru</Label>
                        <InputPasswordToggle
                            name        = "update_repeat_password"
                            invalid     = {(errors && errors.update_repeat_password) ? true : false}
                            innerRef    = {register()}
                            className   = 'input-group-merge'
                            placeholder = "Ulangi Password Baru"
                        />
                        {errors && errors.update_repeat_password && <Label>{errors.update_repeat_password.message}</Label>}
                    </FormGroup>
                </Col>
            </Row>
        </Fragment>
    );
};

export default EditAccountForm;