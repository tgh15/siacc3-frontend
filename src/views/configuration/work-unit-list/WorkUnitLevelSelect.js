import { useEffect, useState }  from 'react';
import { Swiper, SwiperSlide }  from 'swiper/react';
import { Card, CardBody }       from 'reactstrap';

//Css
import "./WorkUnitLevelSelect.scss";

//Services
import WorkUnitLevelApi         from '../../../services/pages/employee/workunit';

//Components
import CustomToast              from '../../../components/widgets/custom-toast';


const WorkUnitLevelSelect = ({ isRtl, onSelect, getAllData, setListData }) => {
    //State
    const [level, setLevel] = useState(false);

    const params = {
        className           : 'swiper-centered-slides',
        navigation          : true,
        spaceBetween        : 13,
        slidesPerView       : 19,
        centeredSlides      : true,
        slideToClickedSlide : true,
    }

    const refreshTable = (workunit_level_id) => {
        onSelect(workunit_level_id);
    };

    const getData = () => {
        setListData(false);
        
        WorkUnitLevelApi({
            onSuccess: (res) => {
                let data_;

                if(localStorage.getItem('role') === 'Verifikator Daerah' || localStorage.getItem('role') === 'Admin Daerah'){
                    data_ = res.data.data.workunit_level.filter((data) => (
                        data.name !== 'KEJAKSAAN AGUNG'
                    ))
                }else{
                    data_ = res.data.data.workunit_level
                }
                setLevel(data_);
            },
            onFail: (err) => {
                CustomToast("danger", err.message);
            }
        })
    };

    useEffect(() => {
        getData()
    }, []);

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