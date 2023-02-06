
import React, {useEffect, useState}     from 'react'
import { Bar }                          from 'react-chartjs-2'
import ChartDataLabels                  from 'chartjs-plugin-datalabels';
import Helper                           from "../../../helpers"
import { 
    Card, 
    Button,
    CardBody, 
    CardTitle,
    CardHeader,
}                                       from "reactstrap"

const GroupBarChart = ({data, title, type, setSelectedDetail}) => { 

    const [chartData, setChartData] = useState({
        labels: [
            '7/12',
            '8/12',
            '9/12',
            '10/12',
            '11/12',
            '12/12',
        ],
        datasets: [
            {
                maxBarThickness : 10,
                borderColor     : 'transparent',
                borderRadius    : { topRight: 15, topLeft: 15 },
                backgroundColor : '#28dac6',
                data            : [100, 30, 50, 85, 15, 85],
                label           : 'data'
            }
        ]
    });

    const options = {
        responsive          : true,
        maintainAspectRatio : false,
        cutout              : 60,
        animation           : {
            resize  : {
                duration    : 500
            }
        },
        plugins     : {
            legend  : {
                display : true,
                position: 'bottom',
                labels: {
                    padding: 25,
                    boxWidth: 9,
                    usePointStyle: true
                }
            },
            tooltip : {
                enabled : true
            }
        }
    }

    useEffect(() => {
        if(data != null){

            setChartData({
                labels   : data.labels,
                datasets : data.datasets
            });
        }
    }, [data]);

    return(
        <Card style={{height : '40vh'}}>
            <CardHeader>
                <CardTitle tag='h4'>
                    { title == undefined ? '' : title }
                </CardTitle>
                {
                    data != undefined ? 
                        <div>
                            <Button 
                                size    = "sm" 
                                color   = 'primary'
                                onClick = {() => {setSelectedDetail({type: type, title: title})}}
                            >
                                Detail
                            </Button>
                        </div>
                    :
                        null
                }
            </CardHeader>
            <CardBody>
                <Bar 
                    data    = {chartData} 
                    options = {options}
                    plugins = {[ChartDataLabels]}
                />
            </CardBody>
        </Card>

    )
}

export default GroupBarChart;