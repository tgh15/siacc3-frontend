
import { useEffect, useState }          from "react";
import { useParams }                    from "react-router-dom";
import CustomTableNotAuthorized         from "../../components/widgets/custom-table/CustomTableNotAuthorized";
import { BodyDashboardComponent }       from "../../components/widgets/dashboard-components";
import Helper                           from "../../helpers";
import dashboardAPI                     from "../../services/pages/dashboard";

const DashboardDetail = () => {

    const { id }                                            = useParams();
    const {getRoleByMenuStatus}                             = Helper;

    const [dashboard, setDashboard]                         = useState(null);

    const [dashboardLayout, setDashboardLayout]             = useState([]);

    const getShareAPI = () => {
        dashboardAPI.getShareLinkId(id).then(
            res => {
                if(res.status === 200 && res.data != null){
                    if(res.data.layouts.length > 0 ){    
                        setDashboardLayout(res.data.layouts);
                    }
                    setDashboard(res.data);
                }else{
                    setDashboard(null);
                    setDashboardLayout([]);
                }
            },
            err => {
                if(err.status === 400){
                    message.info('Link dashboard tidak ditemukan.');
                }else{
                    error_handler(err, 'get share link id');
                }
            }
        );
    }

    useEffect(() => {
        getShareAPI();
    },[]);

    return (
        <>
            {
                getRoleByMenuStatus('Dashboard', 'List') ? 
                    <BodyDashboardComponent
                        rows               = {dashboardLayout}
                        dashboard          = {dashboard}
                    />
                :
                    <CustomTableNotAuthorized/>
            }
        </>
    )
};

export default DashboardDetail;