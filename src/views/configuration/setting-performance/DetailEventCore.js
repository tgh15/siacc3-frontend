import Helper from '../../../helpers'
import './settingPerformance.scss'


const DetailEventCore = ({data}) => {

    return (
        <table className="table-detail">
            <tr>
                <th style={{ width: "25%" }} >
                    Judul
                </th>
                <td style={{ width: "25%" }}> {data.title}</td>
                <th style={{ width: "15%" }} >
                    Keterangan
                </th>
                <td> {data.note}</td>
            </tr>
            <tr>
                <th>
                    Jenis
                </th>
                <td> {data.kind}</td>
                <th>
                    Batas Waktu
                </th>
                <td> {Helper.dateIndo(data.start_date)} - {Helper.dateIndo(data.end_date)}</td>
            </tr>
            <tr>
                <th >
                    Target Pencapaian
                </th>
                <td>{data.target_value}</td>
            </tr>
            <tr>
                <th >
                    Jumlah Agen Maksimal
                </th>
                <td>{data.max_recipient}</td>
            </tr>
        </table>
    )
}

export default DetailEventCore