import React, { Fragment } from 'react';
import { Button, Spinner } from "reactstrap";


const ButtonLoading = (props) => {
    const {
        color,
        action,
        isBlock,
        isLoading,
    } = props;

    return (
        <Fragment>
            <Button
                type     = "button"
                color    = {color ?? "primary"}
                block    = {isBlock} 
                onClick  = {action}
                disabled = {(isLoading)}
            >
                {
                    (isLoading) ? 
                        <Spinner 
                            size  = "sm"
                            color = 'success' 
                        /> 
                    : props.children
                }
            </Button>
        </Fragment>
    );
};

export default ButtonLoading;