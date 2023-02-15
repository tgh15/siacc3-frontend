import { 
    useMemo,
    Fragment,
    useState,
    useEffect,
    useCallback,
}                                   from 'react';
import ReactMapGL,{
    Layer, 
    Popup,
    Source, 
    Marker,
    NavigationControl
}                                   from 'react-map-gl';

import {
    Button
}                                   from 'reactstrap'

import {
    Download
}                                   from 'react-feather';

import {
    aceh,
    bali,
    banten,
    bengkulu,
    diy,
    dki,
    gorontalo,
    jabar,
    jambi,
    jateng,
    jatim,
    kalbar,
    kalsel,
    kalteng,
    kaltim,
    kepbabel,
    kepriau,
    lampung,
    maluku,
    malut,
    ntb,
    ntt,
    pabar,
    papua,
    riau,
    sulbar,
    sulsel,
    sulteng,
    sultra,
    sulut,
    sumbar,
    sumsel,
    sumut,
    data
}                                   from './boundary';

import { dataLayer, dataLayer2 }    from "./mapStyle";

import imgMarker                    from "../../assets/images/map_icons/point-map.png";
import ImageRounded                 from '../../components/widgets/image-rounded';

import { API_MAPBOX, MAPBOX_SKIN }  from '../../services/core/default';
import { 
    updateColor,
    updatePercentiles,
    updatePercentilesDetail
}                                   from './utils';

const useResize = (handler) => {
    useEffect(() => {
      window.addEventListener("resize", handler);
  
      return () => {
        window.removeEventListener("resize", handler);
      };
    }, [handler]);
  };

