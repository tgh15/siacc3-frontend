import React, { Fragment, useState }    from 'react'
import { CardPie }                      from '../pie-chart/PieChart';
import { MapChart }                     from '../map-chart';
import { Barchart }                     from '../bar-chart/Bar';
import { Row, Col }                     from 'reactstrap'
import { CardIcon }                     from '../card-icon/CardIcon';
import { Linechart }                    from '../line-chart/Line';
import { PlotChart }                    from '../scatter-chart/PlotChart';
import { _GaugeChart }                  from '../gauge-chart';
import { GroupBarCard }                 from '../card-group-bar/GroupBar';
import { DoughnutCard }                 from '../doughnut-cart/DougnutCart';
import DetailChartData                  from './ModalDetailChartData';
import CustomTableBodyEmpty             from '../custom-table/CustomTableBodyEmpty';

const MyChart = (props)=>{

    const {
        data, 
        chart, 
        index, 
        options, 
        dashboard,
        chartTitle, 
        identity_id, 
        handleDelete, 
        handleUpdate,
        detailChartAction, 
    } = props;


    const {
        scales,
        plugins, 
    } = options;     
        
    switch (chart) {
        case 'line':
            return (
                <Linechart 
                    id                  = {identity_id}
                    data                = {data}
                    index               = {index}
                    title               = {chartTitle}
                    legend              = {plugins.legend.display} 
                    tooltips            = {plugins.tooltip.enabled} 
                    xOptions            = {scales.x}
                    yOptions            = {scales.y}
                    dashboard           = {dashboard}
                    handleDelete        = {handleDelete}
                    handleUpdate        = {handleUpdate}
                    detailChartAction   = {detailChartAction}
                />
            )
        case 'bubble':
            return (
                <PlotChart
                    id                  = {identity_id}
                    data                = {data}
                    index               = {index}
                    title               = {chartTitle} 
                    legend              = {plugins.legend.display} 
                    tooltips            = {plugins.tooltip.enabled} 
                    xOptions            = {scales.x}
                    yOptions            = {scales.y}
                    dashboard           = {dashboard}
                    handleDelete        = {handleDelete}
                    handleUpdate        = {handleUpdate}
                    detailChartAction   = {detailChartAction}
                />
            )
        case 'bar':
            return (
                <Barchart
                    id                  = {identity_id}
                    data                = {data}
                    index               = {index}
                    title               = {chartTitle} 
                    legend              = {plugins.legend.display} 
                    tooltips            = {plugins.tooltip.enabled} 
                    xOptions            = {scales.x}
                    yOptions            = {scales.y}
                    dashboard           = {dashboard}
                    handleDelete        = {handleDelete}
                    handleUpdate        = {handleUpdate}
                    detailChartAction   = {detailChartAction}
                />
            )
        case "pie":
            return (
                <CardPie
                    id                  = {identity_id}
                    data                = {data}
                    index               = {index}
                    title               = {chartTitle} 
                    legend              = {plugins.legend.display} 
                    tooltips            = {plugins.tooltip.enabled} 
                    xOptions            = {scales.x}
                    yOptions            = {scales.y}
                    dashboard           = {dashboard}
                    handleDelete        = {handleDelete}
                    handleUpdate        = {handleUpdate}
                    detailChartAction   = {detailChartAction}
                />
            )
        case "doughnut":
            return (
                <DoughnutCard
                    id                  = {identity_id}
                    data                = {data}
                    index               = {index}
                    title               = {chartTitle} 
                    legend              = {plugins.legend.display} 
                    tooltips            = {plugins.tooltip.enabled} 
                    xOptions            = {scales.x}
                    yOptions            = {scales.y}
                    dashboard           = {dashboard}
                    handleDelete        = {handleDelete}
                    handleUpdate        = {handleUpdate}
                    detailChartAction   = {detailChartAction}
                />
            )
        case "map":
            return (
                <MapChart
                    id                  = {identity_id}
                    data                = {data}
                    index               = {index}
                    title               = {chartTitle} 
                    legend              = {plugins.legend.display} 
                    tooltips            = {plugins.tooltip.enabled} 
                    xOptions            = {scales.x}
                    yOptions            = {scales.y}
                    dashboard           = {dashboard}
                    handleDelete        = {handleDelete}
                    handleUpdate        = {handleUpdate}
                    detailChartAction   = {detailChartAction}
                />
            )
        case "stacked":
            return (
                <GroupBarCard
                    id                  = {identity_id}
                    data                = {data}
                    index               = {index}
                    title               = {chartTitle} 
                    legend              = {plugins.legend.display} 
                    tooltips            = {plugins.tooltip.enabled} 
                    xOptions            = {scales.x}
                    yOptions            = {scales.y}
                    dashboard           = {dashboard}
                    handleDelete        = {handleDelete}
                    handleUpdate        = {handleUpdate}
                    detailChartAction   = {detailChartAction}
                />
            )
        case "gauge":
            return (
                <_GaugeChart
                    id                  = {identity_id}
                    data                = {data}
                    index               = {index}
                    title               = {chartTitle}
                    dashboard           = {dashboard}
                    handleDelete        = {handleDelete}
                    handleUpdate        = {handleUpdate}
                    detailChartAction   = {detailChartAction}
                />
            )
        default:
            return (
                <CardIcon
                    id                  = {identity_id}
                    data                = {data}
                    index               = {index}
                    title               = {chartTitle}
                    dashboard           = {dashboard}
                    handleDelete        = {handleDelete}
                    handleUpdate        = {handleUpdate}
                    detailChartAction   = {detailChartAction}
                />
            )       
    }   
}
const BodyDashboardComponent = (props) => {

    const {
        rows, 
        chartRef,
        dashboard,
        handleDelete,
        handleUpdate,
    }                                                   = props;

    const [detailChartData, setDetailChartData]         = useState(null);
    const [detailChartVisible, setDetailChartVisible]   = useState(false);

    const detailChartToggle = () => {
        setDetailChartVisible(!detailChartVisible)
    }

    const detailChartAction = (detailChartUrl, chartTitle) => {
        setDetailChartData(
            {
                url     : detailChartUrl, 
                title   : chartTitle
            }
        );
        detailChartToggle();
    };

    return (
        <Fragment>
            <div ref={chartRef}>
                {
                    dashboard &&
                    <h2>
                        Dashboard : {dashboard != null ? dashboard.name : null}
                    </h2>
                }
                {
                    Array.isArray(rows) && rows.length > 0 ?
                        rows.map((data) => (
                            <Fragment>
                                <Row>
                                    {
                                        data.layout != null && data.layout.col.length > 0 ?
                                            data.layout.col != undefined ?
                                                data.layout.col.map((data2,index) => (
                                                    <Col 
                                                        lg      = {data2.width}
                                                        style   = {{ display: 'flex'}}
                                                    >
                                                        <MyChart
                                                            data                = {data2.source}
                                                            chart               = {data2.chart}
                                                            width               = {data2.widht}
                                                            index               = {index}
                                                            options             = {data2.options}
                                                            dashboard           = {dashboard}
                                                            chartTitle          = {data2.name}
                                                            identity_id         = {data.id}
                                                            handleDelete        = {handleDelete}
                                                            handleUpdate        = {handleUpdate}
                                                            detailChartAction   = {detailChartAction}
                                                        />
                                                    </Col>
                                                ))
                                            :
                                                <CustomTableBodyEmpty/>
                                        :
                                            <CustomTableBodyEmpty/>
                                    }
                                </Row>
                            </Fragment>
                        ))
                    :
                        <CustomTableBodyEmpty/>
                }
            </div>

            <DetailChartData
                detailChartData         = {detailChartData}
                detailChartToggle       = {detailChartToggle}   
                detailChartVisible      = {detailChartVisible}
                setDetailChartData      = {setDetailChartData}
                setDetailChartVisible   = {setDetailChartVisible}
            />

        </Fragment>
    )

}


export default BodyDashboardComponent