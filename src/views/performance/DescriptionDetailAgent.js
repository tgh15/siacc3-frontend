import { useContext } from "react"
import { PerformanceContext } from "../../context/PerformanceContext"
import Helper from "../../helpers"


const DescriptionDetailAgent = () => {

    const {dataDetail,dataSelected} = useContext(PerformanceContext)
    return (
        <table className="table-ranking mt-2">
            <tr >
                <td className="title">
                    Nasional
                </td>
                <td className="ranking">
                    Peringkat {dataDetail && Helper.rankingText(dataDetail.national_ranking)}
                </td>
            </tr>
            <tr>
                <td className="title">
                    {dataDetail && dataDetail.workunit}
                </td>
                <td className="ranking">
                    Peringkat {dataDetail && Helper.rankingText(dataDetail.local_ranking)}
                </td>
            </tr>
            <tr>
                <td className="title">
                    Total Point
                </td>
                <td className="ranking">
                    { dataDetail && dataDetail.performance.points_total} Poin
                </td>
            </tr>
        </table>
    )
}

export default DescriptionDetailAgent