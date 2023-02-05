
import React, {useEffect, useState}     from 'react'
import ReactMapGL, { Marker, Popup }    from 'react-map-gl';
import mapboxgl                         from 'mapbox-gl';


import { 
    Card, 
    Button,
    CardBody, 
    CardTitle,
    CardHeader,
    DropdownItem, 
    DropdownMenu,
    DropdownToggle,
    UncontrolledButtonDropdown,
}                                       from "reactstrap"
import Helper                           from "../../../helpers"
import dashboardAPI                     from '../../../services/pages/dashboard'
import ImageRounded from '../image-rounded';
import { Link } from 'react-router-dom';
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export const MapChart = (props) => { 

    const {
        id, 
        data,
        index,
        title,
        dashboard,
        handleUpdate, 
        handleDelete, 
        detailChartAction, 
    } = props;

    const size = 20;

    const [lng, setLng]                        		= useState(117.94);
	const [lat, setLat]                        		= useState(-2.4);
	const [zoom, setZoom]                      		= useState(4);
    const [chartData, setChartData]                 = useState([]);
    const [popupInfo, setPopupInfo]                 = useState(null);
	const [viewport, setViewport]                   = useState({
		zoom: zoom,
		latitude: lat,
		longitude: lng,
		mapboxApiAccessToken:"pk.eyJ1IjoiemVwaHlyZm4iLCJhIjoiY2trNzI5bWN1MDlubDJ1cW94Z3hicm9qdCJ9.HPNjaaL1I5rkMdSg1AJf5g",
	});


    const getChartData = () => {

        const formData = {
            type              : data.body.type,
            chart             : data.body.chart,
            point_radius      : 1,
        }
        
        if("period_type" in data.body){
            formData.period_type      = data.body.period_type;
            formData.workunit_id_list = data.body.workunit_id_list;
        }

        dashboardAPI.getChartData(data.url, formData).then(
            res => {
                if(res.status === 200 && res.data != null){
                    setChartData(res.data);
                }else{
                    setChartData(0);
                }
            },
            err => {
                console.log(err, 'get line chart data');
            }
        )
    }
    const handleClick = () => {
        if("details" in chartData){
            detailChartAction(chartData.details, title, chartData.filter);
        }else{
            // let redirect = Helper.getParemeterFromString(chartData, "type");

            if(redirect === "laporan_masyarakat_harian" || redirect == "laporan_masyarakat_mingguan"){
                window.location.href = "/laporan"
            }else if(redirect === "jumah_per_jenis_file" || redirect === "kapasitas_penyimpanan" || redirect === "kapasitas_penyimpanan_pengguna"){
                window.location.href = "/file-manajemen"
            }else if(redirect === "aktifitas_per_jam" || redirect === "aktifitas_per_hari" || redirect === "aktifitasi_per_minggu"){
                window.location.href = "/konfigurasi/aktivitas-pengguna"
            }
        }
    };

    useEffect(() => {
        if(data != undefined){
            getChartData();
        }

        return(() => (
            setChartData(0)
        ))
    }, []);

    return(
        <Card style   = {{width: '100%',  flex: 1}}>
            <CardHeader>
                <CardTitle tag='h4'>
                    {(title == undefined || title == null ? "" : title)}
                </CardTitle>
                {
                    data != undefined ? 
                        <div>
                            <UncontrolledButtonDropdown>
                                <Button 
                                    size    = "sm" 
                                    color   = 'primary' 
                                    onClick = {handleClick}
                                >
                                    Detail
                                </Button>
                                {
                                    !dashboard &&
                                    <>
                                        <DropdownToggle outline className='dropdown-toggle-split' color='secondary' caret></DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem tag='a' onClick={() => {handleUpdate(id, index)}}>Atur Ulang Grafik</DropdownItem>
                                            <DropdownItem tag='a' onClick={() => {handleDelete(id)}}>Nonaktifkan</DropdownItem>
                                        </DropdownMenu>
                                    </>
                                }
                            </UncontrolledButtonDropdown>
                        </div>
                    :
                        null
                }
            </CardHeader>
            <CardBody>
                    <ReactMapGL
                        {...viewport}
                        mapStyle            = "mapbox://styles/zephyrfn/ckra22zgd4uh517m5plawan4p"
                        onViewportChange    = {nextViewport => setViewport(nextViewport)}
                        width               = "100%"
                        height              = "400px"
                        dragPan             = {false}
                        keyboard            = {false}
                        touchZoom           = {false}
                        scrollZoom          = {false}
                        dragRotate          = {false}
                        interactive         = {false}
                        touchRotate         = {false}
                        doubleClickZoom     = {false}
                    >
                        {
                            chartData.length > 0 ?
                                chartData.map((data,index) => (
                                    <Marker
                                        key         = {"marker_"+index} 
                                        latitude    = {data.latitude}
                                        longitude   = {data.longitude} 
                                    >
                                        <div 
                                            style   = {{ background: 'blue', height: size, width: size, borderRadius: '50%', textAlign:'center', color: 'white', transform: `translate(${-size / 1.5}px,${-size}px)`, cursor: 'pointer'}}
                                            onClick = {() => setPopupInfo(data)}
                                        >
                                            <span style={{fontWeight:'600'}}>{data.count}</span>
                                        </div>
                                        {/* <img
                                            onClick = {() => setPopupInfo(data)}
                                            src     = {MarkerIcon}
                                            style   = {{ cursor: 'pointer', width: size, height: size, transform: `translate(${-size / 2}px,${-size}px)`}}
                                        /> */}
                                    </Marker>
                                ))
                            :
                                null
                        }
                        {
                            popupInfo && (
                                <Popup
                                    onClose      = {setPopupInfo}
                                    latitude     = {popupInfo.latitude}
                                    longitude    = {popupInfo.longitude}
                                >
                                    <div className="d-flex flex-column align-items-center mx-2 mt-1">
                                        <div>
                                            <ImageRounded
                                                src     = {popupInfo.logo}
                                                width   = {50}
                                            />
                                        </div>
                                        <h4
                                            style={{ color: "black", fontSize: "12px" }}
                                            className="font-weight-bolder mt-1"
                                        >
                                            {popupInfo.name}
                                        </h4>
                                        <Link to={`/configuration/work-unit-list/${popupInfo.id}`} > Detail </Link>
                                    </div>
                                    
                                </Popup>
                            )
                        }

                    </ReactMapGL>
            </CardBody>
        </Card>

    )
}