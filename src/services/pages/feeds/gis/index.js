import { feedsURL }                           from "..";
import { Get, Post, Delete }                  from "../../../core/request";

const getMapData          = (data) => Post(`${feedsURL.feedsPrefix}/${feedsURL.gisPrefix}/${feedsURL.map}`,data);
const getChartData        = (data) => Post(`${feedsURL.feedsPrefix}/${feedsURL.gisPrefix}/${feedsURL.chart}`,data);
const getDetailChartData  = (data, page) => Post(`${feedsURL.feedsPrefix}/${feedsURL.gisPrefix}/${feedsURL.chart}/${feedsURL.detail}?page=${page}`,data);

const feedsGisAPI = {
    getMapData,
    getChartData,
    getDetailChartData
}

export default feedsGisAPI