import React, { useContext, useEffect, useState }               from 'react'

import {
        Row,
        Col,
        Form, 
        Label, 
        Button, 
        FormGroup,
        InputGroup,
        InputGroupText,
        Input, 
    }                                           from 'reactstrap'
import moment                                   from 'moment'
import Select                                   from 'react-select'
import Flatpickr                                from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'

//Widget
import { ModalBase }                            from '../../modals-base'
import { selectThemeColors }                    from '@utils'

//Form
import { useForm, Controller }                  from "react-hook-form";

import { PerformanceContext }                   from '../../../../context/PerformanceContext'

export const FeedsCategoriesFilterModal = (props) => {

    const {
        title, 
        showing, 
        setShow, 
        onFilter,
    } = props;

    const { 
        reset,
        control,
        handleSubmit,
    }                                   = useForm();

    const { workunitOptions }           = useContext(PerformanceContext);

    const [kind, setKind]               = useState(2);
    const [orderBy, setOrderBy]         = useState('latest');
    const [publishType, setPublishType] = useState('national');


    const handleSubmit_ = (data) => {
        const formData = {
            kind        : kind,
            workunit    : [],
            order_by    : orderBy,
            filter_type : "home",
            publish_type: 'publish_type'
        }

        if(data.workunit != undefined){

            let workunit_ = [];
            data.workunit.map((data) => (
                workunit_.push(data.value)
            ))

            formData.workunit = workunit_;
        }

        if(data.start_date != undefined) {
           formData.start_date = moment(data.start_date[0]).format('YYYY-MM-DD')
        }

        if(data.end_date != undefined){
            formData.end_date = moment(data.end_date[0]).format('YYYY-MM-DD')
        }

        onFilter(formData);
        setShow(false);
    };

    const handleReset   = () => {
        const formData = {
            workunit    : [],
            order_by    : 'latest',
            filter_type : "home",
        };

        reset({workunit: []});        
        setKind(2);
        setShow(false);
        onFilter(formData);
        setOrderBy('latest');
    }

    return(
        <>
            <ModalBase 
                size        = "lg"
                show        = {showing}
                title       = {title}
                setShow     = {setShow}
                unmount     = {false}
            >
                <Form onSubmit={handleSubmit(handleSubmit_)}>
                    <FormGroup>
                        <Label>Jenis Berita</Label>
                        <p>
                            <Button
                                onClick = {()=>{setKind(2)}} 
                                outline = {kind !== 2} 
                                color   = {"primary"}
                            >
                                Nasional
                            </Button>
                            &nbsp;

                            <Button 
                                onClick = {()=>{setKind(1)}} 
                                outline = {kind !== 1} 
                                color   = {"primary"}
                            >
                                Lokal
                            </Button>
                        </p>
                    </FormGroup>

                    <FormGroup>
                        <Label>Jenis Publikasi</Label>
                        <p>
                            <Button
                                onClick = {()=>{setPublishType('national')}} 
                                outline = {publishType !== 'national'} 
                                color   = {"primary"}
                            >
                                Nasional
                            </Button>
                            &nbsp;

                            <Button 
                                onClick = {()=>{setPublishType('local')}} 
                                outline = {publishType !== 'local'} 
                                color   = {"primary"}
                            >
                                Lokal
                            </Button>
                        </p>
                    </FormGroup>

                    <FormGroup>
                        <Label>Urutkan</Label>
                        <p>
                            <Button 
                                outline = {orderBy !== "popular_topics"} 
                                onClick = {() => {setOrderBy("popular_topics")}} 
                                color   = "primary"
                            >
                                Topik Populer
                            </Button>
                            &nbsp;
                            <Button 
                                outline = {orderBy !== "latest"} 
                                onClick = {() => {setOrderBy("latest")}} 

                                color   = "primary"
                            >
                                Terbaru
                            </Button>
                            &nbsp;
                            <Button 
                                outline = {orderBy  !== "longest"} 
                                onClick = {() => {setOrderBy("longest")}} 
                                color   = "primary"
                            >
                                Terlama
                            </Button>
                            &nbsp;
                            <Button 
                                outline = {orderBy !== "rarely_seen"} 
                                onClick = {() => {setOrderBy("rarely_seen")}} 
                                color   = "primary"
                            >
                                Jarang Dilihat
                            </Button>

                        </p>
                    </FormGroup>

                    <FormGroup>
                        <Label>Waktu</Label>
                        <Row>
                            <Col md="6">
                                <Label>
                                    Tanggal Mulai
                                </Label>
                                <Controller
                                    name    = "start_date"
                                    control = {control}
                                    as      = {
                                        <Flatpickr 
                                            id          = 'start_date' 
                                            options     = {{ dateFormat: "d-m-Y"}}
                                            className   = 'form-control' 
                                            placeholder = {moment().format('YYYY-MM-DD')}
                                        />
                                    }
                                />
                            </Col>
                            <Col md="6">
                                <Label>
                                    Tanggal Selesai
                                </Label>
                                <Controller
                                    name    = "end_date"
                                    control = {control}
                                    as      = {
                                        <Flatpickr 
                                            id          = 'end_date' 
                                            options     = {{ dateFormat: "d-m-Y"}}
                                            className   = 'form-control' 
                                            placeholder = {moment().format('YYYY-MM-DD')}
                                        />
                                    }
                                />
                                
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup>
                        <Label>Satuan Kerja</Label>    
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
                                    isMulti
                                    classNamePrefix = 'select'
                                />
                            }
                        />
                    </FormGroup>

                    <FormGroup className="text-center">
                        <Button 
                            type    = "reset" 
                            outline 
                            color   = "primary" 
                            onClick = {() => { handleReset() }}
                        >
                            Reset
                        </Button>&nbsp;
                        <Button color="primary" type="submit">Terapkan</Button>
                    </FormGroup>
                </Form>

            </ModalBase>
        </>
    )
}