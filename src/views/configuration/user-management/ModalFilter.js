import { Fragment, useContext, useState }   from "react";
import {
    Row,
    Col,
    Label,
    Button,
    FormGroup,
    ModalFooter,
} from "reactstrap";

import "./UserManagement.scss";
import Select                               from 'react-select';
import { selectThemeColors }                from '@utils';

//Context
import { UserManagementContext }            from "../../../context/UserManagementContext";

//API
import UserManagementApi                    from "../../../services/pages/configuration/user-management";


const ModalFilter = ({ setModalFilter,onFilter }) => {
    //Context
    const { getData, setListData, workunitOptions } = useContext(UserManagementContext);

    //State
    const [kejati, setKejati]       = useState([]);
    const [kejari, setKejari]       = useState([]);
    const [cabjari, setCabjari]     = useState([]);
    const [newsType, setNewsType]   = useState("latest");

    const handleFilter = () => {
        let workunits = kejati.concat(kejari).concat(cabjari);

        let datas = {
            order_by    : newsType,
            workunit_id : Array.from(workunits, workunit => workunit.value)
        };

        onFilter(datas)
    };

    return (
        <Fragment>
            <FormGroup>
                <Label>Urutkan</Label>
                <Row id="user-manajement-order">
                    <Col>
                        {(newsType === "latest") ? <Button.Ripple block color="primary">Terbaru</Button.Ripple> : <Button.Ripple outline block color="primary" onClick={() => setNewsType("latest")}>Terbaru</Button.Ripple>}
                    </Col>
                    <Col className="mr-1">
                        {(newsType === "longest") ? <Button.Ripple block className="ml-1" color="primary">Terlama</Button.Ripple> : <Button.Ripple outline block className="ml-1" color="primary" onClick={() => setNewsType("longest")}>Terlama</Button.Ripple>}
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
            <ModalFooter className="d-flex justify-content-center">
                <div id="user-manajement-reset">
                    <Button 
                        color   = 'primary' 
                        outline 
                        onClick = {() => { 
                            getData({
                                page : 1,
                                params : {}
                            }); 
                        setModalFilter(false) }}
                    >
                        Reset
                    </Button>
                </div>
                <div id="user-manajement-apply">
                    <Button 
                        color   = 'primary' 
                        onClick = {() => handleFilter()}
                    >
                        Terapkan
                    </Button>
                </div>
            </ModalFooter>
        </Fragment>
    );
};

export default ModalFilter;