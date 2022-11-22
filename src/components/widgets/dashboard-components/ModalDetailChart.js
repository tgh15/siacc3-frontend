import React, { Fragment, useState }            from 'react'

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

export const ModalDetailChart = (props)=>{
    const {
        namechart,
        chartSource,
        chartSourceList,
        selectedDataSource,
        setSelectedDataSource,
        selectedWorkunit,
        setSelectedWorkunit,
        selectedWorkunitLevel,
        setSelectedWorkunitLevel,
        selectedPeriod,
        setSelectedPeriod
    }                                       = props
    
    const [legend,setLegend]                = useState(false)
    const [active, setActive]               = useState('1')
    const [tooltips,settooltips]            = useState(false)
    const [titleChart,setTitleChart]        = useState("")

    const [chartWidth,setChartWidth]        = useState({
        values  : "md",
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

    return(
    <Fragment>
        <ContainerFluid>
            <Row>
                <Col>
                    <Charts 
                        name                     = {namechart} 
                        title                    = {titleChart} 
                        legend                   = {legend} 
                        tooltips                 = {tooltips} 
                        xOptions                 = {chartXOption} 
                        yOptions                 = {chartYOption}

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
                                widthSet                 = {(param) => {setChartWidth(param)}}
                                nameChart                = {namechart}
                                chartSource              = {chartSource}
                                selectedPeriod           = {selectedPeriod}
                                selectedWorkunit         = {selectedWorkunit}
                                setSelectedPeriod        = {setSelectedPeriod}
                                setSelectedWorkunit      = {setSelectedWorkunit}
                                setSelectedDataSource    = {setSelectedDataSource}
                                selectedWorkunitLevel    = {selectedWorkunitLevel}
                                setSelectedWorkunitLevel = {setSelectedWorkunitLevel}
                            />
                        </TabPane>
                        <TabPane tabId="2">
                            <GraphicInfoForm 
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
                            />

                            <AxisComponent 
                                title           = "Y Axis" 
                                lineID          = "y-line" 
                                labelId         = "y-label" 
                                onChangeJudul   = {handleChartOptionY}
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
                        let options
                        
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
                                        workunit_id_list : selectedWorkunit.map((data) => data.value),
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
                        props.setList(options)
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