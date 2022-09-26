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

//Css
import '@styles/react/libs/flatpickr/flatpickr.scss';

//Components
import CustomToast                          from "../../../components/widgets/custom-toast";
import SelectOptionsService                 from '@src/services/pages/select-options';

const ModalFilter = (props) => {

    const { 
        setFilterType,
        selectedDetail,
        setFilterValue,
        setFilterModal,
    }                                           = props;
    
    const onClickReset = () => {
        setFilterType(null);
        setFilterValue(null);
        setFilterModal(false);
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
                    <CustomInput 
                        id          = 'select-custom' 
                        type        = 'select'
                        name        = 'sector_id' 
                        onChange    = {(e) => setFilterType(e.target.value)}
                    >
                        <option 
                            value    = ""
                            disabled 
                            selected 
                        >
                            Pilih Filter
                        </option>
                        {
                            selectedDetail == null ?
                                <option value="origin">Satuan Kerja</option>
                            :
                                <option value="time">Waktu</option>
                        }
                    </CustomInput>
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
                                defaultValue    ={picker} 
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
                            <CustomInput 
                                id          = 'select-custom' 
                                type        = 'select' 
                                name        = 'sector_id' 
                                onChange    = {(e) => setWorkunit(e.target.value)}
                            >
                                <option 
                                    value    = ""
                                    disabled 
                                    selected 
                                >
                                    Pilh Unit Kerja
                                </option>
                                {
                                    workunitOptions &&
                                    workunitOptions.map((data) => (
                                        <option 
                                            key   = {data.key} 
                                            value = {data.label}
                                        >
                                            {data.label}
                                        </option>
                                    ))
                                }
                            </CustomInput>
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