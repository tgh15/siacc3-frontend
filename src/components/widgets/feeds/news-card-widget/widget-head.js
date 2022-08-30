import React, { Fragment }          from 'react';
import { Media }                    from 'reactstrap';
import { CheckSquare }              from 'react-feather';
import RowAvatarWidget              from '../../rw-avatar';
import parse                        from 'html-react-parser';


export const WidgetNewsCardHeader = (props) => {

    const {
        saved,
        title,
        avatar,
        preview,
        division,
        subTitle,
        defaultNews,
        selectedCheck,
    }   = props;

    return(
        <Fragment>
            <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="media">
                    <div className="media mr-1">
                        <RowAvatarWidget
                            name    = {title}
                            avatar  = {avatar} 
                        />
                        <div className="media-body">
                            <h6 className="mb-0">
                                {
                                    preview ? JSON.parse(localStorage.getItem('userData')).name : title
                                }
                                &nbsp; - &nbsp;
                                <span className="text-primary">

                                    {division != undefined ? parse(division) : null}
                                </span>
                            </h6>
                            <small className="text-muted">
                                {subTitle}
                            </small>
                        </div>
                    </div>
                </div>
                <Media>
                    {
                        selectedCheck ? 
                            <CheckSquare style={{ marginTop: '9px', color: 'green' }}/>
                        :
                            null
                    }
                    {defaultNews}
                </Media>
            </div>
        </Fragment>
    );
};