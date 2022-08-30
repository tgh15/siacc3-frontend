import React, { useState }              from 'react'
import { 
    CornerUpRight, 
    Link, 
    Maximize, 
    Minimize, 
    Plus 
}                                       from 'react-feather'
import {Row,Col, Button}                from 'reactstrap'
import { ModalBase }                    from '../modals-base'
import { ModalAddChart }                from './ModalAddChart'

const TopWidgetDashboard = (props) => {

    const {
        modalShow, 
        setModalShow,

        //Role
        roleAdd,
        roleLink, 
        roleExport,
    } = props;

    const [fullscr,setFcr]          = useState(false);

    const detectFullscreen = () => {

        if((document.fullscreen)) {
            return true
        } else {
            return false
        }

    }

    let icon = fullscr ? <Minimize size={14}/> : <Maximize size={14}/>

    const handleFullscreen = () => {

        let ref = document.getElementById("fs-component");

        if(!detectFullscreen()){
            if(ref.requestFullscreen){
                ref.requestFullscreen()
                setFcr(true)
            }else if(ref.webkitRequestFullscreen){
                ref.webkitRequestFullscreen()
                setFcr(true)
            }else if(ref.msRequestFUllscreen){
                ref.msRequestFUllscreen()
                setFcr(true)
            }

            ref.style.paddingTop        = "2em";
            const color                 = window.getComputedStyle(document.body).getPropertyValue("background-color");
            ref.style.backgroundColor   = color;
        }else{
            ref.style.paddingTop        = "";
            ref.style.backgroundColor   = "";

            try{
                document.webkitExitFullscreen();
                setFcr(false);
            }catch(e){
                console.log(e)
            }
        }
    }

    const toggleModal = {
        add     : () => {
            setModalShow(!modalShow)
        }
    };

    return(
        <Row
            className = "mb-2"
        >
            <ModalBase 
                size    = "lg" 
                show    = {modalShow} 
                title   = "Tambah Grafik" 
                setShow = {toggleModal.add}
            >
                <ModalAddChart 
                    handleFinish = {props.handleFinish}
                />
            </ModalBase>

            <Col md={6}></Col>
            <Col 
                sm          = {12} 
                md          = {6} 
                className   = "text-right"
            >
                {
                    roleAdd ? 
                        <Button 
                            size    = "md"
                            color   = "primary" 
                            onClick = {toggleModal.add} 
                        >
                            <Plus size={14}/> Tambah Grafik
                        </Button>
                    :  
                        null
                }

                &nbsp;
                {
                    roleLink ? 
                        <Button 
                            size        = "md"
                            color       = "primary" 
                            className   = "btn-icon" 
                        >
                            <Link size={14}/>
                        </Button>
                    :
                        null
                }
                &nbsp;
                {
                    roleExport ? 
                        <Button 
                            size        = "md"
                            color       = "primary" 
                            className   = "btn-icon" 
                        >
                            <CornerUpRight size={14} />
                        </Button>
                    :
                        null
                }
                &nbsp;
                <Button 
                    size        = "md"
                    color       = "primary" 
                    onClick     = {()=>{handleFullscreen()}} 
                    className   = "btn-icon" 
                >
                    {icon}
                </Button>
            </Col>
        </Row>
    )
}

export default TopWidgetDashboard


