import { Fragment, useContext, useEffect, useState } from "react"
import {  
        Button,
        CardBody,
        ListGroup,
        ListGroupItem,
        Form,
        FormGroup,
        Label,
        Spinner,
    }                           from "reactstrap"

import Flatpickr                from 'react-flatpickr'

import { PerformanceContext }   from "../../context/PerformanceContext"
import Helper                   from "../../helpers"
import moment                   from "moment"
import CustomTableBodyEmpty     from "../../components/widgets/custom-table/CustomTableBodyEmpty"
import { ModalBase }            from "../../components/widgets/modals-base"
import CustomToast              from '../../components/widgets/custom-toast'

import '@styles/react/libs/flatpickr/flatpickr.scss'

import { useForm, Controller }              from "react-hook-form"
import CustomTablePaginate from "../../components/widgets/custom-table/CustomTablePaginate"

const DetailPoint = () => {
    const { active, getAgentPoints, getWorkunitPoints, historyPoints, dataDetail } = useContext(PerformanceContext);

    const { 
        handleSubmit, 
    }                                               = useForm();

    const [endDate, setEndDate]                     = useState(null);
    const [startDate, setStartDate]                 = useState(moment().format('DD-MM-YYYY'));
    const [showFilterDate, setShowFilterDate]       = useState(false);
    const [selectedFilter, setSelectedFilter]       = useState(1);

    const handleFilterHistory = (id, page) => {
        setSelectedFilter(id);
        if(active === 'agent'){
            if(id === 1){
                getAgentPoints(page, dataDetail.uuid);
            }else if(id === 2){   
                getAgentPoints(page, dataDetail.uuid, moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
            }else if(id === 3){
                getAgentPoints(page, dataDetail.uuid, moment().subtract(7,'d').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
            }else if(id === 4){
                getAgentPoints(page, dataDetail.uuid, moment().subtract(30,'d').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
            }else if(id === 5){
                setShowFilterDate(true);
            }
        }else{
            if(id === 1){
                getWorkunitPoints(page, dataDetail.id);
            }else if(id === 2){   
                getWorkunitPoints(page, dataDetail.id, moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
            }else if(id === 3){
                getWorkunitPoints(page, dataDetail.id, moment().subtract(7,'d').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
            }else if(id === 4){
                getWorkunitPoints(page, dataDetail.id, moment().subtract(30,'d').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
            }else if(id === 5){
                setShowFilterDate(true);
            }
        }
    };

    const handleSubmit_ = () => { 
        if(startDate == null){
            CustomToast('warning', 'Tanggal mulai belum terisi');
        }else if(endDate == null){
            CustomToast('warning', 'Tanggal selesai belum terisi');
        }else{
            if(active == 'agent'){
                getAgentPoints(1, dataDetail.uuid, moment(startDate, 'DD-MM-YYYY').format('YYYY-MM-DD'), moment(endDate, 'DD-MM-YYYY').format('YYYY-MM-DD'));
            }else{
                getWorkunitPoints(1, dataDetail.id, moment(startDate, 'DD-MM-YYYY').format('YYYY-MM-DD'), moment(endDate, 'DD-MM-YYYY').format('YYYY-MM-DD'));
            }
            setShowFilterDate(false);
        }
    }

    return (
        <Fragment>
            {/* Custom Date Filter */}
            <ModalBase
                key     = "modal_filter_date_form"
                show    = {showFilterDate}
                title   = "Filter Berdasarkan Tanggal"
                setShow = {(param) => {setShowFilterDate(param)}}
                unmount = {true}
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

            <div>
                <p>
                    Total Point 
                    <span className="ml-1 font-weight-bolder">{dataDetail && dataDetail.performance ? dataDetail.performance.points_total : 0} Point</span>
                </p>

                <div>
                    <CustomTablePaginate
                        size            = {12}
                        length          = {20}
                        getData         = {(val) => handleFilterHistory(selectedFilter, val.page)}
                        pagination      = {historyPoints != null ? historyPoints.pagination : null} 
                        offsetSearch    = {0} 
                    />
                </div>


                <div className="d-flex demo-inline-spacing mb-2">
                    <Button
                        key     = "filter_all"
                        color   = {selectedFilter === 1 ? "primary" : null}
                        onClick = {() => handleFilterHistory(1,1)} 
                    >
                        Semua
                    </Button>
                    <Button
                        key     = "filter_daily"
                        color   = {selectedFilter === 2 ? "primary" : null}
                        onClick = {() => handleFilterHistory(2,1)} 
                    >
                        Harian
                    </Button>
                    <Button
                        key     = "filter_weekly"
                        color   = {selectedFilter === 3 ? "primary" : null}
                        onClick = {() => handleFilterHistory(3,1)} 
                    >
                        Mingguan
                    </Button>
                    <Button
                        key     = "filter_monthly"
                        color   = {selectedFilter === 4 ? "primary" : null}
                        onClick = {() => handleFilterHistory(4,1)} 
                    >
                        Bulanan
                    </Button>
                    <Button
                        key     = "filter_custom"
                        color   = {selectedFilter === 5 ? "primary" : null}
                        onClick = {() => handleFilterHistory(5,1)} 
                    >
                        Filter
                    </Button>
                </div>

                {
                    historyPoints != null ? 
                        Array.isArray(historyPoints.data) && historyPoints.data.length > 0 ? 
                            historyPoints.data.map((data, index) => (
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
                            ))
                        :
                            <div className="px-2">
                                <CustomTableBodyEmpty/>
                            </div>
                    :
                        <div className="d-flex justify-content-center py-2">
                            <Spinner/>
                        </div>

                }

            </div>
        </Fragment>

    )
}

export default DetailPoint