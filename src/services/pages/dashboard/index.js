import { employeeURL }                          from "../../index";
import { Get, GetDashboardData, Post, Delete }  from "../../core/request";

//GET
const chartList         = ()        => Get(`${employeeURL.employeePrefix}/${employeeURL.dashboardPrefix}/${employeeURL.charts}`);
const getShareLinkId    = (id)      => Get(`${employeeURL.employeePrefix}/${employeeURL.dashboardPrefix}/share/${id}`);
const getChartData      = (val, data)     => GetDashboardData(`${val}`, data);

//POST
const getLayout         = (data)    => Post(`${employeeURL.employeePrefix}/${employeeURL.dashboardPrefix}/${employeeURL.layout}/get`, data);
const updateLayout      = (data)    => Post(`${employeeURL.employeePrefix}/${employeeURL.dashboardPrefix}/${employeeURL.layout}/update`, data);
const getShareLink      = ()        => Post(`${employeeURL.employeePrefix}/${employeeURL.dashboardPrefix}/share`);
const getUserLayout     = (data)    => Post(`${employeeURL.employeePrefix}/${employeeURL.dashboardPrefix}/${employeeURL.layout}`, data);
const createUserLayout  = (data)    => Post(`${employeeURL.employeePrefix}/${employeeURL.dashboardPrefix}/${employeeURL.layout}/${employeeURL.create}`, data);

//Delete
const deleteLayout      = (id)      => Delete(`${employeeURL.employeePrefix}/${employeeURL.dashboardPrefix}/${employeeURL.layout}/${employeeURL.delete}?id=${id}`);

const dashboardAPI = {
    chartList,
    getChartData,

    getLayout,
    updateLayout,
    getShareLink,
    getUserLayout,
    getShareLinkId,
    createUserLayout,

    deleteLayout
};

export default dashboardAPI;