import { useContext } from "react"
import { PerformanceContext } from "../../context/PerformanceContext"



const DescriptionDetailWorkunit = () => {
    const {dataDetail,dataSelected} = useContext(PerformanceContext)
    return (
        <table className="table-ranking mt-2">
            <tr >
                <td className="title">
                    Nasional
                </td>
                <td className="ranking">
                    Peringkat {dataSelected.ranking}
                </td>
            </tr>
            <tr>
                <td className="title">
                   Total Pengurangan Point
                </td>
                <td className="ranking">
                    {dataDetail && dataDetail.points_deduction}
                </td>
            </tr>
            <tr>
                <td className="title">
                    Total Point
                </td>
                <td className="ranking">
                    {dataDetail && dataDetail.performance.points_total} Poin
                </td>
            </tr>
            <tr>
                <td className="title">
                    Total Rata - Rata Point
                </td>
                <td className="ranking">
                    {dataDetail && dataDetail.performance.points_average} Poin
                </td>
            </tr>
        </table>

    )
}

export default DescriptionDetailWorkunit