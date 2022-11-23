import { useState, useEffect, Fragment }                        from 'react';
import { Button, Card, Col, FormGroup, Label, Row, CardBody }   from 'reactstrap';
import { Alerts }                                               from '../my-toast'
import dashboardAPI                                             from '../../../services/pages/dashboard';
import { ModalDetailChart }                                     from './ModalDetailChart'
import { ModalBase }                                            from '../modals-base'
import {Activity,BarChart2,Circle,PieChart,Map,Square}          from 'react-feather'
import gaugeChart                                               from '../../../assets/icons/gauge.svg';

const SelectChart = ({gridItem,unSelected,handleFinish}) => {

    const [toast,setToast]                                  = useState(null);
    const [lists,setLists]                                  = useState([]);
    const [modal,setModal]                                  = useState(false);
    const [isNews, setIsNews]                               = useState(false);
    const [chartName,setChartName]                          = useState("");
    const [chartSource, setChartSource]                     = useState(null);
    const [selectedPeriod, setSelectedPeriod]               = useState(null);
    const [chartSourceList, setChartSourceList]             = useState(null);
    const [selectedWorkunit, setSelectedWorkunit]           = useState([]);
    const [selectedDataSource, setSelectedDataSource]       = useState(null);
    const [selectedWorkunitLevel, setSelectedWorkunitLevel] = useState(null);


    
    const toggleModal   = ()=>{
        setModal(!modal)
    };
    
    const setItemLists  = (name)=>{
        let item = lists.map(v=>{
            return v
        })

        item.push({name:name});
        setLists(item);
    };

    const getSourceData = () => {
        dashboardAPI.chartList().then(
            res => {
                if(res.status === 200){
                    let _data = res.data.filter((data) => (
                        data.name === chartName
                    ))
                    
                    let _restructur = [];
                    
                    _data[0].apis.map((data) => (
                        _restructur.push({
                            label : data.name,
                            value : data.type
                        })
                    ))

                    setChartSource(_restructur);
                    setChartSourceList(res.data);
                }else{
                    setChartSource(null);
                    setChartSourceList(null);
                }
            },
            err => {
                console.log(err, 'dashboard chart list');
            }
        )
    };

    useEffect(() => {
        if(chartName != ""){
            getSourceData();
        }

        return (() => {
            setChartSource([]);
        });
    },[chartName]);

    return (
    <Fragment>
        {toast}

        {/* Modal Select Chart Data */}
        <ModalBase 
            show    = {modal} 
            size    = {'lg'}
            title   = {`Konfigurasi Grafik`} 
            setShow = {toggleModal} 
            unmount = {true}
        >
            <ModalDetailChart 
                onSet                   = {() => {setItemLists(chartName)}}
                namechart               = {chartName}
                chartSource             = {chartSource}
                closeModal              = {toggleModal} 
                setList                 = {(param) => {
                    let list = lists.map( v => {
                        return {...v}
                    })
                    list.push(param)
                    setLists(list)
                }}
                isNews                   = {isNews}
                setIsNews                = {setIsNews}
                selectedPeriod           = {selectedPeriod}
                selectedWorkunit         = {selectedWorkunit}
                setSelectedPeriod        = {setSelectedPeriod}
                selectedDataSource       = {selectedDataSource}
                setSelectedWorkunit      = {setSelectedWorkunit}
                setSelectedDataSource    = {setSelectedDataSource}
                selectedWorkunitLevel    = {selectedWorkunitLevel}
                setSelectedWorkunitLevel = {setSelectedWorkunitLevel}
                chartSourceList          = {chartSourceList}
            />
        </ModalBase>

        <FormGroup>
            <strong>Terpilih {lists.length} dari {gridItem}</strong>
        </FormGroup>
        <FormGroup>
            <Button 
                size    = "sm" 
                color   = "primary"
                outline 
                onClick = {unSelected} 
            >
                Kembali
            </Button>
            &nbsp;
            {
                lists.length === gridItem ? 
                    <Button 
                        size    = "sm"
                        color   = "primary" 
                        onClick = {() => {handleFinish(lists)}} 
                    > 
                        Simpan 
                    </Button>
                :
                    null
            }
        </FormGroup>
        <FormGroup>
            <strong>
                Pilih Grafik
            </strong>
        </FormGroup>
        <FormGroup>
            <Row>
                <Col className="text-center">
                    <Button 
                        style   = {{marginTop:"1em"}} 
                        onClick = {() => {
                            if(lists.length < gridItem){
                                setChartName("line");
                                toggleModal();
                            }else{
                                setToast(
                                    <Alerts 
                                        onClose = {()=>{setToast(null)}} 
                                        header  = "Warning" 
                                        text    = "Jumlah Grid Mencapai Batas"
                                    />
                                )
                            }
                        }} 
                        block 
                        color   = "primary"
                        outline 
                    >
                        <Activity/>
                        <br/>
                        <br/>
                        Garis
                    </Button>
                </Col>
                <Col className="text-center">
                    <Button  
                        onClick = {() => {
                            if(lists.length < gridItem){
                                setChartName("bar")
                                toggleModal()
                            }else{
                                setToast(
                                    <Alerts 
                                        onClose = {() => {setToast(null)}} 
                                        header  = "Warning" 
                                        text    = "Jumlah Grid Mencapai Batas"
                                    />
                                )
                            }
                        }} 
                        style   = {{marginTop:"1em"}} 
                        color   = "primary"
                        block 
                        outline 
                    >
                        <BarChart2 />
                        <br/>
                        <br/>
                        Bar
                    </Button>
                </Col>
                <Col className="text-center">
                    <Button 
                        onClick = {() => {
                            if(lists.length < gridItem){
                                setChartName("bubble")
                                toggleModal()
                            }else{
                                setToast(
                                    <Alerts 
                                        onClose = {() => {setToast('null')}} 
                                        header  = "Warning" 
                                        text    = "Jumlah Grid Mencapai Batas"
                                    />
                                )
                            }
                        }}  
                        style   = {{marginTop:"1em"}} 
                        outline 
                        block 
                        color   = "primary"
                    >
                        <Circle />
                        <br/>
                        <br/>
                        Plot
                    </Button>
                </Col>
            </Row>
            <Row style={{marginTop:"1em"}}>
                <Col className="text-center">
                    <Button 
                        onClick = {() => {
                            if(lists.length < gridItem){
                                setChartName("pie")
                                toggleModal()
                            }else{
                                setToast(
                                    <Alerts 
                                        text    = "Jumlah Grid Mencapai Batas"
                                        header  = "Warning" 
                                        onClose = {() => {setToast(null)}} 
                                    />
                                )
                            }
                        }}  
                        style   = {{marginTop:"1em"}} 
                        block 
                        color   = "primary"
                        outline 
                    >
                        <PieChart />
                        <br/>
                        <br/>
                        Pie
                    </Button>
                </Col>
                <Col className="text-center">
                    <Button 
                        onClick = {() => {
                            if(lists.length < gridItem){
                                setChartName("doughnut")
                                toggleModal()
                            }else{
                                setToast(
                                    <Alerts 
                                        onClose = {() => {setToast(null)}} 
                                        header  = "Warning" 
                                        text    = "Jumlah Grid Mencapai Batas"
                                    />
                                )
                            }
                        }}  
                        style   = {{marginTop:"1em"}} 
                        outline 
                        block 
                        color   = "primary"
                    >
                        <PieChart />
                        <br/>
                        <br/>
                        Donat
                    </Button>
                </Col>
                <Col className="text-center">
                    <Button 
                        onClick = {() => {
                            if(lists.length<gridItem){
                                setChartName("map")
                                toggleModal()
                            }else{
                                setToast(
                                    <Alerts 
                                        onClose = {() => {setToast(null)}} 
                                        header  = "Warning" 
                                        text    = "Jumlah Grid Mencapai Batas"
                                    />
                                )
                            }
                        }}  
                        style   = {{marginTop:"1em"}} 
                        color   = "primary"
                        block 
                        outline 
                    >
                        <Map />
                        <br/>
                        <br/>
                        Peta
                    </Button>
                </Col>
            </Row>
            <Row style={{marginTop:"1em"}}>
                <Col className="text-center">
                    <Button 
                        onClick = {() => {
                            if(lists.length<gridItem){
                                setChartName("stacked")
                                toggleModal()
                            }else{
                                setToast(
                                    <Alerts 
                                        onClose = {() => {setToast(null)}} 
                                        header  = "Warning" 
                                        text    = "Jumlah Grid Mencapai Batas"
                                    />
                                )
                            }
                        }}  
                        style   = {{ marginTop: "1em"}} 
                        block 
                        color   = "primary"
                        outline 
                    >
                        <BarChart2 />
                        <br/>
                        <br/>
                        Group Bar
                    </Button>
                </Col>
                <Col className="text-center">
                    <Button 
                        onClick = {() => {
                            if(lists.length<gridItem){
                                setChartName("card")
                                toggleModal()
                            }else{
                                setToast(
                                    <Alerts 
                                        onClose = {() => {setToast(null)}} 
                                        header  = "Warning" 
                                        text    = "Jumlah Grid Mencapai Batas"
                                />)
                            }
                        }}  
                        style   = {{ marginTop: "1em"}} 
                        block 
                        color   = "primary"
                        outline 
                    >
                        <Square />
                        <br/>
                        <br/>
                        Kartu
                    </Button>
                </Col>
                <Col className="text-center">
                    <Button 
                        onClick = {() => {
                            if(lists.length < gridItem){
                                setChartName("gauge")
                                toggleModal()
                            }else{
                                setToast(
                                    <Alerts 
                                        onClose = {() => {setToast(null)}} 
                                        header  = "Warning" 
                                        text    = "Jumlah Grid Mencapai Batas"
                                    />
                                )
                            }
                        }}  
                        style   = {{marginTop:"1em"}} 
                        outline 
                        block 
                        color   = "primary"
                    >
                        <img src={gaugeChart} style={{ height: '25px', width: '25px' }}/>
                        <br/>
                        <br/>
                        Gauge
                    </Button>
                </Col>
            </Row>
        </FormGroup>
        <FormGroup>
            <Label>Daftar Chart</Label>
            {
                lists.map((v,i) => {
                    const getName = () => {
                        switch (v.chart) {
                            case "bar":
                                return "Grafik Bar"
                            case "line":
                                return "Grafik Garis"
                            case "plot":
                                return "Grafik Plot"
                            case "pie":
                                return "Grafik Pie"
                            case "peta":
                                return "Peta"
                            case "doughnut":
                                return "Grafik Donat"
                            case "group-bar":
                                return "Group Bar Chart"
                            case "gauge":
                                return "Gauge Chart"
                            default:
                                return "Kartu"
                        }
                    }

                    return(
                        <FormGroup key={`txc-500${i}`}>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col
                                            lg = {6}
                                        >
                                            {(i+1)}. &nbsp;{v.name}
                                        </Col>
                                        <Col
                                            lg        = {6}
                                            className = "d-flex justify-content-end"
                                        >
                                            {getName()}
                                        </Col>
                                    </Row>

                                </CardBody>
                            </Card>
                        </FormGroup>
                    )
                })
            }
        </FormGroup>
        
    </Fragment>
    )
}

export default SelectChart;