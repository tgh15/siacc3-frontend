import { NavItem } from "reactstrap"


export const CustomNavItem = ({children})=>{
    return(
        <NavItem style={{paddingTop:"0.1em",paddingBottom:"0.1em"}}>
            {children}
        </NavItem>
    )
}