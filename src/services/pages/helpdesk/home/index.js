import HelpdeskURL                  from "..";
import { Delete, Get, Post }        from "../../../core/request";


const getStatisticByType      = (type) => (Get(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.statistic}?type=${type}`));

export const HelpdeskAPI = {
    getStatisticByType
}