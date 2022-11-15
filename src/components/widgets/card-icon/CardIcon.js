
import React, {useEffect, useState}         from 'react'
import { ArrowDown, ArrowUp }               from 'react-feather'
import {
        Col,
        Row,
        Card,
        Button,
        CardBody,
        CardTitle,
        CardHeader,
        DropdownMenu,
        DropdownItem,
        DropdownToggle,
        UncontrolledButtonDropdown
    }                                       from 'reactstrap'

import Helper                               from "../../../helpers"
import ContainerFluid                       from '../fluid'
import NewsIcon                             from './NewsIcon'
import dashboardAPI                         from '../../../services/pages/dashboard'

export const CardIcon = (props)=>{

    const {
        id, 
        data,
        index,
        title, 
        dashboard,
        handleDelete, 
        handleUpdate, 
        detailChartAction, 
    } = props;

    const [chartData, setChartData] = useState(null);

    const getChartData = () => {
        dashboardAPI.getChartData(data).then(
            res => {
                if(res.status === 200 && res.data != null){
                    setChartData(res.data);
                }else{
                    setChartData(null);
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
        let val;

        if(data != undefined){
            val = setTimeout(() => getChartData(), 300);
        }

        return(() => {
            setChartData({});
            clearTimeout(val);
        });
    }, []);

    return(
    <Card style   = {{width: '100%',  flex: 1}}>
        <CardHeader>
            <CardTitle tag='h4'>
                {(title == undefined || title == null ? "" : title)}
            </CardTitle>

            {
                data != undefined ?
                    chartData != null ? 
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
                :
                    null
            }

        </CardHeader>
        <CardBody>
            <ContainerFluid className="text-center" >
                <Row>
                    <Col sm={12} md={12}>
                        {
                            chartData != null && chartData.type === "berita_belum_disetujui" ? 
                                NewsIcon.local
                            :
                                null
                        }
                        {
                            chartData != null && (chartData.type === "berita_dapat_dibaca_semua" || chartData.type === "berita_populer" || chartData.type === "jumlah_berita_populer")  ? 
                                NewsIcon.popular
                            :
                                null
                        }
                        {
                            chartData != null && chartData.type === "berita_nasional" ? 
                                NewsIcon.national
                            :
                                null
                        }
                        {
                            chartData != null && chartData.type === "berita_lokal" ? 
                                NewsIcon.local
                            :
                                null
                        }
                        {
                            chartData != null && (chartData.type === "jumlah_berita" || chartData.type === "total_berita" || chartData.type === "jumlah_berita_diteruskan_ke_pimpinan" || chartData.type === "penonton" || chartData.type === "suka" || chartData.type === "komentar" || chartData.type === "dibagikan" || chartData.type === "jumlah_lencana" || chartData.type === "jumlah_event_Yang_diikuti" || chartData.type === "user_online" || chartData.type === "all_user_online")  ? 
                                NewsIcon.popular
                            :
                                null
                        }

                    </Col>
                    <Col>
                        <div style={{fontSize:"4em"}}>
                            {chartData == null ? 10 : chartData.value}
                        </div>
                        {
                            chartData == null ? 
                                <ArrowUp className="text-success"/>
                            :
                                chartData.change == "Turun"? 
                                    <ArrowDown className="text-danger"/>
                                :
                                    <ArrowUp className="text-success"/>
                                
                        }
                        <div>
                            {chartData == null ? "naik 10% dari minggu lalu" : chartData.text }
                        </div>
                    </Col>
                </Row>
            </ContainerFluid>
        </CardBody>
    </Card>
    )
}