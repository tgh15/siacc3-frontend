
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

const BarChart = ({data, title, type, setSelectedDetail}) => { 

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
        animation           : { duration: 500 },

        scales              : {
            x : {
                grid :{
                    display : false
                }
            }
        },
        plugins             : {
            legend              : {
                display: false,
                labels  : {
                    display         : true,
                    boxWidth        : 10,
                    usePointStyle   : true,  
                },
            },
            tooltip : {
                enabled : true
            },
            datalabels: {
                labels: {
                    value: {
                        color: 'white',
                        font: {
                            weight: 'bold'
                        }
                    }
                },
            },
            scales: {
                x: [{
                    barThickness: 10,  // number (pixels) or 'flex'
                    maxBarThickness: 20, // number (pixels)
                }]
            }
        }
    }

    useEffect(() => {
        if(data != null){
            let data_               = [];
            let labels_             = [];
            let backgroundColor_    = [];
            
            data.datasets.map((data) => (
                <>
                    {
                        labels_.push(data.label)
                    }
                    {
                        data_.push(data.data)
                    }
                    {
                        backgroundColor_.push(data.backgroundColor)
                    }
                </>
            ))

            setChartData({
                labels   : labels_,
                datasets : [
                    {
                        label           : data.labels,
                        data            : data_,
                        backgroundColor : backgroundColor_
                    }
                ]
            });
        }
    }, [data]);

    return(
        <Card style={{height : '30vh'}}>
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
                <div style={{height: '18vh'}}>
                    <Bar 
                        data    = {chartData} 
                        options = {options}
                        plugins = {[ChartDataLabels]}
                    />
                </div>
            </CardBody>
        </Card>

    )
}

export default BarChart;