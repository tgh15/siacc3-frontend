import React, { Fragment, useEffect, useState }    from 'react';
import { Doughnut }           from 'react-chartjs-2';
import { Card, CardBody }     from 'reactstrap';
import CardText               from 'reactstrap/lib/CardText';



const DoughnutChart = (props) => {

  const {
    chartData
  } = props

  const [data, setData] = useState({
    labels    : ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets  : [
      {
        label : '# of Votes',
        data  : [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });
  
  const options = {
    maintainAspectRatio : false,
    responsive          : true,
    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 10
          }
        }
      }
    }
  }

  useEffect(() => {
    setData(chartData);
  }, [chartData]);

  return(
    <Fragment>
      <Card className="h-100" outline>
        <CardBody>
          {/* <CardText> {title}</CardText> */}
          <Doughnut data={data} options={options} />
        </CardBody>
      </Card>
    </Fragment>
  )

}

export default DoughnutChart;