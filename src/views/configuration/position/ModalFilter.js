import { Fragment, useState } from "react";
import Select                 from 'react-select';
import { selectThemeColors }  from '@utils';

import {
    Row,
    Col,
    Label,
    Button,
    FormGroup,
    ModalFooter
} from "reactstrap";

//Component
import CustomToast            from "../../../components/widgets/custom-toast";

//API
import positionAPI            from "../../../services/pages/configuration/position/index";
import ButtonLoading          from "../../../components/widgets/loading-button";

const typeOptions = [
    { key: "1", value: 1, label: 'PELAKSANA' },
    { key: "2", value: 2, label: 'FUNGSIONAL' },
    { key: "3", value: 3, label: 'STRUKTURAL' },
];


const ModalFilter = (props) => {
    const {
        onReset,
        setListData, 
        sectorOptions,
        workUnitLevelOptions
    } = props;

    //State
    const [sector, setSector]               = useState(null);
    const [loading, setLoading]             = useState(false);
    const [newsType, setNewsType]           = useState("latest");
    const [positionType, setPositionType]   = useState(null);
    const [workunitLevel, setWorkunitLevel] = useState(null);

    const handleFilter = () => {
        setLoading(true);
        setListData(false);

        const formData = {
            order_by            : newsType,
            position_type       : parseInt(positionType),
            workunit_level_id   : parseInt(workunitLevel),
            sector_id           : parseInt(sector)
        };

        positionAPI.filterPosition(formData).then(
            res => {
                if (!res.is_error) {
                    setLoading(false);
                    setListData(res.data.position);
                }else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    return (
        <Fragment>
            <FormGroup>
                <Label>Urutkan</Label>
                <Row id="position-order">
                    <Col>
                        {
                            (newsType === "latest") ? <Button.Ripple block color="primary">
                                Terbaru
                            </Button.Ripple> : 
                            <Button.Ripple 
                                color   = "primary" 
                                block 
                                outline 
                                onClick = {() => setNewsType("latest")}
                            >
                                Terbaru
                            </Button.Ripple>
                        }
                    </Col>
                    <Col>
                        {
                            (newsType === "longest") ? <Button.Ripple block className="ml-1" color="primary">
                                Terlama
                            </Button.Ripple> : 
                            <Button.Ripple 
                                color       = "primary" 
                                block 
                                outline
                                onClick     = {() => setNewsType("longest")}
                            >
                                Terlama
                            </Button.Ripple>
                        }
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Label for='name'>Tipe Jabatan</Label>
                <div id="position-typee">
                    <Select
                        name            = 'clear'
                        block
                        theme           = {selectThemeColors}
                        options         = {typeOptions}
                        onChange        = {(e) => { setPositionType(e.value)} }
                        className       = 'react-select'
                        isClearable
                        placeholder     = "Pilih Tipe Jabatan"
                        classNamePrefix = 'select'
                    />
                </div>
            </FormGroup>
            <FormGroup>
                <Label for='id'>Satuan Kerja</Label>
                <div id="workunit-position">
                    <Select
                        name            = 'clear'
                        block
                        theme           = {selectThemeColors}
                        options         = {workUnitLevelOptions}
                        onChange        = {(e) => { setWorkunitLevel(e.value)} }
                        className       = 'react-select'
                        isClearable
                        placeholder     = "Pilih Satuan Kerja"
                        classNamePrefix = 'select'
                    />
                </div>
            </FormGroup>
            <FormGroup>
                <Label for='id'>Unit Kerja</Label>
                <div id="units-position">
                    <Select
                        name            = 'clear'
                        block
                        theme           = {selectThemeColors}
                        options         = {sectorOptions}
                        onChange        = {(e) => { setSector(e.value)} }
                        className       = 'react-select'
                        isClearable
                        placeholder     = "Pilih Unit Kerja"
                        classNamePrefix = 'select'
                    />
                </div>
            </FormGroup>

            <ModalFooter className="d-flex justify-content-center">
                <div id="position-reset">
                    <Button.Ripple 
                        color   = 'primary' 
                        outline 
                        onClick = {onReset}
                    >
                        Reset
                    </Button.Ripple>
                </div>
                <div id="position-apply">
                    <ButtonLoading
                        color     = 'primary' 
                        action    = {handleFilter}
                        isLoading = {loading}
                    >
                        Terapkan
                    </ButtonLoading>
                </div>
            </ModalFooter>
        </Fragment>
    );
};

export default ModalFilter;