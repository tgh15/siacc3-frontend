import React from 'react'
import Avatar from '@components/avatar'
import { FormGroup } from 'reactstrap'


const ReplyBoxContents = ({commentatorName,comments,times,imgAvatar})=>{
    
    return (
        <div className="row" style={{marginTop:"8px"}}>
            <FormGroup style={{minWidth:"32px",marginRight:"8px"}}>
                <Avatar img={imgAvatar}/>
            </FormGroup>
            <FormGroup>
                    <p>
                        <strong>{commentatorName}</strong>
                        <br/>
                        {comments}<br/>
                        <span className="text-muted">{times}</span>
                    </p>
            </FormGroup>
        </div>
    )
}

export const ReplyBox= ({replies}) => {
    
    return(
    <div className="container-fluid">
        {Array.isArray(replies) ? replies.map(reply=>{
            return <ReplyBoxContents key={`rp-012212-${reply.id}`} {...reply}/>
        }):null}
    </div>
    )
}