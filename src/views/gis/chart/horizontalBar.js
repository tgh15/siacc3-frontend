
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

const HorizontalBarChart = ({data, title, type, setSelectedDetail}) => { 

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
        indexAxis           : 'y',
        responsive          : true,
        maintainAspectRatio : false,
        animation           : { duration: 500 },
        plugins             : {
            legend  : {
                display : true,
                position: 'top',
                labels: {
                    // padding: 25,
                    boxWidth: 12,
                    usePointStyle: true
                }
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
                    gridLines: {
                        display: false
                    }
                }]
            }
        }
    }

    useEffect(() => {

        // if(data != null){
        //     let data_               = [];
        //     let labels_             = [];
        //     let backgroundColor_    = [];
            
        //     data.datasets.map((data) => (
        //         <>
        //             {
        //                 labels_.push(data.label)
        //             }
        //             {
        //                 data_.push(data.data)
        //             }
        //             {
        //                 backgroundColor_.push(data.backgroundColor)
        //             }
        //         </>
        //     ))

        //     setChartData({
        //         labels   : labels_,
        //         datasets : [
        //             {
        //                 label           : data.labels,
        //                 data            : data_,
        //                 backgroundColor : backgroundColor_
        //             }
        //         ]
        //     });
        // }

        if(data != null){
            let data_ = [];

            data.datasets.map((data__) => (
                data_.push({
                    label           : data__.label,
                    data            : data__.data,
                    backgroundColor : data__.backgroundColor
                })
            ))

            setChartData({
                labels   : data.labels,
                datasets : data_
            });
        }

    }, [data]);

    return(
        <Card style={{height: '30vh'}}>
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

export default HorizontalBarChart;