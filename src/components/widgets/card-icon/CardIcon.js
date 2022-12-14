
import React, {useEffect, useState}         from 'react'
import { ArrowDown, ArrowUp, User }               from 'react-feather'
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
                    setChartData(res);
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
                    (chartData != null && chartData.data === 'object' && "detail" in chartData.data) ? 
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
                            chartData != null && chartData.code === "berita_belum_disetujui" ? 
                                NewsIcon.local
                            :
                                null
                        }
                        {
                            chartData != null && (chartData.code === "berita_dapat_dibaca_semua" || chartData.code === "berita_populer" || chartData.code === "jumlah_berita_populer")  ? 
                                NewsIcon.popular
                            :
                                null
                        }
                        {
                            chartData != null && (chartData.code === "berita_nasional" || chartData.code === "jumlah_berita_dipublikasi" || chartData.code === "jumlah_berita_nasional" || chartData.code === "jumlah_berita_lokal" || chartData.code === 'jumlah_berita_belum_diverifikasi')? 
                                NewsIcon.national
                            :
                                null
                        }
                        {
                            chartData != null && chartData.code === "berita_lokal" ? 
                                NewsIcon.local
                            :
                                null
                        }
                        {
                            chartData != null && (chartData.code === "feeds_dashboard_user_login" || chartData.code === "feeds_dashboard_pengguna_keseluruhan" || chartData.code === "jumlah_pengguna_keseluruhan") ? 
                                <User size={140}/>
                            :
                                null
                        }
                        {
                            chartData != null && (chartData.code === "jumlah_berita" || chartData.code === "total_berita" || chartData.code === "jumlah_berita_diteruskan_ke_pimpinan" || chartData.code === "penonton" || chartData.code === "suka" || chartData.code === "komentar" || chartData.code === "dibagikan" || chartData.code === "jumlah_lencana" || chartData.code === "jumlah_event_Yang_diikuti" || chartData.code === "user_online" || chartData.code === "all_user_online")  ? 
                                NewsIcon.popular
                            :
                                null
                        }

                    </Col>
                    <Col>
                        <div style={{fontSize:"4em"}}>
                            {
                                chartData != null ? 
                                    chartData.code === "feeds_dashboard_user_login" ?
                                        chartData.data.value
                                    :
                                        chartData.data
                                :
                                    0
                            }       
                        </div>
                        {/* {
                            chartData == null ? 
                                <ArrowUp className="text-success"/>
                            :
                                chartData.change == "Turun"? 
                                    <ArrowDown className="text-danger"/>
                                :
                                    <ArrowUp className="text-success"/>
                                
                        } */}
                            {/* {chartData == null ? "naik 10% dari minggu lalu" : chartData.text } */}
                    </Col>
                </Row>
            </ContainerFluid>
        </CardBody>
    </Card>
    )
}