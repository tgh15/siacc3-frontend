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
    }                                   = props;
    const [orderBy, setOrderBy]         = useState('latest');
    const [statusOrder, setStatusOrder] = useState(localStorage.getItem('role') === 'Verifikator Pusat' ? 'desc' : 'asc');

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
        formData.status_order       = statusOrder;

        if(formData.workunit_id != undefined) {
            formData.work_unit_id_list = [formData.workunit_id.value];
        }else{
            formData.work_unit_id_list = [];
        }
        onFilter({type: 'filter', value:formData});
        setShow();
    };

    useEffect(()=>{
    },[showing]);

    return(
        <>

            <BaseModal {...modalData} size="lg">
                <Form onSubmit={handleSubmit(handleSubmit_)}>

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
                                    id = "workunit_id" 
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    placeholder="Pilih Satker"
                                    options={workunitOptions}
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
                            onClick = {() => {reset();setShow();onFilter(null)}}
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