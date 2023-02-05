
import React, {useEffect, useState}     from 'react'
import { PolarArea }                    from 'react-chartjs-2'
import dashboardAPI                     from '../../../services/pages/dashboard'
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

export const CardPie = (props) => { 

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

    let xopt = xOptions != null || xOptions != undefined ? {...xOptions} : {};
    let yopt = yOptions != null || yOptions != undefined ? {...yOptions} : {};

    const options = {
        responsive          : true,
        maintainAspectRatio : false,
        animation           : { duration: 500 },
        plugins             : {
            legend  : {
                display : legend == undefined ? false : legend,
                position: 'right',
                labels: {
                    padding: 25,
                    boxWidth: 9,
                    usePointStyle: true
                }
            },
            tooltip : {enabled : tooltips == undefined ? false : tooltips}
        },
        scales  : {
            x   : {...xopt},
            y   : {...yopt},
            r   : {
                    grid    : { display: false },
                    ticks   : { display: false }
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

                    res.data.datasets.map((data) => (
                        Object.assign(data, {
                            tension : 0.5, 
                            fill: false
                        })
                    ))

                    setChartData(res.data);
                }else{
                    setChartData({
                        labels: [0, 10, 20, 30, 40, 50, 60, 70, 80],
                        datasets: [
                            {
                                data: [80, 20, 40, 50, 80, 74, 90, 85, 100],
                                fill: false,
                                tension: 0.5,
                                pointRadius: 1,
                                label: 'Europe',
                                pointHoverRadius: 5,
                                pointStyle: 'circle',
                                pointHoverBorderWidth: 5,
                                borderColor: '#28dac6',
                                backgroundColor: '#28dac6',
                                pointBorderColor: 'transparent',
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
        if("details" in chartData){
            detailChartAction(chartData.details, title, chartData.filter);
        }else{
            // let redirect = Helper.getParemeterFromString(chartData, "type");

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
        <Card style = {{width: '100%',  flex: 1}}>
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
                    <PolarArea data={chartData} options={options}/>
                </div>
            </CardBody>
        </Card>

    )
}