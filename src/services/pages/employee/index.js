import { employeeURL }     from "./url";
import { Post } from "../../core/request";

//Saved News Feeds
const getChild          = (data) => Post(`${employeeURL.employeePrefix}/${employeeURL.workunitPrefix}/${employeeURL.filter}`, data);

const employeeAPI = {
    getChild,
};

export default employeeAPI; 