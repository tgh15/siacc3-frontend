import { Fragment } from 'react';
import { Line } from 'react-chartjs-2'
import Helper from '../../helpers';

const ChartArea = (props) => {

    const   {
        height,
        width,
        dataChart,
        style
    } = props

    const data = {
        labels: Array.from(dataChart, opt => Helper.dayIndo(opt.date)),
        datasets: [
            {
                fill: "start",
                pointRadius: 4,
                pointBorderColor: 'transparent',
                pointHoverBorderColor: '#fff',
                lineTension: 0.5,
                data: Array.from(dataChart, opt => opt.total_activity),
                borderColor: 'rgb(67,145,139)',
                backgroundColor: 'rgba(115, 103, 240, 0.1)'
            },
        ],
    };

    const options = {
        bezierCurve: false,
        responsive: true,
        scales: {
            xAxes: {
                display: false
            },
            yAxes: {
                display: false
            }
        },
        plugins: {
            legend: {
                display: false
            },
        }

    };

    return (
        <Fragment>
            <Line data={data}  height={height} width={width} options={options} style={style}/>
        </Fragment>
    )
}

export default ChartArea
