import React, { Fragment }          from 'react';
import { Media }                    from 'reactstrap';
import { CheckSquare }              from 'react-feather';
import RowAvatarWidget              from '../../rw-avatar';
import parse                        from 'html-react-parser';
import Helper                       from '../../../../helpers';


export const WidgetNewsCardHeader = (props) => {

    const {
        saved,
        title,
        avatar,
        preview,
        division,
        subTitle,
        division_id,
        defaultNews,
        selectedCheck,
        division_level,
        division_level_id,
    }   = props;

    const {
        getUserData
    }   = Helper;

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
                                    preview ? getUserData().name : parse(title)
                                }
                                &nbsp; - &nbsp;

                                <a href={`/configuration/work-unit-list/${division_id}?level=${division_level_id}`} className="cursor-pointer">
                                    <span className="text-primary">
                                        {division_level != undefined ? parse(division_level) : null} {division != undefined ? parse(division) : null}
                                    </span>
                                </a>
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