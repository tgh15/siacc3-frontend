import { Fragment } from "react";
import { BookOpen, Headphones, HelpCircle, LogOut } from "react-feather";
import { useHistory, useLocation } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";


const HelpDropdown = () => {

    let history = useHistory();

    let location = useLocation();
    
    return (
        <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
            <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
                <HelpCircle />
            </DropdownToggle>
            {!location.pathname.includes("helpdesk") ?
                <Fragment>
                    <DropdownMenu right>
                        <DropdownItem href='/' tag='a' >
                            <HelpCircle /> FAQ 
                        </DropdownItem>
                        <DropdownItem href='/' tag='a' >
                            <BookOpen /> Self Learning
                        </DropdownItem>
                        <DropdownItem tag="a" onClick={() => history.push("/helpdesk/home")}>
                            <Headphones /> Helpdesk
                        </DropdownItem>
                    </DropdownMenu>
                </Fragment>
                : <Fragment>
                    <DropdownMenu right>
                        <DropdownItem tag="a" onClick={() => history.push("/beranda")}>
                            <LogOut /> Menu Utama
                        </DropdownItem>
                    </DropdownMenu>
                </Fragment>
            }
        </UncontrolledDropdown>
    )
}


export default HelpDropdown;