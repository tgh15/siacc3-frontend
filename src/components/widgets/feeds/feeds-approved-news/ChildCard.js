import React, { Fragment }  from 'react';
import RowAvatarWidget      from '../../rw-avatar';


export const NewsApprovedHeadChildCard = ({title, subTitle, location, division, avatar}) => {
    return (
        <Fragment>
            <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="media">
                    <div className="media mr-1">
                        <RowAvatarWidget 
                            img  = {avatar} 
                            name = {title}
                        />
                        <div className="media-body">
                            <h6 className="mb-0">
                                {title} -&nbsp;
                                <span className="text-primary">
                                    {
                                        division != "" ? division : null
                                    }
                                </span>
                            </h6>
                            <small className="text-muted">
                                {subTitle} - {location}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};