import { useContext, useEffect, useState }  from "react"
import { Table }                            from "reactstrap";
import { ModalBase }                        from "../../components/widgets/modals-base";
import agentProfileAPI                      from "../../services/pages/profile/url";
import Helper                               from "../../helpers";
import Skeleton                             from "react-loading-skeleton";
import CustomTableBodyEmpty                 from "../../components/widgets/custom-table/CustomTableBodyEmpty";
import { PerformanceContext }               from "../../context/PerformanceContext";

const AchievementBadge = () => {

    //Helper
    const {getUserData}                                     = Helper;

    //Context
    const { 
        dataSelected, 
        isAchievementVisible,
        setIsAchievementVisible,
    }                                                       = useContext(PerformanceContext)
    const [achievement, setAchievement]                     = useState(null);

    //API get achievement agent
    const achievementBadgeAgent = () => {
        const formData = {
            uuid : dataSelected.uuid
        };

        agentProfileAPI.getAchievementAgent(formData).then(
            res => {
                if(!res.is_error){
                    if (res.data !== null) {
                        setAchievement(res.data);
                    }else{
                        setAchievement([]);
                    }
                }else{
                    CustomToast('danger', res.message);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        );
    };

    useEffect(() => {
        if(dataSelected != null){
            achievementBadgeAgent();
        }

        return(() => {setAchievement(null)})
    }, [isAchievementVisible])

    return (
        <>
            <ModalBase
                show        = {isAchievementVisible}
                size        = "lg"
                title       = "Achievement Badge"
                setShow     = {(par) => { setIsAchievementVisible(par)}} 
            >
                {
                    achievement != null ? 
                        achievement.length > 0 ?
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Badge</th>
                                        <th>Judul</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        achievement.map((data) => (
                                            <tr className='table-default'>
                                                <td>
                                                    <img className='me-50' src={data.oldBadge} alt={data.kind} height='80' width='80' />
                                                </td>
                                                <td>
                                                    <span className='align-middle fw-bold'>{data.title}</span>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        :
                            <CustomTableBodyEmpty/>
                    :
                        <Skeleton height={60} count={3} style={{ marginBottom: "10px" }} />
                }

            </ModalBase>
        </>
    )
}

export default AchievementBadge