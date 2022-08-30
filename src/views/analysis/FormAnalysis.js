import { useState } from 'react'
import { Plus } from 'react-feather'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

import {
    Modal,
    ModalBody,
    ModalHeader,
    Button,
    ModalFooter,
    Label,
    FormGroup,
    Row,
    Col,
    Input,
    CustomInput,
} from "reactstrap"


const colourOptions = [
    { value: 'ocean', label: 'Ocean' },
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
    { value: 'red', label: 'Red' },
    { value: 'orange', label: 'Orange' }
]




const FormAnalysis = () => {

    const [FormModal, setFormModal] = useState(false)

    return (

        <div className='vertically-centered-modal modal-sm'>
            <Button.Ripple outline color="primary" size="sm" className="mb-1" onClick={() => setFormModal(!FormModal)}>
                <Plus size={14} />
            </Button.Ripple>

            <Modal isOpen={FormModal} toggle={() => setFormModal(!FormModal)} className='modal-dialog' size="lg">
                <ModalHeader toggle={() => setFormModal(!FormModal)}>Tambah Jabatan</ModalHeader>
                <ModalBody>

                    <Row>
                        <Col md="6" sm="12">
                            <FormGroup>

                                <Label for='id'>Judul Analisis</Label>

                                <Input name='icon-primary' />

                            </FormGroup>
                        </Col>
                        <Col md="6" sm="12">
                            <FormGroup>

                                <Label for='id'>Analisis Prediksi</Label>
                                <br />
                                <Select
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue={colourOptions[1]}
                                    name='clear'
                                    options={colourOptions}
                                    isClearable
                                />

                            </FormGroup>
                        </Col>

                        <Col md="6" sm="12">
                            <FormGroup>
                                <Label for='id'>Topik Analisis</Label>
                                <Input name='icon-primary' />
                            </FormGroup>

                            <FormGroup>

                                <Label for='id'>Tempat</Label>
                                <Select
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue={colourOptions[1]}
                                    name='clear'
                                    options={colourOptions}
                                    isClearable
                                />

                            </FormGroup>
                        </Col>
                        <Col md="6" sm="12">
                            <Row>
                                <FormGroup className="col-md-6">

                                    <Label for='id'>Rentang Waktu</Label>

                                    <Input name='text' id='address' />


                                </FormGroup>
                                <div className='demo-inline-spacing col-md-6'>
                                    <CustomInput type='radio' id='exampleCustomRadio' name='customRadio' inline label='Tahun' defaultChecked />
                                    <CustomInput type='radio' id='exampleCustomRadio2' name='customRadio' inline label='Bulan' />
                                </div>
                            </Row>
                        </Col>


                    </Row>

                </ModalBody>
                <ModalFooter>
                    <Button color='primary' outline onClick={() => setFormModal(!FormModal)}>
                        Batal
                    </Button>
                    <Button color='primary' onClick={() => setFormModal(!FormModal)}>
                        Simpan
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default FormAnalysis
