import React, { useRef, useState }  from 'react';
import { FormGroup }                from 'reactstrap';

import Avatar                       from '@components/avatar';
import Comments                     from '../../../../../services/pages/feeds/comments';
import CustomToast                  from '../../../custom-toast';
import { ReplyBox }                 from '../reply-box';
import ContainerFluid               from '../../../fluid';
import { AddCommentWidget }         from '../footer-widget';

import Helper                       from '../../../../../helpers';

export const CommentBoxFeedWidget = (props) => {
    const ref = useRef();
    const { fallbackImage_ }      = Helper;
    const {
        id,
        times,
        replies,
        comments,
        likeCounts,
        commentatorName,
        agent_report_id,
        refreshComments,
    } = props;
    
    const parent_id = id;
    const avatarImg = props.imgAvatar;
    
    const [openReplyBox,setOpenReply]   = useState(false);
    const [loading, setLoading]         = useState(false);
    const [dataToSend,setDataToSend]    = useState(
        {
            parent_id       : parent_id,
            agent_report_id : agent_report_id,
            comment         : "",
        }
    );
    
    const textProps = { 
        ref         : ref,
        placeholder : `Balas ke ${commentatorName} . . .`,
        onFocus     : (e) => {},
        onChange    : ({target : {value}}) => {
            let dataSend = {
                    ...dataToSend,
                    comment:value,
                }
            setDataToSend(dataSend)
        },
        onKeyUp     : (e) => {
            const {keyCode} = e
            textProps.onChange(e)
            if(keyCode == 13){
                if(loading == false){
                    buttonProps.onClick()
                }
            }
        }
    };

    const buttonProps = {
        onClick : () => {
            setLoading(true);

            if(dataToSend.comment == ""){
                CustomToast("danger","Tidak dapat Menambahkan Balasan Komentar");
            }else{
                Comments.create(dataToSend).then(response => {
                    CustomToast("success",`Berhasil Membalas Komentar ${commentatorName}`);
                    textProps.ref.current.value = "";
                    refreshComments();
                    setLoading(false);
                })
            }
        }
    };

    return (
        <div style={{marginTop:"8px"}}>
            <div className="row">
                <div style={{marginRight:"8px",minWidth:"32px"}}>
                    <Avatar onError={fallbackImage_} img={avatarImg}/>
                </div>
                <FormGroup className="col mb-0">
                    <FormGroup className="mb-0">
                        <strong>
                            {commentatorName}
                        </strong>
                    </FormGroup>
                    <FormGroup className="mb-0">
                        {comments}
                        <br/>
                        <div className="container-fluid">
                            <div className="row">
                                <div style={{marginRight:"16px"}}> 
                                    <small className="text-muted">
                                        {times}
                                    </small>
                                </div>
                                <div 
                                    style       = {{marginRight:"16px"}} 
                                    onClick     = {() => {setOpenReply(true)}}
                                    className   = "cursor-pointer" 
                                >
                                    <small className="text-muted">
                                        <a>Balas</a>
                                    </small>
                                </div>
                            </div>
                            <div className="row">
                                <ReplyBox 
                                    comment = {props} 
                                    replies = {replies}
                                />
                            </div>
                        </div>
                    </FormGroup>
                    
                    {
                        openReplyBox ? 
                            <FormGroup>
                                <ContainerFluid>
                                    <AddCommentWidget 
                                        childText   = {`Balas`} 
                                        textProps   = {textProps} 
                                        buttonProps = {buttonProps}
                                        loading     = {loading}
                                    /> 
                                </ContainerFluid>
                            </FormGroup>
                        :
                            null
                    }
                </FormGroup>
            </div>
        </div>
    );
};