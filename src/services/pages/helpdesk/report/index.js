import HelpdeskURL from "..";
import { Delete, Get, Post } from "../../../core/request";


const getAllReport      = (search) =>
                            search == undefined ? 
                                (Get(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.report}?order=desc&all`))
                            : 
                                (Get(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.report}?search=${search}&order=desc&all`));

const getDetailReport   = (id) => Get(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.report}?id=${id}&data`);
const getReportKind     = () => Get(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.reportKind}?all`);

const createReport      = (data) => Post(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.report}`, data);
const deleteReport      = (id) => Delete(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.report}?id=${id}`);

export const ReportAPI = {
    getAllReport,
    deleteReport,
    getDetailReport,
    createReport,
    getReportKind,
}