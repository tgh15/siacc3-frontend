import React, { useEffect, useState }           from 'react'
import {
        Form,
        Label, 
        Button, 
        FormGroup,
        Input,
        InputGroup,
        InputGroupText, 
    }                                           from 'reactstrap'
import Select                                   from 'react-select'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import { selectThemeColors }                    from '@utils'

//Widget
import { ModalBase as BaseModal }               from '../../modals-base'
import { useForm, Controller }                  from "react-hook-form";


export const FeedsFilterModal = (props) => {

    const {
        title, 
        showing, 
        setShow, 
        onFilter, 
        workunitOptions
    }                                       = props;
    const [orderBy, setOrderBy]             = useState('latest');
    const [statusPublish, setStatusPublish] = useState(null);

    const { 
        reset,
        control, 
        handleSubmit,
    }                               = useForm();

    const modalData = {
        show        : showing,
        title       : title,
        setShow     : setShow
    }

    const handleSubmit_ = (formData) => {
        formData.order_by           = orderBy;

        if(statusPublish != null){
            formData.status_publish = statusPublish;
        }
        // formData.status_order       = statusOrder;

        if(formData.workunit_id != undefined) {
            formData.work_unit_id_list = [formData.workunit_id.value];
        }else{
            formData.work_unit_id_list = [];
        }
        
        onFilter({type: 'filter', value:formData});
        setShow();
    };

    return(
        <>

            <BaseModal {...modalData} size="lg">
                <Form onSubmit={handleSubmit(handleSubmit_)}>

                    {/* {
                        (localStorage.getItem('role') === 'Verifikator Pusat' || localStorage.getItem('role') === 'Admin') &&
                        <FormGroup>
                            <Label>Urutkan Berdasarkan Jenis Persetujuan</Label>
                            <p>
                                <Button 
                                    outline = { statusOrder == "asc" ? false : true} 
                                    onClick = {() => setStatusOrder('asc')}
                                    color   = "primary"
                                >
                                    Verifikator Daerah
                                </Button>
                                &nbsp;
                                <Button 
                                    outline = { statusOrder == "desc" ? false : true}
                                    onClick = {() => setStatusOrder('desc')}
                                    color   = "primary"
                                >
                                    Verifikator Pusat
                                </Button>
                            </p>
                        </FormGroup>
                    } */}

                    {
                        (localStorage.getItem('role') === 'Verifikator Pusat' || localStorage.getItem('role') === 'Admin') &&
                        <FormGroup>
                            <Label>Filter Berdasarkan Jenis Persetujuan</Label>
                            <p>
                                <Button 
                                    outline = { statusPublish == null ? false : true} 
                                    onClick = {() => setStatusPublish(null)}
                                    color   = "primary"
                                >
                                    Verifikator Pusat
                                </Button>
                                &nbsp;
                                <Button 
                                    outline = { statusPublish == "approve" ? false : true}
                                    onClick = {() => setStatusPublish("approve")}
                                    color   = "primary"
                                >
                                    Verifikator Daerah
                                </Button>
                                &nbsp;
                                <Button 
                                    outline = { statusPublish == "all" ? false : true}
                                    onClick = {() => setStatusPublish('all')}
                                    color   = "primary"
                                >
                                    Semua
                                </Button>
                            </p>
                        </FormGroup>
                    }

                    <FormGroup>
                        <Label>Urutkan Berdasarkan Tanggal Berita</Label>
                        <p>
                            <Button 
                                outline = { orderBy == "latest" ? false : true} 
                                onClick = {() => setOrderBy('latest')}
                                color   = "primary"
                            >
                                Terbaru
                            </Button>
                            &nbsp;
                            <Button 
                                outline = { orderBy == "longest" ? false : true}
                                onClick = {() => setOrderBy('longest')}
                                color   = "primary"
                            >
                                Terlama
                            </Button>
                        </p>
                    </FormGroup>

                    <FormGroup>
                        <Label>Satuan Kerja</Label>
                        <Controller
                            name    = "workunit_id"
                            control = {control}
                            as      = {
                                <Select
                                    id              = "workunit_id" 
                                    theme           = {selectThemeColors}
                                    options         = {workunitOptions}
                                    className       = 'react-select'
                                    placeholder     = "Pilih Satker"
                                    classNamePrefix = 'select'
                                    isClearable
                                />
                            }
                        />
                    </FormGroup>
                    
                    <FormGroup className="text-center">
                        <Button 
                            type="reset" 
                            outline 
                            color="primary" 
                            onClick = {() => {
                                reset();
                                setShow();
                                onFilter(null);
                                setOrderBy('latest')
                                setStatusPublish(null);
                            }}
                        >
                            Reset
                        </Button>
                        &nbsp;
                        <Button 
                            type="submit" 
                            color="primary"
                        >
                            Terapkan
                        </Button>
                    </FormGroup>
                </Form>

            </BaseModal>
        </>
    )
}