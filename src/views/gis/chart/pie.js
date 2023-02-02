
import React, {useEffect, useState}     from 'react'
import { Pie }                          from 'react-chartjs-2'
import ChartDataLabels                  from 'chartjs-plugin-datalabels';
import Helper                           from "../../../helpers"
import { 
    Card, 
    Button,
    CardBody, 
    CardTitle,
    CardHeader,
    DropdownItem, 
    DropdownMenu,
    DropdownToggle,
    UncontrolledButtonDropdown,
}                                       from "reactstrap"

const PieChart = ({data, title, setSelectedDetail, type}) => { 

    const [chartData, setChartData] = useState({
        labels   : ['Africa', 'Asia', 'Europe', 'America', 'Antarctica', 'Australia'],
        datasets : [
            {
                borderWidth     : 0,
                label           : 'Population (millions)',
                data            : [19, 17.5, 15, 13.5, 11, 9],
                backgroundColor : ['#836AF9', '#ffe800', '#ffbd1f', '#299AFF', '#4F5D70', '#28dac6']
            }
        ]
    });

    const options = {
        responsive          : true,
        maintainAspectRatio : false,
        animation           : { duration: 500 },
        plugins             : {
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
                enabled : true,
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
                formatter : function(value){
                    return parseInt(value).toFixed(0);
                }
            }
        },
        
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
                    <Pie 
                        data    = {chartData} 
                        options = {options}
                        plugins = {[ChartDataLabels]}
                    />
                </div>
            </CardBody>
        </Card>

    )
}

export default PieChart;