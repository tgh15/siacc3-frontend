import {
    useContext, useEffect, useState
}                               from 'react'
import {
    Col,
    Row, 
    Card,
    Form, 
    Button,
    Progress
}                               from 'reactstrap';
import { selectThemeColors }        from '@utils';
import { useForm, Controller }      from "react-hook-form";

import Flatpickr                    from 'react-flatpickr';
import Select                       from 'react-select';
import moment                       from 'moment';

import '@styles/react/libs/flatpickr/flatpickr.scss'

//Context
import {PerformanceContext}         from '../../context/PerformanceContext';
import {CategoryContext}            from '../../context/CategoryContext';


const GisFilter = (props) => {

const {
    setGisFilter, 
    chartByPeriod, 
    setSelectedMap,
    isWarningVisible,
}                               = props;

const { workunitOptions }       = useContext(PerformanceContext);
const { category }              = useContext(CategoryContext);

const { 
    reset,
    control, 
    handleSubmit, 
    formState   : { errors }
}                               = useForm();

const [categoryOptions, setCategoryOptions] = useState();
const [periodByChart, setPeriodeByChart]    = useState(null);

const handleSubmit_ = (data) => {
    setGisFilter(data);
};

useEffect(() => {

    let data_; 

    data_ = category.map((data) => (
        {
            label : data.name,
            value : data.id
        }
    ))

    setCategoryOptions(
        data_.filter((data) => (
            data.label != 'Semua' && data.label != 'Berita Pilihan'
        ))
    )
}, [category]); 

useEffect(() => {

    if(chartByPeriod != null && chartByPeriod.value != null){

        let data_ = [];

        chartByPeriod.labels.map((data, index) => (
            data_.push({
                name  : data,
                value : chartByPeriod.value[index]
            })
        ))

        setPeriodeByChart(data_.sort((a,b) => {return b.value - a.value}));
    }
    
}, [chartByPeriod])

return (
    <Card className="p-3">
        <Form onSubmit = {handleSubmit(handleSubmit_)}>
            <h4>Konfigurasi GIS</h4>

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
                // rules   = {{required: true}}
                control = {control}
            />
            <Controller
                as      = {
                    <Select 
                        theme           = {selectThemeColors}
                        options         = {
                            [{value: 1, label: 'Lokal' }, {value: 2, label: 'Nasional' }]
                        }
                        onChange        = {(e)=>{onChange(e)}}
                        className       = 'react-select pt-1'
                        placeholder     = "Jenis Publikasi"
                        classNamePrefix = 'select'
                    />
                }
                name    = "kind"
                // rules   = {{required: true}}
                control = {control}
            />
            <Controller
                as      = {
                    <Select 
                        theme           = {selectThemeColors}
                        options         = {
                            [{value: 'local', label: 'Lokal' }, {value: 'national', label: 'Nasional' }]
                        }
                        onChange        = {(e)=>{onChange(e)}}
                        className       = 'react-select pt-1'
                        placeholder     = "Berita Trending"
                        classNamePrefix = 'select'
                    />
                }
                name    = "trending_kind"
                // rules   = {{required: true}}
                control = {control}
            />
            <Controller
                as      = {
                    <Select 
                        theme           = {selectThemeColors}
                        options         = {categoryOptions}
                        onChange        = {(e)=>{onChange(e)}}
                        className       = 'react-select pt-1'
                        placeholder     = "Kategori"
                        isMulti
                        classNamePrefix = 'select'
                    />
                }
                name    = "category_id"
                control = {control}
            />

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
                        // rules   = {{required: true}}
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
                        // rules   = {{required: true}}
                        control = {control}
                    />
                </Col>
            </Row>

            <div className="d-flex justify-content-between pt-2">
                <Button 
                    color   = "primary" 
                    onClick = {() => {
                        reset({
                            kind            : null,
                            workunit_id     : null,
                            trending_kind   : null,
                        }); 
                        setGisFilter(null);
                        setSelectedMap(null);
                    }}
                    outline 
                >
                    Set Ulang
                </Button>
                <Button color="primary" type="Submit">
                    Filter
                </Button>
            </div>
            
            {
                isWarningVisible &&
                <Button
                    color       = "primary"
                    className   = "d-block mt-1"
                >
                    Untuk Membuat Report Harap Melakukan Filter Terlebih Dahulu!
                </Button>
            }
            
        </Form>
    </Card>
)
}

export default GisFilter;