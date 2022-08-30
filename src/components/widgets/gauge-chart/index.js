
import React, {useEffect, useState}     from 'react'
import GaugeChart                       from 'react-gauge-chart'
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

export const _GaugeChart = ({id, handleDelete, data,title,detailChartAction, handleUpdate, index}) => { 

    const [chartData, setChartData] = useState(0);

    const getChartData = () => {
        dashboardAPI.getChartData(data).then(
            res => {
                if(res.status === 200 && res.data != null){
                    setChartData((res.data.gauge.user_online / res.data.gauge.user_total).toFixed(2));
                }else{
                    setChartData(0);
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
            setChartData(0)
        ))
    }, []);

    return(
        <Card style   = {{width: '100%',  flex: 1}}>
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
                                <DropdownToggle outline className='dropdown-toggle-split' color='secondary' caret></DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem tag='a' onClick={() => {handleUpdate(id, index)}}>Atur Ulang Grafik</DropdownItem>
                                    <DropdownItem tag='a' onClick={() => {handleDelete(id)}}>Nonaktifkan</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                        </div>
                    :
                        null
                }
            </CardHeader>
            <CardBody>
                <GaugeChart
                    percent   = {chartData}
                    textColor = "black"
                />
            </CardBody>
        </Card>

    )
}