import { Fragment, useContext, useState }   from "react";
import { 
    Col, 
    Row, 
    Label, 
    Button,
    FormGroup, 
    ModalFooter, 
}                                           from "reactstrap";
import Select                               from "react-select"
import { selectThemeColors }                from '@utils';


//Components
import ButtonLoading                        from "../../../components/widgets/loading-button";
import { UserManagementContext }            from "../../../context/UserManagementContext";



const FilterForm = (props) => {
    const  {
        loading,
        onFilter
    } = props;

    //State
    const [order, setOrder]                     = useState("latest");
    const [kejati, setKejati]                   = useState([]);
    const [kejari, setKejari]                   = useState([]);
    const [cabjari, setCabjari]                 = useState([]);

    //context
    const { workunitOptions } = useContext(UserManagementContext);

    //Handle Filter
    const handleFilter      = () => {
        
        let workunitId_     = [];


        if(kejati.length > 0){
            kejati.map((data) => (workunitId_.push(data.value)));
        }
        
        if(kejari.length > 0){
            kejari.map((data) => (workunitId_.push(data.value)))
        }

        if(cabjari.length > 0){
            cabjari.map((data) => (workunitId_.push(data.value)))
        }

        onFilter({order : order, workunit_id : workunitId_})};
    
    return (
        <Fragment>
            <FormGroup>
                <Label>Urutkan</Label>
                <Row id="workunitlist-filter">
                    <Col>
                        {
                            (order === "latest") ?
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
                                    onClick = {() => setOrder("latest")}
                                >
                                    Terbaru
                                </Button.Ripple>
                        }
                    </Col>
                    <Col className="mr-1">
                        {
                            (order === "longest") ?
                                <Button.Ripple 
                                    block 
                                    color       = "primary"
                                    className   = "ml-1" 
                                >
                                    Terlama
                                </Button.Ripple>
                            :
                                <Button.Ripple
                                    block 
                                    color       = "primary" 
                                    outline 
                                    onClick     = {() => setOrder("longest")}
                                    className   = "ml-1" 
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
                        options         = {workunitOptions.filter(opt => opt.workunit_level_id == 2)}
                        isMulti
                        onChange        = {(e) => { setKejati(e); }}
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
                <div id="workunitlist-apply">
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

export default FilterForm;