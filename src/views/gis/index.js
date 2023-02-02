import {
        useState,
        useMemo,
        useEffect,
        useContext,
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
import data                         from './geojson';
import feedsGisAPI                  from '../../services/pages/feeds/gis';


//Provider
import { PerformanceProvider }      from '../../context/PerformanceContext';
import { Maximize, Minimize } from 'react-feather';

const GIS = () => {

    const [page, setPage]                                           = useState(1);
    const [fullscr,setFcr]                                          = useState(false);
    const [mapData, setMapData]                                     = useState(null);
    const [loading, setLoading]                                     = useState(true);
    const [mapFilter, setMapFilter]                                 = useState('node');
    const [gisFilter, setGisFilter]                                 = useState(null);
    const [totalPage, setTotalPage]                                 = useState(1);
    const [heatFilter, setHeatFilter]                               = useState(false);
    const [chartByKind, setChartByKind]                             = useState(null);
    const [chartFilter, setChartFilter]                             = useState(null);
    const [detailChart, setDetailChart]                             = useState(null);
    const [chartByPeriod, setChartByPeriod]                         = useState(null);
    const [selectedDetail, setSelectedDetail]                       = useState({type: null, title: null});
    const [selectedMarker, setSelectedMarker]                       = useState(null);
    const [chartByCategory, setChartByCategory]                     = useState(null);
    const [chartByWorkunitLevel, setChartByWorkunitLevel]           = useState(null);
    const [isDetailChartVisible, setIsDetailChartVisible]           = useState(false);
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

        if(gisFilter != null && gisFilter.kind != undefined){
            formData['kind'] = gisFilter.kind.value
        }else{
            formData['kind'] = 2
        }

        if(gisFilter != null && gisFilter.trending_kind != undefined){
            formData['trending_kind'] = gisFilter.trending_kind.value == 2 ? "national" : "local"
        }else{
            formData['trending_kind'] = "national"
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
        formData.kind = 2
        formData.trending_kind = "national"

        feedsGisAPI.getChartData(formData).then(
            res => {
                if(res.status === 200){
                    setChartByPeriod({
                        labels : res.data.labels,
                        value  : res.data.datasets[0].data,
                    });
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

    const getDetailChart = () => {

        setLoading(true);

        const formData = {};

        formData.type           = selectedDetail.type;
        formData.end_date       = chartFilter != null ? moment(chartFilter.end_date[0]).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD")
        formData.start_date     = chartFilter != null ? moment(chartFilter.start_date[0]).format("YYYY-MM-DD") : moment().add(-30, 'days').format("YYYY-MM-DD")
        formData.workunit_id    = chartFilter != null ? chartFilter.workunit_id.value : 0

        feedsGisAPI.getDetailChartData(formData, page).then(
            res => {
                if(res.status === 200){
                    setDetailChart(res.data);
                    setIsDetailChartVisible(true);

                    setLoading(false);
                    setTotalPage(res.data.pagination.page_total);
                }
            }
        )
    };  

    const getChartData = () => {

        let formData = {};

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


        getChartByKind(formData);
        getChartByPeriod(formData);
        getChartByCategory(formData);
        getChartByWorkunitLevel(formData);
        getChartByTrendingCategory(formData);
    };
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

    useEffect(() => {

        getGisData();
        getChartData();

    }, [gisFilter, mapFilter])

    useEffect(() => {
        if(selectedDetail.type != null){
            // getDetailChart();
        }
    }, [selectedDetail, page]);

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
                <div className='p-2'>
                    <Row className="mb-2">
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

                    {
                        loading ?
                            <Row>
                                <Col md={12} className="text-center">
                                    <Spinner/>
                                </Col>
                            </Row>
                        :
                            detailChart != null ?
                                detailChart.agent_report.map((data,index) => (
                                    <Card className="px-0 mb-1" style={{height: '5vh'}}>
                                        <Row className="h-100">
                                            <Col md={1} className="d-flex align-items-center justify-content-center">
                                                {page == 1 ? index+1 : (index+1)+(page*10) - 10}
                                            </Col>
                                            <Col md={3} className="d-flex align-items-center">
                                                {data.title}
                                            </Col>
                                            {/* <Col md={2} className="d-flex align-items-center">
                                                {data.category}
                                            </Col> */}
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
                                                            "Sudah Dipublish."
                                                }
                                            </Col>
                                        </Row>
                                    </Card>
                                ))
                            :
                                null
                    }

                    <div className="d-flex justify-content-end">
                        <Pagination className='d-flex mt-1'>
                            {
                                page == 1 ? 
                                    <PaginationItem
                                        disabled    = {true}
                                        className   = "prev-item"
                                    >
                                        <PaginationLink>
                                        </PaginationLink>
                                    </PaginationItem>
                                :
                                    <PaginationItem
                                        onClick     = {() => {setPage(page-1)}}
                                        disabled    = {false}
                                        className   = "prev-item"
                                    >
                                        <PaginationLink>
                                        </PaginationLink>
                                    </PaginationItem>
                            }
                            <PaginationItem active>
                                <PaginationLink>{page}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink>/</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink>{totalPage}</PaginationLink>
                            </PaginationItem>
                            
                            {
                                page < totalPage ?  
                                    <PaginationItem 
                                        onClick     = {() => {setPage(page+1)}}
                                        disabled    = {false}
                                        className   = "next-item"
                                    >
                                        <PaginationLink>
                                        </PaginationLink>
                                    </PaginationItem>
                                :
                                    <PaginationItem 
                                        disabled    = {true}
                                        className   = "next-item"
                                    >
                                        <PaginationLink>
                                        </PaginationLink>
                                    </PaginationItem>
                            }
                        </Pagination>
                    </div>
                    
                </div>
            </ModalBase>

            <PerformanceProvider>
                <div style={{paddingBottom: "30vh"}} id="fs-component">
                    <div className='text-right'>
                        <Button 
                            size        = "md"
                            color       = "primary" 
                            onClick     = {()=>{handleFullscreen()}} 
                            className   = "btn-icon mb-1" 
                        >
                            {icon}
                        </Button>
                    </div>

                    <Row style={{ height: '90vh'}} className="pb-5">
                        <Col md={8}>
                            <Row className="px-0">
                                <Col md={12}>
                                    <Card className="pt-2" style={{ height : '45vh', overflow: 'hidden' }}>
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
                                            mapFilter === "node" ?
                                                <div className="d-flex justify-content-between mb-1 px-1">
                                                    <div className='d-flex align-items-center'>
                                                        <div style   = {{ background: `#ffd32a`, height: 15, width: 15, borderRadius: '50%'}}/>
                                                        <span className='ml-1'>Ideologi</span>
                                                    </div>

                                                    <div className='d-flex align-items-center'>
                                                        <div style   = {{ background: `#3c40c6`, height: 15, width: 15, borderRadius: '50%'}}/>
                                                        <span className='ml-1'>Politik</span>
                                                    </div>

                                                    <div className='d-flex align-items-center'>
                                                        <div style   = {{ background: `#303952`, height: 15, width: 15, borderRadius: '50%'}}/>
                                                        <span className='ml-1'>Ekonomi</span>
                                                    </div>

                                                    <div className='d-flex align-items-center'>
                                                        <div style   = {{ background: `#ff3f34`, height: 15, width: 15, borderRadius: '50%'}}/>
                                                        <span className='ml-1'>Keuangan</span>
                                                    </div>

                                                    <div className='d-flex align-items-center'>
                                                        <div style   = {{ background: `#05c46b`, height: 15, width: 15, borderRadius: '50%'}}/>
                                                        <span className='ml-1'>Sosial Budaya</span>
                                                    </div>

                                                    <div className='d-flex align-items-center'>
                                                        <div style   = {{ background: `#af05fa7f`, height: 15, width: 15, borderRadius: '50%'}}/>
                                                        <span className='ml-1'>Pertahanan & Keamanan</span>
                                                    </div>

                                                    <div className='d-flex align-items-center'>
                                                        <div style   = {{ background: `#a5b1c2`, height: 15, width: 15, borderRadius: '50%'}}/>
                                                        <span className='ml-1'>Hukum</span>
                                                    </div>
                                                </div>
                                            :
                                                null
                                        }

                                        <Map
                                            mapData             = {mapData}
                                            mapFilter           = {mapFilter}
                                            gisFilter           = {gisFilter}
                                            heatFilter          = {heatFilter}
                                            selectedMarker      = {selectedMarker}
                                            setSelectedMarker   = {setSelectedMarker}
                                        />
                                    </Card>
                                </Col>

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

                                <Col md={6}>
                                    <HorizontalBarChart
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
                            <GisFilter
                                setGisFilter    = {setGisFilter}
                                chartByPeriod   = {chartByPeriod}
                            />                            
                        </Col>
                    </Row>
                </div>
            </PerformanceProvider>

        </>
    );
};

export default GIS;