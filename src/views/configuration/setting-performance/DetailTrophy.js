
import './settingPerformance.scss'

const DetailTrophy = ({ data }) => {

    return (
        <table className="table-detail">
            <tr>
                <th style={{ width: "25%" }} >
                    Nama
                </th>
                <td style={{ width: "25%" }}>
                    {data.name}
                </td>
                <th style={{ width: "15%" }} >
                    Keterangan
                </th>
                <td>
                    {data.note}
                </td>
            </tr>
            <tr>
            <th style={{ width: "25%" }} >
                    Point
                </th>
                <td style={{ width: "25%" }}>
                    {data.points}
                </td>
            </tr>
        </table>
    )
}


export default DetailTrophy