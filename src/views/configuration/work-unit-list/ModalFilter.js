import React, { Fragment } from 'react';
import { Button, Col, FormGroup, Label, Row } from 'reactstrap';


const ModalFilter = () => {
    return (
        <Fragment>
            <FormGroup>
                <Label>Urutan</Label>
                <Row>
                    <Col>
                        <Button.Ripple 
                            block 
                            color = "primary"
                            outline
                        >
                            Terbaru
                        </Button.Ripple>
                    </Col>
                    <Col className="mr-1">
                        <Button.Ripple 
                            block 
                            color       = "primary"
                            outline
                            className   = "ml-1" 
                        >
                            Terlama
                        </Button.Ripple> 
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <div id="user-manajement-kejati">
                    <Select
                        name            = 'clear'
                        block
                        theme           = {selectThemeColors}
                        options         = {workunitOptions.filter(opt => opt.workunit_level_id == 2)}
                        isMulti
                        onChange        = {(e) => { setKejati(e) }}
                        className       = 'react-select'
                        isClearable
                        placeholder     = "Pilih Kejati"
                        classNamePrefix = 'select'
                    />
                </div>
            </FormGroup>
            <FormGroup>
                <div id="user-manajement-kejari">
                    <Select
                        name            = 'clear'
                        block
                        theme           = {selectThemeColors}
                        options         = {workunitOptions.filter(opt => opt.workunit_level_id == 3)}
                        isMulti
                        onChange        = {(e) => { setKejari(e) }}
                        className       = 'react-select'
                        isClearable
                        placeholder     = "Pilih Kejari"
                        classNamePrefix = 'select'
                    />
                </div>
            </FormGroup>
            <FormGroup>
                <div id="user-manajement-capjari">
                    <Select
                        name            = 'clear'
                        block
                        theme           = {selectThemeColors}
                        options         = {workunitOptions.filter(opt => opt.workunit_level_id == 4)}
                        isMulti
                        onChange        = {(e) => { setCabjari(e) }}
                        className       = 'react-select'
                        placeholder     = "Pilih Cabjari"
                        isClearable
                        classNamePrefix = 'select'
                    />
                </div>
            </FormGroup>
        </Fragment>
    )
}

export default ModalFilter;