
import React from 'react'
import Avatar from '@components/avatar'

import defaultAvatar from '@src/assets/images/portrait/small/150x150.png';

//Helper
import Helper from '../../../helpers';


const RowAvatarWidget = (props)=>{
    const {img,name} = props;

    const { fallbackImage_ } = Helper;

    const userAvatar = img ? img : `https://ui-avatars.com/api/?name=${ name ? name : "UN"}&background=4e73df&color=fff&bold=true`
    return (
        <div style={{marginRight:"8px",minWidth:"32px"}}>
            <Avatar onError={fallbackImage_} img={userAvatar}/>
        </div>
    )
} 

export default RowAvatarWidget;