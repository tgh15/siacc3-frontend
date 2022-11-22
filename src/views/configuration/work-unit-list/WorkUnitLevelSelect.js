import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card, CardBody } from 'reactstrap';

//Components
import "./WorkUnitLevelSelect.scss";
import WorkUnitLevelApi from '../../../services/pages/employee/workunit';
import CustomToast from '../../../components/widgets/custom-toast';
import WorkUnitListApi from "../../../services/pages/configuration/unit-work-list";


const WorkUnitLevelSelect = ({ isRtl, onSelect, getAllData,setListData }) => {
    //State
    const [level, setLevel] = useState(false)

    const params = {
        className: 'swiper-centered-slides',
        slidesPerView: 'auto',
        spaceBetween: 20,
        centeredSlides: true,
        navigation: true,
        slideToClickedSlide: true,
    }

    const refreshTable = (workunit_level_id) => {
        onSelect(workunit_level_id);
    };

    const getData = () => {
        setListData(false)
        WorkUnitLevelApi({
            onSuccess: (res) => {
                let data_;

                if(localStorage.getItem('role') === 'Verifikator Daerah' || localStorage.getItem('role') === 'Admin Daerah' || localStorage.getItem('role') === 'Agen'){
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
            id="filter-satker"
            className='bg-transparent shadow-none'
        >
            <CardBody className="p-0">
                <Swiper
                    dir={isRtl ? 'rtl' : 'ltr'} {...params}
                    // onSlideChange={(e) => { onSwiper(e.activeIndex) }}
                >
                    <SwiperSlide
                        onClick={() => { getAllData() }}
                        className='rounded swiper-shadow swiper-slide-all'
                        style={{ marginLeft: '-450px', marginTop: '5px' }}
                    >
                        SEMUA SATUAN KERJA
                    </SwiperSlide>
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
                </Swiper>
            </CardBody>
        </Card>
    );
};

export default WorkUnitLevelSelect;