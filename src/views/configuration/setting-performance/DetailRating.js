

const DetailRating = ({ data }) => {
    return (
        <table className="table-detail">
            <tr>
                <th style={{ width: "25%" }} >
                    Keterangan
                </th>
                <td colSpan={3}>
                    {data.note}
                </td>
            </tr>
            <tr>
                <th colSpan={4} className="pt-2">Basic Point</th>
            </tr>
            <tr>
                <th>Pimpinan</th>
                <td> {data.basic_ratings[0]?.points}</td>
                <th>Agent</th>
                <td> {data.basic_ratings[1]?.points}</td>
            </tr>
            {/* <tr>
                <th colSpan={4} className="pt-2">Trending Point</th>
            </tr> */}
            {/* <tr>
                <th>Pimpinan</th>
                <td> {data.trending_ratings[0]?.points}</td>
                <th>Agent</th>
                <td> {data.trending_ratings[1]?.points}</td>
            </tr> */}
        </table>
    )
}

export default DetailRating