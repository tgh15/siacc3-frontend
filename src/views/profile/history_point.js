import React, { Fragment, useState } from 'react';
import {
    Form,
    Label, 
    Button,
    FormGroup,
    ListGroup,
    ListGroupItem,
}  from 'reactstrap';

import moment                        from 'moment';

// Component
import { ModalBase }                 from '../../components/widgets/modals-base';
import CustomTableBodyEmpty          from '../../components/widgets/custom-table/CustomTableBodyEmpty';
import CustomToast                   from '../../components/widgets/custom-toast'


import { useForm, Controller }       from "react-hook-form"
import Flatpickr                     from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Helper                        from '../../helpers';

const HistoryPoint = (props) => {

    const { 
        control, 
        handleSubmit, 
    }                                         = useForm();


    const [selectedFilter, setSelectedFilter] = useState(1);
    const [showFilterDate, setShowFilterDate] = useState(false);

    const [endDate, setEndDate]               = useState(null);
    const [startDate, setStartDate]           = useState(moment().format('DD-MM-YYYY'));

    const handleFilterHistory = (id) => {
        setSelectedFilter(id);
        
        if(id === 1){
            props.getHistoryPoint(localStorage.getItem('uuid'), "", "");
        }else if(id === 2){   
            props.getHistoryPoint(localStorage.getItem('uuid'), moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
        }else if(id === 3){
            props.getHistoryPoint(localStorage.getItem('uuid'), moment().subtract(7,'d').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
        }else if(id === 4){
            props.getHistoryPoint(localStorage.getItem('uuid'), moment().subtract(30,'d').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
        }else if(id === 5){
            setShowFilterDate(true);
        }
    };

    const handleSubmit_ = (formData) =>{ 
        if(startDate == null){
            CustomToast('warning', 'Tanggal mulai belum terisi');
        }else if(endDate == null){
            CustomToast('warning', 'Tanggal selesai belum terisi');
        }else{
            props.getHistoryPoint(localStorage.getItem('uuid'), moment(startDate, 'DD-MM-YYYY').format('YYYY-MM-DD'), moment(endDate, 'DD-MM-YYYY').format('YYYY-MM-DD'));
            setShowFilterDate(false);
        }
    }

    return (
        <Fragment>
            <Button
                size    = "sm"
                color   = 'primary'
                style   = {{cursor: 'pointer'}}
                outline
                onClick = {props.showHistoryPoint}
            >
                Riwayat Point
            </Button>

            {/* Custom Date Filter */}
            <ModalBase
                key     = "modal_filter_date_form"
                show    = {showFilterDate}
                title   = "Filter Berdasarkan Tanggal"
                setShow = {(param) => {setShowFilterDate(param)} }
            >
                <Form key="filter_date_form" onSubmit = {handleSubmit(handleSubmit_)}>
                <FormGroup>
                        <Label>Tanggal Mulai</Label>
                        <Flatpickr
                            id          = 'start_date' 
                            options     = {{ 
                                dateFormat  : "d-m-Y",
                            }}
                            className   = 'form-control' 
                            defaultValue= {moment().format('DD-MM-YYYY')}
                            onChange    = {(val) => {setStartDate(moment(val[0]).format('DD-MM-YYYY'))}}
                            placeholder = {moment().format('DD-MM-YYYY')}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Tanggal Selesai</Label>
                        <Flatpickr
                            id          = 'end_date' 
                            options     = {{ 
                                dateFormat  : "d-m-Y",
                                minDate     : moment(startDate,'DD-MM-YYYY').format('DD-MM-YYYY'),
                                maxDate     : moment(startDate,'DD-MM-YYYY').add(30,'d').format('DD-MM-YYYY'),
                            }}
                            className   = 'form-control'
                            onChange    = {(val) => {setEndDate(moment(val[0]).format('DD-MM-YYYY'))}}
                            placeholder = {moment().format('DD-MM-YYYY')}
                        />
                    </FormGroup>
                    <Label>Periode Pemilihan Hanya Berlaku 30 Hari.</Label>

                    <FormGroup className="d-flex justify-content-end">
                        <Button key="filter_date" type="submit" color="primary">
                            Cari
                        </Button>
                    </FormGroup>
                </Form>
            </ModalBase>

            <ModalBase
                size    = "lg"
                show    = {props.historyPointVisible}
                title   = "Detail Point"
                setShow = {() => {props.setHistoryPointVisible()}}
            >
                <p className="m-0">
                    Total Point &nbsp;
                    <b>{props.totalPoint} Point</b>
                </p>
                <p>
                    Progress &nbsp;
                    <b>
                        {props.badgeProfile.level_progress}%
                    </b>&nbsp;
                    Menuju Level &nbsp;
                    <b>
                        {props.badgeProfile.level+1}
                    </b>
                </p>

                <div className="d-flex demo-inline-spacing mb-2">
                <Button
                        key     = "filter_all"
                        color   = {selectedFilter === 1 ? "primary" : null}
                        onClick = {() => handleFilterHistory(1)} 
                    >
                        Semua
                    </Button>
                    <Button
                        key     = "filter_daily"
                        color   = {selectedFilter === 2 ? "primary" : null}
                        onClick = {() => handleFilterHistory(2)} 
                    >
                        Harian
                    </Button>
                    <Button
                        key     = "filter_weekly"
                        color   = {selectedFilter === 3 ? "primary" : null}
                        onClick = {() => handleFilterHistory(3)} 
                    >
                        Mingguan
                    </Button>
                    <Button
                        key     = "filter_monthly"
                        color   = {selectedFilter === 4 ? "primary" : null}
                        onClick = {() => handleFilterHistory(4)} 
                    >
                        Bulanan
                    </Button>
                    <Button
                        key     = "filter_custom"
                        color   = {selectedFilter === 5 ? "primary" : null}
                        onClick = {() => handleFilterHistory(5)} 
                    >
                        Filter
                    </Button>
                </div>

                {
                    props.historyPoint.length > 0 ?
                    props.historyPoint.map((data) => (
                        <div 
                            style       ={{padding: '5px', borderRadius: '7px', border: '1px solid #fff'}}
                            className   = "mb-2" 
                        >
                            <ListGroup>
                                <ListGroupItem active>
                                    <p className="text-center m-0">
                                        <b>{Helper.dateIndo1(data.date)}</b>
                                    </p>
                                </ListGroupItem>
                            </ListGroup>
                            {
                                data.data.length > 0 ?
                                data.data.map((data_) => (
                                    <ListGroup flush>
                                        <ListGroupItem 
                                            style       = {{padding: '0.5rem 0.7rem'}}
                                            className   = "d-flex justify-content-between align-items-center"
                                        >
                                            <span
                                            >
                                                {data_.note == "" ? "-" : data_.note}
                                            </span>
                                            <span
                                                style = {
                                                    data_.points > 0 ? 
                                                    { color: 'green' } : {color: 'red'}
                                                }
                                            >
                                                {data_.points} Point
                                            </span>
                                        </ListGroupItem>
                                    </ListGroup>
                                )) : null
                            }
                        </div>
                    )) : <CustomTableBodyEmpty/>
                }
            </ModalBase>
        </Fragment>
    );
};

export default HistoryPoint;