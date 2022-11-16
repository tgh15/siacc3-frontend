import { useEffect, useState }  from 'react';
import { Swiper, SwiperSlide }  from 'swiper/react';
import { Card, CardBody }       from 'reactstrap';

//Css
import "./WorkUnitLevelSelect.scss";

//Services
import workunitListAPI          from '../../../services/pages/configuration/unit-work-list/WorkunitList';

//Components
import CustomToast              from '../../../components/widgets/custom-toast';


const WorkUnitLevelSelect = ({ isRtl, onSelect, getAllData, setListData }) => {
    //State
    const [level, setLevel] = useState(false)

    const params = {
        className           : 'swiper-centered-slides',
        navigation          : true,
        spaceBetween        : 13,
        slidesPerView       : 20,
        centeredSlides      : true,
        slideToClickedSlide : true,
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = () => { 
        setListData(false);

        workunitListAPI.getWorkunitLevel().then(
            res => {
                if (!res.is_error) {
                    setLevel(res.data.workunit_level);
                } else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    const refreshTable = (workunit_level_id) => {
        onSelect(workunit_level_id);
    };

    return (
        <Card
            id        = "filter-satker"
            className = 'bg-transparent shadow-none'
        >
            <CardBody className="p-0">
                <Swiper
<<<<<<< HEAD
                    dir={isRtl ? 'rtl' : 'ltr'} {...params}
                    // onSlideChange={(e) => { onSwiper(e.activeIndex) }}
=======
                    {...params}
                    dir = {isRtl ? 'rtl' : 'ltr'} 
>>>>>>> amate-v2
                >
                    <SwiperSlide
                        onClick   = {() => { getAllData() }}
                        className = 'rounded swiper-slide-all'
                    >
                        <p className='swiper-text mb-0'>
                            SEMUA SATUAN KERJA
                        </p>
                    </SwiperSlide>
<<<<<<< HEAD
                    {
                        (localStorage.getItem('role') === "Admin Daerah" || localStorage.getItem('role') === "Verifikator Daerah") ?
                            <>
                                {
                                    level && (level.filter((data_) => (data_.id != 1))).map((data) => (
                                        <SwiperSlide
                                            key         = {data.id}
                                            style       = {{ marginTop: '5px', paddingTop: '5px' }}
                                            onClick     = {() => { refreshTable(parseInt(data.id)) }}
                                            className   = 'rounded swiper-shadow'
                                        >
                                            <p className='swiper-text mb-0'>{data.name}</p>
                                        </SwiperSlide>
                                    ))
                                }
                            </>
                        :
                            <>
                                {
                                    level && level.map((data) => (
                                        <SwiperSlide
                                            key         = {data.id}
                                            style       = {{ marginTop: '5px', paddingTop: '5px' }}
                                            onClick     = {() => { refreshTable(parseInt(data.id)) }}
                                            className   = 'rounded swiper-shadow'
                                        >
                                            <p className='swiper-text mb-0'>{data.name}</p>
                                        </SwiperSlide>
                                    ))
                                }
                            </>
                    }
=======

                    {level && level.map((data, i) => (
                        <SwiperSlide
                            key       = {data.id}
                            onClick   = {() => { refreshTable(parseInt(data.id)) }}
                            className = 'rounded  swiper-slide-all'
                        >
                            <p className='swiper-text mb-0'>
                                {data.name}
                            </p>
                        </SwiperSlide>
                    ))}
>>>>>>> amate-v2
                </Swiper>
            </CardBody>
        </Card>
    );
};

export default WorkUnitLevelSelect;