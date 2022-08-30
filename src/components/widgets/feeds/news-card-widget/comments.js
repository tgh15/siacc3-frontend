import React                    from 'react';
import { CommentBoxFeedWidget } from './comment-box/comment-box';


export const CommentWidgets = (props) => {

    const {comments,threadID,limitation,refreshComments} = props;
    
    if(limitation != undefined){
        let limit_index = 0;
        return (
            <div>
                {
                    comments.reverse().map((comment,indxArray) => {
                        if(limit_index < limitation){
                            limit_index++;
                            return <CommentBoxFeedWidget 
                                        key             = {`comment-${indxArray}-${threadID}`}
                                        refreshComments = {() => {refreshComments()}}  
                                        {...comment}
                                    />
                        }else{
                            return null;
                        }
                    })
                }
            </div>
        )
    }else{
        return(
            <div>
                {
                    Array.isArray(comments) ? comments.reverse().map((comment, indxArray) => {
                        return <CommentBoxFeedWidget 
                                    key             = {`comment-${indxArray}-${threadID}`}
                                    refreshComments = {() => {refreshComments()}}  
                                    {...comment}
                                />
                    }) : null
                }
            </div>
        )
    }
}