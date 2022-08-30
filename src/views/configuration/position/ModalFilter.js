import { Fragment, useEffect, useState }    from "react";
import {
    Row,
    Col,
    Label,
    Button,
    FormGroup,
    ModalFooter,
    CustomInput,
} from "reactstrap";

import SelectOptionsService                 from '@src/services/pages/select-options';

//Component
import CustomToast                          from "../../../components/widgets/custom-toast";

//API
import PositionApi                          from "../../../services/pages/configuration/position";

const typeOptions = [
    { key: "1", value: 1, label: 'PELAKSANA' },
    { key: "2", value: 2, label: 'FUNGSIONAL' },
    { key: "3", value: 3, label: 'STRUKTURAL' },
];


const ModalFilter = (props) => {
    const {
        onReset,
        setListData
    } = props;

    //State
    const [sector,setSector]                                = useState(null);
    const [newsType, setNewsType]                           = useState("latest");
    const [positionType,setPositionType]                    = useState(null);
    const [workunitLevel,setWorkunitLevel]                  = useState(null);
    const [sectorOptions, setSectorOptions]                 = useState(false);
    const [workUnitLevelOptions, setworkUnitLevelOptions]   = useState(false);

    const WorkUnitLevelOptions = () => {
        SelectOptionsService.workUnitLevel({
            onSuccess: (res) => {
                setworkUnitLevelOptions(res);
            }, onFail: (err) => {
                CustomToast("danger", err.message);
            }
        })
    };

    const onFilter = () => {
        setListData(false);

        let dataFilter = {
            order_by            : newsType,
            position_type       : parseInt(positionType),
            workunit_level_id   : parseInt(workunitLevel),
            sector_id           : parseInt(sector)
        } 

        PositionApi.filter({
            data : dataFilter,
            onSuccess : (res) => {
                setListData(res.position);
            },
            onFail : (err) => {
            }
        })
    };

    const SectorOptions = () => {
        SelectOptionsService.sector({
            onSuccess: (res) => {
                setSectorOptions(res);
            }, onFail: (err) => {
                CustomToast("danger", err.message);
            }
        })
    };

    useEffect(() => {
        WorkUnitLevelOptions();
    }, []);

    useEffect(() => {
        SectorOptions();
    }, []);

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
                                block 
                                color   = "primary" 
                                outline 
                                onClick = {() => setNewsType("latest")}
                            >
                                Terbaru
                            </Button.Ripple>
                        }
                    </Col>
                    <Col className="mr-1">
                        {
                            (newsType === "longest") ? <Button.Ripple block className="ml-1" color="primary">
                                Terlama
                            </Button.Ripple> : 
                            <Button.Ripple 
                                color       = "primary" 
                                block 
                                outline
                                className   = "ml-1" 
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
                    <CustomInput 
                        id          = 'select-custom' 
                        type        = 'select'  
                        onChange    = {(e) => {setPositionType(e.target.value)}}
                    >
                        <option 
                            value    = ""
                            disabled 
                            selected 
                        >
                            Pilih Tipe Jabatan
                        </option>
                        {
                            typeOptions.map((data, i) => (
                                <option 
                                    key     = {data.key}
                                    value   = {data.value}
                                >
                                    {data.label}
                                </option>
                            ))
                        }
                    </CustomInput>
                </div>
            </FormGroup>
            <FormGroup>
                <Label for='id'>Satuan Kerja</Label>
                <div id="workunit-position">
                    <CustomInput 
                        id       = 'select-custom'  
                        type     = 'select'  
                        onChange = {(e) => {setWorkunitLevel(e.target.value)}}
                    >
                        <option 
                            value    = ""
                            disabled
                            selected 
                        >
                            Pilh Satuan Kerja
                        </option>
                        {
                            workUnitLevelOptions && 
                            workUnitLevelOptions.map((data) => (
                                <option 
                                    key   = {data.key} 
                                    value = {data.value}
                                >
                                    {data.label}
                                </option>
                            ))
                        }
                    </CustomInput>
                </div>
            </FormGroup>
            <FormGroup>
                <Label for='id'>Unit Kerja</Label>
                <div id="units-position">
                    <CustomInput 
                        id          = 'select-custom'  
                        type        = 'select'  
                        onChange    = {(e) => {setSector(e.target.value)}}
                    >
                        <option 
                            value    = ""
                            disabled 
                            selected 
                        > 
                            Pilh Unit Kerja 
                        </option>
                        {
                            sectorOptions && 
                            sectorOptions.map((data) => (
                                <option 
                                    key={data.key} 
                                    value={data.value}
                                >
                                    {data.label}
                                </option>
                            ))
                        }
                    </CustomInput>
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
                    <Button.Ripple 
                        color   = 'primary' 
                        onClick = {onFilter}
                    >
                        Terapkan
                    </Button.Ripple>
                </div>
            </ModalFooter>
        </Fragment>
    );
};

export default ModalFilter;