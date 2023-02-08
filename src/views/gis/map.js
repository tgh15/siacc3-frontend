import { 
    useMemo,
    Fragment,
    useState,
    useEffect,
}                                   from 'react';
import ReactMapGL, {
    Layer, 
    Popup,
    Source, 
    Marker,
}                                   from 'react-map-gl';


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
import { updatePercentiles}         from './utils';

const Map = (props) => {
    
    const {
        mapData,
        mapFilter,
        gisFilter,
        heatFilter,
        selectedMarker,
        setSelectedMarker,
    }                                   = props;

    const size                          = 20;
    const minMax                        = 600;
    const sizeNode                      = 10;
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

    const [selectedMap, setSelectedMap] = useState(null);

    const data2 = useMemo(() => {
        if(mapData != null){
            return data && updatePercentiles(data, mapData.work_units);
        }
    }, [data, mapData]);


    const getFileJsonName = (code) => {
        if (code === "006050"){
            setSelectedMap(updatePercentiles(aceh, mapData.work_units))
        }else if (code === "008678"){
            setSelectedMap(bali)
        }else if (code === "650325"){
            setSelectedMap(banten)
        }else if (code === "009073"){
            setSelectedMap(bengkulu)
        }else if (code === "005655"){
            setSelectedMap(diy)
        }else if (code === "005020"){
            setSelectedMap(dki)
        }else if (code === "650346"){
            setSelectedMap(gorontalo)
        }else if (code === "006994"){
            setSelectedMap(jambi)
        }else if (code === "005083"){
            setSelectedMap(jabar)
        }else if (code === "005304"){
            setSelectedMap(jateng)
        }else if (code === "005719"){
            setSelectedMap(jatim)
        }else if (code === "007371"){
            setSelectedMap(kalbar)
        }else if (code === "007591"){
            setSelectedMap(kalsel)
        }else if (code === "007481"){
            setSelectedMap(kalteng)
        }else if (code === "007702"){
            setSelectedMap(kaltim)
        }else if (code === "650311"){
            setSelectedMap(kepbabel)
        }else if (code === "969400"){
            setSelectedMap(kepriau)
        }else if (code === "007301"){
            setSelectedMap(lampung)
        }else if (code === "008462"){
            setSelectedMap(maluku)
        }else if (code === "650332"){
            setSelectedMap(malut)
        }else if (code === "008767"){
            setSelectedMap(ntb)
        }else if (code === "008835"){
            setSelectedMap(ntt)
        }else if (code === "008970"){
            setSelectedMap(papua)
        }else if (code === "006817"){
            setSelectedMap(riau)
        }else if (code === "008107"){
            setSelectedMap(sulsel)
        }else if (code === "007872"){
            setSelectedMap(sulteng)
        }else if (code === "008416"){
            setSelectedMap(sultra)
        }else if (code === "007783"){
            setSelectedMap(sulut)
        }else if (code === "006622"){
            setSelectedMap(sumbar)
        }else if (code === "007102"){
            setSelectedMap(sumsel)
        }else if (code === "006287"){
            setSelectedMap(sumut)
        }else if (code === "00001"){
            setSelectedMap(pabar)
        }else if (code === "001001"){
            setSelectedMap(sulbar)
        }
    }

    useEffect(() => {
        if(gisFilter != null && gisFilter.workunit_id != undefined && mapData != null && mapData.work_units != null){
            let selectedWorkunit = mapData.work_units.filter((data) => (
                data.id === gisFilter.workunit_id.value
            ))

            console.log(selectedWorkunit[0])

            if(selectedWorkunit.length > 0){
                setSelectedMap(true);
                setViewport({
                    zoom      : 7,
                    width     : "100%",
                    height    : mapHeight,
                    latitude  : selectedWorkunit[0].latitude,
                    longitude : selectedWorkunit[0].longitude,
                })
                getFileJsonName(selectedWorkunit[0].code);
            }
        }else{
            setViewport({
                zoom        : 3.6,
                width       : "100%",
                height      : mapHeight,
                latitude    : -2.548926,
                longitude   : 118.0148634,
            })
        }
    }, [gisFilter, mapData]);


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
                                                        style   = {{ background: `#ffd32a`, height: sizeNode, width: sizeNode, borderRadius: '50%', textAlign:'center', color: 'white', transform: `translate(${-sizeNode / 2}px,${-sizeNode}px)`, cursor: 'pointer'}}
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
                                                    style   = {{ background: `#3c40c6`, height: sizeNode, width: sizeNode, borderRadius: '50%', textAlign:'center', color: 'white', transform: `translate(${-sizeNode / 2}px,${-sizeNode}px)`, cursor: 'pointer'}}
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
                                                        style   = {{ background: `#303952`, height: sizeNode, width: sizeNode, borderRadius: '50%', textAlign:'center', color: 'white', transform: `translate(${-sizeNode / 2}px,${-sizeNode}px)`, cursor: 'pointer'}}
                                                    />
                                                </Marker>
                                            ))
                                        :
                                            null
                                    :
                                        null
                                }
                                {
                                    category.data != null && category.data.length > 0 ? 
                                        category.data.map((data) => (
                                            <Marker
                                                key       = {category.label+"-"+data.id}
                                                latitude  = {data.latitude}
                                                longitude = {data.longitude}
                                            >
                                                <div 
                                                    style   = {{ background: `#ff3f34`, height: sizeNode, width: sizeNode, borderRadius: '50%', textAlign:'center', color: 'white', transform: `translate(${-sizeNode / 2}px,${-sizeNode}px)`, cursor: 'pointer'}}
                                                />
                                            </Marker>
                                        ))
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
                                                        style   = {{ background: `#05c46b`, height: sizeNode, width: sizeNode, borderRadius: '50%', textAlign:'center', color: 'white', transform: `translate(${-sizeNode / 2}px,${-sizeNode}px)`, cursor: 'pointer'}}
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
                                                        style   = {{ background: `#af05fa7f`, height: sizeNode, width: sizeNode, borderRadius: '50%', textAlign:'center', color: 'white', transform: `translate(${-sizeNode / 2}px,${-sizeNode}px)`, cursor: 'pointer'}}
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
                                                        style   = {{ background: `#a5b1c2`, height: sizeNode, width: sizeNode, borderRadius: '50%', textAlign:'center', color: 'white', transform: `translate(${-sizeNode / 2}px,${-sizeNode}px)`, cursor: 'pointer'}}
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
                   
            </ReactMapGL>
        </Fragment>

    )
}

export default Map;