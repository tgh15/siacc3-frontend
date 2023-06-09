import { Fragment } from "react";
import { Search }   from "react-feather";
import { 
    Input, 
    InputGroup, 
    InputGroupText,
    InputGroupAddon, 
} from "reactstrap";


const SearchTable = (props) => {
    const {
        id,
        value,
        onSearch,
        placeholder,
    } = props

    const  onKeyUp = (e) =>  {
        if (e.charCode === 13) {
            onSearch(e.target.value)
        }
    }

    return (
        <Fragment>
            <InputGroup 
                className   = 'input-group-merge mb-1' 
            >
                <InputGroupAddon addonType='prepend'>
                    <InputGroupText size="sm">
                        <Search size={14} />
                    </InputGroupText>
                </InputGroupAddon>
                <Input 
                    id              = {id}
                    onKeyPress      = {(e) => (onKeyUp(e))}
                    placeholder     = {placeholder ?? "Cari..."}  
                    defaultValue    = {value}
                />
            </InputGroup>
        </Fragment>
    );
};

export default SearchTable;