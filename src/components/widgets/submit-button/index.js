import { Button, Spinner } from "reactstrap";


const SubmitButton = (props) => {
    const {
        size,
        color,
        isBlock,
        isLoading,
    } = props;

    return (
        <Button.Ripple 
            type     = "submit"  
            color    = {color ?? "primary"} 
            block    = {isBlock} 
            disabled = {(isLoading)}
        >
            {
                (isLoading) ? 
                    <Spinner 
                        size  = {size ?? "md"}
                        color = 'success' 
                    /> 
                : props.children
            }
        </Button.Ripple>
    );
};

export default SubmitButton;