import {
        useState,
        useMemo,
        useEffect,
        useContext,
        useCallback,
    }                               from 'react';

//Component
import {
        Col,
        Row,
        Card,
        Input,
        Label,
        Button,
        Spinner,
        Progress,
        Pagination,
        PaginationItem,
        PaginationLink,
        CardBody,
        CardTitle,
    }                               from 'reactstrap';

import moment                       from 'moment';


import Map                          from './map';
import {ModalBase}                  from '../../components/widgets/modals-base';
import PieChart                     from './chart/pie';
import BarChart                     from './chart/bar';
import GisFilter                    from './gisFilter';

import ChartFilter                  from './chartFilter';
import HorizontalBarChart           from './chart/horizontalBar';

//Utils
import Helper                       from '../../helpers';

import './index.css';
import feedsGisAPI                  from '../../services/pages/feeds/gis';
import PerfectScrollbar             from 'react-perfect-scrollbar'

//Provider
import { PerformanceProvider }      from '../../context/PerformanceContext';
import { Maximize, Minimize }       from 'react-feather';
import Skeleton                     from 'react-loading-skeleton';
import CustomTableBodyEmpty         from '../../components/widgets/custom-table/CustomTableBodyEmpty';
import GroupBarChart                from './chart/groupbar';
import CustomTablePaginate          from '../../components/widgets/custom-table/CustomTablePaginate';

