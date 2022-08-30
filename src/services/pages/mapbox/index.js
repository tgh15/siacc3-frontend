import { geoMapbox } from "./geolocation";
import getFeature from "./getFeatures";

const MapboxApi ={
    geoLocation:geoMapbox,
    getFeature:getFeature,
}

export default MapboxApi