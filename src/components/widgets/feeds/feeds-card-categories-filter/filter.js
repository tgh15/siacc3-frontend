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
import { MapPin } from 'react-feather'
import ModalSelectWorkunit from '../../../../views/configuration/user-management/ModalSelectWorkunit'

export const FeedsFilterModal = (props) => {

    const {title, showing, setShow, onFilter, workunitOptions} = props;
    const [orderBy, setOrderBy] = useState('asc');


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
                        <Label>Urutkan</Label>
                        <p>
                            <Button 
                                outline = { orderBy == "asc" ? false : true} 
                                onClick = {() => setOrderBy('asc')}
                                color   = "primary"
                            >
                                Terbaru
                            </Button>
                            &nbsp;
                            <Button 
                                outline = { orderBy == "desc" ? false : true}
                                onClick = {() => setOrderBy('desc')}
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