const GIS = () => {
    const [isFullScreen, setIsFullScreen]                           = useState(false);
    const [fullscr,setFcr]                                          = useState(false);
    const [mapData, setMapData]                                     = useState(null);
    const [loading, setLoading]                                     = useState(true);
    const [mapFilter, setMapFilter]                                 = useState('pin');
    const [gisFilter, setGisFilter]                                 = useState(null);
    const [pagination, setPagination]                               = useState(null);
    const [heatFilter, setHeatFilter]                               = useState(false);
    const [chartByKind, setChartByKind]                             = useState(null);
    const [detailChart, setDetailChart]                             = useState(null);
    const [selectedMap, setSelectedMap]                             = useState(null);
    const [chartByPeriod, setChartByPeriod]                         = useState(null);
    const [selectedDetail, setSelectedDetail]                       = useState({type: null, title: null});
    const [selectedMarker, setSelectedMarker]                       = useState(null);
    const [chartByCategory, setChartByCategory]                     = useState(null);
    const [chartByWorkunitLevel, setChartByWorkunitLevel]           = useState(null);
    const [isDetailChartVisible, setIsDetailChartVisible]           = useState(false);
    const [chartByCategoryYearly, setChartByCategoryYearly]         = useState(null);
    const [chartByTrendingCategory, setChartByTrendingCategory]     = useState(null); 
    
    const getGisData = () => {

        let category_ = [];

        if(gisFilter != null && gisFilter.category_id != undefined){
            gisFilter.category_id.map((data)=>(
                category_.push(data.id)
            ))
        }

        let formData = {
            pin     : true,
            node    : true
        };

        if(gisFilter != null && gisFilter.workunit_id != undefined){
            formData['workunit_id'] = gisFilter.workunit_id.value;
        }else{
            formData['workunit_id'] = 0;
        }
        
        if(gisFilter != null && gisFilter.start_date != undefined){
            formData['start_date'] = moment(gisFilter.start_date[0]).format("YYYY-MM-DD")
        }else{
            formData['start_date'] = moment().add(-30,'days').format("YYYY-MM-DD")
        }

        if(gisFilter != null && gisFilter.end_date != undefined){
            formData['end_date'] = moment(gisFilter.end_date[0]).format("YYYY-MM-DD")
        }else{
            formData['end_date'] = moment().format("YYYY-MM-DD")
        }

        if(gisFilter != null && gisFilter.trending_kind != undefined){
            formData['trending_kind'] = gisFilter.trending_kind.value
        }

        if(gisFilter != null && gisFilter.kind != undefined){
            formData['kind'] = gisFilter.kind.value
        }else{
            formData['kind'] = 2
        }

        if(gisFilter != null && gisFilter.category_id != undefined){
            formData['category_id'] = category_
        }else{
            formData['category_id'] = []
        }

        feedsGisAPI.getMapData(formData).then(
            res => {
                if(res.status === 200){
                    setMapData(res.data);
                }
            },
            err => {
                console.log(err);
            }
        );
    };

    const getChartByKind = (formData) => {
        formData.type = 'berita_jenis_per_level'

        feedsGisAPI.getChartData(formData).then(
            res => {
                if(res.status === 200){
                    setChartByKind(res.data);
                }
            },
        )
    };

    const getChartByCategory = (formData) => {
        formData.type = 'berita_per_kategori_bulanan'

        feedsGisAPI.getChartData(formData).then(
            res => {
                if(res.status === 200){
                    setChartByCategory(res.data);
                }
            },
        )
    };
    
    const getChartByPeriod = (formData) => {
        formData.type = 'berita_per_satker'

        feedsGisAPI.getChartData(formData).then(
            res => {
                if(res.status === 200){
                    let data_ = [];
            
                    res.data.labels.map((data, index) => (
                        data_.push({
                            name  : data,
                            value : res.data.datasets[0].data[index]
                        })
                    ))
                
                    setChartByPeriod(data_.sort((a,b) => {return b.value - a.value}));
                }
            },
        )
    };
    
    const getChartByWorkunitLevel = (formData) => {
        formData.type = 'berita_per_level'

        feedsGisAPI.getChartData(formData).then(
            res => {
                if(res.status === 200){


                    setChartByWorkunitLevel(res.data);
                }
            },
        )
    };

    const getChartByTrendingCategory = (formData) => {
        formData.type = 'berita_populer_per_kategori'

        feedsGisAPI.getChartData(formData).then(
            res => {
                if(res.status === 200){
                    setChartByTrendingCategory(res.data);
                }
            },
        )
    };

    const getChartByCategoryYearly = (formData) => {
        formData.type = 'berita_per_kategori_tahunan'

        feedsGisAPI.getChartData(formData).then(
            res => {
                if(res.status === 200){
                    setChartByCategoryYearly(res.data);
                }
            },
        )
    }

    const getDetailChart = (page) => {
        
        setLoading(true);
        setIsDetailChartVisible(true);

        const formData = {};

        let category_ = [];

        if(gisFilter != null && gisFilter.category_id != undefined){
            gisFilter.category_id.map((data)=>(
                category_.push(data.id)
            ))
        }

        formData.type           = selectedDetail.type;
        formData.kind           = gisFilter != null ? gisFilter.kind.value : 2;
        formData.end_date       = gisFilter != null && gisFilter.end_date != undefined ? moment(gisFilter.end_date[0]).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        formData.start_date     = gisFilter != null && gisFilter.start_date != undefined ? moment(gisFilter.start_date[0]).format("YYYY-MM-DD") : moment().add(-30, 'days').format("YYYY-MM-DD");
        formData.category_id    = gisFilter != null ? category_ : [];
        formData.workunit_id    = gisFilter != null ? gisFilter.workunit_id.value : 0;
        formData.trending_kind  = gisFilter != null ? gisFilter.trending_kind.value : null;

        const params = {
            page : page
        }

        feedsGisAPI.getDetailChartData(formData, params).then(
            res => {
                if(res.status === 200){
                    setDetailChart(res.data);
                    setPagination(res.data.pagination)

                    setLoading(false);
                }
            }
        )
    };  

    const getChartData = () => {

        let formData = {};

        let category_ = [];

        if(gisFilter != null && gisFilter.category_id != undefined){
            gisFilter.category_id.map((data)=>(
                category_.push(data.id)
            ))
        }

        if(gisFilter != null && gisFilter.workunit_id != undefined){
            formData['workunit_id'] = gisFilter.workunit_id.value
        }else{
            formData['workunit_id'] = 0
        }

        if(gisFilter != null && gisFilter.start_date != undefined){
            formData['start_date'] = moment(gisFilter.start_date[0]).format("YYYY-MM-DD")
        }else{ 
            formData['start_date'] = moment().add(-30,'days').format("YYYY-MM-DD")
        }

        if(gisFilter != null && gisFilter.end_date != undefined){
            formData['end_date'] = moment(gisFilter.end_date[0]).format("YYYY-MM-DD")
        }else{
            formData['end_date'] = moment().format("YYYY-MM-DD")
        }

        if(gisFilter != null && gisFilter.trending_kind != undefined){
            formData['trending_kind'] = gisFilter.trending_kind.value;
        }else{
            formData['trending_kind'] = null;
        }

        if(gisFilter != null && gisFilter.kind != undefined){
            formData['kind'] = gisFilter.kind.value
        }else{
            formData['kind'] = 2
        }

        if(gisFilter != null && gisFilter.category_id != undefined){
            formData['category_id'] = category_
        }else{
            formData['category_id'] = []
        }

        getChartByKind(formData);
        getChartByPeriod(formData);
        getChartByCategory(formData);
        getChartByWorkunitLevel(formData);
        getChartByCategoryYearly(formData);
        getChartByTrendingCategory(formData);
    };

    const detectFullscreen = () => {

        if((document.fullscreen)) {
            return true
        } else {
            return false
        }

    }

    let icon = isFullScreen ? <Minimize size={14}/> : <Maximize size={14}/>
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

    useEffect(() => {

        getGisData();
        getChartData();

    }, [gisFilter, mapFilter])

    useEffect(() => {
        if(selectedDetail.type != null){
            getDetailChart();   
        }
    }, [selectedDetail]);

    return (
        <>
            {/* modal detail chart */}
            <ModalBase
                show        = {isDetailChartVisible}
                size        = "xl"
                title       = {selectedDetail.title}
                center      = {true}
                setShow     = {(par) => setIsDetailChartVisible(par)} 
            >   
                {
                    loading ?
                        <Skeleton height={60} count={5}/>
                    :
                        <div className='p-2'>
                            <Row className="mb-1">
                                <CustomTablePaginate
                                    size        = {12}
                                    getData     = {(e) => { getDetailChart(e.page) }}
                                    pagination  = {pagination}
                                />
                            </Row>

                            <Card
                                style       = {{ backgroundColor: "transparent" }}
                                className   = "bg-transparant mb-0"
                            >
                                <CardBody>
                                    <Row>
                                        <Col md={1} className="text-center">
                                            No
                                        </Col>
                                        <Col md={3}>
                                            Judul Berita
                                        </Col>
                                        {/* <Col md={2}>
                                            Kategori
                                        </Col> */}
                                        <Col md={2}>
                                            Tanggal Publikasi
                                        </Col>
                                        <Col md={3}>
                                            Pengirim
                                        </Col>
                                        <Col md={3}>
                                            Status Publikasi
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                            {
                                detailChart != null ?
                                    detailChart.agent_report.map((data,index) => (
                                        <Card className="mb-1">
                                            <CardBody>
                                                <Row>
                                                    <Col md={1} className="d-flex align-items-center justify-content-center">
                                                        {pagination.current_page == 1 ? index+1 : (index+1)+(pagination.current_page*10) - 10}
                                                    </Col>
                                                    <Col md={3} className="d-flex align-items-center">
                                                        <a href={`beranda/detail/${data.id}`}>
                                                            {data.title}
                                                        </a>
                                                    </Col>
                                                    <Col md={2} className="d-flex align-items-center">
                                                        {Helper.dateIndo(data.created_at)}
                                                    </Col>
                                                    <Col md={3} className="d-flex align-items-center">
                                                        {data.employee.name}
                                                    </Col>
                                                    <Col md={3} className="d-flex align-items-center">
                                                        {
                                                            data.status === 0 ?
                                                                "Menunggu Persetujuan Verifikator Daerah"
                                                            :
                                                                data.status === 1 ? 
                                                                    "Menunggu Persetujuan Verifikator Pusat"
                                                                :
                                                                    "Telah Dipublish"
                                                        }
                                                    </Col>
                                                </Row>
                                            </CardBody>

                                        </Card>
                                    ))
                                :
                                    <CustomTableBodyEmpty/>
                            }

                            
                        </div>
                }
            </ModalBase>

            <PerformanceProvider>
                <div style={{paddingBottom: "10vh"}}>
                    <Row 
                        id          = "fs-component"
                        className   = "d-flex"
                    >
                        <Col 
                            md        = {8}
                            style     = {isFullScreen ? {height: '90vh'} : {}}
                        >
                            <Card 
                                style       = {{overflow: 'hidden', height: '95%' }}
                                className   = "pt-2" 
                            >
                                <div className="d-flex justify-content-end mb-1 pr-1">
                                    <div className="form-check form-check-inline">
                                        <Input type="checkbox" id="heat_map" onChange={(val) => {setHeatFilter(val.target.checked)} }/>
                                        <Label for="heat_map" className="form-check-label">
                                            Heat Map
                                        </Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Input 
                                            id          = "pin_map" 
                                            name        = "kind" 
                                            type        = "radio" 
                                            checked     = {mapFilter == "pin" ? true : false} 
                                            onChange    = {() => {setMapData(null); setMapFilter("pin")} }
                                        />
                                        <Label 
                                            for         = "pin_map" 
                                            className   = "form-check-label"
                                        >
                                            Tampilkan Pin
                                        </Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Input 
                                            id          = "node_map" 
                                            name        = "kind" 
                                            type        = "radio" 
                                            checked     = {mapFilter == "node" ? true : false} 
                                            onChange    = {() => {setMapData(null); setMapFilter("node")} }
                                        />
                                        <Label 
                                            for         = "node_map" 
                                            className   = "form-check-label"
                                        >
                                            Tampilkan Node
                                        </Label>
                                    </div>
                                </div>
                                
                                {
                                    mapFilter === "node" &&
                                        <Card
                                            className   = "bg-light mb-0"
                                        >
                                            <CardBody className="p-1">
                                                {
                                                    <div className="d-flex justify-content-between px-5">
                                                        <div className='d-flex align-items-center'>
                                                            <div style   = {{ background: `#ffd32a`, height: 15, width: 15, borderRadius: '50%'}}/>
                                                            <span style={{marginLeft: '5px'}}>Ideologi</span>
                                                        </div>

                                                        <div className='d-flex align-items-center'>
                                                            <div style   = {{ background: `#3c40c6`, height: 15, width: 15, borderRadius: '50%'}}/>
                                                            <span style={{marginLeft: '5px'}}>Politik</span>
                                                        </div>

                                                        <div className='d-flex align-items-center'>
                                                            <div style   = {{ background: `#303952`, height: 15, width: 15, borderRadius: '50%'}}/>
                                                            <span style={{marginLeft: '5px'}}>Ekonomi</span>
                                                        </div>
                                                        <div className='d-flex align-items-center'>
                                                            <div style   = {{ background: `#ff3f34`, height: 15, width: 15, borderRadius: '50%'}}/>
                                                            <span style={{marginLeft: '5px'}}>Keuangan</span>
                                                        </div>

                                                        <div className='d-flex align-items-center'>
                                                            <div style   = {{ background: `#05c46b`, height: 15, width: 15, borderRadius: '50%'}}/>
                                                            <span style={{marginLeft: '5px'}}>Sosial Budaya</span>
                                                        </div>

                                                        <div className='d-flex align-items-center'>
                                                            <div style   = {{ background: `#af05fa7f`, height: 15, width: 15, borderRadius: '50%'}}/>
                                                            <span style={{marginLeft: '5px'}}>Hukum</span>
                                                        </div>

                                                        <div className='d-flex align-items-center'>
                                                            <div style   = {{ background: `#a5b1c2`, height: 15, width: 15, borderRadius: '50%'}}/>
                                                            <span style={{marginLeft: '5px'}}>Pertahanan & Keamanan</span>
                                                        </div>
                                                    </div>
                                                }
                                            </CardBody>
                                        </Card>
                                    
                                }

                                {
                                    heatFilter &&
                                        <Card
                                            className   = "bg-light mb-0"
                                        >
                                            <CardBody className="p-1">
                                                {
                                                    <div className="d-flex justify-content-between px-5">
                                                        <div className='d-flex align-items-center'>
                                                            <div style   = {{ background: '#6a6b70', height: 15, width: 15, borderRadius: '50%'}}/>
                                                            <span style={{marginLeft: '5px'}}> 0 </span>
                                                        </div>
                                                        <div className='d-flex align-items-center'>
                                                            <div style   = {{ background: '#6ab04c', height: 15, width: 15, borderRadius: '50%'}}/>
                                                            <span style={{marginLeft: '5px'}}> 1 - 10 </span>
                                                        </div>

                                                        <div className='d-flex align-items-center'>
                                                            <div style   = {{ background: '#f1c40f', height: 15, width: 15, borderRadius: '50%'}}/>
                                                            <span style={{marginLeft: '5px'}}>11 - 100</span>
                                                        </div>

                                                        <div className='d-flex align-items-center'>
                                                            <div style   = {{ background: '#e67e22', height: 15, width: 15, borderRadius: '50%'}}/>
                                                            <span style={{marginLeft: '5px'}}>101 - 300</span>
                                                        </div>
                                                        <div className='d-flex align-items-center'>
                                                            <div style   = {{ background: '#d35400', height: 15, width: 15, borderRadius: '50%'}}/>
                                                            <span style={{marginLeft: '5px'}}>{`> 300`}</span>
                                                        </div>
                                                    </div>
                                                }
                                            </CardBody>
                                        </Card>
                                    
                                }

                                <Map
                                    icon                = {icon}
                                    mapData             = {mapData}
                                    mapFilter           = {mapFilter}
                                    gisFilter           = {gisFilter}
                                    heatFilter          = {heatFilter}
                                    selectedMap         = {selectedMap}
                                    isFullScreen        = {isFullScreen}
                                    setSelectedMap      = {setSelectedMap}
                                    selectedMarker      = {selectedMarker}
                                    setIsFullScreen     = {setIsFullScreen}
                                    handleFullScreen    = {handleFullscreen}
                                    setSelectedMarker   = {setSelectedMarker}
                                />
                            </Card>
                        </Col>
                        <Col md={4}>
                            <GisFilter
                                setGisFilter    = {setGisFilter}
                                chartByPeriod   = {chartByPeriod}
                                setSelectedMap  = {setSelectedMap}
                            />  
                        </Col>
                    </Row>
                    {
                        !isFullScreen &&
                        <>
                            <Row>
                                <Col md={8}>
                                    <Row>
                                        <Col md={6}>
                                            <PieChart
                                                data                = {chartByTrendingCategory}
                                                type                = "berita_populer_per_kategori" 
                                                title               = "Berita Trending Berdasarkan Kategori"
                                                setSelectedDetail   = {setSelectedDetail}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <BarChart
                                                data                = {chartByKind}
                                                type                = "berita_jenis_per_level"
                                                title               = "Jenis Publikasi Berita"
                                                setSelectedDetail   = {setSelectedDetail}
                                            />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <BarChart
                                                data                = {chartByCategory}
                                                type                = "berita_per_kategori_bulanan"
                                                title               = "Berita Berdasarkan Kategori"
                                                setSelectedDetail   = {setSelectedDetail}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <PieChart
                                                data                = {chartByWorkunitLevel}
                                                type                = "berita_per_level"
                                                title               = "Berita Berdasarkan Tingkat Satker"
                                                setSelectedDetail   = {setSelectedDetail}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={4}>
                                    <Card>
                                        <CardBody>
                                            <CardTitle className="pl-1">
                                                Berita Per Satker
                                            </CardTitle>
                                            <div
                                                style     = {{height: '53.8vh'}}
                                            >
                                                <PerfectScrollbar
                                                    options   = {{wheelPropagation: false}}
                                                    component = 'div'
                                                    onScrollX = {false}
                                                    className = 'media-list scrollable-container px-1 pb-2'
                                                >
                                                    {
                                                        chartByPeriod != null ?
                                                            chartByPeriod.map((data) => (
                                                                <Row className="pt-2">
                                                                    <Col md={6}>
                                                                        {data.name}
                                                                    </Col>
                                                                    <Col md={2} className="text-center">
                                                                        {data.value}
                                                                    </Col>
                                                                    <Col md={4}>
                                                                        <Progress value={data.value}/>
                                                                    </Col> 
                                                                </Row>
                                                            ))
                                                        :
                                                            null 
                                                    }
                                                </PerfectScrollbar>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}> 
                                    <GroupBarChart
                                        data                = {chartByCategoryYearly}
                                        type                = "berita_per_kategori_tahunan"
                                        title               = "Timeline Perkembangan Berita"
                                        setSelectedDetail   = {setSelectedDetail}
                                    />
                                </Col>
                            </Row>
                        </>
                    }
                </div>
            </PerformanceProvider>

        </>
    );
};

export default GIS;