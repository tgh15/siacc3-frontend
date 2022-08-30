import { Fragment, useState, useMemo }       from "react";
import { Card, CardBody }           from "reactstrap";
import ReactMapGL, {Source, Layer}  from 'react-map-gl';
import { API_MAPBOX, MAPBOX_SKIN }  from '../../../services/core/default';
import data                         from './geojson';
import { dataLayer } from "./mapStyle";

import mapboxgl from 'mapbox-gl';

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MapWorkunit = (props) => {
    const { defaultData } = props;

    const [viewport, setViewport] = useState({
        width       : "100%",
        height      : 300,
        latitude    : defaultData ? defaultData.latitude : -2.54893,
        longitude   : defaultData ? defaultData.longitude : 118.01486,
        zoom        : defaultData ? defaultData.zoom : 3.6
    });

    const [year, setYear] = useState(8);

    return (
        <Fragment>
            <Card id="map-satker">
                <CardBody className="px-1 py-1">
                    <ReactMapGL
                        mapStyle                = {MAPBOX_SKIN}
                        {...viewport}
                        onViewportChange        = {nextViewport => setViewport(nextViewport)}
                        mapboxApiAccessToken    = {API_MAPBOX}
                        dragPan             = {false}
                        keyboard            = {false}
                        touchZoom           = {false}
                        scrollZoom          = {false}
                        dragRotate          = {false}
                        interactive         = {false}
                        touchRotate         = {false}
                        doubleClickZoom     = {false}
                    >
                        {props.children}
                        {/* <Source type="geojson" data={data2}>
                            <Layer {...dataLayer} />
                        </Source> */}
                    </ReactMapGL>
                </CardBody>
            </Card>
        </Fragment>
    );
};

export default MapWorkunit;