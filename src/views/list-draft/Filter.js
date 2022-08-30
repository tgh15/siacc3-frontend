import React, { Fragment }  from 'react';
import { 
    Modal, 
    Label,
    Button, 
    ModalBody, 
    ModalHeader, 
    ModalFooter,
} from 'reactstrap';

import Flatpickr            from 'react-flatpickr';

//CSS
import '@styles/react/libs/flatpickr/flatpickr.scss';

//Icon
import { Calendar }         from 'react-feather';

//Components
import TourFilterDraft      from './TourFilter';


const FilterDate = (props) => {
    return (
        <Fragment>
            <Button 
                color   = 'primary'
                style   = {{ padding: '4px', marginRight: '10px' }}
                onClick = {() => props.setBasicModal(!props.basicModal)}
            >
                <Calendar size={20}/>
            </Button>
            <Modal 
                isOpen = {props.basicModal} 
                toggle = {() => props.setBasicModal(!props.basicModal)}
            >
                <ModalHeader toggle={() => props.setBasicModal(!props.basicModal)}>
                    Filter Tanggal
                </ModalHeader>
                <TourFilterDraft/>
                <ModalBody>
                    <Label for='filter_date'>Tanggal</Label>
                    <div id="date-filter">
                        <Flatpickr 
                            id          = 'filter_date'
                            value       = {props.filterListDraft} 
                            options     = {{ dateFormat: "d-m-Y"}}
                            onChange    = {(e) => {props.setFilter({type: 'date', value: e})}}
                            className   = 'form-control' 
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        id      = "apply-draft"
                        color   = 'primary' 
                        onClick = {() => props.handleFilter()}
                    >
                        Tampilkan Draft
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
};

export default FilterDate;