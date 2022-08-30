
import React        from 'react'

import local        from '@src/assets/images/news_icon/local.svg'
import views        from '@src/assets/images/news_icon/views.svg'
import populer      from '@src/assets/images/news_icon/nasional.svg'
import waiting      from '@src/assets/images/news_icon/waiting.svg'
import national     from '@src/assets/images/news_icon/nasional.svg'

const heightSize = '150px', widthSize = '150px';

export default {
    waiting : ( 
        <img 
            src     = {waiting}
            style   = {{width:widthSize, height:heightSize}} 
        />
    ),
    views   : (
        <img 
            src     = {views}
            style   = {{width:widthSize, height:heightSize}} 
        />
    ),
    national: (
        <img 
            src     = {national}
            style   = {{width:widthSize, height:heightSize}} 
        />
    ),
    local   : (
        <img 
            src     = {local}
            style   = {{width:widthSize, height:heightSize}} 
        />
    ),
    popular : (
        <img 
            src     = {populer}
            style   = {{width:widthSize, height:heightSize}} 
        />
    )
}