const Map = (props) => {
    const {
        icon,
        mapData,
        mapFilter,
        gisFilter,
        heatFilter,
        selectedMap,
        isFullScreen,
        setSelectedMap,
        selectedMarker,
        setIsFullScreen,
        handleFullScreen,
        setSelectedMarker,
    }                                   = props;

    const size                          = 20;
    const sizeNode                      = 10;
    const [minMax, setMinMax]           = useState(600)
    const mapHeight                     = (minMax-186);
    const MAPBOX_TOKEN                  = API_MAPBOX;
    const MAPBOX_TILESET                = MAPBOX_SKIN;
    const MAPBOX_STYLE_BLANK            = `mapbox://styles/zephyrfn/cldndtbve000h01p5igki3d2o`;

    const [viewport, setViewport]       = useState({
        zoom        : 3.6,
        width       : "100%",
        height      : mapHeight,
        latitude    : -2.54893,
        longitude   : 118.01486,
    });

    const [centerPositionMap, setCenterPositionMap]  = useState({
        latitude    : 0,
        longitude   : 0
    })

    const data2 = useMemo(() => {
        
        if(mapData != null && selectedMap == null){
            return data && updatePercentiles(data, mapData.work_units);
        }
        if(mapData != null && selectedMap != null){
            return selectedMap && updatePercentilesDetail(selectedMap, mapData.work_units)
        }
    }, [data, mapData, selectedMap]);

    const getFileJsonName = (code) => {
        if (code === "006050"){
            setSelectedMap(updateColor(aceh, mapData.work_units))
            setCenterPositionMap({latitude : 4.705565134429243, longitude : 96.71696116065199})
        }else if (code === "008678"){
            setSelectedMap(updateColor(bali, mapData.work_units))
            setCenterPositionMap({latitude : -8.341252345543086, longitude : 115.08390057693202})
        }else if (code === "650325"){
            setSelectedMap(updateColor(banten, mapData.work_units))
            setCenterPositionMap({latitude : -6.399373259406597, longitude : 106.09642066528701})
        }else if (code === "009073"){
            setSelectedMap(updateColor(bengkulu, mapData.work_units))
            setCenterPositionMap({latitude : -3.8136597984588967, longitude : 102.2893687108649})
        }else if (code === "005655"){
            setSelectedMap(updateColor(diy, mapData.work_units))
            setCenterPositionMap({latitude : -7.878395343583588, longitude : 110.39678547754697})
        }else if (code === "005020"){
            setSelectedMap(updateColor(dki, mapData.work_units))
            setCenterPositionMap({latitude : -6.203436395742954, longitude : 106.86778574414076})
        }else if (code === "650346"){
            setSelectedMap(updateColor(gorontalo, mapData.work_units))
            setCenterPositionMap({latitude : 0.7210554847283317, longitude : 122.45298641468537})
        }else if (code === "006994"){
            setSelectedMap(updateColor(jambi, mapData.work_units))
            setCenterPositionMap({latitude : -1.5878425740301796, longitude : 102.69899571830484})
        }else if (code === "005083"){
            setSelectedMap(updateColor(jabar, mapData.work_units))
            setCenterPositionMap({latitude : -6.916599705798558, longitude : 107.6187206209833})
        }else if (code === "005304"){
            setSelectedMap(updateColor(jateng, mapData.work_units))
            setCenterPositionMap({latitude : -7.305283212795637, longitude : 110.10089128865421})
        }else if (code === "005719"){
            setSelectedMap(updateColor(jatim, mapData.work_units))
            setCenterPositionMap({latitude : -7.730066135490137, longitude : 112.67718519777326})
        }else if (code === "007371"){
            setSelectedMap(updateColor(kalbar, mapData.work_units))
            setCenterPositionMap({latitude : -0.11620418925405451, longitude : 111.05706083126})
        }else if (code === "007591"){
            setSelectedMap(updateColor(kalsel, mapData.work_units))
            setCenterPositionMap({latitude : -2.969003842047445, longitude : 115.4942178424309})
        }else if (code === "007481"){
            setSelectedMap(updateColor(kalteng, mapData.work_units))
            setCenterPositionMap({latitude : -1.4554391963362934, longitude : 113.38868077834293})
        }else if (code === "007702"){
            setSelectedMap(updateColor(kaltim, mapData.work_units))
            setCenterPositionMap({latitude : 0.6148475108073798, longitude : 116.329368452734})
        }else if (code === "650311"){
            setSelectedMap(updateColor(kepbabel, mapData.work_units))
            setCenterPositionMap({latitude : -2.676100842762754, longitude : 106.50028788191773})
        }else if (code === "969400"){
            setSelectedMap(updateColor(kepriau, mapData.work_units))
            setCenterPositionMap({latitude : 0.32581185622054193, longitude : 104.36862265810797})
        }else if (code === "007301"){
            setSelectedMap(updateColor(lampung, mapData.work_units))
            setCenterPositionMap({latitude : -4.828281306088277, longitude : 105.09516005114095})
        }else if (code === "008462"){
            setSelectedMap(updateColor(maluku, mapData.work_units))
            setCenterPositionMap({latitude : -5.646003455817048, longitude : 129.7745412527819})
        }else if (code === "650332"){
            setSelectedMap(updateColor(malut, mapData.work_units))
            setCenterPositionMap({latitude : 0.6110314490493919, longitude : 127.76941977603322})
        }else if (code === "008767"){
            setSelectedMap(updateColor(ntb, mapData.work_units))
            setCenterPositionMap({latitude : -8.685687981637162, longitude : 117.42949143739641})
        }else if (code === "008835"){
            setSelectedMap(updateColor(ntt, mapData.work_units))
            setCenterPositionMap({latitude : -9.522914938328848, longitude : 122.19102431741588})
        }else if (code === "008970"){
            setSelectedMap(updateColor(papua, mapData.work_units))
            setCenterPositionMap({latitude : -4.355637454729408, longitude : 138.65219170112155})
        }else if (code === "006817"){
            setSelectedMap(updateColor(riau, mapData.work_units))
            setCenterPositionMap({latitude : 0.42038331465175277, longitude : 101.70969398281464})
        }else if (code === "008107"){
            setSelectedMap(updateColor(sulsel, mapData.work_units))
            setCenterPositionMap({latitude : -3.979001753179127, longitude : 119.986119377144560})
        }else if (code === "007872"){
            setSelectedMap(updateColor(sulteng, mapData.work_units))
            setCenterPositionMap({latitude : -0.7474579485868843, longitude : 121.16369207500321})
        }else if (code === "007783"){
            setSelectedMap(updateColor(sulut, mapData.work_units))
            setCenterPositionMap({latitude : 0.699949832606657, longitude : 124.3308498671964})
        }else if (code === "008416"){
            setSelectedMap(updateColor(sultra, mapData.work_units))
            setCenterPositionMap({latitude : -3.990619075165716, longitude : 122.04236839178547})
        }else if (code === "001001"){
            setSelectedMap(updateColor(sulbar, mapData.work_units))
            setCenterPositionMap({latitude : -2.495198109485345, longitude : 119.36674267366904})
        }else if (code === "006622"){
            setSelectedMap(updateColor(sumbar, mapData.work_units))
            setCenterPositionMap({latitude : -0.5445985127422124, longitude : 100.48364831042149})
        }else if (code === "007102"){
            setSelectedMap(updateColor(sumsel, mapData.work_units))
            setCenterPositionMap({latitude : -3.170565611456028, longitude : 104.13330333016381})
        }else if (code === "006287"){
            setSelectedMap(updateColor(sumut, mapData.work_units))
            setCenterPositionMap({latitude : 2.02309351205235, longitude : 98.7849784578709})
        }else if (code === "00001"){
            setSelectedMap(updateColor(pabar, mapData.work_units))
            setCenterPositionMap({latitude : -1.90850263965104740, longitude : 132.5837537700121})
        }
    }

    useEffect(() => {
        if(gisFilter != null && gisFilter.workunit_id != undefined && mapData != null && mapData.parent.id != 0){
            getFileJsonName(mapData.parent.code);
        }else{
            if(isFullScreen){
                setViewport({
                    zoom        : 3.6,
                    width       : "100%",
                    height      : 1600-186,
                    latitude    : -2.548926,
                    longitude   : 118.0148634,
                })
            }else{
                setViewport({
                    zoom        : 3.6,
                    width       : "100%",
                    height      : 600-186,
                    latitude    : -2.548926,
                    longitude   : 118.0148634,
                })
            }
        }
    }, [gisFilter, mapData]);

    useEffect(() => {
        if(centerPositionMap.latitude != 0){
            if(isFullScreen){
                setViewport({
                    zoom      : 6.5,
                    width     : "100%",
                    height    : 1600-186,
                    latitude  : centerPositionMap.latitude,
                    longitude : centerPositionMap.longitude,
                })
            }else{
                setViewport({
                    zoom      : 5.8,
                    width     : "100%",
                    height    : 600-186,
                    latitude  : centerPositionMap.latitude,
                    longitude : centerPositionMap.longitude,
                })
            }
            
        }
    },[centerPositionMap])

    useEffect(() => {
        if(isFullScreen){
            setViewport({
                zoom        : 3.6,
                width       : "100%",
                height      : 1600-186,
                latitude    : -2.548926,
                longitude   : 118.0148634,
            })
        }else{
            setViewport({
                zoom        : 3.6,
                width       : "100%",
                height      : 600-186,
                latitude    : -2.548926,
                longitude   : 118.0148634,
            })
        }
    },[isFullScreen])

    return (
        <Fragment>
            <ReactMapGL
                style                   = {{borderRadius: '20px'}}
                mapStyle                = {selectedMap ? MAPBOX_STYLE_BLANK : MAPBOX_TILESET}
                onViewportChange        = {nextViewport => setViewport(nextViewport)}
                mapboxApiAccessToken    = {MAPBOX_TOKEN}
                {...viewport}
            >
                {
                    mapFilter === 'pin' && mapData != null ? 
                        <>
                            {
                                mapData.work_units != null && mapData.work_units.map((data) => (
                                    <Marker
                                        key       = {data.id}
                                        latitude  = {data.latitude}
                                        longitude = {data.longitude}
                                    >
                                        <button
                                            style   = {{ background: 'none', border: 'none', height: size + 10, width: size + 10, borderRadius: '50%', textAlign: 'center', color: 'white', transform: `translate(${-size / 1.5}px,${-size}px)`, cursor: 'pointer' }}
                                            onClick = {(e) => { setSelectedMarker(data) }}
                                        >
                                            <ImageRounded
                                                src   = {imgMarker}
                                                style = {{ width: "20px" }}
                                            />
                                        </button>
                                    </Marker>
                                ))
                            }
                            {
                                selectedMarker && (
                                    <Popup
                                        anchor       = "top"
                                        tipSize      = {5}
                                        onClose      = {setSelectedMarker}
                                        latitude     = {selectedMarker.latitude}
                                        longitude    = {selectedMarker.longitude}
                                        closeOnClick = {false}
                                    >
                                        <div
                                            style = {{ textAlign: 'center' }}
                                        >
                                            <p style = {{ marginTop: '10px' }}>
                                                {selectedMarker.name}
                                            </p>

                                            <p style = {{ marginTop: '10px' }}>
                                                Total Berita : {selectedMarker.total_report}
                                            </p>

                                            <a href={`/configuration/work-unit-list/${selectedMarker.id}`} style = {{ marginTop: '10px' }}>
                                                Detail
                                            </a>

                                        </div>
                                        
                                    </Popup>
                                )
                            }
                        </>
                    :
                        mapData != null ? 
                            mapData.geo_categories != null && mapData.geo_categories.map((category) => (
                                <>
                                {
                                    category.label == "Ideologi" ? 
                                        category.data != null && category.data.length > 0 ? 
                                            category.data.map((data) => (
                                                <Marker
                                                    key       = {category.label+"-"+data.id}
                                                    latitude  = {data.latitude}
                                                    longitude = {data.longitude}
                                                >
                                                    <div 
                                                        style   = {{ background: `#ffd32a`, height: sizeNode + 5, width: sizeNode + 5, borderRadius: '50%', textAlign: 'center', color: 'white', transform: `translate(${-sizeNode / 1.5}px,${-sizeNode}px)`, cursor: 'pointer' }}
                                                        onClick = {(e) => { setSelectedMarker(data) }}
                                                    />
                                                </Marker>
                                            ))
                                        :
                                            null
                                    :
                                        null
                                }

                                {
                                    category.label == "Politik" ? 
                                        category.data != null && category.data.length > 0 ? 
                                            category.data.map((data) => (
                                                <Marker
                                                    key       = {category.label+"-"+data.id}
                                                    latitude  = {data.latitude}
                                                    longitude = {data.longitude}
                                                >
                                                    <div
                                                        style   = {{ background: `#3c40c6`, height: sizeNode + 5, width: sizeNode + 5, borderRadius: '50%', textAlign: 'center', color: 'white', transform: `translate(${-sizeNode / 1.5}px,${-sizeNode}px)`, cursor: 'pointer' }}
                                                        onClick = {(e) => { setSelectedMarker(data) }}
                                                    />
                                                </Marker>
                                            ))
                                        :
                                            null
                                    :
                                        null
                                }
                                {
                                    category.label == "Ekonomi" ? 
                                        category.data != null && category.data.length > 0 ? 
                                            category.data.map((data) => (
                                                <Marker
                                                    key       = {category.label+"-"+data.id}
                                                    latitude  = {data.latitude}
                                                    longitude = {data.longitude}
                                                >
                                                    <div 
                                                        style   = {{ background: `#303952`, height: sizeNode + 5, width: sizeNode + 5, borderRadius: '50%', textAlign: 'center', color: 'white', transform: `translate(${-sizeNode / 1.5}px,${-sizeNode}px)`, cursor: 'pointer' }}
                                                        onClick = {(e) => { setSelectedMarker(data) }}
                                                    />
                                                </Marker>
                                            ))
                                        :
                                            null
                                    :
                                        null
                                }
                                {
                                    category.label == "Keuangan" ? 
                                        category.data != null && category.data.length > 0 ? 
                                            category.data.map((data) => (
                                                <Marker
                                                    key       = {category.label+"-"+data.id}
                                                    latitude  = {data.latitude}
                                                    longitude = {data.longitude}
                                                >
                                                    <div 
                                                        style   = {{ background: `#ff3f34`, height: sizeNode + 5, width: sizeNode + 5, borderRadius: '50%', textAlign: 'center', color: 'white', transform: `translate(${-sizeNode / 1.5}px,${-sizeNode}px)`, cursor: 'pointer' }}
                                                        onClick = {(e) => { setSelectedMarker(data) }}
                                                    />
                                                </Marker>
                                            ))
                                        :
                                            null
                                    :
                                        null

                                }
                                {
                                    category.label == "Sosial Budaya" ? 
                                        category.data != null && category.data.length > 0 ? 
                                            category.data.map((data) => (
                                                <Marker
                                                    key       = {category.label+"-"+data.id}
                                                    latitude  = {data.latitude}
                                                    longitude = {data.longitude}
                                                >
                                                    <div 
                                                        style   = {{ background: `#05c46b`, height: sizeNode + 5, width: sizeNode + 5, borderRadius: '50%', textAlign: 'center', color: 'white', transform: `translate(${-sizeNode / 1.5}px,${-sizeNode}px)`, cursor: 'pointer' }}
                                                        onClick = {(e) => { setSelectedMarker(data) }}
                                                    />
                                                </Marker>
                                            ))
                                        :
                                            null
                                    :
                                        null
                                }
                                {
                                    category.label == "Pertahanan & Keamanan" ? 
                                        category.data != null && category.data.length > 0 ? 
                                            category.data.map((data) => (
                                                <Marker
                                                    key       = {category.label+"-"+data.id}
                                                    latitude  = {data.latitude}
                                                    longitude = {data.longitude}
                                                >
                                                    <div 
                                                        style   = {{ background: `#af05fa7f`, height: sizeNode + 5, width: sizeNode + 5, borderRadius: '50%', textAlign: 'center', color: 'white', transform: `translate(${-sizeNode / 1.5}px,${-sizeNode}px)`, cursor: 'pointer' }}
                                                        onClick = {(e) => { setSelectedMarker(data) }}
                                                    />
                                                </Marker>
                                            ))
                                        :
                                            null
                                    :
                                        null
                                }
                                {
                                    category.label == "Hukum" ? 
                                        category.data != null && category.data.length > 0 ? 
                                            category.data.map((data) => (
                                                <Marker
                                                    key       = {category.label+"-"+data.id}
                                                    latitude  = {data.latitude}
                                                    longitude = {data.longitude}
                                                >
                                                    <div 
                                                        style   = {{ background: `#a5b1c2`, height: sizeNode + 5, width: sizeNode + 5, borderRadius: '50%', textAlign: 'center', color: 'white', transform: `translate(${-sizeNode / 1.5}px,${-sizeNode}px)`, cursor: 'pointer' }}
                                                        onClick = {(e) => { setSelectedMarker(data) }}
                                                    />
                                                </Marker>
                                            ))
                                        :
                                            null
                                    :
                                        null
                                }
                                </>
                            ))
                        :
                            null
                }

                    
                
                {
                    heatFilter ? 
                        <Source type="geojson" data={data2}>
                            <Layer {...dataLayer} />
                        </Source>
                    :
                        null
                }

                    

                {
                    selectedMap != null &&
                    <Source type="geojson" data={selectedMap}>
                        <Layer {...dataLayer2} />
                    </Source>
                }

                <NavigationControl
                    style           = {{paddingLeft: '10px', paddingTop: '5px'}}
                    showCompass     = {false}
                />
                
            </ReactMapGL>

            <Button 
                size        = "sm"
                color       = "primary" 
                style       = {{position: 'absolute', right: 10, bottom: 10}}
                onClick     = {()=>{setIsFullScreen(!isFullScreen); handleFullScreen()}} 
                className   = "btn-icon" 
            >
                {icon}
            </Button>

            {
                // isFullScreen &&
                <Button 
                    size        = "sm"
                    color       = "primary" 
                    style       = {{position: 'absolute', left: 10, bottom: 10}}
                    // onClick     = {()=>{setIsFullScreen(!isFullScreen); handleFullScreen()}} 
                    className   = "btn-icon" 
                >
                    <Download 
                        size    = {14}
                        style
                    />
                    Download
                </Button>
            }
            
        </Fragment>

    )
}

export default Map;