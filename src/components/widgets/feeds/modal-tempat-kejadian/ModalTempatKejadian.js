import React,{Fragment, useEffect, useState} from 'react'
import { MapPin } from 'react-feather';
import { Card, CardBody, FormGroup, Input, Label } from 'reactstrap';
import { API_MAPBOX } from '../../../../services/core/default';
import MapboxApi from '../../../../services/pages/mapbox';
import ContainerFluid from '../../fluid';



function GeoSearching({setGeo,text}){
    MapboxApi.geoLocation({query:text,accessToken:API_MAPBOX.yudhi}).then(({data})=>{
        const feature = MapboxApi.getFeature(data)
        setGeo(feature)
    })
}

function CardListGeo({properties,setLocationData,id,text,place_name,geometry:{coordinates}}){
        const place_text = properties.address==undefined?place_name:properties.address
        return(
        <Card className="cursor-pointer" onClick={()=>{
            const latitude  = coordinates[1]
            const longitude = coordinates[0]
            const location  = place_name
            setLocationData({
                location:location,
                latitude:latitude,
                longitude:longitude,
            })
        }}>
            <CardBody>
                <div className="d-flex justify-content-start" style={{alignItems:"center"}}>
                    <MapPin/>
                    <ContainerFluid>
                        <strong>{text}</strong><br/>
                        <span className='text-muted'>
                            {place_text}
                        </span>
                    </ContainerFluid>
                </div>
            </CardBody>
        </Card>
    )
}

const ModalTempatKejadian=(props)=>{
    const [geo,setGeo] = useState(null)
    const [data,setData] = useState({
        location:"",
        latitude:0,
        longitude:0,
    })
    useEffect(()=>{
        if(geo==null){

        }
    },[])
    return(
    <Fragment>
        <FormGroup>
            <Label>Cari Lokasi</Label>
            <Input placeholder="Ketik Nama Lokasi" onKeyDown={(e)=>{
                const {keyCode,target:{value}} = e
                if(keyCode===13){
                    GeoSearching({text:value,setGeo:(param)=>{
                        setGeo(param)
                    }})
                }

            }}/>
        </FormGroup>
        <FormGroup>
            {Array.isArray(geo)?geo.map(geovalue=>{
                const {id,place_name,geometry:{coordinates}} = geovalue

                return (
                    <CardListGeo setLocationData={(param)=>{
                        props.setLocation(param)
                        
                    }} {...geovalue} key={`geovalue-${id}`}/>
                )
            }):null}
        </FormGroup>
    </Fragment>)
}

export default ModalTempatKejadian;