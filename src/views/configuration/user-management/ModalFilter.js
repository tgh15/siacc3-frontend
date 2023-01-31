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
import { PerformanceContext } from "../../../context/PerformanceContext";
import { workunitAPI } from "../../../services/pages/configuration/workunit";


const ModalFilter = ({ setModalFilter, onFilter }) => {
    const { 
        workunitLevel2,
    }                                                   = useContext(PerformanceContext);
    //Context
    const { getData, workunitOptions } = useContext(UserManagementContext);

    //State
    const [kejati, setKejati]       = useState(null);
    const [kejari, setKejari]       = useState(null);
    const [cabjari, setCabjari]     = useState(null);
    const [newsType, setNewsType]   = useState("latest");

    const [workunitLevel3, setWorkunitLevel3] = useState(null);
    const [workunitLevel4, setWorkunitLevel4] = useState(null);

    const handleFilter = () => {
        console.log(kejati, kejari,cabjari);

        console.log(workunitLevel4, workunitLevel3)

        let workunit_id = [];

        if(kejati != null){
            workunit_id.push(kejati.value);
        }

        if(kejari != null){
            workunit_id.push(kejari.value);
        }

        if(cabjari != null){
            workunit_id.push(cabjari.value);
        }

        let datas = {
            order_by    : newsType,
            workunit_id : workunit_id
        };

        onFilter(datas)
    };

    const getChildWorkunit = (workunit_id, level) => {
        const formData = {
            parent_id     : workunit_id, 
            condition_by  : "child_list",
            include_parent: false,
        };

        workunitAPI.getWorkunitFilter(formData).then(
            res => {
                if(!res.is_error && res?.data?.length > 0){
                    
                    if(level === 3){
                        let level_3_ = res.data.map((data3) => ({
                            label : "KEJAKSAAN NEGERI " +data3.name,
                            value : data3.id
                        }))

                        if(level_3_.length > 0){
                            level_3_.unshift({label : 'SEMUA KEJAKSAAN NEGERI', value : (level_3_.map((data3) => (data3.value))).toString()})
                        }

                        setWorkunitLevel3(
                            level_3_
                        )
                    }
                    
                    if(level === 4){
                        let level_4_ = res.data.map((data4) => ({
                            label : "CABANG KEJAKSAAN NEGERI " + data4.name,
                            value : data4.id
                        }))

                        if(level_4_.length > 0){
                            level_4_.unshift({label : 'SEMUA CABANG KEJAKSAAN NEGERI', value : (level_4_.map((data4) => (data4.value))).toString()})
                        }
                        
                        setWorkunitLevel4(
                            level_4_
                        )
                    }
                }
            }
        )
    }

    return (
        <Fragment>
            <FormGroup>
                <Label>Urutkan</Label>
                <Row id="user-manajement-order">
                    <Col>
                        {
                            (newsType === "latest") ? 
                                <Button.Ripple 
                                    block 
                                    color = "primary"
                                >
                                    Terbaru
                                </Button.Ripple> 
                            :
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
                            (newsType === "longest") ? 
                                <Button.Ripple 
                                    block 
                                    color     = "primary"
                                    className = "ml-1"
                                >
                                    Terlama
                                </Button.Ripple> 
                            :
                                <Button.Ripple 
                                    block 
                                    color     = "primary" 
                                    outline 
                                    onClick   = {() => setNewsType("longest")}
                                    className = "ml-1" 
                                >
                                    Terlama
                                </Button.Ripple>
                        }
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <div id="user-manajement-kejati">
                    <Select
                        name            = 'clear'
                        block
                        theme           = {selectThemeColors}
                        options         = {workunitLevel2}
                        onChange        = {(e) => { setKejati(e); getChildWorkunit(e.value, 3) }}
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
                        options         = {workunitLevel3?.filter((data) => (data.label != 'SEMUA KEJAKSAAN NEGERI'))}
                        onChange        = {(e) => { setKejari(e); getChildWorkunit(e.value, 4) }}
                        className       = 'react-select'
                        isClearable
                        placeholder     = "Pilih Kejari"
                        classNamePrefix = 'select'
                        isDisabled      = {workunitLevel3 === null ? true : false}
                    />
                </div>
            </FormGroup>
            <FormGroup>
                <div id="user-manajement-capjari">
                    <Select
                        name            = 'clear'
                        block
                        theme           = {selectThemeColors}
                        options         = {workunitLevel4?.filter((data) => (data.label != 'SEMUA CABANG KEJAKSAAN NEGERI'))}
                        onChange        = {(e) => { setCabjari(e) }}
                        className       = 'react-select'
                        isDisabled      = {workunitLevel4 === null ? true : false}
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
                                page : 1
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