import { Fragment }     from 'react';
import { Doughnut }     from 'react-chartjs-2';

const DoughnutChart = () => {

    const chartData = {
        labels: ['Tablet', 'Mobile', 'Desktop'],
        datasets: [
            {
                labels: ['Tablet', 'Mobile', 'Desktop'],
                data: [30, 30, 30],
                backgroundColor: ['#00BAFF', '#00CC67', '#E40173' ],
                borderWidth: 0,
                pointStyle: 'rectRounded'
            }
        ]
    }

    const options = {
        responsive          : true,
        maintainAspectRatio : false,
        cutout              : 65,
        animation           : {
            resize  : {
                duration    : 500
            }
        },
        plugins     : {
            legend  : {
                display : false,
                position: 'bottom',
                labels: {
                    padding: 25,
                    boxWidth: 9,
                    usePointStyle: true
                }
            },
            tooltip : false,
        },
        
    }

    return (
        <Fragment>

            <div style={{width: '100%', height: '220px', paddingBottom: '20px', paddingTop: '10px', textAlign: 'center'}}>
                <Doughnut data={chartData} options={options}/>
            </div>

        </Fragment>
    )
}

export default DoughnutChart;