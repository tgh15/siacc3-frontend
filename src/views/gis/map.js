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

import 'mapbox-gl/dist/mapbox-gl.css';


import  map                         from './geojson';
import {data}                       from './boundary';

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
    // const MAPBOX_TILESET                = `mapbox://styles/zephyrfn/cldndtbve000h01p5igki3d2o`;

    const [viewport, setViewport] = useState({
        zoom        : 3.8,
        width       : "100%",
        height      : mapHeight,
        latitude    : -2.548926,
        longitude   : 118.0148634,
    });

    const [popupInfo, setPopupInfo]     = useState(null);

    const data2 = useMemo(() => {
        if(mapData != null){
            return data && updatePercentiles(data, mapData.work_units);
        }
    }, [data, mapData]);

    useEffect(() => {
        if(gisFilter != null && gisFilter.workunit_id != undefined && mapData != null && mapData.work_units != null){
            let selectedWorkunit = mapData.work_units.filter((data) => (
                data.id === gisFilter.workunit_id.value
            ))

            if(selectedWorkunit.length > 0){
                setViewport({
                    zoom      : 6.5,
                    width     : "100%",
                    height    : mapHeight,
                    latitude  : selectedWorkunit[0].latitude,
                    longitude : selectedWorkunit[0].longitude,
                })
            }else{
                
            }
        }else{
            setViewport({
                zoom        : 3.8,
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
                mapStyle                = {MAPBOX_TILESET}
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
                                                src     = {imgMarker}
                                                style   = {{ width: "20px" }}
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
                            <Layer id="heatlayer" {...dataLayer} />
                        </Source>
                    :
                        null
                }

                {/* {
                    selectedMap ? */}
                        {/* <Source type="geojson" data={map}>
                            <Layer id="baselayer" {...dataLayer2} />
                        </Source> */}
                    {/* :
                        null
                } */}
            </ReactMapGL>
        </Fragment>

    )
}

export default Map;