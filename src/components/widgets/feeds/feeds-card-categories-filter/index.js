import React, { 
    useState,
    useEffect, 
    useContext, 
}                                               from 'react'

import {
        Row,
        Col,
        Form, 
        Label, 
        Button, 
        FormGroup,
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
    }                                           = useForm();

    const { workunitOptions }                   = useContext(PerformanceContext);

    const [kind, setKind]                       = useState(2);
    const [orderBy, setOrderBy]                 = useState('latest');
    const [publishType, setPublishType]         = useState('national');



    const handleSubmit_ = (data) => {
        const formData = {
            kind        : kind,
            workunit    : [],
            order_by    : orderBy,
            filter_type : "home",
            publish_type: publishType
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

        setShow(false);
        onFilter(formData);
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
        setPublishType('national');
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
                                id      = {"beranda_filter_national_news_kind"}
                                color   = {"primary"}
                                onClick = {()=>{setKind(2)}} 
                                outline = {kind !== 2} 
                            >
                                Nasional
                            </Button>
                            &nbsp;

                            <Button 
                                id      = {"beranda_filter_local_news_kind"}
                                color   = {"primary"}
                                onClick = {()=>{setKind(1)}} 
                                outline = {kind !== 1} 
                            >
                                Lokal
                            </Button>
                        </p>
                    </FormGroup>

                    <FormGroup>
                        <Label>Jenis Publikasi</Label>
                        <p>
                            <Button
                                id      = {"beranda_filter_national_publication_kind"}
                                color   = {"primary"}
                                onClick = {()=>{setPublishType('national')}} 
                                outline = {publishType !== 'national'} 
                            >
                                Nasional
                            </Button>
                            &nbsp;

                            <Button 
                                id      = {"beranda_filter_local_publication_kind"}
                                color   = {"primary"}
                                onClick = {()=>{setPublishType('local')}} 
                                outline = {publishType !== 'local'} 
                            >
                                Lokal
                            </Button>
                        </p>
                    </FormGroup>

                    <FormGroup>
                        <Label>Urutkan</Label>
                        <p>
                            <Button 
                                id      = {"beranda_filter_order_popular"}
                                color   = "primary"
                                outline = {orderBy !== "popular_topics"} 
                                onClick = {() => {setOrderBy("popular_topics")}} 
                            >
                                Topik Populer
                            </Button>
                            &nbsp;
                            <Button 
                                id      = {"beranda_filter_order_latest"}
                                color   = "primary"
                                outline = {orderBy !== "latest"} 
                                onClick = {() => {setOrderBy("latest")}} 
                            >
                                Terbaru
                            </Button>
                            &nbsp;
                            <Button
                                id      = {"beranda_filter_order_oldest"} 
                                color   = "primary"
                                outline = {orderBy  !== "longest"} 
                                onClick = {() => {setOrderBy("longest")}} 
                            >
                                Terlama
                            </Button>
                            &nbsp;
                            <Button
                                id      = {"beranda_filter_order_rarely"}
                                color   = "primary"
                                outline = {orderBy !== "rarely_seen"} 
                                onClick = {() => {setOrderBy("rarely_seen")}} 
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
                                            id          = 'beranda_filter_start_date' 
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
                                            id          = 'beranda_filter_end_date' 
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
                            id      = 'beranda_filter_end_date' 
                            name    = "workunit"
                            control = {control}
                            as      = {
                                <Select
                                    id              = "beranda_filter_workunit" 
                                    theme           = {selectThemeColors}
                                    isMulti
                                    options         = {workunitOptions}
                                    className       = 'react-select'
                                    placeholder     = "Pilih Satker"
                                    isClearable
                                    classNamePrefix = 'select'
                                />
                            }
                        />
                    </FormGroup>

                    <FormGroup className="d-flex justify-content-between">
                        <Button 
                            id      = "beranda_filter_reset_button"
                            type    = "reset" 
                            color   = "primary" 
                            outline 
                            onClick = {() => { handleReset() }}
                        >
                            Reset
                        </Button>
                        &nbsp;
                        <Button 
                            id      = "beranda_filter_submit_button"
                            type    = "submit"
                            color   = "primary" 
                        >
                            Terapkan
                        </Button>
                    </FormGroup>
                </Form>

            </ModalBase>
        </>
    )
}