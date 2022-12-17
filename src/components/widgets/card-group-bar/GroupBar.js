import React, {useEffect, useState}     from 'react'
import { Bar }                          from 'react-chartjs-2';
import dashboardAPI                     from '../../../services/pages/dashboard';
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
        
export const GroupBarCard=(props)=>{

    const {
        id, 
        data,
        title,
        index,
        legend,
        tooltips,
        xOptions,
        yOptions, 
        dashboard,
        handleDelete, 
        handleUpdate, 
        detailChartAction, 
    } = props;

    const [chartData, setChartData] = useState({
        labels: [
            '7/12',
            '8/12',
            '9/12',
            '10/12'
        ],
        datasets: [
            {
                maxBarThickness : 20,
                borderColor     : 'transparent',
                backgroundColor : '#28dac6',
                data            : [120, 50, 70, 95],
                label           : "dataset 1"
            },
            {
                maxBarThickness : 20,
                borderColor     : 'transparent',
                backgroundColor : '#ffe800',
                data            : [110, 40, 60, 85],
                label           : "dataset2"

            },
            {
                maxBarThickness : 20,
                borderColor     : 'transparent',
                backgroundColor : '#4F5D70',
                data            : [100, 30, 50, 75],
                label           : "dataset 1"
            },
            {
                maxBarThickness : 20,
                borderColor     : 'transparent',
                borderRadius    : { topRight: 15, topLeft: 15 },
                backgroundColor : '#2c9aff',
                data            : [90, 20, 40, 65],
                label           : "dataset2"

            }
        ]
    });

    let xopt = xOptions != null || xOptions != undefined ? {...xOptions} : {};
    let yopt = yOptions != null || yOptions != undefined ? {...yOptions} : {};

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
                display : legend == undefined ? false : legend,
                position: 'bottom',
                labels: {
                    padding: 25,
                    boxWidth: 9,
                    usePointStyle: true
                }
            },
            tooltip : {enabled : tooltips == undefined ? false : tooltips}
        },
        scales  : {
            x   : {...xopt, stacked: true},
            y   : {
                ...yopt, 
                stacked : true, 
                ticks   : {
                    stepSize : 10,
                }
            }
        }
    }

    const getChartData = () => {
        const formData = {
            type              : data.body.type,
            chart             : data.body.chart,
            point_radius      : 1,
        }
        
        if("period_type" in data.body){
            formData.period_type      = data.body.period_type;
            formData.workunit_id_list = data.body.workunit_id_list;
        }

        dashboardAPI.getChartData(data.url, formData).then(
            res => {
                if(res.status === 200 && res.data != null){

                    res.data.datasets.map((data, index) => (
                        index != res.data.datasets.slice(-1)[0] ?
                            Object.assign(data, {
                                maxBarThickness: 20,
                                borderColor: 'transparent',
                            })
                        :
                            Object.assign(data, {
                                maxBarThickness: 20,
                                borderColor: 'transparent',
                                borderRadius: { topRight: 15, topLeft: 15 },
                            })
                    ))

                    setChartData(res.data);

                }else{
                    setChartData({
                        labels: [
                            '7/12',
                            '8/12',
                            '9/12',
                            '10/12'
                        ],
                        datasets: [
                            {
                                maxBarThickness : 20,
                                borderColor     : 'transparent',
                                backgroundColor : '#28dac6',
                                data            : [120, 50, 70, 95],
                                label           : "dataset 1"
                            },
                            {
                                maxBarThickness : 20,
                                borderColor     : 'transparent',
                                backgroundColor : '#ffe800',
                                data            : [110, 40, 60, 85],
                                label           : "dataset2"
                
                            },
                            {
                                maxBarThickness : 20,
                                borderColor     : 'transparent',
                                backgroundColor : '#4F5D70',
                                data            : [100, 30, 50, 75],
                                label           : "dataset 1"
                            },
                            {
                                maxBarThickness : 20,
                                borderColor     : 'transparent',
                                borderRadius    : { topRight: 15, topLeft: 15 },
                                backgroundColor : '#2c9aff',
                                data            : [90, 20, 40, 65],
                                label           : "dataset2"
                
                            }
                        ]
                    });
                }
            },
            err => {
                console.log(err, 'get line chart data');
            }
        )
    }
    
    const handleClick = () => {
        if("detail" in chartData){
            detailChartAction(chartData.detail, title);
        }else{
            let redirect = Helper.getParemeterFromString(chartData, "type");

            if(redirect === "laporan_masyarakat_harian" || redirect == "laporan_masyarakat_mingguan"){
                window.location.href = "/laporan"
            }else if(redirect === "jumah_per_jenis_file" || redirect === "kapasitas_penyimpanan" || redirect === "kapasitas_penyimpanan_pengguna"){
                window.location.href = "/file-manajemen"
            }else if(redirect === "aktifitas_per_jam" || redirect === "aktifitas_per_hari" || redirect === "aktifitasi_per_minggu"){
                window.location.href = "/konfigurasi/aktivitas-pengguna"
            }
        }
    };

    useEffect(() => {
        if(data != undefined){
            getChartData();
        }

        return(() => (
            setChartData({})
        ))
    }, []);

    return(
        <Card  style   = {{width: '100%',  flex: 1}}>
            <CardHeader>
                <CardTitle tag='h4'>
                    {(title == undefined || title == null ? "" : title)}
                </CardTitle>
                {
                    data != undefined ? 
                        <div>
                            <UncontrolledButtonDropdown>
                                <Button 
                                    size    = "sm" 
                                    color   = 'primary' 
                                    onClick = {handleClick}
                                >
                                    Detail
                                </Button>
                                {
                                    !dashboard &&
                                    <>
                                        <DropdownToggle outline className='dropdown-toggle-split' color='secondary' caret></DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem tag='a' onClick={() => {handleUpdate(id, index)}}>Atur Ulang Grafik</DropdownItem>
                                            <DropdownItem tag='a' onClick={() => {handleDelete(id)}}>Nonaktifkan</DropdownItem>
                                        </DropdownMenu>
                                    </>
                                }
                            </UncontrolledButtonDropdown>
                        </div>
                    :
                        null
                }
            </CardHeader>
            <CardBody>
                <div style={{ height: '450px', paddingBottom: '20px'}}>
                    <Bar data={chartData} options={options}/>
                </div>
            </CardBody>
        </Card>
    )
}