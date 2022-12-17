import React, { Fragment, useContext, useEffect, useState }            from 'react'

import { 
    TabPane, 
    Button, 
    Col, 
    FormGroup, 
    Nav, 
    NavItem, 
    NavLink, 
    Row,
    TabContent
}                                               from 'reactstrap'
import ContainerFluid                           from '../fluid'
import { Linechart }                            from '../line-chart/Line'
import { DatasourceDetailChart }                from './DataSourceDetailChart'
import { GraphicInfoForm }                      from './GraphicInfoForm'
import { AxisComponent }                        from './AxisComponent'
import { Barchart }                             from '../bar-chart/Bar'
import { PlotChart }                            from '../scatter-chart/PlotChart'
import { CardPie }                              from '../pie-chart/PieChart'
import { DoughnutCard }                         from '../doughnut-cart/DougnutCart'
import { CardMap }                              from '../card-maps/CardMap'
import { GroupBarCard }                         from '../card-group-bar/GroupBar'
import { CardIcon }                             from '../card-icon/CardIcon'
import { _GaugeChart }                          from '../gauge-chart'
import { PerformanceContext } from '../../../context/PerformanceContext'

const Charts = (props)=>{

    const {name,title,legend,tooltips,xOptions,yOptions} = props
    
    switch (name) {
        case "line":
            return ( 
                <Linechart 
                    title       = {title} 
                    legend      = {legend} 
                    tooltips    = {tooltips} 
                    xOptions    = {xOptions} 
                    yOptions    = {yOptions}  
                />
            )
        case "bar":
            return (
                <Barchart 
                    title       = {title} 
                    legend      = {legend} 
                    tooltips    = {tooltips} 
                    xOptions    = {xOptions} 
                    yOptions    = {yOptions}
                />
            )
        case "bubble":
            return (
                <PlotChart 
                    title       = {title} 
                    legend      = {legend} 
                    tooltips    = {tooltips} 
                    xOptions    = {xOptions} 
                    yOptions    = {yOptions}  
                />
            )
        case "pie":
            return (
                <CardPie 
                    title       = {title} 
                    legend      = {legend} 
                    tooltips    = {tooltips} 
                    xOptions    = {xOptions} 
                    yOptions    = {yOptions}  
                />
            )
        case "doughnut":
            return (
                <DoughnutCard 
                    title       = {title} 
                    legend      = {legend} 
                    tooltips    = {tooltips} 
                    xOptions    = {xOptions} 
                    yOptions    = {yOptions}  
                />
            )
        case "map":
            return (
                <CardMap 
                    title       = {title} 
                    legend      = {legend} 
                    tooltips    = {tooltips} 
                    xOptions    = {xOptions} 
                    yOptions    = {yOptions}
                />
            )
        case "stacked":
            return (
                <GroupBarCard 
                    title       = {title} 
                    legend      = {legend} 
                    tooltips    = {tooltips} 
                    xOptions    = {xOptions} 
                    yOptions    = {yOptions}  
                />
            )
        case "gauge":
            return (
                <_GaugeChart
                    title       = {title} 
                />
            )
        default:
            return (
                <CardIcon 
                    title       = {title} 
                />
            )
    }
}

