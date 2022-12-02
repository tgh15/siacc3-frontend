import React,{Fragment, useState}           from 'react';
import { Play }                             from 'react-feather';

import {
    Button,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from 'reactstrap';

import ContainerFluid                       from '../fluid';

const CardAudio = ({item}) => {
    console.log(item, 'audio attachment')
    const [animating, setAnimating]         = useState(0);
    const [activeIndex, setActiveIndex]     = useState(0);

    if(Array.isArray(item)) {
        const onExiting = () => {
            setAnimating(true);
        }
        
        const onExited = () => {
            setAnimating(false);
        };
        
        const next = () => {
            if (animating) return
            const nextIndex = activeIndex === item.length - 1 ? 0 : activeIndex + 1
            setActiveIndex(nextIndex);
        };
        
        const previous = () => {
            if (animating) return
            const nextIndex = activeIndex === 0 ? item.length - 1 : activeIndex - 1
            setActiveIndex(nextIndex);
        };
        
        const goToIndex = newIndex => {
            if (animating) return
            setActiveIndex(newIndex);
        };

        const slides = item.map((data, index) => {
            return (
                <CarouselItem 
                    key         = {`attachment-audio-${data.id}`}
                    onExited    = {onExited} 
                    onExiting   = {onExiting} 
                >
                    <div style={{ background: '#606061', textAlign: 'center', borderRadius:'10px', padding: '30px', marginBottom: '10px', marginTop: '7px' }} key={"video_index_"+index}>
                        <span style={{paddingRight: '10px', borderRadius: '10px'}} key={"audio_attachment_"+data.id}>
                            <audio 
                                src         = {data.attachment} 
                                controls
                            />
                        </span>
                    </div>
                </CarouselItem> 
            )
        });

        return(
            <ContainerFluid className = "ml-0 mr-0">
                <Carousel 
                    next        = {next} 
                    previous    = {previous} 
                    onExited    = {onExited}
                    activeIndex = {activeIndex} 
                >
                    <CarouselIndicators
                        items           = {item}
                        activeIndex     = {activeIndex}
                        onClickHandler  = {goToIndex}
                    />
                        {slides}
                    {
                        item.length > 1 ?
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
        );
    }else{
        return<Fragment></Fragment>
    }
};

export default CardAudio;