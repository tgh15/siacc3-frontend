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
                    {...params}
                    dir = {isRtl ? 'rtl' : 'ltr'} 
                >
                    <SwiperSlide
                        onClick   = {() => { getAllData() }}
                        className = 'rounded swiper-slide-all'
                    >
                        <p className='swiper-text mb-0'>
                            SEMUA SATUAN KERJA
                        </p>
                    </SwiperSlide>

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
                </Swiper>
            </CardBody>
        </Card>
    );
};

export default WorkUnitLevelSelect;