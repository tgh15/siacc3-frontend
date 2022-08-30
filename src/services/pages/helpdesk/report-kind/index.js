import HelpdeskURL                from "..";
import { Delete, Get, Post, Put } from "../../../core/request";


const getAllReportKind = () => Get(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.reportKind}?all`);
const createReportKind = (data) => Post(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.reportKind}`, data);
const updateReportKind = (data) => Put(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.reportKind}`, data);
const deleteReportKind = (id) => Delete(`${HelpdeskURL.helpdeskPrefix}/${HelpdeskURL.reportKind}?id=${id}`);


export const ReportKindAPI = {
    getAllReportKind,
    createReportKind,
    updateReportKind,
    deleteReportKind
};