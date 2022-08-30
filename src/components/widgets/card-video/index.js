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
import { ModalBase }                        from '../modals-base';

const CardVideo = ({item}) => {

    const [animating, setAnimating]         = useState(0);
    const [activeIndex, setActiveIndex]     = useState(0);
    const [modalVisible, setModalVisible]   = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const showModalVideo = (selected) => {
        setModalVisible(!modalVisible);
        setSelectedVideo(selected);
    };

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
                    key         = {`attachment-video-${data.id}`}
                    onExited    = {onExited} 
                    onExiting   = {onExiting} 
                >
                    <div style={{ background: '#606061', backgroundSize: 'contain', backgroundPosition: 'center', textAlign: 'center', backgroundImage: `${data.attachment ? `url(${data.attachment.replace("original", "thumbnail")})` : null }`, backgroundRepeat: 'no-repeat' , borderRadius:'10px', padding: '80px', marginBottom: '10px', marginTop: '7px' }} key={"video_index_"+index}>
                        <Button 
                            type    = "primary" 
                            style   = {{ width: '70px', height: '70px', marginTop: '2px', borderRadius: '100%' }}
                            onClick = {() => showModalVideo(data)}
                        >
                            <Play />
                        </Button>

                        
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
                    {
                        item.length > 1 ?
                            <CarouselIndicators
                                items           = {item}
                                activeIndex     = {activeIndex}
                                onClickHandler  = {goToIndex}
                            />
                        :
                            null
                    }
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

                <ModalBase 
                    show        = {modalVisible} 
                    setShow     = {setModalVisible}
                >
                    {
                        selectedVideo != null ? 
                            <div className="text-center" key={"video_"+selectedVideo.id}>
                                <span >{selectedVideo.name}</span>
                                <video 
                                    src         = {selectedVideo.attachment}
                                    style       = {{ height: '50vh', width: '100%', marginTop: '20px', border: '1px solid #eff2f5', borderRadius: '10px' }} 
                                    controls
                                />
                            </div>
                        :
                            null
                    }
                </ModalBase>
            </ContainerFluid>
        );
    }else{
        return<Fragment></Fragment>
    }
};

export default CardVideo;