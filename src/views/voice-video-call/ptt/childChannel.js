
import { useEffect, useState } from 'react';
import {
    Volume2
}                   from 'react-feather';

import {
    Collapse
}                   from 'reactstrap';

import Avatar       from '../../../components/widgets/avatar';

//utils
import Helper       from '../../../helpers';


const ChildChannel = (props) => {

    const {
        data,
        selected,
        activeChannel,       
        setActiveChannel    
    }               = props;

    const [isCollapseChild, setIsCollapseChild] = useState(false);

    return (
        <div className='mb-1'>
            <span 
                onClick     = {() => {
                    setIsCollapseChild(!isCollapseChild);
                    setActiveChannel(data);
                    console.log(data, 'stream');
                }}
                className   = 'cursor-pointer' 
            >
                <Volume2 className='mr-1'/>
                {data.roomName}
            </span>
            <Collapse className="ml-3 mt-2" isOpen={isCollapseChild}>
                {/* {
                    data.roomStreamList != null ? 
                        data.roomStreamList.map((data_) => (
                            <div>
                                <Avatar
                                    content='Peter Ingraham' 
                                    status="online"
                                    imgWidth='42'
                                    imgHeight='42'
                                    initials 
                                    className='avatar-border'
                                />
                
                                <span className='ml-2'>{data_}</span>
                            </div>
                        ))
                    :
                        null
                } */}
                {
                    selected.member.map((data_) => (
                        <div 
                            className   ='mb-1'
                        >
                            {
                                data_.avatar == "" ?
                                    <Avatar
                                        content     = {data_.name} 
                                        initials 
                                        className   = 'avatar-border'
                                    />
                                :
                                    <Avatar 
                                        img     = {data_.avatar} 
                                        onError = {Helper.fallbackImage_} 
                                    />
                            }
                            <span className='ml-2'>{data_.name}</span>
                        </div>
                    ))

                }

            </Collapse>
        </div>
    )
};

export default ChildChannel;