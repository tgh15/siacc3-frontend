import {
    Label,
    Button,
    FormGroup,
    CustomInput,
    ModalFooter,
} from "reactstrap";

// React
import { Fragment, useEffect, useState }    from "react";
import moment                               from "moment";
import Flatpickr                            from 'react-flatpickr';
import Select                               from 'react-select';
import { selectThemeColors }                from '@utils';

//Css
import '@styles/react/libs/flatpickr/flatpickr.scss';

//Services
import workunitListAPI                      from "../../../services/pages/configuration/unit-work-list/WorkunitList";

//Components
import CustomToast                          from "../../../components/widgets/custom-toast";


const ModalFilter = ({ setPageActive, setFilter, onReset, setSearchTerm, onFilter }) => {
    //State
    const [picker, setPicker]                   = useState(null);
    const [workunit, setWorkunit]               = useState(false);
    const [filterType, setFilterType]           = useState(null);
    const [workunitOptions, setWorkunitOptions] = useState(null);

    const typeOptions = [
        { key: "1", value: "time", label: 'Waktu' },
        { key: "2", value: "origin", label: 'Satuan Kerja' },
    ];

    const WorkunitOptions = () => {
        workunitListAPI.getAllWorkunitList().then(
            res => {
                if (!res.is_error) {
                    let newData = [];

                    res.data.map((data, i) => (
                        newData.push({
                            key   : i,
                            value : data.id,
                            label : data.name
                        })
                    ))

                    setWorkunitOptions(newData);
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

    useEffect(() => {
        WorkunitOptions();
    }, []);

    const onClickReset = () => {
        setPageActive(1);
        setFilter("all");
        setSearchTerm(null);
        onReset();
    };

    const onSubmit = () => {
        setPageActive(1);
        setFilter(filterType == "time" ? "time" : "origin");
        setSearchTerm((filterType == "origin") ? workunit : moment(new Date(picker)).format("YYYY-MM-DD") );
        onFilter();
    };

    return (
        <Fragment>
            <FormGroup>
                <Label for='id'>Filter</Label>
                <div id="activity-filter">
                    <Select
                        name            = 'sector_id'
                        theme           = {selectThemeColors}
                        options         = {typeOptions}
                        onChange        = {(e) => { setFilterType(e.value)}}
                        className       = 'react-select'
                        placeholder     = "Pilih Filter"
                        classNamePrefix = 'select'
                    />
                </div>
            </FormGroup>
            {
                filterType == "time" ?
                    <Fragment>
                        <FormGroup>
                            <Label>Tanggal</Label>
                            <Flatpickr 
                                id              = 'default-picker'
                                onChange        = {date => setPicker(date)} 
                                className       = 'form-control' 
                                defaultValue    = {picker} 
                            />
                        </FormGroup>
                    </Fragment>
                : null
            }

            {
                filterType == "origin" ?
                    <Fragment>
                        <FormGroup>
                            <Label for='id'>Satuan Kerja</Label>
                            <Select
                                name            = 'sector_id'
                                block
                                theme           = {selectThemeColors}
                                options         = {workunitOptions}
                                onChange        = {(e) => { setWorkunit(e.value)}}
                                className       = 'react-select'
                                isClearable
                                placeholder     = "Pilih Unit Kerja"
                                classNamePrefix = 'select'
                            />
                        </FormGroup>
                    </Fragment>
                : null
            }

            <ModalFooter className="d-flex justify-content-center">
                <div id="activity-reset">
                    <Button.Ripple 
                        color   = 'primary' 
                        outline 
                        onClick = {() => { onClickReset() }}
                    >
                        Reset
                    </Button.Ripple>
                </div>
                <div id="activity-apply">
                    <Button.Ripple 
                        color   = 'primary' 
                        onClick = {() => { onSubmit() }}
                    >
                        Terapkan
                    </Button.Ripple>
                </div>
            </ModalFooter>
        </Fragment>
    );
};

export default ModalFilter;