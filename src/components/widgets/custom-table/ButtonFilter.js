import { Filter } from "react-feather";
import { Button } from "reactstrap";


const ButtonFilter = (props) => {
    const{
        onClick
    } = props

    return (
        <Button.Ripple 
            id          = "filter-data"
            size        = "sm" 
            color       = "primary" 
            onClick     = {onClick} 
            className   = "mb-1" 
        >
            <Filter size={14} />
        </Button.Ripple>
    );
};

export default ButtonFilter;