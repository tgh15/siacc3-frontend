import React,{ Fragment, useState, useEffect}  from 'react';
import Viewer from 'react-viewer';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from 'reactstrap';

import ContainerFluid               from '../fluid';


const CarouselAttachment = ({images}) => {

    const [image, setImage]             = useState(0);
    const [visible, setVisible]         = useState(false);
    const [animating, setAnimating]     = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const reStructure = () => {
        let image_ = [];

        images.map((data) => (
            image_.push({
                src : data.attachment,
                alt : data.Name
            })
        ))

        setImage(image_);
    }

    useEffect(() =>{ 
        reStructure();
    },[]);



    if(Array.isArray(images)) {
        const onExiting = () => {
            setAnimating(true);
        }
        
        const onExited = () => {
            setAnimating(false);
        };
        
        const next = () => {
            if (animating) return
            const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1
            setActiveIndex(nextIndex);
        };
        
        const previous = () => {
            if (animating) return
            const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1
            setActiveIndex(nextIndex);
        };
        
        const goToIndex = newIndex => {
            if (animating) return
            setActiveIndex(newIndex);
        };

        const slides = images.map(item => {
            return (
                <CarouselItem 
                    key         = {`attachment-image-${item.id}`}
                    onExited    = {onExited} 
                    onExiting   = {onExiting} 
                >
                    <div style  = {{background: '#606061', borderRadius:'10px', textAlign: 'center', padding: '7px'}}>
                        <img 
                            src         = {item.attachment} 
                            alt         = {item.name} 
                            style       = {{width: '500px', height: '380px', objectFit:'cover', borderRadius:'10px'}}
                            className   = 'img-fluid'
                            onClick     = {() => setVisible(true)}
                        />
                    </div>
                </CarouselItem> 
            )
        });
        

        return(
            <>
                <Viewer
                    images      = {image}
                    visible     = {visible}
                    onClose     = {() => {setVisible(false)}}
                    activeIndex = {activeIndex}
                />

                <ContainerFluid className = "ml-0 mr-0" style={{zIndex: 999}}>
                    <Carousel 
                        next        = {next} 
                        previous    = {previous} 
                        onExited    = {onExited}
                        activeIndex = {activeIndex} 
                    >
                        {
                            images.length > 1 ? 
                                <CarouselIndicators
                                    items           = {images}
                                    activeIndex     = {activeIndex}
                                    onClickHandler  = {goToIndex}
                                />
                            :
                                null
                        }
                            {slides}

                        {
                            images.length > 1 ? 
                                <>
                                    <CarouselControl
                                        direction       = 'prev'
                                        directionText   = 'Previous'
                                        onClickHandler  = {previous}
                                    />
                                    <CarouselControl
                                        direction       = 'next'
                                        directionText   = 'Next'
                                        onClickHandler  = {next}
                                    />
                                </>
                            :
                                null
                        }
                    </Carousel>
                </ContainerFluid>
            </>
        );
    }else{
        return<Fragment></Fragment>
    }
};

export default CarouselAttachment;