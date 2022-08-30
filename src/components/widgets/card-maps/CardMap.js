

import React, { useContext, useRef, useState }          from 'react'
import {Button, Card, CardBody, CardTitle, FormGroup}   from 'reactstrap'

import ReactMapGL,{Marker}                              from 'react-map-gl';
import { SelMinMaxHeightCard }                          from '../../utility/Utils';

import mapboxgl                                         from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import ContainerFluid from '../fluid';
import CardMapDefaultData from './CardMapDefaultData';
import { ThemeColors } from '../../utility/context/ThemeColors';
import { API_MAPBOX, MAPBOX_SKIN } from '../../../services/core/default';
const MAPBOX_TOKEN = API_MAPBOX
const MAPBOX_TILESET = MAPBOX_SKIN

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;


const MapMarker = ({name,geo,agent_report_count,data})=>{
    const {colors} = useContext(ThemeColors)
    return(
        <Marker latitude={geo.latitude} longitude={geo.longitude}>
            <div 
            onClick     = {()=>{}} 
            className   = "cursor-pointer" 
            style       = {{
                width:32,
                height:32,
                borderRadius:"50%",
                backgroundColor:colors.primary.main,
                paddingTop:5,
                textAlign:"center"
            }}>{agent_report_count}</div>
        </Marker>
    )
}
const CardMap = ({datasets,identity_id,colNum,title,legend,tooltips,xOptions,yOptions})=>{
    const minMax = colNum==undefined?{minHeight:400}:{minHeight:SelMinMaxHeightCard(colNum)}
    const mapHeight = (minMax.minHeight-100)
    const [viewport, setViewport] = useState({
        width: "100%",
        height: mapHeight,
        latitude: -2.548926,
        longitude: 118.0148634,
        zoom: 3
    });
    console.log(xOptions)
    const dataset = datasets==undefined||datasets==null?CardMapDefaultData:[];
    return (
        <Card style={{...minMax}}>
            <CardBody ref={(xRef)=>{
                console.log("REF",xRef)
            }}>
                <CardTitle>{title}</CardTitle>
                                
                    <ReactMapGL
                    
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                        mapStyle={MAPBOX_TILESET}
                        {...viewport}
                        onViewportChange={nextViewport => setViewport(nextViewport)}
                        onClick={(e)=>{
                            console.log("onClick",e)
                        }}
                        >
                            {dataset.map(value=>{
                                const MathRand = Math.round(Math.random()*999-1)
                                return(<MapMarker data={value} key={`workunit_mark_${MathRand}-${value.workunit_id}`} {...value}/>)
                            })}
                    </ReactMapGL>
            </CardBody>
        </Card>
    )
}


export {CardMap}