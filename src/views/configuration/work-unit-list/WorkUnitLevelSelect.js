import { Fragment, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button, Card, CardBody } from 'reactstrap';

//Components
import "./WorkUnitLevelSelect.scss";
import WorkUnitLevelApi from '../../../services/pages/employee/workunit';
import CustomToast from '../../../components/widgets/custom-toast';
import WorkUnitListApi from "../../../services/pages/configuration/unit-work-list";
import { ChevLeft } from '../../../components/widgets/feeds/feeds-categories-components/chevLeft';
import { workunitAPI } from '../../../services/pages/configuration/workunit';
import workunitListAPI from '../../../services/pages/configuration/unit-work-list/WorkunitList';
import { ChevRight } from '../../../components/widgets/feeds/feeds-categories-components/chevRight';


const WorkUnitLevelSelect = ({ isRtl, onSelect, getAllData, setListData, setStatusGetData }) => {
    //State
    const [level, setLevel] = useState(false);

    const workunitLevel = () => { 
        setListData(false);

        workunitListAPI.getWorkunitLevel().then(
            res => {
                if (!res.is_error) {
                    let data_;

                    if(localStorage.getItem('role') === 'Verifikator Daerah' || localStorage.getItem('role') === 'Admin Daerah'){
                        data_ = res.data.workunit_level.filter((data) => (
                            data.name !== 'KEJAKSAAN AGUNG'
                        ))
                    }else{
                        data_ = res.data.workunit_level
                    }

                    setLevel(data_);
                } else {
                    CustomToast("danger", res.code);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.code);
            }
        )
    };

    useEffect(() => {
        workunitLevel();
    }, []);

    const refreshTable = (workunit_level_id) => {
        onSelect(workunit_level_id);
    };

    return (
        <Fragment>
            <div className='d-flex justify-content-between'>
                <ChevLeft/>
                <Fragment>
                    <ul
                        className="cat-menu-component nav nav-tabs mb-0"
                    >
                        <li className="nav-item">
                            <a 
                                onClick   = {() => {getAllData(); setStatusGetData()}}
                                className = "nav-link active"
                            >
                                SEMUA SATUAN KERJA
                            </a>
                        </li>

                        {
                            level && level.map((data, index) => (
                                <div key={index}>
                                    <li className="nav-item">
                                        {
                                            <a 
                                                key       = {`cat-feeds-components-${data.id}`}
                                                onClick   = {() => { refreshTable(parseInt(data.id)) }}
                                                className = "nav-link active"
                                            >
                                                {data.name}
                                            </a>
                                        }
                                    </li>
                                </div>
                            )) 
                        }
                    </ul>
                </Fragment>
            </div>
        </Fragment>
    )
}

// const WorkUnitLevelSelect = ({ isRtl, onSelect, getAllData,setListData }) => {
//     //State
//     const [level, setLevel] = useState(false)

//     const params = {
//         className: 'swiper-centered-slides',
//         slidesPerView: 'auto',
//         spaceBetween: 20,
//         centeredSlides: true,
//         navigation: true,
//         slideToClickedSlide: true,
//     }

//     const refreshTable = (workunit_level_id) => {
//         onSelect(workunit_level_id);
//     };

//     const getData = () => {
//         setListData(false)
//         WorkUnitLevelApi({
//             onSuccess: (res) => {
//                 let data_;

//                 if(localStorage.getItem('role') === 'Verifikator Daerah' || localStorage.getItem('role') === 'Admin Daerah'){
//                     data_ = res.data.data.workunit_level.filter((data) => (
//                         data.name !== 'KEJAKSAAN AGUNG'
//                     ))
//                 }else{
//                     data_ = res.data.data.workunit_level
//                 }
//                 setLevel(data_);
//             },
//             onFail: (err) => {
//                 CustomToast("danger", err.message);
//             }
//         })
//     };

//     useEffect(() => {
//         getData()
//     }, []);

//     return (
//         <Card
//             id="filter-satker"
//             className='bg-transparent shadow-none'
//         >
//             <CardBody className="p-0">
//                 <Swiper
//                     dir={isRtl ? 'rtl' : 'ltr'} {...params}
//                     onSlideChange={(e) => { onSwiper(e.activeIndex) }}
//                 >
//                     <SwiperSlide
//                         onClick={() => { getAllData() }}
//                         className='rounded swiper-shadow swiper-slide-all'
//                         style={{ marginLeft: '-450px', marginTop: '5px' }}
//                     >
//                         SEMUA SATUAN KERJA
//                     </SwiperSlide>
//                     {level && level.map((data, i) => (
//                         <SwiperSlide
//                             key={data.id}
//                             className='rounded swiper-shadow'
//                             onClick={() => { refreshTable(parseInt(data.id)) }}
//                             style={{ marginTop: '5px', paddingTop: '5px' }}
//                         >
//                             <p className='swiper-text mb-0'>{data.name}</p>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//             </CardBody>
//         </Card>
//     );
// };

export default WorkUnitLevelSelect;