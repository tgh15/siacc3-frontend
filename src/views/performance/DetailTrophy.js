import { useContext, useEffect, useState }  from "react"
import { Table }                            from "reactstrap";
import { ModalBase }                        from "../../components/widgets/modals-base";
import { PerformanceContext }               from "../../context/PerformanceContext";
import Skeleton                             from "react-loading-skeleton";
import { feedsAchievementAPI }              from "../../services/pages/feeds/achievement";
import CustomTableBodyEmpty                 from "../../components/widgets/custom-table/CustomTableBodyEmpty";



const DetailTrophy = () => {

    const {
        active,
        dataSelected, 
        isDetailTrophyVisible,
        setIsDetailTrophyVisible,
    }                                                  = useContext(PerformanceContext)
    const [trophy, setTrophy]                          = useState(null);

    const getTrophyDataAgent    = () => {

        setTrophy(null);
        
        const params = {
            uuid : dataSelected.uuid
        }

        feedsAchievementAPI.getTrophyByType(params).then(
            res => {
                if(!res.is_error){
                    if (res.data !== null) {
                        setTrophy(res.data);
                    }else{
                        setTrophy([]);
                    }
                }else{
                    CustomToast('danger', res.message);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    const getTrophyDataWorkunit = () => {
        const params = {
            workunit_id : dataSelected.id
        }

        feedsAchievementAPI.getTrophyByType(params).then(
            res => {
                if(!res.is_error){
                    if (res.data !== null) {
                        setTrophy(res.data);
                    }else{
                        setTrophy([]);
                    }
                }else{
                    CustomToast('danger', res.message);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    useEffect(() => {

        if(dataSelected != null){
            if(active === 'agent'){
                getTrophyDataAgent();
            }else{
                getTrophyDataWorkunit();
            }
        }

    }, [isDetailTrophyVisible]);

    return (
        <>
            <ModalBase
                show        = {isDetailTrophyVisible}
                size        = "lg"
                title       = {`Detail Trophy ${active === 'agent' ? 'Personal' : 'Satuan Kerja'}`}
                setShow     = {(par) => { setIsDetailTrophyVisible(par)}} 
            >
                {
                    trophy != null ? 
                        trophy.length > 0 ?
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Trophy</th>
                                        <th>Judul</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        trophy.map((data) => (
                                            <tr className='table-default'>
                                                <td>
                                                    <img className='me-50' src={data.trophy_detail.icon } alt={data.trophy_detail.icon_name} height='80' width='80' />
                                                </td>
                                                <td>
                                                    <span className='align-middle fw-bold'>{data.trophy_detail.note}</span>
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

};

export default DetailTrophy;