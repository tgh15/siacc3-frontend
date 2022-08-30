import { Button, Spinner } from "reactstrap";


const SubmitButton = (props) => {

    const {
        isLoading,
        color,
        isBlock,
        size,
    } = props;
    return (
        <Button.Ripple color={color ?? "primary"} type="submit"  block={isBlock} disabled={ (isLoading) }>
            {(isLoading) ? <Spinner color='success' size={size ?? "md"}  /> : props.children}
        </Button.Ripple>
    )
}

export default SubmitButton