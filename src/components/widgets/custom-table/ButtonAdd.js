import { Plus }     from "react-feather";
import { Button }   from "reactstrap";


const ButtonAdd = (props) => {
    const {
        onClick
    } = props

    return (
        <Button.Ripple 
            id          = "add-data"
            size        = "sm" 
            color       = "primary" 
            outline 
            onClick     = {onClick} 
            className   = "mb-1" 
        >
            <Plus size={14}/>
        </Button.Ripple>
    );
};

export default ButtonAdd;