import HelpdeskURL  from "..";
import { 
    Get, 
    Put, 
}                   from "../../../core/request";
import Helper       from "../../../../helpers";

const userPratice     = () => Get(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.selfLearning}/${HelpdeskURL.userPractice}?uuid=${Helper.getUserData().uuid}`);
const getUserModule   = (id) => Get(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.selfLearning}/${HelpdeskURL.userModule}?id=${id}`);

const updateUserModul = (data) => Put(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.selfLearning}/${HelpdeskURL.userModule}`, data);

const selfLearningURL = {
    userPratice,
    getUserModule,
    updateUserModul
};

export default selfLearningURL;