import {
    useContext
}                                   from 'react';
import {
    Col,
    Row,
    Card,
    Form,
    Progress,
    Button
}                                   from 'reactstrap';

import moment                       from 'moment';
import Select                       from 'react-select';
import Flatpickr                    from 'react-flatpickr'
import { selectThemeColors }        from '@utils'
import { useForm, Controller }      from "react-hook-form";

//Context
import {PerformanceContext}         from '../../context/PerformanceContext';

import '@styles/react/libs/flatpickr/flatpickr.scss'

const ChartFilter = ({setChartFilter}) => {

    const { workunitOptions }       = useContext(PerformanceContext);

    const { 
        reset,
        control, 
        handleSubmit, 
        formState   : { errors }
    }                               = useForm();

    const handleSubmit_ = (data) => {
        setChartFilter(data);
    };

    return (
        <Form onSubmit = {handleSubmit(handleSubmit_)}>
            <p className="pt-1">Set Periode</p>
            <Row>
                <Col md={6}>
                    Dari
                </Col>
                <Col md={6}>
                    Sampai
                </Col>
            </Row>
            <Row className="pt-1">
                <Col md={6}>
                    <Controller
                        as      = {
                            <Flatpickr 
                                options     = {{ dateFormat: "d-m-Y"}}
                                className   = 'form-control' 
                                placeholder = {moment().format('D-M-YYYY')}
                            />
                        }
                        name    = "start_date"
                        rules   = {{required: true}}
                        control = {control}
                    />
                </Col>
                <Col md={6}>
                    <Controller
                        as      = {
                            <Flatpickr 
                                options     = {{ dateFormat: "d-m-Y"}}
                                className   = 'form-control' 
                                placeholder = {moment().format('D-M-YYYY')}
                            />
                        }
                        name    = "end_date"
                        rules   = {{required: true}}
                        control = {control}
                    />
                </Col>
            </Row>

            <Controller
                as      = {
                    <Select 
                        theme           = {selectThemeColors}
                        options         = {workunitOptions}
                        onChange        = {(e)=>{onChange(e)}}
                        className       = 'react-select pt-1'
                        placeholder     = "Satuan Kerja"
                        classNamePrefix = 'select'
                    />
                }
                name    = "workunit_id"
                rules   = {{required: true}}
                control = {control}
            />

            <div className="d-flex justify-content-between pt-2">
                <Button 
                    color   = "primary" 
                    onClick = {() => {
                            reset({
                                workunit_id     : null,
                            }); 
                            setCharFilter(null)
                        }
                    }
                    outline 
                >
                    Set Ulang
                </Button>
                <Button color="primary" type="Submit">
                    Filter
                </Button>
            </div>

        </Form>
    )
};

export default ChartFilter;