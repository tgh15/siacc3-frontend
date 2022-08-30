import { berandaURL }   from ".";
import FetchServices    from "../../../core/Axios";

//Axios
const servive = new FetchServices();


const getTrendingByType = (data) => servive.post(`${berandaURL.feedsPrefix}/${berandaURL.feedsAgentReport}/${berandaURL.feedsTrendingByType}`, data);


const feedsBerandaAgentReport = {
    getTrendingByType,
};

export default feedsBerandaAgentReport;
