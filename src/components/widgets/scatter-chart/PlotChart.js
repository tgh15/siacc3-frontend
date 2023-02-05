import { useEffect, useState }              from "react"
import {  Scatter }                         from "react-chartjs-2"

// Component
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
}                                           from "reactstrap"
import Helper                               from "../../../helpers"

// API
import dashboardAPI                         from "../../../services/pages/dashboard"

export const PlotChart = (props)=>{

    const {
        id, 
        data,
        index,
        title,
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
        datasets: [
            {
                "backgroundColor": "#41baff7f",
                "borderColor": "#41baff",
                "data": [
                    {
                        "v": 19,
                        "x": 31,
                        "y": 37
                    }
                ],
                "label": [
                    "Ideologi"
                ]
            },
            {
                "backgroundColor": "#6307f77f",
                "borderColor": "#6307f7",
                "data": [
                    {
                        "v": 10,
                        "x": 47,
                        "y": 9
                    }
                ],
                "label": [
                    "Politik"
                ]
            },
            {
                "backgroundColor": "#53ffc67f",
                "borderColor": "#53ffc6",
                "data": [
                    {
                        "v": 2,
                        "x": 31,
                        "y": 18
                    }
                ],
                "label": [
                    "Ekonomi"
                ]
            },
            {
                "backgroundColor": "#e401737f",
                "borderColor": "#e40173",
                "data": [
                    {
                        "v": 1,
                        "x": 25,
                        "y": 40
                    }
                ],
                "label": [
                    "Keuangan"
                ]
            },
            {
                "backgroundColor": "#f500c97f",
                "borderColor": "#f500c9",
                "data": [
                    {
                        "v": 2,
                        "x": 6,
                        "y": 0
                    }
                ],
                "label": [
                    "Sosial Budaya"
                ]
            },
            {
                "backgroundColor": "#af05fa7f",
                "borderColor": "#af05fa",
                "data": [
                    {
                        "v": 0,
                        "x": 44,
                        "y": 11
                    }
                ],
                "label": [
                    "Pertahanan dan Keamanan"
                ]
            },
            {
                "backgroundColor": "#233ef97f",
                "borderColor": "#233ef9",
                "data": [
                    {
                        "v": 2,
                        "x": 12,
                        "y": 39
                    }
                ],
                "label": [
                    "Hukum"
                ]
            }
        ],
        labels: [
            "Ideologi",
            "Politik",
            "Ekonomi",
            "Keuangan",
            "Sosial Budaya",
            "Pertahanan dan Keamanan",
            "Hukum"
        ],
    });

    let options;
    let xopt = xOptions != null || xOptions != undefined ? {...xOptions} : {};
    let yopt = yOptions != null || yOptions != undefined ? {...yOptions} : {};

    options = {
        maintainAspectRatio : false,
        responsive          : true,
        plugins : {
            legend              : {
                display : legend == undefined ? false : legend,
                position: 'bottom',
                labels  : {
                    boxWidth        : 10,
                    usePointStyle   : true,  
                },
            },
            tooltip : { 
                enabled : tooltips == undefined ? false : tooltips
            }
        },
        scales  : {
            x   : {...xopt},
            y   : {...yopt}
        },

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
                        datasets: [
                            {
                                "backgroundColor": "#41baff7f",
                                "borderColor": "#41baff",
                                "data": [
                                    {
                                        "v": 19,
                                        "x": 31,
                                        "y": 37
                                    }
                                ],
                                "label": [
                                    "Ideologi"
                                ]
                            },
                            {
                                "backgroundColor": "#6307f77f",
                                "borderColor": "#6307f7",
                                "data": [
                                    {
                                        "v": 10,
                                        "x": 47,
                                        "y": 9
                                    }
                                ],
                                "label": [
                                    "Politik"
                                ]
                            },
                            {
                                "backgroundColor": "#53ffc67f",
                                "borderColor": "#53ffc6",
                                "data": [
                                    {
                                        "v": 2,
                                        "x": 31,
                                        "y": 18
                                    }
                                ],
                                "label": [
                                    "Ekonomi"
                                ]
                            },
                            {
                                "backgroundColor": "#e401737f",
                                "borderColor": "#e40173",
                                "data": [
                                    {
                                        "v": 1,
                                        "x": 25,
                                        "y": 40
                                    }
                                ],
                                "label": [
                                    "Keuangan"
                                ]
                            },
                            {
                                "backgroundColor": "#f500c97f",
                                "borderColor": "#f500c9",
                                "data": [
                                    {
                                        "v": 2,
                                        "x": 6,
                                        "y": 0
                                    }
                                ],
                                "label": [
                                    "Sosial Budaya"
                                ]
                            },
                            {
                                "backgroundColor": "#af05fa7f",
                                "borderColor": "#af05fa",
                                "data": [
                                    {
                                        "v": 0,
                                        "x": 44,
                                        "y": 11
                                    }
                                ],
                                "label": [
                                    "Pertahanan dan Keamanan"
                                ]
                            },
                            {
                                "backgroundColor": "#233ef97f",
                                "borderColor": "#233ef9",
                                "data": [
                                    {
                                        "v": 2,
                                        "x": 12,
                                        "y": 39
                                    }
                                ],
                                "label": [
                                    "Hukum"
                                ]
                            }
                        ],
                        labels: [
                            "Ideologi",
                            "Politik",
                            "Ekonomi",
                            "Keuangan",
                            "Sosial Budaya",
                            "Pertahanan dan Keamanan",
                            "Hukum"
                        ],
                    });
                }
            },
            err => {
                console.log(err, 'get line chart data');
            }
        )
    }

    useEffect(() => {
        if(data != undefined){
            getChartData();
        }

        return(() => (
            setChartData({})
        ))
    }, []);

    return (
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
                    <Scatter 
                        data        = {chartData} 
                        height      = {200}
                        options     = {options}
                    />
                </div>
            </CardBody>
        </Card>
    )    
}