export const ModalDetailChartUpdate = (props)=>{
    const {
        isNews,
        setIsNews,
        namechart,
        chartSource,
        chartSourceList,
        detailLayoutCol,
        selectedDataSource,
        setSelectedDataSource
    }                                       = props

    const [legend,setLegend]                = useState(false);
    const [active, setActive]               = useState('1')
    const [tooltips,settooltips]            = useState(false);
    const [titleChart,setTitleChart]        = useState("")

    const [selectedWorkunit, setSelectedWorkunit]           = useState([]);
    const [selectedWorkunitLevel, setSelectedWorkunitLevel] = useState(null);
    const [selectedPeriod, setSelectedPeriod]               = useState(null);

    const [chartWidth,setChartWidth]        = useState({
        values  : "6",
        label   : "Cukup Besar"
    });

    const [chartXOption,setChartXOption]    = useState({
        display : true,
        title   : {
            display : false,
            text    : null,
        },
    });
    
    const [chartYOption,setChartYOption]    = useState({
        display : true,
        title   : {
            display : false,
            text    : null,
        },
        ticks   : {
            stepSize : 10,
        }
    });
    
    const toggle = tab => {
        if (active !== tab){
            setActive(tab)
        }
    }

    const handleChartOptionX = (e) => {
        setChartXOption(e);
    };

    const handleChartOptionY = (e) => {
        Object.assign(e, {
            ticks       : { stepSize: 10},
            scaleLabel  : { display: true },
        });

        setChartYOption(e);
    };

    useEffect(() => {
        if(detailLayoutCol != undefined && detailLayoutCol != null && chartSource != null){
            setTitleChart(detailLayoutCol.name);

            setLegend(detailLayoutCol.options.plugins.legend.display);
            settooltips(detailLayoutCol.options.plugins.tooltip.enabled);

            chartSource.map((data) => (
                data.value === detailLayoutCol.source.body.type &&
                    setSelectedDataSource({
                        value : data.value,
                        label : data.label
                    })
            ))

            if(detailLayoutCol.width == 2){
                setChartWidth({
                    value   : "2",
                    label   : "Sangat Kecil",
                });
            }else if(detailLayoutCol.width == 3){
                setChartWidth({
                    value   : "3",
                    label   : "Kecil"
                });
            }else if(detailLayoutCol.width == 4){
                setChartWidth({
                    value   : "4",
                    label   : "Sedang"
                });
            }
            else if(detailLayoutCol.width == 6){
                setChartWidth({
                    value   : "6",
                    label   : "Cukup Besar"
                });
            }else{
                setChartWidth({
                    value   : "12",
                    label   : "Besar"
                })
            }

            setSelectedPeriod(detailLayoutCol.source.body.period);
            setSelectedWorkunit(detailLayoutCol.source.body.workunit);
            setSelectedWorkunitLevel(detailLayoutCol.source.body.workunit_level);
        }
    }, [chartSource]);

    return(
    <Fragment>
        <ContainerFluid>
            <Row>
                <Col>
                    <Charts 
                        name        = {namechart} 
                        title       = {titleChart} 
                        legend      = {legend} 
                        tooltips    = {tooltips} 
                        xOptions    = {chartXOption} 
                        yOptions    = {chartYOption}
                    />
                </Col>
                <Col>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                active  = {active === '1'}
                                onClick = {() => {toggle('1')}}
                            >
                                Data
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active  = {active === '2'}
                                onClick = {() => {toggle('2')}}
                            >
                                Info Grafik
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active  = {active === '3'}
                                onClick = {() => {toggle('3')}}
                            >
                                Axis
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={active}>
                        <TabPane tabId="1">
                            <DatasourceDetailChart
                                isNews                  = {isNews}
                                setIsNews               = {setIsNews}
                                width                   = {chartWidth}
                                widthSet                = {(param) => {setChartWidth(param)}}
                                nameChart               = {namechart}
                                chartSource             = {chartSource}
                                chartSourceList         = {chartSourceList}
                                selectedDataSource      = {selectedDataSource}
                                setSelectedDataSource   = {setSelectedDataSource}
                                selectedWorkunit        = {selectedWorkunit}
                                setSelectedWorkunit     = {setSelectedWorkunit}
                                selectedWorkunitLevel   = {selectedWorkunitLevel}
                                setSelectedWorkunitLevel= {setSelectedWorkunitLevel} 
                                selectedPeriod          = {selectedPeriod}
                                setSelectedPeriod       = {setSelectedPeriod}
                            />
                        </TabPane>
                        <TabPane tabId="2">
                            <GraphicInfoForm 
                                title           = {titleChart}
                                legendActive    = {legend}
                                tooltipsActive  = {tooltips}
                                setTitle        = {(value) => {setTitleChart(value)}} 
                                setTooltips     = {(param) => {settooltips(param)}}
                                setLegendary    = {(param) => {setLegend(param)}}
                            />
                        </TabPane>
                        <TabPane tabId="3">
                            <AxisComponent 
                                title           = "X Axis" 
                                lineID          = "x-line" 
                                labelId         = "x-label" 
                                onChangeJudul   = {handleChartOptionX}

                                axisNode        = {detailLayoutCol != null && detailLayoutCol.options.scales.x.display}
                                axisTitle       = {detailLayoutCol != null && detailLayoutCol.options.scales.x.title.text}
                                axisLabel       = {detailLayoutCol != null && detailLayoutCol.options.scales.x.title.display}
                            />

                            <AxisComponent 
                                title           = "Y Axis" 
                                lineID          = "y-line" 
                                labelId         = "y-label" 
                                onChangeJudul   = {handleChartOptionY}

                                axisNode        = {detailLayoutCol != null && detailLayoutCol.options.scales.y.display}
                                axisTitle       = {detailLayoutCol != null && detailLayoutCol.options.scales.y.title.text}
                                axisLabel       = {detailLayoutCol != null && detailLayoutCol.options.scales.y.title.display}
                            />
                        </TabPane>
                    </TabContent>
                </Col>
            </Row>
            <FormGroup className="text-right">
                <Button 
                    color   = "primary" 
                    outline 
                    onClick = {props.closeModal}
                >
                    Batal
                </Button>
                &nbsp;
                <Button 
                    color   = "primary" 
                    onClick = {() => {
                        let options; 
                        
                        let data_ = chartSourceList.filter((data) => (
                            data.name === namechart
                        ))

                        if(namechart === 'line'){
                            options = {
                                name   : titleChart,
                                width  : parseInt(chartWidth.value),
                                chart  : namechart,
                                source : {
                                    url : data_[0].apis[0].url,
                                    method : "POST",
                                    body : {
                                        type             : selectedDataSource.value,
                                        chart            : namechart,
                                        period           : selectedPeriod,
                                        period_type      : selectedPeriod.value,
                                        workunit         : selectedWorkunit,
                                        workunit_level   : selectedWorkunitLevel,
                                        workunit_id_list : selectedWorkunitLevel.value === 0 ? [] : selectedWorkunit.map((data) => data.value),
                                        point_radius     : 1
                                    }
                                },
                                options : {
                                    maintainAspectRatio: false,
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display     : legend,
                                            position    : 'top',
                                        },
                                        tooltip: {
                                            enabled     : tooltips, 
                                        },
                                        datalabels: {
                                            align       : 'center',
                                            color       : 'black',
                                            anchor      : 'center',
                                            display     : true,
                                        },
                                    },
                                    scales: {
                                        x: {...chartXOption},
                                        y: {...chartYOption}
                                    }
                                }
                            }
                        }else{
                            options = {
                                name   : titleChart,
                                width  : parseInt(chartWidth.value),
                                chart  : namechart,
                                source : {
                                    url : data_[0].apis[0].url,
                                    method : "POST",
                                    body : {
                                        type             : selectedDataSource.value,
                                        chart            : namechart,
                                        point_radius     : 1
                                    }
                                },
                                options : {
                                    maintainAspectRatio: false,
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display     : legend,
                                            position    : 'top',
                                        },
                                        tooltip: {
                                            enabled     : tooltips, 
                                        },
                                        datalabels: {
                                            align       : 'center',
                                            color       : 'black',
                                            anchor      : 'center',
                                            display     : true,
                                        },
                                    },
                                    scales: {
                                        x: {...chartXOption},
                                        y: {...chartYOption}
                                    }
                                }
                            }
                        }


                        props.handleUpdateAction(options);
                        props.closeModal()
                    }}
                >
                    OK
                </Button>
            </FormGroup>
        </ContainerFluid>
    </Fragment>
    )
}