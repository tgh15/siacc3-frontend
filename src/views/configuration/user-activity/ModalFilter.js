import { 
    Fragment,
    useContext
}                                           from "react";

import {
    Form,
    Label,
    Button,
    FormGroup,
    CustomInput,
    ModalFooter,
}                                           from "reactstrap";
import moment                               from "moment";
import Flatpickr                            from 'react-flatpickr';
import Select                               from 'react-select'
import { useForm, Controller }              from "react-hook-form";
import { selectThemeColors }                from '@utils'
import { PerformanceContext }               from '../../../context/PerformanceContext'

//Css
import '@styles/react/libs/flatpickr/flatpickr.scss';

const ModalFilter = (props) => {

    const {
        setFilterType,
        selectedDetail,
        setFilterValue,
        setFilterModal,
    }                                           = props;

    const { workunitOptions }                   = useContext(PerformanceContext);

    const onClickReset = () => {
        setFilterType(null);
        setFilterValue(null);
        setFilterModal(false);
    };

    const onSubmit = (data) => {
        console.log(data);
        if(!selectedDetail){
            setFilterType('workunit');
            setFilterValue(data.workunit.label);
        }else{
            setFilterType('date');
            setFilterValue({
                from : moment(data.from[0]).format('YYYY-MM-DD'),
                to   : moment(data.to[0]).format('YYYY-MM-DD')
            })
        }

        setFilterModal(false);
    };

    const { 
        control, 
        handleSubmit, 
    }                           = useForm();

    return (
        <Fragment>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {
                    selectedDetail ?
                        <>
                            <FormGroup>
                                <Label>Tanggal Mulai</Label>
                                <Controller
                                    as      = {
                                        <Flatpickr 
                                            id          = 'from' 
                                            options     = {{ dateFormat: "d-m-Y"}}
                                            className   = 'form-control' 
                                            placeholder = {moment().format('D-M-YYYY')}
                                        />
                                    }
                                    name    = "from"
                                    rules   = {{required: true}}
                                    control = {control}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Tanggal Selesai</Label>
                                <Controller
                                    as      = {
                                        <Flatpickr 
                                            id          = 'to' 
                                            options     = {{ dateFormat: "d-m-Y"}}
                                            className   = 'form-control' 
                                            placeholder = {moment().format('D-M-YYYY')}
                                        />
                                    }
                                    name    = "to"
                                    rules   = {{required: true}}
                                    control = {control}

                                />
                            </FormGroup>
                        </>
                    : 
                        null
                }

                {
                    !selectedDetail ?
                        <FormGroup>
                            <Label for='id'>Satuan Kerja</Label>
                            <Controller
                                name    = "workunit"
                                control = {control}
                                as      = {
                                    <Select
                                        id              = "workunit" 
                                        theme           = {selectThemeColors}
                                        options         = {workunitOptions}
                                        className       = 'react-select'
                                        placeholder     = "Pilih Satker"
                                        isClearable
                                        classNamePrefix = 'select'
                                    />
                                }
                            />
                        </FormGroup>
                    : 
                        null
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
                        <Button
                            color   = 'primary'
                            type    = "submit"
                        >
                            Terapkan
                        </Button>
                    </div>
                </ModalFooter>
            </Form>
        </Fragment>
    );
};

export default ModalFilter;