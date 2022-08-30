import HelpdeskURL from "..";
import { 
    Get, 
    Put, 
    Post, 
    Delete
} from "../../../core/request";

// const getGuideAll          = ()     => Get(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.guide}?all`);

const userPratice     = () => Get(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.selfLearning}/${HelpdeskURL.userPractice}?uuid=${localStorage.getItem('uuid')}`);
const getUserModule   = (id) => Get(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.selfLearning}/${HelpdeskURL.userModule}?id=${id}`);

const updateUserModul = (data) => Put(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.selfLearning}/${HelpdeskURL.userModule}`, data);

const selfLearningURL = {
    userPratice,
    getUserModule,
    updateUserModul
};

export default selfLearningURL;