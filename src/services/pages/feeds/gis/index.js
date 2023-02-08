import { feedsURL }                             from "..";
import { Post }                                 from "../../../core/request";

const getMapData          = (data) => Post(`${feedsURL.feedsPrefix}/${feedsURL.gisPrefix}/${feedsURL.map}`,data);
const getChartData        = (data) => Post(`${feedsURL.feedsPrefix}/${feedsURL.gisPrefix}/${feedsURL.chart}`,data);
const getDetailChartData  = (data, params) => Post(`${feedsURL.feedsPrefix}/${feedsURL.gisPrefix}/${feedsURL.chart}/${feedsURL.detail}`,data, params);

const feedsGisAPI = {
    getMapData,
    getChartData,
    getDetailChartData
}

export default feedsGisAPI