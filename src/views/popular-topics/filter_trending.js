import React, { Fragment }          from 'react';
import { Button, Card, CardBody }   from 'reactstrap';

import Select                       from 'react-select'

import { selectThemeColors } from '@utils'

const FilterTrending = (props) => {

    const options = [
        { value: 'daily', label: 'Harian'},
        { value: 'weekly', label: 'Mingguan'},
        { value: 'monthly', label: 'Bulanan'}
    ];

    const handleOnChange = (value) => {

        if(value === null){
            props.setTrendingFilter(null);
        }else{
            props.setTrendingFilter(value.value);
        }
    }; 

    return (
        <Fragment>

            <Select
                id              = {`popular_topic_time_filter`}
                theme           = {selectThemeColors}
                options         = {options}
                onChange        = {handleOnChange}
                className       = 'react-select'
                placeholder     = "Pilih Filter Waktu"
                isClearable
                classNamePrefix = 'select'
            >

            </Select>
            {/* <Card className="mt-2">
                <CardBody>
                    <div className="container-fluid">
                        {
                            props.trendingFilter === 'daily' ?
                                <Button 
                                    color       = "primary" 
                                    // style       = {{width: '110px'}}
                                    className   = "mr-1" 
                                >
                                    Harian
                                </Button>
                            :
                                <Button 
                                    color       = "primary"
                                    // style       = {{width: '110px'}}
                                    outline
                                    className   = "mr-1"
                                    onClick     = {() => props.setTrendingFilter('daily')}
                                >
                                    Harian
                                </Button>
                        }

                        {
                            props.trendingFilter === 'weekly' ?
                                <Button 
                                    color       = "primary" 
                                    // style       = {{width: '110px'}}
                                    className   = "mr-1" 
                                >
                                    Mingguan
                                </Button>
                            :
                                <Button 
                                    color       = "primary"
                                    // style       = {{width: '110px'}}
                                    outline
                                    className   = "mr-1"
                                    onClick     = {() => props.setTrendingFilter('weekly')}
                                >
                                    Mingguan
                                </Button>
                        }

                        {
                            props.trendingFilter === 'monthly' ?
                                <Button 
                                    color       = "primary" 
                                    // style       = {{width: '110px'}}
                                    className   = "mr-1" 
                                >
                                    Bulanan
                                </Button>
                            :
                                <Button 
                                    color       = "primary"
                                    // style       = {{width: '110px'}}
                                    outline
                                    className   = "mr-1"
                                    onClick     = {() => props.setTrendingFilter('monthly')}
                                >
                                    Bulanan
                                </Button>
                        }
                    </div>
                </CardBody>
            </Card> */}
        </Fragment>
    );
};

export default FilterTrending;