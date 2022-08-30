import React from 'react'
import Avatar from '@components/avatar'

import defaultAvatar from '@src/assets/images/portrait/medium/bird.jpeg'


const RowAvatarWidget = ({img})=>{
    return (
        <Avatar img={img==null||img==undefined?defaultAvatar:img}/>
    )
} 

export default RowAvatarWidget