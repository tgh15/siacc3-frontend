import React, { Fragment, useState }    from 'react';
import { Button, 
    Col, 
    Row,
    Form, 
    Input, 
    Label, 
    Media,
    FormGroup, 
    ModalFooter, 
} from 'reactstrap';

//Image
import defaultPhoto                     from '@src/assets/images/portrait/small/150x150.png';

//Componenets
import { ModalBase }                    from '../../components/widgets/modals-base';
import SubmitButton                     from '../../components/widgets/submit-button';


const ChangeInformation = (props) => {
    //State
    const [photo, setPhoto] = useState(defaultPhoto);

    const selectPhoto = e => {
        const reader = new FileReader(), 
        files = e.target.files

        reader.onload = function () {
            setPhoto(reader.result);
        };

        reader.readAsDataURL(files[0])
    };

    return (
        <Fragment>
            <Button 
                color   = 'primary'
                onClick = {() => props.getDetailEmployee(props.uuid)} 
            >
                Ubah Informasi
            </Button>  
            <ModalBase
                size    = "lg"
                show    = {props.changeInformation}
                title   = "Ubah Pengguna"
                setShow = {() => {props.setChangeInformation()}}
            >
                <Form>
                    <Row>
                        <Col
                            md = "6" 
                            sm = "12"
                        >
                            <FormGroup>
                                <Label>Foto Profile</Label>
                                <Media>
                                    <Media 
                                        left
                                        className = 'mr-25' 
                                    >
                                        <Media 
                                            src         = {photo} 
                                            alt         = 'Generic placeholder image' 
                                            width       = '80' 
                                            height      = '80' 
                                            object 
                                            className   = 'rounded mr-50' 
                                        />
                                    </Media>
                                    <Media className='mt-75 ml-1' body>
                                        <Button.Ripple 
                                            tag         = {Label} 
                                            size        = 'sm' 
                                            color       = 'primary'
                                            className   = 'mr-75' 
                                        >
                                            Upload Photo
                                            <Input 
                                                type     = 'file' 
                                                name     = "photo" 
                                                hidden 
                                                accept   = 'image/*'
                                                onChange = {selectPhoto}
                                            />
                                        </Button.Ripple>
                                    </Media>
                                </Media>
                            </FormGroup>
                            <FormGroup>
                                <Label for="identity_id_">NIP</Label>
                                <Input
                                    id           = "identity_id_"
                                    name         = "identity_id"
                                    type         = "text"
                                    defaultValue = {props.identity_id}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="ktp_">No.KTP</Label>
                                <Input
                                    id           = "ktp_"
                                    name         = "ktp"
                                    type         = "text"
                                    defaultValue = {props.ktp}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name_">Nama Lengkap</Label>
                                <Input
                                    id           = "name_"
                                    name         = "name"
                                    type         = "text"
                                    defaultValue = {props.name}
                                />
                            </FormGroup>
                            {/* <FormGroup>
                                <Label for="workunit_">Satker</Label>
                                <Input
                                    id           = "workunit_"
                                    name         = "workunit"
                                    type         = "text"
                                    disabled
                                    defaultValue = {props.workunit}
                                />
                            </FormGroup> */}
                        </Col>
                        <Col
                            md = "6" 
                            sm = "12"
                        >
                            {/* <FormGroup>
                                <Label for="position_">Jabatan</Label>
                                <Input
                                    id           = "position_"
                                    name         = "position"
                                    type         = "text"
                                    disabled
                                    defaultValue = {props.position}
                                />
                            </FormGroup> */}
                            <FormGroup>
                                <Label for="sector_">Struktur/Bidang</Label>
                                <Input
                                    id           = "sector_"
                                    name         = "sector"
                                    type         = "text"
                                    disabled
                                    defaultValue = {props.sector}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="phone_number_">No. Telepon</Label>
                                <Input
                                    id           = "phone_number_"
                                    name         = "phone_number"
                                    type         = "text"
                                    defaultValue = {props.phone_number}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="surel_">Surel</Label>
                                <Input
                                    id           = "surel_"
                                    name         = "surel"
                                    type         = "email"
                                    defaultValue = {props.email}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="address_">Alamat</Label>
                                <Input
                                    id           = "address_"
                                    name         = "address"
                                    type         = "textarea"
                                    rows         = {3}
                                    defaultValue = {props.address}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <ModalFooter className="d-flex justify-content-between px-0">
                        <Button 
                            color   = "danger"
                            outline
                            onClick = {() => props.setChangeInformation(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            color   = "primary"
                            outline
                        >
                            Ubah Kata Sandi
                        </Button>
                        <SubmitButton>
                            Submit
                        </SubmitButton>
                    </ModalFooter>
                </Form>
            </ModalBase>
        </Fragment>
    );
};

export default ChangeInformation;