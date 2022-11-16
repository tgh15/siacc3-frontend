import { Get }         from "../../../core/request";
import { responseURL } from "../../../index";


const getActivity = (params) => Get(`${responseURL.activityPrefix}/activities`, params);


const activityAPI = {
    getActivity
}

export default activityAPI;
