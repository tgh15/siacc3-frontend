import { useContext } from "react";
import { Nav, NavItem, NavLink } from "reactstrap"
import { PerformanceContext } from "../../context/PerformanceContext";


const NavbarPerformance = () => {

    const {
        active,
        setActive,
        getDataAgent,
        getDataWorkunit
    } = useContext(PerformanceContext)

    const toggle = tab => {
        setActive(tab)
    }

    const onAgent = () => {

        if (active != "agent") {
            getDataAgent()
        }
        toggle('agent')

    }

    const onWorkunit = () => {

        if (active != "workunit") {
            getDataWorkunit({ workunit_level_id: 0 });
        }

        toggle('workunit')
    }

    return (
        <Nav pills>
            <NavItem>
                <NavLink
                    active={active === 'agent'}
                    onClick={onAgent}
                >
                    Personal
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    active={active === 'workunit'}
                    onClick={onWorkunit}
                >
                    Satuan Kerja
                </NavLink>
            </NavItem>
        </Nav>
    )
}

export default NavbarPerformance